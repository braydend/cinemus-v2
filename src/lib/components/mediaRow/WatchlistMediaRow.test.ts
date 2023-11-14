import { vitest, describe, it, expect } from 'vitest';
import WatchlistMediaRow from './WatchlistMediaRow.svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

describe('<WatchlistMediaRow />', () => {
	it('renders correctly', async () => {
		const user = userEvent.setup();
		render(WatchlistMediaRow, {
			props: {
				onWatchedToggle: vitest.fn(),
				media: {
					genres: ['Action', 'Comedy'],
					mediaId: 123,
					tmdbId: 321,
					type: 'movie',
					title: 'Mock Movie'
				}
			}
		});

		expect(screen.getByText('Movie')).toBeTruthy();
		expect(screen.getByRole('heading', { level: 2, name: 'Mock Movie' })).toBeTruthy();
		expect(screen.getByText('Action')).toBeTruthy();
		expect(screen.getByText('Comedy')).toBeTruthy();

		await user.click(screen.getByRole('button', { name: 'actions' }));
		expect(screen.getByRole('menuitem', { name: 'See details' })).toBeTruthy();
		expect(screen.getByRole('menuitem', { name: 'Mark as watched' })).toBeTruthy();
	});
});
