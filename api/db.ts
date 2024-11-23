import { PostgresJSDialect } from "@byzanteam/kysely-deno-postgres-dialect"
import { Kysely } from "kysely"
import postgres from "postgres"
import { DB } from "schema"

export function db(connection: string) {
  return new Kysely<DB>({
    dialect: new PostgresJSDialect({
      // TODO: Fix this type error. Likely stems from dependencies on different versions of `postgres`.
      postgres: postgres(connection) as never,
    }),
  })
}
