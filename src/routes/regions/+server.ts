import { getWatchProviderRegions } from '$lib/tmdb';
import { json } from '@sveltejs/kit';

export async function GET() {
	const regions = await getWatchProviderRegions();

	return json({ regions });
}
