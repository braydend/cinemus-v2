import { eq } from 'drizzle-orm';
import { db } from '../../lib/db/index';
import { watchlist } from '../../lib/db/schema';
import { error } from '@sveltejs/kit';
import { hydrateList } from '$lib/hydrater';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const session = await locals.auth();
	const userId = session?.user?.id;

	if (!userId) {
		throw error(401, 'You need to be authorised to do this!');
	}
	const list = await db.query.watchlist.findFirst({
		where: eq(watchlist.userId, userId),
		with: { listedMedia: { with: { media: true } } }
	});

	const hydratedList = await hydrateList(list?.listedMedia ?? []);

	return { list: hydratedList };
}
