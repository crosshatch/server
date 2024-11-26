import { Context, loadEnv } from "api"
import "@std/dotenv/load"
import { character } from "models"
import { ResponseFormat, T } from "structured-outputs"

const ctx = new Context(await loadEnv())

export const response_format = ResponseFormat(
  "gen_chars",
  T.Wrapper(T.array(character)`List of characters.`),
)`Create the characters of a children's story.`

console.log(response_format)

const response = await ctx.oai.chat.completions.create({
  model: "gpt-4o",
  messages: [{
    role: "user",
    content: "Generate a story for me.",
  }],
  response_format,
}).then(response_format.into)

console.log(response)
