import React from "react";
import "./StatCard.css";

const StatCard = ({ label, value, icon, color = "accent", loading }) => {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__icon">{icon}</div>
      <div className="stat-card__body">
        <div className="stat-card__value">
          {loading ? <span className="skeleton skeleton--sm" /> : value ?? "—"}
        </div>
        <div className="stat-card__label">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
