// App.js 

import "./App.css";
import React, { useState } from "react";
import { connect } from "react-redux";

const App = 
({ todos, addTodos, removeTodo, toggleTodo }) => {
    const [text, setText] = useState("");

    const handleAddTodo = () => {
        if (text.trim() !== "") {
            addTodos({
                id: new Date().getTime(),
                text,
                completed: false,
            });
            setText("");
        }
    };

    const handleRemoveTodo = (id) => {
        removeTodo(id);
    };

    const handleToggleTodo = (id) => {
        toggleTodo(id);
    };

    return (
        <div id="app">
            <div>
                <h1>To-Do List</h1>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => 
                        setText(e.target.value)}
                    placeholder="Enter a task..."
                />
                <button onClick={handleAddTodo}>
                    Add
                </button>
                <ul>
                    {todos.map((todo) => (
                        <li
                            className="todo"
                            key={todo.id}
                            style={{
                                textDecoration: todo.completed ? 
                                "line-through" : "none",
                                color: todo.completed ? 
                                "red" : "black",
                            }}
                            onClick={() => handleToggleTodo(todo.id)}
                        >
                            {todo.text}
                            <button onClick=
                                {() => handleRemoveTodo(todo.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
    addTodos: (todo) => 
        dispatch({ 
            type: "ADD_TODO", 
            payload: todo 
        }),
    removeTodo: (id) => 
        dispatch({ 
            type: "REMOVE_TODO", 
            payload: id 
        }),
    toggleTodo: (id) => 
        dispatch({ 
            type: "TOGGLE_TODO", 
            payload: id 
        }),
});

export default connect
    (mapStateToProps, mapDispatchToProps)(App);
