import { eq } from 'drizzle-orm';
import { db } from '../../lib/db/index';
import { watchlist } from '../../lib/db/schema';
import { error } from '@sveltejs/kit';
import type { CustomSession } from '../../lib/types';
import { hydrateList } from '$lib/hydrater';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const userId = ((await locals.getSession())?.user as CustomSession)?.id;

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
