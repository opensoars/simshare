/**
 * @desc Gets called when a socket connects to the server. Binds
 * other socket events
 * @module
 * @exports {function} onConnection - Websocket connection handler
 */
module.exports = function (app){
  app = app || {};

  return function onConnection (socket){
    socket.on('message', app.libs.ws_handlers.onMessage);
    socket.on('close', app.libs.ws_handlers.onClose);

    app.sockets.push(socket);

    // Log if wanted
    if(app.config.to_log.websockets.connection)
      app.log('ws_handlers.onConnection');
  };
};
