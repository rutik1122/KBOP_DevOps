try {

    var tempSrc = "";
    var PerviousType = "";

    function getVoucherData() {
        //alert("getCvoucher data");
        debugger;
        document.getElementById("ProcessingBar").innerHTML = "Processing Request...";

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);

        var data = {
            asdrf: "1234",
            pType: transtype,
            //pType: 'TRF',
            BankCode: BankCode,
            Intellerid: username,
            trf_type: Scanning_Type
        };

        //debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        //debugger;


        $("#ProcessingBar").show();

        var y = "getvoucherdetails";
        //debugger;

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            //data: { pType: 'TRF', Intellerid: username, trf_type: Scanning_Type, BankCode: BankCode },
            data: { Request_Data: encrypted_data },
            success: getSuccessVoucher,
            error: getError
        });

    }

    function getError(result) {
        debugger;
        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            //alert(result.responseText);
            document.getElementById("ProcessingBar").innerHTML = result.responseText;
        }

    }

    function getSuccessVoucher(response_data) {
        debugger;

        var y = "ReportCodeList";

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            success: ReportCodeList,
            error: ErrorReportCode
        });

        var currentDate = new Date();
        /*RefNo = Ref_No_Generator(transtype);*/
        //RefNo = "TRF" + currentDate.getFullYear() + String(currentDate.getUTCMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0') + String(currentDate.getSeconds()).padStart(2, '0');

        debugger;

        $("#tbl_verf_pass").hide();
        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();

        // success resp
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        // page content
        $("#div_main_page").hide();
        $("#div_micr").hide();
        $("#div_record_tbl").show();

        rowId = 1;

        while (tableChequeData.rows.length > 1) {
            tableChequeData.deleteRow(1);
        }

        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(response_data, kVal);

        debugger;
        RefNo = Ref_No_Generator(transtype, result[0].Count_Id);

        getListData(result);

        $("#ProcessingBar").hide();
    }

    function getListData(printer) {
        //debugger;
        $("#tblChequeData").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            AddRecordRow(print);
        });

        tableRowCount = tableChequeData.rows.length + 1;

        for (i = 1; i < tableChequeData.rows.length; i++) {
            $("#tr_id_" + i).css('color', 'red');
        }
    }

    function AddRecordRow(print) {
        //debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tblChequeData tbody").length == 0) {
            $("#tblChequeData").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tblChequeData tbody").append(
            RecordTableRow(print));
    }

    function RecordTableRow(print) {
        debugger;

        BrCode = print.SolID;

        if (print.instrumenttype == "C" && (default_payeename == "" || default_payeename == null))
            default_payeename = print.payeename;

        var RetRow = '<tr id="tr_id_' + rowId + '">';

        RetRow = RetRow +
            '<td style="text-align:center;font-size: 14px;">' + print.Debit_Acc_No + '</td>' +
            '<td style="text-align:center;font-size: 14px;">' + print.accno + '</td>' +
            '<td style="text-align:center;font-size: 14px;"></td>' +
            '<td style="text-align:center;font-size: 14px;">' + print.amount + '</td>';

        if (print.chqdate != null && print.chqdate != "") {
            instDate = DateFormatter(print.chqdate);
            RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">' + instDate + '</td>';
        }
        else
            RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">' + print.chqdate + '</td>';

        RetRow = RetRow +
            '<td style="text-align:center;font-size: 14px;">' + print.cheqno + '</td>' +
            '<td style="text-align:center;font-size: 14px;" hidden></td>' +
            '<td style="text-align:center;font-size: 14px;" hidden>' + print.san + '</td>' +
            '<td style="text-align:center;font-size: 14px;" hidden>' + print.trcode + '</td>';


        RetRow = RetRow +
            '<td style="text-align:center;font-size: 14px;">' + print.instrumenttype + '</td>' +
            '<td style="text-align:center;font-size: 14px;" hidden>';

        RetRow = RetRow +
            '</td>' +
            '<td style="text-align:center;font-size: 14px;">' +
            '<button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="tooltip"data - bs - placement="top" title = "Delete" >' +
            '<span class="text-90 far fa-trash-alt fa-sm"></span>' +
            '</button>' +
            '</td>' +
            '<td hidden>' + print.frontgreyimagepath + '</td>' +
            '<td hidden><label id="valid_' + rowId + '">FALSE</label></td>';

        //debugger;
        //if (print.instrumenttype == "C") {

        //}
        //else {
        //    RetRow = RetRow +
        //        '<td hidden><label id="IQA_' + rowId + '">PASS</label></td>' +
        //        '<td hidden><label id="UV_' + rowId + '">PASS</label></td>' +
        //        '<td hidden><label id="IR_' + rowId + '">PASS</label></td>' +
        //        '<td hidden><label id="Micro_' + rowId + '">PASS</label></td>';
        //}

        //debugger;
        RetRow = RetRow +
            '<td hidden><label id="IQA_' + rowId + '">PASS</label></td>';

        if (print.uvFlag == "000107") {
            RetRow = RetRow +
                '<td hidden><label id="UV_' + rowId + '">PASS</label></td>';
        }
        else {
            RetRow = RetRow +
                '<td hidden><label id="UV_' + rowId + '">FAIL</label></td>';
        }

        RetRow = RetRow +
            '<td hidden><label id="IR_' + rowId + '">PASS</label></td>' +
            '<td hidden><label id="Micro_' + rowId + '">PASS</label></td>';

        //RetRow = RetRow +
        //    '<td hidden><label id="IQA_' + rowId + '">PASS</label></td>' +
        //    '<td hidden><label id="UV_' + rowId + '">PASS</label></td>' +
        //    '<td hidden><label id="IR_' + rowId + '">PASS</label></td>' +
        //    '<td hidden><label id="Micro_' + rowId + '">PASS</label></td>';

        //debugger;
        RetRow = RetRow +
            '<td hidden><label id="SchemeCode_' + rowId + '"></label></td>' +
            '<td hidden><label id="FreezeCode_' + rowId + '"></label></td>' +
            '<td hidden><label id="MOP_' + rowId + '"></label></td>' +
            '<td hidden><label id="NREFlag_' + rowId + '"></label></td>' +
            '<td hidden><label id="SchemeType_' + rowId + '"></label></td>' +
            '<td hidden><label id="AccOwner_' + rowId + '"></label></td>' +
            '<td hidden>' + print.micr + '</td>' +
            '<td hidden>' + print.ocr + '</td>' +
            '<td hidden>' + print.AccNoConf + '</td>' +
            '<td hidden>' + print.DateScore + '</td>' +
            '<td hidden>' + print.AmountScore + '</td>' +
            '<td hidden>' + rowId + '</td>' +   
            '<td hidden>' + print.payeename + '</td>' +
            '<td hidden>' + print.Count_Id + '</td>' +
            '<td hidden>' + print.id + '</td>' +
            '<td hidden>FALSE</td>';

        if (BankCode == "240") {
            RetRow = RetRow +
                '<td hidden>' + print.Debit_Acc_No_Score + '</td>' +
                '<td hidden>' + print.AmountScore + '</td>' +
                '<td hidden>' + print.Cheque_No_Score + '</td>' +
                '<td hidden>' + print.Payee_Name_Score + '</td>' +
                '<td hidden>' + print.DateScore + '</td>' +
                '<td hidden>' + print.CARLAR + '</td>' +
                '<td hidden>' + print.amount_in_words + '</td>' +
                '<td hidden>' + print.AccNoConf + '</td>';

        }

        RetRow = RetRow + '</tr>';

        rowId += 1;

        return RetRow;

    }

    function setTableData() {

        debugger;

        var dataname = "Cheque";

        var dataValid = true;
        $("#tbl_verf_pass").hide();
        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();

        // success resp
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        var numbers = /^[0-9]+$/;
        //debugger;
        var objCells = tableChequeData.rows.item(GlobalRowNo).cells;
        var inst_type = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML;

        /*var accStatus = document.getElementById("accStatus").innerHTML;*/
        var payeename = document.getElementById("CreditAccHolderName").value;

        var debit_accno = document.getElementById("DebitAccountNo").value;
        var credit_accno = document.getElementById("CreditAccountNo").value;
        //var trans = document.getElementById("input_payeename").value;

        var AccNoMinLength = document.getElementById("AccNoMinLength").value;
        var AccNoMaxLength = document.getElementById("AccNoMaxLength").value;

        document.getElementById("id_chq").disabled = false;

        // Debit Account No validation
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = debit_accno;
        if (debit_accno == "" || debit_accno == null || debit_accno.toUpperCase() == "NULL") {
            dataValid = false;
            document.getElementById("errorMsg").innerHTML = "Debit Account No is null!";
        }
        else if (!debit_accno.match(numbers)) {
            dataValid = false;
            document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed in Account No";
        }
        else {
            var accStatus = document.getElementById("accStatus_debit").innerHTML;
            if (BankCode == "240") {
                if (DebitAccountValidation != true) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Debit Acc Status: " + accStatus;
                }
            }
            else {
                if (accStatus == "D - Dormant") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Dormant Account debit not permitted!";
                }
                else if (accStatus != "A - Active") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Debit Acc Status: " + accStatus;
                }
                else if (DebitAccountValidation == false) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = AccountVal_ErrorMsg;
                }
            }
        }

        // Credit Account No validation
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = credit_accno;
        if (credit_accno == "" || credit_accno == null || credit_accno.toUpperCase() == "NULL") {
            dataValid = false;
            document.getElementById("errorMsg").innerHTML = "Credit Account No is null!";
        }
        else if (!credit_accno.match(numbers)) {
            dataValid = false;
            document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed in Account No";
        }
        else {
            var accStatus = document.getElementById("accStatus_credit").innerHTML;
            if (BankCode == "240") {
                //if (CreditAccountValidation != true) {
                if (accStatus != "A - Active") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Credit Acc Status: " + accStatus;
                }
            }
            else {
                if (accStatus == "D - Dormant") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Dormant Account Credit not permitted!";
                }
                else if (accStatus != "A - Active") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Credit Acc Status: " + accStatus;
                }
                else if (CreditAccountValidation == false) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = AccountVal_ErrorMsg;
                }
            }
        }

        //trans particular

        var input_payeename = document.getElementById("input_payeename").value;

        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML = input_payeename;

        if (input_payeename == null || input_payeename == "") {
            dataValid = false;
            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
            document.getElementById("errorMsg").innerHTML = "Transaction particulars is mandatory!";
        }

        // Payee Name validation
        var input_payeename = document.getElementById("input_payeename").value;
        if (BankCode == "240") {
            if (payeename == null || payeename == "") {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "Credit Acc Holder Details are missing!";
            }
            //else if (input_payeename == null || input_payeename == "") {
            //    dataValid = false;
            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = "";
            //    document.getElementById("errorMsg").innerHTML = "Manual Payee name is blank!";
            //}
            //else if (payeename.toUpperCase() != input_payeename.toUpperCase()) {
            //    dataValid = false;
            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = "";
            //    document.getElementById("errorMsg").innerHTML = "Payee Name is not matching!";
            //}
            else {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = payeename;
                //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML = payeename;
            }
        }
        else {
            if (payeename == null || payeename == "") {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "Credit Acc Holder Details are missing!";
            }
            //else if (input_payeename == null || input_payeename == "") {
            //    dataValid = false;
            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = "";
            //    document.getElementById("errorMsg").innerHTML = "Manual Payee name is blank!";
            //}
            //else if (payeename.toUpperCase() != input_payeename.toUpperCase()) {
            //    dataValid = false;
            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = "";
            //    document.getElementById("errorMsg").innerHTML = "Payee Name is not matching!";
            //}
            else {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = payeename;
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML = payeename;
            }
        }
        

        // Scheme Code validation
        var schemeCode_debit = document.getElementById("FinScheme_debit").innerHTML;
        if (BankCode == "240" && dataValid == true) {

        }
        else if (BankCode == "059" && dataValid == true) {
            if (schemeCode_debit == "SBA" || schemeCode_debit == "CAA" || schemeCode_debit == "ODA" || schemeCode_debit == "CCA") {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "Debit blocked - Scheme Code:" + schemeCode_debit;
            }
        }

        //////// Need to remove this - Begin
        //if (Scanning_Type == "3" || Scanning_Type == "4" || Scanning_Type == "5") {
        //    // CTS without SLIP

        //    $("#div_accno").show();
        //    $("#Payeeee").show();
        //    $("#tr_acc_status").show();
        //    $("#tr_scheme_freeze").show();
        //    $("#tr_mop_nre").show();
        //    $("#tr_scheme_accowner").show();

        //    if (inst_type == "C") {
        //        document.getElementById("id_chq").disabled = false;
        //    }
        //    else if (inst_type == "S" || inst_type == "CI" || inst_type == "DI" || inst_type == "WF") {
        //        document.getElementById("id_chq").disabled = true;
        //    }

        //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = accno;
        //    if (accno == "" || accno == null || accno.toUpperCase() == "NULL") {
        //        dataValid = false;
        //        document.getElementById("errorMsg").innerHTML = "Account No is null!";
        //    }
        //    else if (!accno.match(numbers)) {
        //        dataValid = false;
        //        document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed in Account No";
        //    }
        //    //else if (accStatus == "C - Closed" || accStatus == "D - Dormant" || accStatus == "I - Inactive" || accStatus == "S - Stop payment") {
        //    //    dataValid = false;
        //    //    var accMsg = accStatus.substring(4, accStatus.length);
        //    //    document.getElementById("errorMsg").innerHTML = "Account No - " + accMsg + "!";
        //    //}
        //    //else 
        //    else {
        //        if (BankCode == "240") {
        //            if (AccountValidation != true) {
        //                dataValid = false;
        //                document.getElementById("errorMsg").innerHTML = "Acc Status: " + accStatus;
        //            }
        //            //if (accStatus != "A - Active") {
        //            //    dataValid = false;
        //            //    document.getElementById("errorMsg").innerHTML = accStatus;
        //            //}
        //        }
        //        else {
        //            if (inst_type == "C" || inst_type == "DI" || inst_type == "WF") {
        //                // Debit - Cheque
        //                if (accStatus == "D - Dormant") {
        //                    dataValid = false;
        //                    document.getElementById("errorMsg").innerHTML = "Dormant Account debit not permitted!";
        //                }
        //                else if (accStatus != "A - Active") {
        //                    dataValid = false;
        //                    document.getElementById("errorMsg").innerHTML = "Acc Status: " + accStatus;
        //                }
        //                else if (AccountValidation == false) {
        //                    dataValid = false;
        //                    document.getElementById("errorMsg").innerHTML = AccountVal_ErrorMsg;
        //                }
        //            }
        //            else {
        //                // Credit - Slip
        //                if (accStatus != "A - Active") {
        //                    dataValid = false;
        //                    document.getElementById("errorMsg").innerHTML = "Acc Status: " + accStatus;
        //                }
        //                else if (AccountValidation == false) {
        //                    dataValid = false;
        //                    document.getElementById("errorMsg").innerHTML = AccountVal_ErrorMsg;
        //                }
        //            }
        //        }
        //    }



        //    if (dataValid == true) {
        //        if (BankCode == "240") {
        //            if (inst_type == "S") {
        //                var input_payeename = document.getElementById("input_payeename").value;
        //                if (payeename == null || payeename == "") {
        //                    dataValid = false;
        //                    document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
        //                }
        //                else if (input_payeename == null || input_payeename == "") {
        //                    dataValid = false;
        //                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
        //                    document.getElementById("errorMsg").innerHTML = "Manual Payee name is blank!";
        //                }
        //                else if (payeename.toUpperCase() != input_payeename.toUpperCase()) {
        //                    dataValid = false;
        //                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
        //                    document.getElementById("errorMsg").innerHTML = "Trans. Particular and Drop Down Payee Name is not matching!";
        //                }
        //                else {
        //                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
        //                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML = payeename;
        //                }
        //            }
        //            else {
        //                if (payeename != null && payeename != "") {
        //                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
        //                }
        //                else {
        //                    dataValid = false;
        //                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
        //                    document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
        //                }
        //            }
        //        }
        //        else {
        //            if (dataValid == true && payeename != null && payeename != "") {
        //                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
        //            }
        //            else {
        //                dataValid = false;
        //                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
        //                document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
        //            }

        //            var schemeCode = document.getElementById("FinScheme").innerHTML;
        //            if ((inst_type == "C" || inst_type == "DI" || inst_type == "WF") && (schemeCode == "SBA" || schemeCode == "CAA" || schemeCode == "ODA" || schemeCode == "CCA")) {
        //                dataValid = false;
        //                document.getElementById("errorMsg").innerHTML = "Debit blocked - Scheme Code:" + schemeCode;
        //            }
        //        }
        //    }
        //}
        //////// Need to remove this - End

        // Cheque Date Validation
        if (dataValid == true) {
            if (DateValidation(document.getElementById("date").value, true) == false) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = ErrorMessage;
            }
        }

        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = document.getElementById("date").value;

        // Cheque Amount validation
        var regexDecimalCount = /(?:\d*\.\d{1,2}|\d+)$/;
        var amtCheck = /^[-+]?[0-9]+\.[0-9]+$/;

        var chqAmt = document.getElementById("chq_amt").value;

        if (dataValid == true) {
            if (chqAmt == null || chqAmt == "") {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = dataname + " amount cannot be null!";
            }
            else if (!chqAmt.match(numbers)) {
                if (!chqAmt.match(amtCheck)) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = dataname + " amount can accept 2 decimal or numeric values!";

                }
                else if (parseInt(chqAmt) < 1) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Enter valid " + dataname + " amount!";
                }
                else {
                    var splitstr = chqAmt.split('.');
                    //debugger;
                    if (splitstr[1] != null) {
                        var strlength = splitstr[1].length;
                        if (strlength != 2) {
                            dataValid = false;
                            document.getElementById("errorMsg").innerHTML = "2 decimal value required!";
                        }

                    }
                }
            }
            else if (parseInt(chqAmt) < 1) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "Enter valid " + dataname + " amount!";
            }
            else {
                var splitstr = chqAmt.split('.');
                //debugger;
                if (splitstr[1] != null) {
                    var strlength = splitstr[1].length;
                    if (strlength != 2) {
                        dataValid = false;
                        document.getElementById("errorMsg").innerHTML = "2 decimal value required!";
                    }

                }
            }
        }

        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[3].innerHTML = chqAmt;

        chqAmtChange('CHQ');

        var chqno = document.getElementById("id_chq").value;
        if (dataValid == true) {
            if (inst_type == "C" && ChequeValidation(chqno) == false) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = ErrorMessage;
            }
            //if (chqno == null || chqno == "") {
            //    dataValid = false;
            //    document.getElementById("errorMsg").innerHTML = "Inst. Srl No cannot be null!";
            //}
            //else if (chqno.length != 6) {
            //    dataValid = false;
            //    document.getElementById("errorMsg").innerHTML = "Inst. Srl No can only accept 6 digits!";
            //}
            //else if (!chqno.match(numbers)) {
            //    dataValid = false;
            //    document.getElementById("errorMsg").innerHTML = "Only numbers are allowed in Inst. Srl No!";
            //}
            else if (chq_validation == false) {
                var chequeVal = document.getElementById("Pancard_Verf").value;
                if (chequeVal == "Y") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Cheque Valadation failed: " + chq_validation_msg;
                }
                else
                    chq_validation = true;
            }
        }

        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = chqno;

        // IQA
        if (dataValid == true) {
            var iqa = document.getElementById("btn_iqa").checked;
            if (iqa == false) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "IQA Failed!";
            }
        }

        // UV
        if (dataValid == true) {
            var uv = document.getElementById("btn_uv").checked;
            if (inst_type == "C") {
                if (uv == false) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "UV Failed!";
                }
            }

        }

        // IR
        if (dataValid == true) {
            var ir = document.getElementById("btn_ir").checked;
            if (ir == false) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "IR Failed!";
            }
        }

        // Micro Lettering
        if (dataValid == true) {
            var ml = document.getElementById("btn_ml").checked;
            if (ml == false) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "Micro Lettering Failed!";
            }
        }

        // Signature Verification
        //debugger;
        var VerfSign = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML;
        if (dataValid == true && VerfSign.toUpperCase() == "FALSE" && inst_type == "C") {
            dataValid = false;
            document.getElementById("errorMsg").innerHTML = "Signature Verfication Pending!";
        }

        debugger;
        // Row Data Validation
        if (dataValid == false) {
            //verfPending = true;
            $("#tr_id_" + row_unique_id).css('color', 'red');
            document.getElementById("valid_" + row_unique_id).innerHTML = "FALSE";
        }
        else {
            //verfPending = false;
            //$("#tr_id_" + GlobalRowNo).css('color', '#03C988');
            $("#tr_id_" + row_unique_id).css('color', '#00A300');
            document.getElementById("errorMsg").innerHTML = "";
            document.getElementById("valid_" + row_unique_id).innerHTML = "TRUE";
        }

    }

    function changeInstType() {
        var inst_val = document.getElementById("id_inst_type").checked;
        if (inst_val == false) {

            document.getElementById("input_payeename").value = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML
            //$("#div_micr").show();
            if (Scanning_Type == "3") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "C";
                document.getElementById("lbl_inst_type").innerHTML = "Cheque";
            }
            else if (Scanning_Type == "4") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "WF";
                document.getElementById("lbl_inst_type").innerHTML = "Withdrawal Form";
            }
            else if (Scanning_Type == "5") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "DI";
                document.getElementById("lbl_inst_type").innerHTML = "Debit Intimation";
            }
            else {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "Not Defined";
                document.getElementById("lbl_inst_type").innerHTML = "Not Defined";
            }

            $("#tr_slip_amt").hide();
            $("#tr_date").show();
            $("#tr_chq_amt").show();
            document.getElementById("chq_amt").value = document.getElementById("slip_amt").value;
            var totalSlipAmt = document.getElementById("total_slip_amt").value;
            document.getElementById("total_slip_amt").value = totalSlipAmt - document.getElementById("slip_amt").value;
            document.getElementById("slip_amt").value = "0";

            if (transtype == "TRF03") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "FALSE";
            }
            else if (transtype == "CI02") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "FALSE";
            }

            if (Scanning_Type == "3") {
                $("#th_UV").show();
                $("#td_UV").show();
            }

            if (BankCode == "240") {
                $("#tr_input_payeename").hide();
            }
            else {
                $("#tr_input_payeename").hide();
            }

            preCheckPancard();
        }
        else {
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "S";
            //$("#div_micr").hide();
            document.getElementById("lbl_inst_type").innerHTML = "Slip";
            $("#tr_slip_amt").show();
            $("#tr_date").hide();
            $("#tr_chq_amt").hide();
            document.getElementById("slip_amt").value = document.getElementById("chq_amt").value;
            var totalchqAmt = document.getElementById("total_chq_amt").value;
            document.getElementById("total_chq_amt").value = totalchqAmt - document.getElementById("chq_amt").value;
            document.getElementById("chq_amt").value = "0";

            $("#th_UV").hide();
            $("#td_UV").hide();

            if (BankCode == "240") {
                $("#tr_input_payeename").show();
            }
            else {
                $("#tr_input_payeename").hide();
            }
        }
        setTableData();
    }

    function VerifyData() {
        //debugger;

        $("#tbl_verf_pass").hide();
        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();

        // success resp
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        var verifyDone = true;
        var slipCount = 0;
        var chqCount = 0;
        debugger;
        var payeename = "";
        for (i = 1; i < tableChequeData.rows.length; i++) {
            debugger;
            var objCells = tableChequeData.rows.item(i).cells;
            var row_id = objCells[29].innerHTML;

            var instVal = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML;
            chqCount += 1;
            //if (instVal == "S")
            //    slipCount += 1;
            //else if (instVal == "C" || instVal == "WF" || instVal == "DI")
            //    chqCount += 1;

            var status = document.getElementById("valid_" + row_id).innerHTML;
            if (status == "FALSE")
                verifyDone = false;

            payeename = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[2].innerHTML;

            //if (Scanning_Type == "3" || Scanning_Type == "4" || Scanning_Type == "5") {
            //    if (instVal == "C")
            //        payeename = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[1].innerHTML;
            //}
        }


        debugger;
        var scanCount = true;
        if (verifyDone == true) {
            if (chqCount == 0) {
                document.getElementById("errorMsg").innerHTML = "Atleast one CHEQUE is mandatory!";
                scanCount = false;
                verifyDone = false;
            }
            else if (chqCount > 1) {
                document.getElementById("errorMsg").innerHTML = "Only one Cheque is required!";
                scanCount = false;
                verifyDone = false;
            }
        }

        var amtValid = true;

        var accvalid = true;
        if (verifyDone == true/* && scanCount == true && amtValid == true*/) {
            //debugger;
            for (i = 1; i < tableChequeData.rows.length; i++) {

                var objCells1 = tableChequeData.rows.item(i).cells;
                var acc1 = objCells1[0].innerHTML;
                var acc2 = objCells1[1].innerHTML;

                if (acc1 == acc2) {
                    document.getElementById("errorMsg").innerHTML = "Credit & Debit Acc No. is same!";
                    accvalid = false;
                    verifyDone = false;
                }

            }
        }

        var otherVerf = true;
        if (verifyDone == true/* && scanCount == true && amtValid == true && accvalid == true*/) {
            alpha_out = document.getElementById("id_alpha").value;

            rpt_code_out = document.getElementById("rpt_code").value;
            if (rpt_code == "0" && NRE_Flag == "Y") {
                document.getElementById("errorMsg").innerHTML = "Report Code is mandatory!";
                otherVerf = false;
                verifyDone = false;
            }

        }

        //var UV_Flag = true;
        //if (verifyDone == true /*&& scanCount == true && amtValid == true && accvalid == true && otherVerf == true*/) {
        //    for (i = 1; i < tableChequeData.rows.length; i++) {

        //    }
        //}

        debugger;
        // Submit request
        if (verifyDone == true /*&& scanCount == true && amtValid == true && accvalid == true && otherVerf == true && UV_Flag == true*/) {
            $("#tbl_verf_fail").hide();
            $("#div_submit_fail").hide();
            $("#tbl_verf_pass").hide();
            $("#div_submit_pass").show();
            $("#tbl_verf_result").show();
            $("#div_response_success").hide();

            document.getElementById("successMsg").innerHTML = "Do you want to Submit the Record ?";

        }
        else {
            var msg = document.getElementById("errorMsg").innerHTML;
            if (msg == "" || msg == null) {
                var slipCount = 0;
                var chqCount = 0;
                for (i = 1; i < tableChequeData.rows.length; i++) {
                    var objCells = tableChequeData.rows.item(i).cells;
                    var row_id = objCells[29].innerHTML;

                    var status = document.getElementById("valid_" + row_id).innerHTML;

                    if (objCells[9].innerHTML == "S" && status == "FALSE")
                        slipCount += 1;
                    else if ((objCells[9].innerHTML == "C" || objCells[9].innerHTML == "WF" || objCells[9].innerHTML == "DI") && status == "FALSE")
                        chqCount += 1;
                }

                msg = "Verification Pending for ";

                if (slipCount > 0)
                    msg = msg + slipCount + " Slip ";
                else if (chqCount > 0) {
                    if (transtype == "TRF03")
                        msg = msg + chqCount + " Cheque";
                    else if (transtype == "TRF04")
                        msg = msg + chqCount + " Withdrawal Form";
                    else if (transtype == "TRF05")
                        msg = msg + chqCount + " Debit Intimation Form";
                }

                document.getElementById("errorMsg").innerHTML = msg;
            }

        }

    }

    function DataPush() {
        //debugger;
        $("#tbl_verf_fail").hide();
        $("#div_submit_fail").hide();
        $("#tbl_verf_pass").hide();
        $("#div_submit_pass").hide();
        $("#tbl_verf_result").show();
        $("#div_response_success").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";

        //var currentDate = new Date();
        //RefNo = "TRF" + currentDate.getFullYear() + String(currentDate.getUTCMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0') + String(currentDate.getSeconds()).padStart(2, '0');

        //debugger;
        var Branchcode = document.getElementById("branchcodehidden").value;
        var amt = document.getElementById("chq_amt").value;
        var l2start = parseFloat(document.getElementById("L2StartLimit").value);
        var CheckerModule = document.getElementById("CheckerModule").value;
        var data_amt = parseFloat(amt);
        var response = "";
        //var verfReq = "";

        //debugger;
        if (CheckerModule == "Y") {
            if (data_amt >= parseFloat(l2start))
                response = "2";
            else
                response = "22";
        }
        else {
            response = "22";
        }

        //if (CheckerModule != "Y")
        //    response = "2";
        //else if (data_amt >= parseFloat(l2start))
        //    response = "2";
        //else
        //    response = "22";

        //debugger;
        var ChequeData = {};

        remark_1_out = document.getElementById("remark_1").value;
        remark_2_out = document.getElementById("remark_2").value;

        ChequeData.pType = "TRF02";
        ChequeData.response = response;
        ChequeData.INtellerid = username;
        ChequeData.transtype = transtype;
        ChequeData.transRefNo = RefNo;
        //ChequeData.ClearingType = document.getElementById("ClearingType").value;
        ChequeData.ScanningType = Scanning_Type
        ChequeData.BranchCode = BrCode;         // User Branch Code
        ChequeData.BOFD = "BOFD"
        ChequeData.IFSC = "IFSC"
        ChequeData.machineserialno = machineserialno;
        ChequeData.retrycount = "N";
        ChequeData.transaction_particular = trans_part_out;
        ChequeData.report_code = rpt_code_out;
        ChequeData.instrument_alpha = alpha_out;
        ChequeData.remark_1 = remark_1_out;
        ChequeData.remark_2 = remark_2_out;
        ChequeData.rollback = "FALSE";
        ChequeData.BankCode = BankCode;
        ChequeData.BranchCode = Branchcode;


        var SorterData = [];

        var backImg = 'TOP_RGB';

        var doctype = "";

        //if (Scanning_Type == "1" || Scanning_Type == "2")
        //    doctype = "B";
        //else if (Scanning_Type == "3")
        //    doctype = "C";

        var count = 1;

        for (i = 1; i < tableChequeData.rows.length; i++) {
            var objCells = tableChequeData.rows.item(i).cells;
            //debugger;

            SorterData.push({

                AccountNo: objCells[0].innerHTML,
                AccountNoConf: objCells[26].innerHTML,                         // Account No score
                CreditAccountNo: objCells[1].innerHTML,
                payeename: objCells[2].innerHTML,
                ChequeDate: objCells[4].innerHTML,
                ChequeDateConf: objCells[27].innerHTML,
                ChequeAmount: objCells[3].innerHTML,
                ChequeAmountConf: objCells[28].innerHTML,
                //MICR: objCells[24].innerHTML.trim(),
                //OCR: objCells[25].innerHTML.trim(),
                InstrumentType: objCells[9].innerHTML,
                SlipNo: count,                                // Slip no
                ChequeNoMICR: objCells[5].innerHTML,
                //SortCode: objCells[6].innerHTML,
                //transCodeMICR: objCells[8].innerHTML,
                //SanMICR: objCells[7].innerHTML,
                DocNo: count,
                FrontGray: objCells[12].innerHTML,
                BackGray: objCells[12].innerHTML.replace(/BOT_RGB/g, backImg),
                transaction_particular: objCells[30].innerHTML,
                report_code: rpt_code_out,
                instrument_alpha: alpha_out,
                remark_1: remark_1_out,
                remark_2: remark_2_out,
                trf_type: Scanning_Type,
                BranchCode: Branchcode

            });

            count++;
        }


        //debugger;
        var y = "post_array_data";
        $.ajax({
            type: 'POST',
            url: x + y,
            headers: authHeaders,
            crossDomain: true,
            data: { 'SorterData': SorterData, 'ChequeData': ChequeData },
            success: getSuccessPostTrf,
            error: getErrorPostTrf
        });

    }

    function getErrorPostTrf(result) {
        //debugger;
        $("#tbl_verf_fail").show();
        $("#div_submit_fail").show();
        $("#tbl_verf_pass").hide();
        $("#div_submit_pass").hide();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            //alert(result.responseText);
            document.getElementById("errorMsg").innerHTML = result.responseText;
        }
    }

    function getSuccessPostTrf(result) {
        //debugger;
        $("#tbl_verf_fail").hide();
        $("#div_submit_fail").hide();
        $("#tbl_verf_pass").hide();
        $("#div_submit_pass").hide();
        $("#tbl_verf_result").show();
        $("#div_response_success").show();

        document.getElementById("successMsg").innerHTML = "Success! Ref: " + RefNo;
    }

    function chq_focusout() {
        chq_validation = false;
        //setTableData();
        preCheckPancard();
    }

    function DeleteSuccess(data) {
        //debugger;
        document.getElementById("tblChequeData").deleteRow(GlobalRowNo);
        $("#div_main_page").hide();

        deleted_row += 1;

        for (i = 1; i < tableChequeData.rows.length; i++) {
            var objCells = tableChequeData.rows.item(i).cells;
            var row_id = objCells[29].innerHTML;
            $("#tr_id_" + row_id).css('background-color', '');
        }
    }

    function DepositCreditFlag() {
        depositFlag = document.getElementById("debit").checked;
        if (depositFlag == true) {
            $("#div_accno").show();
            $("#div_DebitAccHolderName").show();
            $("#div_DebitAccDetails").show();
            $("#div_accno_credit").hide();
            $("#div_CreditAccHolderName").hide();
            $("#div_CreditAccDetails").hide();
        }
        else {
            $("#div_accno").hide();
            $("#div_DebitAccHolderName").hide();
            $("#div_DebitAccDetails").hide();
            $("#div_accno_credit").show();
            $("#div_CreditAccHolderName").show();
            $("#div_CreditAccDetails").show();
        }
    }

}
catch (e) {
    alert(e.message);
}