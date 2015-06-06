/**
 * @namespace
 * @desc Top level app object
 */
var app = {};

/**
 * @namespace
 * @desc App configuration
 */
app.config = require('./config.json');


/**
 * @namespace
 * @desc App memory database
 */
app.db = {
  text_data: ''
};

/**
 * @namespace
 * @desc App module object
 */
app.modules = {
  express: require('express'),
  Ezlog: require('ezlog')
};

/**
 * @namespace
 * @desc App logger functions
 */
app = require('./lib/loggers')(app); 

/**
 *
 * @namespace
 * @desc App library object
 *
 */
app.libs = {
  http_handlers: require('./lib/http_handlers')(app)
};


/**
 *
 * Initialize application logic
 *
 */


// Initialize express
app.express = app.modules.express();

// Middleware stack
app.express.use(app.modules.express.static(__dirname + '/public'));

// Setup application routes
app.express.post('/text_data', app.libs.http_handlers.post_data);
app.express.get('/text_data', app.libs.http_handlers.get_data);

// Start listening for http requests
app.express.listen(app.config.http_port);

// Startup notifications
app.log('app.config = ' + JSON.stringify(app.config, 2, 2));
app.log('Simshare is initialized!');
app.log('Listening for HTTP requests on port: ' + app.config.http_port);