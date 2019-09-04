
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
        debugger;
        if(index<passport_usa.length-1){
            index++;
            document.getElementById("manual").innerHTML=`click on field ${passport_usa[index]}`;
           var p=parent.document;
           console.log(p);
        }
        else{
            // document.getElementById("nextbtn").style.display=this.hidden;
        }
    })
    document.getElementById("prevbtn").addEventListener('click',function(){
        debugger;
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
    parent.$('body').trigger('onclick',function(){
        alert("ellow")
    });

    const Confirm = {
        open (options) {
            options = Object.assign({}, {
                title: '',
                message: '',
                okText: 'OK',
                cancelText: 'Cancel',
                onok: function () {},
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
            message: 'Are you sure you wish the background color?',
            onok: () => {
              //document.body.style.backgroundColor = 'blue';
            }
          })   
    })

    
    
}, false);

   

