<script>
    import { Card, TableSearch } from "flowbite-svelte";
    import { tasks } from "../stores/store";
    import { crossfade, fade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { CardComponentDinamic } from ".";

    let status = ["Tasks", "In Progress", "Done"];

</script>

<main class="grid grid-cols-3 text-center">
    { #each status as item }
        <CardComponentDinamic { item }/>
    {/each }
</main>
