try {

    //function getError(result) {
    //    debugger;
    //    $("#ProcessingBar").show();

    //    var msg = result.responseJSON.Message;
    //    //alert(msg);
    //    document.getElementById("ProcessingBar").innerHTML = msg;
    //}

    //function getRoleList(printer) {
    //    debugger;
    //    rowcount = 0;
    //    $("#ProcessingBar").hide();

    //    $("#tbl_list").find("tr:gt(0)").remove();
    //    $.each(printer, function (index, print) {
    //        // Add a row to the Product table
    //        AddRecordRow(print);
    //    });
    //}

    //function AddRecordRow(print) {
    //    debugger;
    //    // Check if <tbody> tag exists, add one if not
    //    if ($("#tbl_list tbody").length == 0) {
    //        $("#tbl_list").append("<tbody></tbody>");
    //    }
    //    // Append row to <table>
    //    $("#tbl_list tbody").append(
    //        RecordTableRow(print));
    //}

    //function RecordTableRow(print) {
    //    debugger;
    //    rowcount += 1;
    //    if (print.Id != null) {
    //        var ret;

    //        /*var loginid = document.getElementById("loginid").value;*/

    //        var RetRow =
    //            '<tr>' +
    //            /*      '<td style="text-align:center;font-size: 14px;"> <div id="Id' + print.Id + '">' + print.Id + '</div></td>' +*/
    //            /*'<td class="text-wrap"><span>' + print.Id + '</span></td>' +*/
    //            '<td onclick="tick_data(' + rowcount + ')" class="text-wrap"><span><input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" onclick="tick_data(' + rowcount + ')">' + print.Name + '</input></span></td>' +
    //            '<td class="text-wrap"></td>' +
    //            '<tr>';
    //        return RetRow;
    //    }
    //    else {
    //        var ret =

    //            alert("No Records Found!!!!");
    //        return ret;
    //    }
    //}

    //function tick_data(input_para) {
    //    debugger;
    //    var data = document.getElementById('id_' + input_para).checked;
    //    debugger;
    //    if (data == true) {
    //        document.getElementById('id_' + input_para).checked = false;
    //    }
    //    else {
    //        document.getElementById('id_' + input_para).checked = true;
    //    }
    //    debugger;
    //}

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
    //        debugger;
    //        var data = document.getElementById('id_' + i).checked;
    //        if (data == true) {
    //            var val = document.getElementById('id_' + i).value;
    //            if (valPresent == false) {
    //                debugger;
    //                list = val;
    //                valPresent = true;
    //            }
    //            else {
    //                list += "," + val;
    //            }
    //        }
    //    }

    //    //checked = [];
    //    //for (var box of checked) {
    //    //    if (box.checked == true) {
    //    //        checked[checked.length] = box.value;
    //    //    }
    //    //}
    //    //document.getElementById('id_').value = checked;
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



        data = { asdrf: "1234", Name: name1, Description: desc, createdBy: uid, RoleList: list };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;
        var y = "SaveRoleData";
        $.ajax({
            type: 'POST',
            url: x + y,
            //data: { Name: name1, Description: desc, createdBy: uid, RoleList: list },
            data: { Request_Data: encrypted_data },
            success: SuccessData,
            error: CreateRoleError
        });
    }

    //function PushDataChecker() {
    //    debugger;

    //    $("#tbl_verf_fail").hide();
    //    $("#tbl_verf_result").show();
    //    $("#div_submit_pass").hide();
    //    $("#div_submit_fail").hide();
    //    $("#div_response_success").hide();
    //    $("#div_create_question").hide();

    //    document.getElementById("successMsg").innerHTML = "Processing Request...";
    //    var uid = document.getElementById("uid").value;
    //    debugger;
    //    var y = "SaveRoleData";
    //    $.ajax({
    //        type: 'POST',
    //        url: x + y,
    //        data: { Name: name1, Description: desc, createdBy: uid, RoleList: list,SakName:sakname, SakDescription:sakdiscription, modifiedBY:modifiedby, approvedBY:approvedby, SakRoleList:sakrolelist },
    //        success: SuccessData,
    //        error: CreateRoleError
    //    });
    //}
    function SuccessData(data) {
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

        document.getElementById("successMsg").innerHTML = "Role created";
    }

    function CreateRoleError(data) {

        debugger;

        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        //user04
        debugger;
        var kVal = document.getElementById("KVal").value;
        var jsonObject = JSON.parse(data.responseText);
        var encryptedData = jsonObject.Message;
        var result = decryptJsonData(encryptedData, kVal);

        document.getElementById("errorMsg").innerHTML = result;
        //document.getElementById("errorMsg").innerHTML = result.responseText;
    }

    function reloadpage() {
        debugger;
        //window.open(rooturl + "RoleMaster/ListOfRoles", "_self");
        window.location.href = rooturl + '/RoleMaster/ListOfRoles';
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