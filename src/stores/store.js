import { derived, writable } from "svelte/store";

const getTasksFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

export const tasks = writable(getTasksFromLocalStorage());


export const filterTasks = writable('');

export const filterTasksList = derived( 
    [ tasks, filterTasks ], ([ $tasks, $filterTasks ]) => {
        return $tasks.filter(( task ) => (task.task).toLowerCase().includes(($filterTasks).toLowerCase()));

    } )

    // export const tasksDerived = derived(tasks, ( $tasks ) => $tasks);