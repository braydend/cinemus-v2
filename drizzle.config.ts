import { Config } from 'drizzle-kit';

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

export default {
	schema: './src/lib/db/schema.ts',
	out: './src/lib/db/drizzle',
	driver: 'turso',
	dbCredentials: {
		url: TURSO_DATABASE_URL!,
		authToken: TURSO_AUTH_TOKEN
	}
} satisfies Config;
