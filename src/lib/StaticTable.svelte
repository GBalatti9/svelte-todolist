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
    } from "flowbite-svelte";

    import { tasks, filterTasksList } from "../stores/store";

    const handleStatus = ({ target }, id) => {
        if( target.name === 'button' || target.name === 'input') return;
        let newTasksStatus = $tasks.map(( task ) => ({
            ...task,
            status: task.id === id ? task.status === 'Done' ? 'In Progress' : 'Done' : task.status,
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

    const handleInput = ({target}, task) => {
        const { name, value } = target;
        console.log({ name, value, task });
    }
</script>

<Table hoverable={true} shadow>
    <TableHead>
        <TableHeadCell class="!p-4">
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
        
            <TableBodyRow key={ task.id } class="{task.status === 'Done' ? "line-through bg-gray-200" : ''} cursor-pointer" on:click={(e) => handleStatus(e, task.id)}>
                <TableBodyCell class="!p-4">
                    { #if task.status === 'Done'}
                        <Checkbox on:change={(e) => handleStatus(e, task.id) } checked class="cursor-pointer"/>
                    { :else }
                        <Checkbox on:change={(e) => handleStatus(e, task.id) } class="cursor-pointer"/>
                    { /if }
                </TableBodyCell>
                <TableBodyCell>{ task.id }</TableBodyCell>
                { #if task.editing}
                    <Input value={ task.task } name="input" on:input={(e) => handleInput(e, task.task) }/>
                { :else }
                    <TableBodyCell>{ task.task }</TableBodyCell>
                {/if }
                <TableBodyCell>{ task.status }</TableBodyCell>
                <TableBodyCell>
                    <Button name="button" on:click={() => handleEdit( task.id ) }>
                        Edit
                    </Button>
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