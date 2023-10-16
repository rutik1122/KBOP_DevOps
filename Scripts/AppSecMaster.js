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


    function ValidateAppsecData() {
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
        var name = document.getElementById("Name").value;
        var pwdexpirydays = document.getElementById("Pwdexpirydays").value;
        var minpwdlenghth = document.getElementById("Minpwdlenghth").value;
        var maxpwdlenghth = document.getElementById("Maxpwdlenghth").value;
        var invalidattemtsallowed = document.getElementById("Invalidattemtsallowed").value;
        var deactivationdays = document.getElementById("Deactivationdays").value;


        if (name == null || name == "") {
            document.getElementById("errorMsg").innerHTML = "Name Mandatory";

            return false;
        }

        if (pwdexpirydays == null || pwdexpirydays == "") {
            document.getElementById("errorMsg").innerHTML = "Pwdexpirydays Value Mandatory";

            return false;
        }
        if (!pwdexpirydays.match(num)) {
            document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed!";
            return false;
        }


        if (minpwdlenghth == null || minpwdlenghth == "") {
            document.getElementById("errorMsg").innerHTML = "Minpwdlenghth Value Mandatory";

            return false;
        }
        if (!minpwdlenghth.match(num)) {
            document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed!";
            return false;
        }


        if (maxpwdlenghth == null || maxpwdlenghth == "") {
            document.getElementById("errorMsg").innerHTML = "Maxpwdlenghth Value Mandatory";

            return false;
        }
        if (!maxpwdlenghth.match(num)) {
            document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed!";
            return false;
        }


        if (invalidattemtsallowed == null || invalidattemtsallowed == "") {
            document.getElementById("errorMsg").innerHTML = "Invalidattemtsallowed  Mandatory";

            return false;
        }
        if (!invalidattemtsallowed.match(num)) {
            document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed!";
            return false;
        }



        if (deactivationdays == null || deactivationdays == "") {
            document.getElementById("errorMsg").innerHTML = "Deactivationdays  Mandatory";

            return false;
        }
        if (!deactivationdays.match(num)) {
            document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed!";
            return false;
        }

        debugger;
        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").show();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();
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




}
catch (e) {
    alert(e.message);
}