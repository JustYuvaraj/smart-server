CREATE TABLE IF NOT EXISTS `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`scope` text NOT NULL,
	`customer_id` text NOT NULL,
	`worker_id` text,
	`status` text NOT NULL,
	`version` integer DEFAULT 0 NOT NULL,
	`body` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `jobs_scope_idx` ON `jobs` (`scope`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`scope` text NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `uploads` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`scope` text NOT NULL,
	`created_at` text NOT NULL,
	`content_type` text,
	`data` text
);
