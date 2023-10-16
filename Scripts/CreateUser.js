try {
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

    function UserDetailSuccess(data) {


        var accLevel = data.AccessLevel;


        //if (accLevel == "BRANCH") {
        //    $("#ORG").hide();
        //    $("#CUST").hide();
        //    $("#DOM").hide();
        //}
        //else if (accLevel == "DOM") {
        //    //$("#AccSelect").hide();
        //    $("#ORG").hide();
        //    $("#CUST").hide();
        //}
        //else if (accLevel == "CUST") {
        //    $("#ORG").hide();
        //}

    }


    function ValidateData() {
        debugger;

        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        var validMatch = /^[a-zA-Z0-9]+$/;
        var validMatchLoginID = /^[a-z0-9]+$/;
        // var validEmail = /[a-z0-9]+@@[a-z]+\.[a-z]{2,3}$/;

        //Login Validation
        loginId = document.getElementById("LoginId").value;

        if (loginId == null || loginId == "") {
            document.getElementById("errorMsg").innerHTML = "LoginId can not be null!";
            document.getElementById("LoginId").style.backgroundColor = "yellow";
            document.getElementById("LoginId").addEventListener("blur", function () {
                document.getElementById("LoginId").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("LoginId").style.backgroundColor = ""; // Reset background color
        }

        //if (!loginId.match(validMatchLoginID)) {
        if (!loginId.match(validMatch)) {
            document.getElementById("errorMsg").innerHTML = "Special characters not allowed in LoginId!";
            document.getElementById("LoginId").style.backgroundColor = "yellow";
            document.getElementById("LoginId").addEventListener("blur", function () {
                document.getElementById("LoginId").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("LoginId").style.backgroundColor = ""; // Reset background color
        }

        if (loginId.length < 4) {
            document.getElementById("errorMsg").innerHTML = "Min 4 characters are required for LoginId!";
            //alert("Minimum 4 characters are required for LoginId!");
            //document.getElementsByName("LoginId")[0].style.backgroundColor = "yellow";
            //document.getElementById("LoginId").focus();
            return false;
        }

        if (loginId.length > 25) {
            document.getElementById("errorMsg").innerHTML = "Max 25 characters are allowed in LoginId!";
            //alert("Maximum 25 characters are allowed for LoginId!");
            //document.getElementsByName("LoginId")[0].style.backgroundColor = "yellow";
            //document.getElementById("LoginId").focus();
            return false;
        }

        //First Name validation

        firstname = document.getElementById("FirstName").value;
        const regexAlphaNumeric = /^[a-zA-Z0-9]+$/;


        if (firstname == null || firstname == "") {
            document.getElementById("errorMsg").innerHTML = "First name can not be null!";
            document.getElementById("FirstName").style.backgroundColor = "yellow";
            document.getElementById("FirstName").addEventListener("blur", function () {
                document.getElementById("FirstName").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("LoginId").style.backgroundColor = ""; // Reset background color
        }



        if (!firstname.match(regexAlphaNumeric)) {
            document.getElementById("errorMsg").innerHTML = "Alphanumeric values are allowed in First Name";
            document.getElementById("FirstName").style.backgroundColor = "yellow";
            document.getElementById("FirstName").addEventListener("blur", function () {
                document.getElementById("FirstName").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("LoginId").style.backgroundColor = ""; // Reset background color
        }

        if (!firstname.match(validMatch)) {
            document.getElementById("errorMsg").innerHTML = "Special characters are not allowed in First name!";
            document.getElementById("FirstName").style.backgroundColor = "yellow";
            document.getElementById("FirstName").addEventListener("blur", function () {
                document.getElementById("FirstName").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("LoginId").style.backgroundColor = ""; // Reset background color
        }

        if (firstname.length > 25) {
            document.getElementById("errorMsg").innerHTML = "Max 25 characters are allowed for First Name!";
            return false;
        }

        //Last Name validation
        lastname = document.getElementById("LastName").value;



        if (lastname != null && lastname != "") {
            if (!lastname.match(regexAlphaNumeric)) {
                document.getElementById("errorMsg").innerHTML = "Alphanumeric values are allowed in Last Name";
                return false;
            }

            if (!lastname.match(validMatch)) {
                document.getElementById("errorMsg").innerHTML = "Special characters are not allowed in Last name!";
                return false;
            }


            if (lastname.length > 25) {
                document.getElementById("errorMsg").innerHTML = "Max 25 characters are allowed for Last Name!";
                return false;
            }
        }

        //Email validation
        emailid = document.getElementById("EmailId").value;
        if (emailid != null && emailid != "") {

        }

        debugger;
        userlevel = document.getElementById("UserLevel").value;
        if (userlevel == null || userlevel == "0" || userlevel.toUpperCase() == "SELECT") {
            document.getElementById("errorMsg").innerHTML = "Please select User Type!";
            document.getElementById("UserLevel").style.backgroundColor = "yellow";
            document.getElementById("UserLevel").addEventListener("blur", function () {
                document.getElementById("UserLevel").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("LoginId").style.backgroundColor = ""; // Reset background color
        }

        // Access Level Verification
        accLevel = document.getElementById("accesstype").value;
        if (accLevel == null || accLevel == "" || accLevel == "0") {
            document.getElementById("errorMsg").innerHTML = "Please select Access Type!";
            document.getElementById("accesstype").style.backgroundColor = "yellow";
            document.getElementById("accesstype").addEventListener("blur", function () {
                document.getElementById("accesstype").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("LoginId").style.backgroundColor = ""; // Reset background color
        }

        var checked = $('#data_list').find(':checked').length;

        //if (!checked) {
        //    document.getElementById("errorMsg").innerHTML = "";
        //    alert("Please select any Organization");
        //    return false;
        //}

        // for in userlever(teller) and accesslever(branch) then only select one list item
        debugger;
        if (userlevel.toUpperCase() == "TELLER" && accLevel.toUpperCase() == "BRANCH") {
            var checkboxes = $('#data_list').find(':checked').length;

            if (checkboxes !== 1) {
                document.getElementById("errorMsg").innerHTML = "Please select only one Branch!";
                return false;
            }

        }

        else if (userlevel.toUpperCase() == "BRANCH" && accLevel.toUpperCase() == "BRANCH") {
            var checkboxes = $('#data_list').find(':checked').length;

            if (checkboxes !== 1) {
                document.getElementById("errorMsg").innerHTML = "Please select only one Branch!";
                return false;
            }

        }

        // for  accesslever(ORGANIZATION) then only select one list item
        debugger;
        if (accLevel.toUpperCase() == "ORG" && checked !== 1) {

            document.getElementById("errorMsg").innerHTML = "Please select only one Branch!";
            return false;
        }

        if (accLevel == "ORG") {
            if (!checked) {
                document.getElementById("errorMsg").innerHTML = "Please select atleast one Organization!";
                return false;
            }
        }
        else if (accLevel == "CUST") {
            if (!checked) {
                document.getElementById("errorMsg").innerHTML = "Please select atleast one Customer!";
                return false;
            }
        }
        else if (accLevel == "DOM") {
            if (!checked) {
                document.getElementById("errorMsg").innerHTML = "Please select atleast one Domain!";
                return false;
            }
        }
        else if (accLevel == "BRANCH") {
            if (!checked) {
                document.getElementById("errorMsg").innerHTML = "Please select atleast one Branch!";
                return false;
            }
        }
        else {
            document.getElementById("errorMsg").innerHTML = "Access Level not registered!";
            return false;
        }


        // l1 Maker Start & Stop Limit
        l1start = document.getElementById("L1StartLimit").value;
        l1stop = document.getElementById("L1StopLimit").value;

        if (l1start == null || l1start == "") {
            document.getElementById("errorMsg").innerHTML = "L1 Maker Start Limit cannot be blank!";
            document.getElementById("L1StartLimit").style.backgroundColor = "yellow";
            document.getElementById("L1StartLimit").addEventListener("blur", function () {
                document.getElementById("L1StartLimit").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("L1StartLimit").style.backgroundColor = ""; // Reset background color
        }

        if (l1stop == null || l1stop == "") {
            document.getElementById("errorMsg").innerHTML = "L1 Maker Stop Limit cannot be blank!";
            document.getElementById("L1StopLimit").style.backgroundColor = "yellow";
            document.getElementById("L1StopLimit").addEventListener("blur", function () {
                document.getElementById("L1StopLimit").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("L1StopLimit").style.backgroundColor = ""; // Reset background color
        }

        if ((parseInt(l1start) == 0) && (parseInt(l1stop) == 0)) {
            document.getElementById("errorMsg").innerHTML = "Please enter proper range for L1 Maker!";
            return false;
        }
        else if (parseInt(l1start) >= parseInt(l1stop)) {
            document.getElementById("errorMsg").innerHTML = "Please enter proper range for L1 Maker!";
            return false;
        }

        // L2 Checker Start & Stop Limit
        l2start = document.getElementById("L2StartLimit").value;
        l2stop = document.getElementById("L2StopLimit").value;

        if (l2start == null || l2start == "") {
            document.getElementById("errorMsg").innerHTML = "L2 Checker Start Limit cannot be blank!";
            document.getElementById("L2StartLimit").style.backgroundColor = "yellow";
            document.getElementById("L2StartLimit").addEventListener("blur", function () {
                document.getElementById("L2StartLimit").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("L2StartLimit").style.backgroundColor = ""; // Reset background color
        }

        if (l2stop == null || l2stop == "") {
            document.getElementById("errorMsg").innerHTML = "L2 Checker Stop Limit cannot be blank!";
            document.getElementById("L2StopLimit").style.backgroundColor = "yellow";
            document.getElementById("L2StopLimit").addEventListener("blur", function () {
                document.getElementById("L2StopLimit").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("L2StopLimit").style.backgroundColor = ""; // Reset background color
        }

        if ((parseInt(l2start) == 0) && (parseInt(l2stop) == 0)) {
            document.getElementById("errorMsg").innerHTML = "Please enter proper range for L2 Checker!";
            return false;
        }
        else if (parseInt(l2start) >= parseInt(l2stop)) {
            document.getElementById("errorMsg").innerHTML = "Please enter proper range for L2 Checker!";
            return false;
        }

        // L3 Checker Start & Stop Limit
        l3start = document.getElementById("L3StartLimit").value;
        l3stop = document.getElementById("L3StopLimit").value;

        if (l3start == null || l3start == "") {
            document.getElementById("errorMsg").innerHTML = "L3 Checker Start Limit cannot be blank!";
            document.getElementById("L3StartLimit").style.backgroundColor = "yellow";
            document.getElementById("L3StartLimit").addEventListener("blur", function () {
                document.getElementById("L3StartLimit").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("L3StartLimit").style.backgroundColor = ""; // Reset background color
        }

        if (l3stop == null || l3stop == "") {
            document.getElementById("errorMsg").innerHTML = "L3 Checker Stop Limit cannot be blank!";
            document.getElementById("L3StopLimit").style.backgroundColor = "yellow";
            document.getElementById("L3StopLimit").addEventListener("blur", function () {
                document.getElementById("L3StopLimit").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("L3StopLimit").style.backgroundColor = ""; // Reset background color
        }

        if ((parseInt(l3start) == 0) && (parseInt(l3stop) == 0)) {
            document.getElementById("errorMsg").innerHTML = "Please enter proper range for L3 Checker!";
            return false;
        }
        else if (parseInt(l3start) >= parseInt(l3stop)) {
            document.getElementById("errorMsg").innerHTML = "Please enter proper range for L3 Checker!";
            return false;
        }

        var valPresent = false;
        list = "";
        for (var i = 1; i <= rowcount; i++) {
            var data = document.getElementById('id_' + i).checked;
            debugger;
            if (data == true) {
                var val = document.getElementById('id_' + i).value;
                if (valPresent == false) {
                    list = val;
                    valPresent = true;
                }
                else
                    list += "," + val;
            }
        }

        debugger;

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").show();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();

    }



    function PushData() {
        debugger;

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";

        var uid = document.getElementById("uid").value;


        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);


        
        data={
            asdrf: "1234", LoginId: loginId, FirstName: firstname, LastName: lastname, EmailId: emailid, AccessLevel: accLevel, UserType: userlevel,
                L1StartLimit: l1start, L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop,
                    PlaceMapping: list, CreaterId: uid
        };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;


        var y = "SaveData";
        $.ajax({
            type: "POST",
            url: x + y,
            //data: {
            //    LoginId: loginId, FirstName: firstname, LastName: lastname, EmailId: emailid, AccessLevel: accLevel, UserType: userlevel,
            //    L1StartLimit: l1start, L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop,
            //    PlaceMapping: list, CreaterId: uid
            //},
            data: { Request_Data: encrypted_data },
            success: SubmitUserData,
            error: CreateUserFailed

        });
    }



    function SubmitUserData(data) {
        debugger;

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").show();
        $("#div_create_question").hide();


        debugger;
        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(data, kVal);

        document.getElementById("successMsg").innerHTML = "User created";

    }

    function CreateUserFailed(data) {

        debugger;

        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        debugger;
        var kVal = document.getElementById("KVal").value;
        var jsonObject = JSON.parse(data.responseText);
        var encryptedData = jsonObject.Message;
        var result = decryptJsonData(encryptedData, kVal);

        document.getElementById("errorMsg").innerHTML = result;

    }

    function decryptJsonData(encryptedData, encryptionKey) {
        //debugger;
        // Convert the encryption key to a byte array
        var keyBytes = CryptoJS.enc.Utf8.parse(encryptionKey);

        if (typeof encryptedData !== 'string') {
            encryptedData = encryptedData.toString('utf8'); // Use an appropriate encoding if necessary
        }
        // Extract the IV from the encrypted data
        var iv = encryptedData.substring(0, 24);

        // Remove the IV from the encrypted data
        var data = encryptedData.substring(24);

        // Convert the IV and encrypted data from base64 to bytes
        var ivBytes = CryptoJS.enc.Base64.parse(iv);
        var encryptedBytes = CryptoJS.enc.Base64.parse(data);

        // Create a decryption configuration object
        var decryptConfig = {
            iv: ivBytes,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            key: keyBytes,
        };

        // Decrypt the encrypted data using the decryption configuration
        var decryptedData = CryptoJS.AES.decrypt(
            { ciphertext: encryptedBytes },
            keyBytes,
            decryptConfig
        );

        // Convert the decrypted data to a string and trim any padding
        var decryptedString = decryptedData.toString(CryptoJS.enc.Utf8).trim();

        // Parse the decrypted JSON data into an object
        //var decryptedObject = JSON.parse(decryptedString);

        //debugger;

        // Use the decrypted object as needed
        //console.log(decryptedObject);

        return decryptedString;
    }
}
catch (e) {
    alert(e.message);
}