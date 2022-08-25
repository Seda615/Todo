import {ADD_TODO, EDIT_TODO} from "../action-types";

const initialState = {
    todos: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [],
    doingTodos: localStorage.getItem('doingTodos') ? JSON.parse(localStorage.getItem('doingTodos')) : [],
    doneTodos: localStorage.getItem('doneTodos') ? JSON.parse(localStorage.getItem('doneTodos')) : []
}

const reducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case ADD_TODO: {
            let todoState;
            if (payload.status === 'todo') {
                const todos = [...state.todos, payload];
                localStorage.setItem('todos', JSON.stringify(todos))
                todoState = {...state, todos};
            }
            if (payload.status === 'doing') {
                const doingTodos = [...state.doingTodos, payload];
                localStorage.setItem('doingTodos', JSON.stringify(doingTodos))
                todoState = {...state, doingTodos};
            }
            if (payload.status === 'done') {
                const doneTodos = [...state.doneTodos, payload];
                localStorage.setItem('doneTodos', JSON.stringify(doneTodos))
                todoState = {...state, doneTodos};
            }

            return todoState;

        }

        case EDIT_TODO: {
            const {todo, prevStatus, id} = payload;
            let editTodos = [...state.todos];
            let editDoingTodos = [...state.doingTodos];
            let editDoneTodos = [...state.doneTodos];
            if (prevStatus === todo.status) {
                if (prevStatus === 'todo') {
                    const i = editTodos.findIndex(editTodo => editTodo.id === id);
                    editTodos[i] = {...todo, id};
                }
                if (prevStatus === 'doing') {
                    const i = editDoingTodos.findIndex(editTodo => editTodo.id === id);
                    editDoingTodos[i] = {...todo, id};
                }
                if (prevStatus === 'done') {
                    const i = editDoneTodos.findIndex(editTodo => editTodo.id === id);
                    editDoneTodos[i] = {...todo, id};
                }
            } else {
                if (prevStatus === 'todo') {
                    const i = editTodos.findIndex(editTodo => editTodo.id === id);
                    editTodos.splice(i, 1);
                }
                if (prevStatus === 'doing') {
                    const i = editDoneTodos.findIndex(editDoingTodo => editDoingTodo.id === id);
                    editDoingTodos.splice(i, 1);
                }
                if (prevStatus === 'done') {
                    const i = editDoneTodos.findIndex(editDoneTodo => editDoneTodo.id === id);
                    editDoneTodos.splice(i, 1);
                }
                if (todo.status === 'todo') {
                    editTodos.push({...todo, id})
                }
                if (todo.status === 'doing') {
                    editDoingTodos.push({...todo, id})
                }
                if (todo.status === 'done') {
                    editDoneTodos.push({...todo, id})
                }
            }
            localStorage.setItem('todos', JSON.stringify(editTodos))
            localStorage.setItem('doingTodos', JSON.stringify(editDoingTodos));
            localStorage.setItem('doneTodos', JSON.stringify(editDoneTodos));
            return {...state, todos: editTodos, doingTodos: editDoingTodos, doneTodos: editDoneTodos}
        }

        default:
            return state
    }
}

export default reducer