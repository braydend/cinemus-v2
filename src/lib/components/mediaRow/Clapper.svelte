<script lang="ts">
	export let label: string;
</script>

<div class="container">
	<div class="clapper">
		<div class="top" />
		<div class="bottom" />
		<div class="base">{label}</div>
	</div>
</div>

<style>
	.clapper {
		width: fit-content;
	}

	.top {
		background: repeating-linear-gradient(45deg, #ffffff, #ffffff 10px, #000000 10px, #000000 20px);
		width: 100px;
		height: 20px;
		animation: clap 0.7s;
		border-radius: 4px 4px 0 0;
	}

	.bottom {
		background: repeating-linear-gradient(
			135deg,
			#ffffff,
			#ffffff 10px,
			#000000 10px,
			#000000 20px
		);
		width: 100px;
		height: 20px;
	}

	.base {
		background: black;
		width: 100px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid white;
		border-radius: 0 0 4px 4px;
	}

	@keyframes clap {
		0% {
			rotate: 0deg;
			transform-origin: bottom left;
		}
		50% {
			rotate: -40deg;
			transform-origin: bottom left;
		}
		100% {
			rotate: 0deg;
			transform-origin: bottom left;
		}
	}

	@keyframes clapperText {
		0% {
			color: black;
		}
		99% {
			color: black;
		}
		100% {
			color: white;
		}
	}
</style>
