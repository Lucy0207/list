import React from "react";
import PropTypes from "prop-types";

import "./header.css";

export default class Header extends React.Component {
  state = {
    description: "",
    timeMin: "",
    timeSec: ""
  };

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onTimeMinChange = (e) => {
    this.setState({
      timeMin: e.target.value,
    });
  };
  onTimeSecChange = (e) => {
    this.setState({
      timeSec: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.description, this.state.timeMin, this.state.timeSec);
    this.setState({
      description: "",
      timeMin: "",
      timeSec: ""
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
          <input
              className="new-todo-form__timer"
              type="number"
              placeholder="Min"
              onChange={this.onTimeMinChange}
              value={this.state.timeMin} />
          <input
              className="new-todo-form__timer"
              type="number"
              placeholder="Sec"
              onChange={this.onTimeSecChange}
              value={this.state.timeSec}
          />
          <button style={{ display: "none" }} type="submit"></button>
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  onItemAdded: PropTypes.func
}