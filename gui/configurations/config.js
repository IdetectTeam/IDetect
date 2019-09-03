var config_fields=new Object();
var passport_usa=new Array("Passpord Card no","Nationality","Surname","Given Names","Sex","Date of Birth","Place of Birth")
var index=-1;
async function set_field(){
 
 e=0;

document.addEventListener("click", function(){
console.log(event.target.id) ;
index++;
config_fields[passport_usa[index]]=event.target.id;
e=1
}); 
}
//   $(document).ready(function() {
//     $("a").click(function(event) {
//         alert(event.target.id);
//     });
// });

async function Field_settings(){
passport_usa.forEach(function(element)  {
alert(element)    ;
console.log("enter of the field "+element);
set_field();
});    
}

Field_settings();
