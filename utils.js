'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars
 * @package MSc Computer Science - Project
 */

var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string');

/**
 * Util Module
 * @module Server/Util
 */
define(function(require) {
    /**
     * Util Module
     * @alias module:Server/Util
     */
	var Utils = {
		/**
		 * Clean a string
		 * @param  {String} string The string
		 * @return {String}        Cleaned string
		 */
	    cleanString: function(string) {
	        string = _.escapeHTML(string);
	        string = _.clean(string);
	        string = _.trim(string);
	        string = _.stripTags(string);
	        return string;
	    },

        /**
         * Turn client side coordinates to server side coordinates
         * @param  {Float} coordinate Coordinate
         * @return {Float}            Normalized relative coordiate
         */
        normalizeCoordinate: function(coordinate) {
            if(coordinate == 0) {
                return 150000 / 2;
            } else if(coordinate > 0) {
                return coordinate * 2;
            } else if(coordinate < 0) {
                return Math.abs(coordinate);
            }
        },

	    /**
	     * Get random num between range
	     * @param  {Integer}
	     * @param  {Integer}
	     */
	    getRandom: function(minimum, maximum) {
	        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	    }
	};
	return Utils;
});