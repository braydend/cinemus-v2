import { db } from '$lib/db/index.js';
import {
	listedMedia,
	media,
	users,
	watchParty,
	watchPartyUser,
	watchlist
} from '$lib/db/schema.js';
import { hydrateMediaList } from '$lib/hydrater';
import type { CustomSession, HydratedMedia, Media } from '$lib/types';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { id } = params;
	const userId = ((await locals.getSession())?.user as CustomSession)?.id;

	if (!userId) {
		throw error(401, 'You need to be authorised to do this!');
	}

	const selectedWatchParty = await db
		.select({
			watchPartyId: watchParty.id,
			userId: watchPartyUser.userId,
			userImage: users.image,
			userName: users.name,
			tmdbId: media.tmdbId,
			mediaType: media.type,
			mediaId: media.id
		})
		.from(watchParty)
		.where(eq(watchParty.id, id))
		.leftJoin(watchPartyUser, eq(watchPartyUser.watchPartyId, watchParty.id))
		.leftJoin(watchlist, eq(watchlist.userId, watchPartyUser.userId))
		.leftJoin(users, eq(watchlist.userId, users.id))
		.leftJoin(listedMedia, eq(listedMedia.watchlistId, watchlist.id))
		.leftJoin(media, eq(media.id, listedMedia.mediaId));

	if (!selectedWatchParty[0]) {
		throw error(404, 'This watch party does not exist.');
	}

	if (!selectedWatchParty.find(({ userId: userInParty }) => userId === userInParty)) {
		throw error(403, "You don't have access to this watch party.");
	}

	const buildMediaKey = (media: { tmdbId: number; mediaType: string }) =>
		`${media.mediaType}:${media.tmdbId.toString(10)}`;

	const hydratedMedia = await hydrateMediaList(
		selectedWatchParty.reduce((acc, { tmdbId, mediaType, mediaId }) => {
			if (tmdbId === null || mediaType === null || mediaId === null) return acc;

			return [...acc, { tmdbId, type: mediaType, id: mediaId }];
		}, new Array<Media>())
	);

	const watchPartyMedia = selectedWatchParty.reduce((acc, cur) => {
		if (!cur.userId || !cur.tmdbId || !cur.mediaType || !cur.userImage || !cur.userName) return acc;
		const mediaKey = buildMediaKey({ mediaType: cur.mediaType, tmdbId: cur.tmdbId });

		const currentMediaRecord = acc.get(mediaKey);
		const hydratedMediaItem = hydratedMedia.find(
			(m) => m.tmdbId === cur.tmdbId && m.type === cur.mediaType
		);

		if (!hydratedMediaItem) return acc;

		if (!currentMediaRecord) {
			return acc.set(mediaKey, {
				media: hydratedMediaItem,
				users: [{ id: cur.userId, image: cur.userImage, name: cur.userName }]
			});
		}

		currentMediaRecord.users.push({ id: cur.userId, image: cur.userImage, name: cur.userName });

		return acc.set(mediaKey, currentMediaRecord);
	}, new Map<string, { media: HydratedMedia; users: { id: string; image: string; name: string }[] }>());

	return { media: Array.from(watchPartyMedia.values()), id };
}
