
//add script files and sources
document.write(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">â€`)
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.head.appendChild(script);
var ajaxScript = document.createElement('script');
ajaxScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
document.head.appendChild(ajaxScript);
//vars
var inConfiguration = false;
var isIframeOpen = false;
var fieldsFilledAutomatically = [];

//create install_icon
var install_icon = document.createElement("i");
install_icon.style="position:absolute;color:red;zIndex:100000;width:15px;height:14px";
install_icon.className='fa fa-id-card'


//create buttonOpenIframe
var IForButton = document.createElement("i");   
var buttonOpenIframe = document.createElement("button");   
IForButton.className ="fa fa-id-card";
IForButton.style.fontSize="40px";
buttonOpenIframe.appendChild(IForButton);
buttonOpenIframe.style="border-radius: 50%;background-color:rgb(245, 242, 229);bottom: 30px;right: 30px;position: fixed;z-index: 10000000;width: 80px;height: 80px;border: aliceblue;"
buttonOpenIframe.onclick = openOrCloseForm;
buttonOpenIframe.onfocus = function () {
    buttonOpenIframe.style="outline:0;border-radius: 50%;background-color:rgb(245, 242, 229);bottom: 30px;right: 30px;position: fixed;z-index: 10000000;width: 80px;height: 80px;border: aliceblue;"
 }
 document.body.appendChild(buttonOpenIframe);

//create iframe to add image
var divIframe = document.createElement("div");
var iframe = document.createElement("iframe");
iframe.id = "idetectiframe";
iframe.allow = "camera *";

document.addEventListener('click', sendMessage, false);
function sendMessage($event) {
    try {
        var wn = document.getElementById('idetectiframe').contentWindow;
        if (event.target.id!=null && event.target.nodeName=="INPUT") {
            debugger;
            if (inConfiguration) {
                var positionCurrentElement = event.target.getBoundingClientRect()
               
                install_icon.style.top = (event.target.getBoundingClientRect().top+document.getElementById('idetectiframe').contentWindow.parent.scrollY)+"px";
                install_icon.style.left = positionCurrentElement.left - 20 + "px";
            }
        wn.postMessage(event.target.id, '*');
        }
    }
    catch{ }
}
function openOrCloseForm() {
    if (isIframeOpen==true)
        closeForm();
    else
        openForm();
}
//open add image form in iframe
function openForm() {
    // button.classList.add('rotate');
    $.ajax({
        //url: "http://127.0.0.1:5000/api/hasConfig",
         url: "https://europe-west1-idetect-252605.cloudfunctions.net/hasConfig/api/hasConfig",
        // send the base64 post parameter
        data: {
            user: document.URL
        },
        // important POST method !
        type: "get",
        success: function (data) {
        //  iframe.style = "position:fixed;right:50px;bottom:200px;height:500px;width:400px;border-radius:50px;width:300px;border: 4px solid black;";
        //open iframe
        iframe.style = "z-index:10000000;bottom:110px;right:20px;position:fixed;height:450px;;border-radius:20px;border: 1px solid aliceblue";
        document.body.appendChild(divIframe);
        divIframe.appendChild(iframe);
            if (data == "true")
                iframe.src = "https://storage.cloud.google.com/idetect-252605.appspot.com/choose%20image.html";
            else {
                iframe.src = "https://storage.cloud.google.com/idetect-252605.appspot.com/install.html";
            }
        }
    });     
    isIframeOpen = true;
}

//close add image form from iframe
function closeForm() {
    divIframe.removeChild(iframe);
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
       // url: "http://127.0.0.1:5000/api/addConfig", 
         url: "https://europe-west1-idetect-252605.cloudfunctions.net/addConfig/api/addConfig",     
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
    setFieldsToEmpty();
    $.ajax({
        //url: "http://127.0.0.1:5000/api/args",
         url: "https://europe-west1-idetect-252605.cloudfunctions.net/detectImg/api/args",
        // send the base64 post parameter
        data: {
            user: document.URL.split("?")[0],
            image: imageToSend
        },
        // important POST method !
        type: "POST",
        complete: function () {
            try {
                var wn = document.getElementById('idetectiframe').contentWindow;
                wn.postMessage('', '*');
            }
            catch{ }
            imageToSend = "";
        },
        success: function (data) {
          
            alert('fields====='+data['fields']+'   '+'result============'+data['result']);

            putDataIntoFields(JSON.parse(data['fields']), JSON.parse(data['result']));
        }
    });
}
// // Function to be called from iframe
// function parentFunc(message) {
//     alert(message);
// }
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
var count=9999;
function markField(currentElement) {

    currentElement.style = "font-weight: bold;font-style: italic;"
    var positionCurrentElement = currentElement.getBoundingClientRect()
    var icon = document.createElement("i");   
    icon.style.position="absolute";
    //var win = document.getElementById('idetectiframe').contentWindow;
    icon.style.top = (currentElement.getBoundingClientRect().top+document.getElementById('idetectiframe').contentWindow.parent.scrollY)+"px";
    console.log("curr"+currentElement.getBoundingClientRect().bottom+"??"+document.getElementById('idetectiframe').contentWindow.parent.scrollY);
    //(positionCurrentElement.bottom-8)+"px";//-win.parent.scrollY -1*
    icon.style.color ="red";
    icon.style.left=icon.style.left =currentElement.getBoundingClientRect().left+"px"//positionCurrentElement.left-20+"px";//+win.parent.scrollX
    console.log(icon.style.bottom,icon.style.left);
    icon.className ="fa fa-id-card";
    icon.aria_hidden="true";
    icon.style.zIndex = count;
    count+=1;
    document.body.appendChild(icon);
     
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
    var title1 = new TimelineMax();
    title1.staggerFromTo("input", 0.5, 
    {ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80},
    {ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0}, 0.05);

    
}