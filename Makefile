
BENCH_URL = https://github.com/mathiasbynens/Benchmark.js/raw/master/benchmark.js
BENCH_LICENSE_URL = https://github.com/mathiasbynens/Benchmark.js/raw/master/LICENSE.txt

all: tools/benchmark.js

tools/benchmark.js: tools/benchmark.tmp.js tools/license.tmp.js
	@rm $@
	@echo '/*' > $@
	@cat tools/license.tmp.js >> $@
	@echo '*/' >> $@
	@cat tools/benchmark.tmp.js >> $@
	@rm tools/license.tmp.js
	@rm tools/benchmark.tmp.js
	@echo $@ built

tools/benchmark.tmp.js:
	@curl -o $@ ${BENCH_URL}

tools/license.tmp.js:
	@curl -o $@ ${BENCH_LICENSE_URL}

.PHONY: all

