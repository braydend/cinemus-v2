<script lang="ts">
	import type { WatchProviderDetails } from '../../../../lib/tmdb/watchProviders';

	export let providers: WatchProviderDetails[];
	export let label: string;
	export let imgBaseUrl: string;
</script>

<div class="px-4 pb-2">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight py-2">{label}</h3>
	<div class="flex flex-row gap-4">
		{#each providers as provider}
			<div class="w-12">
				<img
					src={`${imgBaseUrl}${provider.logo_path}`}
					alt={`${provider.provider_name}'s icon'`}
					width="48"
					height="48"
					class="rounded-md"
				/>
				<!-- <p class="">{provider.provider_name}</p> -->
			</div>
		{/each}
	</div>
</div>
