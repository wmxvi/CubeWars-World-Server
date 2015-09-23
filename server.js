'use strict';

/**
 * @file World Server
 * @author Elmario Husha
 * @name CubeWars - World Server
 * @package MSc Computer Science - Project
 */

/**
 * External Modules
 */
var http  = require('http');
var redis = require('redis');
var express = require('express');
var _ = require('underscore');
var cookie = require('cookie');
var connect = require('connect');
var validator = require('validator');

/**
 * Server Module
 * @module Server
 */
define(
[
    'config', 
    'common',
    'utils', 
    'world', 
    'auth', 
    'vec2', 
    'player', 
    'playerManager', 
    'movementManager',
    // Networking Modules
    'game/generic',
    'game/movement',
    'game/player'
], 

function(
    config, 
    common, 
    Util, 
    WorldMap, 
    Auth, 
    Vec2, 
    Player, 
    PlayerManager, 
    MovementManager, 
    // Networking Modules
    NetModuleGeneric, 
    NetModuleMovement,
    NetModulePlayer
) {
    var db_logon = common.db.connect('logon');
    var db_world = common.db.connect('world');
    /**
     * Our main world server module
     * @constructor
     * @alias module:Server
     */
    var Server = function() {
        this._rstore  = require('socket.io/lib/stores/redis');
        this._server  = express();
        this._clients = {};

        this._sessionStore = new this._rstore ({
            redisPub: redis.createClient(),
            redisSub: redis.createClient(),
            redisClient: redis.createClient()
        });
    };

    /**
     * Our World Server
     * @type {Object}
     */
    Server.prototype = {
        /**
         * Basic Startup routine
         * @param  {Object} Server Paramms
         */
        init: function(params) {
            var _this = this;

            this.params = params || {};
            this.setupServer();
            this.startServer();
            this.initNetworking();
        },

        /**
         * Initialise modules
         */
        setupServer: function() {
            var params = this.params;

            this._server.configure(function() {
                this.set('port', params.port);
                this.use(express.cookieParser());
                console.log(config.misc.genericStartupMessage);
            });


            this._worldMap = new WorldMap(150000);
        },

        /**
         * Start HTTP Listener
         */
        startServer: function() {
            var _this = this;
            this._express = http.createServer(this._server).listen(this._server.get('port'), function() {
                console.log('World Server', '[LOG]', 'CubeWars world server instance started [' + _this._server.get('port') + ']');
            });

            if(!this._express) {
                console.log('Failed to load world server instance, please check port setup');
            }

            this._network = require('socket.io').listen(
                this._express, {'store': this._sessionStore}
            );

            this._network.configure(function() {
                this.set('transports', ['websocket']);
                this.set('log level', 0);
                this.set('authorization', Auth.process);
            });
        },
        
        /**
         * Start Socket Listener
         */
        initNetworking: function() {
            var _this  = this;
            this._network.sockets.on('connection', function(client) {
                _this._clients[client.id] = client;

                NetModuleGeneric(client, _this._network, _this._worldMap, _this._clients, db_world);
                NetModulePlayer(client, _this._network, _this._worldMap, _this._clients, db_world);
                NetModuleMovement(client, _this._network, _this._worldMap, _this._clients, db_world);

                client.on('disconnect', function() {
                    var leavingClient = client.id;
                    var leavingPlayer = _this._worldMap.getPlayerByClient(leavingClient); 
                    if(typeof leavingPlayer == 'undefined') {
                        return;
                    }
                    _this._network.sockets.emit('SMSG-PLAYER-LEFT', leavingPlayer.playerId, leavingClient);
                    _this._worldMap.removePlayer(client.id)
                });

            });
        }
    };

    return new Server();
});
