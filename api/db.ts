import { PostgresJSDialect } from "@byzanteam/kysely-deno-postgres-dialect"
import { Kysely } from "kysely"
import postgres from "postgres"
import { DB } from "schema"

export function db(connection: string) {
  return new Kysely<DB>({
    dialect: new PostgresJSDialect({
      postgres: postgres(connection),
    }),
  })
}
