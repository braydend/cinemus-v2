<script>
	import RegionSelect from '$lib/components/regionSelect/regionSelect.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { errorTheme, successTheme } from '$lib/toaster';
	import { toast } from '@zerodevx/svelte-toast';

	export let data;

	let selectedRegion = data.region ?? { value: '', label: '' };

	const handleSave = async () => {
		const resp = await fetch('/user/preferences', {
			method: 'POST',
			body: JSON.stringify({ region: selectedRegion.value })
		});

		if (resp.ok) {
			toast.push('Saved changes!', { theme: successTheme });
			return;
		}

		toast.push('Something went wrong!', { theme: errorTheme });
	};
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-4">Preferences</h1>
<div class="flex flex-col gap-4">
	<div>
		<label for="region-select">Region:</label>
		<RegionSelect
			id="region-select"
			{selectedRegion}
			onSelect={(selection) => {
				selectedRegion = selection;
			}}
		/>
	</div>
	<div>
		<Button on:click={() => handleSave()}>Save changes</Button>
	</div>
</div>
