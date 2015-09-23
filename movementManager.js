'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars
 * @package MSc Computer Science - Project
 */

/**
 * MovementManager Module
 * @module Server/MovementManager
 */
define(function(require) {
	/**
	 * MovementMAnager
	 * @alias module:Server/MovementManager
	 */
    var MovementManager = {
    	/**
    	 * Validate Player Movement (provided a set of inputs, this method will make calculate
         * where the player should end up, and if it matches the clients position) 
    	 * @param  {Object} oldPosition Old Position coords
    	 * @param  {Object} newPosition New Position coords
    	 * @return {Boolean}             Whether it's a valid move
    	 */
        validateMovementInput: function(oldPosition, newPosition, inputs) {
           
            // var ox = Math.abs(oldPosition.px);
            // var oy = Math.abs(oldPosition.py);
            // var oz = Math.abs(oldPosition.pz);

            // var nx = Math.abs(newPosition.px);
            // var ny = Math.abs(newPosition.py);
            // var nz = Math.abs(newPosition.pz);

            for(var i = 0; i < inputs.length; i++) {
                if(inputs[i][0] == 'mu' || inputs[i][0] == 'md') {
                    oldPosition.pz += inputs[i][1];
                }
            }

            // console.log('old', oldPosition);
            // console.log('new', newPosition);

            // var check = ((ox - nx) < 100) && ((oy - ny) < 100) && ((oz - nz) < 100);
            // console.log(check, (ox - nx), (oy - ny), (oz - nz));
            return (oldPosition.x == newPosition.x) && (oldPosition.y == newPosition.y) && (oldPosition.z == newPosition.z);
        }
    };
    return MovementManager;
});