function settingData() {

    $("#div_create_question").hide();
    $("#div_accept_success").hide();
    $("#tbl_verf_fail").show();
    $("#div_submit_pass").hide();
    $("#div_submit_fail").show();
    $("#tbl_verf_result").hide();
    $("#div_response_success").hide();

    document.getElementById("errorMsg").innerHTML = "";

    const regexAlphaNumeric = /^[a-zA-Z0-9]+$/;

    var data = document.getElementById("Alter_Data_Color").value;
    if (!data.match(regexAlphaNumeric)) {
        document.getElementById("errorMsg").innerHTML = "Only Alphanumeric values are allowed";
        return false;
    }

    var colorLength = 6;

    if (data.length != colorLength) {
        document.getElementById("errorMsg").innerHTML = "6 digit number is complusary!";
        return false;
    }

    var num = new RegExp('^[0-9]+$');

    var l2Limit = document.getElementById("L2StartLimit").value;
    if (!l2Limit.match(num)) {
        document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed";
        return false;
    }

    var l3Limit = document.getElementById("L3StartLimit").value;
    if (!l3Limit.match(num)) {
        document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed";
        return false;
    }

    var panLimit = document.getElementById("Pancard_Verf_Limit").value;
    if (!panLimit.match(num)) {
        document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed";
        return false;
    }

    var limit = 10;
    debugger;
    if (l2Limit.length > limit) {
        document.getElementById("errorMsg").innerHTML = "More than 10 digit numbers are not allowed";
        return false;
    }

    if (l3Limit.length > limit) {
        document.getElementById("errorMsg").innerHTML = "More than 10 digit numbers are not allowed";
        return false;
    }
    debugger;
    if (panLimit.length > limit) {
        document.getElementById("errorMsg").innerHTML = "More than 10 digit numbers are not allowed";
        return false;
    }

    $("#div_create_question").show();
    $("#tbl_verf_fail").hide();
    $("#div_accept_success").show();
    $("#div_submit_pass").show();
    $("#div_submit_fail").hide();
    $("#tbl_verf_result").hide();
    $("#div_response_success").hide();

}