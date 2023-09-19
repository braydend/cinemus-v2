<script>
	import '../app.postcss';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';

	$: isAuthed = false;

	const handleLogin = () => {
		isAuthed = true;
	};

	const handleLogout = () => {
		isAuthed = false;
	};
</script>

<div class="h-screen bg-black">
	<nav
		class="w-full h-16 flex flex-row justify-between px-4 border-b-[0.5px] border-gray-600 bg-black"
	>
		<div class="flex items-center justify-center text-white"><a href="/">LOGO</a></div>
		<div class="flex items-center justify-center">
			{#if isAuthed}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root>
							<!-- Dynamically set with user data from session -->
							<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>Preferences</DropdownMenu.Label>
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
