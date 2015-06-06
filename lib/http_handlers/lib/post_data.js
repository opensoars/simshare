/**
 * @module
 * @exports post_data http handler
 */
module.exports = function (app){
  app = app || {};

  /**
   * @desc Sets app.text_data with newly posted data
   * @param {object} req Http request
   * @param {object} res Http response
   */
  return function (req, res){
    var body = '';

    req.on('data', function (chunk){
      body += chunk;
    });

    req.on('end',  function (){
      app.text_data = body;
    });
  };

};