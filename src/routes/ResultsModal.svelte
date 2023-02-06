<script lang="ts">
    import { dev } from "$app/environment";
    import { createEventDispatcher } from "svelte";
    import { GrandTotalStore, SubtotalStore } from "../store";
    import type { TotalBuckets } from "../types";
    import PlateIcon from "./PlateIcon.svelte";

    export let open: boolean = dev
    export let buckets: TotalBuckets

    type Events = {
        close: null
    }

    const getFmtBuckets = (b: TotalBuckets) => {
        let fmtBuckets: Record<string, string> = {}
        for(const [k, v] of Object.entries(buckets)) {
            fmtBuckets[k] = v.toFixed(2)
        }
        return fmtBuckets
    } 

    $: fmtBuckets = getFmtBuckets(buckets)

    const dispatch = createEventDispatcher<Events>()
</script>

{#if open}
<div class="absolute inset-0">
    <div class="w-8/12 min-h-full mx-auto py-16">
        <div class="bg-trueGray-8 h-full shadow-xl rounded-lg border-2 border-sky-300 flex flex-col p-4 space-y-4 relative">
            <button on:click={() => dispatch("close")} class="absolute top-4 right-4 text-white">X</button>
            {#each Object.entries(fmtBuckets) as [c, split]}
            <div class="flex items-center space-x-4">
                <div class="w-16 h-16">
                    <PlateIcon color={c}></PlateIcon>
                </div>
                <span class="text-white text-2xl font-bold">${split}</span>
            </div>
            {/each}
            <span class="text-white font-bold text-2xl">Subtotal: ${$SubtotalStore}</span>
            <span class="text-white font-bold text-2xl">Total: ${$GrandTotalStore}</span>
        </div>
    </div>
</div>
{/if}