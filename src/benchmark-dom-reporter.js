
(function() {

  // TODO: This might make sense to abstract into console and dom reporters
  function Reporter(suite, id, use_console) {
    this.suite = suite;
    this.dom_id = document.getElementById(id) || null;
    this.use_console = use_console;
    this.log(Benchmark.platform.description);
    this.listen();
  }
  Benchmark.Reporter = Reporter;

  Benchmark.extend(Benchmark.Reporter.prototype, {

    log: function(msg) {
      if (console && this.use_console)
        console.log(msg);

      if (this.dom_id !== null)
        this.dom_id.innerHTML += msg + '\n';
    },

    listen: function() {
      var me = this;

      this.suite.on('start', function(bench) {
        me.log('Running ' + this.name + ' Benchmarks' + '\n');
      });

      this.suite.on('cycle', function(bench) {
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
        str += cycles + ' cycles in ' + elapsed + ' secs\n';
        me.log(str);
      });

      this.suite.on('complete', function(bench) {
        var fast = this.filter('fastest').pluck('name'),
            slow = this.filter('slowest').pluck('name');
        me.log('Fastest: "' + fast + '"\nSlowest: "' + slow + '"');
      });

      this.suite.on('error', function(e) {
        me.log(this.name + ' Error\n' + e);
      });
    }
  });

}());

/*
  TODO
  Auto insert nodes into the dom so it doesn't need to be managed from the HTML file
  Easily embedable into an existing HTML page as well as being unobtrusive
  Default the arguments list so it falls back correctly
  Write tests wrapped around the listen method events
*/

