import { derived, writable } from "svelte/store";

const getTasksFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

export const tasks = writable(getTasksFromLocalStorage());

const tasksStore = () => {
    const { subscribe, set, update } = writable(getTasksFromLocalStorage())

    const handleDelete = ( id ) => {
        update( tasks => {
            const newTasks = tasks.filter(( task ) => task.id !== id)
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return newTasks;
        } );        
    }

    const handleEdit = ( id ) => {
        update( tasks => {
            return tasks.map( task => ({
                ...task,
                editing: task.id === id ? true : false,
            }))
        })
    }

    const handleStatus = ( { target }, id ) => {
        if( target.name === 'button' || target.name === 'task' || target.value === 'on' ) return;
        update( tasks => {
            const newTasks = tasks.map( task => {
                return {
                    ...task,
                    editing: false, 
                    status: task.id === id ? target.value : task.status,
                }
            })
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return newTasks;
        })
    }

    const handleInput = ({ target }, id) => {
        const { value } = target;
        update(( tasks ) => {
            return tasks.map( task => {
                return {
                    ...task,
                    task: task.id === id ? value : task.task
                }
            })
        })
    }

    const handleClose = ( id ) => {
        update(tasks => tasks.map(( task ) => ({
            ...task,
            editing: task.id === id ? false : task.editing,
        })))
    }

    const handleSave = ( id ) => handleClose( id )

    return {
        subscribe,
        set,
        update,
        handleDelete,
        handleEdit,
        handleStatus,
        handleInput,
        handleClose,
        handleSave,
    }
};

export const taskCustomStore = tasksStore();

export const filterTasks = writable('');

export const filterTasksList = derived( 
    [ taskCustomStore, filterTasks ], ([ $taskCustomStore, $filterTasks ]) => {
        return $taskCustomStore.filter(( task ) => (task.task).toLowerCase().includes(($filterTasks).toLowerCase()));

    } )

    // export const tasksDerived = derived(tasks, ( $tasks ) => $tasks);