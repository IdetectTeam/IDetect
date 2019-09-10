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
var button = document.createElement("input");
button.type = "image"
button.src = ".\\logo2.png";
button.innerHTML="IDetect"
button.onclick = openForm;
button.style ="position:fixed;right:50px;bottom:50px;height:100px;";
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
    document.body.appendChild(iframe);
    iframe.src = "https://storage.cloud.google.com/idetectproject/choose%20image.html";
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
    date = Date(value);
    return date;
}

function convertToNumber(value)
{
    date = Date(value);
    return date;
}

function tryConvert(value, type) {
    tmp = value;
    length=value.length;
    ind = 0;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            try {
                switch (type) {
                    case 'date': 
                        res=convertToDate(tmp); break;
                    case 'number': 
                        res=convertToNumber(tmp); break;
                }
                return res;
            }
            catch{
                tmp = value.substring(i,length-i-j);
            }
        }}
        return value;
    }

    //get 2 json objects, idFields contains keys-fields in passpord card, values- ids of the fields spesific for this user,
    //and textFields contains keys-fields in passpord card, values-the value of the fields, the id's fields.
    function putDataIntoFields(idFields, textFields) {
        for (k in idFields) {
            //if there is match field 
            if (document.getElementById(idFields[k]) != undefined && textFields[k] != undefined && document.getElementById(idFields[k]) != null && textFields[k] != null)
                //if the field on type date
                if (document.getElementById(idFields[k]).type == "date") {
                    dateVal = tryConvert(textFields[k],'date');
                    if (dateVal instanceof Date)
                        document.getElementById(idFields[k]).value = dateVal;
                }
                //if the field on type radio- for sex
                else if ((idFields[k]).type == "dict" && k == 'gender') {
                    if (textFields[k] == "m" || textFields[k] == "male")
                        document.getElementById(idFields[k]["male"]).checked = true;
                    else
                        document.getElementById(idFields[k]["female"]).checked = true;
                }
                //if the field on type number
                else if (document.getElementById(idFields[k]).type == "number") {
                    numberVal = tryConvert(textFields[k],'number');
                    if (typeof num1 == 'number')
                        document.getElementById(idFields[k]).value = numberVal;
                }
                else 
                     document.getElementById(idFields[k]).value = textFields[k];

        }
    }
