var update_btn = document.getElementById('update_btn'),
    load_btn = document.getElementById('load_btn'),
    textarea = document.getElementById('input'),
    update_notifier = document.getElementById('update_notifier');

var text_data = '';

update_btn.onclick = function (){
  var req = new XMLHttpRequest();
  req.open('POST', '/text_data', true);
  req.send(textarea.value);
  text_data = textarea.value;
};

load_btn.onclick = function (){
  var req = new XMLHttpRequest();
  req.open('GET', '/text_data', true);
  req.onreadystatechange = function (){
    if(this.readyState === 4){
      textarea.value = this.response;
      text_data = this.response;
    }
  };
  req.send();
};
