import { MOVIE_DB_API_KEY } from '$env/static/private';
import { TMDB_URL } from './consts';
import type {
	TmdbMovieDetails,
	TmdbShowDetails,
	TmdbMedia,
	TmdbSearchMovieResult,
	TmdbSearch,
	TmdbSearchShowResult
} from './types';

type MediaCategory = 'movie' | 'tv';

const tmdbBaseUrl = TMDB_URL;

const markMediaType = <MediaType extends TmdbMedia>(
	media: MediaType,
	type: MediaCategory
): MediaType => {
	const typeString = type === 'tv' ? 'show' : 'movie';
	return { ...media, __type: typeString };
};

const markMediaTypes = <MediaType extends TmdbMedia>(
	media: MediaType[],
	type: MediaCategory
): MediaType[] => {
	return media.map((data) => markMediaType(data, type));
};

const get = async <MediaType extends TmdbMedia>(
	id: string,
	type: MediaCategory
): Promise<MediaType> => {
	try {
		const response: MediaType = await fetch(
			`${tmdbBaseUrl}/${type}/${id}?api_key=${MOVIE_DB_API_KEY}`
		).then((d) => d.json());

		const markedMedia = markMediaType(response, type);

		return markedMedia;
	} catch (e) {
		throw Error(`Failed to find ${type} with id ${id}: ${(e as Error).message}`);
	}
};

const search = async <MediaType extends TmdbMedia>(
	mediaType: MediaCategory,
	query: string
): Promise<TmdbSearch<MediaType>> => {
	try {
		const response: TmdbSearch<MediaType> = await fetch(
			`${tmdbBaseUrl}/search/${mediaType}?api_key=${MOVIE_DB_API_KEY}&query=${query}`
		).then((d) => d.json());

		const markedMedia = markMediaTypes(response.results, mediaType);

		return {
			...response,
			results: markedMedia.sort((a, b) => b.popularity - a.popularity)
		};
	} catch (e) {
		throw Error(`Failed to search for ${query} in ${mediaType}: ${(e as Error).message}`);
	}
};

export const getMovie = async (id: string): Promise<TmdbMovieDetails> =>
	await get<TmdbMovieDetails>(id, 'movie');
export const getShow = async (id: string): Promise<TmdbShowDetails> =>
	await get<TmdbShowDetails>(id, 'tv');

export const searchMovies = async (query: string): Promise<TmdbSearch<TmdbSearchMovieResult>> =>
	await search<TmdbSearchMovieResult>('movie', query);
export const searchShows = async (query: string): Promise<TmdbSearch<TmdbSearchShowResult>> =>
	await search<TmdbSearchShowResult>('tv', query);
