<script lang="ts">
    export let color: string
</script>

<button on:click class="aspect-square w-full h-full bg-white grid place-items-center rounded-full">
    <div class="grid place-items-center rounded-full w-9/12 h-9/12" style={`background-color: ${color};`}>
        <div class="rounded-full w-7/12 h-7/12 bg-white"></div>
    </div>
</button>