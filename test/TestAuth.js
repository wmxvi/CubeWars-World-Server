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

var Auth = requirejs('auth.js');
describe('Auth', function() {

	describe('#process()', function () {
		it('Should refuse our request because it doesnt match core ip', function() {
			var testData = {
				address: {
					address: '127.0.0.11'
				},
				headers: {
					cookie: 'CubeWars=ThisIsATest'
				}
			};
			var callback = function(res, allow) {
				assert.equal(false, allow);
			};
			Auth.process(testData, callback);
   		});

   		it('Should accept our request because it matches core ip', function() {
			var testData = {
				address: {
					address: '127.0.0.1'
				},
				headers: {
					cookie: 'CubeWars=ThisIsATest'
				}
			};
			var callback = function(res, allow) {
				assert.equal(true, allow);
			};
			Auth.process(testData, callback);
   		});

   		it('Should refuse our request because we are not loggd in', function() {
			var testData = {
				address: {
					address: '127.0.0.1'
				},
				headers: {
					cookie: ''
				}
			};
			var callback = function(res, allow) {
				assert.equal(true, allow);
			};
			Auth.process(testData, callback);
   		});
	});
});