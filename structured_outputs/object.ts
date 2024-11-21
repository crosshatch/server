import { P_, T_, Ty } from "./Ty.ts"

export function object<F extends Record<string, Ty>>(fields: F): Ty<
  { [K in keyof F]: F[K][T_] },
  F[keyof F][P_]
> {
  return Ty((description, ref) => ({
    type: "object",
    description,
    properties: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, ref(v)])),
    additionalProperties: false,
    required: Object.keys(fields),
  }))
}
