import type { Config } from 'drizzle-kit'
import { loadEnvConfig } from '@next/env'
import { cwd } from 'node:process'

loadEnvConfig(cwd())

export default {
	schema: './server/database/schema.ts',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: { connectionString: process.env.DATABASE_URL! },
} satisfies Config
