/**
 * @desc Requires everything the app needs in order to setup for use.
 * @param {object} app - Application namespace
 * @return {object} app - Top level namespace with dependencies ready
 */
module.exports = function (app){
  require = app.require || require;

  /**
   * App configuration
   * @namespace
   */
  app.config = require('./config.json');

  /**
   * Socket container
   * @namespace
   */
  app.sockets = [];

  /**
   * App memory database
   * @namespace
   */
  app.db = {
    text_data: ''
  };

  /**
   * App helper functions
   * @namespace
   */
  app.helpers = require('./lib/helpers')(app);

  /**
   * App modules
   * @namespace
   */
  app.modules = {
    express: require('express'),
    Ezlog: require('ezlog'),
    ws: require('ws'),
    compression: require('compression')
  };

  // Add logger functions
  app = require('./lib/addLoggers')(app);

  /**
   * App library object
   * @namespace
   */
  app.libs = {
    http_handlers: require('./lib/http_handlers')(app),
    ws_handlers: require('./lib/ws_handlers')(app)
  };

  // Task done
  app.log('App requirements ready');

  return app;
};