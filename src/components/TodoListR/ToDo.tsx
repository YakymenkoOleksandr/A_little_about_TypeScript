import { useState, useEffect, useRef } from "react";
import { ITodo } from "../../types/data.ts";
import TodoList from "./TodoList.tsx";

const App: React.FC = () => {
  // Компоненту присвоюється тип React Functional Component через ": React.FC"
  const [value, setValue] = useState("");

  const [todos, setTodos] = useState<ITodo[]>([]); // Сюди передається дженерік в який записується інтерфейс(бо масив або обєкт). Що таке дженерік? Для чого він використовується?

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // При наведенні на екшн форми onChange={} воно видасть пояснення типу e, який ми копіюємо та передаємо як тип для функції.
    setValue(e.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null); // Щоб дістати тип елементу потрібно навестись на елемент мишкою і з спливаючого вікна скопіювати останне значення. Під капотом null вказується, тому наявно його не потрібно додавати.

  const addTodo = () => {
    if (value) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: value,
          complete: false,
        },
      ]);
      setValue("");
    }
  };

  const handleKayDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const removeTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return { ...todo, complete: !todo.complete };
      })
    );
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <div>
        <input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          onKeyDown={handleKayDown}
        />{" "}
        <button onClick={addTodo}>Add</button>
      </div>
      <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
};

export default App;