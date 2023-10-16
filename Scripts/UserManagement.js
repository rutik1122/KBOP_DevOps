try {

    function getError(result) {
        debugger;
        $("#ProcessingBar").show();

        var msg = result.responseJSON.Message;
        //alert(msg);
        document.getElementById("ProcessingBar").innerHTML = msg;
    }

    function SearchOption(para) {

        debugger;
        var SearchBy = "";
        var SearchByVal = "";

        if (para != "NO") {
            SearchBy = document.getElementById("SearchBy").value;
            SearchByVal = document.getElementById("SearchByVal").value;
            if (SearchBy == "0") {
                alert("Please select Filter");
                return false;
            }
            if (SearchByVal == null || SearchByVal == "") {
                alert("Please enter search value");
                return false;
            }
        }
        else {
            document.getElementById("SearchBy").value = "0";
            document.getElementById("SearchByVal").value = "";
        }

        var y = "UserList";

        $.ajax({
            url: x + y,
            type: 'POST',
            data: { SearchByName: SearchBy, SearchByValue: SearchByVal },
            success: getListData_userlist,
            error: getError
        });

    }

    function getListData_userlist(printer) {
        debugger;

        $("#ProcessingBar").hide();

        // Iterate over the collection of data,below line for removing table data except header
        $("#tbl_userlist").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow_userlist(print);
        });
    }

    function AddRecordRow_userlist(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_userlist tbody").length == 0) {
            $("#tbl_userlist").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_userlist tbody").append(
            RecordTableRow_userlist(print));
    }

    function RecordTableRow_userlist(print) {
        debugger;
        if (print.LoginId != null) {
            var ret;

            var loginid = document.getElementById("loginid").value;

            var RetRow =
                '<tr>' +
                '<td style="text-align:center;font-size: 14px;" hidden> <div id="Id' + print.Id + '">' + print.Id + '</div></td>' +
                '<td class="text-wrap"><span>' + print.LoginId + '</span></td>' +
                '<td class="text-wrap"><span>' + print.FirstName + '</span></td>' +
                '<td class="text-wrap"><span>' + print.LastName + '</span></td>' +
                '<td class="text-wrap"><span>' + print.UserType + '</span></td>' +
                '<td class="text-wrap"><span>' + print.AccessLevel + '</span></td>';

            if (print.StatusDesc.toUpperCase() == "ACTIVE") {
                RetRow = RetRow +
                    '<td class="text-wrap"><span class="badge bg-success" style="font-size:100%; min-width:70px !important;">' + print.StatusDesc + '</span></td>';
            }
            else {
                RetRow = RetRow +
                    '<td class="text-wrap"><span class="badge bg-warning" style="font-size:100%; min-width:70px !important;">' + print.StatusDesc + '</span></td>';
            }

            if (print.StatusDesc.toUpperCase() != "ACTIVE") {
                RetRow = RetRow +
                    '<span onclick="Activate(' + print.Id + ')"  class="btn btn-sm btn-success" data-bs-toggle="modal" href="#authenticationmodal">' + ' <i class="fa fa-user text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Activate">' + '</i>' + '   </span>';
            }
            else {
                /*  var ac= "DISABLED"*/
                RetRow = RetRow +
                    '<span onclick="DeActivate(' + print.Id + ')"  class="btn btn-sm btn-warning" data-bs-toggle="modal" href="#authenticationmodal">' + ' <i class="fa fa-user text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="DeActivate">' + '</i>' + '   </span>';
            }

            if (print.Status == 0) {

                RetRow = RetRow +
                    '<td>' +
                    '<div class="btn-group">' +
                    '<span onclick="Edit(' + print.Id + ')" class="btn btn-sm btn-primary"><i class="fas fa-edit text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"></i></span>' +
                    '<span onclick="UserDetails(' + print.Id + ')" class="btn btn-sm btn-primary">' + '<i class="fas fa-eye text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="View Details">' + '</i>' + '   </span>' +
                    '<span onclick="DeleteRoles(' + print.Id + ')"  class="btn btn-sm btn-danger" data-bs-toggle="modal" >' + ' <i class="fas fa-trash-alt text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">' + '</i>' + '   </span>';
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

            RetRow = RetRow +
                '</div>' +
                '</td>' +
                '</tr>';

            return RetRow;
        }
        else {
            var ret =

                alert("No Records Found!!!!");
            return ret;
        }
    }

    function SearchOptionChecker(para) {

        debugger;
        var SearchBy = "";
        var SearchByVal = "";

        if (para != "NO") {
            SearchBy = document.getElementById("SearchBy").value;
            SearchByVal = document.getElementById("SearchByVal").value;
            if (SearchBy == "0") {
                alert("Please select Filter");
                return false;
            }
            if (SearchByVal == null || SearchByVal == "") {
                alert("Please enter search value");
                return false;
            }
        }
        else {
            document.getElementById("SearchBy").value = "0";
            document.getElementById("SearchByVal").value = "";
        }

        var user = document.getElementById("loginid").value;
        var checkerrights = document.getElementById("checkerRights").value;

        var y = "UserCheckerList";

        $.ajax({
            url: x + y,
            type: 'POST',
            data: { SearchByName: SearchBy, SearchByValue: SearchByVal, uid: user, Checkerrights: checkerrights },
            success: getListData_userlistChecker,
            error: getError
        });

    }
    function getListData_userlistChecker(printer) {
        debugger;

        $("#ProcessingBar").hide();

        // Iterate over the collection of data,below line for removing table data except header
        $("#tbl_userlist").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow_userlistChecker(print);
        });
    }

    function AddRecordRow_userlistChecker(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_userlist tbody").length == 0) {
            $("#tbl_userlist").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_userlist tbody").append(
            RecordTableRow_userlistChecker(print));
    }

    function RecordTableRow_userlistChecker(print) {
        debugger;
        if (print.LoginId != null) {
            var ret;

            var loginid = document.getElementById("loginid").value;

            var RetRow =
                '<tr>' +
                '<td style="text-align:center;font-size: 14px;" hidden> <div id="Id' + print.Id + '">' + print.Id + '</div></td>' +
                '<td class="text-wrap"><span>' + print.LoginId + '</span></td>' +
                '<td class="text-wrap"><span>' + print.FirstName + '</span></td>' +
                '<td class="text-wrap"><span>' + print.LastName + '</span></td>' +
                '<td class="text-wrap"><span>' + print.UserType + '</span></td>' +
                '<td class="text-wrap"><span>' + print.AccessLevel + '</span></td>';

            if (print.Status == 1) {
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

            RetRow = RetRow +
                '<td class="text-wrap"><span>' + print.RequestedBY + '</span></td>';

            var id = print.Id;

            var url = '@Url.Action("UserCreateChecker", "UserManagement")' + '?id=' + id;

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
                    '<span onclick="UserCreateChecker(' + print.Id + ')" class="btn btn-sm btn-primary"><i class="fas fa-edit text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"></i></span>';

                '</div>' +
                    '</td>';
                '</tr>';

            }
            else if (print.AllowAccess == 1 && print.Status == 2) {
                RetRow = RetRow +
                    '<td>' +
                    '<div class="btn-group">' +
                    '<span onclick="UserEditChecker(' + print.Id + ')" class="btn btn-sm btn-primary"><i class="fas fa-edit text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"></i></span>';

                '</div>' +
                    '</td>';
                '</tr>';

            }
            else if (print.AllowAccess == 1 && print.Status == 3) {
                RetRow = RetRow +
                    '<td>' +
                    '<div class="btn-group">' +
                    '<span onclick="UserDeleteChecker(' + print.Id + ')" class="btn btn-sm btn-primary"><i class="fas fa-edit text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"></i></span>';

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





            //RetRow = RetRow +
            //    '</div>' +
            //    '</td>' +
            //    '</tr>';

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
        window.open(rooturl + "UserManagement/EditUser?id=" + id, "_self");
    }

    function DeleteRoles(id) {
        debugger;
        window.open(rooturl + "UserManagement/DeleteUser?id=" + id, "_self");
    }

    function UserCreateChecker(id) {
        debugger;
        window.open(rooturl + "UserManagement/UserCreateChecker?id=" + id, "_self");
    }

    function UserEditChecker(id) {
        debugger;
        window.open(rooturl + "UserManagement/UserEditChecker?id=" + id, "_self");
    }

    function UserDeleteChecker(id) {
        debugger;
        window.open(rooturl + "UserManagement/UserDeleteChecker?id=" + id, "_self");
    }

    function UserDetails(id) {
        debugger;
        window.open(rooturl + "UserManagement/UserDetails?id=" + id, "_self");
    }

    function reloadpage() {
        debugger;
        window.open(rooturl + "UserManagement/UserList", "_self");
    }

    function reloadpageChecker() {
        debugger;
        window.open(rooturl + "UserManagement/UserCheckerList", "_self");
    }

    function Activate(userid) {
        debugger;

        id = userid;
        //$("#tbl_verf_fail").hide();
        //$("#tbl_verf_result").hide();
        //$("#div_submit_pass_delete").hide();
        //$("#div_submit_pass_activate").show();
        //$("#div_submit_fail").hide();
        //$("#div_response_success").hide();
        //$("#div_create_question").show();
        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass_delete").hide();
        $("#div_submit_pass_activate").show();
        $("#div_submit_pass_deactivate").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();
        document.getElementById("strong_msg").innerHTML = "Do you want to Activate this user?";
    }
    function ActivateData() {
        debugger;
        HideShow();
        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass_delete").hide();
        $("#div_submit_pass_activate").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();
        document.getElementById("successMsg").innerHTML = "Processing Activate Request...";

        var requestType = "";
        if (CheckerPage == true)
            requestType = "CHECKER";
        else if (CheckerPage == false)
            requestType = "MAKER";



        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);


        data = { asdrf: "1234", Id: id, Action: 'ENABLE', ModifiedBy: uid, RequestType: requestType };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;

        var y = "ActivateOrDeactivateUser";
        $.ajax({
            type: "POST",
            url: x + y,
            //data: { Id: id, Action: 'ENABLE', ModifiedBy: uid, RequestType: requestType },
            data: { Request_Data: encrypted_data },
            success: DeleteSucceded,
            error: DeleteFailed
        });
    }
    //function Activate(userid) {
    //    debugger;
    //    id = userid;
    //    /*action = actType;*/
    //    $("#tbl_verf_fail").hide();
    //    $("#tbl_verf_result").hide();
    //    $("#div_submit_pass_delete").hide();
    //    $("#div_submit_pass_activate").show();
    //    $("#div_submit_pass_deactivate").hide();
    //    $("#div_submit_fail").hide();
    //    $("#div_response_success").hide();
    //    $("#div_create_question").show();
    //    document.getElementById("strong_msg").innerHTML = "Do you want to Activate this role?";
    //}

    //function ActivateData() {
    //    debugger;
    //    HideShow();
    //    //$("#tbl_verf_fail").hide();
    //    //$("#tbl_verf_result").show();
    //    //$("#div_submit_pass_delete").hide();
    //    //$("#div_submit_pass_activate").hide();
    //    //$("#div_submit_pass_deactivate").hide();
    //    //$("#div_submit_fail").hide();
    //    //$("#div_response_success").hide();
    //    //$("#div_create_question").hide();

    //    document.getElementById("successMsg").innerHTML = "Processing Activate Request...";

    //    var requestType = "";
    //    if (CheckerPage == true)
    //        requestType = "CHECKER";
    //    else if (CheckerPage == false)
    //        requestType = "MAKER";

    //    var y = "ActivateOrDelete";

    //    $.ajax({
    //        type: "POST",
    //        url: x + y,
    //        data: { Id: id, Action: 'ENABLE', ModifiedBy: uid, RequestType: requestType },
    //        success: DeleteSucceded,
    //        error: DeleteFailed
    //    });
    //}

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
        document.getElementById("strong_msg").innerHTML = "Do you want to DeActivate this User?";
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


        var y = "ActivateOrDeactivateUser";

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
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();
        /*window.open(rooturl + "UserManagement/UserList?id=" + id, "_self");*/
        document.getElementById("strong_msg").innerHTML = "Do you want to Delete this user?";
    }
    function DeleteData() {
        debugger;
        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass_delete").hide();
        $("#div_submit_pass_activate").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();
        document.getElementById("successMsg").innerHTML = "Processing Delete Request...";
        var y = "DeleteUser";
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

    function RejectData() {
        debugger;

        //HideShow();
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


        var y = "RejectUserData";

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

        document.getElementById("successMsg").innerHTML = result; // "Request Rejected";
        window.location.href = rooturl + 'UserManagement/UserCheckerList';

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