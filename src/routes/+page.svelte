<script lang="ts">
    import PlateItem from "./PlateItem.svelte";
    import {slide} from "svelte/transition"
    import type { PlateUpdate } from "../types";
    import {
        PlateStore,
        SubtotalStore,
        TaxStore,
        TipStore,
        GrandTotalStore,
    } from "../store";

    const updatePlate = (idx: number, p: PlateUpdate) => {
        PlateStore.update((s) => {
            s[idx] = {
                ...s[idx],
                ...p,
            };
            return s;
        });

        console.log($PlateStore);
    };

    const removePlate = (idx: number) => {
        PlateStore.update((s) => {
            return s.filter((v, i) => i != idx);
        });
    };

    const addPlate = () => {
        PlateStore.update((s) => [
            ...s,
            {
                type: "plate",
                color: "#39f",
                price: 0,
                id: Date.now()
            },
        ]);
    };
</script>

<div
    class="flex justify-center max-w-screen min-h-screen bg-trueGray-8 text-white pb-12"
>
    <div class="w-11/12 lg:w-1/3 pt-12 space-y-6">
        <h1
            class="w-full bg-gradient-to-r from-treelar to-muse p-4 rounded shadow-xl text-center text-4xl font-extrabold"
        >
            Geta
        </h1>

        {#each $PlateStore as p, i (p.id)}
            {#if p.type == "plate"}
                <div transition:slide>
                    <PlateItem
                        plateData={p}
                        on:delete={() => removePlate(i)}
                        on:colorChange={(e) => {
                            updatePlate(i, { color: e.detail });
                        }}
                        on:priceChange={(e) => {
                            updatePlate(i, { price: e.detail });
                        }}
                    />
                </div>
            {/if}
        {/each}

        <div
            class="grid grid-cols-1 text-2xl font-bold children:p-1 first:rounded-l children:last:rounded-r"
        >
            <!-- <button class="bg-muse">+Tax</button> -->
            <button on:click={addPlate} class="bg-aqours">+</button>
            <!-- <button class="bg-niji">+Tip</button> -->
        </div>

        <PlateItem
            on:priceChange={(e) =>
                TaxStore.update((p) => {
                    p.price = e.detail;
                    return p;
                })}
            plateData={$TaxStore}
        />
        <PlateItem on:priceChange={(e) =>
            TipStore.update((p) => {
                p.price = e.detail;
                return p;
            })} plateData={$TipStore} />

        <div>Subtotal: {$SubtotalStore}</div>
        <div>Grand Total: {$GrandTotalStore}</div>
    </div>
</div>
