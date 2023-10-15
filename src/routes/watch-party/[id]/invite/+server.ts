import { db } from '$lib/db';
import { watchPartyInvite } from '$lib/db/schema.js';
import { json } from '@sveltejs/kit';
import { and, eq, gt, sql } from 'drizzle-orm';

export const GET = async ({ params }) => {
	const { id } = params;

	//find invite
	const existingInvite = await db.query.watchPartyInvite.findFirst({
		where: and(eq(watchPartyInvite.watchPartyId, id), gt(watchPartyInvite.expiresAt, sql`NOW()`))
	});
	if (existingInvite) {
		return json({ invite: existingInvite });
	}

	//if not invite, generate
	await db.insert(watchPartyInvite).values({ watchPartyId: id });
	const newInvite = await db.query.watchPartyInvite.findFirst({
		where: and(eq(watchPartyInvite.watchPartyId, id), gt(watchPartyInvite.expiresAt, sql`NOW()`))
	});

	return json({ invite: newInvite });
};
