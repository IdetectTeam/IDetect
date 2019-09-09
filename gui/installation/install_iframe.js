// const getGeneratedPageURL = ({ html, css, js }) => {
//   const getBlobURL = (code, type) => {
//     const blob = new Blob([code], { type })
//     return URL.createObjectURL(blob)
//   }

//   const cssURL = getBlobURL(css,'https://storage.googleapis.com/idetect/install.css')
//   const jsURL = getBlobURL(js, 'https://storage.googleapis.com/idetect/install.js')
// //   const htmlURL=getBlobURL(html,'https://storage.googleapis.com/idetect/install.html')
//   const source = `
//     <html>
//       <head>
//         ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
//         ${js && `<script src="${jsURL}"></script>`}
//       </head>
//       <body>
//         ${html || ''}
//       </body>
//     </html>
//   `

//   return getBlobURL(source, 'https://storage.googleapis.com/idetect/install.html')
// }

// // const url = getGeneratedPageURL({
// //   html: '<p>Hello, world!</p>',
// //   css: 'p { color: blue; }',
// //   js: 'console.log("hi")'
// // })

// document.addEventListener('DOMContentLoaded', function() {
//   var iframe = document.createElement("iframe");
// //  iframe.id="idetectiframe" 
// //   $("#idetectiframe").draggable({
// //     handle: ".modal-header"
// // });  
// iframe.style = "position:fixed;right:50px;bottom:200px;height:500px;width:400px";
// iframe.allow = "microphone; camera";
// iframe.style.zIndex = "6";
// iframe.id="idetectiframe";
// function closeForm() {
//     document.getElementById("myForm").style.display = "none";
//     document.body.removeChild(iframe);
// }

// function openForm() {
//   // idiframe=document.getElementById("idetectiframe");
//   document.body.appendChild(iframe);
//   iframe.src="https://storage.googleapis.com/idetect/install.html";
   
//    // iframe.src = "https://storage.cloud.google.com/idetectproject/choose%20image.html";
// }
 
// //  document.getElementById("idetectiframe").style.height =document.getElementById("idetectiframe").contentWindow.document.body.scrollHeight + 'px';
// }, false);
// // document.addEventListener(select, sendMessage, false);
document.addEventListener('click', sendMessage, false);
function sendMessage($event) {
  var wn = document.getElementById('idetectiframe').contentWindow;
  // postMessage arguments: data to send, target origin
  // wn.postMessage('hello! i send message from register for example! (:', 'https://storage.googleapis.com');
  wn.postMessage(event.target.id, 'https://storage.googleapis.com');
}



document.addEventListener("message", receiveMessage, false);
window.addEventListener("message", receiveMessage, false);
if ( window.addEventListener ) {
  window.addEventListener("message", receiveMessage, false);
} else if ( window.attachEvent ) { // ie8
  window.attachEvent('onmessage', receiveMessage);
}
function receiveMessage(event) {
  alert("massage");
  if ($event&& event.origin !== "https://storage.googleapis.com")
    return;
    else
    alert($event.data);
  // ...
}





// const iframe = document.querySelector(".iframe");
// iframe.src = 'https://www.w3schools.com';




var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var iframe = document.createElement("iframe");
iframe.style = "right:50px;bottom:200px;height:500px;width:400px";
iframe.allow = "microphone; camera";
iframe.id="idetectiframe";
// iframe.draggable={handle:".model-header"}
$("#idetectiframe").draggable({
  handle: ".modal-header"
});
$('#idetectiframe').draggable(
  {
        handle: '#idetectiframe',
        cancel: '.popcontent, .popupClose',
        containment: 'window',
        cursor: 'move',
        scroll: false,
        iframeFix: true
  });
//iframe.style.zIndex = "6"

//open add image form in iframe
///function openForm() {
document.body.appendChild(iframe);
    //iframe.src = "https://storage.cloud.google.com/idetectproject/choose%20image.html";
iframe.src = "https://storage.googleapis.com/idetect/install.html";
//}
//close add image form from iframe
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.body.removeChild(iframe);
}
document.getElementById("idetectiframe").addEventListener('onload',function(){
  alert("hello");
  
 //openForm;
 
})