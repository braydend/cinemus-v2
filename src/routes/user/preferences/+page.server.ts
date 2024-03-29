import { error } from '@sveltejs/kit';
import type { CustomSession } from '$lib/types';
import { db } from '$lib/db/index.js';
import { eq } from 'drizzle-orm';
import { userPreferences } from '$lib/db/schema.js';
import { getWatchProviderRegions } from '$lib/tmdb/watchProviders.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const userId = ((await locals.getSession())?.user as CustomSession)?.id;

	if (userId === undefined) {
		throw error(401, 'You need to be logged in to do this');
	}

	const [preferences, regions] = await Promise.all([
		db
			.select({ region: userPreferences.region })
			.from(userPreferences)
			.where(eq(userPreferences.userId, userId))
			.limit(1),
		getWatchProviderRegions()
	]);

	const regionPreference = regions.results.find(
		(region) => region.iso_3166_1 === preferences[0]?.region
	);

	return {
		region: regionPreference
			? { value: regionPreference?.iso_3166_1, label: regionPreference?.english_name }
			: undefined
	};
}
