import css from "./NavContainer.module.css";
import React, { useContext } from "react";
import USER_CONTEXT from "../../../../../store/Context/USER_CONTEXT/user_context";
import NavButton from "../../../NavButtons/NavButton";
import { linkify } from "../../../../../Helpers/Text/text";

const NavContainer = (props) => {
  const userCtx = useContext(USER_CONTEXT);
  const { isLoggedIn, isAdmin } = userCtx;
  const navItems = props.navitems;
  const navKeys = Object.keys(navItems);

  const leftSideNavs = navKeys.filter((item) => {
    return navItems[item].dir.toLowerCase().trim() !== "right";
  });

  const rightSideNavs = navKeys.filter((item) => {
    return navItems[item].dir.toLowerCase().trim() === "right";
  });

  const handleLogout = () => {
    props.onClick();
    userCtx.logoutUser();
  };

  return (
    <>
      <div className={css.navButtonsContainerLeft}>
        {leftSideNavs && leftSideNavs.length > 0 && (
          <Navs
            navKeys={leftSideNavs}
            navItems={navItems}
            direction="left"
            isAdmin={isAdmin}
            isLoggedIn={isLoggedIn}
            isDropped={props.isDropped}
            isMobile={props.isMobile}
          />
        )}
      </div>
      <hr></hr>
      <div className={css.navButtonsContainerRight}>
        {rightSideNavs && rightSideNavs.length > 0 && (
          <Navs
            navKeys={rightSideNavs}
            navItems={navItems}
            direction="right"
            isAdmin={isAdmin}
            isLoggedIn={isLoggedIn}
            isDropped={props.isDropped}
            isMobile={props.isMobile}
          />
        )}
      </div>
    </>
  );
};

export const Navs = (props) => {
  const navies = props.navKeys;
  const navItems = props.navItems;
  const isLoggedIn = props.isLoggedIn;
  const isDropped = props.isDropped;
  const onClick = props.onClick;
  const isMobile = props.isMobile;
  return (
    <>
      {navies.map((item, index) => {
        const nav = navItems[item];
        const SelectButton = nav.button ? nav.button : Nav;
        if (nav.requiresAdmin && isAdmin && isLoggedIn) {
          return (
            <SelectButton
              key={`NAV: ${nav.name}`}
              nav={nav}
              isMobile={isMobile}
              isDropped={isDropped}
              onClick={onClick}
              direction={nav.dir}
            />
          );
        } else if (isLoggedIn && requiresLogin) {
          return (
            <SelectButton
              key={`NAV: ${nav.name}`}
              nav={nav}
              isMobile={isMobile}
              isDropped={isDropped}
              onClick={onClick}
              direction={nav.dir}
            />
          );
        } else {
          return (
            <SelectButton
              key={`NAV: ${nav.name}`}
              nav={nav}
              isMobile={isMobile}
              isDropped={isDropped}
              onClick={onClick}
              direction={nav.dir}
            />
          );
        }
      })}
    </>
  );
};

export const Nav = (props) => {
  const nav = props.nav;
  let className;
  const dir = props.direction ? props.direction : "left";
  if (dir.toLowerCase().trim() == "left") {
    className = css.buttonContainerLeft;
  } else if (dir.toLowerCase().trim() == "right") {
    className = css.buttonContainerRight;
  }
  const href = linkify(nav.name);
  return (
    <div className={className}>
      <NavButton
        key={nav.href}
        text={nav.name}
        href={href}
        onClick={props.onClick}
        className={props.isMobile ? css.navContainerMobile : css.button}
        isDropped={props.isDropped}
      />
    </div>
  );
};

export default NavContainer;
