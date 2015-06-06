/**
 * @module
 * @exports http_handlers object
 */
module.exports = function (app){
  app = app || {};

  return {
    post_data: require('./lib/post_data')(app),
    get_data: require('./lib/get_data')(app)
  };
};