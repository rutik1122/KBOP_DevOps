try {

    var tempSrc = "";
    var PerviousType = "";

    function getVoucherData() {
        //alert("getCvoucher data");

        document.getElementById("ProcessingBar").innerHTML = "Processing Request...";

        $("#ProcessingBar").show();
        var y = "getvoucherdetails";
       //debugger;
        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            data: { pType: 'TRF', Intellerid: username, trf_type: Scanning_Type },
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

    function getSuccessVoucher(result) {
        debugger;

        var y = "ReportCodeList";

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            success: ReportCodeList,
            error: ErrorReportCode
        });

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

        BrCode = print.SolID;

        var RetRow = '<tr id="tr_id_' + rowId + '">';

        if (Scanning_Type == "" || Scanning_Type == null) {
           //debugger;
            if (print.transtype == "TRF03") {
                Scanning_Type = "3";
                transtype = "TRF03";
                document.getElementById("spam_header").innerHTML = "Transfer Rollback - Cheque with Slip";
            }
            else if (print.transtype == "TRF04") {
                Scanning_Type = "4";
                transtype = "TRF04";
                document.getElementById("spam_header").innerHTML = "Transfer Rollback - Withdrawal Form With Slip";
            }
            else if (print.transtype == "TRF05") {
                Scanning_Type = "5";
                transtype = "TRF05";
                document.getElementById("spam_header").innerHTML = "Transfer Rollback - Debit Intimation With Slip";
            }
            else if (print.transtype == "TRF06") {
                Scanning_Type = "6";
                transtype = "TRF06";
                document.getElementById("spam_header").innerHTML = "Transfer Rollback(Multiple Credit) - Debit Intimation With Slip";
            }
            else if (print.transtype == "TRF07") {
                Scanning_Type = "7";
                transtype = "TRF07";
                document.getElementById("spam_header").innerHTML = "Transfer Rollback(Multiple Credit) - Debit Intimation With Slip";
            }
            else if (print.transtype == "TRF08") {
                Scanning_Type = "8";
                transtype = "TRF08";
                document.getElementById("spam_header").innerHTML = "Transfer Rollback(Multiple Credit) - Debit Intimation With Slip";
            }

            document.getElementById("rollback").value = print.RejectDesc;
        }

        if (Scanning_Type == "3" || Scanning_Type == "4" || Scanning_Type == "5" || Scanning_Type == "6"
            || Scanning_Type == "7" || Scanning_Type == "8") {
            if (print.InstrumentType == "S") {
                RetRow = RetRow +
                    '<td style="text-align:center;font-size: 14px;">' + print.CreditAccountNo + '</td>' +
                    '<td style="text-align:center;font-size: 14px;">' + print.PayeeName + '</td>' +
                    '<td style="text-align:center;font-size: 14px;">' + print.ChqAmount + '</td>' +
                    '<td style="text-align:center;font-size: 14px;">0</td>';
            }
            else if (print.InstrumentType == "C" || print.InstrumentType == "WF" || print.InstrumentType == "DI") {
                RetRow = RetRow +
                    '<td style="text-align:center;font-size: 14px;">' + print.DebitAccountNo + '</td>' +
                    '<td style="text-align:center;font-size: 14px;">' + print.PayeeName + '</td>' +
                    '<td style="text-align:center;font-size: 14px;">0</td>' +
                    '<td style="text-align:center;font-size: 14px;">' + print.ChqAmount + '</td>';
            }
        }

        if (print.InstrumentType == 'S') {
            if (print.ChqAmount != null && print.ChqAmount != "") {
                total_slip_amt += parseInt(print.ChqAmount);
            }
            else
                total_slip_amt += 0;
            document.getElementById("total_slip_amt").value = total_slip_amt;
        }
        else if (print.InstrumentType == 'C' || print.InstrumentType == 'WF' || print.InstrumentType == 'DI') {
            if (print.ChqAmount != null && print.ChqAmount != "") {
                total_chq_amt += parseInt(print.ChqAmount);
            }
            else
                total_chq_amt += 0;
            document.getElementById("total_chq_amt").value = total_chq_amt;
        }

        RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">' + print.ChqDate + '</td>';

        if (print.InstrumentType == 'S') {
            RetRow = RetRow +
                '<td style="text-align:center;font-size: 14px;"></td>' +
                '<td style="text-align:center;font-size: 14px;" hidden></td>' +
                '<td style="text-align:center;font-size: 14px;" hidden></td>' +
                '<td style="text-align:center;font-size: 14px;" hidden></td>';
        }
        else {
            RetRow = RetRow +
                '<td style="text-align:center;font-size: 14px;">' + print.chqno + '</td>' +
                '<td style="text-align:center;font-size: 14px;" hidden></td>' +
                '<td style="text-align:center;font-size: 14px;" hidden>' + print.San + '</td>' +
                '<td style="text-align:center;font-size: 14px;" hidden>' + print.transCode + '</td>';
        }

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
            '<td hidden>' + print.transaction_particular + '</td>' +
            '<td hidden>' + print.Count_Id + '</td>' +
            '<td hidden>' + print.id + '</td>' +
            '<td hidden>FALSE</td>';

        RetRow = RetRow +
            '<td hidden>' + print.report_code +'</td>' +
            '<td hidden>' + print.remark_1 +'</td>' +
            '<td hidden>' + print.remark_2 +'</td>';

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
        if (Scanning_Type == "3" || Scanning_Type == "6")
            dataname = "Cheque";
        else if (Scanning_Type == "4" || Scanning_Type == "7")
            dataname = "Withdrawal Form";
        else if (Scanning_Type == "5" || Scanning_Type == "8")
            dataname = "Debit Intimation";

        var dataValid = true;
        $("#tbl_verf_pass").hide();
        $("#tbl_verf_fail").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();

        // success resp
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        var numbers = /^[0-9]+$/;
        var inst_type = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML;

        var accStatus = document.getElementById("accStatus").innerHTML;
        var payeename = document.getElementById("PayeeName").value;
        var accno = document.getElementById("AccountNo").value;

        var AccNoMinLength = document.getElementById("AccNoMinLength").value;
        var AccNoMaxLength = document.getElementById("AccNoMaxLength").value;

        if (Scanning_Type == "3" || Scanning_Type == "4" || Scanning_Type == "5" || Scanning_Type == "6"
            || Scanning_Type == "7" || Scanning_Type == "8") {
            // CTS without SLIP

            $("#div_accno").show();
            $("#Payeeee").show();
            $("#tr_acc_status").show();
            $("#tr_scheme_freeze").show();
            $("#tr_mop_nre").show();
            $("#tr_scheme_accowner").show();

            if (inst_type == "C") {
                document.getElementById("id_chq").disabled = false;
            }
            else if (inst_type == "S") {
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
            if (accStatus != "A - Active") {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = accStatus;
            }
            else if (dataValid == true && payeename != null && payeename != "") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
            }
            else {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
            }

        }

        
        

        // Date
       //debugger;
        if (dataValid == true && inst_type == "C") {
            if (DateValidation(document.getElementById("date").value, true) == false) {
               //debugger;
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = ErrorMessage;
            }
           //debugger;
        }
        else if (dataValid == true && (inst_type == "WF" || inst_type == "DI")) {
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

        if (inst_type == "C" || inst_type == "WF" || inst_type == "DI")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = document.getElementById("date").value;
        else
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = "";

       //debugger;
        // Amount validation
        var regexDecimalCount = /(?:\d*\.\d{1,2}|\d+)$/;
        var amtCheck = /^[-+]?[0-9]+\.[0-9]+$/;
        if (inst_type == "C" || inst_type == "WF" || inst_type == "DI") {

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

            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = "0";
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[3].innerHTML = chqAmt;

            chqAmtChange('CHQ');
        }
        else {
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
        
        var tran1 = document.getElementById("transPart").value;
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML = tran1;
        if (dataValid == true && (tran1 == null || tran1 == "")) {
            dataValid = false;
            document.getElementById("errorMsg").innerHTML = "Transaction particulars is mandatory!";
        }

        //Report Code
        debugger;
        var report = document.getElementById("rpt_code").value;
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[34].innerHTML = report;
        var nreAcc = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[21].innerHTML;
        if (dataValid == true && nreAcc == "Y" && report == "0") {
            dataValid = false;
            document.getElementById("errorMsg").innerHTML = "Report Code is mandatory for NRE Account!";
        }

        //Remark
        if (inst_type == "C" || inst_type == "WF" || inst_type == "DI") {
            var remark1 = document.getElementById("remark_1").value;
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[35].innerHTML = remark1;

            var remark2 = document.getElementById("remark_2").value;
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[36].innerHTML = remark2;
        }

        if (inst_type == "S") {
            //var remark1 = document.getElementById("remark_1_1").value;
            var remark1 = document.getElementById("remark_1").value;
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[35].innerHTML = remark1;

            //var remark2 = document.getElementById("remark_2_2").value;
            var remark2 = document.getElementById("remark_2").value;
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[36].innerHTML = remark2;
        }

        var chqno = document.getElementById("id_chq").value;
        if (dataValid == true) {
            if (Scanning_Type == "3") {
                if (inst_type == "C" && ChequeValidation(chqno) == false) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = ErrorMessage;
                }
            }
            //else if (Scanning_Type == "4") {
            //    if (ValidateWithdrawalFormNo(chqno) == false) {
            //        dataValid = false;
            //        document.getElementById("errorMsg").innerHTML = ErrorMessage;
            //    }
            //}
            ////if ((chqno == null || chqno == "") && inst_type == "C" && (Scanning_Type == "3" || Scanning_Type == "4")) {
            ////    dataValid = false;
            ////    document.getElementById("errorMsg").innerHTML = "Inst. Srl No cannot be null!";
            ////}
            ////else if (chqno.length != 6 && inst_type == "C" && Scanning_Type == "3") {
            ////    dataValid = false;
            ////    document.getElementById("errorMsg").innerHTML = "Inst. Srl No can only accept 6 digits!";
            ////}
            //////else if (chqno.length < 3 && inst_type == "S") {
            //////    dataValid = false;
            //////    document.getElementById("errorMsg").innerHTML = "Min 3 digit Inst. Srl No!";
            //////}
            ////else if (!chqno.match(numbers) && inst_type == "C" && (Scanning_Type == "3" || Scanning_Type == "4")) {
            ////    dataValid = false;
            ////    document.getElementById("errorMsg").innerHTML = "Only numbers are allowed in Inst. Srl No!";
            ////}
            else if (chq_validation == false) {
                var chequeVal = document.getElementById("Pancard_Verf").value;
                if (chequeVal == "Y") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Cheque Validation failed: " + chq_validation_msg;
                }
                else
                    chq_validation = true;
            }
        }
        if (inst_type == "C")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = chqno;
        else if (inst_type == "S")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = "";

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
            if (uv == false) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "UV Failed!";
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
        debugger;
        //var VerfSign0 = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML;
        //var VerfSign1 = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[29].innerHTML;
        //var VerfSign2 = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML;
        //var VerfSign3 = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[31].innerHTML;
        //var VerfSign4 = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[32].innerHTML;
        var VerfSign = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML;
        if (dataValid == true && VerfSign.toUpperCase() == "FALSE" && inst_type == "C") {
            dataValid = false;
            document.getElementById("errorMsg").innerHTML = "Signature Verfication Pending!";
        }

        //if (dataValid == false) {
        //    //verfPending = true;
        //    $("#tr_id_" + GlobalRowNo).css('color', 'red');
        //    document.getElementById("valid_" + GlobalRowNo).innerHTML = "FALSE";
        //}
        //else {
        //    //verfPending = false;
        //    //$("#tr_id_" + GlobalRowNo).css('color', '#03C988');
        //    $("#tr_id_" + GlobalRowNo).css('color', '#00A300');
        //    document.getElementById("errorMsg").innerHTML = "";
        //    document.getElementById("valid_" + GlobalRowNo).innerHTML = "TRUE";
        //}
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
            /*document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "C";*/
            //$("#div_micr").show();
            if (Scanning_Type == "3" || Scanning_Type == "6") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "C";
                document.getElementById("lbl_inst_type").innerHTML = "Cheque";
            }
            else if (Scanning_Type == "4" || Scanning_Type == "7") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "WF";
                document.getElementById("lbl_inst_type").innerHTML = "Withdrawal Form";
            }

            else if (Scanning_Type == "5" || Scanning_Type == "8") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "DI";
                document.getElementById("lbl_inst_type").innerHTML = "Debit Intimation";
            }
                
            else
                document.getElementById("lbl_inst_type").innerHTML = "Not Defined";

            $("#tr_slip_amt").hide();
            $("#tr_date").show();
            $("#tr_chq_amt").show();

            document.getElementById("chq_amt").value = document.getElementById("slip_amt").value;
            var totalSlipAmt = document.getElementById("total_slip_amt").value;
            document.getElementById("total_slip_amt").value = totalSlipAmt - document.getElementById("slip_amt").value;
            document.getElementById("slip_amt").value = "0";

            if (transtype == "TRF03" || transtype == "TRF06") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "FALSE";
            }
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

        var verifyDone = true;
        var slipCount = 0;
        var chqCount = 0;
        var instr_type = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML;
        var payeename = "";
        for (i = 1; i < tableChequeData.rows.length; i++) {

            var objCells = tableChequeData.rows.item(i).cells;
            var row_id = objCells[29].innerHTML;

            var instVal = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML;
            if (instVal == "S")
                slipCount += 1;
            else if (instVal == "C" || instVal == "WF" || instVal == "DI")
                chqCount += 1;

            var status = document.getElementById("valid_" + row_id).innerHTML;
            if (status == "FALSE")
                verifyDone = false;

            if (Scanning_Type == "3" || Scanning_Type == "4" || Scanning_Type == "5" || Scanning_Type == "6" ||
                Scanning_Type == "7" || Scanning_Type == "8") {
                if (document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML == "C")
                    payeename = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[1].innerHTML;
            }
        }


       //debugger;
        var scanCount = true;
        if (verifyDone == true) {
            if (chqCount == 0) {
                if (Scanning_Type == "3" || Scanning_Type == "6")
                    document.getElementById("errorMsg").innerHTML = "Atleast one CHEQUE is mandatory!";
                else if (Scanning_Type == "4" || Scanning_Type == "7")
                    document.getElementById("errorMsg").innerHTML = "Atleast one Withdrawal Form is mandatory!";
                else if (Scanning_Type == "5" || Scanning_Type == "8")
                    document.getElementById("errorMsg").innerHTML = "Atleast one Debit Intimation is mandatory!";
                scanCount = false;
            }
            else if (chqCount > 1) {
                if (Scanning_Type == "3" || Scanning_Type == "6")
                    document.getElementById("errorMsg").innerHTML = "Only one Cheque is required!";
                else if (Scanning_Type == "4" || Scanning_Type == "7")
                    document.getElementById("errorMsg").innerHTML = "Only one Withdrawal Form is required!";
                else if (Scanning_Type == "5" || Scanning_Type == "8")
                    document.getElementById("errorMsg").innerHTML = "Only one Debit Intimation is required!";
                scanCount = false;
            }
            else if (slipCount == 0) {
                document.getElementById("errorMsg").innerHTML = "Atleast one SLIP is mandatory!";
                scanCount = false;
            }

        }

        var amtValid = true;
        if (verifyDone == true && scanCount == true) {
            var slipAmt = document.getElementById("total_slip_amt").value;
            var chqAmt = document.getElementById("total_chq_amt").value;

            if (slipAmt != chqAmt) {
                if (Scanning_Type == "3" || Scanning_Type == "6")
                    document.getElementById("errorMsg").innerHTML = "Cheque & Slip amount not matching!";
                else if (Scanning_Type == "4" || Scanning_Type == "7")
                    document.getElementById("errorMsg").innerHTML = "Withdrawal Form & Slip amount not matching!";
                else if (Scanning_Type == "5" || Scanning_Type == "8")
                    document.getElementById("errorMsg").innerHTML = "Debit Intimation & Slip amount not matching!";
                amtValid = false;
            }
        }

        var accvalid = true;
        if (verifyDone == true && scanCount == true && amtValid == true) {
           //debugger;
            for (i = 1; i < tableChequeData.rows.length; i++) {

                var objCells1 = tableChequeData.rows.item(i).cells;
                var acc1 = objCells1[0].innerHTML;

                for (j = 1; j < tableChequeData.rows.length; j++) {

                    var objCells2 = tableChequeData.rows.item(j).cells;
                    var acc2 = objCells2[0].innerHTML;

                    if (i != j && acc1 == acc2) {
                        if (Scanning_Type == "3" || Scanning_Type == "6")
                            document.getElementById("errorMsg").innerHTML = "Cheque & Slip Acc No. is same!";
                        else if (Scanning_Type == "4" || Scanning_Type == "7")
                            document.getElementById("errorMsg").innerHTML = "Withdrawal Form & Slip Acc No. is same!";
                        else if (Scanning_Type == "5" || Scanning_Type == "8")
                            document.getElementById("errorMsg").innerHTML = "Debit Intimation & Slip Acc No. is same!";
                        accvalid = false;
                    }

                }

            }
        }

        var otherVerf = true;
        if (verifyDone == true && scanCount == true && amtValid == true && accvalid == true) {
            alpha_out = document.getElementById("id_alpha").value;
            //if (alpha_out == "" || alpha_out == null) {
            //    document.getElementById("errorMsg").innerHTML = "Instrument Alpha is mandatory!";
            //    otherVerf = false;
            //}

            trans_part_out = document.getElementById("transPart").value;
            //if (trans_part_out == "" || trans_part_out == null) {
            //    document.getElementById("errorMsg").innerHTML = "Transaction particulars is mandatory!";
            //    otherVerf = false;
            //}

            rpt_code_out = document.getElementById("rpt_code").value;
            //if (otherVerf == true && rpt_code == "0" && NRE_Flag == "Y") {
            //    document.getElementById("errorMsg").innerHTML = "Report Code is mandatory!";
            //    otherVerf = false;
            //}

            var slipAmt = document.getElementById("total_slip_amt").value;
            if (ValidateAccBalance == "Y") {
                if (AccBalance != "" && AccBalance != null) {
                    if (parseFloat(slipAmt) > parseFloat(AccBalance)) {
                        document.getElementById("errorMsg").innerHTML = "Balance Insufficient";
                        return false;
                    }
                }
            }
        }

        if (verifyDone == true && scanCount == true && amtValid == true && accvalid == true && otherVerf == true) {
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
                    var status = document.getElementById("valid_" + i).innerHTML;

                    if (objCells[9].innerHTML == "S" && status == "FALSE")
                        slipCount += 1;
                    else if ((objCells[9].innerHTML == "C" || objCells[9].innerHTML == "WF" || objCells[9].innerHTML == "DI") && status == "FALSE")
                        chqCount += 1;
                }

                msg = "Verification Pending for ";

                if (slipCount > 0)
                    msg = msg + slipCount + " Slip ";
                else if (chqCount > 0)
                    msg = msg + chqCount + " Cheque";

                document.getElementById("errorMsg").innerHTML = msg;
            }

        }

    }

    function DataPush() {
       debugger;
        $("#tbl_verf_fail").hide();
        $("#div_submit_fail").hide();
        $("#tbl_verf_pass").hide();
        $("#div_submit_pass").hide();
        $("#tbl_verf_result").show();
        $("#div_response_success").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";

        var currentDate = new Date();
        //RefNo = "TRF" + currentDate.getFullYear() + String(currentDate.getUTCMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0') + String(currentDate.getSeconds()).padStart(2, '0');

       //debugger;
        var amt = document.getElementById("total_chq_amt").value;
        var l2start = parseFloat(document.getElementById("L2StartLimit").value);
        var CheckerModule = document.getElementById("CheckerModule").value;
        var data_amt = parseFloat(amt);
        var response = "";

        if (CheckerModule != "Y")
            response = "2";
        else if (data_amt >= parseFloat(l2start))
            response = "2";
        else
            response = "22";

       //debugger;
        var ChequeData = {};

        //remark_1_out = document.getElementById("remark_1").value;
        //remark_2_out = document.getElementById("remark_2").value;

        var Branchcode = document.getElementById("branchcode").value;

        ChequeData.pType = "TRF";
        ChequeData.response = response;
        ChequeData.INtellerid = username;
        //ChequeData.transtype = "TRF";
        ChequeData.transtype = transtype;
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
        ChequeData.instrument_alpha = alpha_out;
        ChequeData.remark_1 = "qw";
        ChequeData.remark_2 = "qwq";
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

        

        if (Scanning_Type == "3" || Scanning_Type == "4" || Scanning_Type == "5" || Scanning_Type == "6" || 
            Scanning_Type == "7" || Scanning_Type == "8") {
            for (i = 1; i < tableChequeData.rows.length; i++) {
                var objCells = tableChequeData.rows.item(i).cells;
               //debugger;
                if (objCells[9].innerHTML == "C" || objCells[9].innerHTML == "WF" || objCells[9].innerHTML == "DI") {
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
                        /*transaction_particular: trans_part_out,*/
                        transaction_particular: objCells[30].innerHTML,
                        report_code: objCells[34].innerHTML,
                        instrument_alpha: alpha_out,
                        remark_1: objCells[35].innerHTML,
                        remark_2: objCells[36].innerHTML,
                        trf_type: Scanning_Type,
                        BranchCode: Branchcode

                    });

                    count++;
                }
            }

            for (i = 1; i < tableChequeData.rows.length; i++) {
                var objCells = tableChequeData.rows.item(i).cells;
                if (objCells[9].innerHTML == "S") {
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
                        transaction_particular: objCells[30].innerHTML,
                        report_code: objCells[34].innerHTML,
                        instrument_alpha: alpha_out,
                        remark_1: objCells[35].innerHTML,
                        remark_2: objCells[36].innerHTML,
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

    function chq_focusout() {
        chq_validation = false;
        //setTableData();
        preCheckPancard();
    }

    function CheckerList() {
        window.open(rooturl + "Checker/Index", "_self");
    }

}
catch (e) {
    alert(e.message);
}