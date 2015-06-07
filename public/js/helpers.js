/**
 * Application helper functions.
 * @namespace
 */
app.helpers = {

  /**
   * @param {string} str - String to test for an url pattern
   * @return {bool} - Whether str is an url
   */
  isUrl: function (){
    var url_pattern = /.+?\:.+?\..+?/;

    return function (str){
      return url_pattern.test(str);
    };
  }(),

  /**
   * @param {string} text - Text to get urls from
   * @return {array} urls - Extracted urls
   */
  getUrls: function (text){
    var urls = [];

    // Test whether textarea lines are an url
    text.split( /\n/ ).forEach(function (text_line){
      if(app.helpers.isUrl(text_line))
        urls.push(text_line);
    });

    return urls;
  }
};