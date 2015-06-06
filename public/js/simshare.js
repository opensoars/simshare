/**
 * @namespace
 * @desc Top level app object
 */
var app = {};

/**
 * @namespace
 * @desc App memory database
 */
app.db = {
  text_data: ''
};

/**
 * @namespace
 * @desc App dom
 */
app.dom = {
  els: {
    update_btn: document.getElementById('update_btn'),
    load_btn: document.getElementById('load_btn'),
    textarea: document.getElementById('input'),
    update_notifier: document.getElementById('update_notifier')
  }
};

/**
 * @namespace
 * @desc App http functionality and configuration
 */
app.http = {
  /**
   * @public
   * @desc Http gets text_data
   */
  getData: function (cb){
    var req = new XMLHttpRequest();
    req.open('GET', '/text_data', true);
    req.onreadystatechange = function (){
      if(this.readyState === 4){
        app.dom.els.textarea.value = this.response;
        app.dbtext_data = this.response;
      }
    };
    req.send();
  },
  /**
   * @public
   * @desc Http posts text_data
   */
  postData: function (cb){
    var req = new XMLHttpRequest();
    req.open('POST', '/text_data', true);
    req.send(app.dom.els.textarea.value);
    app.dbtext_data = app.dom.els.textarea.value;
  }
};


/**
 *
 * Initialize application logic
 *
 */


/**
 * Bind functionality to dom events
 */
app.dom.els.update_btn.onclick = function (){
  /**
   * @cb
   */
  app.http.postData(function (err){

  });
};

app.dom.els.load_btn.onclick = function (){
  /**
   * @cb
   */
  app.http.getData(function (err){

  });
};
