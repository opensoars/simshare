/**
 * @module
 * @exports App namespace with added loggers
 */
module.exports = function (app){
  app.log = new app.modules.Ezlog(['[simshare]', 'green']);
  app.logWarn = new app.modules.Ezlog(['[simshare]', 'yellow']);
  app.logErr = new app.modules.Ezlog(['[simshare]', 'red'], ['red', 'bold']);

  return app;
};