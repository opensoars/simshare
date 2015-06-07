/**
 * @desc Sends db.text_data
 * @module
 * @exports get_data http handler
 * @param {object} req Http request
 * @param {object} res Http response
 */
module.exports = function (app){
  app = app || {};

  return function (req, res){
    res.write(app.db.text_data);

    console.log('writin');
    console.log(app.db.text_data);

    res.end();
  };
};