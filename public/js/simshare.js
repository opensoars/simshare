/**
 * @namespace
 * @desc Top level app object
 */
var app = {};

/**
 * @namespace
 * @desc App config
 */
app.config = {
  http_port: 3334,
  ws_port: 3335
};

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

/**
 * @namespace
 * @desc App dom
 */
app.dom = {
  els: {
    update_btn: document.getElementById('update_btn'),
    load_btn: document.getElementById('load_btn'),
    textarea: document.getElementById('input'),
    update_notifier: document.getElementById('update_notifier'),
    urls_list: document.getElementById('urls_list')
  },

  old_textarea_value: '',

  /**
   * @desc Renders all dom elements
   */
  update: function (data){
    data = data || {};
    
    if(data.text_data || data.text_data === ''){
      app.dom.helpers.setTextarea(data.text_data);
      app.dom.helpers.drawUrls(app.helpers.getUrls(data.text_data));
    }
  },

  helpers: {
    setTextarea: function (text_data){
      app.dom.els.textarea.value = text_data;
    },
    drawUrls: function (urls){
      urls = urls instanceof Array ? urls : [];

      console.log(urls);

      urls_list.innerHTML = '';

      urls.forEach(function (url){
        urls_list.innerHTML += "<li><a href=''>" + url + "</a></li>";
      });
    }
  }
};

/**
 * @namespace
 * @desc App websockets functionality
 */
app.ws = {
  socket: new WebSocket('ws://' + location.hostname + ':3335'),

  helpers: {
    sendJSON: function (data){
      if(typeof data === 'object')
        data = JSON.stringify(data);

      app.ws.socket.send(data);
    },
    updateTextData: function (){
      app.ws.helpers.sendJSON({
        text_data: app.dom.els.textarea.value
      });
    }
  },
  onMessage: function (message){
    try { data = JSON.parse(message.data); }
    catch(e) { data = message }

    if(data.text_data || data.text_data === '')
      app.dom.update({
        text_data: data.text_data
      });
    
  },
  bindHandlers: function (){
    app.ws.socket.onmessage = app.ws.onMessage; 
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

  },
  loadTextData: function (){
    app.http.getData(function (err, res){
      if(err) alert(err);

      app.dom.els.textarea.value = res;
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

app.dom.els.textarea.onkeyup = function (evt){
  var text_data = app.dom.els.textarea.value

  // If the text_data didnt change, return
  if(app.dom.old_textarea_value === text_data)
    return;
  

  // Update old and new textarea value;
  app.dom.old_textarea_value = text_data;

  // Send new text_data data to the server
  app.ws.helpers.updateTextData(text_data);

  console.log('u1');
  app.dom.update({
    text_data: text_data
  });
};

// HTTP load text_data
app.http.loadTextData();

// Bind websocket connection hanlder
app.ws.bindHandlers();