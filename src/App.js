import './App.css';
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import {useSelector} from "react-redux";
import {addTodo} from "./store/actions";

function App() {

    const todos =  useSelector(state => state.todos);
    const doing =  useSelector(state => state.doingTodos);
    const done =  useSelector(state => state.doneTodos);

    return (
      <div className="App">
          <AddTodo />
          <div className='row container mt-5' style={{margin: "auto"}}>
              <Todo todos={todos} head={'Todo'} />
              <Todo todos={doing} head={'Doing'} />
              <Todo todos={done} head={'Done'} />
          </div>
      </div>
  )
}

export default App
