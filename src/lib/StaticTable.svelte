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
        <TableBodyRow>
            <TableBodyCell class="!p-4">
                <Checkbox />
            </TableBodyCell>
            <TableBodyCell>1</TableBodyCell>
            <TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
            <TableBodyCell>Sliver</TableBodyCell>
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
    </TableBody>
</Table>
