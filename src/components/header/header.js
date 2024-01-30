import React from "react";
import PropTypes from "prop-types";

import "./header.css";

export default class Header extends React.Component {
  state = {
    description: "",
  };

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.description);
    this.setState({
      description: "",
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form
            className="new-todo-form"
            onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.description}
            autoFocus
          />
          <input className="new-todo-form__timer" placeholder="Min" autoFocus />
          <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  onItemAdded: PropTypes.func
}