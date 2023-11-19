import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MediaPage from './MediaPage.svelte';
import { getShowMocks } from '../../../../../tests/msw/mocks/shows';
import type { ComponentProps } from 'svelte';

type Props = ComponentProps<MediaPage>['data'];

const setup = (customProps?: Partial<Props>) => {
	const defaultProps: Props = {
		isAuthed: false,
		isListed: false,
		logoBase: 'mock/logo/base',
		posterBase: 'mock/poster/base',
		providers: {
			id: 1,
			results: {
				mockprovider: {
					flatrate: [
						{
							display_priority: 1,
							logo_path: 'mock/logo/path',
							provider_id: 1,
							provider_name: 'mock provider'
						}
					],
					link: 'mock/provider/link'
				}
			}
		},
		media: getShowMocks[0],
		region: undefined
	};

	const props: Props = { ...defaultProps, ...customProps };

	return render(MediaPage, {
		props: { data: props }
	});
};

describe('<MediaPage />', () => {
	it('renders correctly', async () => {
		setup();

		expect(
			screen.getByRole('img', { name: 'Avatar: The Last Airbender poster' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('heading', { level: 1, name: 'Avatar: The Last Airbender' })
		).toBeInTheDocument();
		expect(screen.getByRole('heading', { level: 2, name: 'Providers' })).toBeInTheDocument();
		expect(
			screen.getByText(
				'In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny as the Avatar, and bring peace to the world.'
			)
		).toBeInTheDocument();
		expect(screen.getByText('Log in to add this to your watchlist')).toBeInTheDocument();
	});

	it('allows user to add media to list if logged in', () => {
		setup({ isAuthed: true });

		expect(screen.getByRole('button', { name: 'Add to your list' })).toBeInTheDocument();
	});

	it('prompts user to view watchlist if media is already added', () => {
		setup({ isAuthed: true, isListed: true });

		expect(screen.getByText('This is already in')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'your list' })).toBeInTheDocument();
	});
});
