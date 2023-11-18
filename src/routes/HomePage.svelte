<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import debounce from 'lodash/debounce';
	import Badge from '../lib/components/ui/badge/badge.svelte';
	import Spinner from '../lib/components/ui/spinner/spinner.svelte';
	import type { SearchResults } from '$lib/types';
	import { get } from '$lib/fetch';
	import { Label } from '$lib/components/ui/label';

	let query = '';
	let type = 'all';

	let results: Promise<{ results: SearchResults }>;

	const updateSearchPromise = () => {
		results = get(`/search?query=${query}&type=${type}`).then((d) => d.json());
	};

	const handleSearch = debounce(() => {
		updateSearchPromise();
	}, 750);

	const handleTypeChange = (newType: string) => {
		type = newType;
		if (query.length > 0) {
			updateSearchPromise();
		}
	};
</script>

<section class="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
	<div class="container px-4 md:px-6">
		<div class="grid gap-6 items-center">
			<div class="flex flex-col justify-center space-y-4 text-center items-center">
				<div class="space-y-2">
					<h1 class="hidden">Cinemus</h1>
					<img src="/textLogo.png" alt="Cinemus logo" width="600" height="auto" />
					<h2 class="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100">
						Streaming simplified
					</h2>
				</div>
				<div class="w-full max-w-lg space-y-2 mx-auto">
					<form class="flex space-x-2">
						<div class="grow flex flex-col items-start space-y-2">
							<Label for="query">Title:</Label>
							<Input
								id="query"
								bind:value={query}
								class="max-w-lg bg-gray-800 text-white border-gray-900"
								placeholder="30 Rock"
								type="text"
								on:input={handleSearch}
							/>
						</div>
						<div class="grow flex flex-col items-start space-y-2">
							<Select.Root
								onSelectedChange={(a) => {
									handleTypeChange(a?.value?.toString() ?? '');
								}}
								selected={{ value: 'all', label: 'All' }}
							>
								<Select.Label class="px-0 py-0 font-medium leading-none">Media type:</Select.Label>
								<Select.Trigger class=" bg-gray-800 text-white border-gray-900">
									<Select.Value placeholder="Media type" />
								</Select.Trigger>
								<Select.Content class="bg-gray-800 text-white border-gray-900">
									<Select.Item value="movie">Movie</Select.Item>
									<Select.Item value="show">TV Show</Select.Item>
									<Select.Item value="all">All</Select.Item>
								</Select.Content>
							</Select.Root>
						</div>
					</form>
					<div class="overflow-y-scroll flex flex-col max-h-96 gap-2">
						{#if results}
							{#await results}
								<div>
									<Spinner />
								</div>
							{:then media}
								{#each media.results as m}
									<a
										class="text-white flex flex-row gap-4 hover:bg-muted/20 items-center"
										href={`/media/${m.__type}/${m.id}`}
										aria-label={m.__type === 'show' ? m.name : m.title}
									>
										<img
											src={m.poster}
											alt={`${m.__type === 'show' ? m.name : m.title} poster`}
											width="46"
											height="auto"
										/>
										<p>
											{m.__type === 'show' ? m.name : m.title}
										</p>
										<Badge
											variant="secondary"
											role="note"
											aria-label={m.__type === 'show' ? 'TV Show' : 'Movie'}
											>{m.__type === 'show' ? 'TV Show' : 'Movie'}</Badge
										>
									</a>
								{/each}
							{/await}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
