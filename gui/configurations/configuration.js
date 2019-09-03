var config_fields=new Object();
var passport_usa=new Array("Passpord Card no","Nationality","Surname","Given Names","Sex","Date of Birth","Place of Birth")
var index=0;
var length=passport_usa.length;
console.log(length);
var element=new Object();
document.addEventListener("click", function(){
    console.log(event.target.id) ;
   // index++;
  //  config_fields[passport_usa[index]]=event.target.id;
  element=event.target;
    }); 


//   $(document).ready(function() {
//     $("a").click(function(event) {
//         alert(event.target.id);
//     });
// });

async function Field_settings(){
   // var myDiv = document.getElementById("body"); 
              
            // creating checkbox element 
            var checkbox = document.createElement('input'); 
              
            // Assigning the attributes 
            // to created checkbox 
            checkbox.type = "checkbox"; 
            checkbox.name = "name"; 
            checkbox.value = "value"; 
            checkbox.id = "id"; 
            checkbox.checked=false;  
            checkbox.click=false;
            // creating label for checkbox 
            var label = document.createElement('label'); 
              
            // assigning attributes for  
            // the created label tag  
            label.htmlFor = "id";  
            // appending the created text to  
            // the created label tag  
            label.appendChild(document.createTextNode('This is the   label for checkbox.')); 
                            
              
            // appending the checkbox 
            // and label to div 
           
            //myDiv.appendChild(checkbox); 
            //myDiv.appendChild(label); 
            //create a p input
            var x = document.createElement("P");
            x.id="manual";
            var t = document.createTextNode("The manual!");
            t.id="manualp";
            x.appendChild(t);
            document.body.appendChild(x);

            document.body.appendChild(checkbox);
            document.body.appendChild(label);
            document.getElementById("manual").innerHTML="click of the field "+ passport_usa[index];
// passport_usa.forEach(function(element)  {

// document.getElementById("manual").innerHTML="enter of the field "+element;
// console.log("enter of the field "+element);

// });    
}
async function set_field(){
    debugger
if(index<length&&this.target.checked==true){
    config_fields[passport_usa[index]]=this.id;
    flag=true;
    index++;
    document.getElementById("manual").innerHTML="click of the field "+ passport_usa[index];

}

   }
Field_settings();

document.getElementById("manual").addEventListener("click",set_field(element.target));
    