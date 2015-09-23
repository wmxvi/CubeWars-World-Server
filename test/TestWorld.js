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
describe('World', function() {

	describe('#addPlayer()', function () {
		it('Should add a new player to the world map', function() {
			var World = new WorldMap(150000);
			var player = new Player(1);
			World.addPlayer('test-client-string', player, 100, 100);
			assert.equal(true, typeof World._players['test-client-string'] !== 'undefined');
		});
	});

	describe('#getPlayerByClient()', function () {
		it('Should return player based off client', function() {
			var World = new WorldMap(150000);
			var player = new Player(1);
			World.addPlayer('test-client-string', player, 100, 100);
			assert.equal(true,  typeof World.getPlayerByClient('test-client-string') !== 'undefined');
		});
	});

	describe('#getClosestPlayers()', function () {
		it('Should return players closest to a specific player', function() {
			var World = new WorldMap(150000);
			var player1 = new Player(1);
			var player2 = new Player(2);
			var player3 = new Player(3);
			var player4 = new Player(4);

			World.addPlayer('test-client-string1', player1, 100, 100);
			World.addPlayer('test-client-string2', player2, 110, 100);
			World.addPlayer('test-client-string3', player3, 95, 100);
			World.addPlayer('test-client-string4', player4, 100, 100);
			assert.equal(true, typeof World.getClosestPlayers('test-client-string1') !== 'undefined');
		});
	});

	describe('#getPlayerById()', function () {
		it('Should return player by id number', function() {
			var World = new WorldMap(150000);
			var player1 = new Player(1);
			World.addPlayer('test-client-string1', player1, 150, 150);
			assert.equal(true, typeof World.getPlayerById(1) !== 'undefined');
		});
	});

	describe('#getPlayers()', function () {
		it('Should return all players', function() {
			var World = new WorldMap(150000);
			var player1 = new Player(1);
			var player2 = new Player(2);
			var player3 = new Player(3);
			var player4 = new Player(4);
			var player5 = new Player(5);

			World.addPlayer('test-client-string1', player1, 5, 5);
			World.addPlayer('test-client-string2', player2, 10, 1);
			World.addPlayer('test-client-string3', player3, 15, 5);
			World.addPlayer('test-client-string4', player4, 20, 2);
			World.addPlayer('test-client-string5', player5, 25, 5);

			assert.equal(true, typeof World.getPlayers() !== 'undefined');
		});
	});

	describe('#removePlayer()', function () {
		it('Should remove player from world map', function() {
			var World = new WorldMap(150000);
			var player1 = new Player(1);
			World.addPlayer('test-client-string1', player1, 500, 250);
			World.removePlayer('test-client-string1');

			assert.equal(undefined, World.getPlayerByClient('test-client-string1'));
		});
	});

	describe('#updatePlayerPosition()', function () {
		it('Should update player position in world map', function() {
			var World = new WorldMap(150000);
			var player10 = new Player(10);
			player10 = World.addPlayer('test-client-string10', player10, 500, 250, function() {});
			player10 = World.updatePlayerPosition('test-client-string10', 5, 5, 5, 1, 1, 1, 1);

			assert.equal(5, player10.positionX);
			assert.equal(5, player10.positionY);
			assert.equal(5, player10.positionZ);

			assert.equal(1, player10.rotationX);
			assert.equal(1, player10.rotationY);
			assert.equal(1, player10.rotationZ);
			assert.equal(1, player10.rotationW);
		});
	});

});