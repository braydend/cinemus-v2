<script lang="ts">
	import MediaRow from './MediaRow.svelte';
	import type { PageData } from './$types';
	import Filter from './Filter.svelte';
	import isArray from 'lodash/isArray';

	export let data: PageData;

	let list = data.list;

	type Media = PageData['list'] extends readonly (infer ElementType)[] ? ElementType : never;

	let mediaFilters: Map<string, { type: keyof Media; value: string }> = new Map();
	$: filteredMedia = list.filter((m) => {
		let isValid = true;
		for (const [_, { type: field, value }] of mediaFilters) {
			const fieldValue = m[field];

			if (typeof fieldValue === 'string') {
				isValid = isValid && fieldValue === value;
			}

			if (isArray(fieldValue)) {
				isValid = isValid && fieldValue.includes(value);
			}

			if (field === 'isWatched') {
				isValid = isValid && value === fieldValue;
			}
		}

		return isValid;
	});

	const handleToggleWatched = (toggledMedia: Media) => {
		list = list.map((existingMedia) =>
			existingMedia.tmdbID === toggledMedia.tmdbID && existingMedia.type === toggledMedia.type
				? toggledMedia
				: existingMedia
		);
	};
</script>

<div class="p-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-4">
		Your watchlist
	</h1>
	<Filter
		media={list ?? []}
		onFilterChange={(s) => {
			mediaFilters = s;
		}}
	/>
	<div class="flex flex-col gap-4 pt-4 w-full">
		{#each filteredMedia as media}
			<MediaRow {media} onWatchedToggle={handleToggleWatched} />
		{/each}
	</div>
</div>
