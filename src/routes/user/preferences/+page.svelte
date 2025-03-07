<script>
	import UserPreferences from './UserPreferences.svelte';

	export let data;
</script>

<UserPreferences initialRegion={data.region} initialUsername={data.userName} />
