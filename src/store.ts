import {writable, derived} from "svelte/store"
import type { IPlateData, ITaxData, ITipData, PlateData, TotalBuckets } from "./types"
import {Decimal} from "decimal.js/decimal"

const PlateStore = writable<IPlateData[]>([])

const TaxStore = writable<ITaxData>({type: "tax", data: 0})
const TipStore = writable<ITipData>({type: "tip", data: 0})

const SubtotalStore = derived([PlateStore], ([s]) => {
    const sum = s.filter(i => i.type == "plate").reduce((a, b) => a.add(b.data), new Decimal(0))
    return sum
})

const GrandTotalStore = derived([SubtotalStore, PlateStore, TaxStore, TipStore], ([st, ps, ta, ti]) => {
    const sumBeforeAddons = st
    const tipPercent = new Decimal(ti.data).div(100)
    const tip = sumBeforeAddons.mul(tipPercent)
    const tax = new Decimal(ta.data)
    
    return sumBeforeAddons.add(tip).add(tax).toFixed(2)
})

const BucketsStore = derived([SubtotalStore, PlateStore, TaxStore, TipStore], ([st, ps, ta, ti]) => {
    const sumBeforeAddons = st
    const tipPercent = new Decimal(ti.data).div(100)
    const tip = sumBeforeAddons.mul(tipPercent)
    const tax = new Decimal(ta.data)

    let buckets: TotalBuckets = {}

    // Add total spent by each person
    for(let p of ps) {
        if(p.type == "plate") {
            if(p.color in buckets) {
                buckets[p.color] = buckets[p.color].add(p.data)
            } else {
                buckets[p.color] = new Decimal(p.data)
            }
        }
    }

    // Add tip based on what percentage of total each person spent
    for(const [k, v] of Object.entries(buckets)) {
        const percentage = new Decimal(v).div(sumBeforeAddons)
        buckets[k] = buckets[k].add(percentage.mul(tip))
        buckets[k] = buckets[k].add(percentage.mul(tax))
    }

    return buckets
})

export {PlateStore, SubtotalStore, TaxStore, TipStore, GrandTotalStore, BucketsStore}