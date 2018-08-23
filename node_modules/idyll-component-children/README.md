# idyll-component-children
Utilities for manipulating children components

## Usage

```js
const { filterChildren, mapChildren } = require('idyll-component-children');

filterChildren(children, (c) => {
  // Filter for components named 'mycomponent'
  return c.type.name && c.type.name.toLowerCase() === 'mycomponent';
})


mapChildren(children, (c) => {
  // .. do some modification to the child
  return c;
})

```

