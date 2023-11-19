import type { SearchResults } from '$lib/types';
import { http, HttpResponse } from 'msw';
import { searchShowMocks } from './mocks/shows';
import { searchMovieMocks } from './mocks/movies';
import { watchProviderRegions } from './mocks/regions';

export const serverHandlers = [
	http.post('/watchlist/watch', async () => {
		return HttpResponse.json({ success: true });
	}),
	http.get('/search', async ({ request }) => {
		const url = new URL(request.url);
		const query = url.searchParams.get('query');
		const type = url.searchParams.get('type');

		if (!query || !type) {
			throw Error(`Missing required query params. Query: ${query}, Type: ${type}`);
		}

		const includeShows = type === 'all' || type === 'show';
		const includeMovies = type === 'all' || type === 'movie';

		const shows = includeShows ? searchShowMocks : [];
		const movies = includeMovies ? searchMovieMocks : [];

		const results: SearchResults = [...shows, ...movies].map((show) => ({
			...show,
			poster: ''
		}));

		return HttpResponse.json({ results });
	}),
	http.get('/regions', () => HttpResponse.json({ results: watchProviderRegions }))
];
