/**
 * @module
 * @exports get_data http handler
 */
module.exports = function (app){
  app = app || {};

  /**
   * @desc Sends app.text_data
   * @param {object} req Http request
   * @param {object} res Http response
   */
  return function (req, res){
    res.write(app.text_data);
    res.end();
  };
};