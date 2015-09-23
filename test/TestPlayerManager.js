'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars
 * @package MSc Computer Science - Project
 */

'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars
 * @package MSc Computer Science - Project
 */

var requirejs = require('requirejs');
var assert = require("assert");

requirejs.config({
    baseUrl: '',
    nodeRequire: require
});

// Begin tests

var WorldMap = requirejs('world.js');
var Player = requirejs('player.js');
var PlayerManager = requirejs('playermanager.js');

describe('PlayerManager', function() {

	describe('#getTime()', function () {
		it('Should return the current time', function() {
			assert.equal(true, PlayerManager.getTime() > 0);
		});
	});

	describe('#getPlayer()', function () {
		it('Should return player data from database', function() {
			PlayerManager.getPlayer(1, function(player) {
				assert.equal(true, player.playerId > 0);
			});
		});
	});

	describe('#getPlayerByName()', function () {
		it('Should return player data from database', function() {
			PlayerManager.getPlayerByName('mario', function(player) {
				assert.equal(true, player.playerId > 0);
			});
		});
	});

	describe('#getPlayerAttributes()', function () {
		it('Should return player data from database', function() {
			PlayerManager.getPlayerAttributes(1, function(attributes) {
				assert.equal(true, attributes.health > 0);
			});
		});
	});
});