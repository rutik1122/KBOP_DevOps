try {
    function getError(result) {
        debugger;
        $("#ProcessingBar").show();

        var msg = result.responseJSON.Message;
        //alert(msg);
        document.getElementById("ProcessingBar").innerHTML = msg;
    }

    function GetUserDetails(data) {
        debugger;

        $("#ProcessingBar").hide();

        document.getElementById("LoginId").value = data.LoginId;
        document.getElementById("FirstName").value = data.FirstName;
        document.getElementById("LastName").value = data.LastName;
        document.getElementById("emailId").value = data.EmailId;
        document.getElementById("UserLevel").value = data.UserType;
        document.getElementById("accesstype").value = data.AccessLevel;
        document.getElementById("L1StartLimit").value = data.L1StartLimit;
        document.getElementById("L1StopLimit").value = data.L1StopLimit;
        document.getElementById("L2StartLimit").value = data.L2StartLimit;
        document.getElementById("L2StopLimit").value = data.L2StopLimit;
        document.getElementById("L3StartLimit").value = data.L3StartLimit;
        document.getElementById("L3StopLimit").value = data.L3StopLimit;
        Status = data.Status;

        debugger;

        old_UserLevel = data.UserType;
        //UserLevel = data.UserType;
        //old_UserLevel = data.UserType;

        var list = document.getElementById("accesstype").value;
        GetMasterList(list);
    }

    function GetUserDetailsCreateChecker(data) {
        debugger;

        $("#ProcessingBar").hide();

        document.getElementById("LoginId").value = data.LoginId;
        document.getElementById("FirstName").value = data.FirstName;
        document.getElementById("LastName").value = data.LastName;
        document.getElementById("emailId").value = data.EmailId;
        document.getElementById("UserLevel").value = data.UserType;
        document.getElementById("accesstype").value = data.AccessLevel;
        document.getElementById("L1StartLimit").value = data.L1StartLimit;
        document.getElementById("L1StopLimit").value = data.L1StopLimit;
        document.getElementById("L2StartLimit").value = data.L2StartLimit;
        document.getElementById("L2StopLimit").value = data.L2StopLimit;
        document.getElementById("L3StartLimit").value = data.L3StartLimit;
        document.getElementById("L3StopLimit").value = data.L3StopLimit;
        Status = data.Status;

        debugger;

        old_UserLevel = data.UserType;
        //UserLevel = data.UserType;
        //old_UserLevel = data.UserType;

        var list = document.getElementById("accesstype").value;
        GetMasterListChecker(list);
    }

    function GetUserEditDetails(data) {
        debugger;

        $("#ProcessingBar").hide();

        document.getElementById("LoginId").value = data.LoginId;
        document.getElementById("FirstName").value = data.SakFirstName;
        document.getElementById("LastName").value = data.SakLastName;
        document.getElementById("emailId").value = data.SakEmailId;
        document.getElementById("UserLevel").value = data.SakUserType;
        document.getElementById("accesstype").value = data.SakAccessLevel;
        document.getElementById("L1StartLimit").value = data.SakL1StartLimit;
        document.getElementById("L1StopLimit").value = data.SakL1StopLimit;
        document.getElementById("L2StartLimit").value = data.SakL2StartLimit;
        document.getElementById("L2StopLimit").value = data.SakL2StopLimit;
        document.getElementById("L3StartLimit").value = data.SakL3StartLimit;
        document.getElementById("L3StopLimit").value = data.SakL3StopLimit;
        Status = data.Status;

        debugger;

        old_UserLevel = data.SakUserType;
        //UserLevel = data.UserType;
        //old_UserLevel = data.UserType;

        var list = document.getElementById("accesstype").value;
        GetMasterListChecker(list);
    }

    function SubmitData() {
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
            document.getElementById("errorMsg").innerHTML = "LoginId is Mandatory!";
            //alert("LoginId can not be null! Please Enter LoginId!");
            //document.getElementsByName("LoginId")[0].style.backgroundColor = "yellow";
            //document.getElementById("LoginId").focus();
            return false;
        }

        //if (!loginId.match(validMatchLoginID)) {
        if (!loginId.match(validMatch)) {
            document.getElementById("errorMsg").innerHTML = "Special characters not allowed in LoginId!";
            //alert('Special characters and capital letters are not allowed in LoginId!');
            //document.getElementById("LoginId").value = "";
            //document.getElementsByName("LoginId")[0].style.backgroundColor = "yellow";
            //document.getElementById("LoginId").focus();
            return false;
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

        if (firstname == null || firstname == "") {
            document.getElementById("errorMsg").innerHTML = "First name is mandatory!";
            return false;
        }

        if (!firstname.match(validMatch)) {
            document.getElementById("errorMsg").innerHTML = "Special characters are not allowed in First name!";
            return false;
        }

        //if (firstname.length < 4) {
        //    document.getElementById("errorMsg").innerHTML = "Min 4 characters are required for First name!";
        //    return false;
        //}

        if (firstname.length > 25) {
            document.getElementById("errorMsg").innerHTML = "Max 25 characters are allowed for First Name!";
            return false;
        }

        //Last Name validation
        lastname = document.getElementById("LastName").value;

        if (lastname != null && lastname != "") {
            if (!lastname.match(validMatch)) {
                document.getElementById("errorMsg").innerHTML = "Special characters are not allowed in Last name!";
                return false;
            }

            //if (lastname.length < 4) {
            //    document.getElementById("errorMsg").innerHTML = "Min 4 characters are required for Last name!";
            //    return false;
            //}

            if (lastname.length > 25) {
                document.getElementById("errorMsg").innerHTML = "Max 25 characters are allowed for Last Name!";
                return false;
            }
        }

        //Email validation
        emailid = document.getElementById("emailId").value;
        if (emailid != null && emailid != "") {

        }

        debugger;
        userlevel = document.getElementById("UserLevel").value;
        //$("#UserLevel option:selected").val();
        if (userlevel == null || userlevel == "0" || userlevel == "Select") {
            document.getElementById("errorMsg").innerHTML = "Please select User Type!";
            return false;
        }

        // Access Level Verification
        accLevel = document.getElementById("accesstype").value;
        if (accLevel == null || accLevel == "" || accLevel == "0") {
            document.getElementById("errorMsg").innerHTML = "Please select Access Type!";
            return false;
        }

        var checked = $('#data_list').find(':checked').length;

        //if (!checked) {
        //    document.getElementById("errorMsg").innerHTML = "";
        //    alert("Please select any Organization");
        //    return false;
        //}

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

        if (accLevel.toUpperCase() == "ORG" && checked !== 1) {

            document.getElementById("errorMsg").innerHTML = "Please select only one Organization!";
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
            return false;
        }
        else if (l1stop == null || l1stop == "") {
            document.getElementById("errorMsg").innerHTML = "L1 Maker Stop Limit cannot be blank!";
            return false;
        }
        else if ((parseInt(l1start) == 0) && (parseInt(l1stop) == 0)) {
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
            return false;
        }
        else if (l2stop == null || l2stop == "") {
            document.getElementById("errorMsg").innerHTML = "L2 Checker Stop Limit cannot be blank!";
            return false;
        }
        else if ((parseInt(l2start) == 0) && (parseInt(l2stop) == 0)) {
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
            return false;
        }
        else if (l3stop == null || l3stop == "") {
            document.getElementById("errorMsg").innerHTML = "L3 Checker Stop Limit cannot be blank!";
            return false;
        }
        else if ((parseInt(l3start) == 0) && (parseInt(l3stop) == 0)) {
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

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);


        data = {
            asdrf: "1234", Id: id, FirstName: firstname, LastName: lastname, EmailId: emailid, UserType: userlevel, AccessLevel: accLevel, L1StartLimit: l1start,
            L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop, PlaceMapping: list,
            ModifiedBy: uid

        };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;


        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";

        var y = "UpdateUserData";

        $.ajax({
            type: "POST",
            url: x + y,
            //data: {
            //    Id: id, FirstName: firstname, LastName: lastname, EmailId: emailid, UserType: userlevel, AccessLevel: accLevel, L1StartLimit: l1start,
            //    L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop, PlaceMapping: list,
            //    ModifiedBy: uid

            //},
            data: { Request_Data: encrypted_data },
            success: SuccessResponse,
            error: ErrorApiMessage1
        });
    }

    function SuccessResponse(data) {

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

        document.getElementById("successMsg").innerHTML = "User Updated";
        window.location.href = rooturl + 'UserManagement/UserList';

    }
    function PushDelete() {
        debugger;

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);


        data = {
            asdrf: "1234", Id: id, FirstName: firstname, LastName: lastname, EmailId: emailid, UserType: userlevel, AccessLevel: accLevel, L1StartLimit: l1start,
            L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop, PlaceMapping: list,
            ModifiedBy: uid

        };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;


        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";

        var y = "DeleteUser";

        $.ajax({
            type: "POST",
            url: x + y,
            //data: {
            //    Id: id, FirstName: firstname, LastName: lastname, EmailId: emailid, UserType: userlevel, AccessLevel: accLevel, L1StartLimit: l1start,
            //    L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop, PlaceMapping: list,
            //    ModifiedBy: uid

            //},
            data: { Request_Data: encrypted_data },
            success: SuccessResponseDelete,
            error: ErrorApiMessage1
        });
    }

    function SuccessResponseDelete(data) {

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


        document.getElementById("successMsg").innerHTML = "User Updated";
        window.location.href = rooturl + 'UserManagement/UserList';

    }

    function ErrorApiMessage(data) {
        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();


        document.getElementById("errorMsg").innerHTML = data.responseText;
    }

    //user04 for edit
    function ErrorApiMessage1(data) {
        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();


        debugger;
        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(data, kVal);


        document.getElementById("errorMsg").innerHTML = result.responseText;
    }

    //Checker Create Accept & Reject
    function PushDataChecker() {
        debugger;

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);

        data = {
            asdrf: "1234", Id: id, FirstName: firstname, LastName: lastname, EmailId: emailid, UserType: userlevel, AccessLevel: accLevel, L1StartLimit: l1start,
            L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop, PlaceMapping: list,
            CreaterId: uid, ApprovedBy: uid

        };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();


        var y = "SaveDataCreateChecker";

        $.ajax({
            type: "POST",
            url: x + y,
            //data: {
            //    Id: id, FirstName: firstname, LastName: lastname, EmailId: emailid, UserType: userlevel, AccessLevel: accLevel, L1StartLimit: l1start,
            //    L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop, PlaceMapping: list,
            //    CreaterId: uid, ApprovedBy: uid

            //},
            data: { Request_Data: encrypted_data },
            success: SuccessResponseCreateChecker,
            error: ErrorApiMessageCreateChecker
        });
    }

    function SuccessResponseCreateChecker(data) {

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

        document.getElementById("successMsg").innerHTML = result; //"User Request Accepted";
        window.location.href = rooturl + 'UserManagement/UserCheckerList';

    }

    function ErrorApiMessageCreateChecker(data) {
        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        debugger;
        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(data, kVal);

        document.getElementById("errorMsg").innerHTML = result.responseText;
    }

    //Checker Edit Accept & Reject
    function PushDataEditChecker() {
        debugger;

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);
                
        data = {
            asdrf: "1234", Id: id, FirstName: firstname, LastName: lastname, EmailId: emailid, UserType: userlevel, AccessLevel: accLevel, L1StartLimit: l1start,
            L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop, PlaceMapping: list,
            ApprovedBy: uid

        };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;
       


        var y = "UpdateUserSakData";

        $.ajax({
            type: "POST",
            url: x + y,
            //data: {
            //    Id: id, FirstName: firstname, LastName: lastname, EmailId: emailid, UserType: userlevel, AccessLevel: accLevel, L1StartLimit: l1start,
            //    L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop, PlaceMapping: list,
            //    ApprovedBy: uid

            //},
            data: { Request_Data: encrypted_data },
            success: SuccessResponseEditChecker,
            error: ErrorApiMessageEditChecker
        });
    }


    function SuccessResponseEditChecker(data) {

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

        document.getElementById("successMsg").innerHTML = result;// "User Request Accepted";
        window.location.href = rooturl + 'UserManagement/UserCheckerList';

    }

    function ErrorApiMessageEditChecker(data) {
        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        debugger;
        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(data, kVal);

        document.getElementById("errorMsg").innerHTML = result.responseText;
    }

    //Checker Delete Accept & Reject
    function PushDataDeleteChecker() {
        debugger;

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";
        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);

        data = {
            asdrf: "1234", Id: id, FirstName: firstname, LastName: lastname, EmailId: emailid, UserType: userlevel, AccessLevel: accLevel, L1StartLimit: l1start,
            L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop, PlaceMapping: list,
            ApprovedBy: uid

        };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;

        var y = "DeleteUserRequest";

        $.ajax({
            type: "POST",
            url: x + y,
            //data: {
            //    Id: id, FirstName: firstname, LastName: lastname, EmailId: emailid, UserType: userlevel, AccessLevel: accLevel, L1StartLimit: l1start,
            //    L1StopLimit: l1stop, L2StartLimit: l2start, L2StopLimit: l2stop, L3StartLimit: l3start, L3StopLimit: l3stop, PlaceMapping: list,
            //    ApprovedBy: uid

            //},
            data: { Request_Data: encrypted_data },
            success: SuccessResponseDeleteChecker,
            error: ErrorApiMessageDeleteChecker
        });
    }

    function SuccessResponseDeleteChecker(data) {

        debugger;

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").show();
        $("#div_create_question").hide();

        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(data, kVal);

        document.getElementById("successMsg").innerHTML = result;// "User Request Accepted";
        window.location.href = rooturl + 'UserManagement/UserCheckerList';

    }

    function ErrorApiMessageDeleteChecker(data) {
        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(data, kVal);

        document.getElementById("errorMsg").innerHTML = result.responseText;
    }





    function goToUserList() {
        window.open(rooturl + "UserManagement/UserList", "_self");
    }

    function goToUserCheckerList() {
        window.location.href = rooturl + 'UserManagement/UserCheckerList';
    }
    //User04
    function decryptJsonData(encryptedData, encryptionKey) {
        //debugger;
        // Convert the encryption key to a byte array
        var keyBytes = CryptoJS.enc.Utf8.parse(encryptionKey);

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