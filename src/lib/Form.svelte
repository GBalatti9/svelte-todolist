<script>
    import { Button, Card, Helper, Input, Select } from "flowbite-svelte";
    import { taskCustomStore } from "../stores/store";
    import { createEventDispatcher } from "svelte";

    const dispatch   = createEventDispatcher();
    const statusList = [ 'Done', 'In Progress', 'To Start'];

    let select = '';
    let value  = '';

    let keyPressed = false;
    let idIsSet    = false;
    let taskId     = Number('');

    const switchTable = ({ target }) => {
        dispatch('switch', target.value)
    }

    const handleInputChange = ({ target }) => {

        const { name, value } = target;
        console.log({ name, value });

        if (!idIsSet) {
            taskId = $taskCustomStore.length;
            idIsSet = true;
        }

        if (name === 'input') {
            if (!keyPressed) {
                let newTask = {
                    id      : taskId,
                    task    : value,
                    status  : 'To Start',
                    editing : false,
                }

                taskCustomStore.update(( prevTasks ) => ([...prevTasks, newTask]));
                keyPressed = true;
                idIsSet = true;

        } else {

            let newTasks = $taskCustomStore.map(( task ) => ({
                ...task,
                task: task.id === taskId ? value : task.task 
            }))
            console.log({ $taskCustomStore });
            taskCustomStore.set(newTasks)
        }
    }
        if (name === 'select') {
            let newTasks = $taskCustomStore.map(( task ) => ({
                ...task,
                status: task.id === taskId ? value : task.status,
            }))
            taskCustomStore.set(newTasks);
        }

    }

    const handleSubmit = () => {
        localStorage.setItem('tasks', JSON.stringify($taskCustomStore));
        select      = '';
        value       = '';
        keyPressed  = false;
        idIsSet     = false;
    }


</script>

<Card class="mx-auto mt-5">
<form class="text-center" on:submit|preventDefault= { handleSubmit }>
    <h2 class="font-bold mb-3">New task</h2>
    <div class="mb-4">
        <Input id="success" placeholder='Buy groceries...' class="mb-4" name="input" on:input={(e) => handleInputChange(e) } bind:value/> 
            <Select bind:value={select} on:change={(e) => handleInputChange(e)} name='select' disabled={ value.length === 0 ? true : false }>
            { #each statusList as option }
            <option value={ option }> { option } </option>
            {/each }
        </Select>
    </div>
    <div class="mb-4">
        <Helper>Save changes by clicking Add</Helper>
    </div>
        <Button type="submit" outline color="primary" class="mb-2">Add</Button>
    </form>
    <Button outline color="primary" value="true" on:click={(e) => switchTable(e) }>Change view</Button>
</Card>