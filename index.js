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

// Startup notifications
app.log('app.config = ' + JSON.stringify(app.config, 2, 2));
app.log('Simshare is initialized!');