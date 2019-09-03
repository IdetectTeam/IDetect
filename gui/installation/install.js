
var index=-1;
var config_fields=new Object();
var passport_usa=new Array("Passpord Card no","Nationality","Surname","Given Names","Sex","Date of Birth","Place of Birth")
var length=passport_usa.length;
var elm=new Object();
// $('#my-modal').modal('show')
//               .draggable();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("manual").innerHTML="please follow the instructions!";
    index=-1;
    $(".modal-dialog").draggable({
        handle: ".modal-header"
    });
    document.getElementById("nextbtn").addEventListener('click',function(){
        if(index<passport_usa.length-1){
            index++;
            document.getElementById("manual").innerHTML=`click on field ${passport_usa[index]}`;
        }
        else{
            // document.getElementById("nextbtn").style.display=this.hidden;
        }
    })
    document.getElementById("prevbtn").addEventListener('click',function(){
        if(index>0){
            index--;
            document.getElementById("manual").innerHTML=`click on field ${passport_usa[index]}`;
        }
       else{
        // document.getElementById("nextbtn").style.display="hidden";
       }
    
    
    })
}, false);



