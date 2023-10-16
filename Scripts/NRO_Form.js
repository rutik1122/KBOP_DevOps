try {
    // Used to store previous image src (Front img in particular)
    var tempSrc = "";
    var PerviousType = "";

    function getError(result) {

        debugger;

        $("#ProcessingBar").show();

        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            document.getElementById("ProcessingBar").innerHTML = result.responseText;
        }

    }
    
    function GetNroFormData(data) {
        debugger;
        $("#ProcessingBar").hide();
        $("#div_nroform").show();
        $("#div_nroform_data").show();

        var currentDate = new Date();
        var yyyy = currentDate.getFullYear();

        RefNo = 'NRO' + yyyy.toString().substring(2, 4) + String(currentDate.getUTCMonth() + 1).padStart(2, '0')
            + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0')
            + String(currentDate.getSeconds()).padStart(2, '0');

        document.getElementById("FG").src = data.FrontImagePath;
        debugger;
        document.getElementById("txtFirstName").value = data.nro_FirstName;
        document.getElementById("txtMiddleName").value = data.nro_MiddleName;
        document.getElementById("txtSurname").value = data.nro_LastName;
        document.getElementById("txtEmailId").value = data.nro_EmailId;
        document.getElementById("txtMobileNo").value = data.nro_PhoneNo;
        document.getElementById("txt_cust_id").value = data.nro_CustomerId;
        document.getElementById("txtDob").value = data.nro_DOB;
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

        // Customer Id
        var custid = document.getElementById("txt_cust_id").value;
        if (custid == "") {
            document.getElementById("errorMsg").innerHTML = "Please select Customer";
            return false;
        }
        else if (!custid.match(regexAlphaNumeric)) {
            document.getElementById("errorMsg").innerHTML = "Only Alphanumeric values are allowed in Customer Id";
            return false;
        }

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

        // Middle Name
        var mname = document.getElementById("txtMiddleName").value;
        if (mname == "") {
            document.getElementById("errorMsg").innerHTML = "Please enter middle name";
            return false;
        }
        else if (!mname.match(regexAlphabet)) {
            document.getElementById("errorMsg").innerHTML = "Only Alphabets are allowed in Middle name";
            return false;
        }

        // Last Name
        var lname = document.getElementById("txtSurname").value;
        if (lname == "") {
            document.getElementById("errorMsg").innerHTML = "Please enter surname";
            return false;
        }
        else if (!lname.match(regexAlphabet)) {
            document.getElementById("errorMsg").innerHTML = "Only Alphabets are allowed in Last name";
            return false;
        }

        debugger;
        var dob = document.getElementById("txtDob").value;
        if (dob == "" || dob == null) {
            document.getElementById("errorMsg").innerHTML = "DOB cannot be null!";
            return false;
        }
        else if (ValidateDOB(document.getElementById("txtDob").value) == false) {
            document.getElementById("errorMsg").innerHTML = ErrorMessage;
            return false;
        }
        debugger;

        //if (ValidateEmail(document.getElementById("txtEmailId").value) == false) {
        //    document.getElementById("errorMsg").innerHTML = ErrorMessage;
        //    return false;
        //}

        //debugger;
        //if (ValidateMobile(document.getElementById("txtMobileNo").value) == false) {
        //    document.getElementById("errorMsg").innerHTML = ErrorMessage;
        //    return false;
        //}


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
        var dob = document.getElementById("txtDob").value;
        var email = document.getElementById("txtEmailId").value;
        var mobile = document.getElementById("txtMobileNo").value;

        debugger;

        var sni_id = document.getElementById("Sid").value;

        debugger;

        var y = "UpdateBankFormData";

        $.ajax({
            type: "POST",
            url: x + y,
            data: {
                ReferenceNo: RefNo, CountId: count_id, SniId: sni_id, FormType: 'NRO', BankCode: BankCode, Verf_Level: 'L1',
                nro_CustomerId: custid, nro_FirstName: fname, nro_MiddleName: mname, nro_LastName: lname, nro_EmailId: email,
                nro_PhoneNo: mobile, nro_DOB: dob
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