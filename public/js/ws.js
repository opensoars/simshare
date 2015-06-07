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