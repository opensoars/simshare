/**
 * @desc Returns websocket onClose handler
 * @param {object} app - Application namespace
 * @exports Websocket onClose handler
 */
module.exports = function (app){
  app = app || {};

  /**
   * Removes the closed socket from app.sockets array.
   * @module
   */
  return function onClose (){
    var closed_socket = this;

    app.sockets.forEach(function (socket, i){
      if(closed_socket === socket)
        app.sockets.splice(i, 1);
    });
  };
};