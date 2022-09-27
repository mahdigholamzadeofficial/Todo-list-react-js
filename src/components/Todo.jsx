import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import styles from "./todos.module.css";
const DIV = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    padding: 2px;
    font-size: 0.9em;
    color: #3d2b8e;
    outline: none;
    border: none;
    opacity: ${(props) => (props.isDone ? "0.7" : "1")};
    text-decoration: ${(props) => (props.isDone ? `line-through` : `none`)};
  }
`;
const Todo = ({ todo, todos, setTodos }) => {
  ///////////////////////change Handler function for todolist !
  const todoCheckedHandler = (e) => {
    //it will find the index my item that has checked
    let index = todos.findIndex((item) => item.id === e.id);

    //it will change the value from true to false or from false to true!
    todos[index].done = !todos[index].done;

    //creating new array which consists of edited done property!
    const newTodos = [...todos];

    //putting top lines properties inside of out todos state!
    setTodos(newTodos);

    //setting new localStorage after changing items!
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  ///////////////////////Delete Handler function!
  const deleteClickHandler = (id) => {
    //deleted item will not return to newTodos!
    const newTodos = todos.filter((todo) => todo.id !== id);

    //setting the changes for UI!
    setTodos(newTodos);

    //setting new localStorage after changing items!
    localStorage.setItem("todos", JSON.stringify([...newTodos]));
  };

  const editHandler = (e) => {};
  ///////////////////////The submit handler is for editing the changes!
  const submitHandler = (e) => {
    e.preventDefault();
    e.target.elements.todoContent.removeAttribute("readonly");
    e.target.elements.todoContent.focus();
  };

  return (
    <form onSubmit={submitHandler} className={styles.todos}>
      <DIV isDone={todo.done}>
        {todo.category === "personal" ? (
          <label htmlFor={todo.content}>
            {todo.done ? (
              <input
                onChange={() => todoCheckedHandler(todo)}
                hidden
                checked
                className={styles.personal}
                type="checkbox"
                id={todo.content}
                className={styles.checkedTodo}
              />
            ) : (
              <input
                onChange={() => todoCheckedHandler(todo)}
                hidden
                className={styles.personal}
                type="checkbox"
                id={todo.content}
                className={styles.checkedTodo}
              />
            )}
            <div className={styles.checkedTodoButtonPersonal}></div>
          </label>
        ) : (
          <label htmlFor={todo.content}>
            {todo.done ? (
              <input
                onChange={() => todoCheckedHandler(todo)}
                hidden
                checked
                className={styles.business}
                type="checkbox"
                id={todo.content}
                className={styles.checkedTodo}
              />
            ) : (
              <input
                onChange={() => todoCheckedHandler(todo)}
                hidden
                className={styles.business}
                type="checkbox"
                id={todo.content}
                className={styles.checkedTodo}
              />
            )}

            <div className={styles.checkedTodoButtonBusiness}></div>
          </label>
        )}
        <input
          onChange={editHandler}
          name="todoContent"
          className={`${todo.done && styles.active}`}
          type="text"
          value={todo.content}
          readOnly
        />
      </DIV>

      <div className={styles.rightTodo}>
        <input type="submit" value="Edit" />
        <button onClick={() => deleteClickHandler(todo.id)}>Delete</button>
      </div>
    </form>
  );
};

export default Todo;
