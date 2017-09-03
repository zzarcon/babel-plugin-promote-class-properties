const {getIdentifierKind} = require('babel-identifiers');
const classPropertiesToReplace = [];

module.exports = ({ types: t }) => ({
  name: 'promote-class-properties',
  visitor: {
    ClassMethod(path) {
      const methodName = path.node.key.name;
      const parent = path.parent;
      const bindedProp = classPropertiesToReplace.find(prop => 
        prop.name === methodName && prop.parent === parent
      );

      if (bindedProp) {
        t
        // debugger
        // path.replaceWith(
        //   t.classProperty(methodName)
        // );
        // t.classProperty(methodName)
        console.log(t.classProperty('a', 1))
        debugger
        // path.replaceWith(t.classMethod('method', t.identifier('bar'), [], path.node.body));
        // path.replaceWith(t.expressionStatement(t.stringLiteral('before')));
        path.replaceWith(t.classProperty(t.identifier('bar'), t.stringLiteral('before')))
        // path.replaceWithSourceString(`a = () => 1`);
        // path.insertBefore();
      }
      // if (path.node.kind === 'constructor') {
        // console.log('constructor')
      // }
    },
    Identifier(path) {
      // console.log(t)
      // console.log('identifier')
      // idPath.node.name = idPath.node.name.split('').reverse().join('')
    },
    AssignmentExpression(path) {
      const left = path.node.left;
      const right = path.node.right;
      const isLeftThisExp = t.isThisExpression(left.object);
      const isRightCallExp = t.isCallExpression(right);

      if (isLeftThisExp && isRightCallExp) {
        const isRightThisExp = t.isThisExpression(right.callee.object.object);
        const isBindCall = right.callee.property.name === 'bind';
        const classProp = right.callee.object.property
        const leftPropName = left.property.name;
        const rightPropName = classProp.name;
        const parent = path.getFunctionParent();
        const isInsideConstructor = path.getFunctionParent().node.kind === 'constructor';

        if (isRightThisExp && isBindCall && isInsideConstructor && leftPropName === rightPropName) {
          getIdentifierKind
          console.log('replace');
          t
          debugger
          classPropertiesToReplace.push({
            parent: parent.parent,
            name: leftPropName
          });
          path.remove();
        }
      }
      // console.log(path.node)
      // console.log(path.getFunctionParent())
      // console.log('AssignmentExpression', path.parent.parent.type)
      // console.log()
    }
  }
});