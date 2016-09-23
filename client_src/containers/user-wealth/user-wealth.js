module.exports = function GiftTunner(options) {

	var elem = $('<div class="wealth-status"></div>');
	var resourceIndicatorsArray = options.resourceIndicatorsArray;

	function render() {

		elem.html(App.templates['user-wealth']({}));

		resourceIndicatorsArray.forEach(function(resourceIndicator) {
			elem.find('.wealth-status__indicators').append(
				resourceIndicator.render().elem
			);
		});

		return this;
	}

	return {
		render: render,
		elem: elem
	};
};