<script lang="ts">
	import MediaPage from './MediaPage.svelte';

	export let data;

	const { session: _, ...mediaData } = data;
</script>

<MediaPage data={mediaData} />
