import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {editTodo} from "../../store/actions";

const initialState = {
    title: '',
    description: '',
    status: '',
    priority: ''
}

function Todo({head, todos}) {

    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [todo, setTodo] = useState(initialState);

    const changeTodo = (e) => {
        setTodo({...todo, [e.target.name]: e.target.value})
    }

    const edit_todo = (prevStatus, id) => {
        if (todo.status) {
            dispatch(editTodo({todo, prevStatus, id}));
            setTodo(initialState);
            setIsOpenModal(false);
        }
    }

    return (
        <div className='col-sm-4 bg-light'>
            <h2 className='text-success'>{head}</h2>
            {todos.map(todo => (
                <div key={todo.id}>
                    <p className='text-success'>{todo.title}</p>
                    <p className='text-success'>{todo.description}</p>
                    <p className='text-success'>{todo.priority}</p>
                    {isOpenModal !== todo.id ?
                        <button onClick={() => setIsOpenModal(todo.id)} className='btn btn-success'>
                            Edit
                        </button> :
                        <form className='form'>
                            <input name='title' onChange={changeTodo} />
                            <input name='description' onChange={changeTodo} />
                            <select name='status' onChange={changeTodo} className='form-select'>
                                <option>Please choose an option</option>
                                <option>todo</option>
                                <option>doing</option>
                                <option>done</option>
                            </select>
                            <select name='priority' onChange={changeTodo} className={'form-select'}>
                                <option>Please choose an option</option>
                                <option>Low</option>
                                <option>Normal</option>
                                <option>High</option>
                            </select>
                            <button onClick={() => edit_todo(todo.status, todo.id)} className='btn btn-success'>
                                Ok
                            </button>
                        </form>
                    }
                </div>
            ))}
        </div>
    )
}

export default Todo