import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.update = this.update.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.someThunkAction(state);
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            onChange={this.update("username")}
          />
          <input
            type="password"
            value={this.state.password}
            onChange={this.update("password")}
          />
        </form>
      </div>
    );
  }
}

// ===============x

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", password: "" };
    this.update = this.update.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.someThunkAction(state);
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.update("title")}
            value={this.state.title}
          />
          <textarea onChange={this.update("title")}>{this.state.body}</textarea>
        </form>
      </div>
    );
  }
}
