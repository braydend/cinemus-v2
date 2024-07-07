import { describe, expect, it } from 'vitest';
import type { Media } from './types';
import { hydrateMedia } from './hydrater';

describe('hydrater', () => {
	describe('hydrateMedia', () => {
		it('looks up TMDB data for movie', async () => {
			const input: Media = {
				id: 1,
				tmdbId: 35,
				type: 'movie'
			};

			const result = await hydrateMedia(input);

			expect(result?.poster).toEqual(
				'https://image.tmdb.org/t/p/original/gzb6P78zeFTnv9eoFYnaJ2YrZ5q.jpg'
			);
			expect(result?.title).toEqual('The Simpsons Movie');
			expect(result?.tmdbId).toEqual(35);
			expect(result?.genres).toEqual(['Animation', 'Comedy', 'Family']);
			expect(result?.type).toEqual('movie');
			expect(result?.mediaId).toEqual(1);
		});

		it('looks up TMDB data for show', async () => {
			const input: Media = {
				id: 1,
				tmdbId: 246,
				type: 'show'
			};

			const result = await hydrateMedia(input);

			expect(result?.poster).toEqual(
				'https://image.tmdb.org/t/p/original/9RQhVb3r3mCMqYVhLoCu4EvuipP.jpg'
			);
			expect(result?.title).toEqual('Avatar: The Last Airbender');
			expect(result?.tmdbId).toEqual(246);
			expect(result?.genres).toEqual(['Animation', 'Action & Adventure', 'Sci-Fi & Fantasy']);
			expect(result?.type).toEqual('show');
			expect(result?.mediaId).toEqual(1);
		});
	});
});
