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

		expect(screen.getByText('Movie')).toBeInTheDocument();
		expect(screen.getByRole('heading', { level: 2, name: 'Mock Movie' })).toBeInTheDocument();
		expect(screen.getByText('Action')).toBeInTheDocument();
		expect(screen.getByText('Comedy')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'actions' }));
		expect(screen.getByRole('menuitem', { name: 'See details' })).toBeInTheDocument();
		expect(screen.getByRole('menuitem', { name: 'Mark as watched' })).toBeInTheDocument();
	});

	it('shows clapper when media is marked as watched', async () => {
		location.replace(`http://localhost`);
		const user = userEvent.setup();
		const mockOnWatched = vitest.fn();
		render(WatchlistMediaRow, {
			props: {
				onWatchedToggle: mockOnWatched,
				media: {
					genres: ['Action', 'Comedy'],
					mediaId: 123,
					tmdbId: 321,
					type: 'movie',
					title: 'Mock Movie',
					isWatched: false
				}
			}
		});

		await user.click(screen.getByRole('button', { name: 'actions' }));
		await user.click(screen.getByRole('button', { name: 'Mark as watched' }));

		expect(mockOnWatched).toHaveBeenCalled();
		expect(await screen.findByTestId('clapper')).toBeInTheDocument();
	});

	it('does not show clapper when media is unmarked as watched', async () => {
		location.replace(`http://localhost`);
		const user = userEvent.setup();
		const mockOnWatched = vitest.fn();
		render(WatchlistMediaRow, {
			props: {
				onWatchedToggle: mockOnWatched,
				media: {
					genres: ['Action', 'Comedy'],
					mediaId: 123,
					tmdbId: 321,
					type: 'movie',
					title: 'Mock Movie',
					isWatched: true
				}
			}
		});

		await user.click(screen.getByRole('button', { name: 'actions' }));
		await user.click(screen.getByRole('button', { name: 'Unmark as watched' }));

		expect(mockOnWatched).toHaveBeenCalled();
		expect(screen.queryByTestId('clapper')).not.toBeInTheDocument();
	});
});
