import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addTodo} from "../../store/actions";

const initialState = {
    title: '',
    description: '',
    status: '',
    priority: ''
}

function AddTodo() {

    const [isOpenButton, setIsOpenButton] = useState(false);
    const dispatch = useDispatch();
    const [todo, setTodo] = useState(initialState);

    const add_todo = () => {
        if (todo.status) {
            dispatch(addTodo({...todo, id: Date.now()}));
            setIsOpenButton(false);
            setTodo(initialState);
        }
    }

    const changeTodo = (e) => {
        setTodo({...todo, [e.target.name]: e.target.value, id: Date.now()});
    }

    return (
        <div>
            {!isOpenButton ?
                <button onClick={() => setIsOpenButton(true)} className='btn btn-success'>
                    Add Task
                </button> :
                <form className={'form'}>
                    <label>Title</label>
                    <input name='title' onChange={changeTodo} />
                    <label>Description</label>
                    <input name='description' onChange={changeTodo} />
                    <label>Status</label>
                    <select name='status' onChange={changeTodo} className='form-select'>
                        <option>Please choose an status</option>
                        <option>todo</option>
                        <option>doing</option>
                        <option>done</option>
                    </select>
                    <label>Priority</label>
                    <select name='priority' onChange={changeTodo} className='form-select'>
                        <option>Please choose an priority</option>
                        <option>Low</option>
                        <option>Normal</option>
                        <option>High</option>
                    </select>
                    <button onClick={add_todo} className='btn btn-success'>Ok</button>
                </form>
            }
        </div>
    )
}

export default AddTodo