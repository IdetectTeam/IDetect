
var index = -1;
var config_fields = {};
var passport_usa = new Array('Passpord Card no', 'Nationality', 'Surname', 'Given Names', 'Sex', 'Date of Birth',
    'Place of Birth');
var length = passport_usa.length;
var elm = new Object();
var dict = {};
var sex = {};
var json_response;
var originsite;
var about=0;


window.addEventListener('message', receiveMessage, false);


function receiveMessage($event) {


    elm = $event.data;
    // if (index == 0) {
    // json_response = `site{${$event.origin}`;
    originsite = `${$event.origin}`;
    // }

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("aboutButton").addEventListener('click',function () {
        about++;
        if (about %2== 1) {
            document.getElementById("about").style.display = "inline";
        }
        else {
            document.getElementById("about").style.display = "none";

        }
    })
    $("#myModal").modal('show');
    document.getElementById("manual").innerHTML = "please follow the instructions!";
    index = -1;
    // $(".modal-dialog").draggable({
    //     handle: ".modal-header"
    // });
    document.getElementById("nextbtn").addEventListener('click', function () {
        if (index < passport_usa.length - 1) {
            index++;
            window.parent.postMessage({
                'fieldToColor':elm,
                'status':"yes"
            }, "*");
            // if (elm == '') {
            //     document.getElementById("manual").innerHTML = `click on field <b>${passport_usa[index]}</b>`;
            //     return;
            // }

            if (index > -1) {
                if ("gender" == passport_usa[index]||"Sex" == passport_usa[index]) {
                    config_fields[passport_usa[index - 1]] = elm;
                    Swal.fire({
                        title: 'gender',
                        text: "Are you have radio button for gender field?",
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: 'rgb(97, 95, 95)',
                        cancelButtonColor: 'rgb(129, 126, 126)',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.value) {
                            passport_usa.splice(index, 1, "male", "female");
                            document.getElementById("manual").innerHTML = `click on field <b>${passport_usa[index]}</b>`;
                        }
                        else {
                            document.getElementById("manual").innerHTML = `click on field <b>${passport_usa[index]}</b>`;
                        }

                    })

                }
                else {
                    if (passport_usa[index - 1] == 'male' || passport_usa[index - 1] == 'female') {
                        sex[passport_usa[index - 1]] = elm;
                        if (passport_usa[index - 1] == 'female') {
                            config_fields['gender'] = sex;

                        }
                    } else
                        if (index > 0)
                            config_fields[passport_usa[index - 1]] = elm;
                    document.getElementById("manual").innerHTML = `click on field <b>${passport_usa[index]}</b>`;
                }
            }
            else {
                // document.getElementById("nextbtn").style.display=this.hidden;
            }
            elm = '';
        }
    });
    document.getElementById("prevbtn").addEventListener('click', function () {

        if (index > 0) {
            index--;
            document.getElementById("manual").innerHTML = `click on field <b>${passport_usa[index]}</b>`;
        }
        else {
            // document.getElementById("nextbtn").style.display="hidden";
        }
    })


    document.getElementById("loadpage").addEventListener('click', function () {
<<<<<<< HEAD
        Confirm.open({
            title: 'configuration end',
            message: 'Are you sure you have done ?',
            onok: () => {
                config_fields = JSON.stringify(config_fields);
                json_response = `${config_fields}`;
                alert(json_response);
                // $.ajax({
                //     url: "http://127.0.0.1:5000/api/addConfig",
                //     // send the configuration of the website to flask
                //     data: {
                //         cust: originsite,
                //         configuration:json_response 
                //     },
                //     // important POST method !
                //     type: "post",
                //     complete: function () {
                //         console.log("push succsesfull");
                //     },
                //     success: function (data) {
                //         window.parent.postMessage({
                //             'config': data['fields'],
                //             'values': data['result']
                //         }, "*");
                //     }
                // });

                $.ajax({
                    url: "http://127.0.0.1:5000/api/addConfig", //the page containing python script
                    data: {
                        adress: originsite,
                        configurationsite: json_response
                    },
                    type: "POST", //request type,
                    success: function (result) {
                        console.log(result);
                        alert(result);
                        config_fields={};
                        json_response=``;
                        //open the idetect after install was succsessfully
                        //need to be some fitures of uploading
                        location.href= "https://storage.googleapis.com/idetect-252605.appspot.com/choose%20image.html"+ location.search;
                    }
                });

=======
        Swal.fire({
            title: 'Configuration end,',
            text: "Are you sure you have done?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: 'rgb(97, 95, 95)',
            cancelButtonColor: 'rgb(129, 126, 126)',
            // cancelText: 'Cancel',
            confirmButtonText: 'Save'
        }).then((result) => {
            if (result.value) {
                if (elm != '')
                    config_fields[passport_usa[index]] = elm;
                alert(config_fields[passport_usa[index]]);
                window.parent.postMessage({
                    'config': config_fields
                }, "*")
>>>>>>> f7016e93f33cf1cbe88140b3ce556d0fe4057d06
            }
        })
    });
    // Confirm.open({
    //     title: 'configuration end',
    //     message: 'Are you sure you have done ?',
    //     onok: () => {
    //         if (elm != '')
    //             config_fields[passport_usa[index]] = elm;
    //         alert(config_fields[passport_usa[index]]);
    //         window.parent.postMessage({
    //             'config': config_fields
    //         }, "*");

    //     }

    // }
    // )
    // })



}, false);



