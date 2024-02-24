import "./filters.css";

import React from "react";
import PropTypes from "prop-types";

export default class Filters extends React.Component {
  state = {
    selectedFilter: "all",
  };

  handleFilterClick(filter) {
    this.setState({ selectedFilter: filter });
    this.props.setFilter(filter);
  }

  render() {
    const filterOptions = [
      { value: "all", label: "All" },
      { value: "active", label: "Active" },
      { value: "completed", label: "Completed" },
    ];

    return (
      <ul className="filters">
        {filterOptions.map((option) => (
          <li key={option.value}>
            <button
              className={
                this.state.selectedFilter === option.value ? "selected" : ""
              }
              onClick={() => this.handleFilterClick(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

Filters.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
