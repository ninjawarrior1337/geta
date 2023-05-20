import type Decimal from "decimal.js"

export const SelectableColors = [
    "#F0A20B",
    "#E9A9E8",
    "#13E8AE",
    "#F23B4C",
    "#49B9F9",
    "#898989",
    "#E6D617",
    "#AE58EB",
    "#FB75E4",
    "#39f",
    "#e4007f"
] as const

export type SelectableColor = typeof SelectableColors[number]

export type IPlateData = {
    type: "plate"
    id?: number
    color: SelectableColor
    data: number
}

export type ITaxData = {
    type: "tax"
    data: number
}

export type IDiscountData = {
    type: "discount"
    data: number
}

export type ITipData = {
    type: "tip"
    data: number
}

export type PlateData = IPlateData | ITaxData | ITipData | IDiscountData

export type PlateUpdate = {
    color?: SelectableColor,
    data?: number
}

export type TotalBuckets = Record<string, Decimal>