// JavaScript source code
var button = document.createElement("input");
button.type = "image"
button.src = ".\\logo2.png";
button.onclick = openForm;
button.style = "position:fixed;right:50px;bottom:50px;height:100px";
button.style.zIndex = "6"

document.body.appendChild(button);
var iframe = document.createElement("iframe");
iframe.style = "position:fixed;right:50px;bottom:200px;height:500px;width:400px";
iframe.allow = "microphone; camera";
iframe.style.zIndex = "6"
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.body.removeChild(iframe);
}

function openForm() {
    document.body.appendChild(iframe);
    iframe.src = "https://storage.cloud.google.com/idetectproject/choose%20image.html";
}
function submitForm() {
    debugger;
    putDataIntoFields({ "PasspordCardno": "id", "Nationality": "nationality", "Surname": "last_name", "GivenNames": "first_name", "Sex": "sex", "DateofBirth": "birth_date", "PlaceofBirth": "birth_place" }, { "PasspordCardno": "90", "Nationality": "09", "Surname": "Doe", "GivenNames": "Doe", "Sex": "male", "DateofBirth": "09/09/09", "PlaceofBirth": "jer" });
}
if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);
}
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

function onMessage(event) {
    debugger;
    // Check sender origin to be trusted
    // if (event.origin !== "https://00e9e64bacfbae46da76bae8f75f324e40f94f374d51027527-apidata.googleusercontent.com")alert("nononno"); return;
    var data = event.data;
    putDataIntoFields(JSON.parse(data['config']), JSON.parse(data['values']));
}

// Function to be called from iframe
function parentFunc(message) {
    alert(message);
}

function tryConvertToDate(value)
{
    // tmp = value;
    // date=null;
    // ind=0;
    // while(tmp){
    //     try{
    //         date = Date(tmp);
    //         return date;
    //     }
    //     finally{
    //         tmp=tmp.substring(ind++);
    //     }
    // }
    // tmp=value;
    // return date;
}

function putDataIntoFields(idFields, textFields) {
    for (k in idFields) {
        if (document.getElementById(idFields[k]) != undefined && textFields[k] != undefined && document.getElementById(idFields[k]) != null && textFields[k] != null)
            if(document.getElementById(idFields[k]).type=="date")
            {
                dateVal=tryConvertToDate(textFields[k]);
                if(dateVal)
                document.getElementById(idFields[k]).value = dateVal;
            }
            else
                document.getElementById(idFields[k]).value = textFields[k];
    }
}
