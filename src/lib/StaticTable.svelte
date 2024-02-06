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

    import { tasks } from "../stores/store";

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
    <TableBody tableBodyClass="divide-y">
        { #each $tasks as task (task.id) }
        
            <TableBodyRow key={ task.id }>
                <TableBodyCell class="!p-4">
                    <Checkbox />
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