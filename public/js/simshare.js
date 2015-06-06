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


app.http = {
  getData: function (){
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
  postData: function (){
    var req = new XMLHttpRequest();
    req.open('POST', '/text_data', true);
    req.send(app.dom.els.textarea.value);
    app.dbtext_data = app.dom.els.textarea.value;
  }
};



app.dom.els.update_btn.onclick = function (){
  app.http.postData();
};

app.dom.els.load_btn.onclick = function (){
  app.http.getData();
};
