import { error } from '@sveltejs/kit';
import { getMovie, getShow } from '../../../../lib/tmdb/media';
import {
	getMovieWatchProviders,
	getShowWatchProviders,
	getWatchProviderRegions
} from '../../../../lib/tmdb/watchProviders';
import { getConfiguration } from '../../../../lib/tmdb';
import { db } from '$lib/db';
import type { CustomSession } from '$lib/types';
import { listedMedia, media, watchlist } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { type, id } = params;
	const userId = ((await locals.getSession())?.user as CustomSession)?.id;

	const regionsPromise = getWatchProviderRegions();
	const configPromise = getConfiguration();
	const isListedPromise = db
		.select()
		.from(listedMedia)
		.innerJoin(
			media,
			and(
				eq(listedMedia.mediaId, media.id),
				eq(media.tmdbId, Number(id)),
				eq(media.type, type as 'movie' | 'show')
			)
		)
		.innerJoin(watchlist, eq(watchlist.id, listedMedia.watchlistId));

	if (type === 'show') {
		const result = await getShow(id);
		const [regions, showProviders, config, isListed] = await Promise.all([
			regionsPromise,
			getShowWatchProviders(id),
			configPromise,
			isListedPromise
		]);

		const {
			images: { secure_base_url, logo_sizes, poster_sizes }
		} = config;

		return {
			regions,
			providers: showProviders,
			media: result,
			logoBase: `${secure_base_url}${logo_sizes.at(-1)}`,
			posterBase: `${secure_base_url}${poster_sizes.at(-1)}`,
			isListed: Boolean(isListed.length),
			isAuthed: Boolean(userId)
		};
	}

	if (type === 'movie') {
		const result = await getMovie(id);
		const [regions, movieProviders, config, isListed] = await Promise.all([
			regionsPromise,
			getMovieWatchProviders(id),
			configPromise,
			isListedPromise
		]);

		const {
			images: { secure_base_url, logo_sizes, poster_sizes }
		} = config;

		return {
			regions,
			providers: movieProviders,
			media: result,
			logoBase: `${secure_base_url}${logo_sizes.at(-1)}`,
			posterBase: `${secure_base_url}${poster_sizes.at(-1)}`,
			isListed: Boolean(isListed.length),
			isAuthed: Boolean(userId)
		};
	}

	throw error(404, 'Not found');
}
