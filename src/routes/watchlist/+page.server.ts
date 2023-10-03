import { eq } from 'drizzle-orm';
import { db } from '../../lib/db/index';
import { watchlist } from '../../lib/db/schema';
import { getConfiguration } from '../../lib/tmdb/configuration';
import { getMovie, getShow } from '../../lib/tmdb/media';
import { error } from '@sveltejs/kit';
import type { CustomSession } from '../../lib/types';

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
	const [tmdbConfig, ...tmdbMedia] = await Promise.all([
		getConfiguration(),
		...(list?.listedMedia.map(({ media: { type, tmdbId } }) => {
			if (type === 'movie') {
				return getMovie(tmdbId.toString(10));
			}
			return getShow(tmdbId.toString(10));
		}) ?? [])
	]);

	const hydratedMedia =
		list?.listedMedia.map(({ isWatched, rating, media: { tmdbId }, mediaId }) => {
			const fetchedMedia = tmdbMedia.find(({ id }) => id === tmdbId);
			return {
				isWatched,
				rating,
				poster: `${tmdbConfig.images.secure_base_url}${tmdbConfig.images.poster_sizes.at(-1)}${
					fetchedMedia?.poster_path
				}`,
				title: fetchedMedia?.__type === 'show' ? fetchedMedia.name : fetchedMedia?.title,
				tmdbID: fetchedMedia?.id,
				genres: fetchedMedia?.genres.map(({ name }) => name),
				mediaId
			};
		}) ?? [];

	return { list: hydratedMedia };
}
