'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars
 * @package MSc Computer Science - Project
 */

'use strict';
var requirejs = require('requirejs');
var assert = require("assert");

requirejs.config({
    baseUrl: '',
    nodeRequire: require
});

// Begin tests

var Utils = requirejs('utils.js');
describe('Util', function() {

	describe('#cleanString()', function () {
		it('Should convert html characters to safe ones', function() {
			var testString = '<b>test     ';
			assert.equal('&lt;b&gt;test', Utils.cleanString(testString));
		});
	});

	describe('#normalizeCoordinate()', function() {
		it('Should convert positive coordinate to half', function() {
			var coord = 10000;
			assert.equal(20000, Utils.normalizeCoordinate(coord));
		});

		it('Should convert negative coordinate to positive', function() {
			var coord = -1;
			assert.equal(Utils.normalizeCoordinate(coord), 1);
		});

		it('Should convert 0 coordinate to half world size', function() {
			var coord = 0;
			assert.equal(Utils.normalizeCoordinate(coord), 75000);
		});
	});

	describe('#getRandom()', function() {
		it('Should return random whole number between range', function() {
			var num = Utils.getRandom(1, 5);
			assert.equal(true, (num >= 1 && num <= 5));
		});
	});
});