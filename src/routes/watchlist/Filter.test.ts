import type { ComponentProps } from 'svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Filter from './Filter.svelte';
import { expect, vitest, describe, it } from 'vitest';

/*
 * TODO: Tests dont seems to be cleaning up the render tree after runs.
 * This leads to multiple of the same element being rendered out (hence the need for finding elements by indexes)
 * Need to look further into this, but it looks to be an issue of wither Testing Library or Vitest
 */

type Props = ComponentProps<Filter>;

describe('<Filter />', () => {
	const defaultMedia: Props['media'] = [
		{
			genres: ['Comedy'],
			mediaId: 1,
			tmdbId: 1234,
			type: 'show',
			isWatched: false,
			title: 'My Name Is Earl'
		},
		{
			genres: ['Action', 'Adventure'],
			mediaId: 2,
			tmdbId: 1235,
			type: 'movie',
			isWatched: false,
			title: 'John Wick'
		}
	];

	const setUp = (customProps?: Partial<Props>) => {
		const defaultProps: Props = { media: defaultMedia, onFilterChange: vitest.fn() };
		const props = { ...defaultProps, ...customProps };

		return render(Filter, { props });
	};

	it('renders filter options based on selected media', async () => {
		const user = userEvent.setup();
		setUp();

		await user.click(screen.getAllByRole('button', { name: 'Filters' })[0]);

		expect(screen.getByRole('menu')).toBeTruthy();
		expect(screen.getByRole('group', { name: 'Genres' })).toBeTruthy();
		expect(screen.getByRole('menuitemcheckbox', { name: 'Comedy' })).toBeTruthy();
		expect(screen.getByRole('menuitemcheckbox', { name: 'Action' })).toBeTruthy();
		expect(screen.getByRole('menuitemcheckbox', { name: 'Adventure' })).toBeTruthy();
		expect(screen.getByRole('group', { name: 'Status' })).toBeTruthy();
		expect(screen.getByRole('menuitemcheckbox', { name: 'Watched' })).toBeTruthy();
		expect(screen.getByRole('menuitemcheckbox', { name: 'Unwatched' })).toBeTruthy();
		expect(screen.getByRole('group', { name: 'Type' })).toBeTruthy();
		expect(screen.getByRole('menuitemcheckbox', { name: 'Show' })).toBeTruthy();
		expect(screen.getByRole('menuitemcheckbox', { name: 'Movie' })).toBeTruthy();
	});

	describe('calls onFilterChange when filters are updated', () => {
		it('genre filters', async () => {
			const user = userEvent.setup();
			const mockOnFilterChange = vitest.fn();
			setUp({ onFilterChange: mockOnFilterChange });

			await user.click(screen.getAllByRole('button', { name: 'Filters' })[0]);
			await user.click(screen.getByRole('menuitemcheckbox', { name: 'Comedy' }));

			expect(mockOnFilterChange).toHaveBeenCalledWith(
				new Map<string, unknown>().set('genres:Comedy', { type: 'genres', value: 'Comedy' })
			);

			await user.click(screen.getByRole('menuitemcheckbox', { name: 'Action' }));
			expect(mockOnFilterChange).toHaveBeenCalledWith(
				new Map<string, unknown>()
					.set('genres:Comedy', { type: 'genres', value: 'Comedy' })
					.set('genres:Action', { type: 'genres', value: 'Action' })
			);

			await user.click(screen.getByRole('menuitemcheckbox', { name: 'Comedy' }));
			expect(mockOnFilterChange).toHaveBeenCalledWith(
				new Map<string, unknown>().set('genres:Action', { type: 'genres', value: 'Action' })
			);
		});

		it('status filters', async () => {
			const user = userEvent.setup();
			const mockOnFilterChange = vitest.fn();
			setUp({ onFilterChange: mockOnFilterChange });

			await user.click(screen.getAllByRole('button', { name: 'Filters' })[0]);
			await user.click(screen.getAllByRole('menuitemcheckbox', { name: 'Watched' })[1]);

			expect(mockOnFilterChange).toHaveBeenCalledWith(
				new Map<string, unknown>().set('isWatched', { type: 'isWatched', value: true })
			);

			await user.click(screen.getAllByRole('menuitemcheckbox', { name: 'Unwatched' })[1]);

			expect(mockOnFilterChange).toHaveBeenCalledWith(
				new Map<string, unknown>().set('isWatched', { type: 'isWatched', value: false })
			);

			await user.click(screen.getAllByRole('menuitemcheckbox', { name: 'Unwatched' })[1]);

			expect(mockOnFilterChange).toHaveBeenCalledWith(new Map<string, unknown>());
		});

		it('type filters', async () => {
			const user = userEvent.setup();
			const mockOnFilterChange = vitest.fn();
			setUp({ onFilterChange: mockOnFilterChange });

			await user.click(screen.getAllByRole('button', { name: 'Filters' })[0]);
			await user.click(screen.getAllByRole('menuitemcheckbox', { name: 'Movie' })[2]);

			expect(mockOnFilterChange).toHaveBeenCalledWith(
				new Map<string, unknown>().set('type', { type: 'type', value: 'movie' })
			);

			await user.click(screen.getAllByRole('menuitemcheckbox', { name: 'Show' })[2]);

			expect(mockOnFilterChange).toHaveBeenCalledWith(
				new Map<string, unknown>().set('type', { type: 'type', value: 'show' })
			);

			await user.click(screen.getAllByRole('menuitemcheckbox', { name: 'Show' })[2]);

			expect(mockOnFilterChange).toHaveBeenCalledWith(new Map<string, unknown>());
		});
	});
	it.todo('renders the selected filters as badges');
	it.todo('filters can be removed one-by-one');
	it.todo("all filters can be removed using the 'clear filters' button");
});
