import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import HomePage from './HomePage.svelte';
import userEvent from '@testing-library/user-event';

describe('<HomePage />', () => {
	it('renders correctly', () => {
		render(HomePage);

		expect(screen.getByRole('heading', { level: 1, name: 'Cinemus' })).toBeInTheDocument();
		expect(
			screen.getByRole('heading', { level: 2, name: 'Streaming simplified' })
		).toBeInTheDocument();
		expect(screen.getByRole('img', { name: 'Cinemus logo' })).toBeInTheDocument();
		expect(screen.getByPlaceholderText('30 Rock')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('searches movies and tv shows', async () => {
		render(HomePage);

		const user = userEvent.setup();

		await user.type(screen.getByPlaceholderText('30 Rock'), 'Avatar');

		expect(
			await screen.findByRole('link', { name: 'Avatar: The Last Airbender' })
		).toBeInTheDocument();
		expect(
			await screen.findByRole('img', { name: 'Avatar: The Last Airbender poster' })
		).toBeInTheDocument();
		expect(await screen.findByRole('note', { name: 'TV Show' })).toBeInTheDocument();
		expect(await screen.findByRole('link', { name: 'Avatar: The Last Airbender' })).toHaveAttribute(
			'href',
			'/media/show/246'
		);

		expect(await screen.findByRole('link', { name: 'Avatar' })).toBeInTheDocument();
		expect(await screen.findByRole('img', { name: 'Avatar poster' })).toBeInTheDocument();
		expect(await screen.findByRole('note', { name: 'Movie' })).toBeInTheDocument();
		expect(await screen.findByRole('link', { name: 'Avatar' })).toHaveAttribute(
			'href',
			'/media/movie/19995'
		);
	});

	it('searches only by the selected media type', async () => {
		render(HomePage);

		const user = userEvent.setup();

		await user.type(screen.getByPlaceholderText('30 Rock'), 'Avatar');
		await user.click(screen.getByRole('combobox'));
		await user.click(screen.getByRole('option', { name: 'TV Show' }));

		expect(
			await screen.findByRole('link', { name: 'Avatar: The Last Airbender' })
		).toBeInTheDocument();
		expect(
			await screen.findByRole('img', { name: 'Avatar: The Last Airbender poster' })
		).toBeInTheDocument();
		expect(await screen.findByRole('note', { name: 'TV Show' })).toBeInTheDocument();
		expect(await screen.findByRole('link', { name: 'Avatar: The Last Airbender' })).toHaveAttribute(
			'href',
			'/media/show/246'
		);
		expect(screen.queryByRole('link', { name: 'Avatar' })).not.toBeInTheDocument();

		await user.click(screen.getByRole('combobox'));
		await user.click(screen.getByRole('option', { name: 'Movie' }));

		expect(await screen.findByRole('link', { name: 'Avatar' })).toBeInTheDocument();
		expect(await screen.findByRole('img', { name: 'Avatar poster' })).toBeInTheDocument();
		expect(await screen.findByRole('note', { name: 'Movie' })).toBeInTheDocument();
		expect(await screen.findByRole('link', { name: 'Avatar' })).toHaveAttribute(
			'href',
			'/media/movie/19995'
		);
		expect(
			screen.queryByRole('link', { name: 'Avatar: The Last Airbender' })
		).not.toBeInTheDocument();
	});
});
