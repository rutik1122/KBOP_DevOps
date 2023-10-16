try {
    function getError(result) {
        debugger;
        $("#ProcessingBar").show();

        var msg = result.responseJSON.Message;
        //alert(msg);
        document.getElementById("ProcessingBar").innerHTML = msg;
    }
    //for Role maker
    function getList_Roles(printer) {
        debugger;

        $("#ProcessingBar").hide();

        $("#tbl_rolelist").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow_userlist(print);
        });
    }

    function AddRecordRow_userlist(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_rolelist tbody").length == 0) {
            $("#tbl_rolelist").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_rolelist tbody").append(
            RecordTableRow_userlist(print));
    }

    function RecordTableRow_userlist(print) {
        debugger;
        if (print.Id != null) {
            var ret;

            /*var loginid = document.getElementById("loginid").value;*/

            var RetRow =
                '<tr>' +
                '<td style="text-align:center;font-size: 14px;" hidden> <div id="Id' + print.Id + '">' + print.Id + '</div></td>' +
                /*'<td class="text-wrap"><span hidden>' + print.Id + '</span></td>'+*/
                '<td class="text-wrap"><span>' + print.Name + '</span></td>';



            if (print.StatusDesc.toUpperCase() == "ACTIVE") {
                RetRow = RetRow +
                    '<td class="text-wrap"><span class="badge bg-success" style="font-size:100%; min-width:70px !important;">' + print.StatusDesc + '</span></td>';
            }
            else {
                RetRow = RetRow +
                    '<td class="text-wrap"><span class="badge bg-warning" style="font-size:100%; min-width:70px !important;">' + print.StatusDesc + '</span></td>';
            }

            if (print.Status == 0) {
                RetRow = RetRow +
                    '<td>' +
                    '<div class="btn-group">' +
                    '<span onclick="Edit(' + print.Id + ')" class="btn btn-sm btn-primary"><i class="fas fa-edit text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"></i></span>' +
                    '<span onclick="Roledetails(' + print.Id + ')" class="btn btn-sm btn-info">' + '<i class="fas fa-eye text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="View Details">' + '</i>' + '   </span>' +
                    '<span onclick="RoleDelete(' + print.Id + ')"  class="btn btn-sm btn-danger" data-bs-toggle="modal" href="#authenticationmodal">' + ' <i class="fas fa-trash-alt text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">' + '</i>' + '   </span>';
            }

            else if (print.Status == 1) {
                RetRow = RetRow +
                    '<td class="text-wrap"><span class="badge bg-success" style="font-size:100%; min-width:70px !important;">' + "Create Request" + '</span></td>';
            }
            else if (print.Status == 2) {
                RetRow = RetRow +
                    '<td class="text-wrap"><span class="badge bg-warning" style="font-size:100%; min-width:70px !important;">' + "Edit Request" + '</span></td>';
            }
            else if (print.Status == 3) {
                RetRow = RetRow +
                    '<td class="text-wrap"><span class="badge bg-warning" style="font-size:100%; min-width:70px !important;">' + "Delete Request" + '</span></td>';
            }
            else if (print.Status == 5) {
                RetRow = RetRow +
                    '<td class="text-wrap"><span class="badge bg-warning" style="font-size:100%; min-width:70px !important;">' + "Disable Request" + '</span></td>';
            }
            else if (print.Status == 6) {
                RetRow = RetRow +
                    '<td class="text-wrap"><span class="badge bg-warning" style="font-size:100%; min-width:70px !important;">' + "Enable Request" + '</span></td>';
            }


            if (print.StatusDesc.toUpperCase() != "ACTIVE") {
                /* var ac = "ENABLE";*/
                RetRow = RetRow +
                    '<span onclick="Activate(' + print.Id + ')"  class="btn btn-sm btn-success" data-bs-toggle="modal" href="#authenticationmodal">' + ' <i class="fa fa-user text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Activate">' + '</i>' + '   </span>';
            }
            else {
                /*  var ac= "DISABLED"*/
                RetRow = RetRow +
                    '<span onclick="DeActivate(' + print.Id + ')"  class="btn btn-sm btn-warning" data-bs-toggle="modal" href="#authenticationmodal">' + ' <i class="fa fa-user text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="DeActivate">' + '</i>' + '   </span>';
            }
            '</div>' +
                '</td>';
            '</tr>';



            return RetRow;
        }
        else {
            var ret =

                alert("No Records Found!!!!");
            return ret;
        }
    }

    //for Role Checker
    function getList_Roles_checker(printer) {
        debugger;

        $("#ProcessingBar").hide();

        $("#tbl_rolelist").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow_userlist_checker(print);
        });
    }

    function AddRecordRow_userlist_checker(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_rolelist tbody").length == 0) {
            $("#tbl_rolelist").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_rolelist tbody").append(
            RecordTableRow_userlist_checker(print));
    }

    function RecordTableRow_userlist_checker(print) {
        //debugger;
        if (print.Id != null) {
            var ret;

            /*var loginid = document.getElementById("loginid").value;*/
            //var loginid = document.getElementById("loginid").value;
            //var checkerRights = Boolean(document.getElementById("checkerRights").value);

            var RetRow =
                '<tr>' +
                '<td style="text-align:center;font-size: 14px;" hidden> <div id="Id' + print.Id + '">' + print.Id + '</div></td>' +
                /*'<td class="text-wrap"><span hidden>' + print.Id + '</span></td>'+*/
                '<td class="text-wrap"><span>' + print.Name + '</span></td>';


            if (print.Status == 1) {
                RetRow = RetRow +
                    '<td class="text-wrap"><span  style="font-size:100%; min-width:70px !important;">' + "Create Request" + '</span></td>';
            }
            else if (print.Status == 2) {
                RetRow = RetRow +
                    '<td class="text-wrap"><span style="font-size:100%; min-width:70px !important;">' + "Edit Request" + '</span></td>';
            }
            else if (print.Status == 3) {
                RetRow = RetRow +
                    '<td class="text-wrap"><span  style="font-size:100%; min-width:70px !important;">' + "Delete Request" + '</span></td>';
            }
            else if (print.Status == 5) {
                RetRow = RetRow +
                    '<td class="text-wrap"><span  style="font-size:100%; min-width:70px !important;">' + "Disable Request" + '</span></td>';
            }
            else if (print.Status == 6) {
                RetRow = RetRow +
                    '<td class="text-wrap"><span  style="font-size:100%; min-width:70px !important;">' + "Enable Request" + '</span></td>';
            }


            RetRow = RetRow +
                '<td class="text-wrap"><span>' + print.RequestedBY + '</span></td>';

            ////
            //debugger;

            var id = print.Id;

            var url = '@Url.Action("RoleCreateChecker", "RoleMaster")' + '?id=' + id;

            if (print.AllowAccess == 0) {
                RetRow = RetRow +
                    '<td class="text-wrap"><span class="badge" style="font-size:100%; min-width:70px !important;">' +
                    '<a href="' + url + '" class="btn btn-sm btn-primary" hidden>' +
                    '<i class="fas fa-edit text-white" data-bs-toggle="tooltip" data-bs-placement="top"></i>' +
                    '</a>' +
                    '<label style="color: red">Access Denied</label>' +
                    '</span></td > ';

            }
            else if (print.AllowAccess == 1 && print.Status == 1) {
                RetRow = RetRow +
                    '<td>' +
                    '<div class="btn-group">' +
                    '<span onclick="RoleChecker(' + print.Id + ')" class="btn btn-sm btn-primary"><i class="fas fa-edit text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"></i></span>';

                '</div>' +
                    '</td>';
                '</tr>';

            }
            else if (print.AllowAccess == 1 && print.Status == 2) {
                RetRow = RetRow +
                    '<td>' +
                    '<div class="btn-group">' +
                    '<span onclick="RoleEditChecker(' + print.Id + ')" class="btn btn-sm btn-primary"><i class="fas fa-edit text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"></i></span>';

                '</div>' +
                    '</td>';
                '</tr>';

            }
            else if (print.AllowAccess == 1 && print.Status == 3) {
                RetRow = RetRow +
                    '<td>' +
                    '<div class="btn-group">' +
                    '<span onclick="RoleDeleteChecker(' + print.Id + ')" class="btn btn-sm btn-primary"><i class="fas fa-edit text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"></i></span>';

                '</div>' +
                    '</td>';
                '</tr>';

            }
            else if (print.AllowAccess == 1 && print.Status == 5) {
                RetRow = RetRow +
                    '<td>' +
                    '<div class="btn-group">' +
                    '<span onclick="DeActivate(' + print.Id + ')"  class="btn btn-sm btn-warning" data-bs-toggle="modal" href="#authenticationmodal">' + ' <i class="fa fa-user text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Disable">' + '</i>' + '   </span>';

                '</div>' +
                    '</td>';
                '</tr>';

            }
            else if (print.AllowAccess == 1 && print.Status == 6) {
                RetRow = RetRow +
                    '<td>' +
                    '<div class="btn-group">' +
                    '<span onclick="Activate(' + print.Id + ')"  class="btn btn-sm btn-success" data-bs-toggle="modal" href="#authenticationmodal">' + ' <i class="fa fa-user text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Enable">' + '</i>' + '   </span>';

                '</div>' +
                    '</td>';
                '</tr>';

            }



            return RetRow;
        }
        else {
            var ret =

                alert("No Records Found!!!!");
            return ret;
        }
    }

    function Edit(id) {
        debugger;
        window.open(rooturl + "RoleMaster/EditRole?id=" + id, "_self");
    }

    function RoleChecker(id) {
        debugger;
        window.open(rooturl + "RoleMaster/RoleCreateChecker?id=" + id, "_self");
    }

    function RoleEditChecker(id) {
        debugger;
        window.open(rooturl + "RoleMaster/RoleEditChecker?id=" + id, "_self");
    }

    function RoleDeleteChecker(id) {
        debugger;
        window.open(rooturl + "RoleMaster/RoleDeleteChecker?id=" + id, "_self");
    }


    function Roledetails(id) {
        debugger;
        window.open(rooturl + "RoleMaster/Detials?id=" + id, "_self");
    }
    function reloadpage() {
        debugger;
        window.open(rooturl + "RoleMaster/ListOfRoles", "_self");
    }

    function reloadpageChecker() {
        debugger;
        window.open(rooturl + "RoleMaster/ListOfRolesChecker", "_self");
    }

    function RoleDelete(id) {
        debugger;
        window.open(rooturl + "RoleMaster/DeleteRole?id=" + id, "_self");
    }
    function Activate(userid) {
        debugger;
        id = userid;
        /*action = actType;*/
        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass_delete").hide();
        $("#div_submit_pass_activate").show();
        $("#div_submit_pass_deactivate").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();
        document.getElementById("strong_msg").innerHTML = "Do you want to Activate this role?";
    }

    function ActivateData() {
        debugger;
        HideShow();
        //$("#tbl_verf_fail").hide();
        //$("#tbl_verf_result").show();
        //$("#div_submit_pass_delete").hide();
        //$("#div_submit_pass_activate").hide();
        //$("#div_submit_pass_deactivate").hide();
        //$("#div_submit_fail").hide();
        //$("#div_response_success").hide();
        //$("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing Activate Request...";

        var requestType = "";
        if (CheckerPage == true)
            requestType = "CHECKER";
        else if (CheckerPage == false)
            requestType = "MAKER";

        var y = "ActivateOrDelete";

        $.ajax({
            type: "POST",
            url: x + y,
            data: { Id: id, Action: 'ENABLE', ModifiedBy: uid, RequestType: requestType },
            success: DeleteSucceded,
            error: DeleteFailed
        });
    }

    function DeActivate(userid) {
        debugger;
        id = userid;
        /*action = actType;*/
        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass_delete").hide();
        $("#div_submit_pass_activate").hide();
        $("#div_submit_pass_deactivate").show();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();
        document.getElementById("strong_msg").innerHTML = "Do you want to DeActivate this role?";
    }

    function DeActivateData() {
        debugger;
        HideShow();
        //$("#tbl_verf_fail").hide();
        //$("#tbl_verf_result").show();
        //$("#div_submit_pass_delete").hide();
        //$("#div_submit_pass_activate").hide();
        //$("#div_submit_pass_deactivate").hide();
        //$("#div_submit_fail").hide();
        //$("#div_response_success").hide();
        //$("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing deActivate Request...";

        var requestType = "";
        if (CheckerPage == true)
            requestType = "CHECKER";
        else if (CheckerPage == false)
            requestType = "MAKER";




        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);


        data = { asdrf: "1234", Id: id, Action: 'DISABLED', ModifiedBy: uid, RequestType: requestType };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;

        var y = "ActivateOrDelete";

        $.ajax({
            type: "POST",
            url: x + y,
            //data: { Id: id, Action: 'DISABLED', ModifiedBy: uid, RequestType: requestType },
            data: { Request_Data: encrypted_data },
            success: DeleteSucceded,
            error: DeleteFailed
        });
    }


    function Delete(userid) {
        debugger;
        id = userid;
        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass_delete").show();
        $("#div_submit_pass_activate").hide();
        $("#div_submit_pass_deactivate").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();
        /*window.open(rooturl + "UserManagement/UserList?id=" + id, "_self");*/
        document.getElementById("strong_msg").innerHTML = "Do you want to Delete this role?";

    }

    function DeleteData() {
        debugger;

        HideShow();
        //$("#tbl_verf_fail").hide();
        //$("#tbl_verf_result").show();
        //$("#div_submit_pass_delete").hide();
        //$("#div_submit_pass_deactivate").hide();
        //$("#div_submit_pass_activate").hide();
        //$("#div_submit_fail").hide();
        //$("#div_response_success").hide();
        //$("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing Delete Request...";



        var y = "DeleteChecker";

        $.ajax({
            type: "POST",
            url: x + y,
            data: { Id: id },
            success: DeleteSucceded,
            error: DeleteFailed
        });
    }

    function DeleteSucceded(data) {

        debugger;

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass_delete").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").show();
        $("#div_create_question").hide();

        debugger;
        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(data, kVal);

        document.getElementById("successMsg").innerHTML = result;

    }

    function DeleteFailed(data) {
        debugger;

        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass_delete").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        debugger;
        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(data, kVal);

        document.getElementById("errorMsg").innerHTML = result.responseText;

    }

    function Reject(userid) {
        debugger;
        id = userid;
        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass_delete").show();
        $("#div_submit_pass_activate").hide();
        $("#div_submit_pass_deactivate").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();
        /*window.open(rooturl + "UserManagement/UserList?id=" + id, "_self");*/
        document.getElementById("strong_msg").innerHTML = "Do you want to reject this role?";

    }

    function RejectData() {
        debugger;

        HideShow();
        //$("#tbl_verf_fail").hide();
        //$("#tbl_verf_result").show();
        //$("#div_submit_pass_delete").hide();
        //$("#div_submit_pass_deactivate").hide();
        //$("#div_submit_pass_activate").hide();
        //$("#div_submit_fail").hide();
        //$("#div_response_success").hide();
        //$("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing Reject Request...";

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);


        data = { asdrf: "1234", Id: id, Status: Status };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;

        var y = "RejectRole";

        $.ajax({
            type: "POST",
            url: x + y,
            //data: { Id: id, Status: Status },
            data: { Request_Data: encrypted_data },
            success: RejectSucceded,
            error: RejectFailed
        });
    }

    function RejectSucceded(data) {

        debugger;

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass_delete").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").show();
        $("#div_create_question").hide();

        debugger;
        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(data, kVal);

        document.getElementById("successMsg").innerHTML = result;// "Request Rejected";
        window.location.href = rooturl + 'RoleMaster/ListOfRolesChecker';

    }

    function RejectFailed(data) {
        debugger;

        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass_delete").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        debugger;
        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(data, kVal);

        document.getElementById("errorMsg").innerHTML = result.responseText;

    }


    function HideShow() {
        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass_delete").hide();
        $("#div_submit_pass_activate").hide();
        $("#div_submit_pass_deactivate").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();
    }

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