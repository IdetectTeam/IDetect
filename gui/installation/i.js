
var index=-1;
var config_fields=[];
var passport_usa=new Array("passpord Card no","nationality","surname","given names","gender","date of birth","place of birth");
var length=passport_usa.length;
var elm=new Object();
var dict={};
// $('#my-modal').modal('show')
//               .draggable();ss
//window.addEventListener("message", receiveMessage, false);


window.addEventListener('message', receiveMessage, false);


function receiveMessage($event) {
    // alert(event.origin);
       if ($event&& event.origin !== "http://127.0.0.1:5000")
        return;
     else{
        elm=$event.data;
        if(index==0)
         config_fields.push({
            key:   "site location",
            value: event.origin
        });
        // config_fields['site location']=event.origin;
     }
    
    //  var x = document.createElement("P");
    //         x.id="manual";
    //         var t = document.createTextNode($event.data);
    //         t.id="manualp";
    //         x.appendChild(t);
    //         document.body.appendChild(x);
     
    //    // ...
     }

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("manual").innerHTML="please follow the instructions!";
    index=-1;
    $(".modal-dialog").draggable({
        handle: ".modal-header"
    });
    document.getElementById("nextbtn").addEventListener('click',function(){
     // get reference to window inside the iframe
// var wn = document.getElementById('idetectiframe').contentWindow;
// // postMessage arguments: data to send, target origin
// wn.postMessage('hello! i send message from iframe (:', 'http://www.example.com');
      
// window.opener.postMessage('hello! i send message from iframe (:', 'http://www.example.com');
// targetWindow.postMessage.postMessage('hello! i send message from iframe (:', 'http://www.example.com');
//window.postMessage('hello! i send message from iframe (:', 'https://storage.googleapis.com');
      
if(index<passport_usa.length-1){
   index++;
    if(index>-1){
    if("gender"==passport_usa[index])
    {      config_fields.push({
        key:   passport_usa[index-1],
        value: elm
    });
        Confirm.open({
            title: 'gender',
            message: 'Are you have radio button for gender field?',
            onok: () => {
                passport_usa.splice( index, 1, "male", "female");
            document.getElementById("manual").innerHTML=`click on field ${passport_usa[index]}`;
// var array=passport_usa.slice(0,index-1);
// array.push("male");
// array.push("female");
// var array
            },
            oncancel: () =>{
                document.getElementById("manual").innerHTML=`click on field ${passport_usa[index]}`;
            }
            
          })   
    }
    else
    {
        if(index>0)
            // config_fields[passport_usa[index-1]]=elm;
             config_fields.push({
                key:   passport_usa[index-1],
                value: elm
            });
            document.getElementById("manual").innerHTML=`click on field ${passport_usa[index]}`;
    }
    
        }
        else{
            // document.getElementById("nextbtn").style.display=this.hidden;
        }
    }});
    document.getElementById("prevbtn").addEventListener('click',function(){
        if(index>0){
            index--;
            document.getElementById("manual").innerHTML=`click on field ${passport_usa[index]}`;
        }
       else{
        // document.getElementById("nextbtn").style.display="hidden";
       }
    })


    // document.getElementById("window.parent.parent.document.body").addEventListener('onclick'),function(){
    //     debugger;
    //     console.log(event.target.id) ;
    //   elm=event.target;
    // }
    // parent.$('body').trigger('onclick',function(){
    //     alert("ellow")
    // });

    const Confirm = {
        open (options) {
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
                oncancel: function () {}
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
    
        _close (confirmEl) {
            confirmEl.classList.add('confirm--close');
    
            confirmEl.addEventListener('animationend', () => {
                document.getElementById('myModal').removeChild(confirmEl);
            });
        }
    };
    document.getElementById("loadpage").addEventListener('click',function(){
        Confirm.open({
            title: 'Background Change',
            message: 'Are you sure you have done ?',
            onok: () => {
                // config_fields=JSON.parse(config_fields);
                // for(var key in config_fields){
                //     if(key!='male'&&key!='female'&&key!='site')
                //     dict.push({
                //        key:key,
                //        value:config_fields[key] 
                //     })
                //     else
                //     if(key=='male')
                //     dict.push({
                //         key:"jender",  
                //   value:[config_fields['male'],config_fields['female']]
                //      })
                }
             //   console.log(dict); 
            }
  )   
    })

    
    
}, false);



