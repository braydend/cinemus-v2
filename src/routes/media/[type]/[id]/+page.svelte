<script lang="ts">
	import ProviderList from './ProviderList.svelte';

	export let data;

	let selectedRegion = 'AU' ?? data.regions.results[0].iso_3166_1 ?? '';

	const mediaData = {
		title: data.media.__type === 'show' ? data.media.name : data.media.title,
		synopsis: data.media.overview
	};

	const providers = data.providers.results[selectedRegion];
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
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{mediaData.title}
			</h1>
			<p class="leading-7 [&:not(:first-child)]:mt-6">
				{mediaData.synopsis}
			</p>
		</div>
	</div>
	<div class="pt-4">
		<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
			Providers
		</h2>
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
	</div>
</main>
