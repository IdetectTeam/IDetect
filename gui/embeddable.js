// JavaScript source code
var button = document.createElement("input");
button.type="image"
button.src = ".\\logo2.png";
button.onclick = openForm;
button.style = "position:fixed;right:50px;bottom:50px;height:100px";
button.style.zIndex = "6"

document.body.appendChild(button);
var iframe=document.createElement("iframe");
iframe.id= "idetectiframe";
iframe.style = "position:fixed;right:50px;bottom:50px;height:500px";
iframe.allow="microphone; camera";
iframe.style.zIndex = "6"

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.body.removeChild(iframe);
}

function openForm() {
    document.body.appendChild(iframe);
    iframe.src="https://storage.cloud.google.com/idetectproject/chooseFile.html";
}
function submitForm() {
    debugger;
    putDataIntoFields({"PasspordCardno":"id","Nationality":"nationality", "Surname":"last_name", "GivenNames":"first_name","Sex":"sex", "DateofBirth":"birth_date", "PlaceofBirth":"birth_place"},{"PasspordCardno":"90","Nationality":"09", "Surname":"Doe", "GivenNames":"Doe","Sex":"male", "DateofBirth":"09/09/09", "PlaceofBirth":"jer"});
}

function putDataIntoFields(idFields,textFields) {
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
