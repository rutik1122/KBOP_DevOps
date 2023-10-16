try {

    function getError(result) {

        //alert("Error found in js");

        $("#ProcessingBar").hide();
        //document.getElementById("VoucherCheck").value = "false";

        if (result.status == 401 && result.statusText == "Unauthorized") {
            //document.getElementById("ProcessingBar").innerHTML = result.responseText;
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            //alert(result.responseText);
            document.getElementById("ProcessingBar").innerHTML = result.responseText;
        }

    }

    function getData(result) {
        debugger;
        alert("Get Data");

        //document.getElementById("transParticular").value = result.transaction_particular;
        ////document.getElementById("id_report_code").value = result.report_code;
        //document.getElementById("remark_1").value = result.remark_1;
        //document.getElementById("remark_2").value = result.remark_2;
        ////document.getElementById("id_instrument_alpha").value = result.instrument_alpha;
    }

}
catch (e) {
    alert(e.message);
}