import React, { useState, useEffect } from "react";

import Header from "../header/header";
import Footer from "../footer/footer";
import TaskList from "../task-list/task-list";

import "./app.css";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [maxId, setMaxId] = useState(100);

  function createToDoItem(description, totalSeconds) {
    const seconds = parseInt(totalSeconds, 10) || 0;

    return {
      description,
      timer: seconds,
      date: new Date(),
      completed: false,
      editing: false,
      isRunning: false,
      id: maxId,
    };
  }

  useEffect(() => {
    return () => {
      todoData.forEach((todo) => {
        if (todo.timerInterval) {
          clearInterval(todo.timerInterval);
        }
      });
    };
  }, []);

  function addItem(text, secs) {
    if (text.trim() !== "") {
      const newItem = createToDoItem(text, secs);
      setTodoData((prevTodos) => [...prevTodos, newItem]);
      setMaxId((prevMaxId) => prevMaxId + 1);
    }
  }

  function onSetFilter(filter) {
    setFilter(filter);
  }

  function deleteItem(index) {
    setTodoData((prevTodos) => {
      const updatedTodos = [...prevTodos];

      if (updatedTodos[index] && updatedTodos[index].timerInterval) {
        clearInterval(updatedTodos[index].timerInterval);
      }

      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
  }

  function clearComplete() {
    setTodoData((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  function onToggleCompleted(index) {
    const updatedTodos = [...todoData];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    if (updatedTodos[index].completed) {
      clearInterval(updatedTodos[index].timerInterval);
    }
    setTodoData(updatedTodos);
  }

  function startTimer(index) {
    const updatedTodos = [...todoData];
    updatedTodos[index].isRunning = true;
    updatedTodos[index].timerInterval = setInterval(() => {
      if (updatedTodos[index].timer > 0) {
        updatedTodos[index].timer--;
        setTodoData((prevTodos) => {
          const updatedTodos = [...prevTodos];

          return updatedTodos;
        });
      } else {
        clearInterval(updatedTodos[index].timerInterval);
        updatedTodos[index].isRunning = false;
        setTodoData((prevTodos) => {
          const updatedTodos = [...prevTodos];

          return updatedTodos;
        });
      }
    }, 1000);
  }

  function pauseTimer(index) {
    setTodoData((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].isRunning = false;
      clearInterval(updatedTodos[index].timerInterval);
      return updatedTodos;
    });
  }

  return (
    <section className="todoapp">
      <Header onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={todoData}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          clearCompleted={clearComplete}
          setFilter={onSetFilter}
          filter={filter}
        />
        <Footer
          setFilter={onSetFilter}
          filter={filter}
          todos={todoData}
          onClearComplete={clearComplete}
        />
      </section>{" "}
    </section>
  );
}
