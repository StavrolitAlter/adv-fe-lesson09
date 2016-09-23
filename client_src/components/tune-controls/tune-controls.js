module.exports = function TuneControls() {

	var elem = $('<div></div>');

	var onIncCallbacks = [];
	var onDecCallbacks = [];

	function render() {
		elem.html(App.templates['tune-controls']({}));
		subscribeHandlers();

		return this;
	}

	function subscribeHandlers() {
		elem.find('.tune-controls__inc').click(function() {
			onIncCallbacks.forEach(function(onIncCallback) {
				onIncCallback();
			});
		});
		elem.find('.tune-controls__dec').click(function() {
			onDecCallbacks.forEach(function(onDecCallback) {
				onDecCallback();
			});
		});
	}

	return {
		render: render,
		onInc: function(cb) {
			onIncCallbacks.push(cb);
		},
		onDec: function(cb) {
			onDecCallbacks.push(cb);
		},
		elem: elem
	};

};
