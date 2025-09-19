import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()

        if (!todo) return

        addTodo({ id: Date.now(), todo, completed: false })
        setTodo("")
    }

    return (
        <form
            onSubmit={add}
            className="flex items-center gap-2 bg-white/80 shadow-lg rounded-lg p-3 mb-4"
        >
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-gray-300 rounded-l-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-400 bg-white/90 text-gray-700 transition-all duration-200"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button
                type="submit"
                className="rounded-r-lg px-5 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:from-green-600 hover:to-green-800 shadow-md transition-all duration-200 hover:scale-105"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;