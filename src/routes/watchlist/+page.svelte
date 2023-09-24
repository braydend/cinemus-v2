<script lang="ts">
	import MediaRow from './MediaRow.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-4">
		Your watchlist
	</h1>
	<div class="flex flex-col gap-4 w-full">
		{#each data.list as media}
			<MediaRow {media} />
		{/each}
	</div>
</div>
