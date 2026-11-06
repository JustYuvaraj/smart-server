CREATE TABLE `jobs` (
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
CREATE INDEX `jobs_scope_idx` ON `jobs` (`scope`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`scope` text NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`scope` text NOT NULL,
	`created_at` text NOT NULL
);
