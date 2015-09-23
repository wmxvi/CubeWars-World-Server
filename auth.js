'use strict';

/**
 * @author Elmario Husha
 * @name CubeWars 
 * @package MSc Computer Science - Project
 */

/**
 * Auth Module
 * @module Server/Auth
 */
define(['config', 'cookie', 'cookie-parser'], function(config, cookie, cookieParser) {
    /**
     * Auth Module
     * @alias module:Server/Auth
     */
	var Auth = function() {

	};

	/**
	 * Authentication module
	 * @type {Object}
	 */
	Auth.prototype = {
	    /**
	     * Auth challenge for clients attempting to connect
	     * We need to make sure that clients that are connecting are not connecting
	     * using their own donloaded version, that they are logged in, and the 
	     * character selected belongs to the logged in account
	     * 
	     * @param  {Object} data Client Data
	     * @param  {Function} response Auth callback function (true,false)
	     * @return {Function}
	     */
	    process: function(data, response) {
	        var _this = this;
	        if(data.address.address === config.core.ip || data.address.address == config.core.ipv6) {
	            if(data.headers.cookie) {
	                var webCookie = cookie.parse(data.headers.cookie);
	                if(webCookie.CubeWars.length > 0) {
	                    response(null, true);
	                } else {
	                    response(null, false);
	                }
	            } else {
	                response(null, false);
	            }
	        }
	    }  
	};
	return new Auth();
});