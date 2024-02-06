import { writable } from "svelte/store";

export const task = writable({
    id: 0,
    addTask: 'Buy bread',
    status: 'In progress',
    editing: false,
})