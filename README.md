# Benchmark.js Addons

A few helper files to streamline writing [benchmark.js][benchmark.js] tests.

## Usage

Running tests, demos, builds, etc. is mainly available from the Makefile. Should be fairly self explanatory.


### Reporters

`./src/benchmark-reporter.js`

A very simple reporter that logs information to a `history` object and prints information out to a `console`. This works in both the browser and the cli with [node.js][node.js]. This basic reporter captures the events emitted from the `Benchmark.Suite` and sends them to handler objects which generally passes them to a `log` method. Basically this means you don't need to add listeners to all of your tests, just go ahead and let the `Reporter` do the work for you. This object is also meant to be used as an abstract base where the methods can be easily overridden by another `Reporter` that extends it. [Check the tests](https://github.com/mkitt/benchmark.js-addons/blob/master/test/suites/benchmark-reporter_test.js#L57) for a more thorough explanation.

Example usage:


    (function() {
      var suite = new Benchmark.Suite('Array'),
          reporter = new Benchmark.Reporter(suite);

      suite.add('Array with brackets', function() {
        var a = [];
      });

      suite.add('Array with new', function() {
        var a = new Array();
      });
      suite.run(true);
    }());


### Test Cases

`./src/benchmark-testcase.js`

Test Cases are nothing more than a simple wrapper around running multiple `suites`. This allows the ability to write out various `suites` with specific tests, wrap them in a Test Case and then run that Test Case. The Test Case will run asynchronously threw each of the `suites`. Test Cases are supported both in the browser and the cli with [node.js][node.js].

Example usage:


    (function() {
      var array_suite = new Benchmark.Suite('Array'),
          prop_suite = new Benchmark.Suite('Properties'),
          cases = new Benchmark.TestCase([array_suite, prop_suite]);

      array_suite.add('Array with brackets', function() {
        var a = [];
      });

      array_suite.add('Array with new', function() {
        var a = new Array();
      });

      prop_suite.add('empty property', function() {
        var p;
      });

      prop_suite.add('property with initialization', function() {
        var p = 'mansfield';
      });

      cases.run();
    }());

Suites within Test Cases can also be combined with Reporters. Check the [tests](https://github.com/mkitt/benchmark.js-addons/blob/master/test/suites/benchmark-testcase_test.js) for a more thorough explanation.


### DOM Insertion

This doesn't exist yet, but the thought is allowing the ability to inject a benchmark test to an existing html page without mocking out the entire page in a separate file. Not totally sure yet on the approach but it should be unobtrusive, and easily injectable. Should it allow existing JavaScript to execute? Big todo.


## What's Here?

1. `examples`: demos for both the DOM and [node.js][node.js] for benchmarks 
- `src`: the source files you'll want to include either in your HTML page or `require` from [node.js][node.js] (npm packaging coming soon)
- `test`: the [jasmine][jasmine] tests, see this in lieu of documentation for the moment
- `tools`: a customized version of [jasmine][jasmine] with [jasmine-dom][jasmine-dom] and of course [benchmark.js][benchmark.js]

Note: to run the tests with [node.js][node.js] you'll need [jasmine-node][jasmine-node] installed

    npm install jasmine-node


## TODO

1. Add a distribution script for a one shot deal for all add-ons
- Documentation would be cool
- Work through the DOM Insertion


[benchmark.js]: http://benchmarkjs.com/
[node.js]: http://nodejs.org/
[jasmine]: http://pivotal.github.com/jasmine/
[jasmine-dom]: https://github.com/jeffwatkins/jasmine-dom
[jasmine-node]: https://github.com/mhevery/jasmine-node


<!--
Build:
- License info for jasmine (put this in the tools project)
 -->

