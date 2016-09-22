var Bar = require('components/bar/bar.js');
var TuneControls = require('components/tune-controls/tune-controls.js');

module.exports = function GiftTunnerBlock(options) {

	var elem = $('<div class="gift-tunner"></div>');
	var tunnerName = options.name;

	var bar = new Bar();
	var tunner = new TuneControls();

	tunner.onInc(function() {
		bar.inc();
	});
	tunner.onDec(function() {
		bar.dec();
	});

	function render() {
		elem.html(App.templates['gift-tunner']({
			name: tunnerName
		}));

		elem.find('.gift-tunner__bar').html(bar.render().elem);
		elem.find('.gift-tunner__controls').html(tunner.render().elem);

		return this;
	}

	return {
		render: render,
		elem: elem,
		name: tunnerName,
		tunner: tunner,
		getCount: function() {
			return bar.getCount();
		}
	};
};