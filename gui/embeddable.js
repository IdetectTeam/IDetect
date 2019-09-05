// JavaScript source code

//create idetect button
var button = document.createElement("input");
button.type = "image"
button.src = ".\\logo2.png";
button.onclick = openForm;
button.style = "position:fixed;right:50px;bottom:50px;height:100px";
button.style.zIndex = "6"
document.body.appendChild(button);

//create iframe to add image
var iframe = document.createElement("iframe");
iframe.style = "position:fixed;right:50px;bottom:200px;height:500px;width:400px";
iframe.allow = "microphone; camera";
iframe.style.zIndex = "6"

//open add image form in iframe
function openForm() {
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
    debugger;
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

//get 2 json objects, idFields contains keys-fields in passpord card, values- ids of the fields spesific for this user,
//and textFields contains keys-fields in passpord card, values-the value of the fields, the id's fields.
function putDataIntoFields(idFields, textFields) {
    for (k in idFields) {
        //if there is match field 
        if (document.getElementById(idFields[k]) != undefined && textFields[k] != undefined && document.getElementById(idFields[k]) != null && textFields[k] != null)
            //if the field on type date
            if(document.getElementById(idFields[k]).type=="date")
            {
                dateVal=tryConvertToDate(textFields[k]);
                if(dateVal)
                document.getElementById(idFields[k]).value = dateVal;
            }
        //if the field on type radio- for sex
            else if(idFields[k]instanceof'dictionary'&&k=='gender')
            {
                if(textFields[k]=="m"||textFields[k]=="male")
                    document.getElementById(idFields[k]["male"]).checked = true;
                else
                    document.getElementById(idFields[k]["female"]).checked = true;
            }
        //if the field on type number
            else if(document.getElementById(idFields[k]).type=="number")
            {
                document.getElementById(idFields[k]).value=parseInt(textFields[k]);
            }
            else
                document.getElementById(idFields[k]).value = textFields[k];

    }
}
