try {

    function GetList() {
        debugger;
        document.getElementById("ProcessingBar").innerHTML = "Processing Request...";
        $("#ProcessingBar").show();

        var trans_type = document.getElementById("Transaction_Type").value;
        //var bankcode = document.getElementById("bankcode").value;

        $("#div_cash_deposit").hide();
        $("#div_cash_withdraw").hide();
        $("#div_cash_transfer_03_04_05").hide();
        $("#div_cash_debit_intimation_06_07").hide();
        $("#div_cash_credit_intimation_08_09_10").hide();
        $("#div_rtgs_cheque_03_04").hide();

        CheckerModule = document.getElementById("CheckerModule").value;
        L2StartLimit = document.getElementById("L2StartLimit").value;
        CheckerModule_L3 = document.getElementById("CheckerModule_L3").value;
        l3startlimit = document.getElementById("l3startlimit").value;
        debugger;
        bankcode = document.getElementById("bankcode").value;
        Branchcode = document.getElementById("branchcodehidden").value;
        var y = 'getCheckerWithdrawList';

        // Deposit
        if (trans_type == "01") {

            $.ajax({
                url: x + y,
                type: 'POST',
                data: { UserType: document.getElementById("usertype").value, BankCode: bankcode, BranchCode: Branchcode, Verf: 'CASHDEP', trf_type: 'CASHDEP' },
                success: getListData_deposit,
                error: getError
            });
        }
        // Withdraw
        else if (trans_type == "02") {

            $.ajax({
                url: x + y,
                type: 'POST',
                data: { UserType: document.getElementById("usertype").value, BankCode: bankcode, BranchCode: Branchcode, Verf: 'CASHWDL', trf_type: 'CASHWDL' },
                success: getListData_withdraw,
                error: getError
            });
        }
        // Transfer Cheque
        else if (trans_type == "TRF02" || trans_type == "03" || trans_type == "04" || trans_type == "05" ||
                 trans_type == "TRF06" || trans_type == "TRF07" || trans_type == "TRF08") {

            if (trans_type == "TRF02") {
                document.getElementById("h5_trf").innerHTML = "Transfer Cheque Without Slip";
                trfType = trans_type;
            }
            else if (trans_type == "03") {
                document.getElementById("h5_trf").innerHTML = "Transfer Cheque With Slip";
                //trfType = "TRF_CHQ";
                trfType = "TRF03";
            }
            else if (trans_type == "04") {
                document.getElementById("h5_trf").innerHTML = "Transfer Withdrawal Form With Slip";
                //trfType = "TRF_WF";
                trfType = "TRF04";
            }
            else if (trans_type == "05") {
                document.getElementById("h5_trf").innerHTML = "Transfer Debit Intimation With Slip";
                //trfType = "TRF_DI";
                trfType = "TRF05";
            }
            else if (trans_type == "TRF06") {
                document.getElementById("h5_trf").innerHTML = "Transfer Checker(Multiple Credit) - Cheque With Slip";
                trfType = trans_type;
            }
            else if (trans_type == "TRF07") {
                document.getElementById("h5_trf").innerHTML = "Transfer Checker(Multiple Credit) - Withdrawal Form With Slip";
                trfType = trans_type;
            }
            else if (trans_type == "TRF08") {
                document.getElementById("h5_trf").innerHTML = "Transfer Checker(Multiple Credit) - Debit Intimation With Slip";
                trfType = trans_type;
            }


            $.ajax({
                url: x + y,
                type: 'POST',
                data: { UserType: document.getElementById("usertype").value, BankCode: bankcode, BranchCode: Branchcode, Verf: 'TRF', trf_type: trfType },
                success: getListData_transfer_03_04_05,
                error: getError
            });
        }
        else if (trans_type == "DI01" || trans_type == "06" || trans_type == "07") {
            if (trans_type == "DI01") {
                document.getElementById("h5_trf").innerHTML = "Debit Intimation With Cash";
                trfType = "DI01";
            }
            if (trans_type == "06") {
                document.getElementById("h5_trf").innerHTML = "Debit Intimation With Slip";
                trfType = "DI02";
            }
            else if (trans_type == "07") {
                document.getElementById("h5_trf").innerHTML = "Debit Intimation With Credit Intimation";
                trfType = "DI03";
            }
            $.ajax({
                url: x + y,
                type: 'POST',
                data: { UserType: document.getElementById("usertype").value, BankCode: bankcode, BranchCode: Branchcode, Verf: 'DI', trf_type: trfType },
                success: getListData_debit_intimation_06_07,
                error: getError
            });
        }
        else if (trans_type == "08" || trans_type == "09" || trans_type == "10" || trans_type == "CI01") {

            if (trans_type == "CI01") {
                document.getElementById("h5_trf").innerHTML = "Credit Intimation With Cash";
                trfType = "CI01";
            }
            else if (trans_type == "08") {
                document.getElementById("h5_trf").innerHTML = "Credit Intimation With Cheque";
                trfType = "CI02";
            }
            else if (trans_type == "09") {
                document.getElementById("h5_trf").innerHTML = "Credit Intimation With DI";
                trfType = "CI03";
            }
            else if (trans_type == "10") {
                document.getElementById("h5_trf").innerHTML = "Credit Intimation With Withdrawal Slip";
                trfType = "CI04";
            }

            $.ajax({
                url: x + y,
                type: 'POST',
                data: { UserType: document.getElementById("usertype").value, BankCode: bankcode, BranchCode: Branchcode, Verf: 'CI', trf_type: trfType },
                success: getListData_credit_intimation_08_09_10,
                error: getError
            });
      
        }
        // RTGS Cheque
        else if (trans_type == "RTGS_03_04") {
            if (trans_type == "RTGS_03_04") {
                document.getElementById("h5_trf").innerHTML = "RTGS with Cheque";
                trfType = "RTGS_03_04";
            }
            //if (trans_type == "Rtgs_04") {
            //    document.getElementById("h5_trf").innerHTML = "RTGS Machine upload with Cheque";
            //    trfType = trans_type;
            //}

            //document.getElementById("h5_trf").innerHTML = "RTGS with Cheque";
            //trftype = "RTGS03";

            $.ajax({
                url: x + y,
                type: 'POST',
                data: { UserType: document.getElementById("usertype").value, BankCode: bankcode, Verf: 'RTGS_03_04', trf_type: 'RTGS03' },
                success: getListData_rtgs_Cheque,
                error: getError
            });
        }
    }

    function getError(result) {
        debugger;
        //$("#ProcessingBar").hide();

        $("#div_cash_deposit").hide();
        $("#div_cash_withdraw").hide();
        $("#div_cash_transfer_03_04_05").hide();

        var msg = result.responseJSON.Message;
        //alert(msg);
        document.getElementById("ProcessingBar").innerHTML = msg;
    }

    //****************************************************** Cash Deposit Begin **********************************************

    function getListData_deposit(printer) {
        debugger;

        $("#div_cash_deposit").show();
        //$("#div_cash_withdraw").hide();
        //$("#div_cash_transfer_03_04_05").hide();
        //$("#div_cash_debit_intimation_06_07").hide();
        //$("#div_cash_credit_intimation_08_09_10").hide();
        $("#ProcessingBar").hide();

        // Iterate over the collection of data,below line for removing table data except header
        $("#tbl_Cash_Deposit").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow_deposit(print);
        });
    }

    function AddRecordRow_deposit(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_Cash_Deposit tbody").length == 0) {
            $("#tbl_Cash_Deposit").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_Cash_Deposit tbody").append(
            RecordTableRow_deposit(print));
    }

    function RecordTableRow_deposit(print) {
        debugger;
        if (print.count_id != null) {
            var ret;

            var loginid = document.getElementById("loginid").value;
            var data_amt = parseFloat(print.ChqAmount);
            var trans = "CASHDEP";
            var checkerRights = Boolean(document.getElementById("CASHDEP_CHECKER").value);

            debugger;
            var RetRow =
                "<tr>" +
                '<td style="text-align:center;font-size: 14px;" hidden> <div id="count_id_' + print.count_id + '">' + print.count_id + '</div></td>' +
                '<td class="text-wrap"><label id="refno_' + print.count_id + '" hidden>' + print.TransactionRefNo + '</label>' +
                '<span>' + print.TransactionRefNo + '</span>' +
                '</td>' +
                '<td class="text-wrap"><span>' + print.CreditAccNo + '</span></td>' +
                '<td class="text-wrap"><span>' + print.PayeeName + '</span></td>' +
                '<td class="text-wrap"><span>' + print.ChqAmount + '</span></td>' +
                '<td class="text-wrap"><span>' + print.MakerId + '</span></td>' +
                '<td class="text-wrap"><span>' + print.CheckerId + '</span></td>';

            if (bankcode == "240") {
                RetRow = RetRow +
                    '<td class="text-wrap"><span>' + print.L3UserId + '</span></td>';
            }
            else {
                $("#CASHDEP_L3_user").hide();
            }

            if (CheckerModule != 'Y' && print.Status == 2) {
                // Get Cash
                if (print.MakerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Get Cash</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="getCashDetails(' + print.count_id + ',1);">Get Cash</span></td>' +
                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Maker User Required</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        //'<td><button class="btn btn-primary btn-sm" disabled>Verify</button></td>' +
                        "</tr>";
                }

            }
            else if (print.Status == 2) {
                debugger;
                if (print.MakerId != loginid && checkerRights == true) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_CASHDEP(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        "</tr>";

                    //if (print.MakerId == loginid) {
                    //    RetRow = RetRow +
                    //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                    //        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Get Cash</span>' +
                    //        '</td>' +
                    //        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="getCashDetails(' + print.count_id + ');">Get Cash</span></td>' +
                    //        "</tr>";
                    //}
                    //else {
                    //    RetRow = RetRow +
                    //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                    //        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Maker User Required</span>' +
                    //        '</td>' +
                    //        '<td><label style="color: red">Access Not Available</label></td>' +
                    //        "</tr>";
                    //}
                }

            }
            else if (print.Status == 10) {

                if (print.CheckerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_CASHDEP(' + print.count_id + ');">Verify</span></td>' +

                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">L2 Under Process</label></td>' +
                        "</tr>";
                }

            }
            else if (print.Status == 11) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L2</label></td>' +
                    '</tr>';
            }
            else if (print.Status == 12) {

                if (print.MakerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<label hidden></label>' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Get Cash</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="getCashDetails(' + print.count_id + ',1);">Get Cash</span></td>' +
                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Get Cash</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        //'<td><button class="btn btn-primary btn-sm" disabled>Get Cash</button></td>' +
                        "</tr>";
                }
            }
            else if (print.Status == 13) {

                if (print.MakerId != loginid && print.CheckerId != loginid && checkerRights == true) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_CASHDEP(' + print.count_id + ');">L3 Verify</span></td>' +
                        "</tr>";
                }
                else {

                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        //'<td><button class="btn btn-primary btn-sm" disabled>L3 Verify</button></td>' +
                        "</tr>";

                    //if (loginid != print.MakerId && loginid != print.CheckerId
                    //    && (parseInt(document.getElementById("startlimit_l3").value) <= parseInt(print.ChqAmount))
                    //    && (parseInt(print.ChqAmount) <= parseInt(document.getElementById("stoplimit_l3").value))) {
                    //    RetRow = RetRow +
                    //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                    //        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                    //        '</td>' +
                    //        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_CASHDEP(' + print.count_id + ');">L3 Verify</span></td>' +
                    //        "</tr>";
                    //}
                    //else {
                    //    RetRow = RetRow +
                    //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                    //        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                    //        '</td>' +
                    //        '<td><label style="color: red">Access Not Available</label></td>' +
                    //        //'<td><button class="btn btn-primary btn-sm" disabled>L3 Verify</button></td>' +
                    //        "</tr>";
                    //}

                }

            }
            else if (print.Status == 14) {

                if (loginid == print.L3UserId) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_CASHDEP(' + print.count_id + ');">L3 Verify</span></td>' +
                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">L3 Under Process</label></td>' +
                        //'<td style="text-align:center;font-size: 14px; background-color: #ffcc00;">L3 Verification Pending</td>' +
                        //'<td style="text-align:center;"> <input type="button" id="btnCash" value="L3 Verify" class="btn" style="color:white;font-size: 12px; padding: 1px; width: 75px;"' +
                        //' onclick = "VerifyData_L3(' + print.count_id + ');" disabled /> </td > '
                        "</tr>";
                }

            }
            else if (print.Status == 15) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L3</label></td>' +
                    '</tr>';
                //'<td style="text-align:center;font-size: 14px; background-color: #ff0000;">Rejected in L2</td>' +
                //'<td style="text-align:center;"></td> </tr>';
            }
            else if (print.Status == 16) {

                if (print.MakerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Get Cash</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="getCashDetails(' + print.count_id + ',1);">Get Cash</span></td>' +
                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Get Cash</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        "</tr>";
                }

            }
            else if (print.Status == 17) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    //'<td style="text-align:center;font-size: 14px; background-color: #00ff00;">Verification Completed</td>' +
                    '<td style="text-align:center;"></td> </tr>';
            }
            else if (print.Status == 18) {

                if (print.MakerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<label hidden></label>' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataRollback_deposit(' + print.count_id + ');">Data Entry</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }
            else {
                RetRow = RetRow +
                    '<td></td>' +
                    '<td></td> </tr>';
            }

            return RetRow;
        }
        else {
            var ret =

                alert("No Records Found!!!!");
            return ret;
        }
    }

    //****************************************************** Cash Deposit End **********************************************

    //****************************************************** Cash Withdraw Begin **********************************************

    function getListData_withdraw(printer) {
        debugger;

        //$("#div_cash_deposit").hide();
        $("#div_cash_withdraw").show();
        //$("#div_cash_transfer_03_04_05").hide();
        $("#ProcessingBar").hide();

        // Iterate over the collection of data,below line for removing table data except header
        $("#tbl_Cash_Withdraw").find("tr:gt(0)").remove();
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow_withdraw(print);
        });
    }

    function AddRecordRow_withdraw(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_Cash_Withdraw tbody").length == 0) {
            $("#tbl_Cash_Withdraw").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_Cash_Withdraw tbody").append(
            RecordTableRow_withdraw(print));
    }

    function RecordTableRow_withdraw(print) {
        debugger;
        if (print.count_id != null) {
            var ret;

            var loginid = document.getElementById("loginid").value;
            var data_amt = parseFloat(print.ChqAmount);
            var trans = "CASHWDL";
            var checkerRights = Boolean(document.getElementById("CASHWDL_CHECKER").value);

            var RetRow =
                "<tr>" +
                '<td style="text-align:center;font-size: 14px;" hidden> <div id="count_id_' + print.count_id + '">' + print.count_id + '</div></td>' +
                '<td class="text-wrap"><label id="refno_' + print.count_id + '" hidden>' + print.TransactionRefNo + '</label>' +
                '<span>' + print.TransactionRefNo + '</span>' +
                '</td>' +
                '<td class="text-wrap"><span>' + print.DebitAccNo + '</span></td>' +
                '<td class="text-wrap"><span>' + print.PayeeName + '</span></td>' +
                '<td class="text-wrap"><span>' + print.ChqAmount + '</span></td>' +
                '<td class="text-wrap"><span>' + print.MakerId + '</span></td>' +
                '<td class="text-wrap"><span>' + print.CheckerId + '</span></td>';

            if (bankcode == "240") {
                RetRow = RetRow +
                    '<td class="text-wrap"><span>' + print.L3UserId + '</span></td>';
            }
            else {
                $("#CASHWDL_L3_user").hide();
            }

            debugger;
            if (CheckerModule != 'Y' && print.Status == 2) {

                if (print.MakerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Dispense Cash</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="getCashDetails(' + print.count_id + ',2);">Dispense Cash</span></td>' +
                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Maker User Required</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }
            else if (print.Status == 2) {

                if (print.MakerId != loginid && checkerRights == true) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_CASHWDL(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {

                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        "</tr>";

                    //if (print.MakerId == loginid) {
                    //    RetRow = RetRow +
                    //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                    //        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Get Cash</span>' +
                    //        '</td>' +
                    //        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="getCashDetails(' + print.count_id + ',2);">Get Cash</span></td>' +
                    //        "</tr>";
                    //}
                    //else {
                    //    RetRow = RetRow +
                    //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                    //        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Maker User Required</span>' +
                    //        '</td>' +
                    //        '<td><label style="color: red">Access Not Available</label></td>' +
                    //        "</tr>";
                    //}
                }

            }
            else if (print.Status == 10) {

                if (print.CheckerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_CASHWDL(' + print.count_id + ');">Verify</span></td>' +

                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">L2 Under Process</label></td>' +
                        //'<td><button class="btn btn-primary btn-sm" disabled>Verify</button></td>' +
                        "</tr>";
                }

            }
            else if (print.Status == 11) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L2</label></td>' +
                    '</tr>';
                //'<td class="text-wrap"></td> </tr>';
            }
            else if (print.Status == 12) {

                if (print.MakerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<label hidden></label>' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Dispense Cash</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="getCashDetails(' + print.count_id + ',2);">Dispense Cash</span></td>' +
                        //'<td><label style="color: red">Checker Limit not matched</label></td>' +
                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Dispense Cash</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        //'<td><button class="btn btn-primary btn-sm" disabled>Get Cash</button></td>' +
                        "</tr>";
                }

            }
            else if (print.Status == 13) {

                if (loginid != print.MakerId && loginid != print.CheckerId && checkerRights == true) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_CASHWDL(' + print.count_id + ');">L3 Verify</span></td>' +
                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        //'<td><button class="btn btn-primary btn-sm" disabled>L3 Verify</button></td>' +
                        "</tr>";

                    //if (loginid != print.MakerId && loginid != print.CheckerId && checkerRights == true
                    //    && (parseInt(document.getElementById("startlimit_l3").value) <= parseInt(print.ChqAmount))
                    //    && (parseInt(print.ChqAmount) <= parseInt(document.getElementById("stoplimit_l3").value))) {
                    //    RetRow = RetRow +
                    //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                    //        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                    //        '</td>' +
                    //        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_CASHWDL(' + print.count_id + ');">L3 Verify</span></td>' +
                    //        "</tr>";
                    //}
                    //else {
                    //    RetRow = RetRow +
                    //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                    //        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                    //        '</td>' +
                    //        '<td><label style="color: red">Access Not Available</label></td>' +
                    //        //'<td><button class="btn btn-primary btn-sm" disabled>L3 Verify</button></td>' +
                    //        "</tr>";
                    //}
                }

            }
            else if (print.Status == 14) {

                if (loginid == print.L3UserId) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_CASHWDL(' + print.count_id + ');">L3 Verify</span></td>' +
                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">L3 Under Process</label></td>' +
                        //'<td style="text-align:center;font-size: 14px; background-color: #ffcc00;">L3 Verification Pending</td>' +
                        //'<td style="text-align:center;"> <input type="button" id="btnCash" value="L3 Verify" class="btn" style="color:white;font-size: 12px; padding: 1px; width: 75px;"' +
                        //' onclick = "VerifyData_L3(' + print.count_id + ');" disabled /> </td > '
                        "</tr>";
                }

            }
            else if (print.Status == 15) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L3</label></td>' +
                    '</tr>';
                //'<td style="text-align:center;font-size: 14px; background-color: #ff0000;">Rejected in L2</td>' +
                //'<td style="text-align:center;"></td> </tr>';
            }
            else if (print.Status == 16) {

                if (print.MakerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Dispense Cash</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="getCashDetails(' + print.count_id + ',2);">Dispense Cash</span></td>' +
                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Dispense Cash</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        "</tr>";
                }

            }
            else if (print.Status == 17) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    //'<td style="text-align:center;font-size: 14px; background-color: #00ff00;">Verification Completed</td>' +
                    '<td style="text-align:center;"></td> </tr>';
            }
            else if (print.Status == 18) {

                if (print.MakerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<label hidden></label>' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataRollback_withdrawal(' + print.count_id + ');">Data Entry</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }
            else {
                RetRow = RetRow +
                    '<td></td>' +
                    '<td></td> </tr>';
            }

            return RetRow;
        }
        else {
            var ret =

                alert("No Records Found!!!!");
            return ret;
        }
    }

    //****************************************************** Cash Withdraw End **********************************************

    //****************************************************** Cash Transfer Begin **********************************************

    function getListData_transfer_03_04_05(printer) {
        debugger;

        //$("#div_cash_deposit").hide();
        //$("#div_cash_withdraw").hide();
        $("#div_cash_transfer_03_04_05").show();
        $("#ProcessingBar").hide();

        // Iterate over the collection of data,below line for removing table data except header
        $("#tbl_Cash_transfer_03_04_05").find("tr:gt(0)").remove();
        debugger;
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow_transfer_03_04_05(print);
        });
    }

    function AddRecordRow_transfer_03_04_05(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_Cash_transfer_03_04_05 tbody").length == 0) {
            $("#tbl_Cash_transfer_03_04_05").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_Cash_transfer_03_04_05 tbody").append(
            RecordTableRow_transfer_03_04_05(print));
    }

    function RecordTableRow_transfer_03_04_05(print) {
        debugger;
        if (print.count_id != null) {
            var ret;

            var loginid = document.getElementById("loginid").value;
            var data_amt = parseFloat(print.ChqAmount);
            var trans = "TRF";

            var RetRow =
                "<tr>" +
                '<td style="text-align:center;font-size: 14px;" hidden> <div id="count_id_' + print.count_id + '">' + print.count_id + '</div></td>' +
                '<td class="text-wrap"><label id="refno_' + print.count_id + '" hidden>' + print.TransactionRefNo + '</label>' +
                '<span>' + print.TransactionRefNo + '</span>' +
                '</td>' +
                '<td class="text-wrap"><span>' + print.DebitAccNo + '</span></td>' +
                '<td class="text-wrap"><span>' + print.PayeeName + '</span></td>' +
                '<td class="text-wrap"><span>' + print.ChqAmount + '</span></td>' +
                '<td class="text-wrap"><span>' + print.MakerId + '</span></td>' +
                '<td class="text-wrap"><span>' + print.CheckerId + '</span></td>';

            if (bankcode == "240") {
                RetRow = RetRow +
                    '<td class="text-wrap"><span>' + print.L3UserId + '</span></td>';
            }
            else {
                $("#trf_03_04_05").hide();
            }

            if (CheckerModule != 'Y' && print.Status == 2) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';

            }
            else if (print.Status == 2) {

                if (loginid != print.MakerId) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L2_TRF_03_04_05(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }
            else if (print.Status == 20) {
                if (print.CheckerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L2_TRF_03_04_05(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }
            }
            else if (print.Status == 21) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L2</label></td>' +
                    '</tr>';
            }
            else if (print.Status == 22) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';
            }
            else if (print.Status == 27) {
                if (print.MakerId != loginid && print.CheckerId != loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_TRF_03_04_05(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }


                //if (parseFloat(data_amt) >= l3startlimit) {
                //    RetRow = RetRow +
                //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                //        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                //        '</td>' +
                //        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_TRF_03_04_05(' + print.count_id + ');">Verify</span></td>' +
                //        '</tr>';
                //}
                //else {
                //    RetRow = RetRow +
                //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                //        '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                //        '</td>' +
                //        '<td style="text-align:center;"></td> </tr>' +
                //        '</tr>';
                //}
            }
            else if (print.Status == 23) {
                if (print.L3UserId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_TRF_03_04_05(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }
            }
            else if (print.Status == 24) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L3</label></td>' +
                    '</tr>';
            }
            else if (print.Status == 25) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';
            }
            else if (print.Status == 26) {
                var trans_type = document.getElementById("Transaction_Type").value;
                if (print.MakerId == loginid) {
                    if (trans_type == "TRF02") {
                        RetRow = RetRow +
                            '<td class="text-wrap align-middle" style="text-align: center;">' +
                            '<label hidden></label>' +
                            '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                            '</td>' +
                            '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataRollback_TRF02(' + print.count_id + ');">Data Entry</span></td>' +
                            '</tr>';
                    }
                    else {
                        RetRow = RetRow +
                            '<td class="text-wrap align-middle" style="text-align: center;">' +
                            '<label hidden></label>' +
                            '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                            '</td>' +
                            '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataRollback_TRF_03_04_05(' + print.count_id + ');">Data Entry</span></td>' +
                            '</tr>';
                    }
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }
            else {
                RetRow = RetRow +
                    '<td></td>' +
                    '<td></td> </tr>';
            }

            return RetRow;
        }
        else {
            var ret =

                alert("No Records Found!!!!");
            return ret;
        }
    }

    //****************************************************** Cash Transfer End **********************************************

    //****************************************************** Debit Intimation Start **********************************************
    function getListData_debit_intimation_06_07(printer) {
        debugger;

        //$("#div_cash_deposit").hide();
        //$("#div_cash_withdraw").hide();
        //$("#div_cash_transfer_03_04_05").hide();
        $("#div_cash_debit_intimation_06_07").show();
        $("#ProcessingBar").hide();

        // Iterate over the collection of data,below line for removing table data except header
        $("#tbl_Cash_debit_intimation_06_07").find("tr:gt(0)").remove();
        debugger;
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow_debit_intimation_06_07(print);
        });
    }

    function AddRecordRow_debit_intimation_06_07(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_Cash_debit_intimation_06_07 tbody").length == 0) {
            $("#tbl_Cash_debit_intimation_06_07").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_Cash_debit_intimation_06_07 tbody").append(
            RecordTableRow_debit_intimation_06_07(print));
    }

    function RecordTableRow_debit_intimation_06_07(print) {
        debugger;
        if (print.count_id != null) {
            var ret;

            var loginid = document.getElementById("loginid").value;
            var data_amt = parseFloat(print.ChqAmount);
            var trans = "DI";

            var RetRow =
                "<tr>" +
                '<td style="text-align:center;font-size: 14px;" hidden> <div id="count_id_' + print.count_id + '">' + print.count_id + '</div></td>' +
                '<td class="text-wrap"><label id="refno_' + print.count_id + '" hidden>' + print.TransactionRefNo + '</label>' +
                '<span>' + print.TransactionRefNo + '</span>' +
                '</td>' +
                '<td class="text-wrap"><span>' + print.DebitAccNo + '</span></td>' +
                '<td class="text-wrap"><span>' + print.PayeeName + '</span></td>' +
                '<td class="text-wrap"><span>' + print.ChqAmount + '</span></td>' +
                '<td class="text-wrap"><span>' + print.MakerId + '</span></td>' +
                '<td class="text-wrap"><span>' + print.CheckerId + '</span></td>';

            if (bankcode == "240") {
                RetRow = RetRow +
                    '<td class="text-wrap"><span>' + print.L3UserId + '</span></td>';
            }
            else {
                $("#di_06_07").hide();
            }
            debugger;
            if (print.Status == 81) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';

            }
            else if (print.Status == 88) {
                // Get Cash
                if (print.MakerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Get Cash</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="getCashDetailsforDI(' + print.count_id + ',1);">Get Cash</span></td>' +
                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Maker User Required</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        //'<td><button class="btn btn-primary btn-sm" disabled>Verify</button></td>' +
                        "</tr>";
                }
            }
            else if (print.Status == 82) {

                if (loginid != print.MakerId) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L2_DI_06_07(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }
            else if (print.Status == 83) {
                if (print.CheckerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L2_DI_06_07(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Under Process</label></td>' +
                        '</tr>';
                }
            }
            else if (print.Status == 89) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L2</label></td>' +
                    '</tr>';
            }
            else if (print.Status == 84) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';
            }
            else if (print.Status == 85) {
                if (print.MakerId != loginid && print.CheckerId != loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_DI_06_07(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }


                //if (parseFloat(data_amt) >= l3startlimit) {
                //    RetRow = RetRow +
                //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                //        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                //        '</td>' +
                //        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_TRF_03_04_05(' + print.count_id + ');">Verify</span></td>' +
                //        '</tr>';
                //}
                //else {
                //    RetRow = RetRow +
                //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                //        '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                //        '</td>' +
                //        '<td style="text-align:center;"></td> </tr>' +
                //        '</tr>';
                //}
            }
            else if (print.Status == 86) {
                if (print.L3UserId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_DI_06_07(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Under Process</label></td>' +
                        '</tr>';
                }
            }
            else if (print.Status == 90) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L3</label></td>' +
                    '</tr>';
            }
            else if (print.Status == 87) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';
            }
            else if (print.Status == 92) {
                var trans_type = document.getElementById("Transaction_Type").value;
                if (print.MakerId == loginid) {
                    if (trans_type == "DI01") {
                        RetRow = RetRow +
                            '<td class="text-wrap align-middle" style="text-align: center;">' +
                            '<label hidden></label>' +
                            '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                            '</td>' +
                            '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataRollback_DI01(' + print.count_id + ');">Data Entry</span></td>' +
                            '</tr>';
                    }
                    else {
                        RetRow = RetRow +
                            '<td class="text-wrap align-middle" style="text-align: center;">' +
                            '<label hidden></label>' +
                            '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                            '</td>' +
                            '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataRollback_DI_06_07(' + print.count_id + ');">Data Entry</span></td>' +
                            '</tr>';
                    }
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }
            else {
                RetRow = RetRow +
                    '<td></td>' +
                    '<td></td> </tr>';
            }

            return RetRow;
        }
        else {
            var ret =

                alert("No Records Found!!!!");
            return ret;
        }
    }

    //****************************************************** Debit Intimation End **********************************************

    //******************************************************  Credit Intimation Begin **********************************************

    function getListData_credit_intimation_08_09_10(printer) {
        debugger;

        //$("#div_cash_deposit").hide();
        //$("#div_cash_withdraw").hide();
        //$("#div_cash_transfer_03_04_05").hide();
        $("#div_cash_credit_intimation_08_09_10").show();

        $("#ProcessingBar").hide();

        // Iterate over the collection of data,below line for removing table data except header
        $("#tbl_Cash_credit_intimation_08_09_10").find("tr:gt(0)").remove();
        debugger;
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow_credit_intimation_08_09_10(print);
        });
    }

    function AddRecordRow_credit_intimation_08_09_10(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_Cash_credit_intimation_08_09_10 tbody").length == 0) {
            $("#tbl_Cash_credit_intimation_08_09_10").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_Cash_credit_intimation_08_09_10 tbody").append(
            RecordTableRow_credit_intimation_08_09_10(print));
    }

    function RecordTableRow_credit_intimation_08_09_10(print) {
        debugger;
        if (print.count_id != null) {
            var ret;

            var loginid = document.getElementById("loginid").value;
            var data_amt = parseFloat(print.ChqAmount);
            var trans = "CI";

            var RetRow =
                "<tr>" +
                '<td style="text-align:center;font-size: 14px;" hidden> <div id="count_id_' + print.count_id + '">' + print.count_id + '</div></td>' +
                '<td class="text-wrap"><label id="refno_' + print.count_id + '" hidden>' + print.TransactionRefNo + '</label>' +
                '<span>' + print.TransactionRefNo + '</span>' +
                '</td>' +
                '<td class="text-wrap"><span>' + print.CreditAccNo + '</span></td>' +
                '<td class="text-wrap"><span>' + print.PayeeName + '</span></td>' +
                '<td class="text-wrap"><span>' + print.ChqAmount + '</span></td>' +
                '<td class="text-wrap"><span>' + print.MakerId + '</span></td>' +
                '<td class="text-wrap"><span>' + print.CheckerId + '</span></td>';

            if (bankcode == "240") {
                RetRow = RetRow +
                    '<td class="text-wrap"><span>' + print.L3UserId + '</span></td>';
            }
            else {
                $("#trf_03_04_05").hide();
            }

            if (print.Status == 71) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';

            }
            else if (print.Status == 78) {
                // Get Cash
                if (print.MakerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Get Cash</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="getCashDetailsforCI(' + print.count_id + ',1);">Get Cash</span></td>' +
                        "</tr>";
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Maker User Required</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        //'<td><button class="btn btn-primary btn-sm" disabled>Verify</button></td>' +
                        "</tr>";
                }

            }
            else if (print.Status == 72) {

                if (loginid != print.MakerId) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L2_CI_08_09_10(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }
            else if (print.Status == 73) {
                if (print.CheckerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L2_CI_08_09_10(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red"> L2 Under Process</label></td>' +
                        '</tr>';
                }
            }
            else if (print.Status == 79) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L2</label></td>' +
                    '</tr>';
            }
            else if (print.Status == 74) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';
            }
            else if (print.Status == 75) {
                if (print.MakerId != loginid && print.CheckerId != loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_CI_08_09_10(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }


                //if (parseFloat(data_amt) >= l3startlimit) {
                //    RetRow = RetRow +
                //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                //        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                //        '</td>' +
                //        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_TRF_03_04_05(' + print.count_id + ');">Verify</span></td>' +
                //        '</tr>';
                //}
                //else {
                //    RetRow = RetRow +
                //        '<td class="text-wrap align-middle" style="text-align: center;">' +
                //        '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                //        '</td>' +
                //        '<td style="text-align:center;"></td> </tr>' +
                //        '</tr>';
                //}
            }
            else if (print.Status == 76) {
                if (print.L3UserId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="VerifyData_L3_CI_08_09_10(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">L3 Under Process</label></td>' +
                        '</tr>';
                }
            }
            else if (print.Status == 80) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L3</label></td>' +
                    '</tr>';
            }
            else if (print.Status == 77) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';
            }
            else if (print.Status == 91) {

                trans_type = document.getElementById("Transaction_Type").value;

                if (print.MakerId == loginid) {
                    if (trans_type == 'CI01') {
                        RetRow = RetRow +
                            '<td class="text-wrap align-middle" style="text-align: center;">' +
                            '<label hidden></label>' +
                            '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                            '</td>' +
                            '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataRollback_CI_Cash(' + print.count_id + ');">Data Entry</span></td>' +
                            '</tr>';
                    }
                    else {
                        RetRow = RetRow +
                            '<td class="text-wrap align-middle" style="text-align: center;">' +
                            '<label hidden></label>' +
                            '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                            '</td>' +
                            '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataRollback_CI_08_09_10(' + print.count_id + ');">Data Entry</span></td>' +
                            '</tr>';
                    }

                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }
            else {
                RetRow = RetRow +
                    '<td></td>' +
                    '<td></td> </tr>';
            }

            return RetRow;
        }
        else {
            var ret =

                alert("No Records Found!!!!");
            return ret;
        }
    }


    //****************************************************** Cash Credit Intimation End **********************************************
    //***********************************************RTGS with Cheque Start **********************************************
    function getListData_rtgs_Cheque(printer) {
        debugger;

        //$("#div_cash_deposit").hide();
        //$("#div_cash_withdraw").hide();
        //$("#div_cash_transfer_03_04_05").hide();
        //$("#div_cash_credit_intimation_08_09_10").hide();
        $("#div_rtgs_cheque_03_04").show();
        $("#ProcessingBar").hide();

        // Iterate over the collection of data,below line for removing table data except header
        $("#tbl_rtgs_cheque_03_04").find("tr:gt(0)").remove();
        debugger;
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRecordRow_rtgs_cheque(print);
        });
    }

    function AddRecordRow_rtgs_cheque(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_rtgs_cheque_03_04 tbody").length == 0) {
            $("#tbl_rtgs_cheque_03_04").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_rtgs_cheque_03_04 tbody").append(
            RecordTableRow_rtgs_cheque(print));
    }

    function RecordTableRow_rtgs_cheque(print) {
        debugger;
        if (print.count_id != null) {
            var ret;
            debugger;
            var loginid = document.getElementById("loginid").value;
            var data_amt = parseFloat(print.ChqAmount);
            var trans = "RTGS03";

            var RetRow =
                "<tr>" +
                '<td style="text-align:center;font-size: 14px;" hidden> <div id="count_id_' + print.count_id + '">' + print.count_id + '</div></td>' +
                '<td class="text-wrap"><label id="refno_' + print.count_id + '">' + print.TransactionRefNo + '</label></td>' +
                /*'<span>' + print.TransactionRefNo + '</span>' +*/
                /* '</td>' +*/
                /*'<td class="text-wrap"><span>' + print.transactionType + '</span></td>' +*/
                '<td class="text-wrap"><label id="trfType_' + print.count_id + '">' + print.transactionType + '</label></td>' +
                /* '<td class="text-wrap"><label id="trfType_' + print.count_id + '" hidden>' + print.transactionType + '</label></td>'*/

                '<td class="text-wrap"><span>' + print.DebitAccNo + '</span></td>' +
                '<td class="text-wrap"><span>' + print.PayeeName + '</span></td>' +
                '<td class="text-wrap"><span>' + data_amt + '</span></td>' +
                '<td class="text-wrap"><span>' + print.MakerId + '</span></td>' +
                '<td class="text-wrap"><span>' + print.CheckerId + '</span></td>';

            //if (bankcode == "240") {
            //    RetRow = RetRow +
            //        '<td class="text-wrap"><span>' + print.L3UserId + '</span></td>';
            //}
            //else {
            //    $("#rtgs_chq_03_04").hide();
            //}

            debugger;

            if (CheckerModule != 'Y' && print.Status == 35) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';

            }
            else if (print.Status == 35) {

                if (loginid != print.MakerId) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="Verify_rtgs_chq(' + print.count_id + ');">L2 Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }
            else if (print.Status == 36) {
                debugger;
                if (print.CheckerId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L2 Locked</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="Verify_rtgs_chq(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L2 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }
            }
            else if (print.Status == 37) {

                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected in L2</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L2</label></td>' +
                    '</tr>';
            }
            else if (print.Status == 38) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' + /*Accept in l2*/
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';
            }

            else if (print.Status == 39) {
                if (print.MakerId != loginid && print.CheckerId != loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="Verify_rtgs_chq_L3(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }
            else if (print.Status == 40) {
                if (print.L3UserId == loginid) {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-secondary" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="Verify_rtgs_chq(' + print.count_id + ');">Verify</span></td>' +
                        '</tr>';
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">L3 Verify</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }
            }
            else if (print.Status == 41) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-danger" style="font-size: 100%;min-width: 110px !important;">Rejected</span>' +
                    '</td>' +
                    '<td><label style="color: red">Rejected in L3</label></td>' +
                    '</tr>';
            }
            else if (print.Status == 42) {
                RetRow = RetRow +
                    '<td class="text-wrap align-middle" style="text-align: center;">' +
                    '<span class="badge bg-success" style="font-size: 100%;min-width: 110px !important;">Completed</span>' +/* L3 Accepted*/
                    '</td>' +
                    '<td style="text-align:center;"></td> </tr>' +
                    '</tr>';
            }
            /*  Rollback*/
            else if (print.Status == 94) {
                debugger;
                var trans_type = document.getElementById("Transaction_Type").value;
                if (print.MakerId == loginid) {
                    if (trans_type == "RTGS_03_04") {
                        RetRow = RetRow +
                            '<td class="text-wrap align-middle" style="text-align: center;">' +
                            '<label hidden></label>' +
                            '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                            '</td>' +
                            '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataRollback_rtgs_chq(' + print.count_id + ');">Data Entry</span></td>' +
                            '</tr>';
                    }
                    else {
                        RetRow = RetRow +
                            '<td class="text-wrap align-middle" style="text-align: center;">' +
                            '<label hidden></label>' +
                            '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                            '</td>' +
                            '<td class="text-wrap"><span class="btn btn-sm btn-primary" onclick="dataRollback_rtgs(' + print.count_id + ');">Data Entry</span></td>' +
                            '</tr>';
                    }
                }
                else {
                    RetRow = RetRow +
                        '<td class="text-wrap align-middle" style="text-align: center;">' +
                        '<span class="badge bg-warning" style="font-size: 100%;min-width: 110px !important;">Rollback</span>' +
                        '</td>' +
                        '<td><label style="color: red">Access Not Available</label></td>' +
                        '</tr>';
                }

            }

            else {
                RetRow = RetRow +
                    '<td></td>' +
                    '<td></td> </tr>';
            }

            return RetRow;

        }
        else {
            var ret =

                alert("No Records Found!!!!");
            return ret;
        }
    }

     //***********************************************RTGS with Cheque end **********************************************
    function getCashDetails(count_id, tran_id) {
        debugger;

        var ref = String(count_id);
        var refno = "refno_" + count_id;
        var ref_id = document.getElementById(refno).innerHTML;
        debugger;
        var trans_type = '';

        if (tran_id == 1)
            trans_type = 'CASHDEP';
        else if (tran_id == 2)
            trans_type = 'CASHWDL';

        //window.open(rooturl + "Checker/GetCash?id=" + count_id + "&refno=" + ref_id + "&transaction_type=" + trans_type, "_self");
        window.open(rooturl + "Checker/GetCash?id=" + ref + "&refno=" + ref_id + "&transaction_type=" + trans_type, "_self");
    }

    function getCashDetailsforDI(count_id, tran_id) {
        debugger;

        var ref = String(count_id);
        var refno = "refno_" + count_id;
        var ref_id = document.getElementById(refno).innerHTML;
        debugger;
        var trans_type = '';

        if (tran_id == 1)
            trans_type = 'DI01';

        //window.open(rooturl + "Checker/GetCash?id=" + count_id + "&refno=" + ref_id + "&transaction_type=" + trans_type, "_self");
        window.open(rooturl + "CI_DI_Form/GetCash?id=" + ref + "&refno=" + ref_id + "&transaction_type=" + trans_type, "_self");
    }

    function getCashDetailsforCI(count_id, tran_id) {
        debugger;

        var ref = String(count_id);
        var refno = "refno_" + count_id;
        var ref_id = document.getElementById(refno).innerHTML;
        debugger;
        var trans_type = '';

        if (tran_id == 1)
            trans_type = 'CI01';

        //window.open(rooturl + "Checker/GetCash?id=" + count_id + "&refno=" + ref_id + "&transaction_type=" + trans_type, "_self");
        window.open(rooturl + "CI_DI_Form/GetCash?id=" + ref + "&refno=" + ref_id + "&transaction_type=" + trans_type, "_self");
    }

    function VerifyData_CASHDEP(count_id) {
        debugger;
        //var rooturl = '@Url.Content("~/")';
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        var dt = "verify"

        window.open(rooturl + "Checker/CheckerForm?id=" + ref + "&refno=" + refno + "&verf=L2&type=CASHDEP", "_self");

    }


    function VerifyData_L3_CASHDEP(count_id) {
        debugger;
        //var rooturl = '@Url.Content("~/")';
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        var dt = "verify"

        window.open(rooturl + "Checker/CheckerForm?id=" + ref + "&refno=" + refno + "&verf=L3&type=CASHDEP", "_self");

    }

    function VerifyData_CASHWDL(count_id) {
        debugger;
        //var rooturl = '@Url.Content("~/")';
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        var dt = "verify"

        window.open(rooturl + "Checker/CheckerForm?id=" + ref + "&refno=" + refno + "&verf=L2&type=CASHWDL", "_self");

    }


    function VerifyData_L3_CASHWDL(count_id) {
        debugger;
        //var rooturl = '@Url.Content("~/")';
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        var dt = "verify"

        window.open(rooturl + "Checker/CheckerForm?id=" + ref + "&refno=" + refno + "&verf=L3&type=CASHWDL", "_self");

    }

    function dataRollback_deposit(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        debugger;
        window.open(rooturl + "DepositWithdraw/RollbackForm?id=" + ref + "&refno=" + refno + "&transType=CASHDEP", "_self");
    }

    function dataRollback_withdrawal(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        debugger;
        window.open(rooturl + "DepositWithdraw/RollbackForm?id=" + ref + "&refno=" + refno + "&transType=CASHWDL", "_self");
    }

    function dataRollback_TRF_03_04_05(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        window.open(rooturl + "TransferCts/RollbackForm?id=" + ref + "&refno=" + refno + "&transType=TRF", "_self");

    }
    function dataRollback_TRF02(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        window.open(rooturl + "TransferCts/RollbackForm?id=" + ref + "&refno=" + refno + "&transType=TRF02", "_self");

    }

    function dataRollback_DI_06_07(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        window.open(rooturl + "CI_DI_Form/DIRollbackForm?id=" + ref + "&refno=" + refno + "&transType=DI", "_self");

    }

    function dataRollback_DI01(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        window.open(rooturl + "CI_DI_Form/DIRollbackForm?id=" + ref + "&refno=" + refno + "&transType=DI01", "_self");

    }

    function dataRollback_CI_08_09_10(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        window.open(rooturl + "CI_DI_Form/CIRollbackForm?id=" + ref + "&refno=" + refno + "&transType=CI", "_self");

    }

    function dataRollback_CI_Cash(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        window.open(rooturl + "CI_DI_Form/CIRollbackForm?id=" + ref + "&refno=" + refno + "&transType=CI01", "_self");

    }

    function VerifyData_L2_TRF_03_04_05(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        var dt = "verify"

        window.open(rooturl + "Checker/CheckerForm?id=" + ref + "&refno=" + refno + "&verf=L2&type=" + trfType, "_self");
    }

    function VerifyData_L2_DI_06_07(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        var dt = "verify"

        window.open(rooturl + "Checker/CheckerForm?id=" + ref + "&refno=" + refno + "&verf=L2&type=" + trfType, "_self");
    }

    function VerifyData_L2_CI_08_09_10(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        var dt = "verify"

        window.open(rooturl + "Checker/CheckerForm?id=" + ref + "&refno=" + refno + "&verf=L2&type=" + trfType, "_self");
    }

    function VerifyData_L3_TRF_03_04_05(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        var dt = "verify"

        window.open(rooturl + "Checker/CheckerForm?id=" + ref + "&refno=" + refno + "&verf=L3&type=" + trfType, "_self");
    }

    function VerifyData_L3_CI_08_09_10(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        var dt = "verify"

        window.open(rooturl + "Checker/CheckerForm?id=" + ref + "&refno=" + refno + "&verf=L3&type=" + trfType, "_self");
    }

    function VerifyData_L3_DI_06_07(count_id) {
        debugger;
        var ref = String(count_id);
        var refno = document.getElementById("refno_" + ref).innerHTML;
        var dt = "verify"

        window.open(rooturl + "Checker/CheckerForm?id=" + ref + "&refno=" + refno + "&verf=L3&type=" + trfType, "_self");
    }


    function Verify_rtgs_chq(count_id) {
        // RTGS Button
        debugger;
        var cid = String(count_id);
        var refno = document.getElementById("refno_" + cid).innerHTML;
        var trans_type = document.getElementById("trfType_" + cid).innerHTML;
        //var dt = "verify"
        //if (trfType == "RTGS_03_04") {
        //    var id = "lbl_" + ref;
        //    var che_cheque = document.getElementById(id).innerHTML;
        //}
        var dt = "verify"

        //window.open(rooturl + "Checker/CheckerForm?id=" + ref + "&refno=" + refno + "&verf=L2&type=" + trfType , "_self");
        window.open(rooturl + "Checker/CheckerForm?id=" + cid + "&refno=" + refno + "&verf=L2&type=" + trans_type, "_self");
    }

    function Verify_rtgs_chq_L3(count_id) {
        debugger;
        var cid = String(count_id);
        var refno = document.getElementById("refno_" + cid).innerHTML;
        var dt = "verify"

        window.open(rooturl + "Checker/CheckerForm?id=" + cid + "&refno=" + refno + "&verf=L3&type=" + trfType, "_self");
    }

    function dataRollback_rtgs_chq(count_id) {
        debugger;
        var cid = String(count_id);
        var refno = document.getElementById("refno_" + cid).innerHTML;
        window.open(rooturl + "RtgsNeft/RollbackForm?id=" + cid + "&refno=" + refno + "&verf=ROLLBACK&type=" + trfType, "_self");

    }

}
catch (e) {
    alert(e.message);
}