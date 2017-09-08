class Foo {
  constructor() {
    this.bar = this.bar.bind(this);
  }

  bar() {
    const miau = 1;
  }
}