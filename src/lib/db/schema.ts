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
import { relations, sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export const watchParty = mysqlTable('watchParty', {
	id: varchar('id', { length: 128 })
		.$defaultFn(() => createId())
		.primaryKey(),
	createdAt: timestamp('createdAt').defaultNow(),
	updatedAt: timestamp('updatedAt').onUpdateNow()
});

export const watchPartyRelations = relations(watchParty, ({ many }) => ({
	watchPartyUsers: many(watchPartyUser)
}));

export const watchPartyUser = mysqlTable(
	'watchPartyUser',
	{
		watchPartyId: varchar('watchPartyId', { length: 128 }),
		userId: varchar('userId', { length: 255 })
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

export const watchPartyInvite = mysqlTable('watchPartyInvite', {
	id: varchar('id', { length: 128 })
		.$defaultFn(() => createId())
		.primaryKey(),
	watchPartyId: varchar('watchPartyId', { length: 128 }).notNull(),
	createdAt: timestamp('createdAt').defaultNow(),
	expiresAt: timestamp('expiresAt').default(sql`(DATE_ADD(NOW(), INTERVAL 60 MINUTE))`)
});

export const watchPartyInviteRelations = relations(watchPartyInvite, ({ one }) => ({
	watchParty: one(watchParty)
}));

export const watchlist = mysqlTable('watchlist', {
	id: int('id').autoincrement().primaryKey(),
	userId: varchar('userId', { length: 255 }).notNull()
});

export const watchlistRelations = relations(watchlist, ({ many, one }) => ({
	listedMedia: many(listedMedia),
	user: one(users)
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

export const userPreferences = mysqlTable('userPreferences', {
	userId: varchar('userId', { length: 255 }).notNull().primaryKey(),
	region: varchar('region', { length: 5 })
});

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
	user: one(users)
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

export const userRelations = relations(users, ({ one, many }) => ({
	accounts: one(accounts),
	sessions: many(sessions),
	preferences: one(userPreferences),
	watchlist: one(watchlist),
	watchParties: many(watchPartyUser)
}));

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
