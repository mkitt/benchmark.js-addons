
(function() {
  require.paths.push('./tools');
  require.paths.push('./src');
  var Benchmark = require('benchmark');
  var Reporter = require('benchmark-reporter');
  var TestCase = require('benchmark-testcase');

  var array_suite = new Benchmark.Suite('Array');
  var array_reporter = new Benchmark.Reporter(array_suite);
  var cond_suite = new Benchmark.Suite('Conditionals');
  var cond_reporter = new Benchmark.Reporter(cond_suite);
  var cases = new Benchmark.TestCase([array_suite, cond_suite]);


  array_suite.add('Array with brackets', function() {
    var a = [];
  });

  array_suite.add('Array with new', function() {
    var a = new Array();
  });

  cond_suite.add('if/elseif/else', function() {
    var condition = 'end';
    if (condition === 'start')
      condition = 'start';
    else if (condition === 'middle')
      condition = 'middle';
    else
      condition = 'end';
  });

  cond_suite.add('switch', function() {
    var condition = 'end';
    switch (condition) {
      case 'start':
        condition = 'start';
      break;
      case 'middle':
        condition = 'middle';
      break;
      default:
        condition = 'end';
      break;
    }
  });
  cases.run();
}());

