import { P_, T_, Ty } from "./Ty.ts"

export function wrapper<X extends Ty>(ty: X): Ty<{ value: X[T_] }, X[P_]> {
  return Ty((_0, ref) => ({
    type: "object",
    properties: {
      value: ref(ty),
    },
    additionalProperties: false,
    required: ["value"],
  }))
}
