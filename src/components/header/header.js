import React, { useState } from "react";
import PropTypes from "prop-types";

import "./header.css";

export default function Header({ onItemAdded }) {
  const [description, setDescription] = useState("");
  const [newTodoMin, setNewTodoMin] = useState("");
  const [newTodoSec, setNewTodoSec] = useState("");
  const [totalSeconds, setTotalSeconds] = useState("");

  function handleNewTodoChange(event) {
    setDescription(event.target.value);
  }

  function handleNewTodoMinChange(event) {
    const minutes = event.target.value;
    const totalSeconds = parseInt(minutes, 10) * 60 + (newTodoSec || 0);
    setNewTodoMin(minutes);
    setTotalSeconds(totalSeconds);
  }

  function handleNewTodoSecChange(event) {
    const seconds = event.target.value;
    const totalSeconds = parseInt(seconds, 10) + (newTodoMin || 0) * 60;
    setNewTodoSec(seconds);
    setTotalSeconds(totalSeconds);
  }

  function onSubmit(event) {
    event.preventDefault();
    onItemAdded(description, totalSeconds);
    setDescription("");
    setNewTodoMin("");
    setNewTodoSec("");
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={description}
          onChange={handleNewTodoChange}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Min"
          value={newTodoMin}
          onChange={handleNewTodoMinChange}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          value={newTodoSec}
          onChange={handleNewTodoSecChange}
        />
        <button style={{ display: "none" }} type="submit"></button>
      </form>
    </header>
  );
}

Header.propTypes = {
  newTodo: PropTypes.string,
  newTodoMin: PropTypes.string,
  newTodoSec: PropTypes.string,
  /* onNewTodoChange: PropTypes.func.isRequired,
  onNewTodoMinChange: PropTypes.func.isRequired,
  onNewTodoSecChange: PropTypes.func.isRequired,*/
  onItemAdded: PropTypes.func.isRequired,
};
