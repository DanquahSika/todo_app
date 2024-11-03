"use client";
import { useState } from 'react';

// Define a type for the Todo item
interface Todo {
  text: string;
  completed: boolean;
}

export default function Home() {
  // State for storing todos and a single new todo input
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  // Add a new todo item
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  // Toggle completion status of a todo item
  const toggleComplete = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // Delete a todo item
  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Todo App</h1>

      {/* Input field for new todos */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={{ padding: '10px', width: '100%' }}
        />
        <button onClick={addTodo} style={{ padding: '10px', width: '100%', marginTop: '10px' }}>
          Add Todo
        </button>
      </div>

      {/* List of todos */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              margin: '10px 0',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span onClick={() => toggleComplete(index)} style={{ cursor: 'pointer' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(index)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
