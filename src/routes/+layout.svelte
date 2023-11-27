<script>
	import '../app.postcss';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';
	import { navigating, page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	const userSession = $page.data.session?.user;
	const isAuthed = Boolean(userSession);
	$: isNavigating = false;
	navigating.subscribe((nav) => {
		isNavigating = Boolean(nav?.to);
	});

	const handleLogin = () => {
		signIn();
	};

	const handleLogout = () => {
		signOut();
	};
</script>

<div class="h-screen bg-black text-white overflow-y-scroll">
	<div
		class="nav-loader"
		style={`--loadingWidth:${isNavigating ? '100%' : '0%'}; --loadingAnimation:${
			isNavigating ? 'width 5s ease-out' : 'none'
		}`}
	/>
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
							<DropdownMenu.Item><a href="/watchlist">Watchlist</a></DropdownMenu.Item>
							<DropdownMenu.Item><a href="/watch-party">Watch parties</a></DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item><a href="/user/preferences">Preferences</a></DropdownMenu.Item>
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
	<div class="p-8">
		<slot />
	</div>
</div>
<SvelteToast />

<style>
	.nav-loader {
		height: 0.5rem;
		position: absolute;
		top: 0px;
		z-index: 100;
		width: var(--loadingWidth);
		background-image: linear-gradient(
			to right,
			#4e295a 0%,
			#79609f 17%,
			#ae87bd 34%,
			#cab1d5 51%,
			#d69fb3 68%,
			#e2bcae 85%,
			#f8d089 102%
		);
		transition: var(--loadingAnimation);
	}
</style>
