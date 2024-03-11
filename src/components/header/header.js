import React from "react";
import PropTypes from "prop-types";

import "./header.css";

export default class Header extends React.Component {

  state = {
    description: "",
    newTodoMin: "",
    newTodoSec: "",
  }

  handleNewTodoChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleNewTodoMinChange = (event) => {
    this.setState({ newTodoMin: event.target.value });
  };

  handleNewTodoSecChange = (event) => {
    this.setState({ newTodoSec: event.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.description, this.state.newTodoMin, this.state.newTodoMin);
    this.setState({
      description: "",
      newTodoMin: "",
      newTodoSec: ""
    });
  };
  render() {

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.description}
            onChange={this.handleNewTodoChange}
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            type="number"
            placeholder="Min"
            value={this.state.newTodoMin}
            onChange={this.handleNewTodoMinChange}
          />
          <input
            className="new-todo-form__timer"
            type="number"
            placeholder="Sec"
            value={this.state.newTodoSec}
            onChange={this.handleNewTodoSecChange}
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
  onItemAdded: PropTypes.func.isRequired,
};
