import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { icons } from './src/pwa-icons';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifest: {
				name: 'Cinemus',
				short_name: 'Cinemus',
				start_url: '/',
				display: 'standalone',
				background_color: '#000000',
				lang: 'en',
				scope: '/',
				icons,
				orientation: 'portrait',
				dir: 'ltr',
				shortcuts: [
					{
						name: 'Watchlist',
						url: '/watchlist',
						description: 'View your watchlist'
					}
				],
				categories: ['entertainment']
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		globals: true,
		environment: 'jsdom',
		setupFiles: 'vitest-setup.ts'
	}
});
