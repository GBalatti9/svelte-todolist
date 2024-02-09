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
    const handleInput = () => {
        console.log(input);
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
                            on:input={ handleInput }
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
                                        name     = "button" 
                                        on:click = {() => onStatus( task.id, item )}
                                        in:fade
                                        >
                                        { item }
                                    </button>
                                    { /each }
                            {:else}
                                <button
                                    name     = "button" 
                                    class    = "border border-primary-500 px-2 rounded btn" 
                                    on:click = {() => onEdit( task.id )}
                                    >Edit</button
                                >
                                <button
                                    name     = "button" 
                                    class    = "border border-primary-500 px-2 rounded btn" 
                                    on:click = {() => onDelete( task.id )}
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