import type { DefaultSession } from '@auth/core/types';
import type { listedMedia, media } from './db/schema';
import type { TmdbSearchMovieResult, TmdbSearchShowResult } from './tmdb/types';

export type ArrayElement<T> = T extends readonly (infer ElementType)[] ? ElementType : never;

export type CustomSession = DefaultSession['user'] & { id?: string };

export type Media = typeof media.$inferSelect;
export type ListedMedia = typeof listedMedia.$inferSelect & { media: Media };

export type HydratedMedia = {
	poster?: string;
	title?: string;
	tmdbId: number;
	genres: string[];
	mediaId: number;
	type: 'show' | 'movie';
};

export type HydratedList = ({
	isWatched?: boolean;
	rating?: number;
} & HydratedMedia)[];

export type SearchResults = ((TmdbSearchShowResult | TmdbSearchMovieResult) & { poster: string })[];
