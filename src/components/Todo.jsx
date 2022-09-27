import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import styles from "./todos.module.css"
const DIV = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  input{
    padding:2px;
    font-size: 0.9em;
    color: #3d2b8e; 
    outline: none;
    border: none;
    opacity: ${props=>(props.isDone ? "0.7" :"1")};
    text-decoration:${props=>(props.isDone ? `line-through` : `none`)};
  }
`
const Todo = ({todo,todos}) => {
  useEffect(()=>{
    
  },[todos])
  const editClickHandler = (e) =>{
    console.log(e.target.elements);
  }

  const todoCheckedHandler =(e) =>{
    let index = todos.findIndex(item=>item.id == e.id)
    todos[index].done = !todos[index].done
    localStorage.setItem("todos" ,JSON.stringify(todos))  
    // window.location.reload()

  }
  const deleteClickHandler =(id) =>{
    console.log(id);
    const newTodos = todos.filter(todo=>todo.id !==id)
    localStorage.setItem("todos",JSON.stringify([...newTodos]))
    // window.location.reload()
  }
  return (
    <div className={styles.todos} >
      <DIV isDone ={todo.done}>
        {
          todo.category =="personal" ?
          <label htmlFor={todo.content}>
            {
              todo.done ?
                <input 
                onChange={()=>todoCheckedHandler(todo)} 
                hidden 
                checked
                className={styles.personal} 
                type="checkbox" 
                id={todo.content} 
                className={styles.checkedTodo}
              /> :
                <input 
                onChange={()=>todoCheckedHandler(todo)} 
                hidden 
                className={styles.personal} 
                type="checkbox" 
                id={todo.content} 
                className={styles.checkedTodo}
              />
            }
            {/* <input 
              onChange={()=>todoCheckedHandler(todo)} 
              hidden 
              className={styles.personal} 
              type="checkbox" 
              id={todo.content}
              className={styles.checkedTodo}
              // {todo.done &&checked}
            /> */}
            <div className={styles.checkedTodoButtonPersonal}></div>
          </label> :
          <label htmlFor={todo.content}>
            {
              todo.done ?
                <input 
                onChange={()=>todoCheckedHandler(todo)} 
                hidden 
                checked
                className={styles.business} 
                type="checkbox" 
                id={todo.content} 
                className={styles.checkedTodo}
              /> :
                <input 
                onChange={()=>todoCheckedHandler(todo)} 
                hidden 
                className={styles.business} 
                type="checkbox" 
                id={todo.content} 
                className={styles.checkedTodo}
              />
            }
            {/* <input 
              onChange={()=>todoCheckedHandler(todo)} 
              hidden 
              className={styles.business} 
              type="checkbox" 
              id={todo.content} 
              className={styles.checkedTodo}
            /> */}

            <div className={styles.checkedTodoButtonBusiness}></div>
          </label>
        
      }
        <input className={`${todo.done && styles.active}`} type="text" value={todo.content} readOnly />
      </DIV>

      <div className={styles.rightTodo}>
        <button onClick={editClickHandler}>Edit</button>
        <button onClick={()=>deleteClickHandler(todo.id)}>Delete</button>
      </div>
    </div>
  )
}

export default Todo
