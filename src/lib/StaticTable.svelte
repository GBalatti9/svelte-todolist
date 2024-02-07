<script>
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Checkbox,
    } from "flowbite-svelte";

    import { tasks, filterTasksList } from "../stores/store";

    const handleStatus = ({ target }, id) => {
        console.log(target.value);
        let newTasksStatus = $filterTasksList.map(( task ) => ({
            ...task,
            status: task.id === id ? task.status === 'Done' ? 'In Progress' : 'Done' : task.status,
        }))

        tasks.set(newTasksStatus);
        localStorage.setItem('tasks', JSON.stringify($tasks));
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
                <TableBodyCell>{ task.task }</TableBodyCell>
                <TableBodyCell>{ task.status }</TableBodyCell>
                <TableBodyCell>
                    <a
                        href="/tables"
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >Edit</a
                    >
                </TableBodyCell>
                <TableBodyCell>
                    <a
                        href="/tables"
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >Delete</a
                    >
                </TableBodyCell>
            </TableBodyRow>
            {/each }
    </TableBody>
</Table>