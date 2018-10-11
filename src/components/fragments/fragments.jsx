import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./fragments.css";

const FragmentDemo = () => {
  return (
    <article className="parent-element">
      <FlexedChildren />
    </article>
  );
};

const FlexedChildren = () => {
  return (
    <Fragment>
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
    </Fragment>
  );
};

export default FragmentDemo;
