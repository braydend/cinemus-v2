import { db } from '$lib/db';
import { watchPartyInvite } from '$lib/db/schema.js';
import { json } from '@sveltejs/kit';
import { and, eq, gt, sql } from 'drizzle-orm';
import dayjs from 'dayjs';

export const GET = async ({ params }) => {
	const { id } = params;

	//find invite
	const existingInvite = await db.query.watchPartyInvite.findFirst({
		where: and(
			eq(watchPartyInvite.watchPartyId, id),
			gt(watchPartyInvite.expiresAt, sql`CURRENT_TIMESTAMP`)
		)
	});
	if (existingInvite) {
		return json({ invite: existingInvite });
	}

	//if not invite, generate
	const inviteExpiry = dayjs().add(1, 'hour').unix();
	const expiryAsSql = sql`datetime(${inviteExpiry}, "unixepoch")`;
	await db.insert(watchPartyInvite).values({ watchPartyId: id, expiresAt: expiryAsSql });
	const newInvite = await db.query.watchPartyInvite.findFirst({
		where: and(
			eq(watchPartyInvite.watchPartyId, id),
			gt(watchPartyInvite.expiresAt, sql`CURRENT_TIMESTAMP`)
		)
	});

	return json({ invite: newInvite });
};
