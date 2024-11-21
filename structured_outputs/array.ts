import { P_, T_, Ty } from "./Ty.ts"

export function array<E extends Ty>(element: E): Ty<Array<E[T_]>, E[P_]> {
  return Ty((description, ref) => ({
    type: "array",
    description,
    items: ref(element),
  }))
}
