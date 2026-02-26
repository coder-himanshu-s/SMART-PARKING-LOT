import React from "react";
import "./Loader.css";

const Loader = ({ size = "md", text }) => (
  <div className={`loader loader--${size}`}>
    <div className="loader__spinner" />
    {text && <p className="loader__text">{text}</p>}
  </div>
);

export default Loader;
