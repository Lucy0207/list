import "./task.css";

import React from "react";

import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

export default class Task extends React.Component {
  render() {
    const { todo, onToggleCompleted, onDeleted, startTimer, pauseTimer } =
      this.props;


    return (
      <>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            defaultChecked={todo.completed}
            onChange={onToggleCompleted}
          />
          <label>
            <span className="title">{todo.title}</span>
            <span className="description">
              {`${todo.timer.minutes
                .toString()
                .padStart(2, "0")}:${todo.timer.seconds
                .toString()
                .padStart(2, "0")}`}
              <button className="icon icon-play" onClick={startTimer}></button>
              <button className="icon icon-pause" onClick={pauseTimer}></button>
            </span>{" "}
            <span className="description">
              {" "}
              {`created ${formatDistanceToNow(todo.date, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {todo.editing && (
          <input type="text" className="edit" value={todo.title} />
        )}
      </>
    );
  }
}

Task.propTypes = {
  date: PropTypes.instanceOf(Date),
  editing: PropTypes.bool,
  onToggleCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func.isRequired,
  todo: PropTypes.object,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
};
