import { error, json } from '@sveltejs/kit';
import { searchMovies, searchShows } from '../../lib/tmdb/media.js';

export async function GET({ url }) {
	const mediaType = url.searchParams.get('type');
	const query = url.searchParams.get('query') ?? '';

	if (query === '') {
		throw error(400, 'No search query');
	}
	if (mediaType === 'show') {
		const results = await searchShows(query);

		return json({ results });
	}
	if (mediaType === 'movie') {
		const results = await searchMovies(query);

		return json({ results });
	}

	//TODO: replace with multi search endpoint
	const movieResults = await searchMovies(query);
	const showResults = await searchShows(query);

	return json({ results: [...movieResults.results, ...showResults.results] });
}
