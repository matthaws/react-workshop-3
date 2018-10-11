# Higher Order Components

A Higher Order Component is simply a component that renders another component. You can think of it as a wrapper for other components that modifies or customizes their behavior. The connected container components we use in the Redux cycle are a common example of HOCs in work, but you can make your own in order to have customizable behavior!

Here's a very simple example to start. Let's make a custom Button component that we can use whenever we want a `<button>` element - this is an easy way to ensure that all our buttons have uniform behavior and styling:

```javascript
const Button = (
  { children, ...otherProps } // We use destructing to grab ALL other values from props besides children
) => (
  <button {...otherProps} className="button">
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired
};
```

The 'children' property in props refers to everything in between the opening and closing of this element where it is being rendered. We'll see that in use below:

Now we can easily use this component to make buttons out of HTML elements or even other components!

```javascript
  render() {
    return (
      <main>
        <Button onClick={this.handleButton}>  // onClick will be one of those 'otherProps' we grab above
          <h1>This is going to be a big button!</h1>  
        </Button>
      </main>
    )
  }
```

The h1 is the child of the Button here, so that's what will get rendered where we put `{children}` above.

Here's a utility function that invokes an asynchronous API call, renders a spinner until its resolves, and then renders its children, giving the children whatever payload of data was returned.

```javascript
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
```

Here, we are going to assume the direct child of this component will not be a React component or JSX, but a Javascript function. That's why we are invoking children on the last line of the render and passing in the payload as an argument. If we set up the child function right, this will be an easy way for this child to
receive the day from the higher order component:

```javascript
const HOCDemo = () => (
  <WithLoader asyncCall={fetchJoke}>
    {payload => <h1>{payload.joke}</h1>}
  </WithLoader>
);
```

We made the direct child of WithLoader a function that expected payload, then we could use that to return some JSX to be rendered to the DOM.

Let's take this even further! Here's the old-school way of doing a React form (full code in OldStyleForms.js in this folder).

```javascript
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
```

There's a lot of redundant code here, especially since you repeat a lot of this for every form in your app.

You COULD make a resuable higher order form component that looks like this, applying the HOC ideas we've looked at in the Button and WithLoader examples.

```js
export default class Form extends Component {
  // using transform-class-property babel plugin that comes native with create-react-app
  // this syntax will autmoatically create, essentially, this.state, this.update, and this.value.
  // Because the last two are fat-arrow functions, this means they will
  // naturally keep the context of 'this' inside them, and there's no need to bind in the
  // constructor!
  state = this.props.initialState;
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
        <form onSubmit={this.handleSubmit}>{children(update, value)}</form>
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
```

We could reuse this component easily for different forms:

```js
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

const PostForm = () => (
  <Form handleSubmit={someThunkAction} initialState={{ title: "", body: "" }}>
    {(update, value) => (
      <form onSubmit={handleSubmit(values())}>
        <input type="text" onChange={update("title")} value={value("title")} />
        <textarea onChange={update("body")}>{value("body")}</textarea>
      </form>
    )}
  </Form>
);
```
