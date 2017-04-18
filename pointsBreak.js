pointsBreak = (function (window, document, undefined) {
	var win = window,
		doc = document,
		time = 200,
		W = win.innerWidth || doc.documentElement.clientWidth,
		H = win.innerHeight || doc.documentElement.clientHeight,
		breakpointConfig = {};

	function breakPointTest(bpTest) {
		var type = bpTest.charAt(0) === 'W' ? W : H,
			test = bpTest[1],
			dims = bpTest.split(bpTest.charAt(1))[1];

		return test === '>' && type > dims || test === '<' && type < dims ? true : false;
	}

	function parseBreakpoint () {
		var andReg = /&&+/g;

		W = win.innerWidth || doc.documentElement.clientWidth;
		H = win.innerHeight || doc.documentElement.clientHeight;

		for (var item in breakpointConfig) {
			var testType = item.charAt(0);

			if (breakpointConfig.hasOwnProperty(item) && (testType === 'W' || testType === 'H' || testType === '*')) {
				var myFunc = breakpointConfig[item];

				if (testType === '*' && typeof myFunc === 'function') {
					myFunc(W, H);
				}

				if (item.match(andReg) !== null) {
					var testFailed = false,
						tests = item.split(/&&/),
						testCount = tests.length;

					while (testCount-- && !testFailed) {
						if (!breakPointTest(tests[testCount])) {
							testFailed = true;
						}
					}

					if (!testFailed && typeof myFunc === 'function') {
						myFunc(pointsBreak.currentState.breakpoint === undefined || pointsBreak.currentState.breakpoint !== item ? true : false);
						pointsBreak.currentState.breakpoint = item;
					}

				} else {
					if (breakPointTest(item) && typeof myFunc === 'function') {
						myFunc(pointsBreak.currentState.breakpoint === undefined || pointsBreak.currentState.breakpoint !== item ? true : false);
						pointsBreak.currentState.breakpoint = item;
					}
				}
			}
		}
	}

	return {
		init: function (config, callback) {
			var debounce;

			for (var item in config) {
				if (config.hasOwnProperty(item)) {
					var itemFunc = config[item],
						cleanedItem = item.replace(/\s+/g, '').toUpperCase();

					breakpointConfig[cleanedItem] = itemFunc;
				}
			}

			function handleResize () {
				clearTimeout(debounce);
				debounce = setTimeout(parseBreakpoint, time);
			};

			if (window.addEventListener) {
				window.addEventListener('resize', handleResize, false);
			} else if (window.attachEvent) {
				window.attachEvent('onresize', handleResize);
			}

			parseBreakpoint();

			return typeof callback === 'function' ? callback() : this;

		},

		setDelay: function (delay, callback) {
			time = delay;
			return typeof callback === 'function' ? callback(this) : this;
		},

		getWidth: function () {
			return W;
		},

		getHeight: function () {
			return H;
		},

		is: function (test) {
			return breakPointTest(test);
		},

		currentState: {}
	};
})(window, window.document);
