import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export type StatementValue = string | number | boolean | Date | null;
export type QueryRow = Record<string, unknown>;

type D1BindValue = string | number | null;

type D1DatabaseBinding = {
  prepare(sql: string): {
    bind(...values: D1BindValue[]): {
      all<T = QueryRow>(): Promise<{ results?: T[] }>;
      run(): Promise<{ success: boolean; meta: { changes?: number; last_row_id?: number } }>;
    };
  };
};

type CloudflareBindings = {
  DB?: D1DatabaseBinding;
};

function toD1Value(value: StatementValue): D1BindValue {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "boolean") return value ? 1 : 0;
  return value;
}

async function getDatabase() {
  const { env } = await getCloudflareContext({ async: true });
  const db = (env as CloudflareBindings).DB;

  if (!db) {
    throw new Error(
      "Missing Cloudflare D1 binding `DB`. Run with `npm run cf:preview` or configure the D1 binding in wrangler.jsonc."
    );
  }

  return db;
}

export async function queryRows<T extends QueryRow[]>(
  sql: string,
  params: StatementValue[] = []
) {
  const db = await getDatabase();
  const result = await db.prepare(sql).bind(...params.map(toD1Value)).all<T[number]>();
  return (result.results ?? []) as T;
}

export async function executeStatement(
  sql: string,
  params: StatementValue[] = []
) {
  const db = await getDatabase();
  return db.prepare(sql).bind(...params.map(toD1Value)).run();
}
