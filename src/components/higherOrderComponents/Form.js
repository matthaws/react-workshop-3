import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export default class Form extends Component {
  state = this.props.initialState;

  update = field => e => this.setState({ [field]: e.target.value });
  value = field => this.state[field];
  values = () => this.state;

  render() {
    const { children, title } = this.props;
    return (
      <Fragment>
        <h1>{title}</h1>
        {children(update, value, values)}
      </Fragment>
    );
  }
}

Form.propTypes = {
  initialState: PropTypes.obj,
  children: PropTypes.func.isRequired
};

Form.defaultValues = {
  initialState: {}
};

const LoginForm = () => (
  <Form initialState={{ username: "", password: "" }}>
    {(update, value, values) => (
      <form onSubmit={handleSubmit(values())}>
        <input
          type="text"
          value={value("username")}
          onChange={update("username")}
        />
        <input
          type="password"
          value={value("pasword")}
          onChange={update("password")}
        />
      </form>
    )}
  </Form>
);

const PostForm = () => (
  <Form initialState={{ title: "", body: "" }}>
    {(update, value, values) => (
      <form onSubmit={handleSubmit(values())}>
        <input type="text" onChange={update("title")} value={value("title")} />
        <textarea onChange={update("body")}>{value("body")}</textarea>
      </form>
    )}
  </Form>
);
