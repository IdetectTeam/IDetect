
var index = -1;
var config_fields = {};
var passport_usa = new Array("passpord Card no", "nationality", "surname", "given names", "gender", "date of birth", "place of birth");
var length = passport_usa.length;
var elm = new Object();
var dict = {};
var sex = {};
var json_response;
var originsite;


window.addEventListener('message', receiveMessage, false);


function receiveMessage($event) {
        //check if the response is from a site that he has account with us
    //if ($event&& event.origin !== "http://127.0.0.1:5300")
    //return;
    //else{

    elm = $event.data;
    if (index == 0) {
        json_response = `site{${$event.origin}`;
        originsite = `${$event.origin}`;
        // config_fields['site location']=event.origin;
    //}
}

}

document.addEventListener('DOMContentLoaded', function () {
    $("#myModal").modal('show');
    document.getElementById("manual").innerHTML = "please follow the instructions!";
    index = -1;
    $(".modal-dialog").draggable({
        handle: ".modal-header"
    });
    document.getElementById("nextbtn").addEventListener('click', function () {

        
        if (index < passport_usa.length - 1) {
            index++;
            if (index > -1) {
                if ("gender" == passport_usa[index]) {
                    config_fields[passport_usa[index - 1]] = elm;
                    Confirm.open({
                        title: 'gender',
                        message: 'Are you have radio button for gender field?',
                        onok: () => {
                            passport_usa.splice(index, 1, "male", "female");
                            document.getElementById("manual").innerHTML = `click on field ${passport_usa[index]}`;
                     
                        },
                        oncancel: () => {
                            document.getElementById("manual").innerHTML = `click on field ${passport_usa[index]}`;
                        }

                    })
                }
                else {
                    if (passport_usa[index - 1] == 'male' || passport_usa[index - 1] == 'female') {
                        sex[passport_usa[index - 1]] = elm;
                        if (passport_usa[index - 1] == 'female') {
                            config_fields['gender'] = sex;
                            // index++;
                        }
                    } else
                        if (index > 0)
                            config_fields[passport_usa[index - 1]] = elm;
                    document.getElementById("manual").innerHTML = `click on field ${passport_usa[index]}`;
                }

            }
            else {
                // document.getElementById("nextbtn").style.display=this.hidden;
            }
        }
    });
    document.getElementById("prevbtn").addEventListener('click', function () {
        if (index > 0) {
            index--;
            document.getElementById("manual").innerHTML = `click on field ${passport_usa[index]}`;
        }
        else {
            // document.getElementById("nextbtn").style.display="hidden";
        }
    })



    const Confirm = {
        open(options) {
            options = Object.assign({}, {
                title: '',
                message: '',
                okText: 'OK',
                cancelText: 'Cancel',
                onok: function () {


                    // dict.push({
                    //     key:config_fields[0].value,
                    //     value: config_fields
                    // });
                },
                oncancel: function () { }
            }, options);

            const html = `
                <div class="confirm">
                    <div class="confirm__window">
                        <div class="confirm__titlebar">
                            <span class="confirm__title">${options.title}</span>
                            <button class="confirm__close">&times;</button>
                        </div>
                        <div class="confirm__content">${options.message}</div>
                        <div class="confirm__buttons">
                            <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                            <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
                        </div>
                    </div>
                </div>
            `;

            const template = document.createElement('template');
            template.innerHTML = html;

            // Elements
            const confirmEl = template.content.querySelector('.confirm');
            const btnClose = template.content.querySelector('.confirm__close');
            const btnOk = template.content.querySelector('.confirm__button--ok');
            const btnCancel = template.content.querySelector('.confirm__button--cancel');

            confirmEl.addEventListener('click', e => {
                if (e.target === confirmEl) {
                    options.oncancel();
                    this._close(confirmEl);
                }
            });

            btnOk.addEventListener('click', () => {
                options.onok();
                this._close(confirmEl);
            });

            [btnCancel, btnClose].forEach(el => {
                el.addEventListener('click', () => {
                    options.oncancel();
                    this._close(confirmEl);
                });
            });

            document.getElementById('myModal').appendChild(template.content);
        },

        _close(confirmEl) {
            confirmEl.classList.add('confirm--close');

            confirmEl.addEventListener('animationend', () => {
                document.getElementById('myModal').removeChild(confirmEl);
            });
        }
    };
    document.getElementById("loadpage").addEventListener('click', function () {
        Confirm.open({
            title: 'configuration end',
            message: 'Are you sure you have done ?',
            onok: () => {
                config_fields = JSON.stringify(config_fields);
                json_response += `${config_fields}}`;
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
                        location.href= "https://storage.cloud.google.com/idetectproject/choose%20image.html"+ location.search;
                    }
                });

            }

        }
        )
    })



}, false);



