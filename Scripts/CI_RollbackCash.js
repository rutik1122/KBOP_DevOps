try {

    debugger;

    //var instruType = "";
    //var instrument_type = "Voucher";

    // Used to store previous image src (Front img in particular)
    var tempSrc = "";
    var PerviousType = "";

    function getError(result) {

        //alert("Error found in js");

        $("#ProcessingBar").hide();
        //document.getElementById("VoucherCheck").value = "false";

        if (result.status == 401 && result.statusText == "Unauthorized") {
            //document.getElementById("ProcessingBar").innerHTML = result.responseText;
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            //alert(result.responseText);
            document.getElementById("ProcessingBar").innerHTML = result.responseText;
        }

    }


    function getSuccessVoucher(result) {
        debugger;

        //alert("getSuccessVoucher function");

        instrument_available = true;

        document.getElementById("amt").value = result.ChqAmount;

        document.getElementById("btn_iqa").checked = true;
        change_iqa('CASHWDL');
        document.getElementById("btn_uv").checked = true;
        change_uv('CASHWDL');
        document.getElementById("btn_ir").checked = true;
        change_ir('CASHWDL');
        document.getElementById("btn_ml").checked = true;
        change_ml('CASHWDL');

        if (transtype == "CI01") {
            document.getElementById("AccountNo").value = result.CreditAccNo;
            $("#div_srl_date_alpha").hide();
            $("#tr_WDL_inst_type").hide();
            //$("#tr_WDL_trans_par").hide();
            GetPayeee('CASHDEP');
            preCheckPancard();
            $("#tr_uv").hide();
            $("#tr_ir").hide();
            $("#tr_ml").hide();
        }
        else if (transtype == "CASHWDL") {
            document.getElementById("AccountNo").value = result.DebitAccNo;
            //$("#tr_DEP_trans_par").hide();
            GetPayeee('CASHWDL');
            $("#row_pan").hide();
        }

        document.getElementById("FG").src = result.Image;
        ImageUrl = result.Image;

        instrument_srl_no = result.ChequeNo;
        document.getElementById("chqnoDataEntry").value = result.ChequeNo;

        instrument_date = result.date;
        document.getElementById("ChequeDateTxt").value = result.date;

        instrument_alpha = result.instrument_alpha;
        document.getElementById("instrument_alpha").value = result.instrument_alpha;
        debugger;
        trans_particular = result.transaction_particular;
        //if (transtype == "CASHDEP")
        document.getElementById("transParticular").value = result.transaction_particular;
        if (transtype == "CASHWDL") {
            //document.getElementById("trans_particular").value = result.transaction_particular;
            inst_type = result.InstrumentType;
            document.getElementById("inst_type").value = inst_type;

        }

        debugger;
        rpt_code = result.report_code;
        //document.getElementById("rpt_code").value = result.report_code;
        old_rpt_code = result.report_code;

        remark1 = result.remark_1;
        document.getElementById("remark_1").value = result.remark_1;

        remark2 = result.remark_2;
        document.getElementById("remark_2").value = result.remark_2;

        pancard_form16 = result.pancard_form_16;
        document.getElementById("pan").value = result.pancard_form_16;
        debugger;
        document.getElementById("rollback").value = result.reject_desc;

        debugger;

        $("#div_cheque").show();
        //$("#div_cheque_data").show();

        var y = "ReportCodeList";

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            success: ReportCodeList_selected,
            error: ErrorReportCode
        });

        //if (transtype == "CASHDEP") {

        //}
        //else
        //    $("#ProcessingBar").hide();
    }

    function SubmitData() {

        debugger;
        CompleteValidation = false;
        //$("#btn_postdata").hide();
        //$("#de_status_success").hide();
        //$("#de_status_failed").show();

        $("#tbl_verf_pass").hide();
        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();

        // success resp
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        //// Validations

        AccountNo = document.getElementById("AccountNo").value;

        var accStatus = document.getElementById("accStatus").innerHTML;

        if (BankCode == "240") {
            if (AccountValidation == false) {
                document.getElementById("errorMsg").innerHTML = accStatus;
                return false;
            }
        }
        else {
            if (accStatus != "A - Active" && accStatus != "D - Dormant") {
                document.getElementById("errorMsg").innerHTML = accStatus;
                return false;
            }
            else if (AccountValidation == false) {
                document.getElementById("errorMsg").innerHTML = "Enter Valid Account Number!";
                return false;
            }

            //if (transtype == "CI01") {
            //    if (accStatus != "A - Active" && accStatus != "D - Dormant") {
            //        document.getElementById("errorMsg").innerHTML = accStatus;
            //        return false;
            //    }
            //    else if (AccountValidation == false) {
            //        document.getElementById("errorMsg").innerHTML = "Enter Valid Account Number!";
            //        return false;
            //    }

            //    var schemeCode = document.getElementById("FinScheme").innerHTML;
            //    if (schemeCode == "SBNRE" || schemeCode == "ODNRE" || schemeCode == "FDNRE" || schemeCode == "KNNRE") {
            //        document.getElementById("errorMsg").innerHTML = "Deposit not allowed - Scheme Code:" + schemeCode;
            //        return false;
            //    }
            //}
            
        }
        //if (transtype == "CASHDEP") {
        //    if (accStatus != "A - Active" && accStatus != "D - Dormant") {
        //        document.getElementById("errorMsg").innerHTML = "Account status is " + accStatus;
        //        return false;
        //    }
        //    else if (AccountValidation == false) {
        //        document.getElementById("errorMsg").innerHTML = "Enter Valid Account Number!";
        //        return false;
        //    }
        //}
        //else if (transtype == "CASHWDL") {
        //    if (accStatus != "A - Active") {
        //        document.getElementById("errorMsg").innerHTML = "Account status is " + accStatus;
        //        return false;
        //    }
        //    else if (AccountValidation == false) {
        //        document.getElementById("errorMsg").innerHTML = "Enter Valid Account Number!";
        //        return false;
        //    }
        //}


        //if (instrument_available == false) {
        //    if (AccountNo == null || AccountNo == "") {
        //        document.getElementById("errorMsg").innerHTML = "Account Number field cannot be blank!";
        //        return false;
        //    }
        //}
        //else {
        //    //if (AccountValidation == false && (accStatus == "C - Closed" || accStatus == "D - Dormant" || accStatus == "I - Inactive" || accStatus == "S - Stop payment")) {
        //    //    var accMsg = accStatus.substring(4, accStatus.length);
        //    //    document.getElementById("errorMsg").innerHTML = "Account No - " + accMsg + "!";
        //    //}
        //    //else 
        //    if (AccountValidation == false && accStatus != "A - Active") {
        //        document.getElementById("errorMsg").innerHTML = accStatus;
        //        return false;
        //    }
        //    else if (AccountValidation == false) {
        //        document.getElementById("errorMsg").innerHTML = "Enter Valid Account Number!";
        //        return false;
        //    }
        //}

        document.getElementById("name").innerHTML = document.getElementById("PayeeName").value;

        amount = document.getElementById("amt").value;
        //if (amount < 1) {
        //    //alert("Alert! Enter Valid Amount");
        //    document.getElementById("errorMsg").innerHTML = "Enter Valid Amount!";
        //    return false;
        //}
        var amtcheck = AmountValidationWith50Paise(amount);
        if (amtcheck == false) {
            document.getElementById("errorMsg").innerHTML = ErrorMessage;
            return false;
        }

        if (transtype == "CASHWDL") {
            if (AccBalance != "" && AccBalance != null) {
                if (parseFloat(amount) > parseFloat(AccBalance)) {
                    document.getElementById("errorMsg").innerHTML = "Balance Insufficient";
                    return false;
                }
            }
        }

        pancard_form16 = document.getElementById("pan").value;
        if (PanValidationStatus == true && (pancard_form16 == null || pancard_form16 == '')) {
            document.getElementById("errorMsg").innerHTML = "Enter Form 16 No!";
            return false;
        }
        debugger;
        rpt_code = document.getElementById("rpt_code").value;
        if (rpt_code == "0" && NRE_Flag == "Y") {
            document.getElementById("errorMsg").innerHTML = "Select Report Code!";
            return false;
        }

        if (transtype == "CASHWDL") {
            if (ValidateChequeNo(document.getElementById("chqnoDataEntry").value) == false) {
                //document.getElementById("chqnoDataEntry").focus();
                document.getElementById("errorMsg").innerHTML = ErrorMessage;
                return false;
            }
            instrument_srl_no = document.getElementById("chqnoDataEntry").value;

            if (DateValidation(document.getElementById("ChequeDateTxt").value, true) == false) {
                //document.getElementById("ChequeDateTxt").focus();
                document.getElementById("errorMsg").innerHTML = ErrorMessage;
                return false;
            }
        }

        instrument_date = document.getElementById("ChequeDateTxt").value;
        instrument_alpha = document.getElementById("instrument_alpha").value;


        trans_particular = document.getElementById("transParticular").value;
        remark1 = document.getElementById("remark_1").value;
        remark2 = document.getElementById("remark_2").value;


        CompleteValidation = true;
        $("#tbl_verf_pass").show();
        $("#tbl_verf_fail").hide();
        $("#div_submit_pass").show();
        $("#div_submit_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        //$("#btn_postdata").show();
        //$("#de_status_success").show();
        //$("#de_status_failed").hide();

        CheckFlag();
    }

    function DataPush() {
        if (CompleteValidation != true) {
            alert("Alert! Verification is pending!");
            return false;
        }

        debugger;

        var BrCode = "Turbhe Naka(6600)";
        var PName = document.getElementById("PayeeName").value;

        debugger;
        var currentDate = new Date();
        var yyyy = currentDate.getFullYear();
        //var RefNo = transtype + yyyy.toString().substring(2, 4) + String(currentDate.getUTCMonth() + 1).padStart(2, '0')
        //    + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0')
        //    + String(currentDate.getSeconds()).padStart(2, '0');

        var l2start = parseFloat(document.getElementById("L2StartLimit").value);
        var CheckerModule = document.getElementById("CheckerModule").value;
        var data_amt = parseFloat(amount);
        var response = "71";

        debugger;

        if (transtype == "CI01") {
            if (CheckerModule != "Y")
                response = "71";
            else if (data_amt >= parseFloat(l2start))
                response = "72";
            else
                response = "71";

        }
        //else if (transtype == "CASHWDL") {
        //    if (CheckerModule != "Y")
        //        response = "12";
        //    else if (data_amt >= parseFloat(l2start))
        //        response = "2";
        //    else
        //        response = "12";
        //}



        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        //instrument_date = dd + '-' + mm + '-' + yyyy;

        debugger;
        var y = "postCheckerWithdrawData";

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            data: {
                btnVal: 'ACCEPT', Status: response, Verf: 'ROLLBACK', count_id: Count_id, transactionType: transtype, TransactionRefNo: RefNo, BranchSolID: BrCode,
                ChqAmount: amount, PayeeName: PName, DebitAccNo: AccountNo, ChequeNo: instrument_srl_no,
                date: instrument_date, BankCode: BankCode, transaction_particular: trans_particular, report_code: rpt_code, remark_1: remark1,
                remark_2: remark2, pancard_form_16: pancard_form16, instrument_alpha: instrument_alpha, InstrumentType: inst_type
            },
            success: getSuccessPush_Rollback,
            error: getError

        });

    }

    function getSuccessPush_Rollback(result) {
        debugger;
        $("#tbl_verf_pass").hide();
        $("#tbl_verf_fail").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();

        $("#tbl_verf_result").show();
        $("#div_response_success").show();

        document.getElementById("successMsg").innerHTML = result;

    }

    function CheckerList() {
        window.open(rooturl + "Checker/Index", "_self");
    }

}
catch (e) {
    alert(e.message);
}