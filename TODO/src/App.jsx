import { useState, useEffect } from 'react'
import './App.css'
import { TodoProvider } from './contexts';
import { TodoForm, TodoItem } from './components';

function App() {
  const [todos, setTodos] = useState([]);


  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

 useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, removeTodo, toggleComplete }}
    >
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-3xl px-6 py-6 text-gray-100 bg-gray-900/80 backdrop-blur-lg border border-gray-800">
          <h1 className="text-3xl font-extrabold text-center mb-10 mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Manage Your Todos
          </h1>
          <div className="mb-6">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="w-full transition-all duration-200 hover:scale-[1.03] hover:bg-gray-800/60 rounded-xl shadow-lg border border-gray-800"
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App
