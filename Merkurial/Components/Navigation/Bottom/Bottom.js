import css from "./Bottom.module.css";
import { useClass } from "../../../hooks/usehooks";
import SocialMediaButton from "../../UI/Buttons/SocialMediaButton/SocialMediaButton";
import { faLine } from "@fortawesome/free-brands-svg-icons/faLine";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import React from "react";

const Bottom = (props) => {
  const copyrightDate = new Date().getFullYear();
  const classes = useClass([props.className, css.bottomContainer]);
  return (
    <div className={classes}>
      <div className={css.buttonContainer}>
        <SocialMediaButton
          icon={faFacebookSquare}
          alt="facebook icon"
          href="https://www.facebook.com"
          divClass={`${css.iconDiv} ${css.facebook}`}
          iconClass={css.iconClass}
        />
      </div>

      <div className={css.buttonContainer}>
        <SocialMediaButton
          icon={faPhone}
          alt="phone icon"
          href="0937413777"
          divClass={`${css.iconDiv} ${css.phone}`}
          iconClass={css.iconClass}
        />
      </div>

      <div className={css.buttonContainer}>
        <SocialMediaButton
          icon={faLine}
          alt="line icon"
          href="https://www.google.com/line"
          iconClass={css.iconClass}
          divClass={`${css.iconDiv} ${css.line}`}
        />
      </div>

      <div className={`${css.copyrightDiv}`}>
        <p className={css.date}>copyright {copyrightDate}</p>
        <p className={css.date}>www 🎲 merkurialphoenix 🎲 com</p>
      </div>
    </div>
  );
};

export default Bottom;
