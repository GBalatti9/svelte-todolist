<script>
    import { Button, ButtonGroup, Card, Input, Select } from "flowbite-svelte";
    import { tasks } from "../stores/store";
    // let { id, task, status } = $tasks[0];

    let select = '';
    let value = '';
    const statusList = [ 'Done', 'In Progress', 'To Start'];

    let keyPressed = false;
    let idIsSet = false;
    let taskId = Number('');

    const handleInputChange = ({ target }) => {
    const { name, value } = target;
    if (!idIsSet) {
        taskId = $tasks.length;
        idIsSet = true;
    }
    if (name === 'input') {
        if (!keyPressed) {
            let newTask = {
                id: taskId,
                task: value,
                status: '',
                editing: false,
            }
            tasks.update(( prevTasks ) => ([...prevTasks, newTask]));
            keyPressed = true;
            idIsSet = true;
        } else {

            let newTasks = $tasks.map(( task ) => ({
                ...task,
                task: task.id === taskId ? value : task.task 
            }))
            console.log('aca');
            tasks.set(newTasks)
        }
    }
    if (name === 'select') {
        console.log(name, value);
        let newTasks = $tasks.map(( task ) => ({
            ...task,
            status: task.id === taskId ? value : task.status,
        }))

        tasks.set(newTasks);
    }
    }

    const handleSubmit = () => {
        select = '';
        value = '';
        keyPressed = false;
        idIsSet = false;
    }


</script>

<Card class="mx-auto">
<form class="text-center mt-5" on:submit|preventDefault= { handleSubmit }>
    <h2 class="font-bold mb-3">New task</h2>
    <div class="mb-6">
        <Input id="success" placeholder='Buy groceries...' class="mb-4" name="input" on:input={(e) => handleInputChange(e) } bind:value/> 
            <Select bind:value={select} on:change={(e) => handleInputChange(e)} name='select'>
            { #each statusList as option }
            <option value={ option }> { option } </option>
            {/each }
        </Select>

    </div>
        <Button type="submit" outline color="primary" class="mb-2">Add</Button>
    </form>
    <Button outline color="primary">Change view</Button>
</Card>