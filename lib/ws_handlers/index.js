/**
 * @module
 * @param {object} app - Application namespace
 * @exports {object} - ws_handlers object
 */
module.exports = function ws_handlers(app){
  app = app || {};

  return {
    onMessage: require('./lib/onMessage.js')(app),
    onConnection: require('./lib/onConnection.js')(app),
    onClose: require('./lib/onClose.js')(app)
  };
};


