<script lang="ts">
	import Clapper from './Clapper.svelte';
	import type { PageData } from './$types';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let media: PageData['list'] extends readonly (infer ElementType)[] ? ElementType : never;

	let showClapper = false;

	$: isWatched = media.isWatched;
	$: isLoading = false;

	const handleWatched = () => {
		isLoading = true;
		fetch('/watchlist/watch', {
			method: 'POST',
			body: JSON.stringify({ mediaId: media.mediaId })
		}).then(({ ok }) => {
			if (ok) {
				if (!isWatched) {
					showClapper = true;
					setTimeout(() => {
						showClapper = false;
					}, 3500);
				}
				isWatched = !isWatched;
			}
			isLoading = false;
		});
	};
</script>

<div class="flex flex-row gap-4 items-center">
	<img src={media.poster} alt={media.title} width={64} height={'auto'} />
	<div class="flex flex-row justify-between w-full overflow-x-hidden">
		<div>
			<h2
				class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				{media.title}
			</h2>
			<div class="flex flex-row gap-2">
				{#each media?.genres ?? [] as genre}
					<Badge variant="secondary">{genre}</Badge>
				{/each}
			</div>
		</div>
		<Button disabled={isLoading} on:click={() => handleWatched()} variant="secondary">
			{isWatched ? 'Unmark as watched' : 'Mark as watched'}
		</Button>
		<div class={`clapper-container ${showClapper && 'fly-in'}`}>
			{#if showClapper}
				<Clapper />
			{/if}
		</div>
		{#if media.rating}
			<p>Rated: {media.rating}</p>
		{/if}
	</div>
</div>

<style>
	.clapper-container {
		position: fixed;
		right: -200px;
		transition: right 0.5s;
		margin-top: -40px;
	}

	.fly-in {
		animation: fly-in-out 3s forwards;
	}

	@keyframes fly-in-out {
		0% {
			right: -200px;
		}

		10% {
			right: 0px;
		}

		90% {
			right: 0px;
		}

		100% {
			right: -200px;
		}
	}
</style>
