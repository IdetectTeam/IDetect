document.addEventListener('click', sendMessage, false);

function sendMessage($event) {
    try{
  var wn = document.getElementById('idetectiframe').contentWindow;
  // wn.postMessage(event.target.id,'https://storage.googleapis.com');
 wn.postMessage(event.target.id,'*');
  }
  catch{}
}

var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
