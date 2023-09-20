<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import debounce from 'lodash/debounce';
	import type { TmdbSearchMovieResult, TmdbSearchShowResult } from '../lib/tmdb/types';
	import Badge from '../lib/components/ui/badge/badge.svelte';
	import Spinner from '../lib/components/ui/spinner/spinner.svelte';

	let query = '';
	let type = '';

	type SearchResults = ((TmdbSearchShowResult | TmdbSearchMovieResult) & { poster: string })[];

	let results: Promise<{ results: SearchResults }>;

	const updateSearchPromise = () => {
		results = fetch(`/search?query=${query}&type=${type}`).then((d) => d.json());
	};

	const handleSearch = debounce(() => {
		updateSearchPromise();
	}, 750);

	const handleTypeChange = (newType: string) => {
		type = newType;
		updateSearchPromise();
	};
</script>

<section class="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
	<div class="container px-4 md:px-6">
		<div class="grid gap-6 items-center">
			<div class="flex flex-col justify-center space-y-4 text-center items-center">
				<div class="space-y-2">
					<img src="/textLogo.png" alt="Cinemus Logo" width="600" height="auto" />
					<p class="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100">
						Streaming simplified.
					</p>
				</div>
				<div class="w-full max-w-lg space-y-2 mx-auto">
					<form class="flex space-x-2">
						<Input
							bind:value={query}
							class="max-w-lg flex-1 flex-grow bg-gray-800 text-white border-gray-900"
							placeholder="30 Rock"
							type="email"
							on:input={handleSearch}
						/>
						<Select.Root
							onSelectedChange={(a) => {
								handleTypeChange(a?.value?.toString() ?? '');
							}}
							selected={{ value: 'all', label: 'All' }}
						>
							<Select.Trigger class=" w-1/3 bg-gray-800 text-white border-gray-900">
								<Select.Value placeholder="Media type" />
							</Select.Trigger>
							<Select.Content class="bg-gray-800 text-white border-gray-900">
								<Select.Item value="movie">Movie</Select.Item>
								<Select.Item value="show">TV Show</Select.Item>
								<Select.Item value="all">All</Select.Item>
							</Select.Content>
						</Select.Root>
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
										<Badge variant="secondary">{m.__type === 'show' ? 'TV Show' : 'Movie'}</Badge>
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
