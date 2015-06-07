/**
 * @desc Gets called when a socket sends a message to the server
 * @module
 * @exports {function} onConnection - Websocket connection handler
 */
module.exports = function (app){
  app = app || {};

  return function onMessage (message){
    var sending_socket = this;

    try { message = JSON.parse(message);}
    catch(e) {}

    if(message.text_data || message.text_data === '')
      app.sockets.forEach(function (socket){
        if(socket !== sending_socket)
          socket.send(JSON.stringify(message));
      });
    
    // Log if wanted
    if(app.config.to_log.websockets.message)
      app.log('ws_handlers.onMessage', message);
  }
};



