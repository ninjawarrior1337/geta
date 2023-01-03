<script lang="ts">
    import PlateItem from "./PlateItem.svelte";

    import { PlateStore, SubtotalStore } from "../store";
    import type { PlateUpdate } from "../types";

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
            Ita (板)
        </h1>

        {#each $PlateStore as p, i}
            {#if p.type == "plate"}
                <PlateItem
                    plateData={p}
                    on:delete={() => removePlate(i)}
                    on:colorChange={(e) => {
                        updatePlate(i, { color: e.detail });
                    }}
                    on:priceChange={(e) => {
                        updatePlate(i, {price: e.detail})
                    }}
                />
            {/if}
        {/each}

        <PlateItem plateData={{type: "tax", price: 12}}></PlateItem>
        <PlateItem plateData={{type: "tip", price: 12}}></PlateItem>

        <div
            class="grid grid-cols-3 text-2xl font-bold children:p-1 first:rounded-l children:last:rounded-r"
        >
            <button class="bg-muse">+Tax</button>
            <button on:click={addPlate} class="bg-aqours">+</button>
            <button class="bg-niji">+Tip</button>
        </div>

        <div>Subtotal: {$SubtotalStore}</div>
    </div>
</div>
