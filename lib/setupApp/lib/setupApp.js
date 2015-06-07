module.exports = function setupApp (app){

  /**
   * HTTP initialization
   */

  // Initialize express
  app.express = app.modules.express();

  // Middleware stack
  app.express.use(app.modules.compression());

  app.express.use(app.modules.express.static(app.dirname + '/public'));
  app.express.use(app.modules.express.static(app.dirname + '/doc'));


  // Setup http routes
  app.express.post('/text_data', app.libs.http_handlers.postData);
  app.express.get('/text_data', app.libs.http_handlers.getData);

  // Start listening for http requests
  app.express.listen(app.config.http_port);

  /**
   *
   * Websocket initialization
   *
   */

  // Initialize a new websocket server
  app.wss = new app.modules.ws.Server({ port: app.config.ws_port });

  // Start listening for websocket connections
  app.wss.on('connection', app.libs.ws_handlers.onConnection);


  // Task done
  app.log('App setup ready');

  return app;
};