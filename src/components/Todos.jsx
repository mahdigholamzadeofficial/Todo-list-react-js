import React, { useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./todos.module.css"

const Todos = () => {  
  //////////////// <variables which will be equal with the values of localStorages!>
  let username ;

  //////////////// <States which provides the value of states!>
  const [nameInput,setNameInput] = useState("");
  const [todoInput,setTodoInput] = useState("");

  //////////////// <when components mounted!>
  let todos=[];

  useEffect(()=>{
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    username = localStorage.getItem("username") || "";
    setNameInput(username)
  },[])

  //////////////// <change handlers for name input!>
  const changeHandler = (e) =>{
    if(e.target.value.length >17){
      toast.warn("Name can't be more than 17 characters!")

    }else{
      setNameInput(e.target.value)
      localStorage.setItem("username" ,e.target.value)
    }
  }
  //////////////// <submit handler for adding the item if todo input!>
  const submitHandler=(e)=>{
    // debugger
    e.preventDefault();

    const todo = {
      category : e.target.elements.category.value,
      content : e.target.elements.content.value,
      done:false,
      createdAt : new Date().getTime()
    }

    // todos=[...todo]
    todos.push(todo)
    
    localStorage.setItem("todos", JSON.stringify(todos))
    // console.log(localStorage.getItem("todos"));
    e.target.reset()
    setTodoInput("")
  }

  return (
    <div className={styles.container}>

      <div className={styles.usersSecion}>
        <h3>What's up,</h3>
        <input onChange={changeHandler} value={nameInput} type="text" placeholder='Enter your name..' />
      </div>


      <form onSubmit={submitHandler} className={styles.categorySection}>

        <p>CREATE A TODO</p>
        <h5>What's on your todo?</h5>
        <input 
          className={styles.todoInput} 
          value={todoInput} 
          onChange={(e)=>setTodoInput(e.target.value)} 
          type="text" 
          name='content' 
          placeholder='e.g Get some milk'
        />
        <h5>Pick a category</h5>

        <div className={styles.categories}>

          <label htmlFor="business" >
            <input hidden type="radio" name="category" value="business" id="business" className={styles.business} />
            <div className={styles.businessButton}></div>
            <span>Business</span>
          </label>

          <label htmlFor="personal">
            <input hidden className={styles.personal} type="radio" name="category" value="personal" id="personal" />
            <div className={styles.personalButton}></div>
            <span>Personal</span>
          </label>

        </div>
        <input type="submit" value="ADD TODO" />

      </form>
      <div className={styles.todoListsContainer}>
        <p>TODO LIST</p>

        <div className={styles.todoListWrapper}>

          {/* for usering map method */}
          <div className={`${styles.todos} `}>
          {/* ${styles.active} */}
            <div className={styles.leftTodo}>
              <label htmlFor="checkedTodo">
                <input hidden className={styles.personal} type="checkbox" id="checkedTodo" className={styles.checkedTodo} />
                <div className={styles.checkedTodoButton}></div>
              </label>
              <input type="text" value="Buy som milk" readOnly />
            </div>

            <div className={styles.rightTodo}>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
          {/* for usering map method */}


        </div>
      </div>

    <ToastContainer/>
    </div>
  )
}

export default Todos
