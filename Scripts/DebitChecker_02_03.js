﻿try {

    var tempSrc = "";
    var PerviousType = "";

    //function getVoucherData() {
    //    //alert("getCvoucher data");

    //    document.getElementById("ProcessingBar").innerHTML = "Processing Request...";

    //    $("#ProcessingBar").show();
    //    var y = "getvoucherdetails";
    //    debugger;
    //    $.ajax({
    //        url: x + y,
    //        headers: authHeaders,
    //        type: 'POST',
    //        data: { pType: 'TRF', Intellerid: username, trf_type: Scanning_Type },
    //        success: getSuccessVoucher,
    //        error: getError
    //    });

    //}

    function getVoucherData() {
        //alert("getCvoucher data");
        debugger;
        document.getElementById("ProcessingBar").innerHTML = "Processing Request...";

        $("#ProcessingBar").show();

        debugger;

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);

        var data = {
            asdrf: "1234",
            //pType: 'TRF',
            pType: transtype,
            Intellerid: username,
            trf_type: Scanning_Type,
            BankCode: BankCode
        };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;


        var y = "getvoucherdetails";
        debugger;
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
            //alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            //alert(result.responseText);
            document.getElementById("ProcessingBar").innerHTML = result.responseText;
        }

    }

    function getSuccessVoucher(result) {
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

        getListData(result);

        $("#ProcessingBar").hide();
        debugger;
        $.ajax({
            url: x + "ItemReturnList",
            headers: authHeaders,
            type: 'POST',
            success: RejectList
        });
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

        var RetRow = '<tr id="tr_id_' + rowId + '">';

        if (Scanning_Type == "1" || Scanning_Type == "2" || Scanning_Type == "3") {
            if (print.InstrumentType == "S" || print.InstrumentType == "CI") {
                RetRow = RetRow +
                    '<td style="text-align:center;font-size: 14px;">' + print.CreditAccountNo + '</td>' +
                    '<td style="text-align:center;font-size: 14px;">' + print.PayeeName + '</td>' +
                    '<td style="text-align:center;font-size: 14px;">' + print.ChqAmount + '</td>' +
                    '<td style="text-align:center;font-size: 14px;">0</td>';
            }
            else if (print.InstrumentType == "DI") {
                RetRow = RetRow +
                    '<td style="text-align:center;font-size: 14px;">' + print.DebitAccountNo + '</td>' +
                    '<td style="text-align:center;font-size: 14px;">' + print.PayeeName + '</td>' +
                    '<td style="text-align:center;font-size: 14px;">0</td>' +
                    '<td style="text-align:center;font-size: 14px;">' + print.ChqAmount + '</td>';
            }
        }

        if (print.InstrumentType == 'S' || print.InstrumentType == "CI") {
            if (print.ChqAmount != null && print.ChqAmount != "") {
                total_slip_amt += parseInt(print.ChqAmount);
            }
            else
                total_slip_amt += 0;
            document.getElementById("total_slip_amt").value = total_slip_amt;
        }
        else if (print.InstrumentType == 'DI') {
            if (print.ChqAmount != null && print.ChqAmount != "") {
                total_chq_amt += parseInt(print.ChqAmount);
            }
            else
                total_chq_amt += 0;
            document.getElementById("total_chq_amt").value = total_chq_amt;
        }

        RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">' + print.ChqDate + '</td>';

        RetRow = RetRow +
            '<td style="text-align:center;font-size: 14px;" hidden></td>' +
            '<td style="text-align:center;font-size: 14px;" hidden></td>' +
            '<td style="text-align:center;font-size: 14px;" hidden></td>' +
            '<td style="text-align:center;font-size: 14px;" hidden></td>';

        //if (print.InstrumentType == 'S' || print.InstrumentType == "CI") {
        //    RetRow = RetRow +
        //        '<td style="text-align:center;font-size: 14px;"></td>' +
        //        '<td style="text-align:center;font-size: 14px;" hidden></td>' +
        //        '<td style="text-align:center;font-size: 14px;" hidden></td>' +
        //        '<td style="text-align:center;font-size: 14px;" hidden></td>';
        //}
        //else {
        //    RetRow = RetRow +
        //        '<td style="text-align:center;font-size: 14px;">' + print.chqno + '</td>' +
        //        '<td style="text-align:center;font-size: 14px;" hidden></td>' +
        //        '<td style="text-align:center;font-size: 14px;" hidden>' + print.San + '</td>' +
        //        '<td style="text-align:center;font-size: 14px;" hidden>' + print.transCode + '</td>';
        //}

        RetRow = RetRow +
            '<td style="text-align:center;font-size: 14px;">' + print.InstrumentType + '</td>' +
            '<td style="text-align:center;font-size: 14px;" hidden>';

        RetRow = RetRow +
            '</td>' +
            '<td style="text-align:center;font-size: 14px;" hidden>' +
            '<button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="tooltip"data - bs - placement="top" title = "Delete" >' +
            '<span class="text-90 far fa-trash-alt fa-sm"></span>' +
            '</button>' +
            '</td>' +
            '<td hidden>' + print.frontImg + '</td>' +
            '<td hidden><label id="valid_' + rowId + '">FALSE</label></td>';

        RetRow = RetRow +
            '<td hidden><label id="IQA_' + rowId + '">PASS</label></td>' +
            '<td hidden><label id="UV_' + rowId + '">PASS</label></td>' +
            '<td hidden><label id="IR_' + rowId + '">PASS</label></td>' +
            '<td hidden><label id="Micro_' + rowId + '">PASS</label></td>';

        RetRow = RetRow +
            '<td hidden><label id="SchemeCode_' + rowId + '"></label></td>' +
            '<td hidden><label id="FreezeCode_' + rowId + '"></label></td>' +
            '<td hidden><label id="MOP_' + rowId + '"></label></td>' +
            '<td hidden><label id="NREFlag_' + rowId + '"></label></td>' +
            '<td hidden><label id="SchemeType_' + rowId + '"></label></td>' +
            '<td hidden><label id="AccOwner_' + rowId + '"></label></td>' +
            '<td hidden></td>' +
            '<td hidden></td>' +
            '<td hidden></td>' +
            '<td hidden></td>' +
            '<td hidden></td>' +
            '<td hidden>' + rowId + '</td>' +
            '<td hidden>' + print.payeename + '</td>' +
            '<td hidden>' + print.Count_Id + '</td>' +
            '<td hidden>' + print.id + '</td>' +
            '<td hidden>FALSE</td>';

        RetRow = RetRow + '</tr>';

        document.getElementById("id_alpha").value = print.instrument_alpha;
        document.getElementById("transPart").value = print.transaction_particular;
        document.getElementById("rpt_code").value = print.report_code;
        document.getElementById("remark_1").value = print.remark_1;
        document.getElementById("remark_2").value = print.remark_2;

        rowId += 1;

        return RetRow;

    }

    function setTableData() {

        debugger;

        var dataname = "";
        if (Scanning_Type == "1")
            dataname = "Cash";
        else if (Scanning_Type == "2")
            dataname = "Slip";
        else if (Scanning_Type == "3")
            dataname = "Credit Intimation";

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

        var accStatus = document.getElementById("accStatus").innerHTML;
        debugger;
        //var payeename = document.getElementById("PayeeName").value;
        var accno = document.getElementById("AccountNo").value;

        var AccNoMinLength = document.getElementById("AccNoMinLength").value;
        var AccNoMaxLength = document.getElementById("AccNoMaxLength").value;

        if (Scanning_Type == "1" || Scanning_Type == "2" || Scanning_Type == "3") {
            // CTS without SLIP

            $("#div_accno").show();
            $("#Payeeee").show();
            $("#tr_acc_status").show();
            $("#tr_scheme_freeze").show();
            $("#tr_mop_nre").show();
            $("#tr_scheme_accowner").show();

            if (inst_type == "DI") {
                document.getElementById("id_chq").disabled = true;
            }
            else if (inst_type == "S" || inst_type == "CI") {
                document.getElementById("id_chq").disabled = true;
            }

            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = accno;
            if (accno == "" || accno == null || accno.toUpperCase() == "NULL") {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "Account No is null!";
            }
            else if (!accno.match(numbers)) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed in Account No";
            }
            //else if (accStatus == "C - Closed" || accStatus == "D - Dormant" || accStatus == "I - Inactive" || accStatus == "S - Stop payment") {
            //    dataValid = false;
            //    var accMsg = accStatus.substring(4, accStatus.length);
            //    document.getElementById("errorMsg").innerHTML = "Account No - " + accMsg + "!";
            //}
            //else 
            else {
                if (BankCode == "240") {
                    if (AccountValidation != true) {
                        dataValid = false;
                        document.getElementById("errorMsg").innerHTML = "Acc Status: " + accStatus;
                    }
                    //if (accStatus != "A - Active") {
                    //    dataValid = false;
                    //    document.getElementById("errorMsg").innerHTML = accStatus;
                    //}
                }
                else {
                    if (inst_type == "DI") {
                        // Debit - Cheque
                        if (accStatus == "D - Dormant") {
                            dataValid = false;
                            document.getElementById("errorMsg").innerHTML = "Dormant Account debit not permitted!";
                        }
                        else if (accStatus != "A - Active") {
                            dataValid = false;
                            document.getElementById("errorMsg").innerHTML = "Acc Status: " + accStatus;
                        }
                        else if (AccountValidation == false) {
                            dataValid = false;
                            document.getElementById("errorMsg").innerHTML = AccountVal_ErrorMsg;
                        }
                    }
                    else {
                        // Credit - Slip
                        if (accStatus != "A - Active") {
                            dataValid = false;
                            document.getElementById("errorMsg").innerHTML = "Acc Status: " + accStatus;
                        }
                        else if (AccountValidation == false) {
                            dataValid = false;
                            document.getElementById("errorMsg").innerHTML = AccountVal_ErrorMsg;
                        }
                    }
                }
            }



            //if (dataValid == true) {
            //    if (BankCode == "240") {
            //        debugger;
            //        if (inst_type == "S" || inst_type == "CI" || inst_type == "DI") {
            //            //var input_payeename = document.getElementById("input_payeename").value;
            //            //if (payeename == null || payeename == "") {
            //            //    dataValid = false;
            //            //    document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
            //            //}
            //            //else if (input_payeename == null || input_payeename == "") {
            //            //    dataValid = false;
            //            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
            //            //    document.getElementById("errorMsg").innerHTML = "Manual Payee name is blank!";
            //            //}
            //            //else if (payeename.toUpperCase() != input_payeename.toUpperCase()) {
            //            //    dataValid = false;
            //            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
            //            //    document.getElementById("errorMsg").innerHTML = "Trans. Particular and Drop Down Payee Name is not matching!";
            //            //}
            //            /*else {*/
            //            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
            //            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML = payeename;
            //            /*}*/
            //        }
            //        else {
            //            debugger;
            //            if (payeename != null && payeename != "") {
            //                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
            //            }
            //            else {
            //                dataValid = false;
            //                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
            //                document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
            //            }
            //        }
            //    }
            //    else {



            //        //if (dataValid == true && payeename != null && payeename != "") {
            //        //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
            //        //}
            //        //else {
            //        //    dataValid = false;
            //        //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
            //        //    document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
            //        //}

            //        //var schemeCode = document.getElementById("FinScheme").innerHTML;
            //        //if (inst_type == "C" && (schemeCode == "SBA" || schemeCode == "CAA" || schemeCode == "ODA" || schemeCode == "CCA")) {
            //        //    dataValid = false;
            //        //    document.getElementById("errorMsg").innerHTML = "Debit blocked - Scheme Code:" + schemeCode;
            //        //}
            //    }
            //}
        }

        // Date
        //debugger;
        if (dataValid == true && inst_type == "DI") {
            if (DateValidation(document.getElementById("date").value, true) == false) {
                //debugger;
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = ErrorMessage;
            }
            //debugger;
        }

        if (inst_type == "DI")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = document.getElementById("date").value;
        else
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = "";

        //debugger;
        // Amount validation
        var regexDecimalCount = /(?:\d*\.\d{1,2}|\d+)$/;
        var amtCheck = /^[-+]?[0-9]+\.[0-9]+$/;
        if (inst_type == "DI") {

            var chqAmt = document.getElementById("chq_amt").value;

            if (dataValid == true) {
                if (chqAmt == null || chqAmt == "") {
                    dataValid = false;
                    //document.getElementById("errorMsg").innerHTML = dataname + " amount cannot be null!";
                    document.getElementById("errorMsg").innerHTML = "Debit amount cannot be null!";
                }
                else if (!chqAmt.match(numbers)) {
                    if (!chqAmt.match(amtCheck)) {
                        dataValid = false;
                        //document.getElementById("errorMsg").innerHTML = dataname + " amount can accept 2 decimal or numeric values!";
                        document.getElementById("errorMsg").innerHTML = "Debit amount cannot be null!";

                    }
                    else if (parseInt(chqAmt) < 1) {
                        dataValid = false;
                        //document.getElementById("errorMsg").innerHTML = "Enter valid " + dataname + " amount!";
                        document.getElementById("errorMsg").innerHTML = "Debit amount cannot be null!";
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

            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = "0";
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[3].innerHTML = chqAmt;

            chqAmtChange('CHQ');
        }
        else if (inst_type == "S" || inst_type == "CI") {
            //debugger;
            var slipAmt = document.getElementById("slip_amt").value;

            if (dataValid == true) {
                if (slipAmt == null || slipAmt == "") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Slip amount cannot be null!";
                }
                else if (!slipAmt.match(numbers)) {
                    //debugger;
                    if (!slipAmt.match(amtCheck)) {
                        dataValid = false;
                        document.getElementById("errorMsg").innerHTML = "Slip amount can accept 2 decimal or numeric values!";
                    }
                    else if (parseInt(slipAmt) < 1) {
                        dataValid = false;
                        document.getElementById("errorMsg").innerHTML = "Enter valid slip amount!";
                    }
                    else {
                        var splitstr = slipAmt.split('.');
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
                else if (parseInt(slipAmt) < 1) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Enter valid slip amount!";
                }
                else {
                    var splitstr = slipAmt.split('.');
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

            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = slipAmt;
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[3].innerHTML = "0";

            chqAmtChange('SLIP');
        }

        //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = document.getElementById("PayeeName").value;
        //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = document.getElementById("slip_amt").value;
        //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[3].innerHTML = document.getElementById("chq_amt").value;

        //var chqno = document.getElementById("id_chq").value;
        //if (dataValid == true && inst_type == "C") {
        //    //if ((chqno == null || chqno == "") && (Scanning_Type == "2" || Scanning_Type == "3")) {
        //    //    dataValid = false;
        //    //    document.getElementById("errorMsg").innerHTML = "Inst. Srl No cannot be null!";
        //    //}
        //    //else if (chqno.length < 3 && Scanning_Type == "2" || Scanning_Type == "3") {
        //    //    dataValid = false;
        //    //    document.getElementById("errorMsg").innerHTML = "Inst. Srl No should be greater than 2 digits!";
        //    //}
        //    //else if (!chqno.match(numbers) && (Scanning_Type == "2" || Scanning_Type == "3")) {
        //    //    dataValid = false;
        //    //    document.getElementById("errorMsg").innerHTML = "Only numbers are allowed in Inst. Srl No!";
        //    //}
        //    //else if (chq_validation == false) {
        //    //    dataValid = false;
        //    //    document.getElementById("errorMsg").innerHTML = "Cheque Valadation failed: " + chq_validation_msg;
        //    //}
        //}
        //else if (dataValid == true && inst_type == "S") {
        //    if (Scanning_Type == "3") {
        //        if (chqno == null || chqno == "") {
        //            dataValid = false;
        //            document.getElementById("errorMsg").innerHTML = "Inst. Srl No cannot be null!";
        //        }
        //        else if (chqno.length < 3) {
        //            dataValid = false;
        //            document.getElementById("errorMsg").innerHTML = "Inst. Srl No should be greater than 2 digits!";
        //        }
        //        else if (chqno.length > 10) {
        //            dataValid = false;
        //            document.getElementById("errorMsg").innerHTML = "Inst. Srl No should be less than 10 digits!";
        //        }
        //    }
        //    else
        //        chqno = "";
        //}

        //if (inst_type == "C")
        //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = chqno;
        //else if (inst_type == "S") {
        //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = chqno;
        //}

        var chqno = "";
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = chqno;

        //if (inst_type == "C")
        //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = chqno;
        //else if (inst_type == "S") {
        //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = chqno;
        //}


        // IQA
        if (dataValid == true) {
            var iqa = document.getElementById("btn_iqa").checked;
            if (iqa == false) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "IQA Failed!";
            }
        }

        // UV
        //if (dataValid == true) {
        //    var uv = document.getElementById("btn_uv").checked;
        //    if (inst_type == "C" && Scanning_Type == "3") {
        //        if (uv == false) {
        //            dataValid = false;
        //            document.getElementById("errorMsg").innerHTML = "UV Failed!";
        //        }
        //    }
        //}

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

        debugger;

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
        debugger
        var verifyDone = true;
        var slipCount = 0;
        var chqCount = 0;

        var penSlip = 0;
        var penChq = 0;

        debugger;

        if (dataValid == false) {
            // Error Msg
            $("#tbl_verf_fail").show();
            $("#div_submit_fail").show();

            // Response
            $("#tbl_verf_result").hide();
            $("#div_response_success").hide();

            $("#tbl_verf_pass").hide();

            $("#a_rollback").hide();
            $("#a_reject").hide();
            $("#a_accept").hide();
            $("#a_verify").show();


        }
        else {
            for (i = 1; i < tableChequeData.rows.length; i++) {

                var objCells = tableChequeData.rows.item(i).cells;
                var row_id = objCells[29].innerHTML;

                var instVal = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML;
                if (instVal == "S" || instVal == "CI")
                    slipCount += 1;
                else if (instVal == "DI")
                    chqCount += 1;

                //var status = document.getElementById("valid_" + row_id).innerHTML;
                //if (status == "FALSE") {
                //    verifyDone = false;
                //    if (document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML == "S")
                //        penSlip += 1;
                //    else if (document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML == "C")
                //        penChq += 1;
                //}
                var status = document.getElementById("valid_" + row_id).innerHTML;
                if (status == "FALSE") {
                    verifyDone = false;
                    if (objCells[9].innerHTML == "S" || objCells[9].innerHTML == "CI" && status == "FALSE")
                        penSlip += 1;
                    else if (objCells[9].innerHTML == "DI" && status == "FALSE")
                        penChq += 1;
                }
            }

            if (verifyDone == false) {
                // Error Msg
                $("#tbl_verf_fail").show();
                $("#div_submit_fail").show();

                // Response
                $("#tbl_verf_result").hide();
                $("#div_response_success").hide();

                // Data Table
                $("#tbl_verf_pass").hide();

                $("#a_rollback").hide();
                $("#a_reject").hide();
                $("#a_accept").hide();
                $("#a_verify").show();

                //var msg = "Verfication pending: ";
                //if (penSlip > 0)
                //    msg = msg + penSlip + " Slip; ";
                //if (penChq > 0) {
                //    if (Scanning_Type == "3")
                //        msg = msg + penChq + " Cheque;";
                //    else if (Scanning_Type == "4")
                //        msg = msg + penChq + " Withdrawal Form;";
                //    else if (Scanning_Type == "5")
                //        msg = msg + penChq + " Debit Intimation;";
                //}

                //document.getElementById("errorMsg").innerHTML = msg;
                msg = "Verification Pending for ";

                if (penSlip > 0)
                    if (objCells[9].innerHTML == "S")
                        msg = msg + penSlip + " Slip ";
                    else if (objCells[9].innerHTML == "CI")
                        msg = msg + penSlip + " Credit Intimation ";
                    else if (penChq > 0)
                        msg = msg + penChq + " Debit Intimation";

                document.getElementById("errorMsg").innerHTML = msg;

            }
            else if (verifyDone == true) {
                // Error Msg
                $("#tbl_verf_fail").hide();
                $("#div_submit_fail").show();

                // Response
                $("#tbl_verf_result").hide();
                $("#div_response_success").hide();

                // Data Table
                $("#tbl_verf_pass").show();

                if (Rollback == "Y")
                    $("#a_rollback").show();
                else
                    $("#a_rollback").hide();

                $("#a_reject").show();
                $("#a_accept").show();
                $("#a_verify").hide();
                $("#a_rollback").show();
            }
        }
    }

    function changeInstType() {
        debugger;
        var inst_val = document.getElementById("id_inst_type").checked;
        if (inst_val == false) {
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "DI";
            //document.getElementById("input_payeename").value = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML;
            //$("#div_micr").show();
            document.getElementById("lbl_inst_type").innerHTML = "Debit Intimation";
            $("#tr_slip_amt").hide();
            $("#tr_date").show();
            $("#tr_chq_amt").show();
            document.getElementById("chq_amt").value = document.getElementById("slip_amt").value;
            var totalSlipAmt = document.getElementById("total_slip_amt").value;
            document.getElementById("total_slip_amt").value = totalSlipAmt - document.getElementById("slip_amt").value;
            document.getElementById("slip_amt").value = "0";

            if (Scanning_Type == "3") {
                $("#th_UV").hide();
                $("#td_UV").hide();
            }

            if (BankCode == "240") {
                $("#tr_input_payeename").show();
            }
            else {
                $("#tr_input_payeename").hide();
            }

            preCheckPancard();
        }
        else {

            //$("#div_micr").hide();
            if (Scanning_Type == "2") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "S";
                document.getElementById("lbl_inst_type").innerHTML = "Slip";
            }

            else if (Scanning_Type == "3") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "CI";
                document.getElementById("lbl_inst_type").innerHTML = "Credit Intimation";
            }

            else {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "Not defined";
                document.getElementById("lbl_inst_type").innerHTML = "Not Defined";
            }

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

    //function VerifyData() {
    //    debugger;

    //    $("#tbl_verf_pass").hide();
    //    $("#tbl_verf_fail").show();
    //    $("#div_submit_pass").hide();
    //    $("#div_submit_fail").show();

    //    // success resp
    //    $("#tbl_verf_result").hide();
    //    $("#div_response_success").hide();

    //    //document.getElementById("errorMsg").innerHTML = "";

    //    var verifyDone = true;
    //    var slipCount = 0;
    //    var chqCount = 0;

    //    var payeename = "";
    //    for (i = 1; i < tableChequeData.rows.length; i++) {

    //        var objCells = tableChequeData.rows.item(i).cells;
    //        var row_id = objCells[29].innerHTML;

    //        var instVal = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML;
    //        if (instVal == "S" || instVal == "CI")
    //            slipCount += 1;
    //        else if (instVal == "DI")
    //            chqCount += 1;

    //        var status = document.getElementById("valid_" + row_id).innerHTML;
    //        if (status == "FALSE")
    //            verifyDone = false;

    //        if (Scanning_Type == "1" || Scanning_Type == "2" || Scanning_Type == "3") {
    //            if (document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML == "DI")
    //                payeename = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[1].innerHTML;
    //        }
    //    }


    //    //debugger;
    //    var scanCount = true;
    //    if (verifyDone == true) {
    //        if (chqCount == 0) {
    //            document.getElementById("errorMsg").innerHTML = "Atleast one DI Slip is mandatory!";
    //            //scanCount = false;
    //            verifyDone = false;
    //        }
    //        else if (chqCount > 1) {
    //            //if (Scanning_Type == "3")
    //            //    document.getElementById("errorMsg").innerHTML = "Only one Cheque is required!";
    //            //else if (Scanning_Type == "4")
    //            //    document.getElementById("errorMsg").innerHTML = "Only one Withdrawal Form is required!";
    //            //else if (Scanning_Type == "5")
    //            //    document.getElementById("errorMsg").innerHTML = "Only one Debit Intimation is required!";
    //            document.getElementById("errorMsg").innerHTML = "Only one DI Slip is required!";
    //            //scanCount = false;
    //            verifyDone = false;
    //        }
    //        else if (slipCount == 0) {
    //            if (Scanning_Type == "2") {
    //                document.getElementById("errorMsg").innerHTML = "Atleast one SLIP is mandatory!";
    //                //scanCount = false;
    //                verifyDone = false;
    //            }
    //            else if (Scanning_Type == "3") {
    //                document.getElementById("errorMsg").innerHTML = "Atleast one CI is mandatory!";
    //                //scanCount = false;
    //                verifyDone = false;
    //            }

    //        }
    //        else if (slipCount > 1) {

    //            if (Scanning_Type == "2") {
    //                document.getElementById("errorMsg").innerHTML = "Only one SLIP is required!";
    //                //scanCount = false;
    //                verifyDone = false;
    //            }
    //            else if (Scanning_Type == "3") {
    //                document.getElementById("errorMsg").innerHTML = "Only one CI is required!";
    //                //scanCount = false;
    //                verifyDone = false;
    //            }
    //        }

    //        debugger;
    //        if (verifyDone == true && BankCode == "240" && slipCount > 1) {
    //            document.getElementById("errorMsg").innerHTML = "One Slip can be processed!";
    //            //scanCount = false;
    //            verifyDone = false;
    //        }

    //    }

    //    var amtValid = true;
    //    if (verifyDone == true/* && scanCount == true*/) {
    //        var slipAmt = document.getElementById("total_slip_amt").value;
    //        var chqAmt = document.getElementById("total_chq_amt").value;

    //        if (slipAmt != chqAmt) {
    //            if (Scanning_Type == "2")
    //                document.getElementById("errorMsg").innerHTML = "DI & Slip amount not matching!";
    //            else if (Scanning_Type == "3")
    //                document.getElementById("errorMsg").innerHTML = "DI & CI amount not matching!";

    //            amtValid = false;
    //            verifyDone = false;
    //        }
    //    }
    //    debugger;
    //    // isha
    //    var accvalid = true;
    //    if (verifyDone == true/* && scanCount == true && amtValid == true*/) {
    //        //debugger;
    //        for (i = 1; i < tableChequeData.rows.length; i++) {

    //            var objCells1 = tableChequeData.rows.item(i).cells;
    //            var acc1 = objCells1[0].innerHTML;

    //            for (j = 1; j < tableChequeData.rows.length; j++) {

    //                var objCells2 = tableChequeData.rows.item(j).cells;
    //                var acc2 = objCells2[0].innerHTML;
    //                debugger;
    //                if (i != j && acc1 == acc2) {
    //                    if (Scanning_Type == "2") {
    //                        debugger;
    //                        document.getElementById("errorMsg").innerHTML = "DI & Slip Acc No. is same!";
    //                    }
    //                    else if (Scanning_Type == "3")
    //                        document.getElementById("errorMsg").innerHTML = "DI & CI is same!";
    //                    //else if (Scanning_Type == "5")
    //                    //    document.getElementById("errorMsg").innerHTML = "Debit Intimation & Slip Acc No. is same!";
    //                    accvalid = false;
    //                    verifyDone = false;
    //                }

    //            }

    //        }
    //    }

    //    debugger;
    //    //aniket
    //    var otherVerf = true;
    //    if (verifyDone == true/* && scanCount == true && amtValid == true && accvalid == true*/) {
    //        branch_out = document.getElementById("id_branchcode").value;
    //        //if (branch_out == "" || branch_out == null) {
    //        //    document.getElementById("errorMsg").innerHTML = "Instrument Alpha is mandatory!";
    //        //    otherVerf = false;
    //        //}

    //        //trans_part_out = document.getElementById("transPart").value;
    //        //if (trans_part_out == "" || trans_part_out == null) {
    //        //    document.getElementById("errorMsg").innerHTML = "Transaction particulars is mandatory!";
    //        //    otherVerf = false;
    //        //    verifyDone = false;
    //        //}
    //        debugger;
    //        if (Scanning_Type == "1" || Scanning_Type == "3") {
    //            rpt_code_out = document.getElementById("rpt_code").value;
    //            if (rpt_code == "0" && NRE_Flag == "Y") {
    //                document.getElementById("errorMsg").innerHTML = "Report Code is mandatory!";
    //                otherVerf = false;
    //                verifyDone = false;
    //            }
    //        }


    //        var slipAmt = document.getElementById("total_slip_amt").value;
    //        //if (ValidateAccBalance == "Y") {
    //        //    if (AccBalance != "" && AccBalance != null) {
    //        //        if (parseFloat(slipAmt) > parseFloat(AccBalance)) {
    //        //            document.getElementById("errorMsg").innerHTML = "Balance Insufficient";
    //        //            return false;
    //        //        }
    //        //    }
    //        //}
    //    }

    //    //var UV_Flag = true;
    //    //if (verifyDone == true /*&& scanCount == true && amtValid == true && accvalid == true && otherVerf == true*/) {
    //    //    for (i = 1; i < tableChequeData.rows.length; i++) {

    //    //    }
    //    //}

    //    if (verifyDone == true /*&& scanCount == true && amtValid == true && accvalid == true && otherVerf == true && UV_Flag == true*/) {
    //        $("#tbl_verf_fail").hide();
    //        $("#div_submit_fail").hide();
    //        $("#tbl_verf_pass").hide();
    //        $("#div_submit_pass").show();
    //        $("#tbl_verf_result").show();
    //        $("#div_response_success").hide();

    //        document.getElementById("successMsg").innerHTML = "Do you want to Submit the Record ?";

    //    }
    //    else {
    //        var msg = document.getElementById("errorMsg").innerHTML;
    //        if (msg == "" || msg == null) {
    //            var slipCount = 0;
    //            var chqCount = 0;
    //            for (i = 1; i < tableChequeData.rows.length; i++) {
    //                var objCells = tableChequeData.rows.item(i).cells;
    //                var row_id = objCells[29].innerHTML;

    //                var status = document.getElementById("valid_" + row_id).innerHTML;

    //                if (objCells[9].innerHTML == "S" || objCells[9].innerHTML == "CI" && status == "FALSE")
    //                    slipCount += 1;
    //                else if (objCells[9].innerHTML == "DI" && status == "FALSE")
    //                    chqCount += 1;
    //            }

    //            msg = "Verification Pending for ";

    //            if (slipCount > 0)
    //                if (objCells[9].innerHTML == "S")
    //                    msg = msg + slipCount + " Slip ";
    //                else if (objCells[9].innerHTML == "CI")
    //                    msg = msg + slipCount + " Credit Intimation ";
    //                else if (chqCount > 0)
    //                    msg = msg + chqCount + " Debit Intimation";

    //            document.getElementById("errorMsg").innerHTML = msg;
    //        }

    //    }

    //    //$("#tbl_verf_fail").hide();
    //    //$("#tbl_verf_result").hide();
    //    //$("#div_submit_pass").show();
    //    //$("#div_submit_fail").hide();
    //    //$("#div_response_success").hide();
    //    //$("#div_create_question").hide();

    //}

    function VerifyData() {
        debugger;
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

    function DataPush(descision) {
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

            debugger;
            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                data: {
                    RejectCode: code, RejectDesc: desc, pType: 'DI', decision: 'R', VerificationLevel: verfLevel, transRefNo: RefNo, cid: count_id
                },
                success: RejectSuccess
                //success: window.open(rooturl + "Checker/Index", "_self")
            });
        }
        if (descision == "B") {
            debugger;
            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                data: {
                    pType: 'DI', decision: 'B', VerificationLevel: verfLevel, transRefNo: RefNo, cid: count_id
                },
                success: CheckerList
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

            debugger;
            ////var srlno = document.getElementById("chqnoDataEntry").value;
            //var accno = document.getElementById("AccountNo").value;
            //var name = document.getElementById("payeeName").value;
            //var date = document.getElementById("ChequeDateTxt").value;
            //var amt = document.getElementById("amt").value;
            //var chqno = document.getElementById("chqnoDataEntry").value;
            //var trans_particular = document.getElementById("transParticular").value;
            //var rpt_code = document.getElementById("rpt_code").value;
            //var remark1 = document.getElementById("remark_1").value;
            //var remark2 = document.getElementById("remark_2").value;
            //var instrument_alpha = document.getElementById("instrument_alpha").value;
            //var pan = document.getElementById("pan").value;

            //var CheckerModule_L3 = document.getElementById("CheckerModule_L3").value;
            //var l3start = document.getElementById("L3StartLimit").value;
            //var l3_req = "";

            //debugger;
            //if (verf == "L2") {
            //    if (CheckerModule_L3 != "Y")
            //        l3_req = "N";
            //    else if (amt >= parseFloat(l3start))
            //        l3_req = "Y";
            //    else
            //        l3_req = "N";
            //}

            debugger;
            //$.ajax({
            //    url: x + y,
            //    headers: authHeaders,
            //    type: 'POST',
            //    data: {
            //        TransactionRefNo: refno, count_id: id, btnVal: 'ACCEPT', Verf: verf, transactionType: tranType, L3_Verf_required: l3_req,
            //        ChequeNo: chqno, //SortCode: sort, SanCode: san, TrCode: tr,
            //        ChqAmount: amt, date: date, DebitAccNo: accno, PayeeName: name,
            //        transaction_particular: trans_particular, report_code: rpt_code, remark_1: remark1, remark_2: remark2, instrument_alpha: instrument_alpha,
            //        pancard_form_16: pan
            //    },
            //    success: AcceptSuccess
            //});

            var verf_l3_req = "";
            var CheckerModule_L3 = document.getElementById("CheckerModule_L3").value;
            var L3StartLimit = document.getElementById("L3StartLimit").value;
            var debit_amt = document.getElementById("total_chq_amt").value;

            debugger;
            if (verfLevel == "L2" && CheckerModule_L3 == "Y" || CheckerModule_L3 == "N") {
                if (parseFloat(debit_amt) >= parseFloat(L3StartLimit))
                    verf_l3_req = "Y";
                else
                    verf_l3_req = "N";
            }
            else if (verfLevel == "L3")
                verf_l3_req = "N";
            else
                verf_l3_req = "N";

            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                data: {
                    pType: 'DI', decision: 'A', VerificationLevel: verfLevel, transRefNo: RefNo, L3VerfyReq: verf_l3_req, BankCode: BankCode
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

                debugger;
                $.ajax({
                    url: x + y,
                    headers: authHeaders,
                    type: 'POST',
                    data: {
                        RejectDesc: desc, pType: 'DI', decision: 'ROLLBACK', VerificationLevel: verfLevel, transRefNo: RefNo, cid: count_id
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
        debugger;
        $("#div_accept_success").show();
        $("#tbl_accept_success").hide();
        $("#div_accept_failed").hide();
        $("#div_accept_button").show();
        $("#btn_accept_success").hide();
    }

    function AcceptSuccess(result) {
        $("#btn_accept_success").show();

        document.getElementById("successMsg_accept").innerHTML = result;
    }

    function getErrorPostTrf(result) {
        debugger;
        $("#tbl_verf_fail").show();
        $("#div_submit_fail").show();
        $("#tbl_verf_pass").hide();
        $("#div_submit_pass").hide();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        if (result.status == 401 && result.statusText == "Unauthorized") {
            //alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            //alert(result.responseText);
            document.getElementById("errorMsg").innerHTML = result.responseText;
        }
    }

    function getSuccessPostTrf(result) {
        debugger;
        $("#tbl_verf_fail").hide();
        $("#div_submit_fail").hide();
        $("#tbl_verf_pass").hide();
        $("#div_submit_pass").hide();
        $("#tbl_verf_result").show();
        $("#div_response_success").show();

        document.getElementById("successMsg").innerHTML = "Success! Ref: " + RefNo;
    }

    function CheckerList() {
        window.open(rooturl + "Checker/Index", "_self");
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
        debugger;
        $("#tbl_reject_list").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            AddRecordRow_RejectList(print);
        });
    }

    function AddRecordRow_RejectList(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_reject_list tbody").length == 0) {
            $("#tbl_reject_list").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_reject_list tbody").append(
            RecordTableRow_RejectList(print));
    }

    function RecordTableRow_RejectList(print) {
        debugger;

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

    function Rollback() {
        debugger;
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

}
catch (e) {
    //alert(e.message);
}