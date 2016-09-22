module.exports = function Bar() {

	var elem = $('<div></div>');
	var count = 0;

	function render() {
		var isPositive = count > 0;
		elem.html(App.templates['bar']({
			progress: Array(Math.abs(count)),
			isPositive: isPositive
		}));
		return this;
	}

	return {
		render: render,
		getCount: function() {
			return count;
		},
		setCount: function(c) {
			count = c;
			render();
		},
		inc: function() {
			count++;
			render();
		},
		dec: function() {
			count--;
			render();
		},
		elem: elem
	};

};
