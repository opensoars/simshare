/**
 * @desc Returns http_handlers map.
 * @param {object} app - Application namespace
 * @exports http_handlers map
 */
module.exports = function http_handlers(app){
  app = app || {};

  return {
    postData: require('./lib/postData')(app),
    getData: require('./lib/getData')(app)
  };
};


