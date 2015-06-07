/**
 * @desc Requires everything the app needs in order to setup for use.
 * @return {object} app - Top level namespace with dependencies ready
 */
module.exports = function (app){
  require = app.require || require;

  /**
   * @namespace
   * @desc App configuration
   */
  app.config = require('./config.json');


  /**
   * @namespace
   * @desc Socket container
   */
  app.sockets = [];

  /**
   * @namespace
   * @desc App memory database
   */
  app.db = {
    text_data: ''
  };

  /**
   * @namespace
   * @desc Application helpers
   */
  app.helpers = require('./lib/helpers')(app);

  /**
   * @namespace
   * @desc App module object
   */
  app.modules = {
    express: require('express'),
    Ezlog: require('ezlog'),
    ws: require('ws'),
    compression: require('compression')
  };

  /**
   * @desc App logger function initialization
   */
  app = require('./lib/addLoggers')(app);

  /**
   *
   * @namespace
   * @desc App library object
   *
   */
  app.libs = {
    http_handlers: require('./lib/http_handlers')(app),
    ws_handlers: require('./lib/ws_handlers')(app)
  };

  // Task done
  app.log('Application requirements ready');

  return app;
};