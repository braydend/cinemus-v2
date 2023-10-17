<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import { successTheme } from '$lib/toaster.js';
	import { toast } from '@zerodevx/svelte-toast';
	import QRCode from 'qrcode';

	export let watchPartyId: string;

	let inviteLink: string | undefined = undefined;

	const handleInvite = async () => {
		const invite = await fetch(`/watch-party/${watchPartyId}/invite`).then((r) => r.json());
		inviteLink = `${window.location.host}/watch-party/join/${invite.invite.id}`;

		const canvas = document.getElementById('invite');

		QRCode.toCanvas(canvas, inviteLink, function (error) {
			if (error) console.error(error);
		});
	};

	const handleCopyLink = () => {
		if (inviteLink) {
			navigator.clipboard.writeText(inviteLink);
			toast.push('Invite copied!', { theme: successTheme });
		}
	};
</script>

<div>
	<AlertDialog.Root>
		<AlertDialog.Trigger asChild let:builder>
			<Button variant="secondary" builders={[builder]} on:click={handleInvite}
				>Invite people!</Button
			>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Invite people to this watch party</AlertDialog.Title>
				<AlertDialog.Description>
					Give this QR code or link to whoever you want to invite.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<div class="flex flex-col items-center">
				<canvas id="invite" class="pt-4" />
				<Button on:click={handleCopyLink}>Copy link</Button>
			</div>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Done</AlertDialog.Cancel>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>
