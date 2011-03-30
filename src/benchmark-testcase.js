
(function() {
  if (typeof require !== 'undefined') {
    Benchmark = require('benchmark');
  }

  function TestCase(suites) {
    this.suites = suites || [];
    this.current_suite = null;
    this.total_suites = this.suites.length || 0;
  }
  Benchmark.TestCase = TestCase;

  Benchmark.extend(Benchmark.TestCase.prototype, {

    dequeue: function() {
      if (this.suites.length > 0)
        return this.suites.shift();
      return null;
    },

    addSuite: function(suite) {
      this.suites.push(suite);
      this.total_suites += 1;
    },

    addSuites: function(suites) {
      for (var i = 0, len = suites.length; i < len; i += 1) {
        this.addSuite(suites[i]);
      }
    },

    start: function() {
      var me = this;
      this.current_suite.on('complete', function(bench) {
        me.run(true);
      });
      this.current_suite.run();
    },

    complete: function() {
      if (console)
        console.log('\nTotal Suites Run: ' + this.total_suites);
    },

    run: function() {
      this.current_suite = this.dequeue();
      if (this.current_suite) {
        this.start();
      } else {
        this.complete();
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
