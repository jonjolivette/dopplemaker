function collapse(o, dir) {
  if (o instanceof Selection) {
    var r = o.getRangeAt(0);
    r.collapse(dir);
    o.removeAllRanges();
    o.addRange(r);
  } else if (o instanceof Range) {
    o.collapse(dir);
  } else {
    throw new Error('Unsupported argument type.');
  }
}

collapse.toEnd = function(o) {
  collapse(o, false);
}

collapse.toStart = function(o) {
  collapse(o, true);
}

module.exports = collapse;
