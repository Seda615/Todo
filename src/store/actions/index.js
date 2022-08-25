import {ADD_TODO, EDIT_TODO} from "../action-types";

export const addTodo = (payload) => {
    return {
        type: ADD_TODO,
        payload
    }
}

export const editTodo = (payload) => {
    return {
        type: EDIT_TODO,
        payload
    }
}