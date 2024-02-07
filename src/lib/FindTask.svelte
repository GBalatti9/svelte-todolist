<script>
    import { Button, Card, Input, Label } from "flowbite-svelte";
    import { tasks, filterTasks, filterTasksList } from "../stores/store";

    let filterValue = ''
    const filteredTasks = () => {
        filterTasks.set(filterValue)
    }

</script>
<Card class="mt-4 mx-auto">
    <div class="mb-2">
        <Label class="text-1xl">Find Task</Label>
        <Input bind:value={ filterValue } placeholder='Search...' on:input={ filteredTasks }/>
    </div>
    <Button>Search</Button>
</Card>