<script lang="ts">
	import BaseMediaRow from './BaseMediaRow.svelte';
	import type { ArrayElement, HydratedList } from '$lib/types';
	import Clapper from './Clapper.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { truncate } from '$lib/utils';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { goto } from '$app/navigation';
	import { ClapperboardIcon, SearchIcon } from 'lucide-svelte';

	export let media: ArrayElement<HydratedList>;

	export let onWatchedToggle: (media: ArrayElement<HydratedList>) => void;

	let showClapper = false;

	$: isWatched = media.isWatched;
	$: isLoading = false;

	const handleWatched = () => {
		isLoading = true;
		fetch(
			new URL('/watchlist/watch', typeof location !== 'undefined' ? location.origin : undefined),
			{
				method: 'POST',
				body: JSON.stringify({ mediaId: media.mediaId })
			}
		).then(({ ok }) => {
			if (ok) {
				if (!isWatched) {
					showClapper = true;
					setTimeout(() => {
						showClapper = false;
					}, 3500);
				}
				isWatched = !isWatched;

				onWatchedToggle({ ...media, isWatched });
			}
			isLoading = false;
		});
	};

	const handleRouteToMedia = () => {
		goto(`/media/${media.type}/${media.tmdbId}`);
	};
</script>

<BaseMediaRow {media}>
	<div slot="actions">
		<div class="hidden lg:flex flex-row gap-4">
			<Button on:click={() => handleRouteToMedia()} variant="secondary">See details</Button>
			<Button disabled={isLoading} on:click={() => handleWatched()} variant="secondary">
				{isWatched ? 'Unmark as watched' : 'Mark as watched'}
			</Button>
		</div>
		<div class="lg:hidden">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger aria-label="actions">
					<MenuIcon />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56">
					<DropdownMenu.Group>
						<DropdownMenu.Item on:click={() => handleRouteToMedia()}>
							<SearchIcon class="mr-2 h-4 w-4" />
							<span>See details</span>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
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
</BaseMediaRow>

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
