module.exports = function (app){
  app = app || {};



  return function onClose (){
    var closed_socket = this;

    app.sockets.forEach(function (socket, i){
      if(closed_socket === socket)
        app.sockets.splice()
    })

  }
}