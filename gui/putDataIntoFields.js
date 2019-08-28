<<<<<<< HEAD


function putDataIntoFields(fields)
{
    obj=JSON.stringify(fields);
    document.getElementsByClassName("id")[0].innerHTML=obj["Passpord Card no"];
    document.getElementsByClassName("nationality")[0].innerHTML=obj["Nationality"];
    document.getElementsByClassName("first_name")[0].innerHTML=obj["Surname"];
    document.getElementsByClassName("last_name")[0].innerHTML=obj["Given Names"];
    document.getElementsByClassName("ex")[0].innerHTML=obj["Sex"];
    document.getElementsByClassName("birth_date")[0].innerHTML=obj["Date of Birth"];
    document.getElementsByClassName("birth_place")[0].innerHTML=obj["Place of Birth"];

=======


function putDataIntoFields(fields)
{
    obj=JSON.stringify(fields);
    document.getElementsByClassName("id")[0].innerHTML=obj["Passpord Card no"];
    document.getElementsByClassName("nationality")[0].innerHTML=obj["Nationality"];
    document.getElementsByClassName("first_name")[0].innerHTML=obj["Surname"];
    document.getElementsByClassName("last_name")[0].innerHTML=obj["Given Names"];
    document.getElementsByClassName("ex")[0].innerHTML=obj["Sex"];
    document.getElementsByClassName("birth_date")[0].innerHTML=obj["Date of Birth"];
    document.getElementsByClassName("birth_place")[0].innerHTML=obj["Place of Birth"];

>>>>>>> 22a032bb54a1a1feb266bf7737c71053f33e9719
}