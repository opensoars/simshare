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

      app.dom.update({
        text_data: res
      });
    });
  }

};