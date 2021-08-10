import React from "react";
import "../../util/global.css";
import "../../util/animation.css";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={`${props.type} || submit`}
      className={`${classes.button} ${props.second ? classes.second : ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
