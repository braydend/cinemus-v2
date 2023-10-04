import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import {
	AUTH_SECRET,
	EMAIL_FROM,
	GITHUB_ID,
	GITHUB_SECRET,
	SMTP_HOST,
	SMTP_PASSWORD,
	SMTP_PORT,
	SMTP_USER
} from '$env/static/private';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/db';
import Email from '@auth/core/providers/email';

export const handle = SvelteKitAuth({
	providers: [
		GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
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
