module.exports = function (app){
  app = app || {};

  return function onMessage (message){
    try { message = JSON.parse(message);}
    catch(e) {}



    app.log('ws_handlers.onMessage', message);
  }
};



