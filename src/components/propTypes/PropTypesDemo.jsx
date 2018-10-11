import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

const PropTypesDemo = ({ string, number, component: Component, func, isOn }) =>
  isOn ? (
    <Fragment>
      <p>String: {string.toUpperCase()}</p>
      <p>Number: {number * 5}</p>
      <p>Function result: {func()}</p>
      <p>
        <Component />
      </p>
    </Fragment>
  ) : null;

class DemoClass extends Component {
  static propTypes = {};
}

DemoClass.propTypes = {};

PropTypesDemo.propTypes = {
  string: PropTypes.string.isRequired,
  number: PropTypes.number,
  func: PropTypes.func,
  isOn: PropTypes.bool,
  component: PropTypes.node
};

PropTypesDemo.defaultProps = {
  number: 5,
  isOn: true
};

export default PropTypesDemo;
