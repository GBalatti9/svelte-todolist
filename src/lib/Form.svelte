<script>
    import { Button, ButtonGroup, Card, Input, Select } from "flowbite-svelte";
    import { tasks } from "../stores/store";
    // let { id, task, status } = $tasks[0];

    let select = '';
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
    }


</script>

<form class="text-center mt-5" on:submit|preventDefault= { handleSubmit }>
    <Card class="mx-auto">
    <h2 class="font-bold mb-3">New task</h2>
    <div class="mb-6">
        <Input id="success" placeholder='Buy groceries...' class="mb-4" name="input" on:input={(e) => handleInputChange(e) }/> 
            <Select bind:value={select} on:change={(e) => handleInputChange(e)} name='select'>
            { #each statusList as option }
            <option value={ option }> { option } </option>
            {/each }
        </Select>

    </div>
        <Button outline color="primary" class="mb-2">Add</Button>
        <Button outline color="primary">Change view</Button>
    </Card>
</form>