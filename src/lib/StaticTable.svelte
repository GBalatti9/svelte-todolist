<script>
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Checkbox,
        Button,
        Input,
        ButtonGroup,
        Toast,
    } from "flowbite-svelte";

    import { tasks, filterTasksList } from "../stores/store";
    import { fade } from "svelte/transition";

    const handleStatus = ( { target }, id, actualStatus ) => {
        if( target.name === 'button' || target.name === 'task') return;
        console.log({actualStatus});
        let newTasksStatus = $tasks.map(( task ) => ({
            ...task,
            editing: task.id === id ? task.editing = false : task.edting,
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
    <Table hoverable={true} shadow >
        <TableHead>
            <TableHeadCell>
            </TableHeadCell>
            <TableHeadCell>#</TableHeadCell>
            <TableHeadCell>Task</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>
                <span class="sr-only">Edit</span>
            </TableHeadCell>
            <TableHeadCell>
                <span class="sr-only">Delete</span>
            </TableHeadCell>
        </TableHead>
    
    <TableBody tableBodyClass="divide-y cursor-pointer">
        { #each $filterTasksList as task (task.id) }
            <TableBodyRow key={ task.id } class="{task.status === 'Done' ? "line-through bg-gray-200" : ''} cursor-pointer" on:click={(e) => handleStatus(e, task.id, task.status)}>
                <TableBodyCell>
                    { #if task.status === 'Done'}
                        <Checkbox on:change={(e) => handleStatus(e, task.id, task.status) } checked class="cursor-pointer"/>
                    { :else }
                        <Checkbox on:change={(e) => handleStatus(e, task.id, task.status) } class="cursor-pointer"/>
                    { /if }
                </TableBodyCell>
                <TableBodyCell style="width:10px;">{ task.id }</TableBodyCell>
                { #if task.editing}
                    <TableBodyCell style="max-width: 130px;">
                        <Input value={ task.task } name="task" on:input={(e) => handleInput(e, task.task, task.id) } style="cursor:text"/>
                    </TableBodyCell>

                { :else }
                    <TableBodyCell style="max-width: 100px; overflow: hidden; text-overflow:ellipsis">
                        <!--  overflow-x:scroll; -->
                        {task.task}
                    </TableBodyCell>
                {/if }
                <TableBodyCell style="max-width:10px;">
                    <span 
                        class:progress = { task.status === 'In Progress' } 
                        class:done     = { task.status === 'Done' }
                        class:start    = { task.status === 'To Start' }
                        >{ task.status }</span></TableBodyCell>
                <TableBodyCell>
                    { #if task.editing }
                    <ButtonGroup>
                        <Button name="button" outline color="primary" on:click={() => handleSave( task.id ) }>Save</Button>
                        <Button name="button" outline color="primary" on:click={() => handleClose( task.id ) }>Close</Button>
                    </ButtonGroup>
                    { :else }
                        <Button name="button" on:click={() => handleEdit( task.id ) }>
                            Edit
                        </Button>
                    { /if }
                </TableBodyCell>
                <TableBodyCell>
                    <Button name="button" on:click={() => handleDelete( task.id ) }>
                        Delete
                    </Button>
                </TableBodyCell>
            </TableBodyRow>
            {/each }
    </TableBody>
</Table>
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
    .progress{
        text-decoration: underline;
        text-decoration-color: yellow;
    }
    .done{
        text-decoration: underline;
        text-decoration-color: green;
    }
    .start{
        text-decoration: underline;
        text-decoration-color: red;
    }

</style>