try {
    // Used to store previous image src (Front img in particular)
    var tempSrc = "";
    var PerviousType = "";

    function getError(result) {

        debugger;

        $("#ProcessingBar").show();
        $("#div_thirdparty").hide();
        $("#div_thirdparty_data").hide();

        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            document.getElementById("ProcessingBar").innerHTML = result.responseText;
        }

    }

    

    function GetThirdPartyFormData(data) {
        debugger;

        var currentDate = new Date();
        var yyyy = currentDate.getFullYear();

        RefNo = 'THIRD_PARTY' + yyyy.toString().substring(2, 4) + String(currentDate.getUTCMonth() + 1).padStart(2, '0')
            + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0')
            + String(currentDate.getSeconds()).padStart(2, '0');

        $("#ProcessingBar").hide();
        $("#div_thirdparty").show();
        $("#div_thirdparty_data").show();

        document.getElementById("FG").src = data.FrontImagePath;
        debugger;
        document.getElementById("txt_cust_id").value = data.thirdParty_CustomerId;
        document.getElementById("txtFirstName").value = data.thirdParty_FirstName;
        document.getElementById("txtMiddleName").value = data.thirdParty_MiddleName;
        document.getElementById("txtSurname").value = data.thirdParty_LastName;
        document.getElementById("txtEmailId").value = data.thirdParty_EmailId;
        document.getElementById("txtMobileNo").value = data.thirdParty_PhoneNo;
        document.getElementById("chkResident").value = data.thirdParty_CustomerType;
        document.getElementById("txtPanNo").value = data.thirdParty_PanNo;
        document.getElementById("Sid").value = data.SniId;

    }

    function SubmitData() {

        //debugger;
        CompleteValidation = false;

        //$("#tbl_verf_pass").hide();
        $("#div_accept_success").hide();
        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        const regexAlphabet = /^[a-zA-Z]+$/;
        const regexAlphaNumeric = /^[a-zA-Z0-9]+$/;

        debugger;
        var custid = document.getElementById("txt_cust_id").value;
        if (custid == "") {
            document.getElementById("errorMsg").innerHTML = "Please select Customer";
            return false;
        }
        else if (!custid.match(regexAlphaNumeric)) {
            document.getElementById("errorMsg").innerHTML = "Only Alphanumeric values are allowed in Customer Id";
            return false;
        }

        debugger;
        // First Name Validation
        var fname = document.getElementById("txtFirstName").value;
        if (fname == "") {
            document.getElementById("errorMsg").innerHTML = "Please enter first name";
            return false;
        }
        else if (!fname.match(regexAlphabet)) {
            document.getElementById("errorMsg").innerHTML = "Only Alphabets are allowed in First name";
            return false;
        }

        debugger;
        var mname = document.getElementById("txtMiddleName").value;
        if ( mname == "") {
            document.getElementById("errorMsg").innerHTML = "Please enter middle name";
            return false;
        }
        else if (!mname.match(regexAlphabet)) {
            document.getElementById("errorMsg").innerHTML = "Only Alphabets are allowed in Middle name";
            return false;
        }

        debugger;
        var lname = document.getElementById("txtSurname").value;
        if ( lname == "") {
            document.getElementById("errorMsg").innerHTML = "Please enter surname";
            return false;
        }
        else if (!lname.match(regexAlphabet)) {
            document.getElementById("errorMsg").innerHTML = "Only Alphabets are allowed in Last name";
            return false;
        }

        //debugger;
        //if (ValidateEmail(document.getElementById("txtEmailId").value) == false) {
        //    document.getElementById("errorMsg").innerHTML = ErrorMessage;
        //    return false;
        //}

        debugger;
        if (ValidateMobile(document.getElementById("txtMobileNo").value) == false) {
            document.getElementById("errorMsg").innerHTML = ErrorMessage;
            return false;
        }

        debugger;
        var chkResident = document.getElementById("chkResident");
        var chkNR = document.getElementById("chkNR");
        if (chkResident.checked == true && chkNR.checked == true) {
            //return document.getElementById("error").innerHTML = "Please mark only one checkbox either Yes or No";

            document.getElementById("errorMsg").innerHTML = "Please mark only one checkbox";
            return false;
        }
        else if (chkResident.checked == false && chkNR.checked == false) {
            document.getElementById("errorMsg").innerHTML = "Please mark any one checkbox";
            return false;
        }

        var panNo = document.getElementById("txtPanNo").value;
        if (panNo == "" || panNo == null) {
            document.getElementById("errorMsg").innerHTML = "Please enter PAN";
            return false;
        }
        else if (!panNo.match(regexAlphaNumeric)) {
            document.getElementById("errorMsg").innerHTML = "PAN can only accept Alpha numeric value";
            return false;
        }

        //debugger;
        //rpt_code = document.getElementById("rpt_code").value;
        //if (rpt_code == "0" && NRE_Flag == "Y") {
        //    document.getElementById("errorMsg").innerHTML = "Select Report Code!";
        //    return false;
        //}

        //instrument_date = document.getElementById("ChequeDateTxt").value;

        //instrument_alpha = document.getElementById("instrument_alpha").value;

        //trans_particular = document.getElementById("trans_particular").value;
        //remark1 = document.getElementById("remark_1").value;
        //remark2 = document.getElementById("remark_2").value;

        CompleteValidation = true;
        //$("#tbl_verf_pass").show();
        $("#tbl_verf_fail").hide();
        $("#div_accept_success").show();
        $("#div_submit_pass").show();
        $("#div_submit_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        //CheckFlag();

    }


    function DataPush() {
        debugger;

        var custid = document.getElementById("txt_cust_id").value;
        var fname = document.getElementById("txtFirstName").value;
        var mname = document.getElementById("txtMiddleName").value;
        var lname = document.getElementById("txtSurname").value;
        var email = document.getElementById("txtEmailId").value;
        var mobile = document.getElementById("txtMobileNo").value;

        debugger;
        var resident = "";
        if (document.getElementById("chkResident").checked == true)
            resident = "Resident";
        else if (document.getElementById("chkNR").checked == true)
            resident = "NR";

        var pan = document.getElementById("txtPanNo").value;
        var sni_id = document.getElementById("Sid").value;

        debugger;
        document.getElementById("successMsg").innerHTML = "Processing...";
        var y = "UpdateBankFormData";

        $.ajax({
            type: "POST",
            url: x + y,
            data: {
                ReferenceNo: RefNo, CountId: count_id, SniId: sni_id, FormType: 'THIRD_PARTY', BankCode: BankCode, Verf_Level: 'L1',
                thirdParty_CustomerId: custid, thirdParty_FirstName: fname, thirdParty_MiddleName: mname, thirdParty_LastName: lname, thirdParty_EmailId: email,
                thirdParty_PhoneNo: mobile, thirdParty_PanNo: pan, thirdParty_CustomerType: resident
            },
            success: SuccessResponse,
            error: ErrorApiMessage
        });

    }

    function SuccessResponse(data) {

        debugger;
        //$("#tbl_verf_pass").show();
        $("#tbl_verf_fail").hide();
        $("#div_accept_success").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_response_success").show();

        document.getElementById("successMsg").innerHTML = data;

    }

    function ErrorApiMessage(data) {

        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_accept_success").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        document.getElementById("errorMsg").innerHTML = data.responseText;

    }

}
catch (e) {
    alert(e.message);
}