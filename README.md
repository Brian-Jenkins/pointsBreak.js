# pointsBreak.js

Easy breakpoints in JavaScript for responsive design.

## How to

Include the JS file:
```HTML
<script src="pointsBreak.min.js"></script>
```

### Initialize pointsBreak.js:
```Javascript
pointsBreak.init({
	'W<600': function () {
		console.log('Window is less than 600px');
	},
	'W>599': function () {
		console.log('Window is greater than 599px');
	}
});
```

### Set the debounce delay before initialization (default is 200):
```JavaScript
pointsBreak.setDelay(600).init({
	'W<600': function () {
		console.log('Window is less than 600px');
	},
	'W>599': function () {
		console.log('Window is greater than 600px');
	}
});

// OR use a callback

pointsBreak.setDelay(600, function(pb){
	pb.init({
		'W<600': function () {
			console.log('Window is less than 600px');
		},
		'W>599': function () {
			console.log('Window is greater than 600px');
		}
	});
});
```

### Run a function only when entering a breakpoint:
```Javascript
pointsBreak.init({
	'W<600': function (isEntering) {
		if (isEntering) {
			console.log('This will only run once entering the breakpoint');
		} else {
			console.log('This will run every time EXCEPT when entering the breakpoint');
		}

		console.log('This will run every time no matter what');
	}
});
```
### Get the current width of the window:
```JavaScript
pointsBreak.getWidth();
```

### Get the current height of the window:
```JavaScript
pointsBreak.getHeight();
```

### Test if we are currently in a breakpoint:
```JavaScript
pointsBreak.is('W<600'); // Returns true / false
```

### Get the current breakpoint:
```JavaScript
pointsBreak.currentState.breakpoint // EX: 'W<600'
```
### Complex breakpoints:
```JavaScript
pointsBreak.init({
	'W>300&&W<600': function () {
		console.log('This will run when the window is bigger than 300px and smaller than 600px');
	}
});



