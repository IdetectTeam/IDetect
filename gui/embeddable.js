// JavaScript source code
//https:/cdn.jsdelivr.net/npm/sweetalert2@8.17.1/dist/sweetalert2.all.min.js
//sconst Swal = require('sweetalert2')
//import 'sweetalert2/src/sweetalert2.scss'

var button = document.createElement("button");
button.innerHTML = "idetect";
button.onclick = openForm;
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
}
document.getElementsByTagName('head')[0].appendChild(style);

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
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

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
}

