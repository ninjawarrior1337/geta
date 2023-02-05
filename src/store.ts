import {writable, derived} from "svelte/store"
import type { IPlateData, ITaxData, ITipData, PlateData, TotalBuckets } from "./types"

const PlateStore = writable<IPlateData[]>([

])

const TaxStore = writable<ITaxData>({type: "tax", data: 0})
const TipStore = writable<ITipData>({type: "tip", data: 0})

const SubtotalStore = derived([PlateStore], ([s]) => {
    const sum = s.filter(i => i.type == "plate").reduce((a, b) => a+b.data, 0)
    return Math.round(sum)
})

const GrandTotalStore = derived([SubtotalStore, PlateStore, TaxStore, TipStore], ([st, ps, ta, ti]) => {
    const sumBeforeAddons = st
    const tip = st * (ti.data/100)
    const tax = ta.data

    let buckets: TotalBuckets = {}

    // Add total spent by each person
    for(let p of ps) {
        if(p.type == "plate") {
            if(p.color in buckets) {
                buckets[p.color] += p.data
            } else {
                buckets[p.color] = p.data
            }
        }
    }

    // Add tip based on what percentage of total each person spent
    for(const [k, v] of Object.entries(buckets)) {
        const percentage = v / sumBeforeAddons
        buckets[k] += percentage*tip
        buckets[k] += percentage*tax
    }

    // Fix to 2 decimals
    for(const [k, v] of Object.entries(buckets)) {
        buckets[k] = parseFloat(v.toFixed(2))
    }

    console.log(buckets)
    
    return (sumBeforeAddons+tip+tax).toFixed(2)
})

export {PlateStore, SubtotalStore, TaxStore, TipStore, GrandTotalStore}