export interface TmdbWatchProviderRegionsResponse {
	results: TmdbWatchProviderRegion[];
}

export interface TmdbWatchProviderRegion {
	iso_3166_1: string;
	english_name: string;
	native_name: string;
}

export interface TmdbWatchProviderResponse {
	id: number;
	results: Results;
}

export type Results = Record<string, WatchRegionDetails>;

export interface WatchProviderDetails {
	display_priority: number;
	logo_path: string;
	provider_id: number;
	provider_name: string;
}

interface WatchRegionDetails {
	link: string;
	flatrate: WatchProviderDetails[];
	buy?: WatchProviderDetails[];
	ads?: WatchProviderDetails[];
	rent?: WatchProviderDetails[];
	free?: WatchProviderDetails[];
}
