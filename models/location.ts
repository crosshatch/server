import { T } from "structured_outputs"

export const location = T.object({
  name: T.string,
})`Metadata about a location in the story`