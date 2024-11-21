import { Selectable } from "kysely"
import { Contexts } from "schema"
import { Context } from "../../Context.ts"

export interface CreateContextArgs {
  name: string
  description: string
}

export function create(_ctx: Context, _args: CreateContextArgs): Promise<Selectable<Contexts>> {
  throw 0
}
