import { error, json } from '@sveltejs/kit';
import { searchMovies, searchShows } from '../../lib/tmdb/media.js';
import { getConfiguration } from '../../lib/tmdb/configuration.js';

export async function GET({ url }) {
	const mediaType = url.searchParams.get('type');
	const query = url.searchParams.get('query') ?? '';

	const tmdbConfigPromise = getConfiguration();

	if (query === '') {
		throw error(400, 'No search query');
	}
	if (mediaType === 'show') {
		const [results, config] = await Promise.all([searchShows(query), tmdbConfigPromise]);

		const resultsWithImages = results.results.map((r) => ({
			...r,
			poster: `${config.images.secure_base_url}${config.images.poster_sizes[0]}${r.poster_path}`
		}));

		return json({ results: resultsWithImages });
	}
	if (mediaType === 'movie') {
		const [results, config] = await Promise.all([searchMovies(query), tmdbConfigPromise]);

		const resultsWithImages = results.results.map((r) => ({
			...r,
			poster: `${config.images.secure_base_url}${config.images.poster_sizes[0]}${r.poster_path}`
		}));

		return json({ results: resultsWithImages });
	}

	//TODO: replace with multi search endpoint
	const [movieResults, showResults, config] = await Promise.all([
		searchMovies(query),
		searchShows(query),
		tmdbConfigPromise
	]);

	const resultsWithImages = [...movieResults.results, ...showResults.results].map((r) => ({
		...r,
		poster: `${config.images.secure_base_url}${config.images.poster_sizes[0]}${r.poster_path}`
	}));

	return json({ results: resultsWithImages });
}
