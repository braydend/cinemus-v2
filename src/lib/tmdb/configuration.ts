import { MOVIE_DB_API_KEY } from '$env/static/private';
import { TMDB_URL } from './consts';

const tmdbBaseUrl = TMDB_URL;

export interface TmdbConfigurationResponse {
	images: Images;
	change_keys: string[];
}

export interface Images {
	base_url: string;
	secure_base_url: string;
	backdrop_sizes: string[];
	logo_sizes: string[];
	poster_sizes: string[];
	profile_sizes: string[];
	still_sizes: string[];
}

export const getConfiguration = async (): Promise<TmdbConfigurationResponse> => {
	try {
		const response: TmdbConfigurationResponse = await fetch(
			`${tmdbBaseUrl}/configuration?api_key=${MOVIE_DB_API_KEY}`
		).then((d) => d.json());

		return response;
	} catch (e) {
		throw Error(`Failed to get TMDB configuration`, { cause: e });
	}
};
