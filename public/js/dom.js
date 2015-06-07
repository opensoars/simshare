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

      // Reset urls list
      urls_list.innerHTML = '';

      // Draw each url
      urls.forEach(function (url){
        urls_list.innerHTML += "<li><a href=''>" + url + "</a></li>";
      });
    }
  }
};