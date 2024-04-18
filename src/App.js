import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    const temp = localStorage.getItem('todos');
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo('');
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function editTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editingText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText('');
  }

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="App">
      <div className="card">
        <h2>Project Title</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            style={{ marginLeft: '27%', }}
          />
          <button className="button" type="submit" style={{ marginLeft: '10px' }}>
            Add Todo
          </button>

        </form>
        <div className="summary">
          Summary: {completedTodos.length} / {todos.length} completed.
        </div>
      </div>
      <div className="card">
        <h2>Pending</h2>
        <div className="todo-list">
          {activeTodos.map((todo) => (
            <div className="todo-item" key={todo.id}>
              <input
                type="checkbox"
                onChange={() => toggleComplete(todo.id)}
                checked={todo.completed}
              />
              {todoEditing === todo.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <div className="todo-text">{todo.text}</div>
              )}
              <div>
                <button className="button" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
                {todoEditing === todo.id ? (
                  <button
                    className="button"
                    onClick={() => editTodo(todo.id)}
                    style={{ marginLeft: '5px' }}
                  >
                    Submit Edit
                  </button>
                ) : (
                  <button
                    className="button"
                    onClick={() => setTodoEditing(todo.id)}
                    style={{ marginLeft: '5px' }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h2>Completed </h2>
        <div className="todo-list">
          {completedTodos.map((todo) => (
            <div className="todo-item" key={todo.id}>
              <input
                type="checkbox"
                onChange={() => toggleComplete(todo.id)}
                checked={todo.completed}
              />
              <div className="todo-text">{todo.text}</div>
              <button className="button" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
