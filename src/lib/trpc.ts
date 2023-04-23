import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { computeBuckets, computeSubtotal, computeTotals } from "./calculations";
import { SelectableColors } from "../types";
import Decimal from "decimal.js";

export const t = initTRPC.create()

const {procedure} = t

const zDecimal = z
    .instanceof(Decimal)
    .or(z.string())
    .or(z.number())
    .refine((a) => {
        try {
            return new Decimal(a)
        } catch {
            return false
        }
    })
    .transform((a) => new Decimal(a))

const zPlateData = z.object({
    type: z.enum(["plate"]),
    color: z.enum(SelectableColors),
    data: z.number().positive()
})

const zTotals = z.object({
    subTotal: zDecimal,
    tipTotal: zDecimal,
    taxTotal: zDecimal,
    grandTotal: zDecimal
})

export const router = t.router({
    hello: procedure.query(() => "Hello World!"),
    
    subtotal: procedure
        .input(z.array(zPlateData).nonempty())
        .query(({input}) => {
            return computeSubtotal(input)
        }),
    
    totals: procedure
        .input(z.object({
            subtotal: zDecimal,
            tax: z.number().safe(),
            tip: z.number().safe()
        }))
        .query(({input}) => {
            return computeTotals(input.subtotal, input.tax, input.tip)
        }),

    buckets: procedure
        .input(z.object({
            totals: zTotals,
            plates: z.array(zPlateData)
        }))
        .query(({input}) => {
            return computeBuckets(input.totals, input.plates)
        })
})

export type Router = typeof router