<script lang="ts">
	import ProviderList from './ProviderList.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import Button from '$lib/components/ui/button/button.svelte';
	import RegionSelect from '$lib/components/regionSelect/regionSelect.svelte';
	import type { TmdbMovieDetails, TmdbShowDetails, TmdbWatchProviderResponse } from '$lib/tmdb';
	import Label from '$lib/components/ui/label/label.svelte';

	type MediaPageData = {
		region?: {
			value: string;
			label: string;
		};
		providers: TmdbWatchProviderResponse;
		media: TmdbMovieDetails | TmdbShowDetails;
		logoBase: string;
		posterBase: string;
		isListed: boolean;
		isAuthed: boolean;
	};

	export let data: MediaPageData;

	let selectedRegion = data.region?.value ?? '';

	const mediaData = {
		title: data.media.__type === 'show' ? data.media.name : data.media.title,
		synopsis: data.media.overview
	};

	$: providers = data.providers.results[selectedRegion];
	$: isListed = data.isListed;
	$: isAdding = false;

	const addToList = () => {
		isAdding = true;
		fetch('/watchlist/add', {
			method: 'POST',
			body: JSON.stringify({
				mediaId: data.media.id,
				type: data.media.__type
			})
		}).then(({ ok }) => {
			if (ok) {
				isListed = true;
			}
			isAdding = false;
		});
	};

	const mediaTitle = data.media.__type === 'show' ? data.media.name : data.media.title;
</script>

<main class="bg-black text-white">
	<div class="grid md:grid-cols-4 md:grid-rows-1 border-b pb-4">
		<img
			class="place-self-center pb-4"
			src={`${data.posterBase}${data.media.poster_path}`}
			alt={`${mediaTitle} poster`}
			width="240"
			height="auto"
		/>
		<div class="md:col-start-2 col-span-full pl-4">
			<div class="flex flex-row justify-between">
				<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{mediaTitle}
				</h1>
				{#if data.isAuthed}
					{#if isListed}
						<span>This is already in <a class="underline" href="/watchlist">your list</a></span>
					{:else}
						<Button variant="secondary" on:click={() => addToList()} disabled={isAdding}>
							Add to your list
						</Button>
					{/if}
				{:else}
					<span>Log in to add this to your watchlist</span>
				{/if}
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
			<div class="w-1/2 md:w-1/3">
				<Label for="region">Region:</Label>
				<RegionSelect
					id="region"
					selectedRegion={data.region}
					onSelect={(selection) => (selectedRegion = selection.value)}
				/>
			</div>
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
