import {writable, derived} from "svelte/store"
import type { PlateData } from "./types"

const PlateStore = writable<PlateData[]>([

])

const SubtotalStore = derived([PlateStore], ([s]) => {
    const sum = s.filter(i => i.type == "plate").reduce((a, b) => a+b.price, 0)
    return Math.round((sum + Number.EPSILON) * 100) / 100
})

export {PlateStore, SubtotalStore}