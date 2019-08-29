// var fileSelector = document.createElement('input');
// fileSelector.setAttribute('type', 'file');

// var selectDialogueLink = document.createElement('a');
// selectDialogueLink.setAttribute('href', '');
// selectDialogueLink.innerText = "Select File";

// selectDialogueLink.onclick = function () {
//      fileSelector.click();
//      return false;
// }

// document.body.appendChild(selectDialogueLink);
var div = document.createElement('div');
return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)
return 'FormData' in window;


