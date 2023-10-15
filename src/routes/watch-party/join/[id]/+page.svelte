<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar';
	import { onMount } from 'svelte';

	export let data;

	const partyLink = `/watch-party/${data.watchPartyId}`;

	onMount(() => {
		setTimeout(() => {
			goto(partyLink);
		}, 10000);
	});
</script>

<div class="grid md:grid-cols-4 grid-cols-1 gap-4">
	<div class="md:col-start-2 md:col-span-2">
		<div class="poster-container">
			{#each data.mediaPosters as [title, url], index}
				<img
					style={`--index:${index}`}
					class="poster"
					src={url}
					alt={title}
					width={256}
					height={'auto'}
				/>
			{/each}
		</div>
		<a href={partyLink} class="underline">Go to watch party</a>
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			Joining watch party
		</h1>
		<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
			People already in this list:
		</h2>
		<ul class="flex flex-col gap-4">
			{#each data.users as [name, image]}
				<li class="flex flex-row gap-4 items-center">
					<Avatar.Root>
						<Avatar.Image src={image} alt={name} />
					</Avatar.Root>
					<span>{name}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	/* .party-link {
		text-decoration: underline;
		opacity: 0;
		animation: fade-in 3s forwards calc(var(--render-delay) * 3s);
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	} */
	.poster-container {
		width: 100%;
		overflow-x: hidden;
		position: relative;
		height: 400px;
	}

	.poster {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0;
		animation: fade-in-out 3s forwards calc(var(--index) * 3s);
	}

	@keyframes fade-in-out {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}
</style>
