// JavaScript source code

window.onload = function () {
    debugger;
    var button = document.createElement("button");
    button.innerHTML = "idetect";
    button.onclick = openForm;
    button.style = "position:fixed;right:50px;bottom:50px;";
    button.style.zIndex = "6"

    document.body.appendChild(button);

   

/*
 var all = document.getElementsByClassName('open-button');
 for (var i = 0; i < all.length; i++) {
   all[i].style="background-color: #555; color: white; padding: 16px 20px; border: none; cursor: pointer; position: fixed; bottom: 23px; right: 28px; width: 280px";
 }*/
var all = document.getElementsByClassName('form-popup');
for (var i = 0; i < all.length; i++) {
    all[i].style = "background-color: #555;display: none; position: fixed; bottom: 0; right: 15px; border: 3px solid #f1f1f1; z-index: 9;";
}
var all = document.getElementsByClassName('form-container');
for (var i = 0; i < all.length; i++) {
    all[i].style = "max-width: 300px; padding: 10px;   background-color: white;";
}

  
}
async function closeForm() {
     document.write(`<div class="form-popup" id="myForm">
    <form class="form-container">
      <h1>Login</h1>

      <button type="submit" class="btn" onclick="submitForm()">Login</button>
      <button type="submit" class="btn cancel" onclick="closeForm()">Close</button>
    </form>
  </div>`);
   await document.getElementById("myForm").style.display = "none";
}

function openForm() {
    document.getElementById("myForm").style.display = "block";

}
function submitForm() {
    debugger;
    putDataIntoFields({ "PasspordCardno": "id", "Nationality": "nationality", "Surname": "last_name", "GivenNames": "first_name", "Sex": "sex", "DateofBirth": "birth_date", "PlaceofBirth": "birth_place" }, { "PasspordCardno": "90", "Nationality": "09", "Surname": "Doe", "GivenNames": "Doe", "Sex": "male", "DateofBirth": "09/09/09", "PlaceofBirth": "jer" });
}

function putDataIntoFields(idFields, textFields) {
    debugger;
    document.getElementsByClassName(idFields["PasspordCardno"])[0].value = textFields["PasspordCardno"];
    // document.getElementsByClassName(idFields["Nationality"])[0].value = textFields["Nationality"];
    document.getElementsByClassName(idFields["Surname"])[0].value = textFields["Surname"];
    document.getElementsByClassName(idFields["GivenNames"])[0].value = textFields["GivenNames"];
    //    document.getElementsByClassName(idFields["Sex"])[0].value = textFields["Sex"];
    // document.getElementsByClassName(idFields["DateofBirth"])[0].value = textFields["DateofBirth"];
    document.getElementsByClassName(idFields["PlaceofBirth"])[0].value = textFields["PlaceofBirth"];
    debugger;
}
