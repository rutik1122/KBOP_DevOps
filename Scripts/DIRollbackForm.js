try {

    var tempSrc = "";
    var PerviousType = "";

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
        //debugger;
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

        //var y = "ReportCodeList";

        //$.ajax({
        //    url: x + y,
        //    headers: authHeaders,
        //    type: 'POST',
        //    success: ReportCodeList,
        //    error: ErrorReportCode
        //});

        //debugger;

        //var kVal = document.getElementById("KVal").value;
        //var result = decryptJsonData(response_data, kVal);

        //debugger;
        //RefNo = Ref_No_Generator(transtype);
        //var currentDate = new Date();
        //RefNo = "DI" + currentDate.getFullYear() + String(currentDate.getUTCMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0')
        //    + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0')
        //    + String(currentDate.getSeconds()).padStart(2, '0') + String(currentDate.getMilliseconds()).padStart(2, '0');

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

        getListData(response_data);

        $("#ProcessingBar").hide();
    }

    function getListData(printer) {
        debugger;
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
        debugger;
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

        transtype = print.transtype;

        BrCode = print.SolID;

        if (print.InstrumentType == "C" && (default_payeename == "" || default_payeename == null))
            default_payeename = print.payeename;

        var RetRow = '<tr id="tr_id_' + rowId + '">';
        if (Scanning_Type == "" || Scanning_Type == null) {
            debugger;
            if (print.transtype == "DI01") {
                Scanning_Type = "1";
                document.getElementById("spam_header").innerHTML = "Debit Intimation Rollback - With Cash";
            }
            else if (print.transtype == "DI02") {
                Scanning_Type = "2";
                document.getElementById("spam_header").innerHTML = "Debit Intimation Rollback - With Slip";
            }
            else if (print.transtype == "DI03") {
                Scanning_Type = "3";
                document.getElementById("spam_header").innerHTML = "Debit Intimation Rollback - With CI";
            }

            document.getElementById("rollback").value = print.RejectDesc;
        }


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

        //var currentDate = new Date();
        ////RefNo = "DI" + currentDate.getFullYear() + String(currentDate.getUTCMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0') + String(currentDate.getSeconds()).padStart(2, '0');

        //var dd = String(currentDate.getDate()).padStart(2, '0');
        //var mm = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
        //var yyyy = currentDate.getFullYear();

        //RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">' + dd + '-' + mm + '-' + yyyy + '</td>';
        /*RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">' + print.chqdate + '</td>';*/
        RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">' + print.ChqDate + '</td>';

        RetRow = RetRow +
            '<td style="text-align:center;font-size: 14px;" hidden></td>' +
            '<td style="text-align:center;font-size: 14px;" hidden></td>' +
            '<td style="text-align:center;font-size: 14px;" hidden></td>' +
            '<td style="text-align:center;font-size: 14px;" hidden></td>';

        //if (print.InstrumentType == "S" || print.InstrumentType == "CI") {
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
            '<td style="text-align:center;font-size: 14px;">' +
            '<button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="tooltip"data - bs - placement="top" title = "Delete" >' +
            '<span class="text-90 far fa-trash-alt fa-sm"></span>' +
            '</button>' +
            '</td>' +
            '<td hidden>' + print.frontImg + '</td>' +
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

        debugger;
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

        ////RetRow = RetRow +
        ////    '<td hidden><label id="IQA_' + rowId + '">PASS</label></td>' +
        ////    '<td hidden><label id="UV_' + rowId + '">PASS</label></td>' +
        ////    '<td hidden><label id="IR_' + rowId + '">PASS</label></td>' +
        ////    '<td hidden><label id="Micro_' + rowId + '">PASS</label></td>';

        ////debugger;
        RetRow = RetRow +
            '<td hidden><label id="SchemeCode_' + rowId + '"></label></td>' +
            '<td hidden><label id="FreezeCode_' + rowId + '"></label></td>' +
            '<td hidden><label id="MOP_' + rowId + '"></label></td>' +
            '<td hidden><label id="NREFlag_' + rowId + '"></label></td>' +
            '<td hidden><label id="SchemeType_' + rowId + '"></label></td>' +
            '<td hidden><label id="AccOwner_' + rowId + '"></label></td>' +
            '<td hidden> </td>' +
            '<td hidden></td>' +
            '<td hidden></td>' +
            '<td hidden></td>' +
            '<td hidden></td>' +
            '<td hidden>' + rowId + '</td>' +
            '<td hidden>' + print.PayeeName + '</td>' +
            '<td hidden>' + print.Count_Id + '</td>' +
            '<td hidden>' + print.id + '</td>' +
            '<td hidden>FALSE</td>';
        //RetRow = RetRow +
        //    '<td hidden><label id="IQA_' + rowId + '">PASS</label></td>' +
        //    '<td hidden><label id="UV_' + rowId + '">PASS</label></td>' +
        //    '<td hidden><label id="IR_' + rowId + '">PASS</label></td>' +
        //    '<td hidden><label id="Micro_' + rowId + '">PASS</label></td>';

        //RetRow = RetRow +
        //    '<td hidden><label id="SchemeCode_' + rowId + '"></label></td>' +
        //    '<td hidden><label id="FreezeCode_' + rowId + '"></label></td>' +
        //    '<td hidden><label id="MOP_' + rowId + '"></label></td>' +
        //    '<td hidden><label id="NREFlag_' + rowId + '"></label></td>' +
        //    '<td hidden><label id="SchemeType_' + rowId + '"></label></td>' +
        //    '<td hidden><label id="AccOwner_' + rowId + '"></label></td>' +
        //    '<td hidden></td>' +
        //    '<td hidden></td>' +
        //    '<td hidden></td>' +
        //    '<td hidden></td>' +
        //    '<td hidden></td>' +
        //    '<td hidden>' + rowId + '</td>';
        RetRow = RetRow + '</tr>';

        document.getElementById("id_branchcode").value = print.instrument_alpha;
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
        var payeename = document.getElementById("PayeeName").value;
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
                document.getElementById("id_chq").disabled = false;
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



            if (dataValid == true) {
                if (BankCode == "240") {
                    debugger;
                    if (inst_type == "S" || inst_type == "CI" || inst_type == "DI") {
                        var input_payeename = document.getElementById("input_payeename").value;
                        if (payeename == null || payeename == "") {
                            dataValid = false;
                            document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
                        }
                        else if (input_payeename == null || input_payeename == "") {
                            dataValid = false;
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
                            document.getElementById("errorMsg").innerHTML = "Trans Particular name is blank!";
                        }
                        //else if (payeename.toUpperCase() != input_payeename.toUpperCase()) {
                        //    dataValid = false;
                        //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
                        //    document.getElementById("errorMsg").innerHTML = "Trans. Particular and Drop Down Payee Name is not matching!";
                        //}
                        else {
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML = payeename;
                        }
                    }
                    else {
                        debugger;
                        if (payeename != null && payeename != "") {
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
                        }
                        else {
                            dataValid = false;
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
                            document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
                        }
                    }
                }
                else {
                    if (dataValid == true && payeename != null && payeename != "") {
                        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
                    }
                    else {
                        dataValid = false;
                        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
                        document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
                    }

                    var schemeCode = document.getElementById("FinScheme").innerHTML;
                    if (inst_type == "C" && (schemeCode == "SBA" || schemeCode == "CAA" || schemeCode == "ODA" || schemeCode == "CCA")) {
                        dataValid = false;
                        document.getElementById("errorMsg").innerHTML = "Debit blocked - Scheme Code:" + schemeCode;
                    }
                }
            }
        }

        // Date
        //debugger;
        var todaydate = document.getElementById("date").value;
        //if (dataValid == true && inst_type == "") {
        //    if (DateValidation(document.getElementById("date").value, true) == false) {
        //        //debugger;
        //        dataValid = false;
        //        document.getElementById("errorMsg").innerHTML = ErrorMessage;
        //    }   
        //}
        //else
        if (dataValid == true && (inst_type == "WF" || inst_type == "DI")) {
            if (DateValidation(document.getElementById("date").value, false) == false) {
                //debugger;
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = ErrorMessage;
            }
            else {
                var dateData = currentDate();
                if (dateData != document.getElementById("date").value) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Current Date is required!";
                }
            }
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
                    //document.getElementById("errorMsg").innerHTML = "Enter valid " + dataname + " amount!";
                    document.getElementById("errorMsg").innerHTML = "Enter valid amount!";
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

    }

    function changeInstType() {
        debugger;
        var inst_val = document.getElementById("id_inst_type").checked;
        if (inst_val == false) {
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "DI";
            document.getElementById("input_payeename").value = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML;
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

    function VerifyData() {
        debugger;

        $("#tbl_verf_pass").hide();
        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();

        // success resp
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        //document.getElementById("errorMsg").innerHTML = "";

        var verifyDone = true;
        var slipCount = 0;
        var chqCount = 0;

        var payeename = "";
        for (i = 1; i < tableChequeData.rows.length; i++) {

            var objCells = tableChequeData.rows.item(i).cells;
            var row_id = objCells[29].innerHTML;

            var instVal = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML;
            if (instVal == "S" || instVal == "CI")
                slipCount += 1;
            else if (instVal == "DI")
                chqCount += 1;

            var status = document.getElementById("valid_" + row_id).innerHTML;
            if (status == "FALSE")
                verifyDone = false;

            if (Scanning_Type == "1" || Scanning_Type == "2" || Scanning_Type == "3") {
                if (document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML == "DI")
                    payeename = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[1].innerHTML;
            }
        }


        //debugger;
        var scanCount = true;
        if (verifyDone == true) {
            if (chqCount == 0) {
                document.getElementById("errorMsg").innerHTML = "Atleast one DI Slip is mandatory!";
                //scanCount = false;
                verifyDone = false;
            }
            else if (chqCount > 1) {
                //if (Scanning_Type == "3")
                //    document.getElementById("errorMsg").innerHTML = "Only one Cheque is required!";
                //else if (Scanning_Type == "4")
                //    document.getElementById("errorMsg").innerHTML = "Only one Withdrawal Form is required!";
                //else if (Scanning_Type == "5")
                //    document.getElementById("errorMsg").innerHTML = "Only one Debit Intimation is required!";
                document.getElementById("errorMsg").innerHTML = "Only one DI Slip is required!";
                //scanCount = false;
                verifyDone = false;
            }
            else if (slipCount == 0) {
                if (Scanning_Type == "2") {
                    document.getElementById("errorMsg").innerHTML = "Atleast one SLIP is mandatory!";
                    //scanCount = false;
                    verifyDone = false;
                }
                else if (Scanning_Type == "3") {
                    document.getElementById("errorMsg").innerHTML = "Atleast one CI is mandatory!";
                    //scanCount = false;
                    verifyDone = false;
                }

            }
            else if (slipCount > 1) {

                if (Scanning_Type == "2") {
                    document.getElementById("errorMsg").innerHTML = "Only one SLIP is required!";
                    //scanCount = false;
                    verifyDone = false;
                }
                else if (Scanning_Type == "3") {
                    document.getElementById("errorMsg").innerHTML = "Only one CI is required!";
                    //scanCount = false;
                    verifyDone = false;
                }
            }

            debugger;
            if (verifyDone == true && BankCode == "240" && slipCount > 1) {
                document.getElementById("errorMsg").innerHTML = "One Slip can be processed!";
                //scanCount = false;
                verifyDone = false;
            }

        }

        var amtValid = true;
        if (verifyDone == true/* && scanCount == true*/) {
            var slipAmt = document.getElementById("total_slip_amt").value;
            var chqAmt = document.getElementById("total_chq_amt").value;

            if (slipAmt != chqAmt) {
                if (Scanning_Type == "2")
                    document.getElementById("errorMsg").innerHTML = "DI & Slip amount not matching!";
                else if (Scanning_Type == "3")
                    document.getElementById("errorMsg").innerHTML = "DI & CI amount not matching!";

                amtValid = false;
                verifyDone = false;
            }
        }

        debugger;
        // isha
        var accvalid = true;
        if (verifyDone == true/* && scanCount == true && amtValid == true*/) {
            //debugger;
            for (i = 1; i < tableChequeData.rows.length; i++) {

                var objCells1 = tableChequeData.rows.item(i).cells;
                var acc1 = objCells1[0].innerHTML;

                for (j = 1; j < tableChequeData.rows.length; j++) {

                    var objCells2 = tableChequeData.rows.item(j).cells;
                    var acc2 = objCells2[0].innerHTML;
                    debugger;
                    if (i != j && acc1 == acc2) {
                        if (Scanning_Type == "2") {
                            debugger;
                            document.getElementById("errorMsg").innerHTML = "DI & Slip Acc No. is same!";
                        }
                        else if (Scanning_Type == "3")
                            document.getElementById("errorMsg").innerHTML = "DI & CI is same!";
                        //else if (Scanning_Type == "5")
                        //    document.getElementById("errorMsg").innerHTML = "Debit Intimation & Slip Acc No. is same!";
                        accvalid = false;
                        verifyDone = false;
                    }

                }

            }
        }

        debugger;
        //aniket
        var otherVerf = true;
        if (verifyDone == true/* && scanCount == true && amtValid == true && accvalid == true*/) {
            branch_out = document.getElementById("id_branchcode").value;
            //if (branch_out == "" || branch_out == null) {
            //    document.getElementById("errorMsg").innerHTML = "Instrument Alpha is mandatory!";
            //    otherVerf = false;
            //}

            trans_part_out = document.getElementById("transPart").value;
            if (trans_part_out == "" || trans_part_out == null) {
                document.getElementById("errorMsg").innerHTML = "Transaction particulars is mandatory!";
                otherVerf = false;
                verifyDone = false;
            }
            debugger;
            if (Scanning_Type == "1" || Scanning_Type == "3") {
                rpt_code_out = document.getElementById("rpt_code").value;
                if (rpt_code == "0" && NRE_Flag == "Y") {
                    document.getElementById("errorMsg").innerHTML = "Report Code is mandatory!";
                    otherVerf = false;
                    verifyDone = false;
                }
            }


            var slipAmt = document.getElementById("total_slip_amt").value;
            //if (ValidateAccBalance == "Y") {
            //    if (AccBalance != "" && AccBalance != null) {
            //        if (parseFloat(slipAmt) > parseFloat(AccBalance)) {
            //            document.getElementById("errorMsg").innerHTML = "Balance Insufficient";
            //            return false;
            //        }
            //    }
            //}
        }

        //var UV_Flag = true;
        //if (verifyDone == true /*&& scanCount == true && amtValid == true && accvalid == true && otherVerf == true*/) {
        //    for (i = 1; i < tableChequeData.rows.length; i++) {

        //    }
        //}

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

                    if (objCells[9].innerHTML == "S" || objCells[9].innerHTML == "CI" && status == "FALSE")
                        slipCount += 1;
                    else if (objCells[9].innerHTML == "DI" && status == "FALSE")
                        chqCount += 1;
                }

                msg = "Verification Pending for ";

                if (slipCount > 0)
                    if (objCells[9].innerHTML == "S")
                        msg = msg + slipCount + " Slip ";
                    else if (objCells[9].innerHTML == "CI")
                        msg = msg + slipCount + " Credit Intimation ";
                    else if (chqCount > 0)
                        msg = msg + chqCount + " Debit Intimation";

                document.getElementById("errorMsg").innerHTML = msg;
            }

        }

        //$("#tbl_verf_fail").hide();
        //$("#tbl_verf_result").hide();
        //$("#div_submit_pass").show();
        //$("#div_submit_fail").hide();
        //$("#div_response_success").hide();
        //$("#div_create_question").hide();

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
        var amt = document.getElementById("total_chq_amt").value;
        var l2start = parseFloat(document.getElementById("L2StartLimit").value);
        var CheckerModule = document.getElementById("CheckerModule").value;
        var data_amt = parseFloat(amt);
        var response = "";
        //var verfReq = "";

        debugger;
        if (CheckerModule == "Y") {
            if (data_amt >= parseFloat(l2start))
                response = "82";
            else
                response = "81";
        }
        else {
            response = "81";
        }

        //if (CheckerModule != "Y")
        //    response = "2";
        //else if (data_amt >= parseFloat(l2start))
        //    response = "2";
        //else
        //    response = "22";

        //debugger;
        var ChequeData = {};
        //var trans_part_out = document.getElementById("transPart").value;
        remark_1_out = document.getElementById("remark_1").value;
        remark_2_out = document.getElementById("remark_2").value;

        var Branchcode = document.getElementById("branchcode").value;

        ChequeData.pType = "DI";
        ChequeData.response = response;
        ChequeData.INtellerid = username;
        if (Scanning_Type == "2")
            ChequeData.transtype = "DI02";
        else if (Scanning_Type == "3")
            ChequeData.transtype = "DI03";
        ChequeData.transRefNo = RefNo;
        //ChequeData.ClearingType = document.getElementById("ClearingType").value;
        ChequeData.ScanningType = Scanning_Type
        //ChequeData.BranchCode = BrCode;         // User Branch Code
        ChequeData.BOFD = "BOFD"
        ChequeData.IFSC = "IFSC"
        ChequeData.machineserialno = machineserialno;
        ChequeData.retrycount = "N";
        ChequeData.transaction_particular = trans_part_out;
        ChequeData.report_code = rpt_code_out;
        ChequeData.instrument_alpha = branch_out;
        ChequeData.remark_1 = remark_1_out;
        ChequeData.remark_2 = remark_2_out;
        ChequeData.rollback = "TRUE";
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

        if (Scanning_Type == "1" || Scanning_Type == "2" || Scanning_Type == "3") {
            for (i = 1; i < tableChequeData.rows.length; i++) {
                var objCells = tableChequeData.rows.item(i).cells;
                //debugger;
                if (objCells[9].innerHTML == "DI") {
                    SorterData.push({

                        AccountNo: objCells[0].innerHTML,
                        AccountNoConf: objCells[26].innerHTML,                         // Account No score
                        payeename: objCells[1].innerHTML,
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
                        transaction_particular: trans_part_out,
                        report_code: rpt_code_out,
                        instrument_alpha: branch_out,
                        remark_1: remark_1_out,
                        remark_2: remark_2_out,
                        trf_type: Scanning_Type,
                        BranchCode: Branchcode

                    });

                    count++;
                }
            }

            for (i = 1; i < tableChequeData.rows.length; i++) {
                var objCells = tableChequeData.rows.item(i).cells;
                if (objCells[9].innerHTML == "S" || objCells[9].innerHTML == "CI") {
                    SorterData.push({

                        AccountNo: objCells[0].innerHTML,
                        AccountNoConf: objCells[26].innerHTML,                         // Account No score
                        payeename: objCells[1].innerHTML,
                        ChequeDate: objCells[4].innerHTML,
                        ChequeDateConf: objCells[27].innerHTML,
                        ChequeAmount: objCells[2].innerHTML,
                        ChequeAmountConf: objCells[28].innerHTML,
                        //MICR: objCells[24].innerHTML.trim(),
                        //OCR: objCells[25].innerHTML.trim(),
                        InstrumentType: objCells[9].innerHTML,
                        //DocType: doctype,
                        SlipNo: count,                                // Slip no
                        ChequeNoMICR: objCells[5].innerHTML,
                        //SortCode: objCells[6].innerHTML,
                        //transCodeMICR: objCells[8].innerHTML,
                        //SanMICR: objCells[7].innerHTML,
                        DocNo: count,
                        FrontGray: objCells[12].innerHTML,
                        BackGray: objCells[12].innerHTML.replace(/BOT_RGB/g, backImg),
                        transaction_particular: trans_part_out,
                        report_code: rpt_code_out,
                        instrument_alpha: branch_out,
                        remark_1: remark_1_out,
                        remark_2: remark_2_out,
                        trf_type: Scanning_Type,
                        BranchCode: Branchcode
                    });

                    count++;
                }
            }
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

    function CheckerList() {
        window.open(rooturl + "Checker/Index", "_self");
    }

    function chq_focusout() {
        chq_validation = false;
        //setTableData();
        preCheckPancard();
    }

    function DeleteSuccess(data) {
        debugger;
        document.getElementById("tblChequeData").deleteRow(GlobalRowNo);
        $("#div_main_page").hide();

        deleted_row += 1;

        for (i = 1; i < tableChequeData.rows.length; i++) {
            var objCells = tableChequeData.rows.item(i).cells;
            var row_id = objCells[29].innerHTML;
            $("#tr_id_" + row_id).css('background-color', '');
        }
    }

}
catch (e) {
    alert(e.message);
}