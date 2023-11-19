import { describe, expect, it, vitest } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Filter from './Filter.svelte';
import userEvent from '@testing-library/user-event';

describe('<Filter />', () => {
	it('renders correctly', () => {
		render(Filter, {
			props: {
				onFilterChange: vitest.fn(),
				media: [{ genres: [], mediaId: 1, tmdbId: 1, type: 'show' }]
			}
		});

		expect(screen.getByRole('button', { name: 'Filters' })).toBeInTheDocument();
	});

	it('allows adding and removing filters', async () => {
		const user = userEvent.setup();
		render(Filter, {
			props: {
				onFilterChange: vitest.fn(),
				media: [{ genres: ['comedy', 'horror', 'romance'], mediaId: 1, tmdbId: 1, type: 'show' }]
			}
		});

		await user.click(screen.getByRole('button', { name: 'Filters' }));
		await user.click(screen.getByRole('menuitemcheckbox', { name: 'Comedy' }));
		await user.click(screen.getByRole('button', { name: 'Filters' }));
		await user.click(screen.getByRole('menuitemcheckbox', { name: 'Horror' }));
		await user.click(screen.getByRole('button', { name: 'Filters' }));
		await user.click(screen.getByRole('menuitemcheckbox', { name: 'Romance' }));

		expect(screen.getByRole('button', { name: 'Comedy' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Horror' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Romance' })).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Comedy' }));
		expect(screen.queryByRole('button', { name: 'Comedy' })).not.toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Clear filters' }));
		expect(screen.queryByRole('button', { name: 'Horror' })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Romance' })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Clear filters' })).not.toBeInTheDocument();
	});
});
