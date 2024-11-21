import { assert } from "@std/assert"
import { load } from "@std/dotenv"

export interface Env {
  PORT: string
  DATABASE_URL: string
  OPENAI_API_KEY: string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
}

export async function loadEnv(): Promise<Env> {
  const { PORT, DATABASE_URL, OPENAI_API_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =
    await load()
  assert(PORT && DATABASE_URL && OPENAI_API_KEY && AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY)
  return { PORT, DATABASE_URL, OPENAI_API_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY }
}
