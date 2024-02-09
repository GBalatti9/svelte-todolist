<script>
    import { Card } from "flowbite-svelte";
    import { tasks, taskCustomStore } from "../stores/store";
    import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";

    export let tasksLists = [];
    export let item;
    let status = ["To Start", "In Progress", "Done"];

    const { handleDelete, handleEdit, handleStatus } = taskCustomStore;

    const move = (item, { target }) => {
        if (target.name === 'button' || target.name === 'Task') return;
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
        localStorage.setItem('tasks', JSON.stringify($tasks));
    }

    let input;

    $: if (input) {
        input.focus();
    }
</script>



<Card class="drop-shadow-xl w-10/12 mx-auto">
    <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
        { item }
    </h5>        
        {#each tasksLists as task ( task.id )}
            <div transition:fade animate:flip >
                    <Card
                        color    = "primary"
                        class    = "my-3 cursor-pointer"
                        on:click = {( e ) => move( task, e )}
                    >
                    { #if task.editing }
                        <input 
                            type="text" 
                            name="Task" 
                            class="input-edit" 
                            color="primary"
                            bind:this={ input } 
                            bind:value={ task.task } 
                            in:fade
                            >
                    { :else }                    
                        <h6 class="font-bold text-white-900 mb-2">
                            {task.task}
                        </h6>
                    { /if }
                        <div>
                            { #if task.editing }
                                { #each status as item }
                                    <button 
                                        class    = "border border-primary-500 px-2 rounded btn mt-2" 
                                        
                                        value    =  { item }
                                        on:click = {(e) => handleStatus( e, task.id )}
                                        in:fade
                                        >
                                        { item }
                                    </button>
                                    { /each }
                            {:else}
                                <button
                                    name     = "button" 
                                    class    = "border border-primary-500 px-2 rounded btn" 
                                    on:click = {() => handleEdit( task.id )}
                                    >Edit</button
                                >
                                <button
                                    name     = "button" 
                                    class    = "border border-primary-500 px-2 rounded btn" 
                                    on:click = {() => handleDelete( task.id )}
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

    .input-edit{
        border: none;
        outline: none;
        background-color: transparent;
        font-weight: bold;
        border-radius: 5px;
        text-align: center;
    }

</style>