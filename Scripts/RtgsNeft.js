
var access_token = window.localStorage.getItem('AccessToken');
var bearer = window.localStorage.getItem('TokenType');
var gusername = window.localStorage.getItem('username');

var imgArr = [];

//var gusername = document.getElementById('tellerDetails').value;
var authHeaders = {};
authHeaders.Authorization = bearer + " " + access_token;

//var x = '@ViewBag.URL';
//var WebImageURL = '@ViewBag.WebImageURL';
//var PhysicalImageURL = '@ViewBag.PhysicalImageURL';

function ImportFunction() {
    alert("This is Import function");
    var base64 = document.getElementById("base64PathVal").value;
    var userId = document.getElementById("tellerDetails").value;

    var x = document.getElementById("urlVal").value;
    //var y = "getRtgsList";
    var y = "rtgsImageUpload";
    alert("url: " + x + y);
    debugger;

    $.ajax({
        type: 'POST',
        url: x + y,
        //data: { 'ImgUrl': base64, 'ImgType': 'RTGS', 'tellerId': userId },
        data: { 'ImgType': 'RTGS' },
        success: function (result) {
            SuccessImg(result);
        },
        error: FailedImg
    });

    //$.ajax({
    //    type: 'POST',
    //    url: x + y,
    //    //data: { 'ImgUrl': base64, 'ImgType': 'RTGS', 'tellerId': userId },
    //    //data: { 'ImgList': imgArr, 'ImgType': 'RTGS', 'tellerId': userId },
    //    success: function (result) {
    //        SuccessImg(result);
    //    },
    //    error: FailedImg
    //});

}


function encodeImageFileAsURL() {
   //debugger;
    var filesSelected = document.getElementById("inputFileToLoad").files;
   //debugger;
    if (filesSelected.length > 0) {

        for (var i = 0; i < filesSelected.length; i++) {
           //debugger;
            var fileToLoad = filesSelected[i];

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result; // <--- data: base64
               //debugger;
                var newImage = document.createElement('img');
                newImage.src = srcData;
                var dataVal = srcData.replace("data:image/jpeg;base64,", "");
                //debugger;

                imgArr.push(dataVal);
               //debugger;


                //document.getElementById("base64PathVal").value = document.getElementById("base64PathVal").value + dataVal + '|';
            }
           //debugger;
            fileReader.readAsDataURL(fileToLoad);


            //imgArr.push

        }

    }
}


function SuccessImg(result) {
    debugger;
    alert(result);
}

function FailedImg(result) {
    debugger;
    alert(result);
}
