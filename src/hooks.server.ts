import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import {
	AUTH_SECRET,
	EMAIL_FROM,
	GITHUB_ID,
	GITHUB_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	SMTP_HOST,
	SMTP_PASSWORD,
	SMTP_PORT,
	SMTP_USER
} from '$env/static/private';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/db';
import Email from '@auth/core/providers/email';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

const logger: Handle = ({ event, resolve }) => {
	console.log(`${event.request.method}: ${event.request.url}`);

	return resolve(event);
};

const auth = SvelteKitAuth({
	providers: [
		GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
		Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
		// TODO: Remove the ts-ignore when the package is updated
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		Email({
			server: {
				host: SMTP_HOST,
				port: Number(SMTP_PORT),
				auth: {
					user: SMTP_USER,
					pass: SMTP_PASSWORD
				}
			},
			from: EMAIL_FROM
		})
	],
	adapter: DrizzleAdapter(db),
	secret: AUTH_SECRET,
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id
			}
		})
	}
});

export const handle = sequence(logger, auth);
