// src/components/TodoList.tsx

import React from 'react';
import { Todo } from '../types/Todo';
import { deleteTodo, updateTodo } from '../services/todoService';

interface TodoListProps {
  todos: Todo[];
  onReload: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onReload }) => {
  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    onReload();
  };

  const handleToggleComplete = async (todo: Todo) => {
    await updateTodo({ ...todo, completed: !todo.completed });
    onReload();
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleComplete(todo)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
