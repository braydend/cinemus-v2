import { getConfiguration, getMovie, getShow } from './tmdb';
import type { ArrayElement, HydratedList, HydratedMedia, ListedMedia, Media } from './types';

export const hydrateMedia = async (media: Media) => {
	const tmdbConfig = await getConfiguration();
	const fetchedMedia =
		media.type === 'movie'
			? await getMovie(media.tmdbId.toString(10))
			: await getShow(media.tmdbId.toString(10));

	return {
		poster: `${tmdbConfig.images.secure_base_url}${tmdbConfig.images.poster_sizes.at(-1)}${
			fetchedMedia.poster_path
		}`,
		title: fetchedMedia.__type === 'show' ? fetchedMedia.name : fetchedMedia?.title,
		tmdbId: fetchedMedia.id,
		genres: fetchedMedia.genres.map(({ name }) => name),
		type: media.type,
		mediaId: media.id
	};
};

export const hydrateMediaList = async (list: Media[]): Promise<HydratedMedia[]> => {
	return await Promise.all(list.map(async (media) => hydrateMedia(media)));
};

export const hydrateList = async (list: ListedMedia[]): Promise<HydratedList> => {
	const hydratedMedia = await hydrateMediaList((list ?? []).map(({ media }) => media));

	const hydratedList = list.reduce<HydratedList>(
		(acc, { isWatched, rating, media: { tmdbId } }) => {
			const fetchedMedia = hydratedMedia.find(({ tmdbId: id }) => id === tmdbId);

			if (!fetchedMedia) return acc;

			return [
				...acc,
				{
					...fetchedMedia,
					isWatched: isWatched ?? undefined,
					rating: rating ?? undefined
				}
			];
		},
		new Array<ArrayElement<HydratedList>>()
	);

	return hydratedList;
};
