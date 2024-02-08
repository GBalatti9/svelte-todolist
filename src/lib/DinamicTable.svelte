<script>
    import { Card, TableSearch } from "flowbite-svelte";
    import { tasks } from "../stores/store";
    import { crossfade, fade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { TaskList } from ".";

    let status = ["Tasks", "In Progress", "Done"];

    $: tasksToStart = $tasks.filter( task => task.status === 'To Start' || task.status === '' ); // [{...}]
    $: inProgressTasks = $tasks.filter((task) => task.status === "In Progress"); // []
    $: doneTasks = $tasks.filter((task) => task.status === "Done"); // []

    const handleDelete = ( id ) => {
        console.log(id);
        return $tasks = $tasks.filter(( task ) => task.id !== id);
    }

    const handleEdit = (id) => {
        let newTasksEditing = $tasks.map(( task ) => ({
            ...task,
            editing: task.id === id ? true : false
        }))
        console.log(newTasksEditing);
        tasks.set(newTasksEditing);
    }

    const handleStatus = (id, value) => {
        let newTasks = $tasks.map(( task ) => ({
            ...task,
            editing: false,
            status: task.id === id ? value : task.status
        }))
        tasks.set(newTasks)
    }
</script>

<main class="grid grid-cols-3 text-center">
    { #each status as item }
        <TaskList 
            { item } 
            tasksLists = { item === 'Tasks' 
                        ? tasksToStart
                        : item === 'In Progress' 
                            ? inProgressTasks
                        : doneTasks } 
            onDelete={ handleDelete }
            onStatus={ handleStatus }
            onEdit={ handleEdit }
            />
    { /each }
</main>
