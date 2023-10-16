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


    function ValidateApiData() {
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
        var api_name = document.getElementById("Api_Name").value;
        var api_value = document.getElementById("Api_Value").value;
        var discription = document.getElementById("Discription").value;
        var banckcode = document.getElementById("BankCode").value;


        if (api_name == null || api_name == "") {
            document.getElementById("errorMsg").innerHTML = "Api Name Mandatory";

            return false;
        }

        if (api_value == null || api_value == "") {
            document.getElementById("errorMsg").innerHTML = "Api Value Mandatory";

            return false;
        }


        if (banckcode == null || banckcode == "") {
            document.getElementById("errorMsg").innerHTML = "Bank Code Mandatory";

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