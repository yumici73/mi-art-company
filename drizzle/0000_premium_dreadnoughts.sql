CREATE TABLE `content` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`title` text NOT NULL,
	`year` integer NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`role` text DEFAULT '' NOT NULL,
	`location` text DEFAULT '' NOT NULL,
	`organizer` text DEFAULT '' NOT NULL,
	`participants` text DEFAULT '' NOT NULL,
	`image` text DEFAULT '' NOT NULL,
	`gallery` text DEFAULT '[]' NOT NULL,
	`video` text DEFAULT '' NOT NULL,
	`related` text DEFAULT '' NOT NULL,
	`featured` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_content_kind_year` ON `content` (`kind`,`year`);--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`organization` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`category` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
