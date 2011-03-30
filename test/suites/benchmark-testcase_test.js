
(function() {
  if (typeof require !== 'undefined') {
    require.paths.push('./tools');
    require.paths.push('./src');
    Benchmark = require('benchmark');
    require('benchmark-testcase');
  }

  describe('Benchmark Test Case', function() {
    beforeEach(function() {
      Benchmark.prototype.MAX_TIME_ELAPSED = 0;
    });

    describe('object instantiation', function() {
      it('should have a test case initialized', function() {
        expect(Benchmark.TestCase).toBeDefined();
      });

      it('should default to an empty array when instantiated without suites', function() {
        var cases = new Benchmark.TestCase();
        expect(cases.suites.length).toEqual(0);
      });

      it('should default to an array of suites', function() {
        var suite1 = new Benchmark.Suite('Suite1');
        var suite2 = new Benchmark.Suite('Suite2');
        var cases = new Benchmark.TestCase([suite1, suite2]);
        expect(cases.suites.length).toEqual(2);
      });
    });

    describe('#addSuite', function() {
      it('should add a single suite to the test case', function() {
        var suite1 = new Benchmark.Suite('Suite1');
        var suite2 = new Benchmark.Suite('Suite2');
        var cases = new Benchmark.TestCase();
        cases.addSuite(suite1);
        expect(cases.suites.length).toEqual(1);
        cases.addSuite(suite2);
        expect(cases.suites.length).toEqual(2);
      });
    });

    describe('#addSuites', function() {
      it('should add multiple suites to the test case', function() {
        var suite1 = new Benchmark.Suite('Suite1');
        var suite2 = new Benchmark.Suite('Suite2');
        var suite3 = new Benchmark.Suite('Suite3');
        var cases = new Benchmark.TestCase([suite3]);
        cases.addSuites([suite1, suite2]);
        expect(cases.suites.length).toEqual(3);
      });
    });

    describe('#removeSuite', function() {
      it('should remove a suite by name', function() {
        var suite1 = new Benchmark.Suite('Suite1');
        var suite2 = new Benchmark.Suite('Suite2');
        var cases = new Benchmark.TestCase([suite1, suite2]);
        expect(cases.suites.length).toEqual(2);
        cases.removeSuite('Suite1');
        expect(cases.suites.length).toEqual(1);
        expect(cases.suites).not.toContain(suite1);
      });
    });

    describe('#removeSuites', function() {
      it('should remove a list of suites by name', function() {
        var suite1 = new Benchmark.Suite('Suite1');
        var suite2 = new Benchmark.Suite('Suite2');
        var suite3 = new Benchmark.Suite('Suite3');
        var suite4 = new Benchmark.Suite('Suite4');
        var cases = new Benchmark.TestCase([suite1, suite2, suite3, suite4]);
        expect(cases.suites.length).toEqual(4);
        cases.removeSuites(['Suite2', 'Suite4']);
        expect(cases.suites.length).toEqual(2);
        expect(cases.suites).not.toContain(suite2);
        expect(cases.suites).not.toContain(suite4);
      });
    });

    describe('#removeAllSuites', function() {
      it('should remove all suites', function() {
        var suite1 = new Benchmark.Suite('Suite1');
        var suite2 = new Benchmark.Suite('Suite2');
        var cases = new Benchmark.TestCase([suite1, suite2]);
        expect(cases.suites.length).toEqual(2);
        cases.removeAllSuites();
        expect(cases.suites.length).toEqual(0);
        expect(cases.suites).not.toContain(suite1);
        expect(cases.suites).not.toContain(suite2);
      });
    });

    describe('#run, #dequeue, #complete', function() {
      it('should run a test case of suites and dequeue all', function() {
        var suite1 = new Benchmark.Suite('Suite1');
        var suite2 = new Benchmark.Suite('Suite2');

        suite1.add('Empty function', function() {});
        suite1.add('Property declaration', function() {
          var a;
        });
        suite2.add('Empty function 2', function() {});
        suite2.add('Property declaration 2', function() {
          var a;
        });

        var cases = new Benchmark.TestCase([suite1, suite2]);
        spyOn(cases, 'complete');
        expect(cases.suites.length).toEqual(2);
        cases.run();
        expect(cases.suites.length).toEqual(0);
        expect(cases.complete).toHaveBeenCalled();
      });

    });

  });
}());

