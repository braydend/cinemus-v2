import axios from 'axios';
import { MOVIE_DB_API_KEY, TMDB_URL } from '$env/static/private';

const tmdbBaseUrl = TMDB_URL;

export interface TmdbWatchProviderRegionsResponse {
	results: TmdbWatchProviderRegion[];
}

export interface TmdbWatchProviderRegion {
	iso_3166_1: string;
	english_name: string;
	native_name: string;
}

export interface TmdbWatchProviderResponse {
	id: number;
	results: Results;
}

export type Results = Record<string, WatchRegionDetails>;

export interface WatchProviderDetails {
	display_priority: number;
	logo_path: string;
	provider_id: number;
	provider_name: string;
}

interface WatchRegionDetails {
	link: string;
	flatrate: WatchProviderDetails[];
	buy?: WatchProviderDetails[];
	ads?: WatchProviderDetails[];
	rent?: WatchProviderDetails[];
	free?: WatchProviderDetails[];
}

export const getWatchProviderRegions = async (): Promise<TmdbWatchProviderRegionsResponse> => {
	try {
		const response = await axios.get<TmdbWatchProviderRegionsResponse>(
			`${tmdbBaseUrl}/watch/providers/regions?api_key=${MOVIE_DB_API_KEY}`
		);

		return response.data;
	} catch (e) {
		throw Error(`Failed to get TMDB watch provider regions: ${(e as Error).message}`);
	}
};

export const getShowWatchProviders = async (id: string): Promise<TmdbWatchProviderResponse> => {
	try {
		const response = await axios.get<TmdbWatchProviderResponse>(
			`${tmdbBaseUrl}/tv/${id}/watch/providers?api_key=${MOVIE_DB_API_KEY}`
		);

		return response.data;
	} catch (e) {
		throw Error(`Failed to get TMDB show watch providers: ${(e as Error).message}`);
	}
};

export const getMovieWatchProviders = async (id: string): Promise<TmdbWatchProviderResponse> => {
	try {
		const response = await axios.get<TmdbWatchProviderResponse>(
			`${tmdbBaseUrl}/movie/${id}/watch/providers?api_key=${MOVIE_DB_API_KEY}`
		);

		return response.data;
	} catch (e) {
		throw Error(`Failed to get TMDB movie watch providers: ${(e as Error).message}`);
	}
};
