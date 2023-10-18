<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;

	const watchPartyCount = data.watchParties.size;

	const listFormat = new Intl.ListFormat('en');

	const handleCreateNewParty = () => {
		goto('/watch-party/create');
	};
</script>

<div class="p-8">
	{#if watchPartyCount}
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-4 self-end">
			Your watch parties
		</h1>
		<Button variant="secondary" on:click={handleCreateNewParty}>
			Start a{watchPartyCount > 0 ? 'nother' : ''} watch party!
		</Button>
		<ul class="flex flex-col gap-4 pt-4">
			{#each data.watchParties as [id, users]}
				<li class="flex flex-row gap-4 items-center">
					{#each users as [name, image]}
						<Avatar.Root>
							<Avatar.Image src={image} alt={name} />
							<Avatar.Fallback>{name}</Avatar.Fallback>
						</Avatar.Root>
					{/each}
					<a href={`/watch-party/${id}`} class="underline"
						>{listFormat.format(['You', ...Array.from(users.keys())])}</a
					>
				</li>
			{/each}
		</ul>
	{:else}
		<span>Watching with someone else? </span>
	{/if}
</div>
