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

export default PropTypesDemo;
