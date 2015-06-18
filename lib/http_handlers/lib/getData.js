/**
 * @desc Returns http getData handler.
 * @param {object} app - Application namespace
 * @exports http getData handler
 */
module.exports = function (app){
  app = app || {};

  /**
   * Ends http requests with app.db.text_data
   * @param {object} req Http request
   * @param {object} res Http response
   */
  return function getData(req, res){
    res.write(app.db.text_data);
    res.end();
  };
};