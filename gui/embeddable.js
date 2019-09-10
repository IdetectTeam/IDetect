// JavaScript source code
//https:/cdn.jsdelivr.net/npm/sweetalert2@8.17.1/dist/sweetalert2.all.min.js
//sconst Swal = require('sweetalert2')
//import 'sweetalert2/src/sweetalert2.scss'

//create idetect button
// var style = document.createElement('style');
// style.innerHTML = `
// .rotate{-webkit-animation:spin 4s linear 0.5s;}
// @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
// @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
// @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } 
// `;
// document.head.appendChild(style);
document.write(`<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>`);
var button = document.createElement("input");
button.type = "image"
button.src = ".\\logo2.png";
button.innerHTML = "IDetect"
button.onclick = openForm;
button.style = "position:fixed;right:50px;bottom:50px;height:100px;";
button.style.zIndex = "6"
document.body.appendChild(button);
//create iframe to add image
var iframe = document.createElement("iframe");
iframe.style = "position:fixed;right:50px;bottom:200px;height:500px;width:400px;border-radius:50px;width:300px;border: 4px solid #ed2553;";
iframe.allow = "microphone; camera";
iframe.style.zIndex = "6"

//open add image form in iframe
function openForm() {
    // button.classList.add('rotate');
    $.ajax({
        url: "http://127.0.0.1:5000/api/hasConfig",
        // send the base64 post parameter
        data: {
            user: document.location.origin
             },
        // important POST method !
        type: "get",
        success: function (data) {
            document.body.appendChild(iframe);
            if (data=="true")
            iframe.src = "https://storage.cloud.google.com/idetectproject/choose%20image.html";
            else
            iframe.src = "https://storage.cloud.google.com/try-project-251207-vcm/install.html";
        }
    });
    // document.body.appendChild(iframe);
    // iframe.src = "https://storage.cloud.google.com/idetectproject/choose%20image.html";
}

//close add image form from iframe
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.body.removeChild(iframe);
}

//listening to messege from iframe- choosen an image
if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);
}
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}
function onMessage(event) {
    // Check sender origin to be trusted
    // if (event.origin !== "https://00e9e64bacfbae46da76bae8f75f324e40f94f374d51027527-apidata.googleusercontent.com")alert("nononno"); return;
    var data = event.data;
    putDataIntoFields(JSON.parse(data['config']), JSON.parse(data['values']));
}

// Function to be called from iframe
//
function parentFunc(message) {
    alert(message);
}
function convertToDate(value)
{
    debugger;
    date = Date(value);
    return date;
}

function convertToNumber(value)
{
    num = parseInt(value);
    return num;
}

function tryConvert(value, type) {
    debugger;
    tmp = value;
    length = value.length;
    ind = 0;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            try {
                switch (type) {
                    case 'date':
                        res = convertToDate(tmp); break;
                    case 'number':
                        res = convertToNumber(tmp); break;
                }
                return res;
            }
            catch{
                tmp = value.substring(i, length - i - j);
            }
        }
    }
    return value;
}

function markField(currentElement) {
   currentElement.style="font-weight: bold;    font-style: italic;   "
}

//get 2 json objects, idFields contains keys-fields in passpord card, values- ids of the fields spesific for this user,
//and textFields contains keys-fields in passpord card, values-the value of the fields, the id's fields.
function putDataIntoFields(idFields, textFields) {
    for (k in idFields) {
        var currentElement=document.getElementById(idFields[k]);
        //if there is match field 
        if (currentElement != undefined && textFields[k] != undefined && currentElement != null && textFields[k] != null)
            //if the field on type date
            if (currentElement.type == "date") {
                dateVal = tryConvert(textFields[k], 'date');
                    currentElement.value = dateVal;
                    markField(currentElement);
            }
            //if the field on type radio- for sex
            else if ((idFields[k]).type == "dict" && k == 'gender') {
                if (textFields[k] == "m" || textFields[k] == "male")
                    document.getElementById(idFields[k]["male"]).checked = true;
                else
                    document.getElementById(idFields[k]["female"]).checked = true;
                markField(currentElement);
            }
            //if the field on type number
            else if (currentElement.type == "number") {
                numberVal = tryConvert(textFields[k], 'number');
                    currentElement.value = numberVal;
                    markField(currentElement);
            }
            else {
                currentElement.value = textFields[k];
                markField(currentElement);
            }
    }
}
