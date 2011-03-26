
(function() {
  var array_suite = new Benchmark.Suite('Array');
  var array_reporter = new Benchmark.Reporter(array_suite);

  array_suite.add('Array with brackets', function() {
    var a = [];
  });

  array_suite.add('Array with new', function() {
    var a = new Array();
  });

  array_suite.run(true);
}());

