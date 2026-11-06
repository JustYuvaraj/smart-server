import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const profiles = sqliteTable('profiles', { id: text('id').primaryKey(), scope: text('scope').notNull(), body: text('body').notNull() });
export const jobs = sqliteTable('jobs', { id: text('id').primaryKey(), scope: text('scope').notNull(), customerId: text('customer_id').notNull(), workerId: text('worker_id'), status: text('status').notNull(), version: integer('version').notNull().default(0), body: text('body').notNull(), updatedAt: text('updated_at').notNull() }, t=>[index('jobs_scope_idx').on(t.scope)]);
export const uploads = sqliteTable('uploads', { id: text('id').primaryKey(), ownerId: text('owner_id').notNull(), scope: text('scope').notNull(), createdAt: text('created_at').notNull() });
