
(function() {
  if (typeof require !== 'undefined') {
    Benchmark = require('benchmark');
  }

  function TestCase(suites) {
    this.suites = suites || [];
  }
  Benchmark.TestCase = TestCase;

  Benchmark.extend(Benchmark.TestCase.prototype, {
    addSuite: function(suite) {
      this.suites.push(suite);
    },

    addSuites: function(suites) {
      for (var i = 0, len = suites.length; i < len; i += 1) {
        this.suites.push(suites[i]);
      }
    },

    removeSuite: function(suite_name) {
      var num;
      for (var i = 0, len = this.suites.length; i < len; i += 1) {
        if (this.suites[i].name === suite_name) {
          num = i;
        }
      }
      this.suites.splice(num, 1);
    },

    removeSuites: function(suite_names) {
      for (var i = 0, len = suite_names.length; i < len; i += 1) {
        this.removeSuite(suite_names[i]);
      }
    },

    removeAllSuites: function() {
      this.suites.length = 0;
    }
  });

}());


/*
  Run
  Dequeue
  Event forwarding
  Custom TestCase Events (start, complete, error)
*/
