<script lang="ts">
    import { SelectableColors, type PlateData, type SelectableColor } from "../types";
    import { createEventDispatcher } from "svelte";
    import PlateIcon from "./PlateIcon.svelte";
    import {scale} from "svelte/transition"

    export let plateData: PlateData;

    let inner_price = plateData.data.toString();

    $: {
        onPriceChange(parseFloat(inner_price))
    }

    const dispatch = createEventDispatcher<{
        "priceChange": number,
        "colorChange": SelectableColor,
        "delete": never
    }>()

    let showMenu: boolean = false;

    const onPriceChange = (p: number) => {
        dispatch("priceChange", p)
    }

    const onColorChange = (c: SelectableColor) => {
        dispatch("colorChange", c)
    }

    const onDelete = () => {
        dispatch("delete")
    }

    function toggleMenu() {
        showMenu = !showMenu;
    }
</script>

{#if plateData.type == "plate"}
<div
    class="flex items-center justify-between w-full p-4 font-bold text-2xl rounded relative"
    style={`background-color: ${plateData.color};`}
>
    <div class="text-3xl p-2 bg-white text-black shadow-xl rounded max-w-6/12 flex items-center">
        $<input bind:value={inner_price} type="number" class="w-full outline-none"/>
    </div>
    <div class="w-2/12 grid-flow-col place-items-center">
        <PlateIcon on:click={toggleMenu} on:click-outside={toggleMenu} color={plateData.color} />

        {#if showMenu}
            <div
                class="absolute top-full left-full mt-2 w-48 p-4 bg-trueGray-7 grid grid-rows-3 grid-cols-3 gap-4 rounded-xl z-100 shadow-xl -translate-x-full origin-tr"
                transition:scale="{{duration: 250}}"
            >
                {#each SelectableColors as c}
                    <PlateIcon
                        on:click={() => {
                            onColorChange(c)
                            toggleMenu()
                        }}
                        color={c}
                    />
                    {/each}
                <button on:click={() => {onDelete(); toggleMenu()}} class="i-mdi-trash w-full h-full text-red-6"></button>
            </div>
        {/if}
    </div>
</div>
{:else if plateData.type == "tax"}
<div
    class="flex items-center justify-between w-full p-4 font-bold text-2xl rounded relative bg-gray-5"
>
    <span>Tax</span>
    <div class="text-3xl p-2 bg-white text-black shadow-xl rounded w-4/12 flex items-center">
        $<input bind:value={inner_price} type="number" class="w-full outline-none"/>
    </div>
</div>
{:else if plateData.type == "tip"}
<div
    class="flex items-center justify-between w-full p-4 font-bold text-2xl rounded relative bg-gray-4"
>
    <span>Tip</span>
    <div class="text-3xl p-2 bg-white text-black shadow-xl rounded w-4/12 flex items-center">
        <input bind:value={inner_price} type="number" class="w-full outline-none"/>%
    </div>
</div>
{/if}