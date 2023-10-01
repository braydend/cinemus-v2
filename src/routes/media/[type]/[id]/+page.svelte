<script lang="ts">
	import ProviderList from './ProviderList.svelte';
	import * as Select from '$lib/components/ui/select';
	import * as Alert from '$lib/components/ui/alert';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;

	let selectedRegion = '';

	const mediaData = {
		title: data.media.__type === 'show' ? data.media.name : data.media.title,
		synopsis: data.media.overview
	};

	$: providers = data.providers.results[selectedRegion];

	const addToList = () => {
		fetch('/watchlist/add', {
			method: 'POST',
			body: JSON.stringify({
				mediaId: data.media.id,
				type: data.media.__type
			})
		});
	};
</script>

<main class="p-8 bg-black text-white">
	<div class="grid md:grid-cols-4 md:grid-rows-1 border-b pb-4">
		<img
			class="place-self-center pb-4"
			src={`${data.posterBase}${data.media.poster_path}`}
			alt="Media poster"
			width="240"
			height="auto"
		/>
		<div class="md:col-start-2 col-span-full pl-4">
			<div class="flex flex-row justify-between">
				<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{mediaData.title}
				</h1>
				<Button variant="secondary" on:click={() => addToList()}>Add to your list</Button>
			</div>
			<p class="leading-7 [&:not(:first-child)]:mt-6">
				{mediaData.synopsis}
			</p>
		</div>
	</div>
	<div class="pt-4">
		<div class="flex flex-row justify-between">
			<h2
				class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				Providers
			</h2>
			<Select.Root
				onSelectedChange={(a) => {
					selectedRegion = a?.value?.toString() ?? '';
				}}
			>
				<Select.Trigger class="w-1/2 md:w-1/3 bg-gray-800 text-white border-gray-900">
					<Select.Value placeholder="Region" />
				</Select.Trigger>
				<Select.Content
					class="bg-gray-800 text-white border-gray-900 overflow-y-scroll max-h-[30vh]"
				>
					{#each data.regions.results as region}
						<Select.Item value={region.iso_3166_1}>{region.english_name}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		{#if !providers}
			<Alert.Root variant="destructive" class="my-4">
				<Alert.Title>Heads up!</Alert.Title>
				<Alert.Description
					>{selectedRegion === ''
						? 'You need to select a region!'
						: `${mediaData.title} is unavailable in this region.`}</Alert.Description
				>
			</Alert.Root>
		{:else}
			{#if providers.free?.length}
				<ProviderList providers={providers.free} imgBaseUrl={data.logoBase} label="Free" />
			{/if}
			{#if providers.ads?.length}
				<ProviderList providers={providers.ads} imgBaseUrl={data.logoBase} label="Ads" />
			{/if}
			{#if providers.flatrate?.length}
				<ProviderList
					providers={providers.flatrate}
					imgBaseUrl={data.logoBase}
					label="Subscription"
				/>
			{/if}
			{#if providers.buy?.length}
				<ProviderList providers={providers.buy} imgBaseUrl={data.logoBase} label="Buy" />
			{/if}
			{#if providers.rent?.length}
				<ProviderList providers={providers.rent} imgBaseUrl={data.logoBase} label="Rent" />
			{/if}
		{/if}
	</div>
</main>
