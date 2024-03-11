import React from "react";

import Header from "../header/header";
import Footer from "../footer/footer";
import TaskList from "../task-list/task-list";

import "./app.css";

export default class App extends React.Component {
  maxId = 100;
  state = {
    todoData: [],
    newTodo: "",
    newTodoMin: "",
    newTodoSec: "",
    filter: "All",
  };

  componentWillUnmount() {
    this.state.todoData.forEach(todo => {
      if(todo.timerInterval) {
        clearInterval(todo.timerInterval)
      }
    })
  }

  handleNewTodoChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleNewTodoMinChange = (event) => {
    this.setState({ newTodoMin: event.target.value });
  };

  handleNewTodoSecChange = (event) => {
    this.setState({ newTodoSec: event.target.value });
  };

  handleNewTodoKeyDown = (event) => {
    event.preventDefault();

    const title = this.state.newTodo.trim();
    const minutes = parseInt(this.state.newTodoMin, 10) || 0;
    const seconds = parseInt(this.state.newTodoSec, 10) || 0;

    if (title) {
      const newTodo = {
        title,
        completed: false,
        editing: false,
        timer: { minutes, seconds },
        date: new Date(),
        isRunning: false,
        id: this.maxId++,
      };
      this.setState({
        todoData: [...this.state.todoData, newTodo],
        newTodo: "",
        newTodoMin: "",
        newTodoSec: "",
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
      if (currentTimer.minutes === 0 && currentTimer.seconds === 0) {
        clearInterval(timerInterval);
        updatedTodos[index].isRunning = false;
      } else {
        let { minutes, seconds } = currentTimer;
        if (seconds === 0) {
          minutes -= 1;
          seconds = 59;
        } else {
          seconds -= 1;
        }
        updatedTodos[index].timer = { minutes, seconds };
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
    const { todoData, newTodo, newTodoMin, newTodoSec, filter } = this.state;
    return (
      <section className="todoapp">
        <Header
          newTodo={newTodo}
          newTodoMin={newTodoMin}
          newTodoSec={newTodoSec}
          onNewTodoChange={this.handleNewTodoChange}
          onNewTodoMinChange={this.handleNewTodoMinChange}
          onNewTodoSecChange={this.handleNewTodoSecChange}
          onNewTodoKeyDown={this.handleNewTodoKeyDown}
        />
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
