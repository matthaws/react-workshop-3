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
    <div>
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
    </div>
  );
};

export default FragmentDemo;
