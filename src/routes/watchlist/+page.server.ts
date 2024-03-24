import { error } from '@sveltejs/kit';
import { getWatchlistForUser } from '../../lib/domain/watchlist';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const session = await locals.auth();
	const userId = session?.user?.id;

	if (!userId) {
		throw error(401, 'You need to be authorised to do this!');
	}
	const list = await getWatchlistForUser(userId);

	return { list };
}
