'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars
 * @package MSc Computer Science - Project
 */

/**
 * PlayerManager Module
 * @module Server/PlayerManager
 */
define(['common'], function(common) {
	var db_world = common.db.connect('world');
	/**
	 * Player Manager
	 * @alias module:Server/PlayerManager
	 */
	var PlayerManager = {
		_time: new Date(),
		/**
		 * Get current timestamp
		 * @return {Integer} Unix Timestamp
		 */
		getTime: function() {
			return this._time.getTime();
		},

		/**
		 * Get Player based on character id provided
		 * @param  {Integer}   cid Character Id
		 * @param  {Function} cb  Callback function
		 */
	    getPlayer: function(cid, cb) {
	        var queryString = "SELECT * FROM players WHERE playerId = ?";
	        var queryValues = [
	            cid
	        ];
	        db_world.query(queryString, queryValues, function(err, result) {
	            if(err) {
	                console.log(err);
	            }
	            cb(result[0]);
	        });
	    },

	    /**
	     * Get player depending on name provided
	     * @param  {String}
	     * @param  {Function}
	     */
	    getPlayerByName: function(name, cb) {
	        var queryString = "SELECT playerId FROM players WHERE username = ?";
	        var queryValues = [
	            name
	        ];

	        db_world.query(queryString, queryValues, function(err, result) {
	            if(err) {
	                console.log(err);
	                cb(false);
	                return;
	            }

	            if(!result[0]) {
	                cb(false);
	                return;
	            }

	            cb(result[0].playerId);
	        });
	    },

	    /**
	     * Get player attr depending on ID specified
	     * @param  {Integer}
	     * @param  {Function}
	     */
	    getPlayerAttributes: function(cid, cb) {
	        var _this = this;
	        var queryString = "SELECT * FROM attributes WHERE playerId = ?";
	        var queryValues = [
	            cid
	        ];

	        db_world.query(queryString, queryValues, function(err, result) {
	            if(err) {
	                console.log(err);
	                cb(false);
	            }
	            cb(result[0]);
	        });
	    },
	};
	return PlayerManager;
});