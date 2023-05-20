import {writable, derived} from "svelte/store"
import type { IDiscountData, IPlateData, ITaxData, ITipData, PlateData, TotalBuckets } from "./types"
import {Decimal} from "decimal.js/decimal"
import { computeBuckets, computeSubtotal, computeTotals } from "$lib/calculations"

export const PlateStore = writable<IPlateData[]>([])

export const TaxStoreRaw = writable<ITaxData>({type: "tax", data: 0})
export const TipStore = writable<ITipData>({type: "tip", data: 0})
export const DiscountStore = writable<IDiscountData>({type: "discount", data: 0})

export const TaxStore = derived([TaxStoreRaw, DiscountStore], ([ta, ds]) => {
    return {
        type: "tax",
        data: ta.data-ds.data
    } as ITaxData
})

export const SubtotalStore = derived([PlateStore], ([s]) => computeSubtotal(s))

export const TotalsStore = derived([SubtotalStore, TaxStore, TipStore, DiscountStore], ([st, ta, ti, ds]) => {
    return {
        ...computeTotals(st, ta.data, ti.data),
        discountTotal: new Decimal(ds.data)
    }
})

export const BucketsStore = derived([TotalsStore, PlateStore], ([ts, ps]) => {
    return computeBuckets(ts, ps)
})