// JavaScript source code

var button = document.createElement("button");
button.innerHTML = "idetect";
button.onclick = openForm;
button.style = "position:fixed;right:50px;bottom:50px;";
button.style.zIndex = "6"

document.body.appendChild(button);

document.write(`<div class="form-popup" id="myForm">
    <form class="form-container">
      <h1>Login</h1>

      <button type="submit" class="btn">Login</button>
      <button type="submit" class="btn cancel" onclick="closeForm()">Close</button>
    </form>
  </div>`);
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
    all[i].style.style = "max-width: 300px; padding: 10px;   background-color: white;";
}

function openForm() {
    document.getElementById("myForm").style.display = "block";

}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    putDataIntoFields({"Passpord Card no":"90","Nationality":"09", "Surname":"Doe", "Given Names":"Doe","Sex":"male", "Date of Birth":"09/09/09", "Place of Birth":"jer"},null);
}

function putDataIntoFields(textFields, idFields) {
    document.getElementsByClassName("id")[0].value = textFields["Passpord Card no"];
    // document.getElementsByClassName("nationality")[0].value = textFields["Nationality"];
    document.getElementsByClassName("first_name")[0].value = textFields["Surname"];
    document.getElementsByClassName("last_name")[0].value = textFields["Given Names"];
//    document.getElementsByClassName("ex")[0].value = textFields["Sex"];
    // document.getElementsByClassName("birth_date")[0].value = textFields["Date of Birth"];
    document.getElementsByClassName("birth_place")[0].value = textFields["Place of Birth"];
debugger;
}