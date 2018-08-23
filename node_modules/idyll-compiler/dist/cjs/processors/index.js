"use strict";

module.exports = function (input, options) {
  var processor = {
    pipe: function pipe(func) {
      input = func(input, options);
      return processor;
    },
    end: function end() {
      return input;
    }
  };

  return processor;
};