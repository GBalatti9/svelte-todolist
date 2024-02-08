<script>
    import { Card } from "flowbite-svelte";
    import { tasks } from "../stores/store";
    import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";

    export let tasksLists = [];
    export let onDelete;
    export let onEdit;
    export let onStatus;
    export let item;
    let status = ["To Start", "In Progress", "Done"];

    const move = (item, { target }) => {
        if (target.name === 'button') return;
        let newTasks = $tasks.map(( task ) => ({
            ...task,
            status: 
                task.id === item.id 
                    ? item.status === 'To Start'
                    ? 'In Progress'
                    : item.status === 'Done'
                        ? 'To Start'
                        : 'Done'
                    : task.status
        }))
        tasks.set(newTasks);
    }
</script>



<Card class="drop-shadow-xl w-10/12">
    <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
        { item }
    </h5>        
        {#each tasksLists as task (task.id)}
            <div transition:fade animate:flip >
                    <Card
                        color="primary"
                        class="my-3 cursor-pointer"
                        on:click={(e) => move(task, e)}
                    >
                        <h6 class="font-bold text-white-900 mb-2">
                            {task.task}
                        </h6>
                        <div>
                            { #if task.editing }
                                { #each status as item }
                                    <button 
                                        class="border border-primary-500 px-2 rounded btn" 
                                        name="button" 
                                        on:click={() => onStatus(task.id, item) }
                                        >
                                        {item}
                                    </button>
                                    { /each }
                            {:else}
                                <button
                                    class="border border-primary-500 px-2 rounded btn" name="button" on:click={() => onEdit(task.id)}
                                    >Edit</button
                                >
                                <button
                                    class="border border-primary-500 px-2 rounded btn" name="button" on:click={() => onDelete(task.id) }
                                    >Delete</button
                                >
                            { /if }
                        </div>
                    </Card>
            </div>
        {/each}
</Card>

<style>
    .btn:hover {
        background-color: rgb(254, 121, 93);
        color: white;
        transition: all 0.2s ease-in-out;
    }
</style>