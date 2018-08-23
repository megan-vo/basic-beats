var grammar = require('./grammar');
var nearley = require('nearley');

module.exports = function (input, tokens, positions, options) {
  options = options || {};

  var p = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
  try {
    p.feed(tokens);
  } catch (err) {
    var cleaned = tokens.substring(0, err.offset).replace(/"[^"]*"/g, 'x');
    var index = cleaned.match(/ /g).length;
    var position = positions[index];
    var message = 'Error parsing input at line ' + position[0] + ', column ' + position[1] + '\n\n' + input.split('\n')[position[0] - 1] + '\n' + Array(Math.max(0, position[1] - 2)).join(' ') + '^^^';

    var e = new Error(message);
    e.row = position[0];
    e.column = position[1];
    throw e;
  }
  var results = p.results;

  if (results.length) {
    // console.log('Results length: ' + results.length);
    if (results.length > 1) {}
    // console.log(JSON.stringify(results, null, 2));
    // console.log(str);

    // console.log(JSON.stringify(results[0]));


    return results[0];
  }

  throw new Error('No parse results');
};