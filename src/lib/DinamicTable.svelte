<script>
    import { Card } from "flowbite-svelte";

    let status = ['To Start', 'In Progress', 'Done'];

</script>

<main class="grid grid-flow-col gap-2 text-center">
    <Card class="min-h-screen drop-shadow-2xl">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Task</h5>
    </Card>
    { #each status as item }
        <Card class="drop-shadow-xl">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ item }</h5>
        </Card>
    {/each}
</main>

