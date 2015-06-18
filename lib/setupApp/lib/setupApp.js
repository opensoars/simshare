/**
 * @desc Sets up application dependencies
 * @param {object} app - Application namespace
 * @return {object} app - Top level namespace with dependencies set-up
 */
module.exports = function setupApp (app){

  /**
   * HTTP initialization
   */

  // Initialize express
  app.express = app.modules.express();

  // Middleware stack
  app.express.use(app.modules.compression());

  // Simshare public folder
  app.express.use(app.modules.express.static(app.dirname + '/public'));

  // If wanted serve doc
  if(app.config.serve_doc)
    app.express.use(app.modules.express.static(app.dirname + '/doc'));

  // Setup http routes
  app.express.post('/text_data', app.libs.http_handlers.postData);
  app.express.get('/text_data', app.libs.http_handlers.getData);

  // Start listening for http requests
  app.express.listen( (process.env.PORT || app.config.http_port) );

  /**
   *
   * Websocket initialization
   *
   */

  // Initialize a new websocket server
  app.wss = new app.modules.ws.Server({
    port: process.env.PORT || app.config.ws_port
  });

  // Start listening for websocket connections
  app.wss.on('connection', app.libs.ws_handlers.onConnection);


  // Task done
  app.log('App setup ready');

  return app;
};