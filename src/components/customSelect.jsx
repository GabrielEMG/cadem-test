import React from "react";
import "./customSelect.css";

export default (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>{props.label}</label>
      <select
        className="customSelect"
        type="text"
        onChange={(e) => props.onChange(e)}
        style={{ ...props.style, marginTop: 10, marginBottom: 10 }}
      >
        {props.children}
      </select>
    </div>
  );
};
