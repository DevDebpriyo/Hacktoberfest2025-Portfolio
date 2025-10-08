// TodoApp.jsx
import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(stored);
  }, []);

  useEffect(() => localStorage.setItem('todos', JSON.stringify(todos)), [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => setTodos(
    todos.map(t => t.id === id ? { ...t, done: !t.done } : t)
  );

  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));

  const filtered = todos.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', fontFamily: 'Arial' }}>
      <h2>Todo App</h2>
      <div>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add task"/>
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('done')}>Done</button>
      </div>
      <ul>
        {filtered.map(t => (
          <li key={t.id} style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)}/>
            {t.text}
            <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
