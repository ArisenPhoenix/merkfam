import css from "./Canvas.module.css";
import paperBg from "../../../../public/paperBg.jpg"
import React from "react";
const Canvas = (props) => {
  return <div className={css.main} style={{backgroundImage:`url(${paperBg.src})`}}>{props.children}</div>;
};

export default Canvas;
