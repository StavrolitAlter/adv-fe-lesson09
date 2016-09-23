var ResourceIndicator = require('components/resource-indicator/resource-indicator.js');
var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealthBlock = require('containers/user-wealth/user-wealth.js');
var GiftTunnerBlock = require('containers/gift-tunner/gift-tunner.js');
var GodIndicator = require('containers/god-indicator/god-indicator.js');
var ResourceModel = require('models/resource.js');
var IndicatorModel = require('models/indicator.js');

module.exports = function Game() {

	var elem = $('<div></div>');

	// Main game setup
	var initialGodAttitude = 50;
	var initialResourcesDataArray = [
		{
			name: 'Copper',
			attitudeEffect: 1,
			stashCount: 70
		}, {
			name: 'Gold',
			attitudeEffect: 4,
			stashCount: 30
		}, {
			name: 'Diamond',
			attitudeEffect: 10,
			stashCount: 10
		}
	];

	// Initialization of components
	var tunnersArray = [];
	var resourcesModelsArray = [];
	var resourceIndicatorsArray = [];

	initialResourcesDataArray.forEach(function(resourceDataObj) {

		var resourceModel = new ResourceModel(resourceDataObj);
		var resourceIndicator = new ResourceIndicator(resourceDataObj);
		var giftTunnerBlock = new GiftTunnerBlock(resourceDataObj);

		giftTunnerBlock.tunner.onInc(function() {
			resourceModel.inc();
			resourceIndicator.dec();
		});
		giftTunnerBlock.tunner.onDec(function() {
			resourceModel.dec();
			resourceIndicator.dec();
		});

		resourcesModelsArray.push(resourceModel);
		resourceIndicatorsArray.push(resourceIndicator);
		tunnersArray.push(giftTunnerBlock);

	});

	var indicatorModel = new IndicatorModel(initialGodAttitude);
	var godIndicator = new GodIndicator({
		name: 'Attitude',
		initialGodAttitude: initialGodAttitude
	});
	indicatorModel.subscribe(function() {
		godIndicator.setCount(this.get('count'));
	});

	var godGiftForm = new GodGiftForm({
		tunnersArray: tunnersArray,
		godIndicator: godIndicator
	});
	var userWealthBlock = new UserWealthBlock({
		resourceIndicatorsArray: resourceIndicatorsArray
	});

	// Models change observing
	Model.subscribeAll(resourcesModelsArray, function() {
		var commonAttitudeEffect = 0;
		resourcesModelsArray.forEach(function(resourcesModel) {
			commonAttitudeEffect +=
				resourcesModel.get('giftCount') * resourcesModel.get('attitudeEffect');
		});
		indicatorModel.setCount(
			initialGodAttitude - commonAttitudeEffect
		);
	});

	function render() {
		userWealthBlock.render();
		godGiftForm.render();

		return this;
	}
	
	elem.append(userWealthBlock.elem);
	elem.append(godGiftForm.elem);

	return {
		render: render,
		elem: elem
	};
};
