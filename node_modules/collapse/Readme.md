# collapse

Collapse Selection and Range objects in a cross-browser way.

## Usage

```javascript
var collapse = require('collapse');

// ...

// second parameter is optional. true = toStart, false = toEnd, defaults to end
collapse(s, true);

// more readable forms
collapse.toEnd(s);
collapse.toStart(s);
```