import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { SSRProvider, ThemeProvider } from "react-bootstrap";
config.autoAddCss = false;
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";
import { faBars, faPhone } from "@fortawesome/free-solid-svg-icons";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../Merkurial/Components/Navigation/Navigation";
import mercuryImg from "../public/mercury-planet2.jpeg";
import { navItems } from "../Components/NavItems";
// import { SAVED_DATA_PROVIDER } from "../store/Context/SAVE_DATA_CONTEXT";
// import { USER_CONTEXT_PROVIDER } from "../Merkurial/store/Context/USER_CONTEXT/user_context";
// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(faBars, faFacebook, faLine, faPhone);

const Marcure_Family_App = ({ Component, pageProps }) => {
  return (
    <SSRProvider>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm"]}
        minBreakpoint="sm"
      >
        <Navigation
          logoImg={mercuryImg}
          logoAlt="Mercury Image"
          navitems={navItems}
        >
          <Component {...pageProps} />
        </Navigation>
      </ThemeProvider>
    </SSRProvider>
  );
};

export default Marcure_Family_App;
