
import { useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  );
};
    
  const deleteTodo = (id: number) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};

  const completedCount = todos.filter(
  (todo) => todo.completed
).length;

const pendingCount = todos.length - completedCount;


return (
  <div>
    <h1>My Task Manager</h1>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>

    <ul>
      {todos.length === 0 ? (
    <li className="empty-message">
      No tasks yet. Add your first task!
    </li>
      ) : (
      todos.map((todo) => (
        <li key={todo.id}>
          <span
            style={{
              textDecoration: todo.completed
                ? "line-through"
                : "none",
            }}
          >
            {todo.text}
          </span>

          <button onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? "Undo" : "Complete"}
          </button>

          <button onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </li>
      )
      ))}
    </ul>

    <p>Total tasks: {todos.length}</p>
    <p>Completed tasks: {completedCount}</p>
    <p>Pending tasks: {pendingCount}</p>
  </div>
);

}

export default App;
