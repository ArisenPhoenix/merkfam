import Top from "./Top/Top";
import Bottom from "./Bottom/Bottom";
import Canvas from "./Canvas/Canvas";
import css from "./Navigation.module.css";
import React from "react";

const Navigation = (props) => {
  return (
    <div className={css.navigation}>
      <Top
        className={css.top}
        logoImg={props.logoImg}
        logoAlt={props.logoAlt}
        navitems={props.navitems}
      />
      <Canvas>{props.children}</Canvas>
      <Bottom className={css.bottom} />
    </div>
  );
};

export default Navigation;
