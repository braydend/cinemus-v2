import { error, json } from '@sveltejs/kit';
import { db } from '../../../lib/db/index.js';
import { listedMedia, media, watchlist } from '../../../lib/db/schema.js';
import { and, eq } from 'drizzle-orm';
import type { CustomSession } from '../../../lib/types.js';

type RequestBody = {
	mediaId: number;
	type: 'show' | 'movie';
};
export async function POST({ request, locals }) {
	const body: RequestBody = await request.json();
	const userId = ((await locals.getSession())?.user as CustomSession).id;

	if (!userId) {
		throw error(401, 'You need to be authorised to do this!');
	}

	const list = await getOrCreateListForUser(userId);
	await db.insert(media).values({ tmdbId: body.mediaId, type: body.type });
	const mediaToReference = await db.query.media.findFirst({
		where: ({ tmdbId, type }) => {
			return and(eq(tmdbId, body.mediaId), eq(type, body.type));
		}
	});

	if (!mediaToReference) {
		console.error(
			`Unable to find media in db with tmdbID #${body.mediaId} and type '${body.type}'`
		);
		throw error(500, 'Unable to add media to your watchlist');
	}

	try {
		await db.insert(listedMedia).values({ mediaId: mediaToReference.id, watchlistId: list.id });
	} catch (e) {
		console.error(e);
		throw error(400, 'This is already on your watchlist');
	}

	return json({ success: true });
}

const getOrCreateListForUser = async (userId: string) => {
	let list = await db.query.watchlist.findFirst({ where: eq(watchlist.userId, userId) });
	if (!list) {
		await db.insert(watchlist).values({ userId });
		list = await db.query.watchlist.findFirst({ where: eq(watchlist.userId, userId) });
	}

	if (!list) {
		console.error(`Failed to find/create watchlist for user #${userId}`);
		throw error(500, 'Failed to find your watchlist');
	}

	return list;
};
