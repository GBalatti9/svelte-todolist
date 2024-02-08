<script>
    import { tasks } from "../stores/store";
    import { TaskList } from ".";

    let status = ["Tasks", "In Progress", "Done"];

    $: tasksToStart = $tasks.filter( task => task.status === 'To Start' || task.status === '' ); // [{...}]
    $: inProgressTasks = $tasks.filter((task) => task.status === "In Progress"); // []
    $: doneTasks = $tasks.filter((task) => task.status === "Done"); // []

    const handleDelete = ( id ) => {
        $tasks = $tasks.filter(( task ) => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify($tasks));
    }

    const handleEdit = (id) => {
        let newTasksEditing = $tasks.map(( task ) => ({
            ...task,
            editing: task.id === id ? true : false
        }))
        tasks.set(newTasksEditing);
        localStorage.setItem('tasks', JSON.stringify($tasks));
    }

    const handleStatus = (id, value) => {
        let newTasks = $tasks.map(( task ) => ({
            ...task,
            editing: false,
            status: task.id === id ? value : task.status
        }))
        tasks.set(newTasks);
        localStorage.setItem('tasks', JSON.stringify($tasks));
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
            onDelete   = { handleDelete }
            onStatus   = { handleStatus }
            onEdit     = { handleEdit }
            />
    { /each }
</main>
