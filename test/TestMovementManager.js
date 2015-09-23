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

var MovementManager = requirejs('movementmanager.js');
describe('Util', function() {

	describe('#validateMovementInput()', function () {
		it('Should calculate whether the players movement inputs are valid', function() {
            var oldPosition = {
                px: 0,
                py: 50,
                pz: 0,
                rx: 0,
                ry: 0,
                rz: 0,
                rw: 0
            };

            var newPosition = {
                px: 0,
                py: 50,
                pz: 50,

                rx: 0,
                ry: 0,
                rz: 0,
                rw: 0
            };

			var inputs = [
				['mu', 10],
				['mu', 10],
				['mu', 10],
				['mu', 10],
				['mu', 10],
				['rr', 1.3],
				['rl', 0.3]
			];

			assert.equal(true, MovementManager.validateMovementInput(oldPosition, newPosition, inputs));
		});
	});
});