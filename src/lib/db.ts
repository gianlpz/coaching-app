import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const isDemoMode = !process.env.DATABASE_URL;

let _db: NeonHttpDatabase<typeof schema> | null = null;

if (process.env.DATABASE_URL) {
  const sql = neon(process.env.DATABASE_URL);
  _db = drizzle(sql, { schema });
}

export const db = _db;
