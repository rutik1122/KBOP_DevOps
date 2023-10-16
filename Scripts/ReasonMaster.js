try {

    function ValidateData() {
        debugger;
        $("#ProcessingBar").hide();

        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();


        var validName = /^[a-zA-Z ]*$/;

        var code = document.getElementById("ReasonCode").value;
        var desc = document.getElementById("Description").value;


        if (code == null || code == "") {
            document.getElementById("errorMsg").innerHTML = "Please enter Code";
            document.getElementById("ReasonCode").style.backgroundColor = "yellow";
            //document.getElementById("Code").style.border = "solid 1px #000000";
            /*document.getElementById("Code").focus();*/
            return false;
        }

        if (desc == null || desc == "") {
            /*  alert("Please enter name");*/
            /* document.getElementById("Name").focus();*/
            document.getElementById("errorMsg").innerHTML = "Please enter Description";
            document.getElementById("Description").style.backgroundColor = "yellow";
            return false;
        }
        if (!desc.match(validName)) {
            document.getElementById("errorMsg").innerHTML = "Only alphabets are allowed!";
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