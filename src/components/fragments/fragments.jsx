import React, { Component } from "react";
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
    <React.Fragment>
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
    </React.Fragment>
  );
};

export default FragmentDemo;
