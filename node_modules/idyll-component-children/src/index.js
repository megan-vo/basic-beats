
const React = require('react');

const filterChildren = (children, f) => {
  if (children) {
    return React.Children.toArray(children).filter((c) => {
        if (c && c.type.name && c.type.name.toLowerCase() === 'wrapper') {
          return f(c.props.children[0]);
        }
        return f(c);
    });
  }
  return children;
}

const mapChildren = (children, transform) => {
  if (children) {
    return React.Children.map(children, (c, i) => {
        if (c && c.type.name && c.type.name.toLowerCase() === 'wrapper') {
          return React.cloneElement(c, {
            children: mapChildren(c.props.children, transform)
          });
        }
        return transform(c, i);
    });
  }
  return children;
}

module.exports = { filterChildren, mapChildren };


