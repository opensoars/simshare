/**
 * @namespace
 * @desc Top level app object
 */
var app = {};

app.require = require;
app.dirname = __dirname;

// Load application dependencies and set the app up for use
app = require('./lib/loadAppDeps')(app);
app = require('./lib/setupApp')(app);

// Log config.json if wanted
if(app.config.to_log.config)
  app.log('app.config = ' + JSON.stringify(app.config, 2, 2));

// Log about simshare being ready
app.log('Simshare is initialized!');