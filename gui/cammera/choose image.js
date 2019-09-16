
    document.addEventListener('DOMContentLoaded', function () {
        var box__input = document.getElementById("box__input");
        var upload_icon = document.getElementById("upload_icon");
        var choose_file = document.getElementById("choose_file");
        var formDragDrop = document.getElementById("formDrop");
        var imageToSend = "";
        var droppedFiles = false;
        var about=0;
        // document.getElementById("aboutButton").addEventListener('click',function () {
        //     about++;
        //     if (about %2== 1) {
        //         document.getElementById("about").style.display = "inline";
        //     }
        //     else {
        //         document.getElementById("about").style.display = "none";
    
        //     }
        // })
    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    // Render thumbnail.
                    imageToSend = e.target.result;
                    document.getElementById("formDrop").style = "background-image:url(" + imageToSend + ")";
                    try {
                        document.getElementById("box__input").removeChild(upload_icon);
                    }
                    catch{ }
                    // document.getElementById("box__input").style = "text-align:center";
                    choose_file.style = "position: absolute;bottom:10px;margin:auto;left: 11%;"
                    var span = document.createElement('span');
                    span.innerHTML = ['<img class="thumb" src="', e.target.result,
                        '" title="', escape(theFile.name), '"/>'].join('');
                    uploadImage(imageToSend);
                };
            })(f);

            // Read in the image file as a data URL.
            if (files[0].type.match('image.*'))
                reader.readAsDataURL(f);
        }
    }

    document.getElementById('file').addEventListener('change', handleFileSelect, false);

    function handleFileSelectD(evt) {

        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    // Render thumbnail.
                    imageToSend = e.target.result;
                    formDragDrop.style = "background-image:url(" + imageToSend + ")";
                    try {
                        box__input.removeChild(upload_icon);
                    }
                    catch{ }
                    box__input.style = "text-align:center";
                    choose_file.style = "position: absolute;bottom:10px;margin:autoleft: 11%;"
                    var span = document.createElement('span');
                    span.innerHTML = ['<img class="thumb" src="', e.target.result,
                        '" title="', escape(theFile.name), '"/>'].join('');
                    uploadImage(imageToSend);
                };
            })(f);
            var formDrop = document.getElementById("formDrop");
            var count = (formDrop.className.match(/box is-dragover/g) || []).length;
            while (count > 0) {

                formDrop.className = formDrop.className.replace("box is-dragover", " ");
                count = (formDrop.className.match(/box is-dragover/g) || []).length;
            }
            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }



    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var formDrop = document.getElementById("formDrop");
        //dropZone.cFlassList.add('is-dragover');
        formDrop.className += " " + "box is-dragover";

        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

    }
    function handleDragLeave(evt) {
        var formDrop = document.getElementById("formDrop");
        //dropZone.classList.add('is-dragover');

        formDrop.className = formDrop.className.replace("/\box is-dragover/g", " ");
        var count = (formDrop.className.match(/box is-dragover/g) || []).length;
        while (count > 0) {

            formDrop.className = formDrop.className.replace("box is-dragover", " ");
            count = (formDrop.className.match(/box is-dragover/g) || []).length;
        }
    }
    // Setup the dnd listeners.

    function handleDragEnter(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var formDrop = document.getElementById("formDrop");
        //dropZone.classList.add('is-dragover');
        formDrop.className += " " + "box is-dragover";

        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('dragleave', handleDragLeave, false);
    dropZone.addEventListener("dragenter", handleDragEnter, false);
    dropZone.addEventListener('drop', handleFileSelectD, false);

    var constraints = { video: { facingMode: "user" }, audio: false };
    // Define constants
    const cameraView = document.querySelector("#camera--view"),
        cameraOutput = document.querySelector("#camera--output"),
        cameraSensor = document.querySelector("#camera--sensor"),
        cameraTrigger = document.querySelector("#camera--trigger");
    var cameraCencel = document.getElementById('camera--cencel');
    var ToTakePicture = document.getElementById('ToTakePicture');
    cameraCencel.addEventListener('click', cameraCencel, false);
    ToTakePicture.addEventListener('click', cameraStart, false);
    var localStream;
    cameraCencel.onclick = function () {

        var cameraV = document.getElementById("camera");
        localStream.stop();

        cameraV.style.visibility = "hidden";
        var cameraOutput = document.getElementById("camera--output");
        cameraOutput.style.visibility = "hidden";

    }

    function visibleC() {
        var cameraV = document.getElementById("camera");
        cameraV.style.visibility = "visible"
        cameraV.style.position = "absolute";
        cameraV.style.zIndex = "2";
        cameraOutput.style.position = "absolute";
        // cameraTriggerstyle.position = "absolute";
        cameraSensor.style.position = "absolute";
    }

    // Access the device camera and stream to cameraView
    function cameraStart() {
        var flagCamera = true;
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
                track = stream.getTracks()[0];
                cameraView.srcObject = stream;
                localStream = track;
            })
            .catch(function (error) {
                flagCamera = false;
                console.error("Oops. Something is broken.", error);
            }).then(function () {
                if (flagCamera)
                    visibleC();
            });
    }
    // Take a picture when cameraTrigger is tapped
    cameraTrigger.onclick = function () {
        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/gif");//webp
        imageToSend = cameraOutput.src;
        cameraOutput.style.visibility = "visible";
        cameraOutput.classList.add("taken");
        formDragDrop.style = "background-image:url(" + imageToSend + ")";
        uploadImage(imageToSend);
    };
    function setToBase64(image) {
        ind = image.indexOf("base64,")
        if (ind != -1) {
            ind += 7;
            image = image.substring(ind);
        }
        return image;
    }
    // var UploadButton = document.getElementById('Upload');
    function uploadImage(imageToSend) {
        if (imageToSend == "") {
            alert("please choose image");
            return;
        }
        imageToSend = setToBase64(imageToSend);
        document.getElementById('loading').hidden = false;
        document.getElementById('formDrop').hidden = true;
        window.parent.postMessage({
            'image': imageToSend
        }, "*");
    }

    //listening to messege from embeddable when success to send image to server
    if (window.addEventListener) {
        window.addEventListener("message", onMessage, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onmessage", onMessage, false);
    }
    function onMessage(event) {
        document.getElementById('loading').hidden = true;
        document.getElementById('formDrop').hidden = false;
    }
}, false);
