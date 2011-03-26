
// Benchmark.Reporter;
(function() {
  var suite;
  var reporter;
  if (typeof require !== 'undefined') {
    require.paths.push('./tools');
    require.paths.push('./src');
    Benchmark = require('benchmark');
    Reporter = require('benchmark-reporter');
  }

  describe('Benchmark Reporter', function() {

    beforeEach(function() {
      Benchmark.prototype.MAX_TIME_ELAPSED = 0;
      suite = new Benchmark.Suite('Reporter');
      reporter = new Benchmark.Reporter(suite);
      suite.add('Empty function', function() {
      });
      suite.add('Property declaration', function() {
        var a;
      });
    });

    describe('object instantiation', function() {
      it('should have a reporter initialized', function() {
        expect(Benchmark.Reporter).toBeDefined();
      });

      it('should have a suite defined', function() {
        expect(reporter.suite).toEqual(suite);
      });

    });

    describe('#log', function() {
      it('should log a message', function() {
        reporter.log('test_message', true);
        expect(reporter.history).toContain('test_message');
      });
    });

    describe('spy on event handlers from a #suite.run', function() {
      it('handles event calls', function() {
        spyOn(reporter, 'handleStart');
        spyOn(reporter, 'handleCycle');
        spyOn(reporter, 'handleComplete');
        spyOn(reporter, 'handleError');
        suite.run();
        expect(reporter.handleStart).toHaveBeenCalled();
        expect(reporter.handleCycle).toHaveBeenCalled();
        expect(reporter.handleComplete).toHaveBeenCalled();
        expect(reporter.handleError).not.toHaveBeenCalled();
      });
    });

    describe('Report methods can be overriden', function() {
      it('should override the #log method', function() {
        var TMP = Benchmark.extend(Benchmark.Reporter);
        Benchmark.TMP = TMP;
        Benchmark.extend(Benchmark.TMP.prototype, {
          log: function(msg, silent) {
            if (console && !silent)
              console.log('hi ' + msg);
            this.history.push(msg);
          }
        });
        var tmpreporter = new Benchmark.TMP(suite);
        tmpreporter.log('hi test_message', true);
        expect(tmpreporter.history).toContain('hi test_message');
        expect(tmpreporter.listen).toBeDefined();
      });
    });

  });
}());

