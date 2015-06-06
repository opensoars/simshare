/**
 * @module
 * @exports {object} - http_handlers object
 */
module.exports = function http_handlers(app){
  app = app || {};

  return {
    postData: require('./lib/postData')(app),
    getData: require('./lib/getData')(app)
  };
};


