'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars
 * @package MSc Computer Science - Project
 */

var Vec2 = require('vec2');
var Quadtree2 = require('quadtree2');

/**
 * WorldMap Module
 * @module Server/World
 */
define(['utils'], function(Util, require) {
    /**
     * World Module
     * @alias module:Server/World
     */
    var WorldMap = function(worldSize) {
        this._players = {};
        this._worldSize = worldSize;
        this._map = new Quadtree2({
            'size' : new Vec2(worldSize, worldSize),
            'objectLimit' : 5
        });
    };

    /**
     * World Map
     * @type {Object}
     */
    WorldMap.prototype = {
        /**
         * Add a new player to the world map
         * @param {String} clientId  Client Id
         * @param {Object} player    Player ServerObject
         * @param {FLoat} positionX Position X
         * @param {FLoat} positionY Position Y
         * @return {Object} Updated Player
         */
        addPlayer: function(clientId, player, positionX, positionY) {
            player.client = clientId;
            this._players[clientId] = player;
            this._map.addObject(player);
            return this._players[clientId];
        },

        /**
         * Fetch player information based off their client id
         * @param  {String} clientId Client Id
         * @return {Object}          Player Object
         */
        getPlayerByClient: function(clientId) {
            return this._players[clientId];
        },

        /**
         * Get players closest to play identified by their client id
         * @param  {String} clientId Client Id
         * @return {Array}           Players who are closest to the player
         */
        getClosestPlayers: function(clientId) {
            var player = this._players[clientId];
            return this._map.getCollidables(player);
        },

        /**
         * Get Player in memory by their id
         * @param  {Integer} playerId PlayerId
         * @return {Object}          Player Object
         */
        getPlayerById: function(playerId) {
            for(var key in this._players) {
               if(this._players.hasOwnProperty(key)) {
                  var player = this._players[key];
                    if(parseInt(player.cid) != parseInt(playerId)) {
                        continue;
                    } 
                    return player;
               }
            }
        },

        /**
         * Get all Players
         * @return {Object} All Players
         */
        getPlayers: function() {
            return this._players;
        },

        /**
         * Remove player from game world
         * @param  {String} clientId Client Id
         */
        removePlayer: function(clientId) {
            var player = this._players[clientId];
            if(typeof player == 'undefined'){
                return;
            }
            this._map.removeObject(player);
            delete this._players[clientId];
        },

        /**
         * Update memory and quadtree state of player position
         * @param  {String} clientId The client id
         * @param  {Integer} x        Player position x
         * @param  {Integer} y        Player position y
         * @param  {Integer} z        Player position z
         * @return {Object} Updates Player copy
         */
        updatePlayerPosition: function(clientId, x, y, z, rx, ry, rz, rw) {
            var player = this._players[clientId];

            // Update local respresentation

            player.positionX = x;
            player.positionY = y;
            player.positionZ = z;

            player.rotationX = rx;
            player.rotationY = ry;
            player.rotationZ = rz;
            player.rotationW = rw;

            // Update quadtree representation
            var nx = Util.normalizeCoordinate(x);
            var nz = Util.normalizeCoordinate(z);

            player.pos = new Vec2(nx, nz);

            this._map.updateObject(player)
            return player;
        },

        /**
         * Return World map
         * @return {Object} The world quadtree
         */
        getMap: function() {
            return this._map;
        }
    };
    return WorldMap;
});