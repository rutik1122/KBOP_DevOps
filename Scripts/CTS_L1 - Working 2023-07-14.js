try {

    // Used to store previous image src (Front img in particular)
    var tempSrc = "";
    var PerviousType = "";

    function getVoucherData() {
        //alert("getCvoucher data");

        debugger;

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);

        var data = {
            asdrf: "1234",
            pType: 'CTS',
            BankCode: BankCode,
            Intellerid: username
        };

        debugger;
        var jsonData = JSON.stringify(data);

        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
        
        debugger;

        document.getElementById("ProcessingBar").innerHTML = "Processing Request...";

        $("#ProcessingBar").show();
        var y = "getvoucherdetails";
        //debugger;
        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            //data: { pType: 'CTS', Intellerid: username, BankCode: BankCode },
            data: { Request_Data: encrypted_data },
            success: getSuccessVoucher,
            error: getError
        });

    }

    function getError(result) {
        //debugger;
        $("#ProcessingBar").show();
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

        var kVal = document.getElementById("KVal").value;
        var result = decryptJsonData(response_data, kVal);

        debugger;

        var currentDate = new Date();
        RefNo = "CTS" + currentDate.getFullYear() + String(currentDate.getUTCMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0') + String(currentDate.getSeconds()).padStart(2, '0');

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

        var slipCount = 0;
        var chqCount = 0;

        for (var i = 0; i < result.length; i++) {
            if (result[i].instrumenttype == "S")
                slipCount += 1;
            else if (result[i].instrumenttype == "C")
                chqCount += 1;

            if (machineserialno == "" || machineserialno == null)
                machineserialno = result[i].machineserialno;
        }

        //if (Scanning_Type == "1") {
        //    if (result[0].instrumenttype != "S") {
        //        document.getElementById("ProcessingBar").innerHTML = "Alert! First SLIP needs to be scanned! Please RESET the data!";
        //        return false;
        //    }
        //    else if (slipCount == 0) {
        //        document.getElementById("ProcessingBar").innerHTML = "Alert! Atleast one SLIP is mandatory";
        //        return false;
        //    }
        //    else if (slipCount > 1) {
        //        document.getElementById("ProcessingBar").innerHTML = "Alert! It can only accept one SLIP. Please RESET data!";
        //        return false;
        //    }
        //    else if (chqCount == 0) {
        //        document.getElementById("ProcessingBar").innerHTML = "Alert! Atleast one CHEQUE is mandatory";
        //        return false;
        //    }
        //}
        //else if (Scanning_Type == "2") {
        //    if (slipCount != 0) {
        //        document.getElementById("ProcessingBar").innerHTML = "Alert! It can only accept CHEQUE. Please RESET data!";
        //        return false;
        //    }
        //    else if (chqCount == 0) {
        //        document.getElementById("ProcessingBar").innerHTML = "Alert! Atleast one CHEQUE is mandatory";
        //        return false;
        //    }
        //}

        getListData(result);

        $("#ProcessingBar").hide();
    }

    function getListData(printer) {
        //debugger;

        // Iterate over the collection of data,below line for removing table data except header
        $("#tblChequeData").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
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
        //debugger;

        BrCode = print.SolID;

        var RetRow = '<tr id="tr_id_' + rowId + '">';

        if (Scanning_Type == "1" && print.instrumenttype == "S") {
            RetRow = RetRow +
                '<td style="text-align:center;font-size: 14px;">' + print.accno + '</td>' +
                '<td style="text-align:center;font-size: 14px;"></td>';
        }
        else if (Scanning_Type == "1" && print.instrumenttype == "C") {
            RetRow = RetRow +
                '<td style="text-align:center;font-size: 14px;"></td>' +
                '<td style="text-align:center;font-size: 14px;"></td>';
        }
        else if (Scanning_Type == "2" || Scanning_Type == "3") {
            RetRow = RetRow +
                '<td style="text-align:center;font-size: 14px;">' + print.accno + '</td>' +
                '<td style="text-align:center;font-size: 14px;"></td>';
        }

        if (Scanning_Type == "1") {
            if (print.instrumenttype == 'S')
                RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">' + print.totalamount + '</td>';
            else
                RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">0</td>';
        }
        else
            RetRow = RetRow + '<td style="text-align:center;font-size: 14px;" hidden>0</td>';

        if (print.instrumenttype == 'C')
            RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">' + print.amount + '</td>';
        else
            RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">0</td>';

        if (Scanning_Type == "1") {
            if (print.instrumenttype == 'S') {
                if (print.totalamount != null && print.totalamount != "") {
                    total_slip_amt += parseInt(print.totalamount);
                }
                else
                    total_slip_amt += 0;
                document.getElementById("total_slip_amt").value = total_slip_amt;
            }
            else if (print.instrumenttype == 'C') {
                if (print.amount != null && print.amount != "") {
                    total_chq_amt += parseInt(print.amount);
                }
                else
                    total_chq_amt += 0;
                document.getElementById("total_chq_amt").value = total_chq_amt;
            }
        }
        else if (Scanning_Type == "2" || Scanning_Type == "3") {
            if (print.amount != null && print.amount != "") {
                total_chq_amt += parseInt(print.amount);
            }
            else
                total_chq_amt += 0;
            document.getElementById("total_chq_amt").value = total_chq_amt;
        }

        RetRow = RetRow + '<td style="text-align:center;font-size: 14px;">' + print.chqdate + '</td>';

        if (print.instrumenttype == 'S') {
            RetRow = RetRow +
                '<td style="text-align:center;font-size: 14px;"></td>' +
                '<td style="text-align:center;font-size: 14px;"></td>' +
                '<td style="text-align:center;font-size: 14px;"></td>' +
                '<td style="text-align:center;font-size: 14px;"></td>';
        }
        else {
            RetRow = RetRow +
                '<td style="text-align:center;font-size: 14px;">' + print.cheqno + '</td>' +
                '<td style="text-align:center;font-size: 14px;">' + print.sortcode + '</td>' +
                '<td style="text-align:center;font-size: 14px;">' + print.san + '</td>' +
                '<td style="text-align:center;font-size: 14px;">' + print.trcode + '</td>';
        }

        RetRow = RetRow +
            '<td style="text-align:center;font-size: 14px;">' + print.instrumenttype + '</td>' +
            '<td style="text-align:center;font-size: 14px;" hidden>';

        //if (Scanning_Type == "1") {

        //}
        //else if (Scanning_Type == "2") {
        //    RetRow = RetRow +
        //        '<label class="badge bg-success" style="font-size: 100%;min-width: 110px !important;" id="pass_' + rowId + '">Passed</label>' +
        //        '<label class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;" id="fail_' + rowId + '">Failed</label>';
        //}

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
        if (print.instrumenttype == 'S') {
            RetRow = RetRow +
                '<td hidden><label id="IQA_' + rowId + '">PASS</label></td>' +
                '<td hidden><label id="UV_' + rowId + '">PASS</label></td>';

            //if (print.uvFlag == "000107") {
            //    RetRow = RetRow +
            //        '<td hidden><label id="UV_' + rowId + '">PASS</label></td>';
            //}
            //else {
            //    RetRow = RetRow +
            //        '<td hidden><label id="UV_' + rowId + '">FAIL</label></td>';
            //}

            RetRow = RetRow +
                '<td hidden><label id="IR_' + rowId + '">PASS</label></td>' +
                '<td hidden><label id="Micro_' + rowId + '">PASS</label></td>';
        }
        else if (print.instrumenttype == 'C') {
            RetRow = RetRow +
                '<td hidden><label id="IQA_' + rowId + '">' + print.iqatest + '</label></td>';

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
        }
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
            '<td hidden>' + print.id + '</td>';

        RetRow = RetRow + '</tr>';

        rowId += 1;

        return RetRow;

    }

    //function getAccDetails() {
    //    GetPayeee('CTS');
    //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("AccountNo").value;
    //}

    function setTableData() {

        //debugger;

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

        if (Scanning_Type == "1") {
            // CTS with SLIP
            if (inst_type == "S") {

                $("#div_accno").show();
                $("#Payeeee").show();
                $("#tr_acc_status").show();
                $("#tr_scheme_freeze").show();
                $("#tr_mop_nre").show();
                $("#tr_scheme_accowner").show();
                //debugger;
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = accno;
                if (accno == "" || accno == null || accno.toUpperCase() == "NULL") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Account No is null!";
                }
                else if (!accno.match(numbers)) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Only numeric values are allowed in Account No";
                }
                //else if (accStatus == "C - Closed" || accStatus == "D - Dormant" || accStatus == "I - Inactive" || accStatus =="S - Stop payment") {
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
                    if (BankCode == "240") {
                        var input_payeename = document.getElementById("input_payeename").value;
                        if (input_payeename == null || input_payeename == "") {
                            dataValid = false;
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
                            document.getElementById("errorMsg").innerHTML = "Manual Payee name is blank!";
                        }
                        else if (payeename.toUpperCase() != input_payeename.toUpperCase()) {
                            dataValid = false;
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
                            document.getElementById("errorMsg").innerHTML = "Manual Payee and Drop Down Payee Name is not matching!";
                        }
                        else {
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
                        }
                    }
                    else
                        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
                }
                else {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
                }
            }
            else if (inst_type == "C") {

                $("#div_accno").hide();
                $("#Payeeee").hide();
                $("#tr_acc_status").hide();
                $("#tr_scheme_freeze").hide();
                $("#tr_mop_nre").hide();
                $("#tr_scheme_accowner").hide();

                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = "";
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";
            }
        }
        else if (Scanning_Type == "2" || Scanning_Type == "3") {
            // CTS without SLIP

            $("#div_accno").show();
            $("#Payeeee").show();
            $("#tr_acc_status").show();
            $("#tr_scheme_freeze").show();
            $("#tr_mop_nre").show();
            $("#tr_scheme_accowner").show();

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

            if (BankCode == "240") {

                if (AccountValidation == false) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Account is " + accStatus;
                }

                //if (accStatus != "A - Active") {
                //    dataValid = false;
                //    document.getElementById("errorMsg").innerHTML = "Account is " + accStatus;
                //}
                //else if (dataValid == true && payeename != null && payeename != "") {
                //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
                //}
                //else {
                //    dataValid = false;
                //    document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
                //}

            }
            else {

                if (accStatus != "A - Active" && accStatus != "D - Dormant") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Account status is " + accStatus;
                }
                else if (dataValid == true && AccountValidation == false && AccountVal_ErrorMsg != "") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = AccountVal_ErrorMsg;
                }
                else if (dataValid == true && payeename != null && payeename != "") {
                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = payeename;
                }
                else {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Payee name is blank!";
                }

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

        debugger;
        if (dataValid == true && inst_type == "C" && (PostDated_status == false || StaleDated_status == false)) {
            var dateCheck = SetDate();
            if (dateCheck == false) {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "Date Field Issue!";
                //if (PostDated_status == false)
                //    document.getElementById("errorMsg").innerHTML = "Post Date Issue!";
                if (StaleDated_status == false)
                    document.getElementById("errorMsg").innerHTML = "Stale Date Issue!";
            }
        }

        if (inst_type == "C")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = document.getElementById("date").value;
        else
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = "";

        //debugger;
        // Amount validation
        var regexDecimalCount = /(?:\d*\.\d{1,2}|\d+)$/;
        var amtCheck = /^[-+]?[0-9]+\.[0-9]+$/;
        if (inst_type == "C") {

            var chqAmt = document.getElementById("chq_amt").value;

            if (dataValid == true) {
                if (chqAmt == null || chqAmt == "") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Cheque amount cannot be null!";
                }
                else if (!chqAmt.match(numbers)) {
                    if (parseInt(chqAmt) < 1) {
                        dataValid = false;
                        document.getElementById("errorMsg").innerHTML = "Enter valid Cheque amount!";
                    }
                    else if (!chqAmt.match(amtCheck)) {
                        dataValid = false;
                        document.getElementById("errorMsg").innerHTML = "Cheque amount can accept 2 decimal or numeric values!";

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
                    document.getElementById("errorMsg").innerHTML = "Enter valid cheque amount!";
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
        

        if (inst_type == "C") {
            var chqno = document.getElementById("id_chq").value;
            if (dataValid == true) {
                if (chqno == null || chqno == "") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Cheque No cannot be null!";
                }
                else if (chqno.length != 6) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Cheque No can only accept 6 digits!";
                }
                else if (chqno == "000000") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Enter valid cheque no!";
                }
                else if (!chqno.match(numbers)) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Only numbers are allowed in cheque no!";
                }
            }

            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = chqno;

            var sortcode = document.getElementById("id_sort").value;
            if (dataValid == true) {
                if (sortcode == null || sortcode == "") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Sort Code cannot be blank!";
                }
                else if (sortcode.length != 9) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Sort Code can only accept 9 digits!";
                }
                else if (sortcode == "000000000") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Enter valid Sort Code!";
                }
                else if (!sortcode.match(numbers)) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Only numbers are allowed in Sort Code!";
                }
            }

            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[6].innerHTML = sortcode;

            var san = document.getElementById("id_san").value;
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
                san = "000000";
            }

            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[7].innerHTML = san;

            var trCode = document.getElementById("id_tr").value;
            if (dataValid == true) {
                if (trCode == null || trCode == "") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Trans Code cannot be null!";
                }
                else if (trCode.length < 2 || trCode.length > 3) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Trans Code can only accept 2 or 3 digits!";
                }
                else if (trCode == "00" || trCode == "000") {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Enter valid Trans Code!";
                }
                else if (!trCode.match(numbers)) {
                    dataValid = false;
                    document.getElementById("errorMsg").innerHTML = "Only numbers are allowed in Trans Code!";
                }
            }

            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[8].innerHTML = trCode;
        }
        else {
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = "";
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[6].innerHTML = "";
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[7].innerHTML = "";
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[8].innerHTML = "";
        }

        // IQA
        //debugger;
        if (dataValid == true) {
            var iqa = document.getElementById("btn_iqa").checked;
            if (iqa == false && inst_type == "C") {
                dataValid = false;
                document.getElementById("errorMsg").innerHTML = "IQA Failed!";
            }
        }

        // UV
        if (dataValid == true) {
            var uv = document.getElementById("btn_uv").checked;
            if (uv == false && inst_type == "C") {
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


        //debugger;
        //if (PostDated_status == false) {
        //    $("#tr_id_" + GlobalRowNo).css('color', 'red');
        //    document.getElementById("valid_" + GlobalRowNo).innerHTML = "FALSE";
        //    document.getElementById("errorMsg").innerHTML = "Post Date Issue!";
        //}
        //else if (StaleDated_status == false) {
        //    $("#tr_id_" + GlobalRowNo).css('color', 'red');
        //    document.getElementById("valid_" + GlobalRowNo).innerHTML = "FALSE";
        //    document.getElementById("errorMsg").innerHTML = "Stale Date Issue!";
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
        var inst_val = document.getElementById("id_inst_type").checked;
        if (inst_val == false) {
            // Cheque
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "C";
            $("#div_micr").show();
            document.getElementById("lbl_inst_type").innerHTML = "Cheque";
            $("#tr_slip_amt").hide();
            $("#tr_date").show();
            $("#tr_chq_amt").show();
            document.getElementById("chq_amt").value = document.getElementById("slip_amt").value;
            var totalSlipAmt = document.getElementById("total_slip_amt").value;
            document.getElementById("total_slip_amt").value = totalSlipAmt - document.getElementById("slip_amt").value;
            document.getElementById("slip_amt").value = "0";

            //if (BankCode == "240") {
            //    if (Scanning_Type == "1")
            //        $("#tr_input_payeename").show();
            //    else
            //        $("#tr_input_payeename").hide();
            //}
            //else
            $("#tr_input_payeename").hide();
            $("#tr_iqa_uv").show();
        }
        else {
            // Slip
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML = "S";
            $("#div_micr").hide();
            document.getElementById("lbl_inst_type").innerHTML = "Slip";
            $("#tr_slip_amt").show();
            $("#tr_date").hide();
            $("#tr_chq_amt").hide();
            document.getElementById("slip_amt").value = document.getElementById("chq_amt").value;
            var totalchqAmt = document.getElementById("total_chq_amt").value;
            document.getElementById("total_chq_amt").value = totalchqAmt - document.getElementById("chq_amt").value;
            document.getElementById("chq_amt").value = "0";

            if (BankCode == "240") {
                if (Scanning_Type == "1")
                    $("#tr_input_payeename").show();
                else
                    $("#tr_input_payeename").hide();
            }
            else
                $("#tr_input_payeename").hide();

            $("#tr_iqa_uv").hide();
        }
        setTableData();
    }

    function validate_CTS_Data() {
        if (Scanning_Type == "1") {

        }
        else if (Scanning_Type == "2" || Scanning_Type == "3") {

        }
    }

    //function chqAmtChange(amt_type) {
    //    //debugger;
    //    if (amt_type == "SLIP") {
    //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = document.getElementById("slip_amt").value;

    //        var total = 0;

    //        for (i = 1; i < tableChequeData.rows.length; i++) {
    //            var amt = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[2].innerHTML;
    //            if (amt != null && amt != "")
    //                total += parseFloat(amt);
    //            else
    //                total += 0;
    //        }

    //        document.getElementById("total_slip_amt").value = total;
    //    }
    //    else if (amt_type == "CHQ") {
    //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[3].innerHTML = document.getElementById("chq_amt").value;

    //        var total = 0;

    //        for (i = 1; i < tableChequeData.rows.length; i++) {
    //            var amt = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[3].innerHTML;
    //            if (amt != null && amt != "")
    //                total += parseFloat(amt);
    //            else
    //                total += 0;
    //        }

    //        document.getElementById("total_chq_amt").value = total;
    //    }
        
    //}

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

        if (BankCode == "765") {
            $("#tbl_verf_fail").hide();
            $("#div_submit_fail").hide();
            $("#tbl_verf_pass").hide();
            $("#div_submit_pass").show();
            $("#tbl_verf_result").show();
            $("#div_response_success").hide();

            document.getElementById("successMsg").innerHTML = "Do you want to Submit the Record ?";
        }
        else {
            var payeename = "";
            for (i = 1; i < tableChequeData.rows.length; i++) {

                var objCells = tableChequeData.rows.item(i).cells;
                var row_id = objCells[29].innerHTML;

                if (document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML == "S")
                    slipCount += 1;
                else if (document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML == "C")
                    chqCount += 1;

                var status = document.getElementById("valid_" + row_id).innerHTML;
                if (status == "FALSE")
                    verifyDone = false;

                if (Scanning_Type == "1") {
                    if (document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML == "S")
                        payeename = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[1].innerHTML;
                }
                else if (Scanning_Type == "2" || Scanning_Type == "3") {
                    if (document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[9].innerHTML == "C")
                        payeename = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[1].innerHTML;
                }
            }

            var scanCount = true;
            if (verifyDone == true && scanCount == true && Scanning_Type == "1") {
                //if (result[0].instrumenttype != "S") {
                //    document.getElementById("errorMsg").innerHTML = "First SLIP needs to be scanned! Please RESET the data!";
                //    scanCount = false;
                //}
                //else
                if (slipCount == 0) {
                    document.getElementById("errorMsg").innerHTML = "Atleast one SLIP is mandatory";
                    scanCount = false;
                    return false;
                }
                else if (slipCount > 1) {
                    document.getElementById("errorMsg").innerHTML = "It can only accept one SLIP. Please RESET data!";
                    scanCount = false;
                    return false;
                }
                else if (chqCount == 0) {
                    document.getElementById("errorMsg").innerHTML = "Atleast one CHEQUE is mandatory";
                    scanCount = false;
                    return false;
                }
            }
            else if (verifyDone == true && scanCount == true && (Scanning_Type == "2" || Scanning_Type == "3")) {
                if (slipCount != 0) {
                    document.getElementById("errorMsg").innerHTML = "It can only accept CHEQUE. Please RESET data!";
                    scanCount = false;
                    return false;
                }
                else if (chqCount == 0) {
                    document.getElementById("errorMsg").innerHTML = "Atleast one CHEQUE is mandatory";
                    scanCount = false;
                    return false;
                }
            }

            var amtValid = true;
            if (verifyDone == true && amtValid == true && scanCount == true && Scanning_Type == "1") {
                var slipAmt = document.getElementById("total_slip_amt").value;
                var chqAmt = document.getElementById("total_chq_amt").value;

                if (slipAmt != chqAmt) {
                    document.getElementById("errorMsg").innerHTML = "Slip & Cheque amount not matching!";
                    amtValid = false;
                    return false;
                }
            }

            if (verifyDone == true && scanCount == true && amtValid == true) {
                $("#tbl_verf_fail").hide();
                $("#div_submit_fail").hide();
                $("#tbl_verf_pass").hide();
                $("#div_submit_pass").show();
                $("#tbl_verf_result").show();
                $("#div_response_success").hide();

                document.getElementById("successMsg").innerHTML = "Do you want to Submit the Record ?";

                //document.getElementById("name").innerHTML = payeename;

                //change_iqa();
                //change_uv();
                //change_ir();
                //change_ml();
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
                        else if (objCells[9].innerHTML == "C" && status == "FALSE")
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
        //RefNo = "CTS" + currentDate.getFullYear() + String(currentDate.getUTCMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0') + String(currentDate.getSeconds()).padStart(2, '0');

        //debugger;
        var ChequeData = {};

        ChequeData.pType = "CTS";
        ChequeData.response = "2";
        ChequeData.INtellerid = username;
        ChequeData.transtype = "CTS";
        ChequeData.transRefNo = RefNo;
        ChequeData.ClearingType = document.getElementById("ClearingType").value;
        ChequeData.ScanningType = Scanning_Type
        ChequeData.BranchCode = BrCode;         // User Branch Code
        ChequeData.BOFD = "BOFD"
        ChequeData.IFSC = "IFSC"
        ChequeData.machineserialno = machineserialno;
        ChequeData.retrycount = "Y";

        var SorterData = [];

        var backImg = 'TOP_RGB';

        var doctype = "";

        if (Scanning_Type == "1" || Scanning_Type == "2")
            doctype = "B";
        else if (Scanning_Type == "3")
            doctype = "C";

        var count = 1;

        var kVal = document.getElementById("KVal").value;
        var key = CryptoJS.enc.Utf8.parse(kVal);
        var iv = CryptoJS.enc.Utf8.parse(kVal);

        debugger;

        if (Scanning_Type == "1") {
            for (i = 1; i < tableChequeData.rows.length; i++) {
                var objCells = tableChequeData.rows.item(i).cells;
                //debugger;
                if (objCells[9].innerHTML == "S") {
                    
                    SorterData.push({

                        AccountNo: CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(objCells[0].innerHTML), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(),
                        AccountNoConf: objCells[26].innerHTML,                         // Account No score
                        payeename: CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(objCells[1].innerHTML), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(),
                        ChequeDate: objCells[4].innerHTML,
                        ChequeDateConf: objCells[27].innerHTML,
                        ChequeAmount: CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(objCells[2].innerHTML), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(),
                        ChequeAmountConf: objCells[28].innerHTML,
                        MICR: objCells[24].innerHTML.trim(),
                        OCR: objCells[25].innerHTML.trim(),
                        InstrumentType: objCells[9].innerHTML,

                        SlipNo: count,                                // Slip no

                        ChequeNoMICR: objCells[5].innerHTML,
                        SortCode: objCells[6].innerHTML,
                        transCodeMICR: objCells[8].innerHTML,
                        SanMICR: objCells[7].innerHTML,
                        DocNo: i,
                        FrontGray: objCells[12].innerHTML,
                        BackGray: objCells[12].innerHTML.replace(/BOT_RGB/g, backImg),
                        ClearingType: '01'
                    });

                    count++;
                }
                //if (objCells[9].innerHTML == "S") {
                //    SorterData.push({

                //        AccountNo: objCells[0].innerHTML,
                //        AccountNoConf: objCells[26].innerHTML,                         // Account No score
                //        payeename: objCells[1].innerHTML,
                //        ChequeDate: objCells[4].innerHTML,
                //        ChequeDateConf: objCells[27].innerHTML,
                //        ChequeAmount: objCells[2].innerHTML,
                //        ChequeAmountConf: objCells[28].innerHTML,
                //        MICR: objCells[24].innerHTML.trim(),
                //        OCR: objCells[25].innerHTML.trim(),
                //        InstrumentType: objCells[9].innerHTML,

                //        SlipNo: count,                                // Slip no

                //        ChequeNoMICR: objCells[5].innerHTML,
                //        SortCode: objCells[6].innerHTML,
                //        transCodeMICR: objCells[8].innerHTML,
                //        SanMICR: objCells[7].innerHTML,
                //        DocNo: i,
                //        FrontGray: objCells[12].innerHTML,
                //        BackGray: objCells[12].innerHTML.replace(/BOT_RGB/g, backImg)
                //    });

                //    count++;
                //}
            }

            for (i = 1; i < tableChequeData.rows.length; i++) {
                var objCells = tableChequeData.rows.item(i).cells;
                if (objCells[9].innerHTML == "C") {
                    SorterData.push({

                        AccountNo: CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(objCells[0].innerHTML), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(),
                        AccountNoConf: objCells[26].innerHTML,                         // Account No score
                        payeename: CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(objCells[1].innerHTML), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(),
                        ChequeDate: objCells[4].innerHTML,
                        ChequeDateConf: objCells[27].innerHTML,
                        ChequeAmount: CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(objCells[3].innerHTML), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(),
                        ChequeAmountConf: objCells[28].innerHTML,
                        MICR: objCells[24].innerHTML.trim(),
                        OCR: objCells[25].innerHTML.trim(),
                        InstrumentType: objCells[9].innerHTML,
                        DocType: doctype,
                        SlipNo: count,                                // Slip no

                        ChequeNoMICR: objCells[5].innerHTML,
                        SortCode: objCells[6].innerHTML,
                        transCodeMICR: objCells[8].innerHTML,
                        SanMICR: objCells[7].innerHTML,
                        DocNo: i,
                        FrontGray: objCells[12].innerHTML,
                        BackGray: objCells[12].innerHTML.replace(/BOT_RGB/g, backImg),
                        ClearingType: '01'
                    });

                    count++;
                }
                //if (objCells[9].innerHTML == "C") {
                //    SorterData.push({

                //        AccountNo: objCells[0].innerHTML,
                //        AccountNoConf: objCells[26].innerHTML,                         // Account No score
                //        payeename: objCells[1].innerHTML,
                //        ChequeDate: objCells[4].innerHTML,
                //        ChequeDateConf: objCells[27].innerHTML,
                //        ChequeAmount: objCells[3].innerHTML,
                //        ChequeAmountConf: objCells[28].innerHTML,
                //        MICR: objCells[24].innerHTML.trim(),
                //        OCR: objCells[25].innerHTML.trim(),
                //        InstrumentType: objCells[9].innerHTML,
                //        DocType: doctype,
                //        SlipNo: count,                                // Slip no

                //        ChequeNoMICR: objCells[5].innerHTML,
                //        SortCode: objCells[6].innerHTML,
                //        transCodeMICR: objCells[8].innerHTML,
                //        SanMICR: objCells[7].innerHTML,
                //        DocNo: i,
                //        FrontGray: objCells[12].innerHTML,
                //        BackGray: objCells[12].innerHTML.replace(/BOT_RGB/g, backImg)
                //    });

                //    count++;
                //}
            }
        }
        else if (Scanning_Type == "2" || Scanning_Type == "3") {
            for (i = 1; i < tableChequeData.rows.length; i++) {

                var objCells = tableChequeData.rows.item(i).cells;
                //debugger;

                SorterData.push({

                    AccountNo: CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(objCells[0].innerHTML), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(),
                    AccountNoConf: objCells[26].innerHTML,                         // Account No score
                    payeename: CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(objCells[1].innerHTML), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(),
                    ChequeDate: objCells[4].innerHTML,
                    ChequeDateConf: objCells[27].innerHTML,
                    ChequeAmount: CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(objCells[3].innerHTML), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(),
                    ChequeAmountConf: objCells[28].innerHTML,
                    MICR: objCells[24].innerHTML.trim(),
                    OCR: objCells[25].innerHTML.trim(),
                    InstrumentType: objCells[9].innerHTML,
                    DocType: doctype,
                    SlipNo: count,                                // Slip no

                    ChequeNoMICR: objCells[5].innerHTML,
                    SortCode: objCells[6].innerHTML,
                    transCodeMICR: objCells[8].innerHTML,
                    SanMICR: objCells[7].innerHTML,
                    DocNo: i,
                    FrontGray: objCells[12].innerHTML,
                    BackGray: objCells[12].innerHTML.replace(/BOT_RGB/g, backImg),
                    ClearingType: '01'
                });

                count++;

                //SorterData.push({

                //    AccountNo: objCells[0].innerHTML,
                //    AccountNoConf: objCells[26].innerHTML,                         // Account No score
                //    payeename: objCells[1].innerHTML,
                //    ChequeDate: objCells[4].innerHTML,
                //    ChequeDateConf: objCells[27].innerHTML,
                //    ChequeAmount: objCells[3].innerHTML,
                //    ChequeAmountConf: objCells[28].innerHTML,
                //    MICR: objCells[24].innerHTML.trim(),
                //    OCR: objCells[25].innerHTML.trim(),
                //    InstrumentType: objCells[9].innerHTML,
                //    DocType: doctype,
                //    SlipNo: count,                                // Slip no

                //    ChequeNoMICR: objCells[5].innerHTML,
                //    SortCode: objCells[6].innerHTML,
                //    transCodeMICR: objCells[8].innerHTML,
                //    SanMICR: objCells[7].innerHTML,
                //    DocNo: i,
                //    FrontGray: objCells[12].innerHTML,
                //    BackGray: objCells[12].innerHTML.replace(/BOT_RGB/g, backImg)
                //});

                //count++;
                //debugger;

            }
        }

        debugger;

        

        var jsonData_SorterData = JSON.stringify(SorterData);
        var encrypted_data_SorterData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData_SorterData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        var jsonData_ChequeData = JSON.stringify(ChequeData);
        var encrypted_data_ChequeData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData_ChequeData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        debugger;
        var y = "postctsdata";
        $.ajax({
            type: 'POST',
            url: x + y,
            headers: authHeaders,
            crossDomain: true,
            data: { SorterData: SorterData, ChequeData: ChequeData },
            //data: { SorterData: encrypted_data_SorterData, ChequeData: encrypted_data_ChequeData },
            success: getSuccessPostCts,
            error: getErrorPostCts
        });

    }

    function getErrorPostCts(result) {
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

    function getSuccessPostCts(result) {
        //debugger;
        $("#tbl_verf_fail").hide();
        $("#div_submit_fail").hide();
        $("#tbl_verf_pass").hide();
        $("#div_submit_pass").hide();
        $("#tbl_verf_result").show();
        $("#div_response_success").show();

        document.getElementById("successMsg").innerHTML = "Success! Ref: " + RefNo;
    }

    function CheckImgFlip() {
        //debugger;
        var inst_type = document.getElementById("id_inst_type").checked;
        if (inst_type == false && Scanning_Type == "2") {
            document.getElementById("optionsRadios2").checked = true;
            switchimage('backGimg', 'TOP_RGB');
        }
        
    }

    function CheckImgFlip_Front() {
        //debugger;
        var inst_type = document.getElementById("id_inst_type").checked;
        if (inst_type == false && Scanning_Type == "2") {
            document.getElementById("optionsRadios1").checked = true;
            switchimage('backGimg', 'BOT_RGB');
        }

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