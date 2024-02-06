import { derived, writable } from "svelte/store";

export const initialTask = writable({
    id: 0,
    task: 'Buy bread',
    status: 'In progress',
    editing: false,
})

export const tasks = derived(initialTask, ( $initialTask ) => [$initialTask]);