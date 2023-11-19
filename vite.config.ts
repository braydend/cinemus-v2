import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		globals: true,
		environment: 'jsdom',
		setupFiles: 'vitest-setup.ts',
		coverage: {
			all: true,
			include: ['src/**/*.ts', 'src/**/*.svelte'],
			exclude: ['src/lib/components/ui'],
			lines: 50,
			branches: 70,
			statements: 50,
			functions: 50
		}
	}
});
