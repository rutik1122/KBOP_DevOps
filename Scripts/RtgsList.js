//try {

//    function getError(result) {
//        debugger;
//        $("#ProcessingBar").show();

//        //var msg = result.responseJSON.Message;
//        //alert(msg);
//        document.getElementById("ProcessingBar").innerHTML = result.responseJSON.Message;
//    }

//    function GetList() {

//        document.getElementById("ProcessingBar").innerHTML = "Processing Request...";
//        $("#ProcessingBar").show();

//        debugger;
//        uploadtype = document.getElementById("Upload_Type").value;

//        if (BankCode == "240") {
//            var y = "getBankFormsList";

//            $.ajax({
//                url: x + y,
//                //headers: authHeaders,
//                type: 'POST',
//                data: { LoginId: userId, BankCode: BankCode, UploadType: uploadtype, FormType: 'RTGS' },
//                success: function (result) {
//                    RtgsList(result);
//                },
//                error: getError
//            });
//        }
//        else {
//            var y = "getRtgsList";

//            $.ajax({
//                url: x + y,
//                //headers: authHeaders,
//                type: 'POST',
//                data: { tellerId: userId, ApiCall: 'START', BankCode: BankCode, UploadType: uploadtype },
//                success: function (result) {
//                    RtgsList(result);
//                },
//                error: getError
//            });
//        }

//    }

//    function RtgsList(printer) {
//        debugger;

//        $("#ProcessingBar").hide();
//        $("#div_form_list").show();

//        // Iterate over the collection of data,below line for removing table data except header
//        $("#tbl_rtgs").find("tr:gt(0)").remove();
//        $.each(printer, function (index, print) {
//            // Add a row to the Product table
//            AddRecordRow(print);
//        });
//    }

//    function AddRecordRow(print) {
//        debugger;
//        // Check if <tbody> tag exists, add one if not
//        if ($("#tbl_rtgs tbody").length == 0) {
//            $("#tbl_rtgs").append("<tbody></tbody>");
//        }
//        // Append row to <table>
//        $("#tbl_rtgs tbody").append(
//            RecordTableRow(print));
//    }

//    function RecordTableRow(print) {

//        var RetRow =
//            '<tr>' +
//            '<td style="text-align:center;font-size: 14px;"> <div id="CountId_' + print.CountId + '">' + print.CountId + '</div></td>' +
//            '<td style="text-align:center;font-size: 14px;" class="text-wrap"><span>' + print.InsertTimeStamp + '</span></td>' +
//            '<td style="text-align:center;font-size: 14px;" class="text-wrap"><span>' + print.L1By + '</span></td>';

//        if (print.Status == "0") {
//            RetRow +=
//                '<td class="text-wrap align-middle" style="text-align: center;">' +
//                '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
//                '</td>' +
//                '<td></td>';
//        }
//        else if (print.Status == "6") {
//            RetRow +=
//                '<td class="text-wrap align-middle" style="text-align: center;">' +
//                '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
//                '</td>' +
//                '<td></td>';
//        }
//        else if (print.Status == "4") {
//            RetRow +=
//                '<td class="text-wrap align-middle" style="text-align: center;">' +
//                '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
//                '</td>' +
//                '<td></td>';
//        }
//        else if (print.Status == "3") {
//            RetRow +=
//                '<td class="text-wrap align-middle" style="text-align: center;">' +
//                '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
//                '</td>' +
//                '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataEntry(' + print.CountId + ');">Data Entry</span></td>';
//        }
//        else if (print.Status == "7") {

//            if (userId == print.L1By) {
//                RetRow +=
//                    '<td class="text-wrap align-middle" style="text-align: center;">' +
//                    '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
//                    '</td>' +
//                    '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataEntry(' + print.CountId + ');">Data Entry</span></td>';
//            }
//            else {
//                RetRow +=
//                    '<td class="text-wrap align-middle" style="text-align: center;">' +
//                    '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
//                    '</td>' +
//                    '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataEntry(' + print.CountId + ');" disabled >Data Entry</span></td>';
//            }

//        }
//        else if (print.Status == "2") {
//            RetRow +=
//                '<td class="text-wrap align-middle" style="text-align: center;">' +
//                '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
//                '</td>' +
//                '<td></td>';
//        }

//        return RetRow;

//    }

//    function dataEntry(cid) {
//        debugger;

//        window.open(rooturl + "RtgsNeft/RtgsForm?id=" + cid + "&bankcode=" + BankCode, "_self");

//    }

//}
//catch (e) {
//    alert(e.message);
//}

try {

    function getError(result) {
        debugger;
        $("#ProcessingBar").show();

        //var msg = result.responseJSON.Message;
        //alert(msg);
        document.getElementById("ProcessingBar").innerHTML = result.responseJSON.Message;
    }

    function GetList() {

        document.getElementById("ProcessingBar").innerHTML = "Processing Request...";
        $("#ProcessingBar").show();

        debugger;
        uploadtype = document.getElementById("Upload_Type").value;
        //verfLevel = document.getElementById("Verf").value;


        if (BankCode == "240") {
            // HDFC Bank Code = 240
            var y = "getBankFormsList";

            $.ajax({
                url: x + y,
                //headers: authHeaders,
                type: 'POST',
                data: { LoginId: userId, BankCode: BankCode, UploadType: uploadtype, FormType: 'RTGS' },
                success: function (result) {
                    RtgsList(result);
                },
                error: getError
            });
        }
        else {
            var y = "getRtgsList";

            $.ajax({
                url: x + y,
                //headers: authHeaders,
                type: 'POST',
                data: { tellerId: userId, ApiCall: 'START', BankCode: BankCode, UploadType: uploadtype },
                success: function (result) {
                    RtgsList(result);
                },
                error: getError
            });
        }

    }

    function RtgsList(printer) {
        debugger;

        $("#ProcessingBar").hide();
        $("#div_form_list").show();

        // Iterate over the collection of data,below line for removing table data except header
        $("#tbl_rtgs").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow(print);
        });
    }

    function AddRecordRow(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_rtgs tbody").length == 0) {
            $("#tbl_rtgs").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_rtgs tbody").append(
            RecordTableRow(print));
    }

    function RecordTableRow(print) {

        var RetRow =
            '<tr>' +
            '<td style="text-align:center;font-size: 14px;"> <div id="CountId_' + print.CountId + '">' + print.CountId + '</div></td>' +
            /*'<td class="text-wrap" hidden><label id="refno_' + print.count_id + '">' + print.TransactionRefNo + '</label></td>' +*/
            '<td style="text-align:center;font-size: 14px;" class="text-wrap"><span>' + print.InsertTimeStamp + '</span></td>' +
            '<td style="text-align:center;font-size: 14px;" class="text-wrap"><span>' + print.L1By + '</span></td>';

        if (print.Status == "0") {
            RetRow +=
                '<td class="text-wrap align-middle" style="text-align: center;">' +
                '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                '</td>' +
                '<td></td>';
        }
        else if (print.Status == "6" || print.Status == "30") {
            RetRow +=
                '<td class="text-wrap align-middle" style="text-align: center;">' +
                '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                '</td>' +
                '<td></td>';
        }
        else if (print.Status == "4" || print.Status == "31") {
            RetRow +=
                '<td class="text-wrap align-middle" style="text-align: center;">' +
                '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                '</td>' +
                '<td></td>';
        }
        else if (print.Status == "3" || print.Status == "33") {
            RetRow +=
                '<td class="text-wrap align-middle" style="text-align: center;">' +
                '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                '</td>' +
                '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataEntry(' + print.CountId + ');">Data Entry</span></td>';
        }
        else if (print.Status == "7" || print.Status == "34") {

            if (userId == print.L1By) {
                RetRow +=
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                    '</td>' +
                    '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataEntry(' + print.CountId + ');">Data Entry</span></td>';
            }
            else {
                RetRow +=
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                    '</td>' +
                    '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataEntry(' + print.CountId + ');" disabled >Data Entry</span></td>';
            }

        }
        else if (print.Status == "2" || print.Status == "35") {
            RetRow +=
                '<td class="text-wrap align-middle" style="text-align: center;">' +
                '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                '</td>' +
                '<td></td>';
        }

        debugger;
        var uploadtype = document.getElementById("Upload_Type").value;
        if (uploadtype == "03" || uploadtype == "04") {
            RetRow += "<td id='lbl_" + print.CountId + "' hidden>" + print.chq_CountId + "</td>";
        }

        RetRow += "</tr>";

        return RetRow;

    }

    function dataEntry(cid) {
        debugger;
        //var cid = String(cid);
        //var refno = document.getElementById("refno_" + cid).innerHTML;
        var uploadtype = document.getElementById("Upload_Type").value;

        if (uploadtype == "01" || uploadtype == "02")
            window.open(rooturl + "RtgsNeft/RtgsForm?id=" + cid + "&bankcode=" + BankCode + "&uploadtype=" + uploadtype + "&verf=L1", "_self");

        else if (uploadtype == "03" || uploadtype == "04") {
            var id = "lbl_" + cid;
            var che_cheque = document.getElementById(id).innerHTML;

            window.open(rooturl + "RtgsNeft/RtgsForm?id=" + cid + "&bankcode=" + BankCode + "&uploadtype=" + uploadtype + "&chq_id=" + che_cheque + "&verf=L1", "_self");
        }

    }

}
catch (e) {
    alert(e.message);
}