import { T } from "structured_outputs"
import { body } from "./body.ts"
import { personality } from "./personality.ts"

export const character = T.object({
  name: T.object({ first: T.string, last: T.string }),
  profession: T.option(T.string`The title of the character's profession.`),
  species: T.string`The species of the character. Usually human.`,
  gender: T.literalUnion("Female", "Male")`The gender of the character.`,
  body,
  personality,
})`Metadata about a character of the story.`
