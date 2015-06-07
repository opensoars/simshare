/**
 * App websockets functionality.
 * @namespace
 */
app.ws = {
  /**
   * Websocket instance drawn from WebSocket constructor.
   */
  socket: new WebSocket(
    'ws://'
    + location.hostname
    + ':'
    + app.config.ws_port
  ),

  /**
   * Websocket helpers
   */
  helpers: {
    /**
     * Sends JSON through the websocket connection, stringifies if needed.
     * @method
     */
    sendJSON: function (data){
      if(typeof data === 'object')
        data = JSON.stringify(data);

      app.ws.socket.send(data);
    },
    /**
     * @method
     */
    updateTextData: function (){
      app.ws.helpers.sendJSON({
        text_data: app.dom.els.textarea.value
      });
    }
  },
  /**
   * Gets called when a websocket message is received
   * @method
   */
  onMessage: function (message){
    try { data = JSON.parse(message.data); }
    catch(e) { data = message }

    if(data.text_data || data.text_data === '')
      app.dom.update({
        text_data: data.text_data
      });
    
  },
  /**
   * @method
   */
  onClose: function (close_event){
    setTimeout(function (){
      window.location = '/';
    }, 3333);
  },
  /**
   * @method
   */
  bindHandlers: function (){
    app.ws.socket.onmessage = app.ws.onMessage; 
    app.ws.socket.onclose = app.ws.onClose;
  }
};