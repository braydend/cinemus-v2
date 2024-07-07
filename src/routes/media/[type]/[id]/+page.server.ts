import { error } from '@sveltejs/kit';
import { getMovie, getShow } from '../../../../lib/tmdb/media';
import { getConfiguration } from '../../../../lib/tmdb';
import { db } from '$lib/db';
import type { CustomSession } from '$lib/types';
import { listedMedia, media, userPreferences, watchlist } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';
import {
	getWatchProviderRegions,
	getWatchProviders
} from '$lib/repositories/watchProviderRepository';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { type, id } = params;
	const userId = ((await locals.getSession())?.user as CustomSession)?.id;

	const selectedRegionPromise = userId
		? db
				.select({ region: userPreferences.region })
				.from(userPreferences)
				.where(eq(userPreferences.userId, userId))
				.limit(1)
		: undefined;
	const regionsPromise = getWatchProviderRegions();
	const configPromise = getConfiguration();
	const isListedPromise = userId
		? db
				.select()
				.from(listedMedia)
				.where(eq(watchlist.userId, userId))
				.innerJoin(
					media,
					and(
						eq(listedMedia.mediaId, media.id),
						eq(media.tmdbId, Number(id)),
						eq(media.type, type as 'movie' | 'show')
					)
				)
				.leftJoin(watchlist, and(eq(watchlist.id, listedMedia.watchlistId)))
		: db
				.select()
				.from(listedMedia)
				.innerJoin(
					media,
					and(
						eq(listedMedia.mediaId, media.id),
						eq(media.tmdbId, Number(id)),
						eq(media.type, type as 'movie' | 'show')
					)
				)
				.innerJoin(watchlist, eq(watchlist.id, listedMedia.watchlistId));

	if (type === 'show') {
		const result = await getShow(id);
		const [selectedRegion, showProviders, config, isListed, regions] = await Promise.all([
			selectedRegionPromise,
			getWatchProviders({ id, type: 'show' }),
			configPromise,
			isListedPromise,
			regionsPromise
		]);

		const {
			images: { secure_base_url, logo_sizes, poster_sizes }
		} = config;

		const regionPreference = regions.results.find(
			(region) => region.iso_3166_1 === selectedRegion?.[0]?.region
		);

		return {
			region: regionPreference
				? { value: regionPreference?.iso_3166_1, label: regionPreference?.english_name }
				: undefined,
			providers: showProviders,
			media: result,
			logoBase: `${secure_base_url}${logo_sizes.at(-1)}`,
			posterBase: `${secure_base_url}${poster_sizes.at(-1)}`,
			isListed: Boolean(isListed.length),
			isAuthed: Boolean(userId)
		};
	}

	if (type === 'movie') {
		const result = await getMovie(id);
		const [selectedRegion, movieProviders, config, isListed, regions] = await Promise.all([
			selectedRegionPromise,
			getWatchProviders({ id, type: 'movie' }),
			configPromise,
			isListedPromise,
			regionsPromise
		]);

		const regionPreference = regions.results.find(
			(region) => region.iso_3166_1 === selectedRegion?.[0]?.region
		);

		const {
			images: { secure_base_url, logo_sizes, poster_sizes }
		} = config;

		return {
			region: regionPreference
				? { value: regionPreference?.iso_3166_1, label: regionPreference?.english_name }
				: undefined,
			providers: movieProviders,
			media: result,
			logoBase: `${secure_base_url}${logo_sizes.at(-1)}`,
			posterBase: `${secure_base_url}${poster_sizes.at(-1)}`,
			isListed: Boolean(isListed.length),
			isAuthed: Boolean(userId)
		};
	}

	throw error(404, 'Not found');
}

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const config = {
	isr: {
		expiration: 1 * DAY,
		bypassToken: 'secret-string-to-bust-cinemus-media-cache'
	}
};
