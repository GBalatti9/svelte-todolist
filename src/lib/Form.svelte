<script>
    import { Button, ButtonGroup, Card, Input, MultiSelect, Select } from "flowbite-svelte";

    let select = '';
    const status = [ 'Done', 'In Progress', 'To Start']


</script>

<form class="text-center mt-5" on:submit|preventDefault>
    <Card class="mx-auto">
    <h2 class="font-bold mb-3">New task</h2>
    <div class="mb-6">
        <Input id="success" placeholder="Buy bread..." class="mb-4"/> 
        <Select bind:value={select} >
            { #each status as option }
                <option value={ option }> { option } </option>
            {/each }
        </Select>

    </div>
        <Button outline color="primary" class="mb-2">Add</Button>
        <Button outline color="primary">Change view</Button>
    </Card>
</form>