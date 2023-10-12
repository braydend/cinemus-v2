import { db } from '$lib/db/index.js';
import { watchParty, watchPartyUser } from '$lib/db/schema.js';
import type { CustomSession } from '$lib/types';
import { createId } from '@paralleldrive/cuid2';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const userId = ((await locals.getSession())?.user as CustomSession)?.id;

	if (!userId) {
		throw error(401, 'You need to be authorised to do this!');
	}

	const watchPartyId = createId();
	await db.insert(watchParty).values({ id: watchPartyId });
	await db.insert(watchPartyUser).values({ watchPartyId, userId });

	throw redirect(301, `/watch-party/${watchPartyId}`);
}
