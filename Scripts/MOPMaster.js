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

        var pattern = /^[a-zA-Z\s]+$/;
        //var num = "[0-9]";
   

        debugger;
        var refCode = document.getElementById("Ref_Code").value;
        var refDesc = document.getElementById("Ref_Desc").value;
        
    
        if (refCode == null || refCode == "") {
            document.getElementById("errorMsg").innerHTML = "Please enter Ref Code";
            document.getElementById("Ref_Code").style.backgroundColor = "yellow";
            //document.getElementById("Code").style.border = "solid 1px #000000";
            /*document.getElementById("Code").focus();*/
            return false;
        }

        if (refCode !== "") {
            document.getElementById("Ref_Code").style.backgroundColor = "";
        }

        var validateref_code = /^[a-zA-Z0-9]*$/;
        if (!refCode.match(validateref_code)) {
            document.getElementById("errorMsg").innerHTML = "Space is not allowed in Ref_Code!";
            return false;
        }


        if (refDesc == null || refDesc == "") {
   
            document.getElementById("errorMsg").innerHTML = "Please enter Name";
            document.getElementById("Ref_Desc").style.backgroundColor = "yellow";
           
            return false;
        }

        if (refDesc !== "") {
            document.getElementById("Ref_Desc").style.backgroundColor = "";
        }

        var validateref_desc = /^[a-zA-Z0-9\s]*$/
        if (!refDesc.match(validateref_desc)) {
            document.getElementById("errorMsg").innerHTML = "Alphanumeric values are allowed";
            return false;
        }


        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").show();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();
    }

  
}
catch (e) {
    alert(e.message);
}