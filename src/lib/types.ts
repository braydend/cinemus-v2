import type { DefaultSession } from '@auth/core/types';
import type { InferModelFromColumns } from 'drizzle-orm';
import type { listedMedia, media } from './db/schema';

export type ArrayElement<T> = T extends readonly (infer ElementType)[] ? ElementType : never;

export type CustomSession = DefaultSession['user'] & { id?: string };

export type Media = InferModelFromColumns<(typeof media)['$columns']>;
export type ListedMedia = InferModelFromColumns<(typeof listedMedia)['$columns']> & {
	media: Media;
};

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
