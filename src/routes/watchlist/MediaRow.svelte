<script lang="ts">
	import Clapper from './Clapper.svelte';

	export let media: {
		isWatched: boolean | null;
		rating: number | null;
		poster: string;
		title: string | undefined;
		tmdbID: number | undefined;
	};

	let showClapper = false;

	const handleWatched = () => {
		showClapper = true;

		setTimeout(() => {
			showClapper = false;
		}, 3500);
	};
</script>

<div class="flex flex-row gap-4 items-center">
	<img src={media.poster} alt={media.title} width={64} height={'auto'} />
	<div class="flex flex-row justify-between w-full overflow-x-hidden">
		<h2>{media.title}</h2>
		<button on:click={() => handleWatched()}
			>{media.isWatched ? 'Unamrk as watched' : 'Mark as watched'}</button
		>
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
