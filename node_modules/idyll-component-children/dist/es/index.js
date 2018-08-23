
var React = require('react');

var filterChildren = function filterChildren(children, f) {
  if (children) {
    return React.Children.toArray(children).filter(function (c) {
      if (c && c.type.name && c.type.name.toLowerCase() === 'wrapper') {
        return f(c.props.children[0]);
      }
      return f(c);
    });
  }
  return children;
};

var mapChildren = function mapChildren(children, transform) {
  if (children) {
    return React.Children.map(children, function (c, i) {
      if (c && c.type.name && c.type.name.toLowerCase() === 'wrapper') {
        return React.cloneElement(c, {
          children: mapChildren(c.props.children, transform)
        });
      }
      return transform(c, i);
    });
  }
  return children;
};

module.exports = { filterChildren: filterChildren, mapChildren: mapChildren };