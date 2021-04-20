import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./List.js";
import Alert from "./Alert.js";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Name can not be empty!");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "Task edited!");
    } else {
      showAlert(true, "success", "Task added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        isDone: false,
      };
      setList([...list, newItem]);
      showAlert(true, "success", "Task added");
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "success", "Task successfully deleted");
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  const changeProgress = (id) => {
    let updatedList = list.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
        console.log(item.value);
      }
      return item;
    });

    setList(updatedList);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="app">
      <div className="background"></div>
      <div className="container">
        <div className="container_heading">
          <h2>Todo list</h2>
        </div>
        <div className="container_body">
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <form className="submit-form" onSubmit={handleSubmit}>
            <div className="form-container">
              <input
                type="text"
                value={name}
                placeholder="Enter tasks here"
                className="task-input"
                onChange={(e) => setName(e.target.value)}
              ></input>
              <button type="submit" className="submit-btn">
                {isEditing ? "Edit" : "Submit"}
              </button>
            </div>
          </form>
          {list.length > 0 && (
            <div className="grocery-container">
              <List
                items={list}
                editItem={editItem}
                removeItem={removeItem}
                changeProgress={changeProgress}
              />
              <button
                className="clear-btn"
                onClick={() => {
                  setList([]);
                  showAlert(true, "success", "All items deleted");
                }}
              >
                Clear items
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
