import { T } from "structured_outputs"

const range = T.number`A number ranging from 0 to 100`

export const bigFive = T.object({
  openness: range,
  conscientiousness: range,
  extroversion: range,
  agreeableness: range,
  neuroticism: range,
})`Big five personality traits`
