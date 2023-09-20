<script>
	import '../app.postcss';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	const userSession = $page.data.session?.user;
	const isAuthed = Boolean(userSession);

	const handleLogin = () => {
		signIn();
	};

	const handleLogout = () => {
		signOut();
	};
</script>

<div class="h-screen bg-black text-white overflow-y-scroll">
	<nav
		class="w-full h-16 flex flex-row justify-between px-4 border-b-[0.5px] border-gray-600 bg-black sticky top-0"
	>
		<div class="flex items-center justify-center">
			<a href="/"><img src="/couchLogo.png" alt="Cinemus logo" width="64" height="auto" /></a>
		</div>
		<div class="flex items-center justify-center">
			{#if isAuthed}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root>
							<Avatar.Image src={userSession?.image} alt={userSession?.name} />
							<Avatar.Fallback>{userSession?.name}</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label><a href="/watchlist">Watchlist</a></DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item on:click={handleLogout}>Logout</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button on:click={handleLogin}>Log in</Button>
			{/if}
		</div>
	</nav>
	<slot />
</div>
