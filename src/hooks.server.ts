import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { handle as authHandler } from './auth';

const logger: Handle = ({ event, resolve }) => {
	console.log(`${event.request.method}: ${event.request.url}`);

	return resolve(event);
};

export const handle = sequence(logger, authHandler);
