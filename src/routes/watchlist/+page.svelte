<script lang="ts">
	import MediaRow from './MediaRow.svelte';

	export let data;
</script>

<div>
	<h1>Your watchlist</h1>
	<div class="flex flex-col gap-4 w-full">
		{#each data.list as media}
			<MediaRow {media} />
		{/each}
	</div>
</div>
