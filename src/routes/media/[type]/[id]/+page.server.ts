import { error } from '@sveltejs/kit';
import { getMovie, getShow } from '../../../../lib/tmdb/media';
import {
	getMovieWatchProviders,
	getShowWatchProviders,
	getWatchProviderRegions
} from '../../../../lib/tmdb/watchProviders';
import { getConfiguration } from '../../../../lib/tmdb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { type, id } = params;

	const regionsPromise = getWatchProviderRegions();
	const configPromise = getConfiguration();

	if (type === 'show') {
		const result = await getShow(id);
		const [regions, showProviders, config] = await Promise.all([
			regionsPromise,
			getShowWatchProviders(id),
			configPromise
		]);

		const {
			images: { secure_base_url, logo_sizes, poster_sizes }
		} = config;

		return {
			regions,
			providers: showProviders,
			media: result,
			logoBase: `${secure_base_url}${logo_sizes.at(-1)}`,
			posterBase: `${secure_base_url}${poster_sizes.at(-1)}`
		};
	}

	if (type === 'movie') {
		const result = await getMovie(id);
		const [regions, movieProviders, config] = await Promise.all([
			regionsPromise,
			getMovieWatchProviders(id),
			configPromise
		]);

		const {
			images: { secure_base_url, logo_sizes, poster_sizes }
		} = config;

		return {
			regions,
			providers: movieProviders,
			media: result,
			logoBase: `${secure_base_url}${logo_sizes.at(-1)}`,
			posterBase: `${secure_base_url}${poster_sizes.at(-1)}`
		};
	}

	throw error(404, 'Not found');
}
