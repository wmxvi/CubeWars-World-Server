'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars
 * @package MSc Computer Science - Project
 */

/**
 * Game Movement Module
 * @module Server/Game/Movement
 */
define(['config', 'common', 'util', 'playerManager', 'movementManager'], function(config, common, utils, PlayerManager, MovementManager) {
    
    /**
     * MovementOpcodeHandler
     * @param {Object} client 	Socket.IO Client pointer
     * @param {Object} network  Socket.IO Network pointer
     * @param {Object} world  World Map
     * @param {Object} clients List of connected clients
     * @param {Object} db_world  Database Connections
     * @alias module:Server/Game/Movement
     */
	var MovementOpcodeHandler = function(client, network, world, clients, db_world) {
		var _this = this;

        /**
         *  0 - timestamp
         *  1 - position x
         *  2 - position y
         *  3 - position z
         *  4 - quat x
         *  5 - quat y
         *  6 - quat z
         *  7 - quat w
        */
        client.on('CMSG-PLAYER-STATE', function(data) {
            // Are inputs of good value? Check that each movement different
            // is below certain threshold

            var player = world.getPlayerByClient(client.id);

            if(typeof player == 'undefined') {
                return;
            }

            var oldPosition = {
                px: player.positionX,
                py: player.positionY,
                pz: player.positionZ,
                rx: player.rotationX,
                ry: player.rotationY,
                rz: player.rotationZ,
                rw: player.rotationW
            };

            var newPosition = {
                px: data[1],
                py: data[2],
                pz: data[3],

                rx: data[4],
                ry: data[5],
                rz: data[6],
                rw: data[7]
            };

            // Make sure that the movement is fine
            // and then proceed to save/broadcast

            if(MovementManager.validateMovementInput(oldPosition, newPosition, data[8])) {
                world.updatePlayerPosition(
                    client.id,
                    data[1], 
                    data[2], 
                    data[3],

                    data[4],
                    data[5],
                    data[6],
                    data[7]
                );

                var queryString = 'UPDATE players SET positionX = ?, positionY = ?, positionZ = ?, rotationX = ?, rotationY = ?, rotationZ = ?, rotationW = ? WHERE playerId = ?';
                var queryValues = [
                    oldPosition.px,
                    oldPosition.py,
                    oldPosition.pz,

                    oldPosition.rx,
                    oldPosition.ry,
                    oldPosition.rz,
                    oldPosition.rw,
                    player.playerId
                ];

                db_world.query(queryString, queryValues, function(err) {
                    if(err) {
                        console.log(err);
                    }
                });

                var packet = [
                    client.id,
                    player.playerId,
                    player.positionX,
                    player.positionY,
                    player.positionZ,

                    player.rotationX,
                    player.rotationY,
                    player.rotationZ,
                    player.rotationW
                ];

                // Code below will send updates to relevant players
                var others = world.getClosestPlayers(client.id);
                for (var key in others) {
                    if (others.hasOwnProperty(key)) {
                        var obj = others[key];
                        clients[obj.client].emit(
                             'SMSG-UPDATE-OTHER-PLAYER-STATE',
                             packet
                         );
                    }
                }
            }
        });

	};

	return MovementOpcodeHandler;
});