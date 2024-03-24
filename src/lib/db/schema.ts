import { integer, sqliteTable, primaryKey, text } from 'drizzle-orm/sqlite-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { relations, sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export const watchParty = sqliteTable('watchParty', {
	id: text('id', { length: 128 })
		.$defaultFn(() => createId())
		.primaryKey(),
	createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updatedAt', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});

export const watchPartyRelations = relations(watchParty, ({ many }) => ({
	watchPartyUsers: many(watchPartyUser)
}));

export const watchPartyUser = sqliteTable(
	'watchPartyUser',
	{
		watchPartyId: text('watchPartyId', { length: 128 }),
		userId: text('userId', { length: 255 })
	},
	(watchPartyUser) => ({
		compoundKey: primaryKey(watchPartyUser.watchPartyId, watchPartyUser.userId)
	})
);

export const watchPartyUserRelations = relations(watchPartyUser, ({ one }) => ({
	user: one(users, {
		fields: [watchPartyUser.userId],
		references: [users.id]
	}),
	watchParty: one(watchParty, {
		fields: [watchPartyUser.watchPartyId],
		references: [watchParty.id]
	})
}));

export const watchPartyInvite = sqliteTable('watchPartyInvite', {
	id: text('id', { length: 128 })
		.$defaultFn(() => createId())
		.primaryKey(),
	watchPartyId: text('watchPartyId', { length: 128 }).notNull(),
	createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
	expiresAt: integer('expiresAt', { mode: 'timestamp' })
});

export const watchPartyInviteRelations = relations(watchPartyInvite, ({ one }) => ({
	watchParty: one(watchParty)
}));

export const watchlist = sqliteTable('watchlist', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	userId: text('userId', { length: 255 }).notNull()
});

export const watchlistRelations = relations(watchlist, ({ many, one }) => ({
	listedMedia: many(listedMedia),
	user: one(users)
}));

export const listedMedia = sqliteTable(
	'listedMedia',
	{
		watchlistId: integer('watchlistId').notNull(),
		mediaId: integer('mediaId').notNull(),
		isWatched: integer('isWatched', { mode: 'boolean' }).default(false),
		rating: integer('rating')
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

export const media = sqliteTable('media', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	tmdbId: integer('tmdbId').notNull(),
	type: text('type', { enum: ['show', 'movie'], length: 5 }).notNull()
});

export const mediaRelations = relations(media, ({ many }) => ({
	listedMedia: many(listedMedia)
}));

export const userPreferences = sqliteTable('userPreferences', {
	userId: text('userId', { length: 255 }).notNull().primaryKey(),
	region: text('region', { length: 5 })
});

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
	user: one(users)
}));

// AuthJS Tables
// export const users = sqliteTable('user', {
// 	id: text('id', { length: 255 }).notNull().primaryKey(),
// 	name: text('name', { length: 255 }),
// 	email: text('email', { length: 255 }).default(''),
// 	emailVerified: integer('emailVerified', {
// 		mode: 'timestamp'
// 	}).default(sql`CURRENT_TIMESTAMP`),
// 	image: text('image', { length: 255 })
// });

export const users = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image')
});

export const userRelations = relations(users, ({ one, many }) => ({
	accounts: one(accounts),
	sessions: many(sessions),
	preferences: one(userPreferences),
	watchlist: one(watchlist),
	watchParties: many(watchPartyUser)
}));

export const accounts = sqliteTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId)
	})
);

export const sessions = sqliteTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
});

export const verificationTokens = sqliteTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token)
	})
);
