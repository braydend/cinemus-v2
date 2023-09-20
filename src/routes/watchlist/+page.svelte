<script lang="ts">
	export let data;
</script>

<div>
	<h1>Your watchlist</h1>
	<div class="flex flex-col gap-4">
		{#each data.list as media}
			<div class="flex flex-row gap-4 items-center">
				<img src={media.poster} alt={media.title} width={64} height={'auto'} />
				<h2>{media.title}</h2>
				<p>Watched: {media.isWatched}</p>
				{#if media.rating}
					<p>Rated: {media.rating}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>
