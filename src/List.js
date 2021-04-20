import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

const List = ({ items, editItem, removeItem, changeProgress }) => {
  return (
    <>
      {items.map((item) => {
        const { id, title, isDone } = item;
        return (
          <article key={id} className="list">
            <div className="list_container">
              <input
                type="checkbox"
                id="checkbox"
                onClick={() => changeProgress(id)}
              ></input>
              <p className={isDone ? "task" : "task_active"}>{title}</p>
            </div>
            <div className="button_container">
              <button className="edit-btn" onClick={() => editItem(id)}>
                <AiFillEdit />
              </button>
              <button className="delete-item" onClick={() => removeItem(id)}>
                <BsFillTrashFill />{" "}
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
};
export default List;
