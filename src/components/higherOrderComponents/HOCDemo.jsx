import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import fetchJoke from "./api_util";
import "./HOC.css";

// A Higher Order component that abstracts a real HTML element allowing you to apply
// consistent styling and usage throughout your app and manage the CSS for this element
// only in one place.
const Button = ({ children, ...props }) => (
  <button {...props} className="button">
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired
};

// 'Children' is a property in props given by React that refers to anything between
// the opening and closing of the React tag in a render method. It parallels the
// DOM tree structure. So below, the h1 node is the child of SomeComponent. And the text
// 'Text!' is the child of the h1 tag.

<SomeComponent>
  <h1>Text!</h1>
</SomeComponent>;

// A simple utility component that takes in an async call, renders a spinner while
// the async call is pending, then renders the children of the component when its finished.
// To pass the 'payload' to the children, we are going to put a FUNCTION as the child to this component
// rather than a React component or JSX node. That way we can invoke children like a function
// because we know that it WILL be a function, and pass in the payload as the argument.

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

// Here we are using the component - the child is a function that expects the
// payload as an argument and returns some JSX.

const HOCDemo = () => (
  <WithLoader asyncCall={fetchJoke}>
    {payload => <h1>{payload.joke}</h1>}
  </WithLoader>
);

export default HOCDemo;
