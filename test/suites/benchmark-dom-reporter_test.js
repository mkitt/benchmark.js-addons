
(function() {
  var suite;
  var reporter;
  var div;
  var fixture_html = 'fixtures/dom-reporter_fixture.html';

  describe('Benchmark Reporter', function() {

    beforeEach(function() {
      loadFixtures(fixture_html);
      div = document.getElementById('logger');
      suite = new Benchmark.Suite('Test');
      reporter = new Benchmark.Reporter(suite, 'logger', true);
      suite.add('Test', function() {
        var a = [];
      });
    });

    describe('object instantiation', function() {
      it('should have a reporter initialized', function() {
        expect(Benchmark.Reporter).toBeDefined();
      });

      it('should have a suite defined', function() {
        expect(reporter.suite).toEqual(suite);
      });

      it('should set and get an id from the dom', function() {
        expect(reporter.dom_id).toEqual(div);
      });

      it('should have use_console initialized against an argument', function() {
        expect(reporter.use_console).toEqual(true);
      });
    });

    describe('#log', function() {
      it('should log a message', function() {
        reporter.log('test_message');
        expect(div.innerHTML).toContain('test_message');
      });
    });

    xdescribe('#listen', function() {
      it('should log a message on start', function() {
        expect(div.innerHTML).toContain('Running');
      });
    });

  });
}());

