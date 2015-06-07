module.exports = function (app){
  app = app || {};

  /**
   * Ends http requests with app.db.text_data
   * @module
   * @param {object} req Http request
   * @param {object} res Http response
   */
  return function getData(req, res){
    res.write(app.db.text_data);
    res.end();
  };
};