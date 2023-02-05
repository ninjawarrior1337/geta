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
    "#b400ff"
] as const

export type SelectableColor = typeof SelectableColors[number]

export type IPlateData = {
    type: "plate"
    id: number
    color: SelectableColor
    price: number
}

export type ITaxData = {
    type: "tax"
    price: number
}

export type ITipData = {
    type: "tip"
    price: number
}

export type PlateData = IPlateData | ITaxData | ITipData

export type PlateUpdate = {
    color?: SelectableColor,
    price?: number
}