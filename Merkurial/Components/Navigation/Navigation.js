import Top from "./Top/Top";
import Bottom from "./Bottom/Bottom";
import Canvas from "./Canvas/Canvas";
import css from "./Navigation.module.css";
import TopNav from "./NAV/TopNav"
import { useWindow } from "../../hooks/usehooks";


const Navigation = (props) => {
  const { width } = useWindow(); 
  const isMobile = width < 600;

  return (
    <div className={css.navigation}>
      {/* <Top
        className={css.top}
        logoImg={props.logoImg}
        logoAlt={props.logoAlt}
        navitems={props.navitems}
        isMobile={isMobile}
      /> */}

      <TopNav
        logoImg={props.logoImg}
        logoAlt={props.logoAlt} 
        itemWidth="20%"
        itemHeight="4rem"
        navWidth="100%"
        navHeight="4rem"
        mobileBorders={true}
        navBorders={false}
        left={[
          {name: 12, text: "Finances", border: true, requiresUser: true},
        {name: 123, text: "Games", border: true, requiresUser: true}]}

        center={[]}

        right={[
          {name: "blog", text: "Blog", border: true, requiresUser:true},
          {name: "login", text: "Login", border: true, isPublic: true},
          {name: "signup", text: "Signup", border: true, isPublic: true},
          {name: "logout", text: "Logout", border: true, requiresUser: true, logout: true}
      ]}
        radius="xs"
        isMobile={isMobile}
        transition="slide"
      />

      <Canvas>{props.children}</Canvas>
      <Bottom className={css.bottom} />
    </div>
  );
};

export default Navigation;
