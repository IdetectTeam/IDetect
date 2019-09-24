
//add script files and sources
document.write(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">`)
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
var dataToInstallation;
var flagToOpenIframe = true;
var fieldMarked = []
var countIcons = 9999;

//create install_icon
var install_icon = document.createElement("i");
install_icon.style = "position:absolute;color:red;zIndex:100000;width:15px;height:14px";
install_icon.className = 'fa fa-id-card'
install_icon.hidden = true;

//create buttonOpenIframe
var IForButton = document.createElement("i");
var buttonOpenIframe = document.createElement("button");
IForButton.className = "fa fa-id-card";
IForButton.style.fontSize = "40px";
buttonOpenIframe.appendChild(IForButton);
buttonOpenIframe.style = "border-radius: 50%;background-color:rgb(245, 242, 229);bottom: 30px;right: 30px;position: fixed;z-index: 10000000;width: 80px;height: 80px;border: aliceblue;"
buttonOpenIframe.onclick = openOrCloseForm;
buttonOpenIframe.onfocus = function () {
    buttonOpenIframe.style = "outline:0;border-radius: 50%;background-color:rgb(245, 242, 229);bottom: 30px;right: 30px;position: fixed;z-index: 10000000;width: 80px;height: 80px;border: aliceblue;"
}
document.body.appendChild(buttonOpenIframe);
buttonOpenIframe.hidden = true;

//create iframe to add image or installation
var divIframe = document.createElement("div");
var iframe = document.createElement("iframe");
iframe.id = "idetectiframe";
iframe.allow = "camera *";

PrepareIframe();

document.addEventListener('click', sendInputId, false);
//send id of input field that installer choose
function sendInputId($event) {
    try {
        var wn = document.getElementById('idetectiframe').contentWindow;
        if (event.target.id != null && event.target.nodeName == "INPUT") {
            if (inConfiguration) {
                install_icon.hidden = false;
                var positionCurrentElement = event.target.getBoundingClientRect()
                install_icon.style.top = (event.target.getBoundingClientRect().top + document.getElementById('idetectiframe').contentWindow.parent.scrollY) + "px";
                install_icon.style.left = positionCurrentElement.left - 20 + "px";
            }
            wn.postMessage(event.target.id, '*');
        }
    }
    catch (error) {
        console.log("error to send message " + error);
    }
}

//laud page to iframe (install or add image)
function PrepareIframe() {
    $.ajax({
        // url: "http://127.0.0.1:5000/api/hasConfig",
        url: "https://europe-west1-idetect-252605.cloudfunctions.net/hasConfig/api/hasConfig",
        // send the base64 post parameter
        data: {
            user: document.URL
        },
        // important POST method !
        type: "GET",
        success: function (data) {
            //open iframe
            iframe.style = "z-index:10000000;bottom:110px;right:20px;position:fixed;height:450px;;border-radius:20px;border: 1px solid aliceblue";
            document.body.appendChild(divIframe);
            divIframe.appendChild(iframe);
            divIframe.hidden = true;
            dataToInstallation = data;
            buttonOpenIframe.hidden = false;
            if (data == "true")
                iframe.src = "https://storage.cloud.google.com/idetect-252605.appspot.com/choose%20image.html";
            else {
                iframe.src = "https://storage.cloud.google.com/idetect-252605.appspot.com/install.html";
            }
        }
    });
}


function openOrCloseForm() {
    if (flagToOpenIframe) {
        flagToOpenIframe = false;
        debugger;
        if (dataToInstallation != "true") {//if open installation
            document.body.appendChild(install_icon);
            var wn = document.getElementById('idetectiframe').contentWindow;
            wn.postMessage(dataToInstallation, '*');
        }
        divIframe.hidden = !divIframe.hidden;
    }
    else {
        flagToOpenIframe = true;
        divIframe.hidden = !divIframe.hidden;
        for (var iconM of fieldMarked) {
            document.body.removeChild(iconM);
        }
        if (dataToInstallation != "true" && divIframe.hidden == true)//close instalation
        {
            document.body.removeChild(install_icon);
            install_icon.hidden = true;
        }
    }

    //listening to message from iframe- choose image
    if (window.addEventListener) {
        window.addEventListener("message", sendData, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onmessage", sendData, false);
    }

    function sendData(event) {
        //Check sender origin to be trusted
        // if (event.origin !== "https://storage.cloud.google.com/idetect-252605.appspot.com/choose%20image.html?authuser=0")
        // return;
        var data = event.data;
        if (Object.keys(data).length === 0) {
            inConfiguration = true;
            return;
        }
        if (data['image'] && data['image'] != null)//if send image
            sendImage(data['image']);
        else
            if (data['config'])//if send config
            {
                document.body.removeChild(install_icon);
                if (data['config'] != null)
                    sendConfig(data['config']);
            }
        // if (data['fieldToColor'] && data['fieldToColor'] != null)
        //     color_the_field(data['fieldToColor'], data['status'])
    }


    // function color_the_field(idField, status) {
    //     document.getElementById(idField).style.boxShadow = "5px yellow"
    // }

    //send configurataion after installation
    function sendConfig(configSite) {
        configSite = JSON.stringify(configSite);
        json_response = `${configSite}`;
        $.ajax({
            //url: "http://127.0.0.1:5000/api/addConfig",
            url: "https://europe-west1-idetect-252605.cloudfunctions.net/addConfig/api/addConfig",
            data: {
                adress: document.URL.split("?")[0],
                configurationsite: json_response
            },
            type: "POST", //request type,
            success: function (result) {
                console.log(result);
                config_fields = {};
                json_response = ``;

                //open the idetect after install was succsessfully
                iframe.src = "https://storage.cloud.google.com/idetect-252605.appspot.com/choose%20image.html";
            }
        });

    }
    //send image
    function sendImage(imageToSend) {
        setFieldsToEmpty();
        $.ajax({
            // url: "http://127.0.0.1:5000/api/args",
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
                catch (error) {
                    console.log(error);
                }
                imageToSend = "";
            },
            success: function (data) {
                putDataIntoFields(JSON.parse(data['fields']), JSON.parse(data['result']));
            }
        });
    }

    function convertToDate(value) {
        debugger;
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
    //try yo convert date
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
    //mark field that fill
    function markField(currentElement) {
        currentElement.style = "font-weight: bold;font-style: italic;"
        var positionCurrentElement = currentElement.getBoundingClientRect()
        var icon = document.createElement("i");
        icon.style = "position:absolute;color:red;";
        icon.style.top = (currentElement.getBoundingClientRect().top + document.getElementById('idetectiframe').contentWindow.parent.scrollY) + "px";
        icon.style.left = (currentElement.getBoundingClientRect().left + document.getElementById('idetectiframe').contentWindow.parent.scrollX) + "px";
        icon.className = "fa fa-id-card";
        icon.aria_hidden = "true";
        icon.style.zIndex = countIcons;
        countIcons += 1;
        document.body.appendChild(icon);
        fieldMarked.push(icon);
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
            var wn = document.getElementById('idetectiframe').contentWindow;
            wn.postMessage("show swal", '*');
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
    var title1 = new TimelineMax();
    title1.staggerFromTo("input", 0.5,
        { ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80 },
        { ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0 }, 0.05);
}