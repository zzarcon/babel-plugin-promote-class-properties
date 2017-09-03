const pluginTester = require('babel-plugin-tester');
const promoteClassProperties = require('.');

const tests = [{
  snapshot: true,
  code: `
    class Foo {
      constructor() {
        this.bar = this.bar.bind(this);
      }

      bar() {
        const miau = 1;
      }
    }
  `
}, {
  snapshot: true,
  code: `
    class Foo {
      constructor() {
        this.bar = this.bar.bind(this);
      }

      bar(arg1) {
        const miau = 1;
      }
    }
  `
}];

pluginTester({
  plugin: promoteClassProperties,
  tests
});
