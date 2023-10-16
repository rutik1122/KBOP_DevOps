try {

    //var rooturl = '@Url.Content("~/")';
    //var x = '@ViewBag.URL';
    //var WebImageURL = '@ViewBag.WebImageURL';
    //var PhysicalImageURL = '@ViewBag.PhysicalImageURL';

    var instruType = "";
    var instrument_type = "Voucher";

    // Used to store previous image src (Front img in particular)
    var tempSrc = "";
    var PerviousType = "";

    function getError(result) {

        //debugger;

        //$("#ProcessingBar").hide();

        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            document.getElementById("ProcessingBar").innerHTML = result.responseText;
        }

    }


    function getVoucherData() {

        //debugger;

        document.getElementById("ProcessingBar").innerHTML = "Processing Request...";

        var popup = "";
        var recipt = "no";

        //var username = document.getElementById("loginid").value;

        debugger;

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);

        var data = {
            asdrf: "1234",
            pType: transtype,
            BankCode: BankCode,
            Intellerid: username
        };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;

        var y = "getvoucherdetails";
        $("#ProcessingBar").show();

        //debugger;

        document.getElementById("btn_get_instrument").disabled = true;

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            //data: { pType: 'CASHWDL', Intellerid: username, BankCode: BankCode },
            data: { Request_Data: encrypted_data },
            success: getSuccessVoucher,
            error: getErrorNoData
        });

    }

    function getErrorNoData(data) {
        debugger;
        document.getElementById("ProcessingBar").innerHTML = data.responseJSON.Message;
        document.getElementById("btn_get_instrument").disabled = false;
    }

    function getSuccessVoucher(response_data) {
        debugger;

        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(response_data, kVal);

        debugger;

        //alert("getSuccessVoucher function");

        //$("#ProcessingBar").hide();

        var count_id = result[0].Count_Id;

        //RefNo = Ref_No_Generator(transtype);
        RefNo = Ref_No_Generator(transtype, count_id);

        //var currentDate = new Date();
        //var yyyy = currentDate.getFullYear();

        //RefNo = transtype + yyyy.toString().substring(2, 4) + String(currentDate.getUTCMonth() + 1).padStart(2, '0')
        //    + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0')
        //    + String(currentDate.getSeconds()).padStart(2, '0');

        var instDate = result[0].chqdate;
        debugger;
        instDate = DateFormatter(instDate);
        debugger;
        document.getElementById("ChequeDateTxt").value = instDate;

        if (result[0].instrumenttype == null || result[0].instrumenttype == undefined || result[0].instrumenttype == "S") {
            alert("Please Enter Correct Document.");
        }
        else {
            instruType = result[0].instrumenttype;
        }

        document.getElementById("AccountNo").value = result[0].accno;
        GetPayeee('CASHWDL');
        document.getElementById("amt").value = result[0].amount;
        document.getElementById("amount_in_words").value = result[0].amount_in_words;

        debugger;
        var flg_carlar = true;
        if (result[0].CARLAR != "" && result[0].CARLAR != null) {
            document.getElementById("CARLAR").innerHTML = result[0].CARLAR;
            if (result[0].CARLAR.toUpperCase() == "NO")
                flg_carlar = false;
        }
        else {
            document.getElementById("CARLAR").innerHTML = "NO RESPONSE";
        }

        if (flg_carlar == true)
            $("#CARLAR").css('color', 'red');
        else
            $("#CARLAR").css('color', '#03C988');

        document.getElementById("chqnoDataEntry").value = result[0].cheqno;
        document.getElementById("FG").src = result[0].frontgreyimagepath;
        document.getElementById("trans_particular").value = result[0].payeename;
        ImageUrl = result[0].frontgreyimagepath;

        document.getElementById("btn_iqa").checked = true;
        change_iqa('CASHWDL');

        //debugger;
        // UV Flag Check
        if (transtype == "CASHWDL02") {
            document.getElementById("btn_uv").checked = true;
            $("#tr_uv").hide();
        }
        else {
            if (BankCode == "240") {
                if (result[0].uvFlag != null && result[0].uvFlag != "") {
                    if (result[0].uvFlag == "000107")
                        document.getElementById("btn_uv").checked = true;
                    else
                        document.getElementById("btn_uv").checked = false;
                }
                else
                    document.getElementById("btn_uv").checked = false;
            }
            else {
                document.getElementById("btn_uv").checked = true;
                $("#tr_uv").hide();
            }
        }
        
        change_uv('CASHWDL');

        document.getElementById("btn_ir").checked = true;
        change_ir('CASHWDL');
        document.getElementById("btn_ml").checked = true;
        change_ml('CASHWDL');

        debugger;
        if (BankCode == "240" && result[0].icr_type == "AI") {

            // Cheque No
            var ColorCode = ColorCodeScore(result[0].Cheque_No_Score);
            $("#chqnoDataEntry").css('backgroundColor', '#' + ColorCode);

            // Date
            ColorCode = ColorCodeScore(result[0].DateScore);
            $("#ChequeDateTxt").css('backgroundColor', '#' + ColorCode);

            // Account No
            ColorCode = ColorCodeScore(result[0].AccNoConf);
            $("#AccountNo").css('backgroundColor', '#' + ColorCode);

            // Amount
            ColorCode = ColorCodeScore(result[0].AmountScore);
            $("#amt").css('backgroundColor', '#' + ColorCode);
        }

        $("#div_cheque").show();
        $("#div_cheque_data").show();

        document.getElementById("btn_get_instrument").disabled = false;

        var y = "ReportCodeList";

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            success: ReportCodeList,
            error: ErrorReportCode
        });

    }

    function SubmitData() {

        //debugger;
        CompleteValidation = false;
        //$("#btn_postdata").hide();
        //$("#de_status_success").hide();
        //$("#de_status_failed").show();

        $("#tbl_verf_pass").hide();
        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        document.getElementById("errorMsg").innerHTML = "";

        //// Validations

        var accStatus = document.getElementById("accStatus").innerHTML;
        var numbers = /^[0-9]+$/;

        //if (AccountValidation == false && (accStatus == "C - Closed" || accStatus == "D - Dormant" || accStatus == "I - Inactive" || accStatus == "S - Stop payment")) {
        //    var accMsg = accStatus.substring(4, accStatus.length);
        //    document.getElementById("errorMsg").innerHTML = "Account No - " + accMsg + "!";
        //}
        //else

        debugger;
        if (BankCode == "240") {
            if (AccountValidation == false) {
                document.getElementById("errorMsg").innerHTML = accStatus;
                return false;
            }
        }
        else if (BankCode == "059") {
            if (accStatus == "D - Dormant") {
                document.getElementById("errorMsg").innerHTML = "Dormant Account debit not permitted!";
                return false;
            }
            else if (AccountValidation == false && accStatus != "A - Active") {
                document.getElementById("errorMsg").innerHTML = "Account Status: " + accStatus;
                return false;
            }
            else if (AccountValidation == false) {
                document.getElementById("errorMsg").innerHTML = "Enter Valid Account Number!";
                return false;
            }
        }
        else {
            document.getElementById("errorMsg").innerHTML = "Unknown Bank Code";
            return false;
        }
        
        AccountNo = document.getElementById("AccountNo").value;
        document.getElementById("name").innerHTML = document.getElementById("PayeeName").value;

        debugger;
        var schemeCode = document.getElementById("FinScheme").innerHTML;
        if (BankCode == "240") {

        }
        else if (BankCode == "059") {
            if (schemeCode == "SBA" || schemeCode == "CAA" || schemeCode == "ODA" || schemeCode == "CCA") {
                document.getElementById("errorMsg").innerHTML = "Debit blocked - Scheme Code:" + schemeCode;
                return false;
            }
        }
        
        // Amount Validation
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

        debugger;
        if (ValidateAccBalance == "Y") {
            var Acc_balance = AccBalance.toString();
            //if (AccBalance != "" && AccBalance != null) {
            if (Acc_balance != "" && Acc_balance != null) {
                if (parseFloat(amount) > parseFloat(AccBalance)) {
                    document.getElementById("errorMsg").innerHTML = "Balance Insufficient";
                    return false;
                }
            }
            else {
                document.getElementById("errorMsg").innerHTML = "Balance Not Provided!";
                return false;
            }
        }

        debugger;
        instrument_srl_no = document.getElementById("chqnoDataEntry").value;
        if (transtype == "CASHWDL01")
            inst_type = "CHQ";
        else if (transtype == "CASHWDL02")
            inst_type = "WF";
        else
            inst_type = document.getElementById("inst_type").value;
        debugger;
        if (inst_type == "CHQ") {
            //if (ValidateChequeNo(instrument_srl_no) == false) {
            if (ChequeValidation(instrument_srl_no) == false) {
                //debugger;
                //document.getElementById("chqnoDataEntry").focus();
                document.getElementById("errorMsg").innerHTML = ErrorMessage;
                return false;
            }
            else if (chq_validation == false) {
                document.getElementById("errorMsg").innerHTML = "Serial No Error: " + chq_validation_msg;
                return false;
            }
        }
        else if (inst_type == "WF") {
            if (ValidateWithdrawalFormNo(instrument_srl_no) == false) {
                document.getElementById("errorMsg").innerHTML = ErrorMessage;
                return false;
            }
            //if (instrument_srl_no == null || instrument_srl_no == "" || instrument_srl_no.trim() == "") {
            //    document.getElementById("errorMsg").innerHTML = "Serial no. Cannot be Null";
            //    return false;
            //}
            //else if (!instrument_srl_no.match(numbers)) {
            //    document.getElementById("errorMsg").innerHTML = "Serial no. can only accept Numbers";
            //    return false;
            //}
        }
        
        if (inst_type == "CHQ") {
            if (DateValidation(document.getElementById("ChequeDateTxt").value, true) == false) {
                //document.getElementById("ChequeDateTxt").focus();
                if (ErrorMessage != null && ErrorMessage != "")
                    document.getElementById("errorMsg").innerHTML = ErrorMessage;
                else
                    document.getElementById("errorMsg").innerHTML = "Date Field is Mandatory!";
                return false;
            }
        }
        else {
            if (DateValidation(document.getElementById("ChequeDateTxt").value, false) == false) {
                //document.getElementById("ChequeDateTxt").focus();
                if (ErrorMessage != null && ErrorMessage != "")
                    document.getElementById("errorMsg").innerHTML = ErrorMessage;
                else
                    document.getElementById("errorMsg").innerHTML = "Date Field is Mandatory!";
                return false;
            }
            else {
                var dateData = currentDate();
                if (dateData != document.getElementById("ChequeDateTxt").value) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Current Date is required!";
                    return false;
                }
            }

        }
        

        //debugger;
        rpt_code = document.getElementById("rpt_code").value;
        if (rpt_code == "0" && NRE_Flag == "Y") {
            document.getElementById("errorMsg").innerHTML = "Report Code is Mandatory for NRE Account!";
            return false;
        }

        // Signature Verification
        if (SignCheckFlag == false && inst_type == "CHQ") {
            document.getElementById("errorMsg").innerHTML = "Signature Verfication Pending!";
            return false;
        }

        instrument_date = document.getElementById("ChequeDateTxt").value;

        instrument_alpha = document.getElementById("instrument_alpha").value;

        trans_particular = document.getElementById("trans_particular").value;
        
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

        //debugger;
        
        var BrCode = "Turbhe Naka(6600)";
        var PName = document.getElementById("PayeeName").value;
        var Branchcode = document.getElementById("branchcodehidden").value;
        //debugger;
        //var currentDate = new Date();
        //var yyyy = currentDate.getFullYear();
        //RefNo = transtype + yyyy.toString().substring(2, 4) + String(currentDate.getUTCMonth() + 1).padStart(2, '0')
        //    + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0')
        //    + String(currentDate.getSeconds()).padStart(2, '0');

        var l2start = parseFloat(document.getElementById("L2StartLimit").value);
        var CheckerModule = document.getElementById("CheckerModule").value;
        var data_amt = parseFloat(amount);

        //var insttype = document.getElementById("inst_type").value;
        var insttype = "";
        if (transtype == "CASHWDL01")
            insttype = "CQ4";
        else if (transtype == "CASHWDL02")
            insttype = "WF";

        var response = "2";

        //debugger;
        if (CheckerModule == "Y") {
            if (data_amt >= parseFloat(l2start))
                response = "2";
            else
                response = "12";
        }
        else {
            response = "12";
        }

        //if (CheckerModule != "Y")
        //    response = "2";
        //else if (data_amt >= parseFloat(l2start))
        //    response = "2";
        //else
        //    response = "12";

        $("#tbl_verf_pass").hide();
        $("#tbl_verf_fail").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_response_success").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";

        //debugger;
        var y = "PostData";
        flag = "submit";

        debugger;

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            //data: {
            //    pType: 'submit', maip: username, INtellerid: username, response: response, transtype: transtype, transRefNo: RefNo, BranchSolID: BrCode,
            //    imageUrl: ImageUrl, SlipAmount: amount, ChqAmount: amount, PayeeName: PName, DebitAccountNo: AccountNo, CreditAccountNo: null, chqno: chqno, SortCode: sortcode,
            //    San: san, transCode: trcode, ChqDate: chqDate, BankCode: bankcode, transaction_particular: trans_particular, report_code: rpt_code, remark_1: remark1,
            //    remark_2: remark2, instrument_alpha: instrument_alpha
            //},
            data: {
                pType: 'submit', maip: username, INtellerid: username, response: response, transtype: transtype, transRefNo: RefNo, BranchSolID: BrCode,
                imageUrl: ImageUrl, SlipAmount: amount, ChqAmount: amount, PayeeName: PName, DebitAccountNo: AccountNo, CreditAccountNo: null, chqno: instrument_srl_no,
                ChqDate: instrument_date, BankCode: BankCode, BranchCode: Branchcode, transaction_particular: trans_particular, report_code: rpt_code, remark_1: remark1,
                remark_2: remark2, instrument_alpha: instrument_alpha,
                InstrumentType: insttype
            },
            success: getSuccessPush,
            error: DataPushError

        });

    }


    function DataPushError(data) {

        //debugger;
        $("#tbl_verf_pass").hide();
        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        document.getElementById("errorMsg").innerHTML = data.responseText;

    }


    //function getSuccessPush(result) {
    //    //debugger;

    //    $("#tbl_verf_pass").hide();
    //    $("#tbl_verf_fail").hide();
    //    $("#div_submit_pass").hide();
    //    $("#div_submit_fail").hide();
    //    $("#tbl_verf_result").hide();
    //    $("#div_response_success").hide();

    //    if (flag == "submit") {
    //        if (result == 1) {
    //            $("#tbl_verf_result").show();
    //            $("#div_response_success").show();

    //            document.getElementById("successMsg").innerHTML = "Data Submited Successfully!";

    //            //alert("Data Submited Successfully");
    //            //window.location.reload();
    //        }
    //        else {

    //            $("#tbl_verf_fail").show();
    //            $("#div_submit_fail").show();

    //            document.getElementById("errorMsg").innerHTML = "Data Submission Failed!";

    //            //alert("Alert! Data Submission Failed!");
    //        }
    //    }
    //    else if (flag == "reset") {
    //        if (result > 0) {
    //            alert("Data Reset Successfull");
    //            window.location.reload();
    //        }
    //        else {
    //            alert("No Data to reset");
    //            window.location.reload();
    //        }
    //    }

    //}

    

}
catch (e) {
    alert(e.message);
}