import { db } from '$lib/db';
import { users, watchParty, watchPartyUser } from '$lib/db/schema';
import type { CustomSession } from '$lib/types';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
	const userId = ((await locals.getSession())?.user as CustomSession)?.id;

	if (!userId) {
		throw error(401, 'You need to be authorised to do this!');
	}

	const watchParties = await db
		.select({
			partyMemberId: users.id,
			userName: users.name,
			userImage: users.image,
			id: watchParty.id
		})
		.from(watchParty)
		.leftJoin(watchPartyUser, eq(watchPartyUser.watchPartyId, watchParty.id))
		.leftJoin(users, eq(users.id, watchPartyUser.userId));

	const usersWatchParties = watchParties.reduce<Map<string, Map<string, string>>>(
		(acc, { partyMemberId, userName, userImage, id }) => {
			if (!userName || !userImage) return acc;
			if (partyMemberId === userId) return acc;

			if (acc.has(id)) {
				acc.get(id)?.set(userName, userImage);
				return acc;
			}

			acc.set(id, new Map().set(userName, userImage));

			return acc;
		},
		new Map<string, Map<string, string>>()
	);

	return { watchParties: usersWatchParties };
};
