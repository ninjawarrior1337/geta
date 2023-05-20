<script lang="ts">
    import PlateItem from "./PlateItem.svelte";
    import { slide } from "svelte/transition";
    import type { PlateUpdate } from "../types";
    import {
        PlateStore,
        TaxStore,
        TipStore,
        BucketsStore,
        DiscountStore,
        TaxStoreRaw,
    } from "../store";
    import ResultsModal from "./ResultsModal.svelte";

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
                data: 0,
                id: Date.now(),
            },
        ]);
    };

    let resultsOpen = false;
</script>

<div
    class="flex justify-center max-w-screen min-h-screen bg-trueGray-8 text-white pb-12"
>
    <div class="w-11/12 md:w-1/3 pt-12 space-y-6">
        <h1
            class="w-full bg-gradient-to-r from-treelar to-muse p-4 rounded shadow-xl text-center text-4xl font-extrabold"
        >
            Geta
        </h1>

        {#each $PlateStore as p, i (p.id)}
            {#if p.type == "plate"}
                <div transition:slide={{ duration: 250 }}>
                    <PlateItem
                        plateData={p}
                        on:delete={() => removePlate(i)}
                        on:colorChange={(e) => {
                            updatePlate(i, { color: e.detail });
                        }}
                        on:priceChange={(e) => {
                            updatePlate(i, { data: e.detail });
                        }}
                    />
                </div>
            {/if}
        {/each}

        <div
            class="grid grid-cols-1 text-2xl font-bold children:p-1 first:rounded-l children:last:rounded-r"
        >
            <button on:click={addPlate} class="bg-aqours">+</button>
        </div>

        <PlateItem
            on:priceChange={(e) =>
                DiscountStore.update((p) => {
                    p.data = e.detail;
                    return p;
                })}
            plateData={$DiscountStore}
        />
        <PlateItem
            on:priceChange={(e) =>
                TaxStoreRaw.update((p) => {
                    p.data = e.detail;
                    return p;
                })}
            plateData={$TaxStore}
        />
        <PlateItem
            on:priceChange={(e) =>
                TipStore.update((p) => {
                    p.data = e.detail;
                    return p;
                })}
            plateData={$TipStore}
        />

        <button
            class="bg-muse w-full py-4 rounded text-xl font-bold"
            on:click={() => (resultsOpen = true)}>Calculate</button
        >
    </div>
</div>

<ResultsModal
    on:close={() => (resultsOpen = false)}
    open={resultsOpen}
    buckets={$BucketsStore}
/>
