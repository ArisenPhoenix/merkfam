import css from "./Canvas.module.css";
import React from "react";
const Canvas = (props) => {
  return <div className={css.main}>{props.children}</div>;
};

export default Canvas;
