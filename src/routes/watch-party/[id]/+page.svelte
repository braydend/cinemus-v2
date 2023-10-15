<script lang="ts">
	import WatchPartyMediaRow from '$lib/components/mediaRow/WatchPartyMediaRow.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;

	const handleInvite = async () => {
		const invite = await fetch(`/watch-party/${data.id}/invite`).then((r) => r.json());

		console.log(invite);
	};
</script>

<!-- TODO: add join watch party endpoint -->
<div>Watch party</div>
<Button on:click={handleInvite}>Invite people!</Button>
{#each data.media as media}
	<WatchPartyMediaRow media={{ ...media.media, users: media.users }} />
{/each}
