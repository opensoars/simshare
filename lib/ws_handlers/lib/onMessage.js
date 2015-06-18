/**
 * @desc Returns websocket onMessage handler
 * @param {object} app - Application namespace
 * @exports Websocket onMessage handler
 */
module.exports = function (app){
  app = app || {};

  /**
   * Gets called when a socket sends a message to the server.
   * @module
   * @param {object|string} message - Websocket message
   */
  function onMessage (message){
    var sending_socket = this;

    try { message = JSON.parse(message); }
    catch(e) {}

    if(message.text_data || message.text_data === ''){
      app.db.text_data = message.text_data;
      app.sockets.forEach(function (socket){
        if(socket !== sending_socket)
          socket.send(JSON.stringify(message));
      });
    }
    
    // Log if wanted
    if(app.config.to_log.websockets.message)
      app.log('ws_handlers.onMessage', message);
  }

  return onMessage;
};



