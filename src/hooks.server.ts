import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/db';

export const handle = SvelteKitAuth({
	providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
	adapter: DrizzleAdapter(db),
	secret: AUTH_SECRET
});
