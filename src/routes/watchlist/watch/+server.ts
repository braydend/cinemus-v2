import { error, json } from '@sveltejs/kit';
import { db } from '../../../lib/db/index.js';
import { listedMedia, watchlist } from '../../../lib/db/schema.js';
import { eq } from 'drizzle-orm';
import type { CustomSession } from '../../../lib/types.js';

type RequestBody = {
	mediaId: number;
};
export async function POST({ request, locals }) {
	const body: RequestBody = await request.json();
	const userId = ((await locals.getSession())?.user as CustomSession).id;

	if (!userId) {
		throw error(401, 'You need to be authorised to do this!');
	}

	const [listedMediaRecord] = await db
		.select({ isWatched: listedMedia.isWatched })
		.from(listedMedia)
		.where(eq(listedMedia.mediaId, body.mediaId))
		.innerJoin(watchlist, eq(listedMedia.watchlistId, watchlist.id));

	if (!listedMediaRecord) {
		console.error(`Media #${body.mediaId} is not in your list`);
		throw error(400, 'Media is not in your list');
	}

	await db
		.update(listedMedia)
		.set({ isWatched: !listedMediaRecord.isWatched })
		.where(eq(listedMedia.mediaId, body.mediaId));

	return json({ success: true });
}
