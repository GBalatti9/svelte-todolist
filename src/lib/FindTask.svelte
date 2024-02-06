<script>
    import { Button, Input, Label } from "flowbite-svelte";
    import { tasks } from "../stores/store";

    let value = '';
    const filteredTasks = () => {
        console.log($tasks.filter(( task ) => task.task === value));
    }

</script>
<Label>Find Task</Label>
<Input bind:value on:input={ filteredTasks }/>
<Button>Search</Button>