<script>
    import { Button, ButtonGroup, Card, Input, Select } from "flowbite-svelte";
    import { initialTask, tasks } from "../stores/store";
    let { id, task, status } = $initialTask;

    let select = '';
    const statusList = [ 'Done', 'In Progress', 'To Start'];

    const handleSubmit = () => {
        console.log(task);
    }


</script>

<form class="text-center mt-5" on:submit|preventDefault= { handleSubmit }>
    <Card class="mx-auto">
    <h2 class="font-bold mb-3">New task</h2>
    <div class="mb-6">
        <Input id="success" placeholder={ task } class="mb-4" bind:value={ task }/> 
        <Select bind:value={ select } >
            { #each statusList as option }
            <option value={ option }> { option } </option>
            {/each }
        </Select>

    </div>
        <Button outline color="primary" class="mb-2">Add</Button>
        <Button outline color="primary">Change view</Button>
    </Card>
</form>