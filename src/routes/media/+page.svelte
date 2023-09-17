<script lang="ts">
	import ProviderList from './ProviderList.svelte';

	// TODO: Fetch from TMDB
	const mediaData = {
		title: 'Title',
		synopsis:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur augue ligula, porttitor in dolor at, ornare venenatis lectus. Duis ac lectus et tortor fermentum molestie in at ligula. Fusce lacinia ipsum non purus pulvinar, vel laoreet magna molestie. Aliquam vitae mi porta, imperdiet dui eget, maximus felis. Aliquam nec mi rhoncus arcu vehicula facilisis id vel metus. Vivamus pretium leo a ornare tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce congue mollis pulvinar. Aliquam pharetra eleifend fringilla. Praesent bibendum leo nec diam iaculis, a cursus ex mollis. Phasellus sapien justo, elementum nec felis.',
		providers: {
			paid: [{ id: 1, name: 'Netflix', image: 'https://placehold.co/48x48' }],
			ads: [{ id: 3, name: 'Foxtel Go', image: 'https://placehold.co/48x48' }],
			free: [
				{ id: 7, name: 'Tubi', image: 'https://placehold.co/48x48' },
				{ id: 4, name: 'ABC iView', image: 'https://placehold.co/48x48' }
			]
		}
	};
</script>

<main class="p-8 bg-black text-white">
	<div class="grid md:grid-cols-4 md:grid-rows-1 border-b pb-4">
		<img class="place-self-center pb-4" src="https://placehold.co/240x400" alt="Media poster" />
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
		{#if mediaData.providers.free.length > 0}
			<ProviderList providers={mediaData.providers.free} label="Free" />
		{/if}
		{#if mediaData.providers.ads.length > 0}
			<ProviderList providers={mediaData.providers.ads} label="Ads" />
		{/if}
		{#if mediaData.providers.paid.length > 0}
			<ProviderList providers={mediaData.providers.paid} label="Paid" />
		{/if}
	</div>
</main>
