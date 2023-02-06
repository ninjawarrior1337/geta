<script>
    import "virtual:uno.css"
    import "@unocss/reset/tailwind.css"

    import { pwaInfo } from 'virtual:pwa-info';
    import { onMount } from "svelte";
    import { useRegisterSW } from 'virtual:pwa-register/svelte';

    onMount(() => {
        useRegisterSW({
            onRegistered(r) {
                r && setInterval(() => {
                    console.log('Checking for sw update')
                    r.update()
                }, 20000)
            },
            onRegisterError(error) {
                console.log('SW registration error', error)
            },
        })
    })

    $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>


<slot></slot>