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
        const body = path.get("body");
        path.replaceWith(
          t.classProperty(t.identifier(methodName), t.arrowFunctionExpression([], body.node))
        );
      }
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
          classPropertiesToReplace.push({
            parent: parent.parent,
            name: leftPropName
          });
          path.remove();
        }
      }
    }
  }
});