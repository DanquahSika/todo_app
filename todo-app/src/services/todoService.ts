// src/services/todoService.ts
import { Todo } from '../types/Todo';

const API_URL = 'http://127.0.0.1:3000/'; // LoopBack API URL

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function addTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return response.json();
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return response.json();
}

export async function deleteTodo(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}
