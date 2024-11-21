import type { Ref } from "./Ref.ts"

export function Ty<T, P extends string = never>(
  toSchema: ToSchema,
  descriptions: Description[] = [],
  applied: Applied = {},
): Ty<T, P> {
  return Object.assign(
    <P2 extends string[]>(template: TemplateStringsArray, ...placeheld: P2) =>
      Ty<T, P | P2[number]>(toSchema, [{ template, placeheld }, ...descriptions], applied),
    {} as { [T_]: T; [P_]: P },
    {
      toSchema,
      descriptions,
      applied,
      apply: <A extends Partial<Record<P, string | number>>>(values: A) => {
        return Ty<T, Exclude<P, keyof A>>(toSchema, descriptions, { ...applied, ...values })
      },
    },
  )
}

export interface Ty<T = any, P extends string = string> {
  <P2 extends string[]>(template: TemplateStringsArray, ...placeheld: P2): Ty<T, P | P2[number]>
  [T_]: T
  [P_]: P
  toSchema: ToSchema
  descriptions: Description[]
  applied: Applied
  apply: <A extends Partial<Record<P, number | string>>>(values: A) => Ty<T, Exclude<P, keyof A>>
}

export type ToSchema = (description: string | undefined, ref: Ref) => Schema
export type Schema = Record<string, unknown>

export type T_ = typeof T_
export declare const T_: unique symbol
export type P_ = typeof P_
export declare const P_: unique symbol

export interface Description {
  template: TemplateStringsArray
  placeheld: string[]
}

export type Applied = Record<string, number | string>
