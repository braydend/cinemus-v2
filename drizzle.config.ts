import { Config } from 'drizzle-kit';

const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = process.env;

export default {
	schema: './src/lib/db/schema.ts',
	out: './src/lib/db/drizzle',
	driver: 'mysql2',
	dbCredentials: {
		connectionString: `mysql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/cinemusv2?ssl={"rejectUnauthorized":true}`
	}
} satisfies Config;
