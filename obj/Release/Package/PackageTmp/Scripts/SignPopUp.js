/*(function(){*/
/* alert("signupPopup");*/
var SCROLL_WIDTH = 24;

//var btn_popup = document.getElementById("btn_popup");
//var popup = document.getElementById("popup");
//var popup_bar = document.getElementById("popup_bar");
//var btn_close = document.getElementById("btn_close");
//var smoke = document.getElementById("smoke");

//-- let the popup make draggable & movable.
var offset = { x: 0, y: 0 };

//popup_bar.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

function mouseUp() {
    window.removeEventListener('mousemove', popupMove, true);
}

function mouseDown(e) {
    offset.x = e.clientX - popup.offsetLeft;
    offset.y = e.clientY - popup.offsetTop;
    window.addEventListener('mousemove', popupMove, true);
}

function popupMove(e) {
    popup.style.position = 'absolute';
    popup1.style.position = 'absolute';
    var top = e.clientY - offset.y;
    var left = e.clientX - offset.x;
    popup.style.top = top + 'px';
    popup.style.left = left + 'px';
    popup1.style.top = top + 'px';
    popup1.style.left = left + 'px';
}
//-- / let the popup make draggable & movable.

window.onkeydown = function (e) {
    if (e.keyCode == 27) { // if ESC key pressed
        btn_close.click(e);
    }
}

btn_popup.onclick = function (e) {
    // smoke
    spreadSmoke(true);
    // reset div position
    popup.style.top = "20px";
    popup.style.left = "200px";
    //alert("ok" + window.innerWidth);
    popup.style.width = 300 - SCROLL_WIDTH + "px";
    popup.style.height = 300 - SCROLL_WIDTH + "px";
    //popup.style.width = window.innerWidth - SCROLL_WIDTH + "px";
    //popup.style.height = window.innerHeight - SCROLL_WIDTH + "px";
    popup.style.display = "block";
}



btn_close.onclick = function (e) {
    popup.style.display = "none";
    smoke.style.display = "none";
}

window.onresize = function (e) {
    spreadSmoke();
}

function spreadSmoke(flg) {
    //alert("ok");
    smoke.style.width = window.outerWidth + 100 + "px";
    smoke.style.height = window.outerHeight + 100 + "px";
    //smoke.style.width = window.outerWidth + "px";
    //smoke.style.height = window.outerHeight + "px";
    if (flg != undefined && flg == true) smoke.style.display = "block";
}

/*}());*/

function closeButton() {
    popup.style.display = "none";
    smoke.style.display = "none";
    //popup_bar.display = "none";
}

function closeButton1() {
    popup1.style.display = "none";
}

function signPopUp(result) {
    $("#ProcessingBar").hide();
    //alert("Second Sign Function");
    debugger;
    var signAccess = "False";
    //var popup = document.getElementById("signPopUpDiv");

    //spreadSmoke(true);

    if (result.length > 0) {

        if (result[0].Name != "FAILED") {
            popup_bar.addEventListener('mousedown', mouseDown, false);

            popup.style.top = "20px";
            popup.style.left = "200px";
            var SCROLL_WIDTH = 24;

            popup.style.width = "400px";

            popup.style.display = "block";

            signAccess = "True";

            var tableSignData = document.getElementById('signTable');

            var c = 0;

            while (tableSignData.rows.length > 1) {
                tableSignData.deleteRow(1);
            }
            for (var i = 0; i < result.length; i++) {
                //debugger;
                c += 1;
                var row = document.createElement('tr');


                var cell = document.createElement('td');
                var imgTag = document.createElement('img');

                var cell0 = row.insertCell(0);
                cell0.innerHTML = result[i].Name;
                cell0.width = "450px";
                row.appendChild(cell0);

                //var base64img = "data:image/png;base64," + result[i].Signature;

                var cell1 = row.insertCell(1);

                imgTag.setAttribute('src', "data:image/(png|jpg);base64," + result[i].Signature);
                imgTag.setAttribute('height', "200px");
                imgTag.setAttribute('width', "200px");
                imgTag.id = "SignId_" + i;
                cell1.appendChild(imgTag);
                cell1.height = "100px";
                cell1.width = "100px";
                row.appendChild(cell1);

                var cell2 = row.insertCell(2);
                cell2.innerHTML = result[i].Status;
                row.appendChild(cell2);

                document.getElementById("signTable").appendChild(row);

                //$("#SignData").show();
            }

            if (result.length > 0) {
                var heightVal = 250 * c;

                popup.style.height = heightVal + "px";
            }
        }
        else {
            alert("Signature Api Response, Code: " + result[0].Status + "; Desc: " + result[0].Signature);
        }
    }

}

function ChqSlipPopUp(imgtype) {
    popup_bar1.addEventListener('mousedown', mouseDown, false);

    popup1.style.top = "20px";
    popup1.style.left = "200px";
    var SCROLL_WIDTH = 24;

    popup1.style.width = "920px";

    popup1.style.display = "block";

    signAccess = "True";

    var tableSignData = document.getElementById('chqSlipTable');

    var c = 0;

    debugger;

    while (tableSignData.rows.length > 0) {
        tableSignData.deleteRow(0);
    }
    var row = document.createElement('tr');


    var cell = document.createElement('td');
    var imgTag = document.createElement('img');

    //var cell0 = row.insertCell(0);
    //cell0.innerHTML = result[i].Name;
    //cell0.width = "450px";
    //row.appendChild(cell0);

    var cell0 = row.insertCell(0);
    debugger;

    var img;

    if (imgtype == null)
        img = document.getElementById("FG").src;
    else
        img = document.getElementById(imgtype).src;

    
    //var img = document.getElementById("FG").src;

    imgTag.setAttribute('src', img);
    imgTag.setAttribute('height', "450px");
    imgTag.setAttribute('width', "900px");
    imgTag.id = "chqSlipId";
    cell0.appendChild(imgTag);
    cell0.height = "450px";
    cell0.width = "900px";
    row.appendChild(cell0);

    document.getElementById("chqSlipTable").appendChild(row);
}