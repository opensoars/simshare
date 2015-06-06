/**
 * @namespace
 * @desc Top level app object
 */
var app = {};

/**
 * @namespace
 * @desc App config
 */
app.config = {};

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
 * @desc App websockets functionality
 */
app.ws = {
  socket: new WebSocket('ws://localhost:3335'),

  sendJSON: function (data){
    if(typeof data === 'object')
      data = JSON.stringify(data);

    app.ws.socket.send(data);
  },

  onMessage: function (message){
    try { data = JSON.parse(message.data); }
    catch(e) { data = message }

    console.log(data);

    if(data.text_data)
      app.dom.els.textarea.value = data.text_data;
  },

  bindHandlers: function (){
    app.ws.socket.onmessage = app.ws.onMessage; 
  },
  updateTextData: function (){
    app.ws.sendJSON({
      text_data: app.dom.els.textarea.value
    });
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
      if(this.readyState === 4)
        cb(null, this.response);
    };

    req.onerror = function (){
      cb('app.http.getData error');
    };

    req.send();
  },
  /**
   * @public
   * @desc Http posts text_data
   */
  postData: function (text_data, cb){
    var req = new XMLHttpRequest();
    req.open('POST', '/text_data', true);

    req.onreadystatechange = function (){
      if(this.readyState === 4)
        cb();
    };

    req.onerror = function (){
      cb('app.http.postData error');
    };

    req.send(app.dom.els.textarea.value);
  },

  updateTextData: function (){
    var text_data = app.dom.els.textarea.value;

    app.http.postData(text_data, function (err){
      if(err) alert(err);
    });

    app.dbtext_data = text_data
  },
  loadTextData: function (){
    app.http.getData(function (err, res){
      if(err) alert(err);

      app.dom.els.textarea.value = res;
      app.dbtext_data = res;
    });
  }

};


/**
 *
 * Initialize application logic
 *
 */


// Bind functionality to dom events
app.dom.els.update_btn.onclick = app.http.updateTextData;
app.dom.els.load_btn.onclick = app.http.loadTextData;

app.dom.els.textarea.onkeyup = app.ws.updateTextData;

// HTTP load text
app.http.loadTextData();

// Bind websocket connection hanlder
app.ws.bindHandlers();