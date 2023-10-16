try {

    debugger;
    function reloaddata() {
        debugger;
     
        var desc = document.getElementById("div_desc").value;
        if (desc == null || desc == "" || desc.toUpperCase() == "NULL") {
            $("#div_desc_alert").show();
            return false;

        } 
        
    }

    function CheckerList() {
        window.open(rooturl + "BranchMaster/BranchListChecker", "_self");
    }
    function FieldValidation() {
        debugger;
        //alert("test");
        //document.getElementById("Code").focus();
        var code = document.getElementById("Code").value;
        if (code == null || code == "") {
            document.getElementById("Code").style.backgroundColor = "yellow";

            return false;
        }
    }


    //function ValidateData() {
    //    debugger;
    //    $("#ProcessingBar").hide();

    //    //$("#tbl_verf_fail").show();
    //    $("#tbl_verf_fail").show();
    //    $("#tbl_verf_result").hide();
    //    $("#div_submit_pass").hide();
    //    $("#div_submit_fail").show();
    //    $("#div_response_success").hide();
    //    $("#div_create_question").hide();


    //    var validName = /^[a-zA-Z0-9]*$/;
    //    var pattern = /^[a-zA-Z\s]+$/;
    //    //var num = "[0-9]";
    //    var num = new RegExp('^[0-9]+$');

    //    debugger;
    //    var code = document.getElementById("Code").value;
    //    namee = document.getElementById("Name").value;
    //    var address = document.getElementById("Address1").value;
    //    var ifsc = document.getElementById("IfscCode").value;
    //    var micr = document.getElementById("MicrCode").value;
    //    var selectedValue = document.getElementById("Branch").value;
    //    var time = document.getElementById("Scan_cutoffTime").value;

    //    if (code == null || code == "") {
    //        document.getElementById("errorMsg").innerHTML = "Please enter Branch Code";
    //        document.getElementById("Code").style.backgroundColor = "yellow";
    //        //document.getElementById("Code").style.border = "solid 1px #000000";
    //        /*document.getElementById("Code").focus();*/
    //        return false;
    //    }
    //    if (!code.match(num)) {
    //        document.getElementById("errorMsg").innerHTML = "Enter only number in code!";
    //        return false;
    //    }
    //    if (namee == null || namee == "") {
    //  /*  alert("Please enter name");*/
    //        /* document.getElementById("Name").focus();*/
    //        document.getElementById("errorMsg").innerHTML = "Please enter Name";

    //        return false;
    //    }

    //    //if (!namee.match(pattern)) {
    //    //    document.getElementById("errorMsg").innerHTML = "Enter valid name!";
    //    //    return false;
    //    //}


    //    if (address == null || address == "") {
    //        document.getElementById("errorMsg").innerHTML = "Please enter Address";
    //        return false;
    //    }
    //    if (ifsc == null || ifsc == "") {
    //        document.getElementById("errorMsg").innerHTML = "Please enter IfscCode";
    //        return false;
    //    }
    //    if (!ifsc.match(validName)) {
    //        document.getElementById("errorMsg").innerHTML = "Special charcters are not allowed!";
    //        return false;
    //    }

    //    if (micr == null || micr == "") {
    //        document.getElementById("errorMsg").innerHTML = "Please enter MicrCode";
    //        return false;
    //    }
    //    //if (!micr.match(num)) {
    //    //    document.getElementById("errorMsg").innerHTML = "Only numbers are allowed!";
    //    //    document.getElementById("MicrCode").focus();
    //    //    return false;
    //    //}

    //    if (selectedValue === "Select" || selectedValue=="0") {
    //        //alert("Please select an option.");
    //        document.getElementById("errorMsg").innerHTML = "Please select an option in Domain!";
    //        return false; // Prevent form submission
    //    }

    //    if (time == null || time == "") {
    //        document.getElementById("errorMsg").innerHTML = "Please enter CutOff time";
    //        return false;
    //    }

    //    const regexAlphaNumeric = /^[a-zA-Z0-9]+$/;

    //    var data = document.getElementById("IfscCode").value;
    //    if (!data.match(regexAlphaNumeric)) {
    //        document.getElementById("errorMsg").innerHTML = "Only Alphanumeric values are allowed in Ifsc Code";
    //        return false;
    //    }


    //    var alphabets = new RegExp('/^[A-Za-z ]+$/');
    //    var alphabets = /^[A-Za-z ]+$/;
    //    var namealpha = document.getElementById("Name").value;
    //    if (!namealpha.match(alphabets)) {
    //        document.getElementById("errorMsg").innerHTML = "Only Alphabets allow in Branch Name";
    //        return false;
    //    }


    //    var num = new RegExp('^[0-9]+$');

    //    var micr = document.getElementById("MicrCode").value;
    //    if (!micr.match(num)) {
    //        document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed in MicrCode";
    //        return false;
    //    }

    //    var limit = 9;
    //    debugger;
    //    if (micr.length > limit || micr.length < limit) {
    //        document.getElementById("errorMsg").innerHTML = "Please enter 9 digit numbers in MicrCode";
    //        return false;
    //    }

    //    //var limit = 5;

    //    //debugger;
    //    //if (cutoftime.length > limit) {
    //    //    document.getElementById("errorMsg").innerHTML = "Time in 4 digit fromat in Cut_OFF Time";
    //    //    return false;
    //    //}

    //    var regex = /^([01]\d|2[0-3])([0-5]\d)$/;
    //    var cutoftime = document.getElementById("Scan_cutoffTime").value;
    //    if (!cutoftime.match(regex)) {
    //        document.getElementById("errorMsg").innerHTML = "Cut off time accept only 24 hours clock";
    //        return false;
    //    }

    //    $("#tbl_verf_fail").hide();
    //    $("#tbl_verf_result").hide();
    //    $("#div_submit_pass").show();
    //    $("#div_submit_fail").hide();
    //    $("#div_response_success").hide();
    //    $("#div_create_question").show();
    //}

    function ValidateData() {
        debugger;
        $("#ProcessingBar").hide();

        //$("#tbl_verf_fail").show();
        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();


        var validName = /^[a-zA-Z0-9]*$/;
        var pattern = /^[a-zA-Z\s]+$/;
        //var num = "[0-9]";
        var num = new RegExp('^[0-9]+$');

        debugger;
        var code = document.getElementById("Code").value;
        namee = document.getElementById("Name").value;
        var address = document.getElementById("Address1").value;
        var ifsc = document.getElementById("IfscCode").value;
        var micr = document.getElementById("MicrCode").value;
        var selectedValue = document.getElementById("Branch").value;
        var time = document.getElementById("Scan_cutoffTime").value;

        if (code == null || code === "") {
            document.getElementById("errorMsg").innerHTML = "Please enter Branch Code";
            document.getElementById("Code").style.backgroundColor = "yellow";
            document.getElementById("Code").addEventListener("blur", function () {
                document.getElementById("Code").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("Code").style.backgroundColor = ""; // Reset background color
        }


        if (!code.match(num)) {
            document.getElementById("errorMsg").innerHTML = "Enter only number in code!";
            return false;
        }

        if (namee == null || namee === "") {
            /*  alert("Please enter name");*/
            /* document.getElementById("Name").focus();*/
            document.getElementById("errorMsg").innerHTML = "Please enter Name";
            document.getElementById("Name").style.backgroundColor = "yellow"; // Corrected line
            document.getElementById("Name").addEventListener("blur", function () {
                document.getElementById("Name").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("Name").style.backgroundColor = ""; // Reset background color
        }



        //if (!namee.match(pattern)) {
        //    document.getElementById("errorMsg").innerHTML = "Enter valid name!";
        //    return false;
        //}


        if (address == null || address == "") {
            document.getElementById("errorMsg").innerHTML = "Please enter Address";
            document.getElementById("Address1").style.backgroundColor = "yellow";
            document.getElementById("Address1").addEventListener("blur", function () {
                document.getElementById("Address1").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        }
        else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("Address1").style.backgroundColor = ""; // Reset background color
        }


        if (ifsc == null || ifsc == "") {
            document.getElementById("errorMsg").innerHTML = "Please enter IfscCode";
            document.getElementById("IfscCode").style.backgroundColor = "yellow";
            document.getElementById("IfscCode").addEventListener("blur", function () {
                document.getElementById("IfscCode").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("IfscCode").style.backgroundColor = ""; // Reset background color
        }


        if (!ifsc.match(validName)) {
            document.getElementById("errorMsg").innerHTML = "Special charcters are not allowed!";
            return false;
        }

        if (micr == null || micr == "") {
            document.getElementById("errorMsg").innerHTML = "Please enter MicrCode";
            document.getElementById("MicrCode").style.backgroundColor = "yellow";
            document.getElementById("MicrCode").addEventListener("blur", function () {
                document.getElementById("MicrCode").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        }
        else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("MicrCode").style.backgroundColor = ""; // Reset background color
        }


        //if (!micr.match(num)) {
        //    document.getElementById("errorMsg").innerHTML = "Only numbers are allowed!";
        //    document.getElementById("MicrCode").focus();
        //    return false;
        //}

        if (selectedValue === "Select" || selectedValue == "0") {
            //alert("Please select an option.");
            document.getElementById("errorMsg").innerHTML = "Please select an option.";
            document.getElementById("Branch").style.backgroundColor = "yellow";
            document.getElementById("Branch").addEventListener("blur", function () {
                document.getElementById("Branch").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false; // Prevent form submission
        }
        else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("Branch").style.backgroundColor = ""; // Reset background color
        }

        if (time == null || time == "") {
            document.getElementById("errorMsg").innerHTML = "Please enter CutOff time";
            document.getElementById("Scan_cutoffTime").style.backgroundColor = "yellow";
            document.getElementById("Scan_cutoffTime").addEventListener("blur", function () {
                document.getElementById("Scan_cutoffTime").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        }
        else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("Scan_cutoffTime").style.backgroundColor = ""; // Reset background color
        }

        const regexAlphaNumeric = /^[a-zA-Z0-9]+$/;

        var data = document.getElementById("IfscCode").value;
        if (!data.match(regexAlphaNumeric)) {
            document.getElementById("errorMsg").innerHTML = "Only Alphanumeric values are allowed in Ifsc Code";
            return false;
        }


        var alphabets = new RegExp('/^[A-Za-z ]+$/');
        var alphabets = /^[A-Za-z ]+$/;
        var namealpha = document.getElementById("Name").value;
        if (!namealpha.match(alphabets)) {
            document.getElementById("errorMsg").innerHTML = "Only Alphabets allow in Branch Name";
            return false;
        }


        var num = new RegExp('^[0-9]+$');

        var micr = document.getElementById("MicrCode").value;
        if (!micr.match(num)) {
            document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed in MicrCode";
            return false;
        }

        var limit = 9;
        debugger;
        if (micr.length > limit || micr.length < limit) {
            document.getElementById("errorMsg").innerHTML = "Please enter 9 digit numbers in MicrCode";
            return false;
        }

        //var limit = 5;

        //debugger;
        //if (cutoftime.length > limit) {
        //    document.getElementById("errorMsg").innerHTML = "Time in 4 digit fromat in Cut_OFF Time";
        //    return false;
        //}

        var regex = /^([01]\d|2[0-3])([0-5]\d)$/;
        var cutoftime = document.getElementById("Scan_cutoffTime").value;
        if (!cutoftime.match(regex)) {
            document.getElementById("errorMsg").innerHTML = "Cut off time accept only 24 hours clock";
            return false;
        }

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").show();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();
    }

    function Accept() {
        $("#ProcessingBar").hide();

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").show();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();

    }

    function Reject() {
        $("#ProcessingBar").hide();

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").show();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();

    }

    function Delete(id) {
        debugger;
        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass_delete").show();
        $("#div_submit_pass_activate").hide();
        $("#div_submit_pass_deactivate").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();

        document.getElementById("strong_msg").innerHTML = "Do you want to Delete this branch?";
    }


    function successDisplay(message) {
        debugger;

        //var modal = document.getElementById("tbl_verf_result");
        //var msg = document.getElementById("successMsg"); 
       
       // msg.textContent = "Branch Created";
        //modal.style.display = "block";

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();

        //document.getElementById("successMsg").innerHTML = "Branch Created";
        //alert(document.getElementById("successMsg").innerHTML);
        //alert("Creaated");
    }


    function Reject() {
        debugger;
        
        //$("#ProcessingBar").hide();
        //$("#tbl_verf_fail").hide();
        //$("#tbl_verf_result").hide();
        //$("#div_submit_pass").show();
        //$("#div_submit_fail").hide();
        //$("#div_response_success").hide();
        //$("#div_create_question_reject").show();

        //$("#tbl_verf_fail").hide();
        //$("#div_submit_fail").hide();
        //$("#div_response_success").hide();

        /*document.getElementById("strong_msg").innerHTML = "Do you want to Reject this branch?";*/
    }
  
}
catch (e) {
    alert(e.message);
}