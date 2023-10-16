try {

    function getError(result) {
        debugger;
        document.getElementById("ProcessingBar").innerHTML = result.responseText;
    }

    function getCheckerData(result) {
        debugger;

        $("#btn_Verify").hide();

        document.getElementById("FG").src = result.Image;
        document.getElementById("payeeName").value = result.PayeeName;
        document.getElementById("amt").value = result.ChqAmount;

        debugger;
        if (result.same_amt == false)
            $("#amt").css('backgroundColor', '#' + Alter_Color);
      

        document.getElementById("pan").value = result.pancard_form_16;
        document.getElementById("transParticular").value = result.transaction_particular;
        document.getElementById("rpt_code").value = result.report_code;
        document.getElementById("remark_1").value = result.remark_1;
        document.getElementById("remark_2").value = result.remark_2;

        debugger;
        if (transtype == 'CASHDEP') {
            document.getElementById("AccountNo").value = result.CreditAccNo;

            if (result.same_credit_acc_no == false)
                $("#AccountNo").css('backgroundColor', '#' + Alter_Color);

            $("#tr_uv_flag").hide();

            GetPayeee('CASHDEP');
            
            $("#div_srl_date_alpha").hide();
            $("#tr_inst_type").hide();
        }
        else if (transtype == 'CASHWDL' || transtype == 'CASHWDL01' || transtype == 'CASHWDL02') {
            document.getElementById("AccountNo").value = result.DebitAccNo;
            if (result.same_debit_acc_no == false)
                $("#AccountNo").css('backgroundColor', '#' + Alter_Color);

            GetPayeee('CASHWDL');
            
            document.getElementById("chqnoDataEntry").value = result.ChequeNo;
            if (result.same_cheque_no == false)
                $("#chqnoDataEntry").css('backgroundColor', '#' + Alter_Color);

            document.getElementById("ChequeDateTxt").value = result.date;
            if (result.same_cheque_date == false)
                $("#ChequeDateTxt").css('backgroundColor', '#' + Alter_Color);

            if (result.same_uv_flag == false) {
                $("#uv_flag").css('backgroundColor', '#' + Alter_Color);
                document.getElementById("uv_flag").innerHTML = "Manually Approved";
            }
            else {
                document.getElementById("uv_flag").innerHTML = "Approved";
            }

            document.getElementById("instrument_alpha").value = result.instrument_alpha;
            document.getElementById("inst_type").value = result.InstrumentType;
        }

        Pancard_Verf = document.getElementById("Pancard_Verf").value;
        pancard_verf_limit = document.getElementById("pancard_verf_limit").value;

        if (Pancard_Verf == 'Y') {
            if (parseInt(result.ChqAmount) < parseInt(pancard_verf_limit))
                $("#row_pan").hide();
        }
        else
            $("#row_pan").hide();

        
        debugger;
        $("#ProcessingBar").hide();
        debugger;
        $.ajax({
            url: x + "ItemReturnList",
            headers: authHeaders,
            type: 'POST',
            success: RejectList
        });
        
    }

    function VerifyData() {
        document.getElementById("name").innerHTML = document.getElementById("payeeName").value;

        var validationStatus = true;

        if (transtype == 'CASHWDL') {
            if (ValidateAccBalance == "Y") {
                if (AccBalance != "" && AccBalance != null) {
                    if (parseFloat(amount) > parseFloat(AccBalance)) {
                        document.getElementById("errorMsg").innerHTML = "Balance Insufficient";
                        validationStatus = false;
                    }
                }
            }

            var schemeCode = document.getElementById("FinScheme").innerHTML;
            if (schemeCode == "SBA" || schemeCode == "CAA" || schemeCode == "ODA" || schemeCode == "CCA") {
                document.getElementById("errorMsg").innerHTML = "Debit blocked - Scheme Code:" + schemeCode;
                validationStatus = false;
            }
        }
        else if (transtype == 'CASHDEP') {
            var schemeCode = document.getElementById("FinScheme").innerHTML;
            if (schemeCode == "SBNRE" || schemeCode == "ODNRE" || schemeCode == "FDNRE" || schemeCode == "KNNRE") {
                document.getElementById("errorMsg").innerHTML = "Deposit not allowed - Scheme Code:" + schemeCode;
                validationStatus = false;
            }
        }

        if (validationStatus == true) {
            // Error Msg
            $("#tbl_verf_fail").hide();
            $("#div_submit_fail").show();

            // Response
            $("#tbl_verf_result").hide();
            $("#div_response_success").hide();

            // Data Table
            $("#tbl_verf_pass").show();
        }
        else {
            // Error Msg
            $("#tbl_verf_fail").show();
            $("#div_submit_fail").hide();

            // Response
            $("#tbl_verf_result").hide();
            $("#div_response_success").show();

            // Data Table
            $("#tbl_verf_pass").hide();
        }
        
    }

    function showButton() {
        if (RollbackCall == "Y")
            $("#a_rollback").show();
        else
            $("#a_rollback").hide();

        $("#a_reject").show();
        $("#a_accept").show();
    }

    function Reject() {
        debugger;
        $("#tbl_reject_list").show();
        $("#div_reject_success").hide();
        $("#div_reject_failed").hide();
        $("#div_reject_button").hide();
        $("#btn_reject_success").hide();
        $("#tbl_reject_success").hide();

        $("#div_reject_code").hide();
        $("#div_reject_desc").hide();
        $("#div_desc_alert").hide();
    }

    function RejectList(printer) {
        //debugger;
        $("#tbl_reject_list").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            AddRecordRow(print);
        });
    }

    function AddRecordRow(print) {
        //debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_reject_list tbody").length == 0) {
            $("#tbl_reject_list").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_reject_list tbody").append(
            RecordTableRow(print));
    }

    function RecordTableRow(print) {
        //debugger;

        var RetRow = '<tr onclick="ShowReason(' + print.Code + ')" >' +
            '<td class="text-wrap"><span>' + print.Code + '</span></td>' +
            '<td class="text-wrap"><span>' + print.Description + '</span></td>' +
            '</tr>';

        return RetRow;
    }

    function ShowReason(result) {

        var c = "";
        if (result.length < 2)
            c = "0" + result;
        else
            c = result;

        var tableData = document.getElementById('tbl_reject_list');
        for (i = 1; i < tableData.rows.length; i++) {
            debugger;
            var objCells = tableData.rows.item(i).cells;
            var tbl_code = objCells[0].innerText;
            if (tbl_code == c) {
                debugger;
                code = objCells[0].innerText;
                desc = objCells[1].innerText;
            }
                
        }

        $("#div_reject_code").show();
        $("#div_reject_desc").show();

        document.getElementById("div_code").value = code;
        document.getElementById("div_desc").value = desc;

        if (code == "88") {
            document.getElementById("div_desc").disabled = false;
            document.getElementById("div_desc").value = "";
            desc = "";
        }
        else
            document.getElementById("div_desc").disabled = true;

        $("#tbl_reject_list").hide();
        $("#div_reject_success").show();
        $("#div_reject_failed").hide();
        $("#div_reject_button").show();
        $("#btn_reject_success").hide();

    }


    function DataPush(descision) {
        debugger;

        var y = "postCheckerWithdrawData";

        if (descision == "R") {
            desc = document.getElementById("div_desc").value;
            if (desc == null || desc == "" || desc.toUpperCase() == "NULL") {
                $("#div_desc_alert").show();
                return false;
            }
            else
                $("#div_desc_alert").hide();

            document.getElementById("successMsg_reject").innerHTML = "Processing Request...";

            $("#tbl_reject_list").hide();
            $("#div_reject_success").hide();
            $("#div_reject_failed").hide();
            $("#div_reject_button").hide();
            $("#btn_reject_success").hide();
            $("#tbl_reject_success").show();

            $("#div_reject_code").hide();
            $("#div_reject_desc").hide();
            $("#div_desc_alert").hide();

            debugger;
            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                data: {
                    TransactionRefNo: RefNo, count_id: id, btnVal: 'REJECT', Verf: verf, transactionType: transtype, reject_code: code,
                    reject_desc: desc
                },
                success: RejectSuccess
                //success: window.open(rooturl + "Checker/Index", "_self")
            });
        }
        else if (descision == "A") {
            $("#div_accept_success").hide();
            $("#tbl_accept_success").show();
            $("#div_accept_failed").hide();
            $("#div_accept_button").hide();
            $("#btn_accept_success").hide();

            document.getElementById("successMsg_accept").innerHTML = "Processing Request...";
            $('#successMsg_accept').removeClass('bg-danger').removeClass('bg-success').addClass('bg-info');

            debugger;
            //var srlno = document.getElementById("chqnoDataEntry").value;
            var accno = document.getElementById("AccountNo").value;
            var name = document.getElementById("payeeName").value;
            var date = document.getElementById("ChequeDateTxt").value;
            var amt = document.getElementById("amt").value;
            var chqno = document.getElementById("chqnoDataEntry").value;
            var trans_particular = document.getElementById("transParticular").value;
            var rpt_code = document.getElementById("rpt_code").value;
            var remark1 = document.getElementById("remark_1").value;
            var remark2 = document.getElementById("remark_2").value;
            var instrument_alpha = document.getElementById("instrument_alpha").value;
            var pan = document.getElementById("pan").value;

            var CheckerModule_L3 = document.getElementById("CheckerModule_L3").value;
            var l3start = document.getElementById("L3StartLimit").value;
            var l3_req = "";

            var inst = document.getElementById("inst_type").value;
            if (inst.toUpperCase() == "CHEQUE")
                inst = "C";
            else
                inst = "S";

            debugger;
            if (verf == "L2") {
                if (CheckerModule_L3 != "Y")
                    l3_req = "N";
                else if (amt >= parseFloat(l3start))
                    l3_req = "Y";
                else
                    l3_req = "N";
            }
            else
                l3_req = "N";

            debugger;
            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                data: {
                    TransactionRefNo: RefNo, count_id: id, btnVal: 'ACCEPT', Verf: verf, transactionType: transtype, L3_Verf_required: l3_req,
                    ChequeNo: chqno, //SortCode: sort, SanCode: san, TrCode: tr,
                    ChqAmount: amt, date: date, DebitAccNo: accno, PayeeName: name,
                    transaction_particular: trans_particular, report_code: rpt_code, remark_1: remark1, remark_2: remark2, instrument_alpha: instrument_alpha,
                    pancard_form_16: pan, BankCode: BankCode, InstrumentType: inst,
                    // Finacle posting
                    RefNo: RefNo, AccNo: accno, Amt: amt
                },
                success: AcceptSuccess,
                error: AcceptRequestFailed
            });

        }
        else if (descision == "ROLLBACK") {

            desc = document.getElementById("rollbackDesc").value;

            if (desc.trim() != "" && desc.trim() != null) {
                $("#div_rollback_success").hide();
                $("#tbl_rollback_success").show();
                $("#tbl_rollback_desc").hide();
                //$("#div_rollback_failed").hide();
                $("#div_rollback_button").hide();
                $("#btn_rollback_success").hide();

                document.getElementById("rollbackMsg").innerHTML = "Processing Request...";

                debugger;
                $.ajax({
                    url: x + y,
                    headers: authHeaders,
                    type: 'POST',
                    data: {
                        TransactionRefNo: RefNo, count_id: id, btnVal: 'ROLLBACK', Verf: verf, transactionType: transtype, reject_desc: desc
                    },
                    success: RollbackSuccess
                    //success: window.open(rooturl + "Checker/Index", "_self")
                });
            }
            else {
                document.getElementById("rollbackDesc").focus();
            }
            
        }

    }

    function AcceptRequestFailed(result) {
        debugger;
        
        document.getElementById("successMsg_accept").innerHTML = result.responseJSON.Message;

        $("#div_accept_failed").hide();
        $('#successMsg_accept').removeClass('bg-success').removeClass('bg-info').addClass('bg-danger');
        
    }

    function RejectSuccess(result) {
        //debugger;
        $("#btn_reject_success").show();

        document.getElementById("successMsg_reject").innerHTML = result;
    }

    function RollbackSuccess(result) {
        //debugger;
        $("#btn_rollback_success").show();

        document.getElementById("rollbackMsg").innerHTML = result;
    }

    function CheckerList() {
        window.open(rooturl + "Checker/Index", "_self");
    }

    function Accept() {
        debugger;
        var inst = document.getElementById("inst_type").value;
        if (transtype == "CASHWDL" && SignCheckFlag == false) {
            if (inst.toUpperCase() == "CHEQUE") {
                $("#tbl_verf_fail1").show();
                $("#div_accept_success").hide();
                $("#tbl_accept_success").hide();
                $("#div_accept_failed").show();
                $("#div_accept_button").hide();
                $("#btn_accept_success").hide();
                document.getElementById("errorMsg1").innerHTML = "Sign Verification Pending!";
                return false;
            }
        }

        $("#tbl_verf_fail1").hide();
        $("#div_accept_success").show();
        $("#tbl_accept_success").hide();
        $("#div_accept_failed").hide();
        $("#div_accept_button").show();
        $("#btn_accept_success").hide();
    }

    function AcceptSuccess(result) {
        $("#btn_accept_success").show();
        $('#successMsg_accept').removeClass('bg-danger').removeClass('bg-info').addClass('bg-success');

        if (transtype == "CASHDEP") {
            if (BankCode == "240") {
                document.getElementById("successMsg_accept").innerHTML = "Successful! Refno: " + RefNo;
            }
            else if (BankCode == "059") {
                var outData = result.split("|");
                if (outData[1] != null && outData[1] != "") {
                    if (outData[1] == "YES")
                        document.getElementById("successMsg_accept").innerHTML = "Successful! Refno: " + RefNo + "; CBS Ref: " + outData[2];
                    else
                        document.getElementById("successMsg_accept").innerHTML = "Successful! Refno: " + RefNo;
                }
                else
                    document.getElementById("successMsg_accept").innerHTML = "Successful! Refno: " + RefNo;
            }
        }
        else
            document.getElementById("successMsg_accept").innerHTML = result;
    }

    function Rollback() {
        debugger;
        $("#div_rollback_success").show();
        $("#tbl_rollback_success").hide();
        $("#tbl_rollback_desc").show();
        //$("#div_rollback_failed").hide();
        $("#div_rollback_button").show();
        $("#btn_rollback_success").hide();
    }

}
catch (e) {
    alert(e.message);
}