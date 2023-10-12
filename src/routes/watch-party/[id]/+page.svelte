<script lang="ts">
	import WatchPartyMediaRow from '$lib/components/mediaRow/WatchPartyMediaRow.svelte';

	export let data;
</script>

<!-- TODO: add join watch party endpoint -->
<div>Watch party</div>
{#each data.media as media}
	<WatchPartyMediaRow media={{ ...media.media, users: media.users }} />
{/each}
