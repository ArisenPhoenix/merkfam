import css from "./Top.module.css";
import { useClass } from "../../../hooks/usehooks";
import React, { useContext } from "react";
import DropDownButton from "./DropDownContainer/DropDownButton/DropDownButton";
import LogoButton from "../NavButtons/LogoButton";
import NavContainer from "./DropDownContainer/NavContainer/NavContainer";
import useToggle from "../../../hooks/Toggle";
import DropDownNavs from "./DropDownContainer/DropDownNavs/DropDownNavs";
import USER_CONTEXT from "../../../store/Context/USER_CONTEXT/user_context";
import OutsideAlerter from "../../../hooks/useOutsideAlerter";

const Top = (props) => {
  const navitems = props.navitems;
  const userCtx = useContext(USER_CONTEXT);
  const [isDropped, toggleIsDropped, setIsDropped] = useToggle(false);
  const mainClass = useClass([props.className, css.topContainer]);
  const { isAdmin, isLoggedIn } = userCtx;
  const isMobile = props.isMobile

  const drop = () => {
    setIsDropped(false);
  };

  return (
    <div className={mainClass}>
      <div className={css.left}>
        {/* <LogoButton href="/" src={props.logoImg} alt={props.logoAlt} /> */}
        {!isMobile && <NavContainer navitems={navitems} />}
      </div>

      {isMobile && (
        <div className={css.dropped}>
          <OutsideAlerter setToFalse={drop}>
            <div className={css.dropDownDiv}>
              <DropDownButton onClick={toggleIsDropped} />
            </div>
            <div className={css.dropNavs} onClick={drop}>
              <DropDownNavs
                navItems={navitems}
                isDropped={isDropped}
                isAdmin={isAdmin}
                isLoggedIn={isLoggedIn}
                drop={drop}
              />
            </div>
          </OutsideAlerter>
        </div>
      )}
      
    </div>
  );
};

export default Top;
