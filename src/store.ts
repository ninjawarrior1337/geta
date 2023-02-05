import {writable, derived} from "svelte/store"
import type { IPlateData, PlateData } from "./types"

const PlateStore = writable<IPlateData[]>([

])

const TaxStore = writable<PlateData>({type: "tax", price: 0})
const TipStore = writable<PlateData>({type: "tip", price: 0})

const SubtotalStore = derived([PlateStore], ([s]) => {
    const sum = s.filter(i => i.type == "plate").reduce((a, b) => a+b.price, 0)
    return Math.round((sum + Number.EPSILON) * 100) / 100
})

const GrandTotalStore = derived([SubtotalStore, TaxStore, TipStore], ([st, ta, ti]) => {
    const sum = st+ta.price+ti.price
    return Math.round((sum + Number.EPSILON) * 100) / 100
})

export {PlateStore, SubtotalStore, TaxStore, TipStore, GrandTotalStore}