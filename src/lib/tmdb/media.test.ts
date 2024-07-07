import { describe, expect, it } from 'vitest';
import { getMovie, getShow, searchMovies, searchShows } from '.';

describe('TMDB - media queries', () => {
	describe('Movie', () => {
		describe('getMovie', () => {
			it('Returns data from TMDB', async () => {
				const result = await getMovie('123');

				expect(result.title).toBe('The Simpsons Movie');
				expect(result.release_date).toBe('2007-07-25');
			});

			it('Marks media type in response', async () => {
				const result = await getMovie('123');

				expect(result.__type).toBe('movie');
			});
		});

		describe('searchMovies', () => {
			it('Returns data from TMDB', async () => {
				const result = await searchMovies('The Simpsons Movie');

				expect(result.results[0].title).toBe('The Simpsons Movie');
				expect(result.results[0].release_date).toBe('2007-07-25');
			});

			it('Marks media type in response', async () => {
				const result = await searchMovies('The Simpsons Movie');

				expect(result.results[0].__type).toBe('movie');
			});
		});
	});

	describe('TV Show', () => {
		describe('getShow', () => {
			it('Returns data from TMDB', async () => {
				const result = await getShow('123');

				expect(result.name).toBe('Avatar: The Last Airbender');
				expect(result.first_air_date).toBe('2005-02-21');
			});

			it('Marks media type in response', async () => {
				const result = await getShow('123');

				expect(result.__type).toBe('show');
			});
		});

		describe('searchShows', () => {
			it('Returns data from TMDB', async () => {
				const result = await searchShows('Avatar');

				expect(result.results[0].name).toBe('Avatar: The Last Airbender');
				expect(result.results[0].first_air_date).toBe('2024-02-22');
			});

			it('Marks media type in response', async () => {
				const result = await searchShows('Avatar');

				expect(result.results[0].__type).toBe('show');
			});
		});
	});
});
