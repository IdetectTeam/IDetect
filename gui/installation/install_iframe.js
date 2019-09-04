const getGeneratedPageURL = ({ html, css, js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  const cssURL = getBlobURL(css,'https://storage.googleapis.com/idetect/install.css')
  const jsURL = getBlobURL(js, 'https://storage.googleapis.com/idetect/install.js')
//   const htmlURL=getBlobURL(html,'https://storage.googleapis.com/idetect/install.html')
  const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}"></script>`}
      </head>
      <body>
        ${html || ''}
      </body>
    </html>
  `

  return getBlobURL(source, 'https://storage.googleapis.com/idetect/install.html')
}

// const url = getGeneratedPageURL({
//   html: '<p>Hello, world!</p>',
//   css: 'p { color: blue; }',
//   js: 'console.log("hi")'
// })

document.addEventListener('DOMContentLoaded', function() {
  idiframe=document.getElementById("idetectiframe");
 idiframe.src="https://storage.googleapis.com/idetect/install.html";
//  document.getElementById("idetectiframe").style.height =document.getElementById("idetectiframe").contentWindow.document.body.scrollHeight + 'px';
}, false);
document.addEventListener('click',function(){
  var wn = document.getElementById('idetectiframe').contentWindow;
  // postMessage arguments: data to send, target origin
  // wn.postMessage('hello! i send message from register for example! (:', 'https://storage.googleapis.com');
  wn.postMessage(event.target.id, 'https://storage.googleapis.com');
})



//document.addEventListener("message", receiveMessage, false);
//window.addEventListener("message", receiveMessage, false);
// if ( window.addEventListener ) {
//   window.addEventListener("message", receiveMessage, false);
// } else if ( window.attachEvent ) { // ie8
//   window.attachEvent('onmessage', receiveMessage);
// }
// function receiveMessage(event) {
//   alert("massage");
//   if ($event&& event.origin !== "https://storage.googleapis.com")
//     return;
//     else
//     alert($event.data);
//   // ...
// }



// document.getElementById("idetectiframe").addEventListener('onload',function(){
//   debugger;
 
 
// })

// const iframe = document.querySelector(".iframe");
// iframe.src = 'https://www.w3schools.com';