import {writable, derived} from "svelte/store"
import type { IPlateData, ITaxData, ITipData, PlateData, TotalBuckets } from "./types"
import {Decimal} from "decimal.js/decimal"
import { computeBuckets, computeSubtotal, computeTotals } from "$lib/calculations"

export const PlateStore = writable<IPlateData[]>([])

export const TaxStore = writable<ITaxData>({type: "tax", data: 0})
export const TipStore = writable<ITipData>({type: "tip", data: 0})

export const SubtotalStore = derived([PlateStore], ([s]) => computeSubtotal(s))

export const TotalsStore = derived([SubtotalStore, TaxStore, TipStore], ([st, ta, ti]) => {
    return computeTotals(st, ta.data, ti.data)
})

export const BucketsStore = derived([TotalsStore, PlateStore], ([ts, ps]) => {
    return computeBuckets(ts, ps)
})