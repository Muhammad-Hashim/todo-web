import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleTodoChange = useCallback((e) => {
     e.preventDefault();
    setInput(e.target.value);
  },[]);

  const addTodo = useCallback(
    (e) => {
       e.preventDefault();
      if (input.trim() !== "") {
        setTodos([...todos, input]);
        setInput("");
      }
    },
    [input, todos]
  );

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <div>
          <h1>Todo</h1>
          <input type="text" onChange={handleTodoChange} />
          <button type="submit">Add</button>
          {todos.map((todo, index) => (
            <p key={index}>{todo}</p>
          ))}
        </div>
      </form>
    </div>
  );
}

export default App;
