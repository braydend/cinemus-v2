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
		)
	};

	type Filter = {
		type: keyof typeof filterOptions;
		value: string;
	};

	export let onFilterChange: (filters: Map<string, Filter>) => void;

	let filters = new Map<string, Filter>();

	const selectFilter = (filter: Filter) => {
		const key = `${filter.type}:${filter.value}`;
		if (filters.has(key)) {
			filters.delete(key);
		} else {
			filters.set(key, filter);
		}
		filters = new Map(filters);
		onFilterChange(filters);
	};

	const clearFilters = () => {
		filters = new Map();
		onFilterChange(filters);
	};

	const filterCollections = Object.entries(filterOptions) as [
		keyof typeof filterOptions,
		Set<string>
	][];
</script>

<div class="flex flex-row flex-wrap gap-4">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button>Filters</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56">
			{#each filterCollections as [groupName, options]}
				<DropdownMenu.Group>
					<DropdownMenu.Label>{sentenceCase(groupName)}</DropdownMenu.Label>
					{#each options as option}
						<DropdownMenu.CheckboxItem
							checked={filters.has(`${groupName}:${option}`)}
							on:click={() => selectFilter({ type: groupName, value: option })}
						>
							{option}
						</DropdownMenu.CheckboxItem>
					{/each}
				</DropdownMenu.Group>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	{#each Array.from(filters.entries()) as [_, filter]}
		<button on:click={() => selectFilter(filter)}>
			<Badge variant="secondary" class="flex flex-row gap-2"><CrossIcon />{filter.value}</Badge>
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
