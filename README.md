# babel-plugin-promote-class-properties
> Babel plugin to replace old code taking advantage of ClassProperties feature

# Before

```javascript
class Foo {
  constructor() {
    this.foo = this.foo.bind(this);
    this.bar = this.bar.bind(this);
  }

  foo(arg1, arg2) {
    console.log(arg1, arg2)
  }

  bar(lol) {
    return lol;
  }
}

```

# After

```javascript
class Foo {
  foo = (arg1, arg2) => {
    console.log(arg1, arg2)
  }

  bar = (lol) => {
    return lol;
  }
}

```

# Installation

# Motivation

Declaring event listeners is a common thing to do on the daily bases of every JS developer.
In real life applications we see a lot of this:

```javascript
class App extends React.Component {
  constructor() {
    this.onLoad = this.onLoad.bind(this);

    this.state = {width: 0, height: 0};
  }

  onLoad({target: {height, width}}) {
    this.setState({width, height});
  }

  render() {
    const {width, height} = this.state;

    return (
      <div>
        <div>{width}x{height}</div>
        <img onLoad={this.onLoad} />
      </div>
    );
  }
}
```

We need to do 

```
this.onLoad = this.onLoad.bind(this);
```

Because of the way of **this** context is handled on ```addEventListener```, see [The_value_of_this_within_the_handler](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#The_value_of_this_within_the_handler), from MDN:

> If attaching a handler function to an element using addEventListener(), the value of this inside the handler is a reference to the element. It is the same as the value of the currentTarget property of the event argument that is passed to the handler.

Doing that reassignment, we keep the react component instance as **this** value and we can do operations like ```setState``` while still having access to the DOM element.


# TODO

- Remove empty constructor
- Handle inline cases => ```<img onError={this.onImgError.bind(this) />```
- Handle => ```document.body.addEventListener('scroll', this.onScroll.bind(this));```