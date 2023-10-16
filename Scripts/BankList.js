try {

    function getError(result) {
        debugger;
        //$("#ProcessingBar").hide();

        var msg = result.responseJSON.Message;
        //alert(msg);
        document.getElementById("ProcessingBar").innerHTML = msg;
    }

    function ReloadStatus() {

        debugger;
        $("#ProcessingBar").show();
        $("#tbl_form_list").find("tr:gt(0)").remove();

        var y = "getBankFormsList";

        $.ajax({
            type: "POST",
            url: x + y,
            data: { BankCode: BankCode, FormType: FormType, LoginId: userId },
            success: getListData,
            error: getError
        });

    }

    function getListData(printer) {
        debugger;

        $("#ProcessingBar").hide();

        // Iterate over the collection of data,below line for removing table data except header
        $("#tbl_form_list").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow(print);
        });
    }

    function AddRecordRow(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_form_list tbody").length == 0) {
            $("#tbl_form_list").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_form_list tbody").append(
            RecordTableRow(print));
    }

    function RecordTableRow(print) {
        debugger;

        var RetRow =
            '<tr>' +
            '<td style="text-align:center;font-size: 14px;"> <div id="CountId_' + print.CountId + '">' + print.CountId + '</div></td>' +
            '<td style="text-align:center;font-size: 14px;" class="text-wrap"><span>' + print.InsertTimeStamp + '</span></td>' +
            '<td style="text-align:center;font-size: 14px;" class="text-wrap"><span>' + print.L1By + '</span></td>';

        if (print.Status == "0") {
            RetRow +=
                '<td class="text-wrap align-middle" style="text-align: center;">' +
                '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                '</td>' +
                '<td></td>';
        }
        else if (print.Status == "51" || print.Status == "61") {
            RetRow +=
                '<td class="text-wrap align-middle" style="text-align: center;">' +
                '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                '</td>' +
                '<td></td>';
        }
        else if (print.Status == "52" || print.Status == "53" || print.Status == "62" || print.Status == "63") {
            RetRow +=
                '<td class="text-wrap align-middle" style="text-align: center;">' +
                '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                '</td>' +
                '<td></td>';
        }
        else if (print.Status == "54" || print.Status == "64") {
            RetRow +=
                '<td class="text-wrap align-middle" style="text-align: center;">' +
                '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                '</td>' +
                '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataEntry(' + print.CountId + ');">Data Entry</span></td>';
        }
        else if (print.Status == "55" || print.Status == "65") {

            debugger;

            if (userId == print.L1By) {
                RetRow +=
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                    '</td>' +
                    '<td class="text-wrap"><button class="btn btn-sm btn-primary" onclick="dataEntry(' + print.CountId + ');">Data Entry</button></td>';
            }
            else {
                RetRow +=
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                    '</td>' +
                    '<td class="text-wrap"><button class="btn btn-sm btn-warning" onclick="dataEntry(' + print.CountId + ');" disabled >Data Entry</button></td>';
            }
            
        }
        else if (print.Status == "56" || print.Status == "57" || print.Status == "66" || print.Status == "67") {
            RetRow +=
                '<td class="text-wrap align-middle" style="text-align: center;">' +
                '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">' + print.FormStatus + '</span>' +
                '</td>' +
                '<td></td>';
        }

        return RetRow;
        
    }


    function dataEntry(cid) {
        debugger;

        if (FormType == "THIRD_PARTY") {
            window.open(rooturl + "BankingForm/Third_Party_Form?cid=" + cid, "_self");
        }
        else if (FormType == "NRO") {
            window.open(rooturl + "BankingForm/NRO_Form?cid=" + cid, "_self");
        }

    }

}
catch (e) {
    alert(e.message);
}