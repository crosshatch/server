import { Context, loadEnv } from "api"
import "@std/dotenv/load"
import { character } from "models"
import { T } from "structured_outputs"

const ctx = new Context(await loadEnv())

export const response_format = T.format(
  "gen_chars",
  T.wrapper(T.array(character)`List of characters.`),
)`Create the characters of a children's story.`

console.log(response_format)

const response = await ctx.oai.chat.completions.create({
  model: "gpt-4o",
  messages: [{
    role: "user",
    content: "Generate a story for me.",
  }],
  response_format,
}).then(response_format.parseFirstOrThrow)

console.log(response)
