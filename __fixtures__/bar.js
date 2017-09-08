class Bar {
  constructor() {
    this.methodWithArgs = this.methodWithArgs.bind(this);
  }

  methodWithArgs(arg1, arg2) {
    console.log(arg1, arg2)
  }
}