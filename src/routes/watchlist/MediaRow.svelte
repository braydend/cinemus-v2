<script lang="ts">
	import Clapper from './Clapper.svelte';
	import type { PageData } from './$types';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { truncate } from '$lib/utils';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { ClapperboardIcon } from 'lucide-svelte';

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
			<div class="flex flex-row flex-wrap gap-2 overflow-x-hidden">
				{#each media?.genres ?? [] as genre}
					<Badge variant="secondary">{genre}</Badge>
				{/each}
			</div>
		</div>
		<Button
			class="hidden lg:block"
			disabled={isLoading}
			on:click={() => handleWatched()}
			variant="secondary"
		>
			{isWatched ? 'Unmark as watched' : 'Mark as watched'}
		</Button>
		<div class="lg:hidden">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<MenuIcon />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56">
					<DropdownMenu.Group>
						<DropdownMenu.Item on:click={() => handleWatched()}>
							<ClapperboardIcon class="mr-2 h-4 w-4" />
							<span>{isWatched ? 'Unmark as watched' : 'Mark as watched'}</span>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div class={`clapper-container ${showClapper && 'fly-in'}`}>
			{#if showClapper}
				<Clapper label={truncate(media.title ?? '')} />
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
		top: -200px;
		transition: top 0.5s;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.fly-in {
		animation: fly-in-out 2s forwards;
	}

	@keyframes fly-in-out {
		0% {
			top: -200px;
		}

		30% {
			top: 200px;
		}

		70% {
			top: 200px;
		}

		100% {
			top: -200px;
		}
	}
</style>
