import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { SSRProvider, ThemeProvider } from "react-bootstrap";
config.autoAddCss = false;
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";
import { faBars, faPhone } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../Merkurial/Components/Navigation/Navigation";
import mercuryImg from "../public/logoButton.png";
import { navItems } from "../Components/NavItems";
import { Provider } from "react-redux";
library.add(faBars, faFacebook, faLine, faPhone);
import STORE from "../store/Redux/Store";
import { MERKURIAL_CONTEXT_PROVIDER } from "../Merkurial/store/Context/MERKURIAL_CONTEXT/merkurial_context";

const Marcure_Family_App = ({ Component, pageProps }) => {
  return (
    <MERKURIAL_CONTEXT_PROVIDER>
      <Provider store={STORE}>
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
      </Provider>
    </MERKURIAL_CONTEXT_PROVIDER>
  );
};

export default Marcure_Family_App;
