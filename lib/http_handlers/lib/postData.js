module.exports = function (app){
  app = app || {};

  /**
   * Sets db.text_data to the newly posted text_data.
   * @module
   * @param {object} req Http request
   * @param {object} res Http response
   */
  return function postData(req, res){
    var body = '';

    req.on('data', function (chunk){
      body += chunk;
    });

    req.on('end',  function (){
      app.db.text_data = body;
    });
  };

};