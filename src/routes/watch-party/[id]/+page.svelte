<script lang="ts">
	import WatchPartyMediaRow from '$lib/components/mediaRow/WatchPartyMediaRow.svelte';
	import InviteModal from './InviteModal.svelte';

	export let data;
</script>

<div class="p-4 flex flex-col gap-4">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Watch party</h1>
	<InviteModal watchPartyId={data.id} />
	{#each data.media as media}
		<WatchPartyMediaRow media={{ ...media.media, users: media.users }} />
	{/each}
</div>
