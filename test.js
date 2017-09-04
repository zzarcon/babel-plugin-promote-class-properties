const pluginTester = require('babel-plugin-tester');
const promoteClassProperties = require('.');

const tests = [{
  snapshot: true,
  skip: true,
  title: 'basic',
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
  title: 'method with args',
  code: `
    class Foo {
      constructor() {
        this.methodWithArgs = this.methodWithArgs.bind(this);
      }

      methodWithArgs(arg1, arg2) {
        console.log(arg1, arg2)
      }
    }
  `
}, {
  snapshot: true,
  title: 'not binded',
  only: true,
  code: `
    class Foo {
      constructor() {
        this.notBinded = this.notBinded();
      }

      notBinded() {
        return 1;
      }
    }
  `
}];

pluginTester({
  plugin: promoteClassProperties,
  tests
});
