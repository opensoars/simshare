module.exports = function (app){
  app = app || {};

  return function onConnection (socket){
    socket.on('message', app.libs.ws_handlers.onMessage);
    socket.on('close', app.libs.ws_handlers.onClose);

    socket.send(JSON.stringify({
      a_nice_little: 'test'
    }));

    app.sockets.push(socket);
  };
};
