import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import fetchJoke from "./api_util";
import "./HOC.css";

const HOCDemo = () => (
  <WithLoader asyncCall={fetchJoke}>{({ joke }) => <h1>{joke}</h1>}</WithLoader>
);

const Button = ({ children, ...props }) => (
  <button {...props} className="button">
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired
};

class WithLoader extends Component {
  state = { isLoaded: false, payload: null };

  componentDidMount() {
    this.props
      .asyncCall()
      .then(payload => this.setState({ payload, isLoaded: true }));
  }

  render() {
    const { isLoaded, payload } = this.state;
    const { children } = this.props;
    return isLoaded ? children(payload) : <div className="spinner" />;
  }
}

export default HOCDemo;
