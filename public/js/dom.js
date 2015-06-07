/**
 * @namespace app.dom
 * @desc Application dom elements, data and methods
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
   * Renders all dom elements.
   * @param {object} data - Template data
   */
  update: function (data){
    data = data || {};
    
    if(data.text_data || data.text_data === ''){
      app.dom.setTextarea(data.text_data);
      app.dom.drawUrls(app.helpers.getUrls(data.text_data));
    }
  },
  /**
   * Sets app.dom.els.textarea.value.
   * @param {string} text_data - Textarea value
   */
  setTextarea: function (text_data){
    app.dom.els.textarea.value = text_data;
  },
  /**
   * Draws an array urls in urls_list
   * @param {array} urls - Urls to draw in urls_list
   */
  drawUrls: function (urls){
    urls = urls instanceof Array ? urls : [];

    // Reset urls list
    urls_list.innerHTML = '';

    // Draw each url
    urls.forEach(function (url){
      urls_list.innerHTML += "<li><a href=''>" + url + "</a></li>";
    });
  }
  
};