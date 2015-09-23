'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars
 * @package MSc Computer Science - Project
 */

/**
 * Game Player Module
 * @module Server/Game/Player
 */
define(['vec2', 'player', 'playerManager', 'utils'], function(Vec2, Player, PlayerManager, Util) {

    /**
     * PlayerOpcodeHandler
     * @param {Object} client   Socket.IO Client pointer
     * @param {Object} network  Socket.IO Network pointer
     * @param {Object} world  World Map
     * @param {OBject} clients List of connected clients
     * @alias module:Server/Game/Player
     */
	var PlayerOpcodeHandler = function(client, network, world, clients, db_world) {
		var _this = this;
        /**
         * Called when client loaded and player selected
         * @param  {Integer}    ID of character that just joined
         */
        
        client.on('CMSG-PLAYER-JOINED', function(cid) {
            var newPlayer = new Player(cid);
            var clientId  = client.id;

            console.log('New Player Joined, their client id is ', clientId, 'their playerid is ', cid);

            PlayerManager.getPlayer(cid, function(player) {
                PlayerManager.getPlayerAttributes(cid, function(attributes) {
                    player.attributes = attributes;
                    player.client = clientId;

                    // Setup attributes for quadtree representation

                    player.pos = new Vec2(
                        Util.normalizeCoordinate(player.positionX), 
                        Util.normalizeCoordinate(player.positionZ)
                    );
                    
                    player.rad = 13;

                    // Add to memory and quadtree representations

                    world.addPlayer(
                        clientId, 
                        player, 
                        player.positionX, 
                        player.positionZ
                    );

                    // Send the info back to connecting client

                    var packet = [
                        clientId,                 // Their ID
                        player,                   // Their data
                        world.getPlayers(),    // Other players
                        PlayerManager.getTime()   // Current Timestamp
                    ];

                    network.sockets.emit('SMSG-INIT-PLAYER', packet);
                    network.sockets.emit('SMSG-UPDATE-PLAYER-STATE', [
                        attributes,
                        player.positionX,
                        player.positionY,
                        player.positionZ,

                        player.level
                    ]);

                    client.broadcast.emit('SMSG-PLAYER-JOINED', packet); // For other clients
                });
            });
        });

        client.on('CSMSG-DEATH-TIMER-COMPLETED', function() {
            var player = world.getPlayerByClient(client.id);

            player.attributes.health = player.attributes.maxHealth;

            var queryString = "UPDATE attributes SET health = maxHealth WHERE playerId = ?";
            var queryValues = [player.playerId];

            // Save state changes to DB and broadcast to others

            db_world.query(queryString, queryValues, function(err, result) {
                if(err) {
                    console.log(err);
                }
                network.sockets.emit('SMSG-UPDATE-PLAYER-STATE', [
                    player.attributes
                ]);
            });

        });

        client.on('CMSG-HANDLE-ATTACK', function(data) {
            var player = world.getPlayerByClient(client.id);
            if(!player){
                return;
            }
            var attacker = world.getPlayerById(data[0]);

            // Calculate damage we will be causing

            var damage = Math.round(Math.random() * 10, 1);
            if(player.attributes.health - damage < 0) {
                player.attributes.health = 0;

                network.sockets.emit('SMSG-DEATH');
            } else {
                player.attributes.health -= damage;
            }

            // Save damage state changes

            var queryString = "UPDATE attributes SET health = ? WHERE playerId = ?";
            var queryValues = [player.attributes.health, data[0]];

            db_world.query(queryString, queryValues, function(err, result) {
                if(err) {
                    console.log(err);
                }

                // Let other plaeyers know what just happened
                network.sockets.emit('SMSG-UPDATE-PLAYER-STATE', [
                    player.attributes
                ]);
            });
        });
	};
	return PlayerOpcodeHandler;
});