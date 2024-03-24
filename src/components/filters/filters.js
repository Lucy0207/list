import "./filters.css";

import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Filters({ setFilter }) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  function handleFilterClick(filter) {
    setSelectedFilter(filter);
    setFilter(filter);
  }

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
            className={selectedFilter === option.value ? "selected" : ""}
            onClick={() => handleFilterClick(option.value)}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

Filters.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
