import { MOVIE_DB_API_KEY } from '$env/static/private';
import type { TmdbWatchProviderRegionsResponse, TmdbWatchProviderResponse } from '$lib/tmdb';
import { TMDB_URL } from '$lib/tmdb/consts';

export const getWatchProviders = async (media: {
	type: 'show' | 'movie';
	id: string;
}): Promise<TmdbWatchProviderResponse> => {
	try {
		const mediaPath = media.type === 'show' ? 'tv' : 'movie';

		const response: TmdbWatchProviderResponse = await fetch(
			`${TMDB_URL}/${mediaPath}/${media.id}/watch/providers?api_key=${MOVIE_DB_API_KEY}`
		).then((d) => d.json());

		return response;
	} catch (e) {
		throw Error(`Failed to get TMDB watch providers`, { cause: e });
	}
};

export const getWatchProviderRegions = async (): Promise<TmdbWatchProviderRegionsResponse> => {
	try {
		const response: TmdbWatchProviderRegionsResponse = await fetch(
			`${TMDB_URL}/watch/providers/regions?api_key=${MOVIE_DB_API_KEY}`
		).then((d) => d.json());

		return response;
	} catch (e) {
		throw Error(`Failed to get TMDB watch provider regions`, { cause: e });
	}
};
