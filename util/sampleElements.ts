import { assert } from "@std/assert"

export function sampleElements<T>(a: T[], n: number) {
  assert(n <= a.length, "n cannot be larger than the length of the source array.")
  const copy = [...a]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
  }
  return copy.slice(0, n)
}
