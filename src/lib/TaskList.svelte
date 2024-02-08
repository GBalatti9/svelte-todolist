<script>
    import { Card } from "flowbite-svelte";
    import { tasks } from "../stores/store";
    import { crossfade } from "svelte/transition";
    import { flip } from "svelte/animate";

    export let tasksLists = [];
    export let onDelete;
    export let item;

    const move = (item, { target }) => {
        if (target.name === 'button') return;
        console.log(item);
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
        console.log(newTasks);
        tasks.set(newTasks);
    }

    const [send, receive] = crossfade({
        duration: 1000,
    });
</script>



<Card class="drop-shadow-xl w-10/12">
    <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
        { item }
    </h5>        
        {#each tasksLists as task (task.id)}
            <div
                in:receive={{ key: task.id }}
                out:send={{ key: task.id }}
                animate:flip
            >
                    <Card
                        color="primary"
                        class="my-3 cursor-pointer"
                        on:click={(e) => move(task, e)}
                    >
                        <h6 class="font-bold text-white-900 mb-2">
                            {task.task}
                        </h6>
                        <div>
                            <button
                                class="border border-primary-500 px-2 rounded btn" name="button"
                                >Edit</button
                            >
                            <button
                                class="border border-primary-500 px-2 rounded btn" name="button" on:click={() => onDelete(task.id) }
                                >Delete</button
                            >
                        </div>
                    </Card>
            </div>
        {/each}
</Card>

<!-- {#each status as item}
    <div>
        <Card class="drop-shadow-xl w-10/12">
            <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                {item}
            </h5>
            {#if item === "In Progress"}
                {#each inProgressTasks as task (task.id)}
                    <div in:receive={{ key: task.id }} out:send={{ key: task.id }} animate:flip>
                        <Card
                            color="primary"
                            class="my-3 cursor-pointer"
                            on:click={(e) => move(task, e)}
                        >
                        <h6 class="font-bold text-white-900 mb-2">
                            {task.task}
                        </h6>
                        <div>
                            <button
                                class="border border-primary-500 px-2 rounded btn"
                                >Edit</button
                            >
                            <button
                                class="border border-primary-500 px-2 rounded btn" on:click={() => handleDelete(task.id) }
                                >Delete</button
                            >
                        </div>
                        </Card>
                    </div>
                {/each}
            {/if}

            {#if item === "Done"}
            {#each doneTasks as task (task.id)}
                <div in:receive={{ key: task.id }} out:send={{ key: task.id }} animate:flip>
                    <Card
                        color="primary"
                        class="my-3 cursor-pointer"
                        on:click={(e) => move(task, e)}
                    >
                    <h6 class="font-bold text-white-900 mb-2">
                        {task.task}
                    </h6>
                    <div>
                        <button
                            class="border border-primary-500 px-2 rounded btn"
                            >Edit</button
                        >
                        <button
                            class="border border-primary-500 px-2 rounded btn"
                            >Delete</button
                        >
                    </div>
                    </Card>
                </div>
            {/each}
        {/if} -->

            <!-- {#each $tasks as task (task.id)}
                <div in:fade out:send={{ key: task.id }} animate:flip>
                    {#if task.status === item}
                        <Card
                            color="primary"
                            class="my-3 cursor-pointer"
                            on:click={() => handleStatus(task.id, item)}
                        >
                            <h6 class="font-bold text-white-900 mb-2">
                                {task.task}
                            </h6>
                            <div>
                                <button
                                    class="border border-primary-500 px-2 rounded btn"
                                    >Edit</button
                                >
                                <button
                                    class="border border-primary-500 px-2 rounded btn"
                                    >Delete</button
                                >
                            </div>
                        </Card>
                    {/if}
                </div>
            {/each} -->
        <!-- </Card> -->
    <!-- </div> -->
<!-- {/each} -->


<style>
    .btn:hover {
        background-color: rgb(254, 121, 93);
        color: white;
        transition: all 0.2s ease-in-out;
    }
</style>