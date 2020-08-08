import React from "react";
import "./Button.css";
function Button(props) {
  return (
    <button
      className={props.type ? props.type : "default"}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}

export default Button;
