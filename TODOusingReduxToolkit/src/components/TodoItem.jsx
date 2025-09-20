import React, { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, removeTodo, toggleComplete } from '../features/todo/todoSlice';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.text)
  const dispatch = useDispatch();


  const editTodo = () => {
    dispatch(updateTodo({ id: todo.id, todo: { ...todo, text: todoMsg } }));
    setIsTodoEditable(false);
  }
  const toggleCompleted = () => {
    dispatch(toggleComplete(todo.id));
  }

return (
    <div
        className={`flex items-center border border-black/10 rounded-xl px-4 py-3 gap-x-4 shadow-md shadow-green-100 duration-300 text-black transition-all ${
            todo.completed ? "bg-gradient-to-r from-green-200 to-green-100" : "bg-gradient-to-r from-purple-200 to-pink-100"
        }`}
    >
                <input
            type="checkbox"
            className={
              isTodoEditable
                ? "cursor-not-allowed accent-gray-400 w-5 h-5 transition-all duration-200"
                : "cursor-pointer accent-green-500 w-5 h-5 transition-all duration-200"
            }
            checked={todo.completed}
            disabled={isTodoEditable}
            onChange={() => {
              if (!isTodoEditable) {
                toggleCompleted();
              }
            }}
        />
        <input
            type="text"
            className={`border outline-none w-full bg-transparent rounded-lg text-lg font-medium transition-all duration-200 ${
                isTodoEditable ? "border-green-400 px-3 py-1 bg-white/80 shadow-inner" : "border-transparent"
            } ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
        />
        {/* Edit, Save Button */}
        <button
            className="inline-flex w-9 h-9 rounded-full text-lg border border-green-300 justify-center items-center bg-green-50 hover:bg-green-200 shadow transition-all duration-200 shrink-0 disabled:opacity-50"
            onClick={() => {
                if (todo.completed) return;

                if (isTodoEditable) {
                    editTodo();
                } else setIsTodoEditable((prev) => !prev);
            }}
            disabled={todo.completed}
            title={isTodoEditable ? "Save" : "Edit"}
        >
            {isTodoEditable ? "💾" : "✏️"}
        </button>
        {/* Delete Todo Button */}
        <button
            className="inline-flex w-9 h-9 rounded-full text-lg border border-red-300 justify-center items-center bg-red-50 hover:bg-red-200 shadow transition-all duration-200 shrink-0"
            onClick={() => dispatch(removeTodo(todo.id))}
            title="Delete"
        >
            🗑️
        </button>
    </div>
);
}

export default TodoItem;