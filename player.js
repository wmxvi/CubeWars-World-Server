'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars
 * @package MSc Computer Science - Project
 */

/**
 * Player Module
 * @module Server/Player
 */
define(function(require) {
	/**
	 * Player Class
	 * @constructor
	 * @alias module:Server/Player
	 */
	var Player = function(cid) {
	    this.cid = cid;
	    // this.data   = data.playerData;
	    // this.source = data.source;
	};

	Player.prototype = {

	};
	return Player;
});