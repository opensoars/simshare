/**
 * @desc Splices the closed socket from app.sockets array
 * @module
 * @exports {function} onClose - Websocket close handler
 */
module.exports = function (app){
  app = app || {};

  return function onClose (){
    var closed_socket = this;

    app.sockets.forEach(function (socket, i){
      if(closed_socket === socket)
        app.sockets.splice(i, 1);
    });

  }
}