import { db } from '$lib/db/index.js';
import { userPreferences } from '$lib/db/schema.js';
import type { CustomSession } from '$lib/types';
import { error, json } from '@sveltejs/kit';

type RequestBody = {
	region: string;
};

export async function POST({ locals, request }) {
	const userId = ((await locals.getSession())?.user as CustomSession)?.id;

	if (userId === undefined) {
		throw error(401, 'You need to be logged in to do this');
	}

	const body: RequestBody = await request.json();

	try {
		await db
			.insert(userPreferences)
			.values({ userId: userId, region: body.region })
			.onConflictDoUpdate({ target: userPreferences.userId, set: { region: body.region } });

		return json({ success: true });
	} catch (e) {
		throw error(500, (e as Error).message);
	}
}
