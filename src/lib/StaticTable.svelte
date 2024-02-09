<script>

    import { tasks, filterTasksList } from "../stores/store";
    import { StaticTableComponent } from "./";

    const handleStatus = ( { target }, id, actualStatus ) => {
        if( target.name === 'button' || target.name === 'task') return;
        console.log({actualStatus});
        let newTasksStatus = $tasks.map(( task ) => ({
            ...task,
            editing: task.id === id ? false : task.edting,
            status: task.id === id ? task.status === 'Done' ? 'In Progress' : 'Done' : task.status,
            // status: task.id === id ? task.status === 'Done' ? actualStatus : 'Done' : task.status,
        }))

        tasks.set(newTasksStatus);
        localStorage.setItem('tasks', JSON.stringify($tasks));
    }
    
    const handleDelete = ( id ) => {
        $tasks = $tasks.filter(( task ) => task.id !== id);
        return localStorage.setItem('tasks', JSON.stringify($tasks));
    }

    const handleEdit = ( id ) => {
        let newTasksStatus = $tasks.map(( task ) => ({
            ...task,
            editing: task.id === id ? true : false
        }))

        tasks.set(newTasksStatus);
        localStorage.setItem('tasks', JSON.stringify($tasks));
        console.log(newTasksStatus);
    }

    const handleInput = ({target}, task, id) => {
        const { name, value } = target;
        console.log({ name, value, task, id });
        let newTasksStatus = $tasks.map(( task ) => ({
            ...task,
            task: task.id === id ? value : task.task
        }))
        tasks.set(newTasksStatus);
        localStorage.setItem('tasks', JSON.stringify($tasks));
    }

    const handleSave = ( id ) => {
        let newTasksStatus = $tasks.map(( task ) => ({
            ...task,
            editing: task.id === id ? false : task.editing,
        }))
        tasks.set(newTasksStatus);
        localStorage.setItem('tasks', JSON.stringify($tasks));
    }

    const handleClose = ( id ) => {
        let newTasksStatus = $tasks.map(( task ) => ({
            ...task,
            editing: task.id === id ? false : task.editing,
        }))
        tasks.set(newTasksStatus);
        localStorage.setItem('tasks', JSON.stringify($tasks));
    }

</script>

<main>
    { #if $filterTasksList.length > 0 }    
        <StaticTableComponent 
            { filterTasksList } 
            { handleClose } 
            { handleDelete } 
            { handleSave } 
            { handleEdit } 
            { handleInput } 
            { handleStatus }
            />
    {:else}
    <div class="box">
        <p>Add your first task...</p>
    </div>
    {/if}
</main>

<style>

    .box{
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>