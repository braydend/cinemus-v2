<script lang="ts">
	export let providers: { id: number; name: string; image: string }[];
	export let label: string;
</script>

<div class="px-4 pb-2">
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight py-2">{label}</h3>
	<div class="flex flex-row gap-4">
		{#each providers as provider}
			<div>
				<img src={provider.image} alt={`${provider.name}'s icon'`} />
				<span>{provider.name}</span>
			</div>
		{/each}
	</div>
</div>
