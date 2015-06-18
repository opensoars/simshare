/**
 * @desc Returns websocket onConnection handler.
 * @param {object} app - Application namespace
 * @exports Websocket onConnection handler
 */
module.exports = function (app){
  app = app || {};

  /**
   * Gets called when a socket connects to the server. Binds
   * other socket events.
   * @module
   * @param {object} socket - Websocket connection
   */
  return function onConnection (socket){
    socket.on('message', app.libs.ws_handlers.onMessage);
    socket.on('close', app.libs.ws_handlers.onClose);

    app.sockets.push(socket);

    // Log if wanted
    if(app.config.to_log.websockets.connection)
      app.log('ws_handlers.onConnection');
  };
};
