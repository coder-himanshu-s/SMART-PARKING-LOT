import React from "react";
import "./Badge.css";

const Badge = ({ label, color = "default" }) => (
  <span className={`badge badge--${color}`}>{label}</span>
);

export default Badge;
