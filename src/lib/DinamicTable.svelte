<script>
    import { Card } from "flowbite-svelte";
    import { tasks } from "../stores/store";

    let status = ['To Start', 'In Progress', 'Done'];

</script>

<main class="grid grid-flow-col gap-2 text-center">
    <Card class="min-h-screen drop-shadow-2xl w-8/12">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Task</h5>
        { #each $tasks as task}    
            <div>
                <Card color="primary" class="my-3">
                    <h6 class="font-bold text-white-900">
                        { task.task }
                    </h6>
                </Card>
            </div>
        {/each }
    </Card>
    { #each status as item }
        <Card class="drop-shadow-xl">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ item }</h5>
        </Card>
    {/each}
</main>

