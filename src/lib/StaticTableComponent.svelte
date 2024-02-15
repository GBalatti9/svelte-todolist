<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, Button, Input, ButtonGroup } from "flowbite-svelte";

    import { filterTasksList, taskCustomStore } from "../stores/store";

    const { handleDelete, handleEdit, handleStatus, handleInput, handleClose, handleSave } = taskCustomStore;
    const status = ['To Start', 'In Progress', 'Done'];
</script>

<Table hoverable={true} shadow>
    <TableHead>
        <TableHeadCell>
        </TableHeadCell>
        <TableHeadCell>#</TableHeadCell>
        <TableHeadCell>Task</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
        <TableHeadCell>
            <span class="sr-only">Edit</span>
        </TableHeadCell>
    </TableHead>

<TableBody tableBodyClass="divide-y cursor-pointer">
    { #each $filterTasksList as task (task.id) }
        <TableBodyRow 
            key = { task.id } 
            class = "{task.status === 'Done' ? "line-through bg-gray-200" : ''} cursor-pointer" 
            on:click={( e ) => handleStatus( e, task.id )}
            >
            <TableBodyCell>
                { #if task.status === 'Done'}
                    <Checkbox on:change={(e) => handleStatus(e, task.id ) } checked class="cursor-pointer"/>
                { :else }
                    <Checkbox on:change={(e) => handleStatus(e, task.id ) } class="cursor-pointer"/>
                { /if }
            </TableBodyCell>
            <TableBodyCell style="width:10px;">{ task.id }</TableBodyCell>
            { #if task.editing }
                <TableBodyCell style="max-width: 130px;">
                    <Input value={ task.task } name="task" on:input={(e) => handleInput(e, task.id) } style="cursor:text"/>
                </TableBodyCell>

            { :else }
                <TableBodyCell style="max-width: 100px; overflow: hidden; text-overflow:ellipsis">
                    <!--  overflow-x:scroll; -->
                    { task.task }
                </TableBodyCell>
            {/if }
            <TableBodyCell style="max-width:10px;">
                {#if task.editing}
                    <select name="select">
                        {#each status as element}
                            {#if element === task.status}
                                <option value="{element}" selected>{element}</option>
                            { :else }
                                <option value="{element}">{element}</option>
                            {/if}
                        {/each}
                    </select>
                    { :else }
                    <span 
                        class:progress = { task.status === 'In Progress' } 
                        class:done     = { task.status === 'Done' }
                        class:start    = { task.status === 'To Start' }
                        >
                        { task.status }
                    </span>
                    {/if}
                </TableBodyCell>
            <TableBodyCell>
                { #if task.editing }
                <ButtonGroup>
                    <Button name="button" outline color="primary" on:click={() => handleSave( task.id ) }>Save</Button>
                    <Button name="button" outline color="primary" on:click={() => handleClose( task.id ) }>Close</Button>
                </ButtonGroup>
                { :else }
                    <Button name="button" on:click={() => handleEdit( task.id ) } disabled={ task.status === 'Done' }>
                        Edit
                    </Button>
                    <Button name="button" on:click={() => handleDelete( task.id ) } disabled={ task.status === 'Done' }>
                        Delete
                    </Button>
                { /if }
            </TableBodyCell>
        </TableBodyRow>
        {/each }
</TableBody>
</Table>

<style>
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