// JavaScript source code
//https:/cdn.jsdelivr.net/npm/sweetalert2@8.17.1/dist/sweetalert2.all.min.js
//sconst Swal = require('sweetalert2')
//import 'sweetalert2/src/sweetalert2.scss'

//create idetect button
var button = document.createElement("input");
button.type = "image"
button.src = ".\\logo2.png";
button.onclick = openForm;
<<<<<<< HEAD
button.classList += 'open-button';

document.body.appendChild(button);

document.write(`
    <div class="form-popup" id="myForm">
        <form class="form-container">
            <h1>Login</h1>
            <button type="submit" class="btn" onclick="submitForm()">Login</button> 
            <button type="submit" class="btn cancel" onclick="closeForm()">Close</button>
        </form>
    </div>
`);
var css = `
.open-button{
    background-color: #555;
    border-radius: 50%;
    color: white;
     padding: 16px 20px;
      border: none;
       cursor: pointer;
     position: fixed;
      bottom: 23px; 
      right: 28px; 
      width: 120px;
      zIndex=10000;
}
.form-popup{
    background-color: #555;
    display: none;
     position: fixed;
     bottom: 0; 
    right: 15px;
     border: 3px solid #f1f1f1;
      z-index: 1000s;
}
.form-container{
    max-width: 300px;
    padding: 10px;
    background-color: white;
}`;
var style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
=======
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
>>>>>>> ba47e2382e00b89a99f7a9d117633a5812b6e27d
}
document.getElementsByTagName('head')[0].appendChild(style);

<<<<<<< HEAD
async function sendGent (){
    const url = 'http://127.0.0.1:5000//api/args?user=111&image=http:/adslfkjalakjd'; // the URL to send the HTTP request to
    const body = ''; // whatever you want to send in the body of the HTTP request
    const headers = { 'Content-Type': 'application/json' }; // if you're sending JSON to the server
    const method = 'GET';
    const response = await fetch(url, { method, body, headers });
    debugger;
    const data = await response; // or response.json() if your server returns JSON
    debugger;
    console.log(data.text());
}
function sendGet(){
    const url = 'http://127.0.0.1:5000//api/args?user=111&image=http:/adslfkjalakjd'; // the URL to send the HTTP request to
    var opts = {
        method: 'GET',      
        headers: {}
      };
      fetch(url, opts).then(function (response) {
          debugger;
        return response.json();
      })
      .then(function (body) {
        //doSomething with body;
      });
}
=======
//close add image form from iframe
>>>>>>> ba47e2382e00b89a99f7a9d117633a5812b6e27d
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.body.removeChild(iframe);
}

<<<<<<< HEAD
function openForm() {

    /*
        Swal.fire({
            title: '<strong>HTML <u>example</u></strong>',
            type: 'info',
            html:
              'You can use <b>bold text</b>, ' +
              '<a href="//sweetalert2.github.io">links</a> ' +
              'and other HTML tags',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down'
          })
    */
   document.getElementById("myForm").style.display = "block";

}

function submitForm() {
    debugger;
    sendGet();
    putDataIntoFields({ "PasspordCardno": "id", "Nationality": "nationality", "Surname": "last_name", "GivenNames": "first_name", "Sex": "sex", "DateofBirth": "birth_date", "PlaceofBirth": "birth_place" }, { "PasspordCardno": "90", "Nationality": "09", "Surname": "Doe", "GivenNames": "Doe", "Sex": "male", "DateofBirth": "09/09/09", "PlaceofBirth": "jer" });
}

function putDataIntoFields(idFields, textFields) {
    document.getElementById("myForm").style.display = "none";

    document.getElementsByClassName(idFields["PasspordCardno"])[0].value = textFields["PasspordCardno"];
    // document.getElementsByClassName(idFields["Nationality"])[0].value = textFields["Nationality"];
    document.getElementsByClassName(idFields["Surname"])[0].value = textFields["Surname"];
    document.getElementsByClassName(idFields["GivenNames"])[0].value = textFields["GivenNames"];
    //    document.getElementsByClassName(idFields["Sex"])[0].value = textFields["Sex"];
    // document.getElementsByClassName(idFields["DateofBirth"])[0].value = textFields["DateofBirth"];
    document.getElementsByClassName(idFields["PlaceofBirth"])[0].value = textFields["PlaceofBirth"];
    debugger;
=======
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
>>>>>>> ba47e2382e00b89a99f7a9d117633a5812b6e27d
}

