import type { TmdbMovieDetails, TmdbSearchMovieResult } from '$lib/tmdb';

export const searchMovieMocks: TmdbSearchMovieResult[] = [
	{
		adult: false,
		backdrop_path: '/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg',
		genre_ids: [28, 12, 14, 878],
		id: 19995,
		original_language: 'en',
		original_title: 'Avatar',
		overview:
			'In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.',
		popularity: 115.231,
		poster_path: '/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
		release_date: '2009-12-15',
		title: 'Avatar',
		video: false,
		vote_average: 7.575,
		vote_count: 30004,
		__type: 'movie'
	}
];

export const getMovieMocks: TmdbMovieDetails[] = [
	{
		__type: 'movie',
		adult: false,
		backdrop_path: '/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg',
		belongs_to_collection: {
			id: 87096,
			name: 'Avatar Collection',
			poster_path: '/gC3tW9a45RGOzzSh6wv91pFnmFr.jpg',
			backdrop_path: '/i7wJUZCq3L3cuH5PLum6jqbG0pr.jpg'
		},
		budget: 237000000,
		genres: [
			{
				id: 28,
				name: 'Action'
			},
			{
				id: 12,
				name: 'Adventure'
			},
			{
				id: 14,
				name: 'Fantasy'
			},
			{
				id: 878,
				name: 'Science Fiction'
			}
		],
		homepage: 'https://www.avatar.com/movies/avatar',
		id: 19995,
		imdb_id: 'tt0499549',
		original_language: 'en',
		original_title: 'Avatar',
		overview:
			'In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.',
		popularity: 133.46,
		poster_path: '/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
		production_companies: [
			{
				id: 444,
				logo_path: null,
				name: 'Dune Entertainment',
				origin_country: 'US'
			},
			{
				id: 574,
				logo_path: '/iB6GjNVHs5hOqcEYt2rcjBqIjki.png',
				name: 'Lightstorm Entertainment',
				origin_country: 'US'
			},
			{
				id: 25,
				logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png',
				name: '20th Century Fox',
				origin_country: 'US'
			},
			{
				id: 290,
				logo_path: '/jrgCuaQsY9ouP5ILZf4Dq4ZOkIX.png',
				name: 'Ingenious Media',
				origin_country: 'GB'
			}
		],
		production_countries: [
			{
				iso_3166_1: 'US',
				name: 'United States of America'
			},
			{
				iso_3166_1: 'GB',
				name: 'United Kingdom'
			}
		],
		release_date: '2009-12-15',
		revenue: 2923706026,
		runtime: 162,
		spoken_languages: [
			{
				english_name: 'English',
				iso_639_1: 'en',
				name: 'English'
			},
			{
				english_name: 'Spanish',
				iso_639_1: 'es',
				name: 'Español'
			}
		],
		status: 'Released',
		tagline: 'Enter the world of Pandora.',
		title: 'Avatar',
		video: false,
		vote_average: 7.575,
		vote_count: 30006
	}
];
