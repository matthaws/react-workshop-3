import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export default class Form extends Component {
  state = this.props.initialState;

  // using transform-class-property babel plugin that comes native with create-react-app
  // this syntax will autmoatically create, essentially, this.state, this.update, and this.value.
  // Because the last two are fat-arrow functions, this means they will
  // naturally keep the context of 'this' inside them, and there's no need to bind in the
  // constructor!
  update = field => e => this.setState({ [field]: e.target.value });
  value = field => this.state[field];

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  };

  render() {
    const { children, title } = this.props;
    return (
      <Fragment>
        <h1>{title}</h1>
        <form onSubmit={this.handleSubmit}>
          {children(update, value, values)}
        </form>
      </Fragment>
    );
  }
}

Form.propTypes = {
  initialState: PropTypes.obj,
  children: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

Form.defaultValues = {
  initialState: {}
};

const LoginForm = () => {
  return (
    <Form
      title={"LOGIN!"}
      handleSubmit={someThunkAction}
      initialState={{ username: "", password: "" }}
    >
      {(update, value) => (
        <Fragment>
          <input
            type="text"
            value={value("username")}
            onChange={update("username")}
          />
          <input
            type="password"
            value={value("pasword")}
            onChange={update("password")}
          />\
        </Fragment>
      )}
    </Form>
  );
};
LoginForm.handleSubmit = (e, values) => {
  e.preventDefault();
  someThunkAction(values);
};

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
