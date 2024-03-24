import { getWatchlistHighlightsForUser } from '../lib/domain/watchlist.js';

export const load = async ({ locals }) => {
	const session = await locals.auth();
	const userId = session?.user?.id;

	if (!userId) {
		return { isAuthed: Boolean(userId), watchlistHighlights: [] };
	}

	const watchlistHighlights = await getWatchlistHighlightsForUser(userId);

	return { isAuthed: true, watchlistHighlights };
};
