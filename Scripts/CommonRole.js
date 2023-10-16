try {
    function getError(result) {
        debugger;
        $("#ProcessingBar").show();

        var msg = result.responseJSON.Message;
        //alert(msg);
        document.getElementById("ProcessingBar").innerHTML = msg;
    }

    function getRoleList(printer) {
        debugger;
        rowcount = 0;
        $("#ProcessingBar").hide();

        $("#tbl_list").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow(print);
        });
    }

    function AddRecordRow(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_list tbody").length == 0) {
            $("#tbl_list").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_list tbody").append(
            RecordTableRow(print));
    }

    function RecordTableRow(print) {
        debugger;
        rowcount += 1;
        if (print.Status == "1") {
            var ret;

            /*var loginid = document.getElementById("loginid").value;*/

            var RetRow =
                '<tr>' +
                /*      '<td style="text-align:center;font-size: 14px;"> <div id="Id' + print.Id + '">' + print.Id + '</div></td>' +*/
                /*'<td class="text-wrap"><span>' + print.Id + '</span></td>' +*/
                '<td onclick="tick_data(' + rowcount + ')" class="form-check">' +
                '<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" onclick="tick_data(' + rowcount + ')" checked>' + print.Name + '</input>' +
                '</td>' +
                '<tr>';

        }
        else {
            var RetRow =
                '<tr>' +
                /*      '<td style="text-align:center;font-size: 14px;"> <div id="Id' + print.Id + '">' + print.Id + '</div></td>' +*/
                /*'<td class="text-wrap"><span>' + print.Id + '</span></td>' +*/
                '<td onclick="tick_data(' + rowcount + ')" class="form-check">' +
                '<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" onclick="tick_data(' + rowcount + ')">' + print.Name + '</input>' +
                '</td>' +
                '<tr>';
        }

        return RetRow;
        //else {
        //    var ret =

        //        alert("No Records Found!!!!");
        //    return ret;
        //}
    }

    function getRoleListChecker(printer) {
        debugger;
        rowcount = 0;
        $("#ProcessingBar").hide();

        $("#tbl_list").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRowCheck(print);
        });
    }

    function AddRecordRowCheck(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_list tbody").length == 0) {
            $("#tbl_list").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_list tbody").append(
            RecordTableRowCheck(print));
    }

    function RecordTableRowCheck(print) {
        debugger;
        rowcount += 1;
        if (print.Status == "1") {
            var ret;

            /*var loginid = document.getElementById("loginid").value;*/

            var RetRow =
                '<tr>' +
                ///*      '<td style="text-align:center;font-size: 14px;"> <div id="Id' + print.Id + '">' + print.Id + '</div></td>' +*/
                ///*'<td class="text-wrap"><span>' + print.Id + '</span></td>' +*/
                //'<td onclick="tick_data(' + rowcount + ')" class="form-check">' +
                //'<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" onclick="tick_data(' + rowcount + ')" checked>' + print.Name + '</input>' +
                //'</td>' +
                //'<tr>';

                '<td class="form-check">' +
                '<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" checked disabled>' +
                '<label for="id_' + rowcount + '">' + print.Name + '</label>' +
                '</td>' +
                '<tr>';
        }
        else {
            var RetRow =
                '<tr>' +
                /*      '<td style="text-align:center;font-size: 14px;"> <div id="Id' + print.Id + '">' + print.Id + '</div></td>' +*/
                /*'<td class="text-wrap"><span>' + print.Id + '</span></td>' +*/
                //'<td onclick="tick_data(' + rowcount + ')" class="form-check">' +
                //'<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" onclick="tick_data(' + rowcount + ')">' + print.Name + '</input>' +
                //'</td>' +
                //'<tr>';
                '<td class="form-check">' +
                '<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" disabled>' +
                '<label for="id_' + rowcount + '">' + print.Name + '</label>' +
                '</td>' +
                '<tr>';
        }

        return RetRow;
        //else {
        //    var ret =

        //        alert("No Records Found!!!!");
        //    return ret;
        //}
    }

    function getRoleListEditChecker(printer) {
        debugger;
        rowcount = 0;
        $("#ProcessingBar").hide();

        $("#tbl_list").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRowChecker(print);
        });
    }

    function AddRecordRowChecker(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_list tbody").length == 0) {
            $("#tbl_list").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_list tbody").append(
            RecordTableRowChecker(print));
    }

    function RecordTableRowChecker(print) {
        debugger;
        rowcount += 1;
        if (print.Status == "1") {
            var ret;

            /*var loginid = document.getElementById("loginid").value;*/

            var RetRow =
                '<tr>' +
                /*      '<td style="text-align:center;font-size: 14px;"> <div id="Id' + print.Id + '">' + print.Id + '</div></td>' +*/
                /*'<td class="text-wrap"><span>' + print.Id + '</span></td>' +*/
                //'<td onclick="tick_data(' + rowcount + ')" class="form-check">' +
                //'<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" onclick="tick_data(' + rowcount + ')" checked disabled>' + print.DisplayName + '</input>' +
                //'</td>' +
                //'<tr>';
                ////'<tr>' +
                '<td class="form-check">' +
                '<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" checked disabled>' +
                '<label for="id_' + rowcount + '">' + print.DisplayName + '</label>' +
                '</td>' +
                '<tr>';




        }
        else {
            var RetRow =
                '<tr>' +
                /*      '<td style="text-align:center;font-size: 14px;"> <div id="Id' + print.Id + '">' + print.Id + '</div></td>' +*/
                /*'<td class="text-wrap"><span>' + print.Id + '</span></td>' +*/
                //'<td onclick="tick_data(' + rowcount + ')" class="form-check">' +
                //'<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" onclick="tick_data(' + rowcount + ')" >' + print.DisplayName + '</input>' +
                //'</td>' +
                //'<tr>';

                '<td class="form-check">' +
                '<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" disabled>' +
                '<label for="id_' + rowcount + '">' + print.DisplayName + '</label>' +
                '</td>' +
                '<tr>';
        }

        return RetRow;
        //else {
        //    var ret =

        //        alert("No Records Found!!!!");
        //    return ret;
        //}
    }

    function tick_data(input_para) {
        debugger;
        var data = document.getElementById('id_' + input_para).checked;
        debugger;
        if (data == true) {
            document.getElementById('id_' + input_para).checked = false;
        }
        else {
            document.getElementById('id_' + input_para).checked = true;
        }
        debugger;
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
    //        document.getElementById("errorMsg").innerHTML = "Name can not be null!";
    //        //alert("Please enter name");
    //        //document.getElementById("name").focus();
    //        return false;
    //    }

    //    if (!name1.match(validName)) {
    //        document.getElementById("errorMsg").innerHTML = "Only alphabets are allowed";
    //        //alert("Enter only alphabets in name");
    //        //document.getElementById("name").focus();
    //        return false;
    //    }

    //    var checked = $('#tbl_list').find(':checked').length;
    //    if (!checked) {
    //        document.getElementById("errorMsg").innerHTML = "Please select alteast one role";
    //        /*alert("Please select alteast one role");*/
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

    function ValidateData() {
        debugger;
        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        var validName = /^[A-Za-z]+$/;

        name1 = document.getElementById("name").value;
        desc = document.getElementById("description").value;

        if (name1 == null || name1 == "") {
            document.getElementById("errorMsg").innerHTML = "Name can not be null!";
            document.getElementById("name").style.backgroundColor = "yellow";
            document.getElementById("name").addEventListener("blur", function () {
                document.getElementById("name").style.backgroundColor = ""; // Reset background color on focus out
            });
            return false;
        } else {
            document.getElementById("errorMsg").innerHTML = ""; // Clear error message
            document.getElementById("name").style.backgroundColor = ""; // Reset background color
        }

        if (!name1.match(validName)) {
            document.getElementById("errorMsg").innerHTML = "Only alphabets are allowed";
            //alert("Enter only alphabets in name");
            //document.getElementById("name").focus();
            return false;
        }

        var checked = $('#tbl_list').find(':checked').length;
        if (!checked) {
            document.getElementById("errorMsg").innerHTML = "Please select alteast one role";
            /*alert("Please select alteast one role");*/
            return false;
        }

        debugger;
        var valPresent = false;
        list = "";
        for (var i = 1; i <= rowcount; i++) {

            var data = document.getElementById('id_' + i).checked;
            if (data == true) {
                var val = document.getElementById('id_' + i).value;
                if (valPresent == false) {

                    list = val;
                    valPresent = true;
                }
                else {
                    list += "," + val;
                }
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
}
catch (e) {
    alert(e.message)
}