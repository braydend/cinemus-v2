import { getConfiguration, getMovie, getShow } from './tmdb';
import type { ArrayElement, HydratedList, HydratedMedia, ListedMedia, Media } from './types';

export const hydrateMedia = async (list: Media[]): Promise<HydratedMedia[]> => {
	const [tmdbConfig, ...tmdbMedia] = await Promise.all([
		getConfiguration(),
		...list.map(({ type, tmdbId }) => {
			if (type === 'movie') {
				return getMovie(tmdbId.toString(10));
			}
			return getShow(tmdbId.toString(10));
		})
	]);

	const hydratedMedia = list.reduce<HydratedMedia[]>((acc, { tmdbId, type, id }) => {
		const fetchedMedia = tmdbMedia.find(({ id }) => id === tmdbId);

		if (!fetchedMedia) return acc;

		return [
			...acc,
			{
				poster: `${tmdbConfig.images.secure_base_url}${tmdbConfig.images.poster_sizes.at(-1)}${
					fetchedMedia.poster_path
				}`,
				title: fetchedMedia.__type === 'show' ? fetchedMedia.name : fetchedMedia?.title,
				tmdbId: fetchedMedia.id,
				genres: fetchedMedia.genres.map(({ name }) => name),
				type,
				mediaId: id
			}
		];
	}, new Array<HydratedMedia>());

	return hydratedMedia;
};

export const hydrateList = async (list: ListedMedia[]): Promise<HydratedList> => {
	const hydratedMedia = await hydrateMedia((list ?? []).map(({ media }) => media));

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
