import { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get("/")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, [todos]);
  
 const handleSubmit = (e) => {
    e.preventDefault();
   
   
 }

  const handleTodoChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);



  const addTodo = (e) => {
    e.preventDefault()
      axios.post("/", { input }).then((res) => {
      setTodos([...todos, res.data]);
      setInput("");
    });
  };




const onDelete = (id,e) => {
     e.preventDefault();
  axios
    .delete(`/delete/${id}`)
    .then(() => {
      setTodos((prevTodos) => prevTodos.filter((to) => to._id !== id));
    })
    .catch((error) => console.error("Error deleting todo:", error));
};

  return (
    <div className="App">
      <form>
        <div className="Todo" onSubmit={(e)=>handleSubmit(e)}>
          <h1>Todo</h1>
          <input
            type="text"
            onChange={handleTodoChange}
            value={input}
            aria-label="Todo input"
          />
          <button
            type="submit"
            onClick={addTodo}
            aria-label="Add todo"
            disabled={input.trim() === ""}
          >
            Add
          </button>
          {todos.map((items) => (
            <p className="task" key={items._id}>
              {items.title}
              <div>
                <button onClick={(e) => onDelete(items._id, e)}>Delete</button>
                
                 
              </div>
            </p>
          ))}
        </div>
      </form>
    </div>
  );
}

export default App;
