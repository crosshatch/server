import { Selectable } from "kysely"
import { Realms } from "schema"
import { ResponseFormat, T } from "structured-outputs"
import { Context } from "../../Context.ts"

export interface CreateRealmArgs {
  contextId: string
  agentIds: string[]
  stage: string
}

export async function create(
  ctx: Context,
  args: CreateRealmArgs,
): Promise<Selectable<Realms>> {
  const { title } = await ctx.oai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [{
          type: "text",
          text:
            `You are a writer of whimsical children's stories. Outline a story about ${args.stage}.`,
        }],
      },
    ],
    response_format: story,
  }).then(story.into)
  const story_ = await ctx.db
    .insertInto("realms")
    .values({ title, description: "" })
    .returningAll()
    .executeTakeFirstOrThrow()
  // await ctx.db
  //   .insertInto("story_passages")
  //   .values(items.map((item) => ({ ...item, story_id: story.story_id })))
  //   .execute()
  return story_
}

const story = ResponseFormat(
  "Something",
  T.object({
    title: T.string`The title of the story.`,
    description: T.string`The description of the story.`,
    items: T.array(
      T.object({
        summary: T.string`A summary of how the sentences progress the story.`,
        content: T.string`Two or three sentences of the story.`,
      })`Two or three sentences of the story`,
    )`A list of sentence+summary objects.`,
  })`A container for the list of items.`,
)`Generate a table of contents for the story`
