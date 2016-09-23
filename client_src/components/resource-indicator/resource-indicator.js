module.exports = function ResourceIndicator(options) {

	var elem = $('<li></li>');
	var count = options.stashCount;
	var name = options.name;

	function render() {
		elem.html(
			name + ': ' + count
		);
		return this;
	}

	return {
		render: render,
		inc: function() {
			count++;
			render();
		},
		dec: function() {
			count--;
			render();
		},
		elem: elem
	}
};
