<script lang="ts">
	import BaseMediaRow from './BaseMediaRow.svelte';
	import type { HydratedMedia } from '$lib/types';
	import Button from '$lib/components/ui/button/button.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { goto } from '$app/navigation';
	import { SearchIcon } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar';

	export let media: HydratedMedia & {
		users: {
			id: string;
			image: string;
			name: string;
		}[];
	};

	const handleRouteToMedia = () => {
		goto(`/media/${media.type}/${media.tmdbId}`);
	};
</script>

<BaseMediaRow {media}>
	<div slot="actions" class="flex flex-row gap-4">
		{#each media.users as user}
			<Avatar.Root>
				<Avatar.Image src={user.image} alt={user.name} />
				<Avatar.Fallback>{user.name}</Avatar.Fallback>
			</Avatar.Root>
		{/each}
		<div class="hidden lg:flex flex-row gap-4">
			<Button on:click={() => handleRouteToMedia()} variant="secondary">See details</Button>
		</div>
		<div class="lg:hidden">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<MenuIcon />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56">
					<DropdownMenu.Group>
						<DropdownMenu.Item on:click={() => handleRouteToMedia()}>
							<SearchIcon class="mr-2 h-4 w-4" />
							<span>See details</span>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</BaseMediaRow>
