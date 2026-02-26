import React from "react";
import "./SlotFilters.css";

const SlotFilters = ({ filters, onFilterChange }) => {
  const filterOptions = [
    { key: "all", label: "All Slots" },
    { key: "available", label: "Available" },
    { key: "occupied", label: "Occupied" },
    { key: "ev", label: "EV Charging" },
    { key: "covered", label: "Covered" },
  ];

  return (
    <div className="slot-filters">
      {filterOptions.map(({ key, label }) => (
        <button
          key={key}
          className={`slot-filters__btn ${filters.active === key ? "slot-filters__btn--active" : ""}`}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SlotFilters;
