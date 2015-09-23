'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars
 * @package MSc Computer Science - Project
 */

/**
 * Net Module
 * @module Server/NetHandler
 */
define(['auth'], function(Auth) {
	/**
	 * NetManager
	 * @param {Object} store   Store to use
	 * @param {Array} modules List of net modules
	 * @alias module:Server/NetHandler
	 */
	var NetHandler = function(store, modules) {
		this._store = store;
		this._auth  = new Auth();
		this._modules = modules;

		this._client = false;
		this._socket = false;
	};

	/**
	 * NetHandler
	 * @type {Object}
	 */
	NetHandler.prototype = {
		/**
		 * Initialise networking
		 * @param  {Object}   world World map instance
		 * @param  {Function} cb    Callback
		 */
		init: function(world, cb) {
			var _this = this;
	        this._network = require('socket.io').listen(
	            world, {'store': _this._store}
	        );

	        this._network.configure(function() {
	            this.set('transports', ['websocket']);
	            this.set('log level', 0);
	            this.set('authorization', _this._auth.process);
	        });

	        this.listen(cb);
		},

		/**
		 * Initialise listner
		 * @param  {Function} cb Callback function
		 */
		listen: function(cb) {
			var _this = this;
			var socket = this._network.sockets;
			this._network.sockets.on('connection', function(client) {
				if(!_this._client || !_this._socket) {
					_this._client = client;
					_this._socket = socket;
					cb(_this);
				}
				cb(_this);
			});
		},

		/**
		 * Get network instance
		 * @return {Object} Network Instance
		 */
		getNetwork: function() {
			return this._network;
		},

		/**
		 * Get client instance
		 * @return {Object} Client Instance
		 */
		getClient: function() {
			var client = this._client;
			return client;
		},

		/**
		 * Get socket instance
		 * @return {Object} Socket Instance
		 */
		getSocket: function() {
			var socket = this._socket;
			return socket;
		}
	};

	return NetHandler;
});