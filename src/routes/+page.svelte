<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { debounce } from 'lodash';

	let query = '';
	let type = '';

	const handleSearch = debounce(() => {
		fetch(`/search?query=${query}&type=${type}`);
	}, 750);
</script>

<section class="w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
	<div class="container px-4 md:px-6">
		<div class="grid gap-6 items-center">
			<div class="flex flex-col justify-center space-y-4 text-center">
				<div class="space-y-2">
					<h1
						class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
					>
						<!-- Replace with Cinemus logo -->
						Revolutionize Your Email Experience
					</h1>
					<p class="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto">
						Streaming simplified.
					</p>
				</div>
				<div class="w-full max-w-sm space-y-2 mx-auto">
					<form class="flex space-x-2">
						<!-- TODO: Need to render results UI -->
						<Input
							bind:value={query}
							class="max-w-lg flex-1 flex-grow bg-gray-800 text-white border-gray-900"
							placeholder="30 Rock"
							type="email"
							on:input={handleSearch}
						/>
						<Select.Root
							onSelectedChange={(a) => {
								type = a?.value?.toString() ?? '';
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
				</div>
			</div>
		</div>
	</div>
</section>
