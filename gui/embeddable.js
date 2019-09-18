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
document.write(`<script src="https://kit.fontawesome.com/021a8707ba.js"></script>`)
document.addEventListener('click', sendMessage, false);
var install_icon = document.createElement("i");
install_icon.style.position = "absolute";
install_icon.style.color = "red";
// install_icon.aria_hidden = "true";
install_icon.style.zIndex = "2"
install_icon.className = "fas fa-id-card";
inConfiguration = false;
install_icon.style.width="15px";
install_icon.style.height="14px";

function sendMessage($event) {
    try {
        var wn = document.getElementById('idetectiframe').contentWindow;
        debugger;
        if (event.target.id!=null && event.target.nodeName=="INPUT") {
            debugger;
            if (inConfiguration) {
                var positionCurrentElement = event.target.getBoundingClientRect()
                install_icon.style.top = (positionCurrentElement.top + 8) + "px"
                install_icon.style.left = positionCurrentElement.left - 20 + "px";
            }
            wn.postMessage(event.target.id, '*');
        }
    }
    catch{ }
}

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


var ajaxScript = document.createElement('script');
ajaxScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
document.head.appendChild(ajaxScript);
// document.write(`<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>`);
var button = document.createElement("input");
button.type = "image"
button.src = ".\\logo2.png";
button.innerHTML = "IDetect"
button.onclick = openOrCloseForm;
button.onfocus = function () {
    button.style = "position:fixed;right:50px;bottom:50px;height:100px;outline:0;"
}
var isIframeOpen = false;
button.style = "position:fixed;right:50px;bottom:50px;height:100px;";
button.style.zIndex = "6"
document.body.appendChild(button);
//create iframe to add image
var iframe = document.createElement("iframe");
iframe.allow = "camera *";
iframe.id = "idetectiframe";
var fieldsFilledAutomatically = [];
function openOrCloseForm() {
    if (isIframeOpen)
        closeForm();
    else
        openForm();
}
//open add image form in iframe
function openForm() {
    // button.classList.add('rotate');
    $.ajax({
        url: "https://europe-west1-idetect-252605.cloudfunctions.net/app/api/hasConfig",
        // send the base64 post parameter
        data: {
            user: document.URL
        },
        // important POST method !
        type: "get",
        success: function (data) {
            iframe.style = "position:fixed;right:50px;bottom:200px;height:500px;width:400px;border-radius:50px;width:300px;border: 4px solid black;";
            iframe.style.zIndex = "6";
            document.body.appendChild(iframe);
            if (data == "true")
                iframe.src = "https://storage.cloud.google.com/idetect-252605.appspot.com/choose%20image.html";
            else {
                iframe.src = "https://storage.cloud.google.com/idetect-252605.appspot.com/install.html";
                isIframeOpen = true;
            }

        }
    });
    // document.body.appendChild(iframe);
    // iframe.src = "https://storage.cloud.google.com/idetectproject/choose%20image.html";
}

//close add image form from iframe
function closeForm() {
    document.body.removeChild(iframe);
    isIframeOpen = false;
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
    debugger;
    if (Object.keys(data).length === 0) {
        inConfiguration = true;
        document.body.appendChild(install_icon);
        return;
    }
    if (data['image'] && data['image'] != null)
        sendImage(data['image']);
    else
        if (data['config'] && data['config'] != null)
            sendConfig(data['config']);
    if (data['fieldToColor'] && data['fieldToColor'] != null)
        color_the_field(data['fieldToColor'], data['status'])
}
function color_the_field(idField, status) {
    document.getElementById(idField).style.boxShadow = "5px yellow"
}


function sendConfig(configSite) {
    configSite = JSON.stringify(configSite);
    json_response = `${configSite}`;
    alert(json_response);
    $.ajax({
        url: "http://127.0.0.1:5000/api/addConfig", //the page containing python script
        data: {
            adress: document.URL.split("?")[0],
            configurationsite: json_response
        },
        type: "POST", //request type,
        success: function (result) {
            console.log(result);
            alert(result);
            config_fields = {};
            json_response = ``;
            //open the idetect after install was succsessfully
            //need to be some fitures of uploading
            iframe.src = "https://storage.cloud.google.com/idetect-252605.appspot.com/choose%20image.html";
            //location.href= "https://storage.googleapis.com/idetect-252605.appspot.com/choose%20image.html"+ location.search;
        }
    });

}

function sendImage(imageToSend) {
    $.ajax({
        url: "http://127.0.0.1:5000/api/args",
        // send the base64 post parameter
        data: {
            user: document.URL.split("?")[0],
            image: imageToSend
        },
        // important POST method !
        type: "get",
        complete: function () {
            try {
                var wn = document.getElementById('idetectiframe').contentWindow;
                wn.postMessage('', '*');
            }
            catch{ }
            imageToSend = "";
        },
        success: function (data) {

            putDataIntoFields(JSON.parse(data['fields']), JSON.parse(data['result']));
        }
    });
}
// Function to be called from iframe
//
function parentFunc(message) {
    alert(message);
}
function convertToDate(value) {

    date = new Date(value);
    month = '' + (date.getMonth() + 1);
    day = '' + date.getDate();
    year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function convertToNumber(value) {
    num = parseInt(value);
    return num;
}

function tryConvert(value, type) {

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
    currentElement.style = "font-weight: bold;font-style: italic;"
    fieldsFilledAutomatically.push(currentElement);
}
function setFieldsToEmpty() {
    for (field in fieldsFilledAutomatically) {
        fieldsFilledAutomatically[field].value = "";
    }
}

//get 2 json objects, idFields contains keys-fields in passpord card, values- ids of the fields spesific for this user,
//and textFields contains keys-fields in passpord card, values-the value of the fields, the id's fields.
function putDataIntoFields(idFields, textFields) {
    if (Object.keys(textFields).length === 0) {
        alert('no field found, please check the image');
        return;
    }
    for (k in idFields) {
        var currentElement = document.getElementById(idFields[k]);
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
