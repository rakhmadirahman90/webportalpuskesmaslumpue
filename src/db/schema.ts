import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  uid: text('uid').primaryKey(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const admins = pgTable('admins', {
  username: text('username').primaryKey(),
  password: text('password').notNull(), // We'll store plain text or simple hash depending on requirements, but bcrypt is better.
});

export const cmsSettings = pgTable('cms_settings', {
  id: text('id').primaryKey(), // We'll just use "singleton" for the main site config
  hero: jsonb('hero'),
  profile: jsonb('profile'),
  services: jsonb('services'),
  news: jsonb('news'),
  gallery: jsonb('gallery'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
