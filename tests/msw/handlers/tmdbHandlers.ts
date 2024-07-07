import { http, HttpResponse } from 'msw';
import { providers } from '../mocks/tmdb/providers';

const tmdbBaseUrl = process.env.TMDB_URL ?? '';

export const tmdbHandlers = [
	http.get(`${tmdbBaseUrl}/movie/*`, async () => {
		return HttpResponse.json({
			adult: false,
			backdrop_path: '/yajM2akz8QKOx0RdvN6OYaxe3GN.jpg',
			belongs_to_collection: null,
			budget: 75000000,
			genres: [
				{
					id: 16,
					name: 'Animation'
				},
				{
					id: 35,
					name: 'Comedy'
				},
				{
					id: 10751,
					name: 'Family'
				}
			],
			homepage: 'http://www.simpsonsmovie.com/',
			id: 35,
			imdb_id: 'tt0462538',
			origin_country: ['US'],
			original_language: 'en',
			original_title: 'The Simpsons Movie',
			overview:
				"After Homer accidentally pollutes the town's water supply, Springfield is encased in a gigantic dome by the EPA and the Simpsons are declared fugitives.",
			popularity: 108.838,
			poster_path: '/gzb6P78zeFTnv9eoFYnaJ2YrZ5q.jpg',
			production_companies: [
				{
					id: 18,
					logo_path: '/uqhagSwM7NAkQWVCQhKTyoqF8XH.png',
					name: 'Gracie Films',
					origin_country: 'US'
				},
				{
					id: 25,
					logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png',
					name: '20th Century Fox',
					origin_country: 'US'
				}
			],
			production_countries: [
				{
					iso_3166_1: 'US',
					name: 'United States of America'
				}
			],
			release_date: '2007-07-25',
			revenue: 527068851,
			runtime: 87,
			spoken_languages: [
				{
					english_name: 'English',
					iso_639_1: 'en',
					name: 'English'
				}
			],
			status: 'Released',
			tagline: 'See our family. And feel better about yours.',
			title: 'The Simpsons Movie',
			video: false,
			vote_average: 7.008,
			vote_count: 7797
		});
	}),
	http.get(`${tmdbBaseUrl}/tv/*`, async () => {
		return HttpResponse.json({
			adult: false,
			backdrop_path: '/kU98MbVVgi72wzceyrEbClZmMFe.jpg',
			created_by: [
				{
					id: 1190517,
					credit_id: '5253483c19c29579400de990',
					name: 'Michael Dante DiMartino',
					original_name: 'Michael Dante DiMartino',
					gender: 2,
					profile_path: '/8ey06cRWYe5TlKl5tyYQf57kknw.jpg'
				},
				{
					id: 1190518,
					credit_id: '5253483c19c29579400de996',
					name: 'Bryan Konietzko',
					original_name: 'Bryan Konietzko',
					gender: 2,
					profile_path: '/5lPnGvtATjmPakR96dqPW3v4u8q.jpg'
				}
			],
			episode_run_time: [25],
			first_air_date: '2005-02-21',
			genres: [
				{
					id: 16,
					name: 'Animation'
				},
				{
					id: 10759,
					name: 'Action & Adventure'
				},
				{
					id: 10765,
					name: 'Sci-Fi & Fantasy'
				}
			],
			homepage: 'https://www.nick.com/shows/avatar-the-last-airbender',
			id: 246,
			in_production: false,
			languages: ['en'],
			last_air_date: '2008-07-19',
			last_episode_to_air: {
				id: 13575,
				name: "Sozin's Comet: Avatar Aang (4)",
				overview:
					'Aang defeats the Fire Lord by bending the elements within the Fire Lord and removing his firebending abilities. After Zuko is taken down protecting Katara from Azula, Katara joins the fight and manages to restrain Azula. Afterwards, Zuko is crowned Fire Lord and promises a better future for the world, while Aang takes his place as the next Avatar. Katara finally shows her love for Aang as they kiss under the setting sun.',
				vote_average: 9.205,
				vote_count: 44,
				air_date: '2008-07-19',
				episode_number: 21,
				episode_type: 'finale',
				production_code: '321',
				runtime: 24,
				season_number: 3,
				show_id: 246,
				still_path: '/4a93Ud89t51LcvyiDTtWFRscUhE.jpg'
			},
			name: 'Avatar: The Last Airbender',
			next_episode_to_air: null,
			networks: [
				{
					id: 13,
					logo_path: '/aYkLXz4dxHgOrFNH7Jv7Cpy56Ms.png',
					name: 'Nickelodeon',
					origin_country: 'US'
				}
			],
			number_of_episodes: 61,
			number_of_seasons: 3,
			origin_country: ['US'],
			original_language: 'en',
			original_name: 'Avatar: The Last Airbender',
			overview:
				'In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny as the Avatar, and bring peace to the world.',
			popularity: 185.368,
			poster_path: '/9RQhVb3r3mCMqYVhLoCu4EvuipP.jpg',
			production_companies: [
				{
					id: 4859,
					logo_path: '/wOF6aAYFE5BQryYyaMdQPqUWYwt.png',
					name: 'Nickelodeon Animation Studio',
					origin_country: 'US'
				},
				{
					id: 8032,
					logo_path: null,
					name: 'JM Animation',
					origin_country: 'KR'
				},
				{
					id: 43756,
					logo_path: '/bwwJk6P9hycQGwUbWFj07cfyCG4.png',
					name: 'DR Movie',
					origin_country: 'KR'
				},
				{
					id: 8410,
					logo_path: null,
					name: 'Moi Animation',
					origin_country: 'KR'
				},
				{
					id: 5371,
					logo_path: '/2GFJ3jJ7dhjqcOGj41aTwd3OhQT.png',
					name: 'Nickelodeon Productions',
					origin_country: 'US'
				}
			],
			production_countries: [
				{
					iso_3166_1: 'KR',
					name: 'South Korea'
				},
				{
					iso_3166_1: 'US',
					name: 'United States of America'
				},
				{
					iso_3166_1: 'MY',
					name: 'Malaysia'
				},
				{
					iso_3166_1: 'SG',
					name: 'Singapore'
				}
			],
			seasons: [
				{
					air_date: '2002-04-30',
					episode_count: 24,
					id: 788,
					name: 'Specials',
					overview: 'Unaired Pilot, Recaps, Specials and DVD extras.',
					poster_path: '/qDll9gvIj9vVcgQKtbkad0390kP.jpg',
					season_number: 0,
					vote_average: 0
				},
				{
					air_date: '2005-02-21',
					episode_count: 20,
					id: 785,
					name: 'Book One: Water',
					overview:
						'Katara and Sokka (a brother and sister from the Southern Water Tribe) discover the Avatar (a 12-year-old Airbender boy named Aang) frozen in an iceberg. Together the three begin their journey to the North Pole to find a master waterbender so Aang can begin his Avatar training!',
					poster_path: '/tUG6h0rMtQyOgvqI8r9AqxlKoUP.jpg',
					season_number: 1,
					vote_average: 7.7
				},
				{
					air_date: '2006-03-17',
					episode_count: 20,
					id: 787,
					name: 'Book Two: Earth',
					overview:
						'Aang, along with Katara, Sokka, and their animal friends Appa and Momo, continues on his quest to fulfill his destiny as the Avatar. According to the Avatar cycle, the group must now enter the Earth Kingdom to search for a master earthbender to teach Aang.',
					poster_path: '/quX70K1L7vTLQ9vRJcK0kKcNNFA.jpg',
					season_number: 2,
					vote_average: 8
				},
				{
					air_date: '2007-09-21',
					episode_count: 21,
					id: 786,
					name: 'Book Three: Fire',
					overview:
						"Aang wakes up from his battle with Azula to discover that Ba Sing Se has fallen and the world thinks he's dead. So he and his friends set off undercover across the Fire Nation to find Fire Lord Ozai before the Day of Black Sun. Prince Zuko returns home as the triumphant son, but soon finds the honor he so greatly craved from his father is worthless. New alliances are formed and Team Avatar forges a new plan to stop the Fire Lord. But will they find him in time?",
					poster_path: '/roPE4jaHawj1Dm6uIXJHuLDpkNy.jpg',
					season_number: 3,
					vote_average: 8.1
				}
			],
			spoken_languages: [
				{
					english_name: 'English',
					iso_639_1: 'en',
					name: 'English'
				}
			],
			status: 'Ended',
			tagline: 'Water. Earth. Fire. Air.',
			type: 'Scripted',
			vote_average: 8.7,
			vote_count: 3980
		});
	}),
	http.get(`${tmdbBaseUrl}/configuration`, async () => {
		return HttpResponse.json({
			images: {
				base_url: 'http://image.tmdb.org/t/p/',
				secure_base_url: 'https://image.tmdb.org/t/p/',
				backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
				logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
				poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
				profile_sizes: ['w45', 'w185', 'h632', 'original'],
				still_sizes: ['w92', 'w185', 'w300', 'original']
			},
			change_keys: [
				'adult',
				'air_date',
				'also_known_as',
				'alternative_titles',
				'biography',
				'birthday',
				'budget',
				'cast',
				'certifications',
				'character_names',
				'created_by',
				'crew',
				'deathday',
				'episode',
				'episode_number',
				'episode_run_time',
				'freebase_id',
				'freebase_mid',
				'general',
				'genres',
				'guest_stars',
				'homepage',
				'images',
				'imdb_id',
				'languages',
				'name',
				'network',
				'origin_country',
				'original_name',
				'original_title',
				'overview',
				'parts',
				'place_of_birth',
				'plot_keywords',
				'production_code',
				'production_companies',
				'production_countries',
				'releases',
				'revenue',
				'runtime',
				'season',
				'season_number',
				'season_regular',
				'spoken_languages',
				'status',
				'tagline',
				'title',
				'translations',
				'tvdb_id',
				'tvrage_id',
				'type',
				'video',
				'videos'
			]
		});
	}),
	http.get(`${tmdbBaseUrl}/tv/*/watch/providers`, () => {
		return HttpResponse.json(providers);
	})
];
