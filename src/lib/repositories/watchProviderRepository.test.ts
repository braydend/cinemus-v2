import { describe, expect, it } from 'vitest';
import { getWatchProviderRegions, getWatchProviders } from './watchProviderRepository';

describe('WatchProviderRepository', () => {
	describe('getWatchProviders', () => {
		it('Returns data from TMDB', async () => {
			const result = await getWatchProviders({ type: 'movie', id: '123' });

			expect(result.results['AU'].flatrate[0].provider_name).toBe('Disney Plus');
		});
	});

	describe('getWatchProviderRegions', () => {
		it('Returns data from TMDB', async () => {
			const result = await getWatchProviderRegions();

			expect(result.results[0].english_name).toBe('Andorra');
			expect(result.results[0].iso_3166_1).toBe('AD');
		});
	});
});
