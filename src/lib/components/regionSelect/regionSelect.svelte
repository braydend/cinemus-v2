<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import type { TmdbWatchProviderRegion, TmdbWatchProviderRegionsResponse } from '$lib/tmdb';
	import { onMount } from 'svelte';

	type SelectOption = { label: string; value: string };

	export let selectedRegion = { value: '', label: '' };
	export let onSelect: ({ label, value }: SelectOption) => void;

	let regions: TmdbWatchProviderRegion[] = [];

	onMount(async () => {
		const response: { regions: TmdbWatchProviderRegionsResponse } = await fetch('/regions').then(
			(r) => r.json()
		);

		regions = response.regions.results;
	});

	const handleSelection = (option: SelectOption) => {
		selectedRegion = option;
		onSelect(option);
	};

	$: isLoading = regions.length === 0;
</script>

<Select.Root
	onSelectedChange={(selection) => {
		handleSelection({
			value: selection?.value?.toString() ?? '',
			label: selection?.label?.toString() ?? ''
		});
	}}
	disabled={isLoading}
	selected={selectedRegion}
>
	<Select.Trigger class="w-1/2 md:w-1/3 bg-gray-800 text-white border-gray-900">
		<Select.Value placeholder="Region" />
	</Select.Trigger>
	<Select.Content class="bg-gray-800 text-white border-gray-900 overflow-y-scroll max-h-[30vh]">
		{#each regions as region}
			<Select.Item value={region.iso_3166_1}>{region.english_name}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
