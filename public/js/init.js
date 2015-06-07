// Bind functionality to dom events
app.dom.els.update_btn.onclick = app.http.updateTextData;
app.dom.els.load_btn.onclick = app.http.loadTextData;

app.dom.els.textarea.onkeyup = function (evt){
  var text_data = app.dom.els.textarea.value

  // If the text_data didnt change, return
  if(app.dom.old_textarea_value === text_data)
    return;
  
  // Update old_textarea_value with the new value
  app.dom.old_textarea_value = text_data;

  // Send new text_data data to the server
  app.ws.helpers.updateTextData(text_data);

  app.dom.update({
    text_data: text_data
  });
};

// HTTP load text_data
app.http.loadTextData();

// Bind websocket connection hanlder
app.ws.bindHandlers();