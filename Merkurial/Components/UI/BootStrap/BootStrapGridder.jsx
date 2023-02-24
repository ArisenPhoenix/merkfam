import BootstrapContainer from "./BootStrapContainer";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
const BootstrapGridder = (props) => {
  if ((props.colWidths !== "") & (props.colWidths !== undefined)) {
    colWidths = props.colWidths;
  }

  return (
    <BootstrapContainer
      fluid={props.fluid ? props.fluid : null}
      className={props.containerClass}
    >
      <Row className={`${props.rowClass ? props.rowClass : null}`}>
        {props.children}
      </Row>
    </BootstrapContainer>
  );
};

export default BootstrapGridder;

export const COLUMN = (props) => {
  return (
    <Col
      sm={props.sm}
      md={props.md}
      lg={props.lg}
      xlg={props.xlg}
      className={props.className}
    >
      {props.children}
    </Col>
  );
};

export const ROW = (props) => {
  return (
    <Row
      sm={props.sm}
      md={props.md}
      lg={props.lg}
      xlg={props.xlg}
      className={props.className}
    >
      {props.children}
    </Row>
  );
};
