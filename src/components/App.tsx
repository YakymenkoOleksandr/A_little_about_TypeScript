
import {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../hook.ts';

import { fetchTodos, addNewTodo } from './store/todoSlice';
import NewTodoForm from './NewTodoForm.tsx';
import TodoList from './TodoList';
import ToDo from "./TodoListR/ToDo.tsx"
import './App.css';


function App() {
  const [text, setText] = useState('');
  const {loading, error} = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const handleAction = () => {
    if(text.trim().length) {
     dispatch(addNewTodo(text));
      setText('');
    }
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);


  return (
    <div className='App'>
      <NewTodoForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      {loading && <h2>Loading...</h2>}
      {error &&  <h2>An error occured: {error}</h2>}
          <TodoList />
          <ToDo />
    </div>
  );
}

export default App;