<script>
	import HomePage from './HomePage.svelte';
	import WatchlistHighlights from './WatchlistHighlights.svelte';

	export let data;
</script>

{#if data.isAuthed}
	<WatchlistHighlights media={data.watchlistHighlights} />
{/if}
<HomePage />
