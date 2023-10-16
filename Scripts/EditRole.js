try {
    //function getError(result) {
    //    debugger;
    //    $("#ProcessingBar").show();

    //    var msg = result.responseJSON.Message;
    //    //alert(msg);
    //    document.getElementById("ProcessingBar").innerHTML = msg;
    //}

    function GetRoleDetails(data) {
        debugger;

        $("#ProcessingBar").hide();

        document.getElementById("name").value = data.Name;
        document.getElementById("description").value = data.Description;

        /*getRoleList(id);*/
        $.ajax({
            url: x + 'RoleList',
            type: 'POST',
            data: {Id:id, Action: actionType },
            success: getRoleList,
            error: getError
        })
    }

    function GetRoleEditSakDetails(data) {
        debugger;

        $("#ProcessingBar").hide();

        document.getElementById("name").value = data.SakName;
        document.getElementById("description").value = data.SakDescription;

        Status = data.Status;

        /*getRoleList(id);*/
        $.ajax({
            url: x + 'RoleListChecker',
            type: 'POST',
            data: { Id: id, Action: actionType },
            success: getRoleListEditChecker,
            error: getError
        })
    }
    function GetRoleCreateChecker(data) {
        debugger;

        $("#ProcessingBar").hide();

        document.getElementById("name").value = data.Name;
        document.getElementById("description").value = data.Description;
        debugger;
        Status = data.Status;
        debugger;


        /*getRoleList(id);*/
        $.ajax({
            url: x + 'RoleList',
            type: 'POST',
            data: { Id: id, Action: actionType},
/*            success: getRoleList,*/
            success: getRoleListChecker,
            error: getError
        })
    }

    function GetRoleDeleteDetails(data) {
        debugger;

        $("#ProcessingBar").hide();

        document.getElementById("name").value = data.Name;
        document.getElementById("discription").value = data.Description;

        /*getRoleList(id);*/
        $.ajax({
            url: x + 'RoleList',
            type: 'POST',
            data: { Id: id, Action: actionType },
            success: getRoleListEditChecker,
         /*   success: getRoleListEditChecker;*/
            error: getError
        })
    }


    //function ValidateData() {
    //    debugger;
    //    $("#tbl_verf_fail").show();
    //    $("#tbl_verf_result").hide();
    //    $("#div_submit_pass").hide();
    //    $("#div_submit_fail").show();
    //    $("#div_response_success").hide();
    //    $("#div_create_question").hide();

    //    var validName = /^[A-Za-z]+$/;

    //    name1 = document.getElementById("name").value;
    //    desc = document.getElementById("description").value;
    //    if (name1 == null || name1 == "") {
    //        alert("Please enter name");
    //        document.getElementById("name").focus();
    //        return false;
    //    }

    //    if (!name1.match(validName)) {
    //        alert("Enter only alphabets in name");
    //        document.getElementById("name").focus();
    //        return false;
    //    }

    //    var checked = $('#tbl_list').find(':checked').length;
    //    if (!checked) {
    //        alert("Please select alteast one role");
    //        return false;
    //    }

    //    debugger;
    //    var valPresent = false;
    //    list = "";
    //    for (var i = 1; i <= rowcount; i++) {
            
    //        var data = document.getElementById('id_' + i).checked;
    //        if (data == true) {
    //            var val = document.getElementById('id_' + i).value;
    //            if (valPresent == false) {
                   
    //                list = val;
    //                valPresent = true;
    //            }
    //            else {
    //                list += "," + val;
    //            }
    //        }
    //    }
    //    debugger;

    //    $("#tbl_verf_fail").hide();
    //    $("#tbl_verf_result").hide();
    //    $("#div_submit_pass").show();
    //    $("#div_submit_fail").hide();
    //    $("#div_response_success").hide();
    //    $("#div_create_question").show();
    //}

    function PushData() {
        debugger;


        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);


        data = { asdrf: "1234", Id: id, Name: name1, Description: desc, ModifiedBy: uid, RoleList: list, Action: actionType };

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

        var y = "SaveRoleData";

        $.ajax({
            type: "POST",
            url: x + y,
            /*data: { Id: id, Name: name1, Description: desc, ModifiedBy:uid, RoleList: list, Action: actionType },*/
            data: { Request_Data: encrypted_data },
            success: RoleSuccess1,
            error: ErrorApiMessage
        });
    }
    function RoleSuccess(data) {

        debugger;

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").show();
        $("#div_create_question").hide();

        
        document.getElementById("successMsg").innerHTML = "Role Updated";
        window.location.href = rooturl + 'RoleMaster/ListOfRoles';

    }

    function RoleSuccess1(data) {

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

        document.getElementById("successMsg").innerHTML = "Role Updated";
        window.location.href = rooturl + 'RoleMaster/ListOfRoles';

    }


    function PushDelete() {

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);


        data = { asdrf: "1234", Id: id, Name: name1, Description: desc, ModifiedBy: uid, RoleList: list, Action: actionType };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;


        debugger;
        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";

        var y = "DeleteChecker";

        $.ajax({
            type: "POST",
            url: x + y,
            //data: { Id: id, Name: name1, Description: desc, ModifiedBy: uid, RoleList: list, Action: actionType },
            data: { Request_Data: encrypted_data },
            success: RoleSuccess1,
            error: ErrorApiMessage1
        });
    }

    //function RoleSuccess(data) {

    //    debugger;

    //    $("#tbl_verf_fail").hide();
    //    $("#tbl_verf_result").show();
    //    $("#div_submit_pass").hide();
    //    $("#div_submit_fail").hide();
    //    $("#div_response_success").show();
    //    $("#div_create_question").hide();

    //    document.getElementById("successMsg").innerHTML = "Role Updated";
    //    window.location.href = rooturl + 'RoleMaster/ListOfRoles';

    //}

    function PushCheckerData() {
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


        data = { asdrf: "1234", Id: id, Name: name1, Description: desc, ApprovedBy: uid, RoleList: list, Action: actionType };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;


        var y = "SaveRoleCheckerdata";

        $.ajax({
            type: "POST",
            url: x + y,
            //data: { Id: id, Name: name1, Description: desc,  ApprovedBy: uid ,RoleList: list, Action: actionType }, 
            data: { Request_Data: encrypted_data },
            success: RoleSuccessChecker,
            error: ErrorApiMessage
        });
    }
    function RoleSuccessChecker(data) {

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

        document.getElementById("successMsg").innerHTML = result;// "Create Request Accepted";
        window.location.href = rooturl + 'RoleMaster/ListOfRolesChecker';

    }

    function PushEditData() {
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


        data = { asdrf: "1234", Id: id, Name: name1, Description: desc, ModifiedBy: uid, RoleList: list, Action: actionType };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;


        var y = "SaveRoleEditdata";

        $.ajax({
            type: "POST",
            url: x + y,
            //data: { Id: id, Name: name1, Description: desc, ApprovedBy:uid, RoleList: list, Action: actionType },
            data: { Request_Data: encrypted_data },
            success: RoleSuccessEdit,
            error: ErrorApiMessage
        });
    }

    function RoleSuccessEdit(data) {

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


        document.getElementById("successMsg").innerHTML = result;// "Edit Request Accepted";
        //window.location.href = '/RoleMaster/ListOfRolesChecker';

    }

    function Reload() {
        window.location.href = rooturl + 'RoleMaster/ListOfRolesChecker';
        //window.location.href = '/RoleMaster/ListOfRolesChecker';
    }
    function PushDeleteData() {
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


        data = { asdrf: "1234", Id: id, Name: name1, Description: desc, ApprovedBy: uid, RoleList: list, Action: actionType };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;

        var y = "DeleteRequest";

        $.ajax({
            type: "POST",
            url: x + y,
            //data: { Id: id, Name: name1, Description: desc, ApprovedBy: uid, RoleList: list, Action: actionType },
            data: { Request_Data: encrypted_data },
            success: RoleSuccessDelete,
            error: ErrorApiMessage
        });
    }

    function RoleSuccessDelete(data) {

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

        document.getElementById("successMsg").innerHTML = result;// "Delete Request Accepted";
        //window.location.href = '/RoleMaster/ListOfRolesChecker';

    }
 

    function ErrorApiMessage(data) {
        debugger;

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

    //user04 for edit
    function ErrorApiMessage1(data) {
        debugger;

        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        //debugger;
        //var kVal = document.getElementById("KVal").value;
        //var result = decryptData(data, kVal);

        debugger;
        var kVal = document.getElementById("KVal").value;
        var jsonObject = JSON.parse(data.responseText);
        var encryptedData = jsonObject.Message;
        var result = decryptJsonData(encryptedData, kVal);

        document.getElementById("errorMsg").innerHTML = result;

    }
    function popupMsgForRejectRequest() {
        debugger;
        $("#tbl_verf_result_reject").hide();
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