import React from "react";

import Header from "../header/header";
import Footer from "../footer/footer";
import TaskList from "../task-list/task-list";

import "./app.css";

export default class App extends React.Component {
  maxId = 100;

  createToDoItem = (description, totalSeconds) => {
    const seconds = parseInt(totalSeconds, 10) || 0;

    return {
      description,
      timer: seconds,
      date: new Date(),
      completed: false,
      editing: false,
      isRunning: false,
      id: this.maxId++,
    };
  };
  state = {
    todoData: [],

    filter: "All",
  };

  componentWillUnmount() {
    this.state.todoData.forEach((todo) => {
      if (todo.timerInterval) {
        clearInterval(todo.timerInterval);
      }
    });
  }

  addItem = (text, secs) => {
    if (text.trim() !== "") {
      const newItem = this.createToDoItem(text, secs);
      this.setState(({ todoData }) => {
        const newArr = [...todoData, newItem];
        return {
          todoData: newArr,
        };
      });
    }
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  deleteItem = (index) => {
    const updatedTodos = this.state.todoData.filter((_, i) => i !== index);
    this.setState({ todoData: updatedTodos });
  };

  clearComplete = () => {
    this.setState(({ todoData }) => {
      const completed = todoData.filter((el) => !el.completed);
      return {
        todoData: completed,
      };
    });
  };
  onToggleCompleted = (index) => {
    const updatedTodos = [...this.state.todoData];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    if (updatedTodos[index].completed) {
      clearInterval(updatedTodos[index].timerInterval);
    }
    this.setState({ todoData: updatedTodos });
  };

  startTimer = (index) => {
    const updatedTodos = [...this.state.todoData];
    updatedTodos[index].isRunning = true;

    const timerInterval = setInterval(() => {
      const currentTimer = updatedTodos[index].timer;
      if (currentTimer === 0) {
        clearInterval(timerInterval);
        updatedTodos[index].isRunning = false;
      } else {
        updatedTodos[index].timer -= 1;
      }

      this.setState({ todoData: updatedTodos });
    }, 1000);

    updatedTodos[index].timerInterval = timerInterval;

    this.setState({ todoData: updatedTodos });
  };

  pauseTimer = (index) => {
    const updatedTodos = [...this.state.todoData];
    updatedTodos[index].isRunning = false;
    clearInterval(updatedTodos[index].timerInterval);
    this.setState({ todos: updatedTodos });
  };

  render() {
    const { todoData, filter } = this.state;
    return (
      <section className="todoapp">
        <Header onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            startTimer={this.startTimer}
            pauseTimer={this.pauseTimer}
            clearCompleted={this.clearComplete}
            setFilter={this.setFilter}
            filter={filter}
          />
          <Footer
            setFilter={this.setFilter}
            filter={filter}
            todos={todoData}
            onClearComplete={this.clearComplete}
          />
        </section>{" "}
      </section>
    );
  }
}
