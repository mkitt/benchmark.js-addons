
var jasmine = require('jasmine-node'),
    verbose = false,
    colored = true;

for (var key in jasmine) {
  if (jasmine.hasOwnProperty(key))
    global[key] = jasmine[key];
}

process.argv.forEach(function(arg) {
  if (arg === '--no-color') {
    colored = false;
  }
  if (arg === '--silent') {
    verbose = false;
  }
});

jasmine.executeSpecsInFolder(__dirname + '/suites/', function(runner, log) {
  if (runner.results().failedCount === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}, verbose, colored);
