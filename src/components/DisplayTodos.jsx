import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { GrStatusInfo } from "react-icons/gr";
import { MdTimer } from "react-icons/md";

const DisplayTodos = () => {
  // use states to manage data
  const { fetchTodos, loadingTodos, errorTodos } = useStateContext();

  const setDate = (date) => {
    return date.split("T")[0].split("-").reverse().join(".");
  };
  return (
    // render component content
    <div className="todos-container">
      {/* info - waiting to load todos */}
      {loadingTodos && <div className="info-box">Loading Todos...</div>}
      {/* info - display error on screen */}
      {errorTodos && (
        <div className="info-box">{`There is a problem fetching the data - ${errorTodos}`}</div>
      )}
      {fetchTodos && (
        // render list using react-virtualized
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="todo-list"
              itemCount={fetchTodos.data.length}
              itemSize={200}
              height={height}
              width={width}
            >
              {({ index, style }) => {
                return (
                  <div
                    style={style}
                    className={`single-todo ${
                      fetchTodos.data[index].status === "completed"
                        ? "completed"
                        : "pending"
                    }`}
                  >
                    <div className="todo-title">
                      {fetchTodos.data[index].title}
                    </div>
                    <div className="todo-due">
                      <MdTimer className="todo-icons" />
                      {setDate(fetchTodos.data[index].due_on)}
                    </div>
                    <div className="todo-status">
                      <GrStatusInfo className="todo-icons" />
                      {fetchTodos.data[index].status}
                    </div>
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      )}
    </div>
  );
};

export default DisplayTodos;
