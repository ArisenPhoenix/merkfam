import Container from "react-bootstrap/Container";

const BootstrapContainer = (props) => {
  return <Container className={props.className}>{props.children}</Container>;
};

export default BootstrapContainer;
