<script lang="ts">
	import type { HydratedList, HydratedMedia } from '../lib/types';

	export let media: HydratedMedia[];
</script>

<ul class="p-4 flex flex-row items-center border-white border gap-4">
	{#each media as item}
		<li class="border-white border">
			<img src={item.poster} alt={`poster for ${item.title}`} width="160" height="auto" />
			<span>{item.title}</span>
		</li>
	{/each}
</ul>
