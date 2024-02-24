import React from "react";
import PropTypes from "prop-types";

import "./header.css";

export default class Header extends React.Component {


  render() {
    const {
      newTodo,
      newTodoMin,
      newTodoSec,
      onNewTodoChange,
      onNewTodoMinChange,
      onNewTodoSecChange,
      onNewTodoKeyDown
    } = this.props;
    return (
      <header className="header">
        <h1>todos</h1>
        <form
            onSubmit={onNewTodoKeyDown}
            className="new-todo-form"

            >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={onNewTodoChange}
            autoFocus
          />
          <input
              className="new-todo-form__timer"
              type="number"
              placeholder="Min"
              value={newTodoMin}
              onChange={onNewTodoMinChange} />
          <input
              className="new-todo-form__timer"
              type="number"
              placeholder="Sec"
              value={newTodoSec}
              onChange={onNewTodoSecChange}
          />
          <button style={{ display: "none" }} type="submit"></button>
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  newTodo: PropTypes.string,
  newTodoMin: PropTypes.string,
  newTodoSec: PropTypes.string,
  onNewTodoChange: PropTypes.func.isRequired,
  onNewTodoMinChange: PropTypes.func.isRequired,
  onNewTodoSecChange: PropTypes.func.isRequired,
  onNewTodoKeyDown: PropTypes.func.isRequired
}