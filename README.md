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