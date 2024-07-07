import { db } from '$lib/db';
import {
	listedMedia,
	media,
	users,
	watchPartyInvite,
	watchPartyUser,
	watchlist
} from '$lib/db/schema.js';
import { hydrateMediaList } from '$lib/hydrater';
import type { Media, CustomSession } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';
import { and, eq, gt, sql } from 'drizzle-orm';

export const load = async ({ params, locals }) => {
	const { id } = params;
	const userId = ((await locals.getSession())?.user as CustomSession)?.id;

	if (!userId) {
		throw error(401, 'You need to be authorised to do this!');
	}

	const existingInvite = await db
		.select({
			joinedUserId: watchPartyUser.userId,
			watchPartyId: watchPartyInvite.watchPartyId,
			userName: users.name,
			userImage: users.image,
			tmdbId: media.tmdbId,
			mediaId: media.id,
			mediaType: media.type
		})
		.from(watchPartyInvite)
		.where(and(eq(watchPartyInvite.id, id), gt(watchPartyInvite.expiresAt, sql`CURRENT_TIMESTAMP`)))
		.leftJoin(watchPartyUser, eq(watchPartyInvite.watchPartyId, watchPartyUser.watchPartyId))
		.leftJoin(users, eq(users.id, watchPartyUser.userId))
		.leftJoin(watchlist, eq(watchlist.userId, watchPartyUser.userId))
		.leftJoin(listedMedia, eq(listedMedia.watchlistId, watchlist.id))
		.leftJoin(media, eq(media.id, listedMedia.mediaId));
	if (existingInvite.length < 1) {
		throw error(404, 'This invite does not exist');
	}

	const watchPartyId = existingInvite[0].watchPartyId;

	const existingUser = existingInvite.find(({ joinedUserId }) => joinedUserId === userId);

	if (existingUser) {
		throw redirect(301, `/watch-party/${watchPartyId}`);
	}
	await db.insert(watchPartyUser).values({ userId, watchPartyId: watchPartyId });
	await db.query.watchPartyUser
		.findFirst({
			where: eq(watchPartyUser.userId, userId)
		})
		.then((r) => {
			console.log({ users: r });
		});

	const hydratedMedia = await hydrateMediaList(
		existingInvite.reduce<Media[]>((acc, { tmdbId, mediaId, mediaType }) => {
			if (mediaId === null || tmdbId === null || !mediaType) return acc;
			return [...acc, { id: mediaId, tmdbId, type: mediaType }];
		}, [])
	);

	const mediaMap = hydratedMedia.reduce<Map<string, string>>((acc, { title, poster }) => {
		if (poster && title) {
			acc.set(title, poster);
		}
		return acc;
	}, new Map<string, string>());

	const watchListUsers = existingInvite.reduce<Map<string, string>>(
		(acc, { userName, userImage }) => {
			if (!userName || !userImage) {
				return acc;
			}
			acc.set(userName, userImage);
			return acc;
		},
		new Map<string, string>()
	);

	return {
		watchPartyId,
		users: watchListUsers,
		mediaPosters: mediaMap
	};
};
