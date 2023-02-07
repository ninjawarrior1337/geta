<script lang="ts">
    import { dev } from "$app/environment";
    import { createEventDispatcher } from "svelte";
    import { GrandTotalStore, SubtotalStore } from "../store";
    import type { TotalBuckets } from "../types";
    import PlateIcon from "./PlateIcon.svelte";
    import { blur } from "svelte/transition";
    import { clickOutside } from "$lib/clickOutside";

    export let open: boolean = dev;
    export let buckets: TotalBuckets;

    type Events = {
        close: null;
    };

    const getFmtBuckets = (b: TotalBuckets) => {
        let fmtBuckets: Record<string, string> = {};
        for (const [k, v] of Object.entries(buckets)) {
            fmtBuckets[k] = v.toFixed(2);
        }
        return fmtBuckets;
    };

    $: fmtBuckets = getFmtBuckets(buckets);

    const dispatch = createEventDispatcher<Events>();
</script>

{#if open}
    <div
        transition:blur={{ duration: 250 }}
        class="fixed inset-0 backdrop-blur-lg bg-gray-800/60"
    >
        <div class="w-9/12 md:w-1/3 max-h-full mx-auto py-16">
            <div
                class="bg-trueGray-8 h-full shadow-xl rounded-lg border-2 border-treelar flex flex-col p-4 space-y-4 relative"
                use:clickOutside={() => {
                    dispatch("close")
                }}
            >
                {#each Object.entries(fmtBuckets) as [c, split]}
                    <div class="flex items-center space-x-4">
                        <div class="w-16 h-16">
                            <PlateIcon color={c} />
                        </div>
                        <span class="text-white text-2xl font-bold"
                            >${split}</span
                        >
                    </div>
                {/each}
                <span class="text-white font-bold text-2xl"
                    >Subtotal: ${$SubtotalStore}</span
                >
                <span class="text-white font-bold text-2xl"
                    >Total: ${$GrandTotalStore}</span
                >
                <button
                    class="bg-muse rounded text-white py-2"
                    on:click={() => dispatch("close")}
                >
                    Close
                </button>
            </div>
        </div>
    </div>
{/if}
