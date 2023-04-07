import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [taskName, setTaskName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState([]);
  const [modal, setModal] = useState(false);

  const getTodos = async () => {
    const response = await axios
      .get("http://localhost:3001/todos/", {
        params: { complete: false, search: searchText },
      })
      .then((res) => setTodos(res.data));
    return response;
  };
  console.log(todos);

  const getDone = async () => {
    const response = await axios
      .get("http://localhost:3001/todos/", {
        params: { complete: true, search: searchText },
      })
      .then((res) => setDone(res.data));
    return response;
  };
  console.log(todos, done);

  useEffect(() => {
    getTodos();
    getDone();
  }, [searchText]);

  const handleName = (e) => {
    setTaskName(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const addTask = async (e) => {
    await axios.post("http://localhost:3001/todos/", {
      name: taskName,
    });
    getTodos();
  };

  const handleToggle = async (id) => {
    await axios.put("http://localhost:3001/todos/" + id);
    getTodos();
    getDone();
  };

  const deleteAll = async () => {
    await axios.delete("http://localhost:3001/todos/");
    getTodos();
    getDone();
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleAccept = () => {
    deleteAll();
    setModal(false);
  };

  const onDeleteClick = () => {
    setModal(true);
  };

  return (
    <div className="App">
      <div className="apart">
        <h1>Marvelous v2.0</h1>
        <button onClick={onDeleteClick}>Delete all tasks</button>
      </div>
      <div className="apart">
        <span>
          <input type="text" value={taskName} onChange={handleName}></input>
          <button onClick={addTask}>Add</button>
        </span>
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search"
        ></input>
      </div>
      <div className="apart">
        <div className="todos">
          <h1>To Do</h1>
          <hr />
          <div className="list">
            {todos.map((todo) => (
              <div>
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => {
                    handleToggle(todo._id);
                  }}
                ></input>
                <label>{todo.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="todos">
          <h1>Done</h1>
          <hr />
          <div className="list">
            {done.map((todo) => (
              <div>
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => {
                    handleToggle(todo._id);
                  }}
                ></input>
                <label>{todo.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modal && (
        <div className="modal">
          <div className={`modal-window`}>
            <h2>Are you certain you want to delete all todos?</h2>
            <button className="no-button" onClick={handleCancel}>
              NO! TAKE ME BACK!
            </button>
            <button className="yes-button" onClick={handleAccept}>
              YES! I am certain.
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
