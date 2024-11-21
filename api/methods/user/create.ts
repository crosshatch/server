import { Selectable } from "kysely"
import { Agents } from "schema"
import { Context } from "../../Context.ts"

export interface CreateUserArgs {
  name: string
}

export function create(_ctx: Context, _args: CreateUserArgs): Promise<Selectable<Agents>> {
  throw 0
}
