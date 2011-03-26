
(function() {
  if (typeof require !== 'undefined') {
    Benchmark = require('benchmark');
  }

  function Reporter(suite) {
    this.history = [];
    this.suite = suite;
    this.listen();
  }
  Benchmark.Reporter = Reporter;

  Benchmark.extend(Benchmark.Reporter.prototype, {

    log: function(msg, silent) {
      if (console && !silent)
        console.log(msg);
      this.history.push(msg);
    },

    listen: function() {
      var me = this;

      this.suite.on('start', function(bench) {
        me.handleStart(bench);
      });

      this.suite.on('cycle', function(bench) {
        me.handleCycle(bench);
      });

      this.suite.on('complete', function(bench) {
        me.handleComplete(bench);
      });

      this.suite.on('error', function(e) {
        me.handleError(e);
      });
    },

    handleStart: function(bench) {
      var env = Benchmark.platform.description;
      this.log(env + '\nRunning ' + this.suite.name + ' Benchmarks');
    },

    handleCycle: function(bench) {
      var fnum = Benchmark.formatNumber,
          hz = bench.hz,
          size = bench.stats.size,
          cycles = fnum(bench.cycles),
          elapsed = bench.times.elapsed,
          str = '';
      str += bench.name + ' ';
      str += '(' + size + ' run' + (size === 1 ? '' : 's') + ' sampled)\n';
      str += fnum(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec | ';
      str += '\xb1' + bench.stats.RME.toFixed(2) + '% RME | ';
      str += cycles + ' cycles in ' + elapsed + ' secs';
      this.log(str);
    },

    handleComplete: function(bench) {
      var fast = this.suite.filter('fastest').pluck('name'),
          slow = this.suite.filter('slowest').pluck('name');
      this.log('Fastest: "' + fast + '"\nSlowest: "' + slow + '"');
    },

    handleError: function(e) {
      this.log(this.suite.name + ' Error\n' + e);
      this.dispose();
    }
  });

}());

