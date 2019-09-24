// var eventc=document.getElementById("camera_btn");
// eventc.addEventListener('click',opencamera())

function opencamera() {
    debugger;
    //alert("hellow camera!")
    window.open('cammera.html');
}
var css = `input[type=date]::-webkit-datetime-edit-text {
        -webkit-appearance: none;
        display: none;
      }
      input[type=date]::-webkit-datetime-edit-month-field{
        -webkit-appearance: none;
        display: none;
      }
      input[type=date]::-webkit-datetime-edit-day-field {
        -webkit-appearance: none;
        display: none;
      }
      input[type=date]::-webkit-datetime-edit-year-field {
        -webkit-appearance: none;
        display: none;
      }`
var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
document.getElementById("dateOfBirth").addEventListener('change', date);
function date() {
    if (document.getElementById("dateOfBirth").value == "") {
        style.appendChild(document.createTextNode(css));
    }
    else {
        style.removeChild(document.createTextNode(css));

        // var css = `input[type=date]::-webkit-datetime-edit-text {
        //     -webkit-appearance: none;
        //     display: inline;
        //   }
        //   input[type=date]::-webkit-datetime-edit-month-field{
        //     -webkit-appearance: unset;
        //     display: inline;
        //   }
        //   input[type=date]::-webkit-datetime-edit-day-field {
        //     -webkit-appearance: unset;
        //     display: inline;
        //   }
        //   input[type=date]::-webkit-datetime-edit-year-field {
        //     -webkit-appearance: unset;
        //     display: inline;
        //   }`
    }


}