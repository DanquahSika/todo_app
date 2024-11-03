// app/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo'; // Make sure this path is correct
import { getTodos } from '../services/todoService';

// Generate a unique ID (you might want to implement a better ID generation method)
const generateId = () => Math.floor(Math.random() * 10000);

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState<string>(''); // New title state
  const [newDescription, setNewDescription] = useState<string>(''); // New description state
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null); // Track the current todo being edited
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    fetchTodos();
  }, [reload]);

  const addTodo = () => {
    if (newTitle.trim() && newDescription.trim()) {
      // Create a new todo item with all required fields
      const newTodo: Todo = {
        id: generateId(),        // Generate a unique ID
        title: newTitle,         // Set the title
        description: newDescription, // Set the description
        completed: false,        // Default completion status
      };
      setTodos([...todos, newTodo]);
      setNewTitle('');          // Clear the title input
      setNewDescription('');    // Clear the description input
      handleReload();          // Reload the todos
    }
  };

  const handleAddOrUpdateTodo = (newTodo: Todo) => {
    if (currentTodo) {
      // Update the existing todo
      const updatedTodos = todos.map((todo) => (todo.id === currentTodo.id ? newTodo : todo));
      setTodos(updatedTodos);
      setCurrentTodo(null); // Clear the current todo after updating
    } else {
      // Add a new todo
      setTodos([...todos, newTodo]);
    }
    handleReload(); // Reload the todos
  };

  const handleEditTodo = (todo: Todo) => {
    setCurrentTodo(todo); // Set the current todo for editing
  };

  const toggleComplete = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
     
      {/* Input fields for new todos */}
      <div>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add todo title"
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Add todo description"
          className="border p-2 w-full mb-2"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white p-2 w-full">
          Add Todo
        </button>
      </div>

      {/* List of todos */}
      <ul className="list-none p-0">
        {todos.map((todo, index) => (
          <li
            key={todo.id} // Use the unique ID as the key
            className={`flex justify-between items-center p-2 border rounded mb-2 ${
              todo.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            <span onClick={() => toggleComplete(index)} className="cursor-pointer">
              {todo.title} - {todo.description}
            </span>
            <button onClick={() => deleteTodo(index)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
