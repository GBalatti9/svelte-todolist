<script>
    import { Card } from "flowbite-svelte";
    import { tasks } from "../stores/store";
    import { fade } from "svelte/transition";

    let status = ['In Progress', 'Done'];

</script>

<main class="grid grid-cols-3 text-center">
    <Card class="min-h-screen drop-shadow-2xl w-10/12">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tasks</h5>
        { #each $tasks as task}    
            <div transition:fade>
                <Card color="primary" class="my-3 cursor-pointer">
                    <h6 class="font-bold text-white-900">
                        { task.task }
                    </h6>
                    <div>
                        <button class="border border-primary-500 px-2 rounded btn">Edit</button>
                        <button class="border border-primary-500 px-2 rounded">Delete</button>
                    </div>
                </Card>
            </div>
        {/each }
    </Card>
    { #each status as item }
        <Card class="drop-shadow-xl w-10/12">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ item }</h5>
        </Card>
    {/each}
</main>

<style>
    .btn:hover{
        background-color: rgb(254, 121, 93);
        color: white;
        transition: all 0.2 ease-in-out;
    }
</style>

