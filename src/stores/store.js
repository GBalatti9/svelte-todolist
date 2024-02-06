import { derived, writable } from "svelte/store";

export const tasks = writable([
    {
        id: 0,
        task: 'Buy bread',
        status: 'In progress',
        editing: false,
    },
])

export const tasksDerived = derived(tasks, ( $tasks ) => $tasks);