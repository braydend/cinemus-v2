<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import CrossIcon from '$lib/icons/CrossIcon.svelte';
	import BinIcon from '$lib/icons/BinIcon.svelte';
	import { sentenceCase } from '$lib/utils';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';

	export let media: PageData['list'];

	const filterOptions = {
		genres: new Set(
			media
				.flatMap(({ genres }) => (genres !== undefined ? genres : []))
				.sort((a, b) => a.localeCompare(b))
		),
		isWatched: new Set([true, false]),
		type: new Set(['show', 'movie'])
	};

	type Filter = {
		type: keyof typeof filterOptions;
		value: string;
	};

	export let onFilterChange: (filters: Map<string, Filter>) => void;

	let filters = new Map<string, Filter>();

	const selectFilter = (filter: Filter) => {
		const key = buildKey(filter);
		const mode = getFilterUpdateMode(key, filter);
		switch (mode) {
			case 'SET':
				filters.set(key, filter);
				break;

			case 'TOGGLE':
				filters.set(key, filter);
				break;

			case 'RESET':
				filters.delete(key);
				break;
		}
		filters = new Map(filters);
		onFilterChange(filters);
	};

	const clearFilters = () => {
		filters = new Map();
		onFilterChange(filters);
	};

	const getFilterUpdateMode = (key: string, newValue: Filter): 'SET' | 'TOGGLE' | 'RESET' => {
		const currentFilter = filters.get(key);

		if (currentFilter === undefined) return 'SET';
		if (currentFilter.value === newValue.value) return 'RESET';
		return 'TOGGLE';
	};

	const buildKey = (filter: Filter): string => {
		switch (filter.type) {
			case 'isWatched':
				return 'isWatched';
			case 'type':
				return 'type';
			default:
				return `${filter.type}:${filter.value}`;
		}
	};

	const mapTypeLabel = (type: Filter['type']) => {
		switch (type) {
			case 'isWatched':
				return 'Status';
			default:
				return type;
		}
	};

	const mapValueLabel = (filter: Filter) => {
		switch (filter.type) {
			case 'isWatched':
				return filter.value ? 'Watched' : 'Unwatched';
			default:
				return filter.value;
		}
	};

	const filterCollections = Object.entries(filterOptions) as [
		keyof typeof filterOptions,
		Set<string>
	][];

	const isFilterSelected = <T>(filter: Filter, value?: T): boolean => {
		const appliedFilter = filters.get(buildKey(filter));

		if (appliedFilter === undefined) return false;

		if (value !== undefined) {
			return appliedFilter.value === value;
		}

		return true;
	};
</script>

<div class="flex flex-row flex-wrap gap-4">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button builders={[builder]}>Filters</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56 overflow-y-scroll">
			{#each filterCollections as [groupName, options]}
				<DropdownMenu.Group>
					<DropdownMenu.Label>{sentenceCase(mapTypeLabel(groupName))}</DropdownMenu.Label>
					{#each options as option}
						<DropdownMenu.CheckboxItem
							checked={isFilterSelected({ type: groupName, value: option }, option)}
							on:click={() => selectFilter({ type: groupName, value: option })}
						>
							{sentenceCase(mapValueLabel({ type: groupName, value: option }))}
						</DropdownMenu.CheckboxItem>
					{/each}
				</DropdownMenu.Group>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	{#each Array.from(filters.entries()) as [_, filter]}
		<button on:click={() => selectFilter(filter)}>
			<Badge variant="secondary" class="flex flex-row gap-2"
				><CrossIcon />{sentenceCase(mapValueLabel(filter))}</Badge
			>
		</button>
	{/each}
	{#if filters.size > 0}
		<button on:click={() => clearFilters()}>
			<Badge variant="outline" class="flex flex-row gap-2 text-white">
				<BinIcon />Clear filters
			</Badge>
		</button>
	{/if}
</div>
