<script>
    import { filterTasksList, taskCustomStore, tasks } from "../stores/store";
    import { TaskList } from ".";
    let status = ["Tasks", "In Progress", "Done"];

    $: tasksToStart = $filterTasksList.filter( task => task.status === 'To Start' || task.status === '' ); // [{...}]
    $: inProgressTasks = $filterTasksList.filter((task) => task.status === "In Progress"); // []
    $: doneTasks = $filterTasksList.filter((task) => task.status === "Done"); // []

    // console.log({$taskCustomStore});

</script>

<main class="grid grid-cols-1 gap-4 lg:grid-cols-3 text-center">
    { #each status as item }
        <TaskList 
            { item } 
            tasksLists = { item === 'Tasks' 
                            ? tasksToStart
                            : item === 'In Progress' 
                                ? inProgressTasks
                            : doneTasks } 
            />
    { /each }
</main>
