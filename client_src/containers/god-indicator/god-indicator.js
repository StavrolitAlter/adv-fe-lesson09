var Bar = require('components/bar/bar.js');

module.exports = function GodIndicator(options) {

	var elem = $('<div></div>');
	var bar = new Bar();
	
	bar.setCount(options.initialGodAttitude);

	function render() {
		elem.html(App.templates['god-indicator']({
			indicatorName: options.name
		}));

		elem.find('.god-indicator__bar').html(bar.render().elem);
		return this;
	}

	return {
		render: render,
		setCount: function(c) {
			bar.setCount(c);
		},
		elem: elem
	}
};
