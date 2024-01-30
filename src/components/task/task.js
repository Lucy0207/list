import "./task.css";

import React from "react";

import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

export default class Task extends React.Component {
  render() {
    const { description, timeMin, timeSec, editing, onToggleCompleted, date } = this.props;
    return (
      <>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            defaultChecked={this.props.completed}
            onChange={onToggleCompleted}
          />
          <label>
            <span className="title">{description}</span>
            <span className="description">
                {timeMin + ":" + timeSec}
                  <button className="icon icon-play"></button>
                  <button className="icon icon-pause"></button>
            </span>
            <span className="description">
              {" "}
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            className="icon icon-destroy"
            onClick={this.props.onDeleted}
          ></button>
        </div>
        {editing && <input type="text" className="edit" value={description} />}
      </>
    );
  }
}

Task.propTypes = {
  description: PropTypes.string,
  timeMin: PropTypes.string,
  timeSec: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  editing: PropTypes.bool,
  onToggleCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func.isRequired
};
