import type { ComponentProps } from 'svelte';
import { describe, expect, it } from 'vitest';
import UserPreferences from './UserPreferences.svelte';
import { render, screen } from '@testing-library/svelte';

type Props = ComponentProps<UserPreferences>;

describe('<UserPreferences />', () => {
	const setup = (customProps?: Partial<Props>) => {
		const defaultProps: Props = {
			initialRegion: { label: 'Australia', value: 'AU' },
			initialUsername: 'Test User'
		};
		const props = { ...defaultProps, ...customProps };

		return render(UserPreferences, { props });
	};
	it('renders correctly', () => {
		setup();

		expect(screen.getByRole('heading', { level: 1, name: 'Preferences' })).toBeInTheDocument();
		expect(screen.getByLabelText('Username:')).toBeInTheDocument();
		// expect(screen.getByLabelText('Region:')).toBeInTheDocument();
	});
});
