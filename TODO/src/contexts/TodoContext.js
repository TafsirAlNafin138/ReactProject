import {createContext, useState, useContext } from "react";

const TodoContext = createContext({
    todos: [],
    addTodo: (todo) => {},
    removeTodo: (id) => {},
    updateTodo: (id, updatedTodo) => {},
    toggleComplete: (id) => {}
});

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
export default TodoContext;
