ALTER TABLE "notes" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "id" SET DEFAULT nextval('notes_id_seq'::regclass);