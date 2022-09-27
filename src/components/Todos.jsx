import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./Todo";
import styles from "./todos.module.css";

import create from "zustand";

import { devtools, persist } from "zustand/middleware";

const Todos = () => {
  // const useTodoStore = create()(devtools(persist((set) => (todos: [],))));
  //////////////// <variables which will be equal with the values of localStorages!>
  let username;

  //////////////// <States which provides the value of states!>
  const [nameInput, setNameInput] = useState("");
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  //////////////// <when components mounted!>
  // let todos=[];

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")) || []);
    username = localStorage.getItem("username") || "";
    setNameInput(username);
  }, []);

  //////////////// <change handlers for name input!>
  const changeHandler = (e) => {
    if (e.target.value.length > 17) {
      toast.warn("Name can't be more than 17 characters!");
    } else {
      setNameInput(e.target.value);
      localStorage.setItem("username", e.target.value);
    }
  };
  //////////////// <submit handler for adding the item if todo input!>
  const submitHandler = (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value.trim();
    const category = e.target.elements.category.value;

    if (category && content) {
      toast.success("Todo have made successfully!");

      const todo = {
        category,
        content,
        done: false,
        id: Math.random(),
      };

      const newTodoList = [...todos,todo]

      setTodos([...todos, todo]);

      localStorage.setItem("todos", JSON.stringify(newTodoList));
      e.target.reset();
      setTodoInput("");
      console.log(todos);
    } else {
      toast.warn("Set a todo than save it!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.usersSecion}>
        <h3>What's up,</h3>
        <input
          onChange={changeHandler}
          value={nameInput}
          type="text"
          placeholder="Enter your name.."
        />
      </div>

      <form onSubmit={submitHandler} className={styles.categorySection}>
        <p>CREATE A TODO</p>
        <h5>What's on your todo?</h5>
        <input
          className={styles.todoInput}
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          type="text"
          name="content"
          placeholder="e.g Get some milk"
        />
        <h5>Pick a category</h5>

        <div className={styles.categories}>
          <label htmlFor="business">
            <input
              hidden
              type="radio"
              name="category"
              value="business"
              id="business"
              className={styles.business}
            />
            <div className={styles.businessButton}></div>
            <span>Business</span>
          </label>

          <label htmlFor="personal">
            <input
              hidden
              className={styles.personal}
              type="radio"
              name="category"
              value="personal"
              id="personal"
            />
            <div className={styles.personalButton}></div>
            <span>Personal</span>
          </label>
        </div>
        <input type="submit" value="ADD TODO" />
      </form>
      <div className={styles.todoListsContainer}>
        <p>TODO LIST</p>

        <div className={styles.todoListWrapper}>
          {todos &&
            todos.map((todo) => (
              <Todo key={todo.id} todo={todo} todos={todos} />
            ))}
          {todos == false && (
            <h1 style={{ textAlign: "center" }}>There is not any todo yet!</h1>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Todos;
