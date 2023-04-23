import Decimal from "decimal.js";
import type { IPlateData, TotalBuckets } from "../types";

type TotalsObject = {
    subTotal: Decimal,
    tipTotal: Decimal,
    taxTotal: Decimal,
    grandTotal: Decimal
}

export const computeSubtotal = (pd: IPlateData[]) => {
    return pd.filter(i => i.type == "plate").reduce((a, b) => a.add(b.data), new Decimal(0))
}

export const computeTotals = (st: Decimal, ta: number, ti: number): TotalsObject => {
    const sumBeforeAddons = st
    const tipPercent = new Decimal(ti).div(100)
    const tip = sumBeforeAddons.mul(tipPercent)
    const tax = new Decimal(ta)

    return {
        subTotal: sumBeforeAddons,
        tipTotal: tip,
        taxTotal: tax,
        grandTotal: sumBeforeAddons.add(tip).add(tax),
    }
}

export const computeBuckets = (ts: TotalsObject, pd: IPlateData[]) => {
    const sumBeforeAddons = ts.subTotal
    const tip = ts.tipTotal
    const tax = ts.taxTotal

    let buckets: TotalBuckets = {}

    // Add total spent by each person
    for (let p of pd) {
        if (p.type == "plate") {
            if (p.color in buckets) {
                buckets[p.color] = buckets[p.color].add(p.data)
            } else {
                buckets[p.color] = new Decimal(p.data)
            }
        }
    }

    // Add tip based on what percentage of total each person spent
    for (const [k, v] of Object.entries(buckets)) {
        const percentage = new Decimal(v).div(sumBeforeAddons)
        buckets[k] = buckets[k].add(percentage.mul(tip))
        buckets[k] = buckets[k].add(percentage.mul(tax))
    }

    return buckets
}