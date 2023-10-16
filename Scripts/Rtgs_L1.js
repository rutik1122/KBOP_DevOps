//try {
//    // Used to store previous image src (Front img in particular)
//    var tempSrc = "";
//    var PerviousType = "";

//    function getError(result) {

//        debugger;

//        //$("#ProcessingBar").hide();

//        if (result.status == 401 && result.statusText == "Unauthorized") {
//            alert(result.responseText);
//            window.location = rooturl + "home/Login";
//        }
//        else {
//            document.getElementById("ProcessingBar").innerHTML = result.responseText;
//        }

//    }

//    function GetRtgsFormData(data) {
//        debugger;

//        $("#ProcessingBar").hide();

//        //$("#div_rtgs").show();
//        //$("#div_rtgs_data").show();


//        var currentDate = new Date();
//        var yyyy = currentDate.getFullYear();

//        RefNo = 'RTGS_01_02' + yyyy.toString().substring(2, 4) + String(currentDate.getUTCMonth() + 1).padStart(2, '0')
//            + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0')
//            + String(currentDate.getSeconds()).padStart(2, '0');

//        document.getElementById("FG").src = data.FrontImagePath;
//        document.getElementById("txt_cust_name").value = data.Debit_CustomerName;
//        document.getElementById("AccountNo").value = data.Debit_AccountNo;
//        document.getElementById("chqnoDataEntry").value = data.ChequeNo;
//        document.getElementById("txt_mobile_no").value = data.Debit_MobileNo;
//        //document.getElementById("txt_tel_no").value = data.Debit_TelephoneNo;
//        //document.getElementById("txt_remitter_lei_code").value = data.Debit_Lei_Code;
//        //document.getElementById("txt_lei_date").value = data.Debit_Lei_ExpiryDate;
//        //document.getElementById("txt_remitter_address").value = data.Debit_Address;
//        //document.getElementById("txt_email_id").value = data.Debit_EmailId;
//        //document.getElementById("txt_cash_deposited").value = data.Cash_Deposited;

//        document.getElementById("txt_bene_name").value = data.Credit_CustomerName;
//        document.getElementById("txt_bene_address").value = data.Credit_Address;
//        document.getElementById("txt_bene_acc_no").value = data.Credit_AccountNo;
//        document.getElementById("txt_bene_conf_acc_no").value = data.Credit_ConfirmAccountNo;
//        document.getElementById("txt_bene_bank_branch_name").value = data.Credit_BranchName;
//        document.getElementById("txt_ifsc_code").value = data.Credit_IFSC_Code;
//        document.getElementById("txt_amt").value = data.Credit_Amount_InFigure;
//        document.getElementById("txt_amt_words").value = data.Credit_Amount_InWords;
//        document.getElementById("Sid").value = data.SniId;

//    }
//    function SubmitData() {

//        CompleteValidation = false;
//        $("#div_accept_success").hide();
//        $("#tbl_verf_fail").show();
//        $("#div_submit_pass").hide();
//        $("#div_submit_fail").show();
//        $("#tbl_verf_result").hide();
//        $("#div_response_success").hide();
//        //$("#tbl_verf_pass").hide();

//        document.getElementById("errorMsg").innerHTML = "";

//        var numbers = /^[0-9]+$/;
//        var amtCheck = /^[-+]?[0-9]+\.[0-9]+$/;

//        debugger;
//        if (document.getElementById("txt_cust_name").value == "" || document.getElementById("txt_cust_name").value == null) {
//            document.getElementById("errorMsg").innerHTML = "Please Enter Customer Name";
//            return false;
//        }

//        debugger;
//        if (document.getElementById("AccountNo").value == "" || document.getElementById("AccountNo").value == null) {
//            document.getElementById("errorMsg").innerHTML = "Please Enter Account Number";
//            return false;
//        }

//        debugger;
//        if (document.getElementById("chqnoDataEntry").value == "" || document.getElementById("chqnoDataEntry").value == null) {
//            document.getElementById("errorMsg").innerHTML = "Please Enter Cheque Number";
//            return false;
//        }

//        if (document.getElementById("txt_mobile_no").value == "" || document.getElementById("txt_mobile_no").value == null) {
//            document.getElementById("errorMsg").innerHTML = "Please Enter Mobile Number";
//            return false;
//        }

//        //if (document.getElementById("txt_tel_no").value == "" || document.getElementById("txt_tel_no").value == null) {
//        //    document.getElementById("errorMsg").innerHTML = "Please Enter Telephone Number";
//        //    return false;
//        //}

//        //if (document.getElementById("txt_remitter_lei_code").value == "" || document.getElementById("txt_remitter_lei_code").value == null) {
//        //    document.getElementById("errorMsg").innerHTML = "Please Enter lei code";
//        //    return false;
//        //}

//        //if (document.getElementById("txt_lei_date").value == "" || document.getElementById("txt_lei_date").value == null) {
//        //    document.getElementById("errorMsg").innerHTML = "Please Enter lei date";
//        //    return false;
//        //}

//        //if (document.getElementById("txt_remitter_address").value == "" || document.getElementById("txt_remitter_address").value == null) {
//        //    document.getElementById("errorMsg").innerHTML = "Please Enter lei Address";
//        //    return false;
//        //}

//        //if (document.getElementById("txt_email_id").value == "" || document.getElementById("txt_email_id").value == null) {
//        //    document.getElementById("errorMsg").innerHTML = "Please Enter EmailId";
//        //    return false;
//        //}

//        //if (document.getElementById("txt_cash_deposited").value == "" || document.getElementById("txt_cash_deposited").value == null) {
//        //    document.getElementById("errorMsg").innerHTML = "Please select Cash For Deposited Amount";
//        //    return false;
//        //}

//        if (document.getElementById("txt_bene_name").value == "" || document.getElementById("txt_bene_name").value == null) {
//            document.getElementById("errorMsg").innerHTML = "Please Enter Beneficiary Name";
//            return false;
//        }

//        if (document.getElementById("txt_bene_address").value == "" || document.getElementById("txt_bene_address").value == null) {
//            document.getElementById("errorMsg").innerHTML = "Please Enter Beneficiary Address";
//            return false;
//        }

//        if (document.getElementById("txt_bene_acc_no").value == "" || document.getElementById("txt_bene_acc_no").value == null) {
//            document.getElementById("errorMsg").innerHTML = "Please Enter Beneficiary Account Number";
//            return false;
//        }

//        if (document.getElementById("txt_bene_conf_acc_no").value == "" || document.getElementById("txt_bene_conf_acc_no").value == null) {
//            document.getElementById("errorMsg").innerHTML = "Please Confirm  Beneficiary Account Number";
//            return false;
//        }

//        if (document.getElementById("txt_bene_bank_branch_name").value == "" || document.getElementById("txt_bene_bank_branch_name").value == null) {
//            document.getElementById("errorMsg").innerHTML = "Please Enter Bank and Branch Name";
//            return false;
//        }

//        if (document.getElementById("txt_ifsc_code").value == "" || document.getElementById("txt_ifsc_code").value == null) {
//            document.getElementById("errorMsg").innerHTML = "Please Enter IFSC Code";
//            return false;
//        }

//        if (document.getElementById("AccountNo").value == document.getElementById("txt_bene_acc_no").value) {
//            document.getElementById("errorMsg").innerHTML = "Credit and Debit Account no are same";
//            return false;
//        }

//        if (document.getElementById("txt_bene_acc_no").value != document.getElementById("txt_bene_conf_acc_no").value) {
//            document.getElementById("errorMsg").innerHTML = "Beneficiary Account Number are not matching";
//            return false;
//        }

//        var amt = document.getElementById("txt_amt").value;
//        if (amt == null || amt == "") {
//            dataValid = false;
//            document.getElementById("errorMsg").innerHTML = "Amount cannot be null!";
//        }
//        else if (!amt.match(numbers)) {
//            if (!amt.match(amtCheck)) {
//                dataValid = false;
//                document.getElementById("errorMsg").innerHTML = "Amount can accept 2 decimal or numeric values!";

//            }
//            else if (parseInt(amt) < 1) {
//                dataValid = false;
//                document.getElementById("errorMsg").innerHTML = "Enter valid amount!";
//            }
//            else {
//                var splitstr = amt.split('.');
//                debugger;
//                if (splitstr[1] != null) {
//                    var strlength = splitstr[1].length;
//                    if (strlength != 2) {
//                        dataValid = false;
//                        document.getElementById("errorMsg").innerHTML = "2 decimal value required!";
//                    }

//                }
//            }
//        }
//        else if (parseInt(amt) < 1) {
//            dataValid = false;
//            document.getElementById("errorMsg").innerHTML = "Enter valid amount!";
//        }
//        else {
//            var splitstr = amt.split('.');
//            debugger;
//            if (splitstr[1] != null) {
//                var strlength = splitstr[1].length;
//                if (strlength != 2) {
//                    dataValid = false;
//                    document.getElementById("errorMsg").innerHTML = "2 decimal value required!";
//                }

//            }
//        }

//        if (document.getElementById("txt_amt_words").value != document.getElementById("txt_amt_words").value) {
//            document.getElementById("errorMsg").innerHTML = "Amount in words cannot be null";
//            return false;
//        }


//        CompleteValidation = true;
//        //$("#tbl_verf_pass").show();
//        $("#tbl_verf_fail").hide();
//        $("#div_accept_success").show();
//        $("#div_submit_pass").show();
//        $("#div_submit_fail").hide();
//        $("#tbl_verf_result").hide();
//        $("#div_response_success").hide();

//    }

//    function DataPush() {
//        debugger;

//        var check_rtgs_neft = document.getElementById("lbl_inst_type").innerHTML;
//        var name = document.getElementById("txt_cust_name").value;
//        var accno = document.getElementById("AccountNo").value;
//        var chequeno = document.getElementById("chqnoDataEntry").value;
//        var mobno = document.getElementById("txt_mobile_no").value;
//        //var telno = document.getElementById("txt_tel_no").value;
//        //var leicode = document.getElementById("txt_remitter_lei_code").value;
//        //var leidate = document.getElementById("txt_lei_date").value;
//        //var address = document.getElementById("txt_remitter_address").value;
//        //var emailid = document.getElementById("txt_email_id").value;
//        //var cashdepo = document.getElementById("txt_cash_deposited").value;
//        var benname = document.getElementById("txt_bene_name").value;
//        var benaddress = document.getElementById("txt_bene_address").value;
//        var benaccno = document.getElementById("txt_bene_acc_no").value;
//        var confirmaccno = document.getElementById("txt_bene_conf_acc_no").value;
//        var benbranchname = document.getElementById("txt_bene_bank_branch_name").value;
//        var benifsc = document.getElementById("txt_ifsc_code").value;
//        var amountinwords = document.getElementById("txt_amt_words").value;
//        amount = document.getElementById("txt_amt").value;
//        var credit_acc_type = document.getElementById("lbl_acc_type").innerHTML;

//        debugger;

//        var sni_id = document.getElementById("Sid").value;

//        debugger;

//        var y = "UpdateBankFormData";

//        $.ajax({
//            type: "POST",
//            url: x + y,
//            data: {
//                ReferenceNo: RefNo, CountId: count_id, SniId: sni_id, FormType: 'RTGS', BankCode: BankCode, Verf_Level: 'L1', UploadType: 'RTGS_01_02',
//                Rtgs_Neft_Flag: check_rtgs_neft, Debit_CustomerName: name, Debit_AccountNo: accno, ChequeNo: chequeno, Debit_MobileNo: mobno,
//                Credit_CustomerName: benname, Credit_Address: benaddress, Credit_AccountNo: benaccno, Credit_ConfirmAccountNo: confirmaccno,
//                Credit_BankName: benbranchname, Credit_IFSC_Code: benifsc, Credit_Amount_InFigure: amount, Credit_Amount_InWords: amountinwords,
//                Credit_AccountType: credit_acc_type
//            },
//            //data: {
//            //    ReferenceNo: RefNo, CountId: count_id, SniId: sni_id, FormType: 'RTGS', BankCode: BankCode, Verf_Level: 'L1',
//            //    Debit_CustomerName: name, Debit_AccountNo: accno, ChequeNo: chequeno, Debit_MobileNo: mobno, Debit_TelephoneNo: telno, Debit_Lei_Code: leicode,
//            //    Debit_Lei_ExpiryDate: leidate, Debit_Address: address, Debit_EmailId: emailid, Cash_Deposited: cashdepo, Credit_CustomerName: benname,
//            //    Credit_Address: benaddress, Credit_AccountNo: benaccno, Credit_ConfirmAccountNo: confirmaccno, Credit_BranchName: benbranchname,
//            //    Credit_IFSC_Code: benifsc
//            //},
//            success: SuccessResponse,
//            error: ErrorApiMessage
//        });

//    }

//    function SuccessResponse(data) {

//        debugger;
//        //$("#tbl_verf_pass").show();
//        $("#tbl_verf_fail").hide();
//        $("#div_accept_success").hide();
//        $("#div_submit_pass").hide();
//        $("#div_submit_fail").hide();
//        $("#tbl_verf_result").show();
//        $("#div_response_success").show();

//        document.getElementById("successMsg").innerHTML = data;

//    }

//    function ErrorApiMessage(data) {

//        $("#tbl_verf_fail").show();
//        $("#div_submit_pass").hide();
//        $("#div_accept_success").hide();
//        $("#div_submit_pass").hide();
//        $("#div_submit_fail").show();
//        $("#tbl_verf_result").hide();
//        $("#div_response_success").hide();

//        document.getElementById("errorMsg").innerHTML = data.responseText;

//    }
//}
//catch (e) {
//    alert(e.message);
//}

try {
    // Used to store previous image src (Front img in particular)
    var tempSrc = "";
    var PerviousType = "";

    function getError(result) {

        debugger;

        //$("#ProcessingBar").hide();

        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            document.getElementById("ProcessingBar").innerHTML = result.responseText;
        }

    }

    function GetRtgsFormData(data) {
        debugger;

        $("#ProcessingBar").hide();

        //$("#div_rtgs").show();
        //$("#div_rtgs_data").show();


        var currentDate = new Date();
        var yyyy = currentDate.getFullYear();

        debugger;
        if (CheckerPage == false && verfLevel == "L1")
            RefNo = Ref_No_Generator(transtype, data.CountId);


        debugger;
        if (verfLevel == "ROLLBACK") {
            transtype = data.TransactionType;
            document.getElementById("rollback_rtgs").value = data.RejectDesc;
            document.getElementById("rollback_chq").value = data.RejectDesc;
        }

        //RefNo = 'RTGS_01_02' + yyyy.toString().substring(2, 4) + String(currentDate.getUTCMonth() + 1).padStart(2, '0')
        //    + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0')
        //    + String(currentDate.getSeconds()).padStart(2, '0');

        document.getElementById("BG").src = data.FrontImagePath;
        document.getElementById("txt_cust_name").value = data.Debit_CustomerName;
        document.getElementById("AccountNo").value = data.Debit_AccountNo;
        document.getElementById("chqnoDataEntry").value = data.ChequeNo;
        document.getElementById("txt_mobile_no").value = data.Debit_MobileNo;
        //document.getElementById("txt_tel_no").value = data.Debit_TelephoneNo;
        //document.getElementById("txt_remitter_lei_code").value = data.Debit_Lei_Code;
        //document.getElementById("txt_lei_date").value = data.Debit_Lei_ExpiryDate;
        //document.getElementById("txt_remitter_address").value = data.Debit_Address;
        //document.getElementById("txt_email_id").value = data.Debit_EmailId;
        //document.getElementById("txt_cash_deposited").value = data.Cash_Deposited;

        document.getElementById("txt_bene_name").value = data.Credit_CustomerName;
        document.getElementById("txt_bene_address").value = data.Credit_Address;
        document.getElementById("txt_bene_acc_no").value = data.Credit_AccountNo;
        document.getElementById("txt_bene_conf_acc_no").value = data.Credit_ConfirmAccountNo;
        document.getElementById("txt_bene_bank_branch_name").value = data.Credit_BranchName;
        document.getElementById("txt_ifsc_code").value = data.Credit_IFSC_Code;
        document.getElementById("txt_amt").value = data.Credit_Amount_InFigure;
        document.getElementById("txt_amt_words").value = data.Credit_Amount_InWords;
        document.getElementById("Sid").value = data.SniId;

        debugger;
        if (transtype == "RTGS_03_04" || transtype == "RTGS03" || transtype == "RTGS03") {
            // Cheque Details
            document.getElementById("FG").src = data.BackImagePath;
            document.getElementById("txt_chq_date").value = data.chq_date;
            document.getElementById("txt_chq_ifsc_code").value = data.chq_IFSC_code;
            document.getElementById("chq_payee_name").value = data.chq_payee_name;
            document.getElementById("txt_chq_amt_words").value = data.chq_amt_in_words;
            document.getElementById("txt_chq_amt").value = data.chq_amt_in_fig;
            document.getElementById("chq_account_no").value = data.chq_debit_accno;
            document.getElementById("txt_chq_no").value = data.ChequeNo;
            document.getElementById("txt_sort_no").value = data.chq_sort_code;
            document.getElementById("txt_san_no").value = data.chq_san;
            document.getElementById("txt_tr_code").value = data.chq_tr;
            document.getElementById("chq_Sid").value = data.chq_SniId;

            if (CheckerPage == true) {
                transtype = data.TransactionType;
                GetPayeee('RTGS_03_04');
            }


        }


        debugger;
        if (CheckerPage == true) {
            $.ajax({
                url: x + "ItemReturnList",
                headers: authHeaders,
                type: 'POST',
                success: RejectList
            });
        }
        else
            $("#ProcessingBar").hide();

    }

    function RejectList(printer) {
        //debugger;
        $("#tbl_reject_list").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            AddRecordRow_RejectList(print);
        });
    }

    function AddRecordRow_RejectList(print) {
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_reject_list tbody").length == 0) {
            $("#tbl_reject_list").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_reject_list tbody").append(
            RecordTableRow_RejectList(print));
    }

    function RecordTableRow_RejectList(print) {
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
            //debugger;
            var objCells = tableData.rows.item(i).cells;
            var tbl_code = objCells[0].innerText;
            if (tbl_code == c) {
                //debugger;
                code = objCells[0].innerText;
                desc = objCells[1].innerText;
            }

        }

        $("#div_reject_code").show();
        $("#div_reject_desc").show();

        document.getElementById("div_code").value = code;
        document.getElementById("div_desc").value = desc;

        //if (code == "88") {
        //    document.getElementById("div_desc").disabled = false;
        //    document.getElementById("div_desc").value = "";
        //    desc = "";
        //}
        //else
        //    document.getElementById("div_desc").disabled = true;
        debugger;
        $("#tbl_reject_list").hide();
        $("#div_reject_success").show();
        $("#div_reject_failed").hide();
        $("#div_reject_button").show();
        $("#btn_reject_success").hide();

    }
    function SubmitData() {

        CompleteValidation = false;
        var dataValid = true;
        $("#div_accept_success").hide();
        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();
        //$("#tbl_verf_pass").hide();

        document.getElementById("errorMsg").innerHTML = "";

        var numbers = /^[0-9]+$/;
        var amtCheck = /^[-+]?[0-9]+\.[0-9]+$/;

        debugger;



        if (document.getElementById("txt_cust_name").value == "" || document.getElementById("txt_cust_name").value == null) {
            document.getElementById("errorMsg").innerHTML = "Please Enter Customer Name";
            return false;
        }

        debugger;

        var accNo = document.getElementById("AccountNo").value;
        if (document.getElementById("AccountNo").value == "" || document.getElementById("AccountNo").value == null) {
            document.getElementById("errorMsg").innerHTML = "Please Enter Account Number";
            return false;
        }

        debugger;
        var rtgs_ch_No = document.getElementById("chqnoDataEntry").value;
        if (document.getElementById("chqnoDataEntry").value == "" || document.getElementById("chqnoDataEntry").value == null) {
            document.getElementById("errorMsg").innerHTML = "Please Enter Cheque Number";
            return false;
        }

        if (document.getElementById("txt_mobile_no").value == "" || document.getElementById("txt_mobile_no").value == null) {
            document.getElementById("errorMsg").innerHTML = "Please Enter Mobile Number";
            return false;
        }

        var custName = document.getElementById("txt_bene_name").value;

        if (document.getElementById("txt_bene_name").value == "" || document.getElementById("txt_bene_name").value == null) {
            document.getElementById("errorMsg").innerHTML = "Please Enter Beneficiary Name";
            return false;
        }

        if (document.getElementById("txt_bene_address").value == "" || document.getElementById("txt_bene_address").value == null) {
            document.getElementById("errorMsg").innerHTML = "Please Enter Beneficiary Address";
            return false;
        }

        if (document.getElementById("txt_bene_acc_no").value == "" || document.getElementById("txt_bene_acc_no").value == null) {
            document.getElementById("errorMsg").innerHTML = "Please Enter Beneficiary Account Number";
            return false;
        }

        if (document.getElementById("txt_bene_conf_acc_no").value == "" || document.getElementById("txt_bene_conf_acc_no").value == null) {
            document.getElementById("errorMsg").innerHTML = "Please Confirm  Beneficiary Account Number";
            return false;
        }

        if (document.getElementById("txt_bene_bank_branch_name").value == "" || document.getElementById("txt_bene_bank_branch_name").value == null) {
            document.getElementById("errorMsg").innerHTML = "Please Enter Bank and Branch Name";
            return false;
        }

        if (document.getElementById("txt_ifsc_code").value == "" || document.getElementById("txt_ifsc_code").value == null) {
            document.getElementById("errorMsg").innerHTML = "Please Enter IFSC Code";
            return false;
        }

        if (document.getElementById("AccountNo").value == document.getElementById("txt_bene_acc_no").value) {
            document.getElementById("errorMsg").innerHTML = "Credit and Debit Account no are same";
            return false;
        }

        if (document.getElementById("txt_bene_acc_no").value != document.getElementById("txt_bene_conf_acc_no").value) {
            document.getElementById("errorMsg").innerHTML = "Beneficiary Account Number are not matching";
            return false;
        }

        var amt = document.getElementById("txt_amt").value;
        if (amt == null || amt == "") {
            dataValid = false;
            document.getElementById("errorMsg").innerHTML = "Amount cannot be null!";
        }
        else if (!amt.match(numbers)) {
            if (!amt.match(amtCheck)) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "Amount can accept 2 decimal or numeric values!";

            }
            else if (parseInt(amt) < 1) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "Enter valid amount!";
            }
            else {
                var splitstr = amt.split('.');
                debugger;
                if (splitstr[1] != null) {
                    var strlength = splitstr[1].length;
                    if (strlength != 2) {
                        dataValid = false;
                        document.getElementById("errorMsg").innerHTML = "2 decimal value required!";
                    }

                }
            }
        }
        else if (parseInt(amt) < 1) {
            dataValid = false;
            document.getElementById("errorMsg").innerHTML = "Enter valid amount!";
        }
        else {
            var splitstr = amt.split('.');
            debugger;
            if (splitstr[1] != null) {
                var strlength = splitstr[1].length;
                if (strlength != 2) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "2 decimal value required!";
                }

            }
        }

        if (document.getElementById("txt_amt_words").value != document.getElementById("txt_amt_words").value) {
            document.getElementById("errorMsg").innerHTML = "Amount in words cannot be null";
            return false;
        }


        // Cheque
        if (transtype == "RTGS03" || transtype == "RTGS04") {

            var sort_code = /^\d{9}$/;
            var san_code = /^\d{6}$/;
            var tr_code = /^\d{2}$/;
            //var numericInput = input.replace(/\D/g, ''); // Replace non-digits with an empty string

            if (document.getElementById("txt_chq_date").value == "" || document.getElementById("txt_chq_date").value == null) {
                document.getElementById("errorMsg").innerHTML = "Please Enter Cheque Date";
                return false;
            }

            if (document.getElementById("txt_chq_ifsc_code").value == "" || document.getElementById("txt_chq_ifsc_code").value == null) {
                document.getElementById("errorMsg").innerHTML = "Please Enter IFSC code in cheque";
                return false;
            }

            var payeeName = document.getElementById("chq_payee_name").value;

            if (document.getElementById("chq_payee_name").value == "" || document.getElementById("chq_payee_name").value == null) {
                document.getElementById("errorMsg").innerHTML = "Please Enter Payee name in Cheque";
                return false;
            }

            var amt = document.getElementById("txt_chq_amt").value;
            if (amt == null || amt == "") {
                document.getElementById("errorMsg").innerHTML = "Amount cannot be null in Cheque!";
                return false;
            }

            if (document.getElementById("txt_chq_amt_words").value == "" || document.getElementById("txt_chq_amt_words").value == null) {
                document.getElementById("errorMsg").innerHTML = "Amount in words cannot be null in Cheque";
                return false;
            }

            var chq_no = document.getElementById("txt_chq_no").value;
            if (document.getElementById("txt_chq_no").value == "" || document.getElementById("txt_chq_no").value == null) {
                document.getElementById("errorMsg").innerHTML = "Please Enter Cheque Number in Cheque";
                return false;
            }

            //var chq = document.getElementById("txt_chq_no").value;
            //if (!sort.match(chq)) {
            //    dataValid = false;
            //    document.getElementById("errorMsg").innerHTML = "Chque Number can accept 6 digit numeric values!";
            //}

            debugger;


            if (custName !== payeeName) {
                document.getElementById("errorMsg").innerHTML = "Beneficiary Name and Payee Name must be the same.";
                return false;
            }

            if (rtgs_ch_No !== chq_no) {
                document.getElementById("errorMsg").innerHTML = "Chque number must be the same in RTGS and Cheque.";
                return false;
            }

            var sortcode = document.getElementById("txt_sort_no").value;
            if (dataValid == true) {
                if (sortcode == null || sortcode == "") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Sort Code cannot be blank in cheque!";
                }
                else if (sortcode.length != 9) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Sort Code can only accept 9 digits!";
                }
                else if (sortcode == "000000000") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Enter valid Sort Code in cheque!";
                }
                else if (!sortcode.match(numbers)) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Only numbers are allowed in Sort Code!";
                }
            }

            var san = document.getElementById("txt_san_no").value;
            if (dataValid == true) {
                if (san != "" && san != null) {
                    if (san.length != 6) {
                        dataValid = false;
                        document.getElementById("errorMsg").innerHTML = "SAN can only accept 6 digits!";
                    }
                    else if (!san.match(numbers)) {
                        dataValid = false;
                        document.getElementById("errorMsg").innerHTML = "Only numbers are allowed in SAN!";
                    }
                }
            }

            if (san == null || san == "") {

                document.getElementById("txt_san_no").value = "000000";
            }

            var trCode = document.getElementById("txt_tr_code").value;
            if (dataValid == true) {
                if (trCode == null || trCode == "") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Trans Code cannot be null in cheque!";
                }
                else if (trCode.length < 2 || trCode.length > 3) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Trans Code can only accept 2 or 3 digits!";
                }
                else if (trCode == "00" || trCode == "000") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Enter valid Trans Code in cheque";
                }
                else if (!trCode.match(numbers)) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Only numbers are allowed in Trans Code!";
                }
            }
        }

        if (transtype == "RTGS03" || transtype == "RTGS04") {
            if (DateValidation(document.getElementById("txt_chq_date").value, true) == false) {
                //document.getElementById("ChequeDateTxt").focus();
                if (ErrorMessage != null && ErrorMessage != "")
                    document.getElementById("errorMsg").innerHTML = ErrorMessage;
                else
                    document.getElementById("errorMsg").innerHTML = "Date Field is Mandatory in RTGS and cheque!";
                return false;
            }
        }

        //if (FormType == "CHQ") {
        //    if (DateValidation(document.getElementById("txt_chq_date").value, true) == false) {
        //        //document.getElementById("ChequeDateTxt").focus();
        //        if (ErrorMessage != null && ErrorMessage != "")
        //            document.getElementById("errorMsg").innerHTML = ErrorMessage;
        //        else
        //            document.getElementById("errorMsg").innerHTML = "Date Field is Mandatory!";
        //        return false;
        //    }
        //}
        //else {
        //    if (DateValidation(document.getElementById("txt_chq_date").value, false) == false) {
        //        //document.getElementById("ChequeDateTxt").focus();
        //        if (ErrorMessage != null && ErrorMessage != "")
        //            document.getElementById("errorMsg").innerHTML = ErrorMessage;
        //        else
        //            document.getElementById("errorMsg").innerHTML = "Date Field is Mandatory!";
        //        return false;
        //    }
        //    else {
        //        var dateData = currentDate();
        //        if (dateData != document.getElementById("txt_chq_date").value) {
        //            dataValid = false;
        //            document.getElementById("errorMsg").innerHTML = "Current Date is required!";
        //            return false;
        //        }
        //    }
        //}

        if (dataValid == false) {
            // Error Msg

            $("#a_rollback").hide();
            $("#a_reject").hide();
            $("#a_accept").hide();
            $("#a_verify").show();

        }
        else {
            $("#a_rollback").show();
            $("#a_reject").show();
            $("#a_accept").show();
            $("#a_verify").show();
        }

        CompleteValidation = true;
        //$("#tbl_verf_pass").show();
        $("#tbl_verf_fail").hide();
        $("#div_accept_success").show();
        $("#div_submit_pass").show();
        $("#div_submit_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

    }

    function DataPush() {
        debugger;

        var check_rtgs_neft = document.getElementById("lbl_inst_type").innerHTML;
        var name = document.getElementById("txt_cust_name").value;
        var accno = document.getElementById("AccountNo").value;
        var chequeno = document.getElementById("chqnoDataEntry").value;
        var mobno = document.getElementById("txt_mobile_no").value;
        //var telno = document.getElementById("txt_tel_no").value;
        //var leicode = document.getElementById("txt_remitter_lei_code").value;
        //var leidate = document.getElementById("txt_lei_date").value;
        //var address = document.getElementById("txt_remitter_address").value;
        //var emailid = document.getElementById("txt_email_id").value;
        //var cashdepo = document.getElementById("txt_cash_deposited").value;
        var benname = document.getElementById("txt_bene_name").value;
        var benaddress = document.getElementById("txt_bene_address").value;
        var benaccno = document.getElementById("txt_bene_acc_no").value;
        var confirmaccno = document.getElementById("txt_bene_conf_acc_no").value;
        var benbranchname = document.getElementById("txt_bene_bank_branch_name").value;
        var benifsc = document.getElementById("txt_ifsc_code").value;
        var amountinwords = document.getElementById("txt_amt_words").value;
        amount = document.getElementById("txt_amt").value;
        var credit_acc_type = document.getElementById("lbl_acc_type").innerHTML;


        var sni_id = document.getElementById("Sid").value;
        var y = "UpdateBankFormData";

        debugger;
        if (transtype == "RTGS03" || transtype == "RTGS04") {

            debugger;
            var chq_sni_id = document.getElementById("chq_Sid").value;
            // var chq_sni_id = document.getElementById("chq_Sid").value;

            // Cheque Data
            var chq_date = document.getElementById("txt_chq_date").value;
            var ifsc_code = document.getElementById("txt_chq_ifsc_code").value;
            var payee_nm = document.getElementById("chq_payee_name").value;
            var amt_word = document.getElementById("txt_chq_amt_words").value;
            amt = document.getElementById("txt_chq_amt").value;
            var ac_no = document.getElementById("chq_account_no").value;
            var chq_no = document.getElementById("txt_chq_no").value;
            var sort_code = document.getElementById("txt_sort_no").value;
            var san_no = document.getElementById("txt_san_no").value
            var tr_code = document.getElementById("txt_tr_code").value;
            verfLevel = document.getElementById("Verf").value;


            debugger;
            $.ajax({
                type: "POST",
                url: x + y,
                data: {
                    ReferenceNo: RefNo, CountId: count_id, SniId: sni_id, FormType: 'RTGS', BankCode: BankCode, Verf_Level: verfLevel, UploadType: transtype,
                    Rtgs_Neft_Flag: check_rtgs_neft, Debit_CustomerName: name, Debit_AccountNo: accno, ChequeNo: chequeno, Debit_MobileNo: mobno,
                    Credit_CustomerName: benname, Credit_Address: benaddress, Credit_AccountNo: benaccno, Credit_ConfirmAccountNo: confirmaccno,
                    Credit_BankName: benbranchname, Credit_IFSC_Code: benifsc, Credit_Amount_InFigure: amount, Credit_Amount_InWords: amountinwords,
                    Credit_AccountType: credit_acc_type,
                    chq_CountId: chq_count_id, chq_SniId: chq_sni_id, chq_date: chq_date, chq_IFSC_code: ifsc_code,
                    chq_payee_name: payee_nm, chq_amt_in_words: amt_word, chq_amt_in_fig: amt, chq_debit_accno: ac_no, chq_cheque_no: chq_no,
                    chq_sort_code: sort_code, chq_san: san_no, chq_tr: tr_code
                },
                success: SuccessResponse,
                error: ErrorApiMessage
            });
        }
        else {
            debugger;
            $.ajax({
                type: "POST",
                url: x + y,
                data: {
                    ReferenceNo: RefNo, CountId: count_id, SniId: sni_id, FormType: 'RTGS', BankCode: BankCode, Verf_Level: verfLevel, UploadType: transtype,
                    Rtgs_Neft_Flag: check_rtgs_neft, Debit_CustomerName: name, Debit_AccountNo: accno, ChequeNo: chequeno, Debit_MobileNo: mobno,
                    Credit_CustomerName: benname, Credit_Address: benaddress, Credit_AccountNo: benaccno, Credit_ConfirmAccountNo: confirmaccno,
                    Credit_BankName: benbranchname, Credit_IFSC_Code: benifsc, Credit_Amount_InFigure: amount, Credit_Amount_InWords: amountinwords,
                    Credit_AccountType: credit_acc_type
                },
                success: SuccessResponse,
                error: ErrorApiMessage
            });
        }

    }

    function SuccessResponse(data) {

        debugger;
        //$("#tbl_verf_pass").show();
        $("#tbl_verf_fail").hide();
        $("#div_accept_success").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_response_success").show();

        document.getElementById("successMsg").innerHTML = data;

    }

    function ErrorApiMessage(data) {

        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_accept_success").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        document.getElementById("errorMsg").innerHTML = data.responseText;

    }

    function VerifyData() {
        //debugger;
        //document.getElementById("name").innerHTML = document.getElementById("payeeName").value;

        // Error Msg
        $("#tbl_verf_fail").hide();
        $("#div_submit_fail").show();

        // Response
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        // Data Table
        $("#tbl_verf_pass").show();
    }

    function DataPost(descision) {
        debugger;

        var y = "postCheckerData";

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

            //debugger;
            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                data: {
                    RejectCode: code, RejectDesc: desc, pType: 'RTGS_03_04', decision: 'R', VerificationLevel: verfLevel, transRefNo: RefNo, cid: count_id
                },
                success: RejectSuccess
                //success: window.open(rooturl + "Checker/Index", "_self")
            });
        }
        else if (descision == "A") {
            $("#div_accept_confirmation").hide();
            $("#tbl_accept_success").show();
            $("#div_accept_failed").hide();
            $("#div_accept_button").hide();
            $("#btn_accept_success").hide();

            document.getElementById("successMsg_accept").innerHTML = "Processing Request...";

            var verf_l3_req = "";
            var CheckerModule_L3 = document.getElementById("CheckerModule_L3").value;
            var L3StartLimit = document.getElementById("L3StartLimit").value;
            var debit_amt = document.getElementById("txt_chq_amt").value;
            loginId = document.getElementById("loginid").value;
            RefNo = document.getElementById("RefNo").value;

            debugger;
            if (verfLevel == "L2") {
                if (parseFloat(debit_amt) >= parseFloat(L3StartLimit))
                    verf_l3_req = "N";
                //else
                //    verf_l3_req = "N";
            }


            //if (verfLevel == "L2" && CheckerModule_L3 == "Y") {
            //    if (parseFloat(debit_amt) >= parseFloat(L3StartLimit))
            //        verf_l3_req = "Y";
            //    else
            //        verf_l3_req = "N";
            //}
            //else if (verfLevel == "L3")
            //    verf_l3_req = "N";
            //else
            //    verf_l3_req = "N";

            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                data: {
                    pType: 'RTGS_03_04', decision: 'A', VerificationLevel: verfLevel, transRefNo: RefNo, L3VerfyReq: verf_l3_req, BankCode: BankCode,
                    INtellerid: loginId
                },
                success: AcceptSuccess
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

                //debugger;
                $.ajax({
                    url: x + y,
                    headers: authHeaders,
                    type: 'POST',
                    data: {
                        RejectDesc: desc, pType: 'RTGS_03_04', decision: 'ROLLBACK', VerificationLevel: verfLevel, transRefNo: RefNo, cid: count_id
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

    function RejectSuccess(result) {
        //debugger;
        $("#btn_reject_success").show();

        document.getElementById("successMsg_reject").innerHTML = result;
    }

    function Accept() {
        //debugger;
        $("#div_accept_confirmation").show();
        $("#tbl_accept_success").hide();
        $("#div_accept_failed").hide();
        $("#div_accept_button").show();
        $("#btn_accept_success").hide();


    }

    function AcceptSuccess(result) {
        $("#btn_accept_success").show();

        document.getElementById("successMsg_accept").innerHTML = result;

    }

    function CheckerList() {
        window.open(rooturl + "Checker/Index", "_self");
    }

    function Reject() {
        //debugger;
        $("#tbl_reject_list").show();
        $("#div_reject_success").hide();
        $("#div_reject_failed").hide();
        $("#div_reject_button").show();
        $("#btn_reject_success").hide();
        $("#tbl_reject_success").hide();

        $("#div_reject_code").hide();
        $("#div_reject_desc").hide();
        $("#div_desc_alert").hide();
    }

    function Rollback() {
        //debugger;
        $("#div_rollback_success").show();
        $("#tbl_rollback_success").hide();
        $("#tbl_rollback_desc").show();
        //$("#div_rollback_failed").hide();
        $("#div_rollback_button").show();
        $("#btn_rollback_success").hide();
    }

    function RollbackSuccess(result) {
        //debugger;
        $("#btn_rollback_success").show();

        document.getElementById("rollbackMsg").innerHTML = result;
    }
    function FormChange(data) {
        debugger;
        //var data = document.getElementById("radio_rtgs").value;
        //alert("New alert");
        //alert("Data: " + data);
        //$("#chq_block").hide();
        debugger;
        if (data == 'rtgs') {
            //alert("RTGS SHOW");
            $("#rtgs_block").show();
            $("#chq_block").hide();
            $("#btn_verf_sign").hide();
        }
        else {
            //alert("CHEQUE SHOW");
            $("#rtgs_block").hide();
            $("#chq_block").show();
            $("#btn_verf_sign").show();
        }
    }

}
catch (e) {
    alert(e.message);
}