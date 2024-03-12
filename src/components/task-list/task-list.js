import React from "react";

import Task from "../task/task";

import "./task-list.css";
import PropTypes from "prop-types";

export default class TaskList extends React.Component {
  componentDidMount() {
    this.setState({ toDoItems: this.props.todos });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todos !== this.props.todos) {
      this.setState({ toDoItems: this.props.todos });
    }
  }

  render() {
    const {
      todos,
      filter,
      onToggleCompleted,
      onDeleted,
      startTimer,
      pauseTimer,
    } = this.props;

    const filteredList = todos.filter((todo) => {
      if (filter === "active") {
        return !todo.completed;
      } else if (filter === "completed") {
        return todo.completed;
      } else {
        return true;
      }
    });
    const finalTasks = filteredList.map((item, id) => {
      let classNames = "";

      if (item.editing) {
        classNames = "editing";
      } else if (item.completed) {
        classNames = "completed";
      }

      return (
        <li key={item.id} className={classNames}>
          <Task
            todo={item}
            onDeleted={() => onDeleted(id)}
            onToggleCompleted={() => onToggleCompleted(id)}
            startTimer={() => startTimer(id)}
            pauseTimer={() => pauseTimer(id)}
          />
        </li>
      );
    });

    return <ul className="todo-list">{finalTasks}</ul>;
  }
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  filter: PropTypes.string,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
};
