import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import Todo from "../components/Todo";
import database from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Main() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    // setTodos([...todos, input])
    const colRef = collection(database, "todos");
    addDoc(colRef, { todo: input }).then((res) => {
      //console.log("result", res);
      setTodos([...todos, { todo: input, id: res.id }]);
    });
    setInput("");
  };

  const deleteItem = (id) => {
    const docRef = doc(database, "todos", id);
    deleteDoc(docRef).then(() => {
      let filteredTodos = todos.filter((todo) => todo.id != id);
      setTodos(filteredTodos);
    });
  };

  const getTodos = async (database) => {
    let todos = [];
    const colRef = collection(database, "todos");
    const todoSnapshot = await getDocs(colRef);

    //console.log(todoSnapshot);

    todoSnapshot.docs.forEach((doc) => {
      todos.push({ ...doc.data(), id: doc.id });
    });
    //console.log(todos);
    setTodos(todos);
  };

  useEffect(() => {
    getTodos(database);
  }, []);
  return (
    <div>
      <h1>TO DO APP</h1>
      <form onSubmit={addTodo}>
        <TextField
          className="input"
          onChange={handleInputChange}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          // color="secondary"
          value={input}
        />
        <Button
          disabled={!input}
          className="add-btn"
          variant="contained"
          type="submit"
          //   onClick={addTodo}
        >
          Add TODO
        </Button>
      </form>
      <div className="list-container">
        <div className="box">
          <div class="head-to-do">TO DO</div>
          <div className="body">
            <ul className="list-ul">
              {todos.map((obj) => {
                return (
                  <Todo id={obj.id} deleteItem={deleteItem} todo={obj.todo} />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
