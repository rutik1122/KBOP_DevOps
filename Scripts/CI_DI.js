//const { error } = require("jquery");

try {

    //debugger;

    var instruType = "";
    var instrument_type = "Voucher";

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

    function getVoucherData() {

        debugger;
        document.getElementById("ProcessingBar").innerHTML = "Processing Request...";
        var popup = "";
        var recipt = "no";

        //debugger;
        //if (transtype == "DI01") {
        //    var ci_di_type = "CASHWDL"
        //}
        //else if (transtype == "CI01")
        //    var ci_di_type = "CASHDEP"

        //var username = document.getElementById("loginid").value;

        debugger;

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);

        var data = {
            asdrf: "1234",
            //pType: ci_di_type,       // CASHDEP / CI01
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

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            //data: { pType: 'CASHDEP', Intellerid: username, BankCode: BankCode },
            data: { Request_Data: encrypted_data },
            success: getSuccessVoucher,
            error: getErrorNoData
        });

    }

    function getErrorNoData(data) {
        document.getElementById("ProcessingBar").innerHTML = data.responseJSON.Message;
    }

    function getSuccessVoucher(response_data) {
        debugger;

        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(response_data, kVal);

        debugger;
        RefNo = Ref_No_Generator(transtype, result[0].Count_Id);

        var currentDate = new Date();
        var yyyy = currentDate.getFullYear();

        //RefNo = transtype + yyyy.toString().substring(2, 4) + String(currentDate.getUTCMonth() + 1).padStart(2, '0')
        //    + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0')
        //    + String(currentDate.getSeconds()).padStart(2, '0') + String(currentDate.getMilliseconds()).padStart(2,'0');

        instrument_available = true;

        //document.getElementById("ChequeDateTxt").value = result[0].chqdate;

        if (result[0].instrumenttype == null || result[0].instrumenttype == undefined || result[0].instrumenttype == "C") {
            alert("Please Enter Correct Document.");
        }
        else {
            instruType = result[0].instrumenttype;
        }

        Count_Id = result[0].Count_Id;
        document.getElementById("AccountNo").value = result[0].accno;
        GetPayeee(transtype);
        document.getElementById("amt").value = result[0].totalamount;
        //document.getElementById("chqnoDataEntry").value = result[0].cheqno;
        document.getElementById("FG").src = result[0].frontgreyimagepath;
        ImageUrl = result[0].frontgreyimagepath;

        debugger;

        $("#div_cheque").show();
        $("#div_cheque_data").show();

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

            var schemeCode = document.getElementById("FinScheme").innerHTML;
            if (schemeCode == "SBNRE" || schemeCode == "ODNRE" || schemeCode == "FDNRE" || schemeCode == "KNNRE") {
                document.getElementById("errorMsg").innerHTML = "Deposit not allowed - Scheme Code:" + schemeCode;
                return false;
            }
        }

        document.getElementById("name").innerHTML = document.getElementById("PayeeName").value;

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

        // PAN Verification
        pancard_form16 = document.getElementById("pan").value;

        if (PanValidation_Req == true) {
            if (PanValidation_Status == false && (pancard_form16 == null || pancard_form16 == "")) {
                document.getElementById("errorMsg").innerHTML = "Enter Form 16 No!";
                return false;
            }
            else if (pancard_form16 == null || pancard_form16 == "") {
                document.getElementById("errorMsg").innerHTML = "Pan No field is blank!";
                return false;
            }
        }

        //if (PanValidationStatus == true && (pancard_form16 == null || pancard_form16 == '')) {
        //    document.getElementById("errorMsg").innerHTML = "Enter Form 16 No!";
        //    return false;
        //}

        //debugger;
        rpt_code = document.getElementById("rpt_code").value;
        if (rpt_code == "0" && NRE_Flag == "Y") {
            document.getElementById("errorMsg").innerHTML = "Report Code is Mandatory for NRE Account!";
            return false;
        }

        trans_particular = document.getElementById("transParticular").value;
        debugger;
        if (trans_particular == null || trans_particular == "") {
            document.getElementById("errorMsg").innerHTML = "Enter Trans. Particular Name!";
            return false;
        }

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

    }

    function DataPush() {
        if (CompleteValidation != true) {
            alert("Alert! Verification is pending!");
            return false;
        }

        //debugger;
        //var username = document.getElementById("loginid").value;
        var BrCode = "Turbhe Naka(6600)";
        var PName = document.getElementById("PayeeName").value;
        var Branchcode = document.getElementById("branchcodehidden").value;
        var l2start = parseFloat(document.getElementById("L2StartLimit").value);
        var CheckerModule = document.getElementById("CheckerModule").value;
        var data_amt = parseFloat(amount);
        var response = "";
                

        ////debugger;
        //if (BankCode == "240") {
        //    response = "12";
        //}
        //else {
        //    if (CheckerModule != "Y")
        //        response = "2";
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

        instrument_date = dd + '-' + mm + '-' + yyyy;

        var debit_acc = "";
        var credit_acc = "";
        if (transtype == "CI01") {
            credit_acc = AccountNo;
            response = "78";
        }
        else if (transtype == "DI01") {
            debit_acc = AccountNo;
            response = "88";
        }

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        document.getElementById("successMsg").innerHTML = "Processing Request...";
        $("#tbl_verf_pass").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();

        //debugger;
        var y = "PostData";
        flag = "submit";

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
                imageUrl: ImageUrl, SlipAmount: amount, ChqAmount: amount, PayeeName: PName, DebitAccountNo: debit_acc, CreditAccountNo: credit_acc,
                ChqDate: instrument_date, BankCode: BankCode, BranchCode: Branchcode, transaction_particular: trans_particular, report_code: rpt_code, remark_1: remark1,
                remark_2: remark2, pancard_form16: pancard_form16
            },
            success: getSuccessPush,
            error: getError

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


    function RedirectToNextProcess() {
        debugger;
        if (transtype == "DI01")
            window.open(rooturl + "CI_DI_Form/GetCash?id=" + Count_Id + "&refno=" + RefNo + "&transaction_type=DI01", "_self");
        else if (transtype == "CI01")
            window.open(rooturl + "CI_DI_Form/GetCash?id=" + Count_Id + "&refno=" + RefNo + "&transaction_type=CI01", "_self");
    }

}
catch (e) {
    alert(e.message);
}