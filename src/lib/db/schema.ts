import {
	int,
	timestamp,
	mysqlTable,
	primaryKey,
	varchar,
	boolean,
	text
} from 'drizzle-orm/mysql-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { relations } from 'drizzle-orm';

export const watchlist = mysqlTable('watchlist', {
	id: int('id').autoincrement().primaryKey(),
	userId: varchar('userid', { length: 255 }).notNull()
});

export const watchlistRelations = relations(watchlist, ({ many }) => ({
	listedMedia: many(listedMedia)
}));

export const listedMedia = mysqlTable(
	'listedMedia',
	{
		watchlistId: int('watchlistId').notNull(),
		mediaId: int('mediaId').notNull(),
		isWatched: boolean('isWatched').default(false),
		rating: int('rating')
	},
	(listedMedia) => ({
		compoundKey: primaryKey(listedMedia.watchlistId, listedMedia.mediaId)
	})
);

export const listedMediaRelations = relations(listedMedia, ({ one }) => ({
	watchlist: one(watchlist, {
		fields: [listedMedia.watchlistId],
		references: [watchlist.id]
	}),
	media: one(media, {
		fields: [listedMedia.mediaId],
		references: [media.id]
	})
}));

export const media = mysqlTable('media', {
	id: int('id').autoincrement().primaryKey(),
	tmdbId: int('tmdbId').notNull(),
	type: varchar('type', { enum: ['show', 'movie'], length: 5 }).notNull()
});

export const mediaRelations = relations(media, ({ many }) => ({
	listedMedia: many(listedMedia)
}));

// AuthJS Tables
export const users = mysqlTable('user', {
	id: varchar('id', { length: 255 }).notNull().primaryKey(),
	name: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).notNull().default(''),
	emailVerified: timestamp('emailVerified', {
		mode: 'date',
		fsp: 3
	}).defaultNow(),
	image: varchar('image', { length: 255 })
});

export const accounts = mysqlTable(
	'account',
	{
		userId: varchar('userId', { length: 255 }).notNull(),
		type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
		provider: varchar('provider', { length: 255 }).notNull(),
		providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
		refresh_token: varchar('refresh_token', { length: 255 }),
		access_token: varchar('access_token', { length: 255 }),
		expires_at: int('expires_at'),
		token_type: varchar('token_type', { length: 255 }),
		scope: varchar('scope', { length: 255 }),
		id_token: text('id_token'),
		session_state: varchar('session_state', { length: 255 })
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId)
	})
);

export const userRelations = relations(users, ({ one, many }) => ({
	accounts: one(accounts),
	sessions: many(sessions)
}));

export const accountRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	})
}));

export const sessions = mysqlTable('session', {
	sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
	userId: varchar('userId', { length: 255 }).notNull(),
	expires: timestamp('expires', {
		mode: 'date'
	}).notNull()
});

export const sessionRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export const verificationTokens = mysqlTable(
	'verificationToken',
	{
		identifier: varchar('identifier', { length: 255 }).notNull(),
		token: varchar('token', { length: 255 }).notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token)
	})
);
