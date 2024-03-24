import { db } from '$lib/db';
import { listedMedia, media, watchlist } from '$lib/db/schema';
import { and, eq, isNotNull } from 'drizzle-orm';
import { hydrateMedia, hydrateWatchlist } from '../hydrater';
import type { Media } from '../types';

export const getWatchlistForUser = async (userId: string) => {
	const list = await db.query.watchlist.findFirst({
		where: eq(watchlist.userId, userId),
		with: { listedMedia: { with: { media: true } } }
	});

	return await hydrateWatchlist(list?.listedMedia ?? []);
};

export const getWatchlistHighlightsForUser = async (userId: string) => {
	const list = await db
		.select({ id: media.id, tmdbId: media.tmdbId, type: media.type })
		.from(listedMedia)
		.where(and(eq(listedMedia.watchlistId, watchlist.id), eq(listedMedia.isWatched, false)))
		.leftJoin(watchlist, eq(watchlist.userId, userId))
		.leftJoin(media, eq(media.id, listedMedia.mediaId))
		.limit(5);

	return await hydrateMedia(list as Media[]);
};
