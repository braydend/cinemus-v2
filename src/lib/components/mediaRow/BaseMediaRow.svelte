<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { sentenceCase } from '$lib/utils';
	import type { HydratedMedia } from '$lib/types';

	export let media: HydratedMedia;
</script>

<div class="flex flex-row gap-4 items-center">
	<img src={media.poster} alt={media.title} width={64} height={'auto'} />
	<div class="flex flex-row justify-between w-full overflow-x-hidden">
		<div>
			<Badge class="text-white" variant="outline">{sentenceCase(media.type)}</Badge>
			<h2
				class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				{media.title}
			</h2>
			<div class="flex flex-row flex-wrap gap-2 overflow-x-hidden">
				{#each media.genres as genre}
					<Badge variant="secondary">{genre}</Badge>
				{/each}
			</div>
		</div>
		<slot name="actions" />
	</div>
</div>
