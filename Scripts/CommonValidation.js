try {

    //function verfData() {
    //    alert("this is test!");
    //}

    function CashValidation() {
        debugger;
        //var TypeTran = localStorage.getItem("typeOfTran");
        var accNoVal = document.getElementById("AccountNo").value;

        if (accNoVal == null || accNoVal == "") {
            alert("Alert! Account Number can not be blank!");
            document.getElementById("AccountNo").focus();
            ValidationPassed = false;
            return false;
        }
        else if (accNoVal == "0" || accNoVal == "00" || accNoVal == "000" || accNoVal == "0000" || accNoVal == "00000" || accNoVal == "000000" || accNoVal == "0000000") {
            alert("Alert! Enter valid Account Number!");
            document.getElementById("AccountNo").focus();
            ValidationPassed = false;
            return false;
        }

        var check = document.getElementById("VoucherCheck").value;
        if (check != "false") {
            var payeeName = document.getElementById("FinName").innerHTML;
            if (payeeName == "Account does not exist") {
                alert("Correct account number is mandatory!");
                document.getElementById("AccountNo").focus();
                ValidationPassed = false;
                return false;
            }
        }

        //debugger;
        var trAmt = document.getElementById("SlipAmount").value;
        if (trAmt == "" || trAmt == null) {
            alert("Transaction amount is mandatory!");
            document.getElementById("SlipAmount").focus();
            ValidationPassed = false;
            return false;
        }

        debugger;
        var numbers = /^[0-9]+$/;
        if (!trAmt.match(numbers)) {
            alert("Alert! Slip Amount can only accept 0-9 number and no special character!");
            document.getElementById("SlipAmount").focus();
            ValidationPassed = false;
            return false;
        }

        if (trAmt == "0" || trAmt == "00" || trAmt == "000" || trAmt == "0000" || trAmt == "00000" || trAmt == "000000" || trAmt == "0000000") {
            alert("Alert! Enter valid Transaction amount!");
            document.getElementById("SlipAmount").focus();
            ValidationPassed = false;
            return false;
        }

        var deAmt = document.getElementById("DenomAmount").value;

        if ((deAmt != trAmt && document.getElementById("pageType").value == "withdraw" && document.getElementById("CheckerModule").value == "N") ||
            (deAmt != trAmt && document.getElementById("pageType").value == "deposit")) {
            alert("Transaction Amount is not matching with Denomination Amount!");
            document.getElementById("SlipAmount").focus();
            ValidationPassed = false;
            return false;
        }

        //if (deAmt != trAmt && document.getElementById("CheckerModule").value == "N") {
        //    alert("Transaction Amount is not matching with Denomination Amount!");
        //    document.getElementById("SlipAmount").focus();
        //    ValidationPassed = false;
        //    return false;
        //}

        ValidationPassed = true;
    }

    function ChequeDataValidation() {
        var chqNo_DE = document.getElementById("chqnoDataEntry").value;
        if (chqNo_DE != "" && chqNo_DE.length == 6 && chqNo_DE != "000000") {
            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = chqNo_DE;
            document.getElementById("chqnoDataEntry").style.borderColor = "green";
        }
        else {
            alert("Alert! Enter valid Cheque number!");
            document.getElementById("chqnoDataEntry").focus();
            document.getElementById("chqnoDataEntry").style.borderColor = "red";
            ValidationPassed = false;
            return false;
        }

        var sortcode_de = document.getElementById("sortcodeDataEntry").value;
        if (sortcode_de != "" && sortcode_de.length == 9 && sortcode_de != "000000000") {
            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = sortcode_de;
            document.getElementById("sortcodeDataEntry").style.borderColor = "green";
        }
        else {
            alert("Alert! Enter valid Sort Code!");
            document.getElementById("sortcodeDataEntry").focus();
            document.getElementById("sortcodeDataEntry").style.borderColor = "red";
            ValidationPassed = false;
            return false;
        }

        var san_de = document.getElementById("sanDataEntry").value;
        if (san_de == null || san_de == "") {
            document.getElementById("sanDataEntry").value = "000000";
            document.getElementById("sanDataEntry").style.borderColor = "green";
        }
        else if (san_de != "" && (san_de.length == 6 || san_de.length == 7)) {
            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[6].innerHTML = san_de;
            document.getElementById("sanDataEntry").style.borderColor = "green";
        }
        else {
            alert("Alert! Enter valid SAN number!");
            document.getElementById("sanDataEntry").focus();
            document.getElementById("sanDataEntry").style.borderColor = "red";
            ValidationPassed = false;
            return false;
        }

        //else {
        //    document.getElementById("sanDataEntry").focus();
        //    document.getElementById("sanDataEntry").style.borderColor = "red";
        //    ValidationPassed = false;
        //    return false;
        //}

        var tr_de = document.getElementById("trDataEntry").value;
        if (tr_de == "00" || tr_de == "000") {
            alert("Alert! Enter valid Trans Code!");
            document.getElementById("trDataEntry").focus();
            document.getElementById("trDataEntry").style.borderColor = "red";
            ValidationPassed = false;
            return false;
        }
        else if (tr_de != "" && (tr_de.length == 2 || tr_de.length == 3)) {
            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[7].innerHTML = tr_de;
            document.getElementById("trDataEntry").style.borderColor = "green";
        }
        else {
            alert("Alert! Enter valid Trans Code!");
            document.getElementById("trDataEntry").focus();
            document.getElementById("trDataEntry").style.borderColor = "red";
            ValidationPassed = false;
            return false;
        }

        ValidationPassed = true;
    }

    function ManualInsertValidation() {

        ManualInsert = true;
        //----------- Added on 2022-05-13 -------- By Aniketadit Jamuar ---------- Begin
        for (var inv = 0; inv < 10; inv++) {
            var cellId5 = "denomId5_" + inv.toString();
            var cellVal5 = document.getElementById(cellId5).value;
            if (cellVal5 != "" && cellVal5 != "0") {
                if (cellId5 == "denomId5_0")
                    ManualInsert = false;
                if (cellId5 == "denomId5_1")
                    ManualInsert = false;
                if (cellId5 == "denomId5_2")
                    ManualInsert = false;
                if (cellId5 == "denomId5_3")
                    ManualInsert = false;
                if (cellId5 == "denomId5_4")
                    ManualInsert = false;
                if (cellId5 == "denomId5_5")
                    ManualInsert = false;
                if (cellId5 == "denomId5_6")
                    ManualInsert = false;
                if (cellId5 == "denomId5_7")
                    ManualInsert = false;
                if (cellId5 == "denomId5_8")
                    ManualInsert = false;
                if (cellId5 == "denomId5_9")
                    ManualInsert = false;
            }
        }
        //----------- Added on 2022-05-13 -------- By Aniketadit Jamuar ---------- End
    }

    function TransferCtsValidation() {
        debugger;
        ValidationPassed = true;

        var SlipAmount = 0;
        var ChqAmount = 0;

        var scanType = document.getElementById("scanning_type").value;

        var previnstrumenttype = " ";
        var validationflag = 0;
        localIQA = 1;
        localIQATreatment = 1;
        //debugger;
        //var TypeTran = localStorage.getItem("typeOfTran");
        var TypeTran = "TRF";
        Submit = "ChequeVoucher";


        //if (TypeTran == "vaultcash") {
        //    ValidationPassed = true;
        //    return true;
        //}

        if (tableChequeData.rows.length == 0) {
            alert("Nothing to Validate");
            ValidationPassed = false;
            return false;
        }

        var slipNo = 0;
        var chqNo = 0;

        var slipAmt = 0;
        var chqAmt = 0;

        var SlipAccNo = null;
        var ChqAccNo = null;
        const CompleteAccNo = [];

        var creditaccno = null;
        var debitaccno = null;

        for (var i = 1, row; row = tableChequeData.rows[i]; i++) {
            if (row.cells[10].innerHTML == "S")
                creditaccno = row.cells[0].innerHTML;
        }

        for (var i = 1, row; row = tableChequeData.rows[i]; i++) {

            DocType = "";
            IgnoreIQAFlag = "";
            IQAFlag = 0;
            IQAString = "";
            micr = row.cells[4].innerHTML;
            ocr = row.cells[4].innerHTML;
            fname = row.cells[0].innerHTML;
            docNo = row.cells[12].innerHTML;

            //debugger;

            if (row.cells[9].childNodes[0].checked == true)
                row.cells[10].innerHTML = "C";
            else if (row.cells[9].childNodes[2].checked == true)
                row.cells[10].innerHTML = "S";

            //debugger;
            var accVal = row.cells[27].innerHTML;

            if (accVal != "true") {
                alert("Alert! Account number validation is pending! Pls refer ValidAcc status for reference!");
                ValidationPassed = false;
                return false;
            }


            if (scanType == "1") {
                if (row.cells[10].innerHTML == "S")
                    creditaccno = row.cells[0].innerHTML;
                else
                    debitaccno = row.cells[1].innerHTML;
            }
            else if (scanType == "2") {
                creditaccno = row.cells[0].innerHTML;
                debitaccno = row.cells[1].innerHTML;
            }

            if (creditaccno == debitaccno) {
                alert("Alert! Credit and Debit Account number is same!");
                ValidationPassed = false;
                return false;
            }

            //debugger;
            //CompleteAccNo[i - 1] = row.cells[0].innerHTML;

            if (row.cells[10].innerHTML == "S") {
                slipNo += 1;
                slipTotalCount += 1;
                SlipAccNo = row.cells[0].innerHTML;
                // Slip Amount validation
                if (scanType == "1" && (row.cells[2].innerHTML == "0" || row.cells[2].innerHTML == null)) {
                    alert("Pls Enter Slip Amount");
                    ValidationPassed = false;
                    return false;
                }
                else if (scanType == "1")
                    slipAmt += parseInt(row.cells[2].innerHTML);

            }
            else if (row.cells[10].innerHTML == "C") {

                chqNo += 1;
                // Cheque amount validation
                if (row.cells[3].innerHTML == "0" || row.cells[3].innerHTML == null) {
                    alert("Pls Enter Cheque Amount");
                    ValidationPassed = false;
                    return false;
                }
                else
                    chqAmt += parseInt(row.cells[3].innerHTML);

                // Cheque date validation
                if (row.cells[4].innerHTML == null || row.cells[4].innerHTML == "") {
                    alert("Alert! Cheque Date not available!");
                    ValidationPassed = false;
                    return false;
                }
                else if (row.cells[4].innerHTML.length != 10) {
                    alert("Alert! Enter proper Cheque Date!");
                    ValidationPassed = false;
                    return false;
                }
                else {

                    var date = row.cells[4].innerHTML;
                    var dd = date.substring(0, 2);
                    var mm = date.substring(3, 5);
                    var yyyy = date.substring(6, 10);

                    if (!dd.match(/^\d+/) || !mm.match(/^\d+/) || !yyyy.match(/^\d+/)) {
                        alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
                        ValidationPassed = false;
                        return false;
                    }

                    var j1 = date.substring(2, 3);
                    var j2 = date.substring(5, 6);


                    if (j1 != "-" || j2 != "-") {
                        alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
                        ValidationPassed = false;
                        return false;
                    }

                    var fDate = dd + '-' + mm + '-' + yyyy;
                    var dateResult = validatedate(fDate);

                    if (dateResult == false) {
                        alert("Alert! Enter proper Cheque Date!");
                        ValidationPassed = false;
                        return false;
                    }


                    var sodResult = SodCheck(fDate);

                    if (sodResult == false) {
                        ValidationPassed = false;
                        return false;
                    }
                    chqDate = fDate;

                }

                // Chque No validation

                var chqNoVerf = row.cells[5].innerHTML;
                if (!chqNoVerf.match(/^\d+/)) {
                    alert("Alert! Cheque No can only accept number!");
                    ValidationPassed = false;
                    return false;
                }
                else if (chqNoVerf.length != 6) {
                    alert("Alert! 6 digit cheque no is required!");
                    ValidationPassed = false;
                    return false;
                }
                chq_no_final = chqNoVerf;

                // SortCode validation
                var sortCodeVerf = row.cells[6].innerHTML;
                if (!sortCodeVerf.match(/^\d+/)) {
                    alert("Alert! SortCode can only accept number!");
                    ValidationPassed = false;
                    return false;
                }
                else if (sortCodeVerf.length != 9) {
                    alert("Alert! 9 digit SortCode is required!");
                    ValidationPassed = false;
                    return false;
                }
                sort_code_final = sortCodeVerf;

                // SAN code validation
                var sanVerf = row.cells[7].innerHTML;
                if (!sanVerf.match(/^\d+/)) {
                    alert("Alert! SAN can only accept number!");
                    ValidationPassed = false;
                    return false;
                }
                else if (sanVerf != null && sanVerf != "") {
                    if (sanVerf.length != 6 && sanVerf.length != 7) {
                        alert("Alert! 6 or 7 digit SAN is required!");
                        ValidationPassed = false;
                        return false;
                    }

                    san_final = sanVerf;

                    // TR code validation
                    var trVerf = row.cells[8].innerHTML;
                    if (!trVerf.match(/^\d+/)) {
                        alert("Alert! TransCode can only accept number!");
                        ValidationPassed = false;
                        return false;
                    }
                    else if (trVerf.length != 2 && trVerf.length != 3) {
                        alert("Alert! 2 or 3 digit TransCode is required!");
                        ValidationPassed = false;
                        return false;
                    }
                    trcode_final = trVerf;
                }

                if (sanVerf == null || sanVerf == "") {
                    // TR code validation
                    var trVerf = row.cells[8].innerHTML;
                    if (!trVerf.match(/^\d+/)) {
                        alert("Alert! TransCode can only accept number!");
                        ValidationPassed = false;
                        return false;
                    }
                    else if (trVerf.length != 2 && trVerf.length != 3) {
                        alert("Alert! 2 or 3 digit TransCode is required!");
                        ValidationPassed = false;
                        return false;
                    }
                    trcode_final = trVerf;
                }

            }
        }

        //debugger;
        if (scanType == "1") {
            if (slipNo > 1) {
                alert("Alert! More than 1 slip cannot be accepted !");
                ValidationPassed = false;
                return false;
            }
            else if (chqNo != 1) {
                alert("Alert! Only 1 Cheque can be accepted !");
                ValidationPassed = false;
                return false;
            }


            if (slipNo == 0 && (document.getElementById("SlipFinName").innerHTML == "Account does not exist" || document.getElementById("SlipFinName").innerHTML == null || document.getElementById("SlipFinName").innerHTML == "")) {
                alert("Alert! Please Enter valid slip account number !");
                ValidationPassed = false;
                return false;
            }


            if (slipNo == 1) {
                for (var j = 1, row; row = tableChequeData.rows[j]; j++) {
                    if (row.cells[10].innerHTML == "C" && SlipAccNo == row.cells[1].innerHTML) {
                        alert("Alert! Slip and Chque account number cannot be same!");
                        ValidationPassed = false;
                        return false;
                    }
                    if (row.cells[10].innerHTML == "C")
                        ChqAccNo = row.cells[1].innerHTML;

                }
                document.getElementById("Chq_Dedit_AccNo").value = ChqAccNo;
            }

            if (slipAmt != chqAmt && slipNo != 0) {
                alert("Alert! Slip amount is not matching with Cheque amount !");
                ValidationPassed = false;
                return false;
            }

        }
        else if (scanType == "2") {
            if (slipNo != 0) {
                alert("Alert! Slips are not allowed!");
                ValidationPassed = false;
                return false;
            }
            if (chqNo == 0) {
                alert("Alert! Cheques are required!");
                ValidationPassed = false;
                return false;
            }
        }


        ValidationPassed = true;
        return true;

    }

    function CtsValidation() {
        //debugger;

        var clrType = document.getElementById("ClearingType").value;
        var scanType = document.getElementById("ScanningType").value;

        ValidationPassed = true;

        var SlipAmount = 0;
        var ChqAmount = 0;

        var previnstrumenttype = " ";
        var validationflag = 0;
        localIQA = 1;
        localIQATreatment = 1;

        var TypeTran = "CTS";
        if (TypeTran == "CTS") {
            Submit = "cts";
        }

        if (TypeTran == "CTS") {

            if (tableChequeData.rows.length == 0) {
                alert("Nothing to Validate");
                ValidationPassed = false;
                return false;
            }

            var slipNo = 0;
            var chqNo = 0;

            var slipAmt = 0;
            var chqAmt = 0;

            var SlipAccNo = null;
            var ChqAccNo = null;
            const CompleteAccNo = [];

            for (var i = 1, row; row = tableChequeData.rows[i]; i++) {

                DocType = "";
                IgnoreIQAFlag = "";
                IQAFlag = 0;
                IQAString = "";
                micr = row.cells[4].innerHTML;
                ocr = row.cells[4].innerHTML;
                fname = row.cells[0].innerHTML;
                docNo = row.cells[12].innerHTML;


                if (row.cells[9].childNodes[0].checked == true)
                    row.cells[8].innerHTML = "C";
                else if (row.cells[9].childNodes[2].checked == true)
                    row.cells[8].innerHTML = "S";

                var accVal = row.cells[26].innerHTML;

                if (scanType == "1" && row.cells[8].innerHTML == "S" && accVal != "true") {
                    alert("Alert! Account number validation is pending! Pls refer ValidAcc status for reference!");
                    ValidationPassed = false;
                    return false;
                }
                else if (scanType == "2" && accVal != "true") {
                    alert("Alert! Account number validation is pending! Pls refer ValidAcc status for reference!");
                    ValidationPassed = false;
                    return false;
                }
                //debugger;
                CompleteAccNo[i - 1] = row.cells[0].innerHTML;

                if (row.cells[8].innerHTML == "S") {
                    //debugger;
                    if (scanType == "2") {
                        alert("Alert! This is Retail without slip module");
                        ValidationPassed = false;
                        return false;
                    }

                    slipNo += 1;
                    slipTotalCount += 1;
                    SlipAccNo = row.cells[0].innerHTML;
                    // Slip Amount validation
                    if (row.cells[1].innerHTML == "0" || row.cells[1].innerHTML == null) {
                        alert("Pls Enter Slip Amount");
                        ValidationPassed = false;
                        return false;
                    }
                    else
                        slipAmt += parseInt(row.cells[1].innerHTML);

                }
                else if (row.cells[8].innerHTML == "C") {

                    chqNo += 1;
                    // Cheque amount validation
                    if (row.cells[2].innerHTML == "0" || row.cells[2].innerHTML == null) {
                        alert("Pls Enter Cheque Amount");
                        ValidationPassed = false;
                        return false;
                    }
                    else
                        chqAmt += parseInt(row.cells[2].innerHTML);

                    // Cheque date validation
                    if (row.cells[3].innerHTML == null || row.cells[3].innerHTML == "") {
                        alert("Alert! Cheque Date not available!");
                        ValidationPassed = false;
                        return false;
                    }
                    else if (row.cells[3].innerHTML.length != 10) {
                        alert("Alert! Enter proper Cheque Date!");
                        ValidationPassed = false;
                        return false;
                    }
                    else {

                        var date = row.cells[3].innerHTML;
                        var dd = date.substring(0, 2);
                        var mm = date.substring(3, 5);
                        var yyyy = date.substring(6, 10);

                        if (!dd.match(/^\d+/) || !mm.match(/^\d+/) || !yyyy.match(/^\d+/)) {
                            alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
                            ValidationPassed = false;
                            return false;
                        }

                        var j1 = date.substring(2, 3);
                        var j2 = date.substring(5, 6);


                        if (j1 != "-" || j2 != "-") {
                            alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
                            ValidationPassed = false;
                            return false;
                        }

                        var fDate = dd + '-' + mm + '-' + yyyy;
                        var dateResult = validatedate(fDate);

                        if (dateResult == false) {
                            alert("Alert! Enter proper Cheque Date!");
                            ValidationPassed = false;
                            return false;
                        }
                    }

                    // Chque No validation

                    var chqNoVerf = row.cells[4].innerHTML;
                    if (!chqNoVerf.match(/^\d+/)) {
                        alert("Alert! Cheque No can only accept number!");
                        ValidationPassed = false;
                        return false;
                    }
                    else if (chqNoVerf.length != 6) {
                        alert("Alert! 6 digit cheque no is required!");
                        ValidationPassed = false;
                        return false;
                    }
                    chq_no_final = chqNoVerf;

                    // SortCode validation
                    var sortCodeVerf = row.cells[5].innerHTML;
                    if (!sortCodeVerf.match(/^\d+/)) {
                        alert("Alert! SortCode can only accept number!");
                        ValidationPassed = false;
                        return false;
                    }
                    else if (sortCodeVerf.length != 9) {
                        alert("Alert! 9 digit SortCode is required!");
                        ValidationPassed = false;
                        return false;
                    }
                    sort_code_final = sortCodeVerf;

                    // SAN code validation
                    var sanVerf = row.cells[6].innerHTML;
                    if (!sanVerf.match(/^\d+/)) {
                        alert("Alert! SAN can only accept number!");
                        ValidationPassed = false;
                        return false;
                    }
                    else if (sanVerf.length != 6 && sanVerf.length != 7) {
                        alert("Alert! 6 or 7 digit SAN is required!");
                        ValidationPassed = false;
                        return false;
                    }
                    san_final = sanVerf;

                    // TR code validation
                    var trVerf = row.cells[7].innerHTML;
                    if (!trVerf.match(/^\d+/)) {
                        alert("Alert! TransCode can only accept number!");
                        ValidationPassed = false;
                        return false;
                    }
                    else if (trVerf.length != 2 && trVerf.length != 3) {
                        alert("Alert! 2 or 3 digit TransCode is required!");
                        ValidationPassed = false;
                        return false;
                    }
                    trcode_final = trVerf;
                }

            }

            //debugger;
            if (TypeTran == "CTS") {

                if (slipNo > 0 && scanType == "2") {
                    alert("Alert! This is Retail without slip module!");
                    ValidationPassed = false;
                    return false;
                }
                else if (slipNo < 1 && scanType == "1") {
                    alert("Alert! This is Retail with slip module! Minimum one slip is required !");
                    ValidationPassed = false;
                    return false;
                }
                else if (slipNo > 1 && scanType == "1") {
                    alert("Alert! This is Retail with slip module! Only one slip is required !");
                    ValidationPassed = false;
                    return false;
                }
                else if (chqNo == 0) {
                    alert("Alert! Atleast 1 cheque is required !");
                    ValidationPassed = false;
                    return false;
                }
            }

            if (slipNo == 0 && (document.getElementById("SlipFinName").innerHTML == "Account does not exist" || document.getElementById("SlipFinName").innerHTML == null || document.getElementById("SlipFinName").innerHTML == "")) {
                alert("Alert! Please Enter valid slip account number !");
                ValidationPassed = false;
                return false;
            }

            // Account number validation
            if (scanType == "1") {
                for (var j = 1, row; row = tableChequeData.rows[j]; j++) {
                    if (row.cells[8].innerHTML == "C" && SlipAccNo == row.cells[0].innerHTML) {
                        alert("Alert! Slip and Chque account number cannot be same!");
                        ValidationPassed = false;
                        return false;
                    }
                }
            }

            // Amount validation
            if (slipAmt != chqAmt && slipNo != 0 && scanType == "1") {
                alert("Alert! Slip amount is not matching with Cheque amount !");
                ValidationPassed = false;
                return false;
            }

            ValidationPassed = true;
            return true;
        }
        else {
            ValidationPassed = false;
            return false;
        }

    }

    function validatedate(inputText) {


        var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        // Match the date format through regular expression  
        if (inputText.match(dateformat)) {
            //document.form1.text1.focus();
            //Test which seperator is used '/' or '-'  
            var opera1 = inputText.split('/');
            var opera2 = inputText.split('-');
            lopera1 = opera1.length;
            lopera2 = opera2.length;
            // Extract the string into month, date and year  
            if (lopera1 > 1) {
                var pdate = inputText.split('/');
            }
            else if (lopera2 > 1) {
                var pdate = inputText.split('-');
            }
            var dd = parseInt(pdate[0]);
            var mm = parseInt(pdate[1]);
            var yy = parseInt(pdate[2]);
            // Create list of days of a month [assume there is no leap year by default]  
            var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            var currentDate = new Date();
            debugger;
            var dd_now = currentDate.getDate();
            var mm_now = currentDate.getUTCMonth() + 1;
            var yyyy_now = currentDate.getFullYear();

            debugger;
            if (mm == mm_now) {
                if (dd > dd_now) {
                    alert("Alert! Date is post Dated!");
                    return false;
                }
            }

            if (mm == 1 || mm > 2) {
                if (dd > ListofDays[mm - 1]) {
                    alert('Invalid date!');
                    return false;
                }
                
                
            }
            if (mm == 2) {
                var lyear = false;
                if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                    lyear = true;
                }
                if ((lyear == false) && (dd >= 29)) {
                    alert('Invalid date!');
                    return false;
                }
                if ((lyear == true) && (dd > 29)) {
                    alert('Invalid date!');
                    return false;
                }
            }
            return true;
        }
        else {
            alert("Invalid date !");
            //  document.form1.text1.focus();
            return false;
        }
        //  return true;
    }

    function getSignCtsTrfSuccess(result) {
        //debugger;
        //alert("This is getSignCtsTrfSuccess function within CommonValidation.js file");

        var tableSignData = document.getElementById('tblSign');

        while (tableSignData.rows.length > 1) {
            tableSignData.deleteRow(1);
        }
        for (var i = 0; i < result.length; i++) {
            //debugger;
            var row = document.createElement('tr');


            var cell = document.createElement('td');
            var imgTag = document.createElement('img');

            var cell0 = row.insertCell(0);
            cell0.innerHTML = result[i].Name;
            cell0.width = "450px";
            row.appendChild(cell0);

            //var base64img = "data:image/png;base64," + result[i].Signature;

            var cell1 = row.insertCell(1);

            imgTag.setAttribute('src', "data:image/(png|jpg);base64," + result[i].Signature);
            imgTag.setAttribute('height', "200px");
            imgTag.setAttribute('width', "200px");
            imgTag.id = "SignId_" + i;
            cell1.appendChild(imgTag);
            cell1.height = "100px";
            cell1.width = "100px";
            row.appendChild(cell1);

            var cell2 = row.insertCell(2);
            cell2.innerHTML = result[i].Status;
            row.appendChild(cell2);

            document.getElementById("tblSign").appendChild(row);

            $("#SignData").show();
        }
    }

    function PayeeNameChange(val) {
        //debugger;
        alert("Cheque payee name change!");
        document.getElementById("FinName").innerHTML = val;
        if (GlobalRowNo != " ") {
            //if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[8].innerHTML == "C") {
            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = val;
            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "1";
            //}
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = val;
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[29].innerHTML = "1";
        }
    }

    function PayeeNameChangeSlip(val) {
        //debugger;
        document.getElementById("SlipFinName").innerHTML = val;
        if (GlobalRowNo != " ") {
            if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[8].innerHTML == "S") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = val;
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "1";
                //document.getElementById("PayeeNameSlip_val").value = "1";
            }
            //else {
            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = val;
            //}
        }
    }

    function fullImage() {
        //debugger;
        //alert("Full Image function");

        document.getElementById("dialog_img").style.display = "block";
        document.getElementById("FullImg").src = document.getElementById("FG").src;

    }

    function zoomOut() {
        //alert("Zoom out function");
        document.getElementById("dialog_img").style.display = "none";
    }

    function DateValidation(date1) {
        debugger;
        var date = "";
        if (date1 == null || date1 == "")
            date = document.getElementById("ChequeDateTxt").value;
        else
            date = date1;

        var dd = date.substring(0, 2);
        var mm = date.substring(3, 5);
        var yyyy = date.substring(6, 10);

        if (date == null || date == "") {
            alert("Date field is blank!");
            //document.getElementById("ChequeDateTxt").focus();
            ValidationPassed = false;
            return false;
        }

        if (!dd.match(/^\d+/) || !mm.match(/^\d+/) || !yyyy.match(/^\d+/)) {
            alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
            //document.getElementById("ChequeDateTxt").focus();
            ValidationPassed = false;
            return false;
        }

        var j1 = date.substring(2, 3);
        var j2 = date.substring(5, 6);


        if (j1 != "-" || j2 != "-") {
            alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
            //document.getElementById("ChequeDateTxt").focus();
            ValidationPassed = false;
            return false;
        }

        var fDate = dd + '-' + mm + '-' + yyyy;
        var dateResult = validatedate(fDate);

        if (dateResult == false) {
            alert("Alert! Enter proper Cheque Date!");
            //document.getElementById("ChequeDateTxt").focus();
            ValidationPassed = false;
            return false;
        }

        var sodResult = SodCheck(fDate);

        if (sodResult == false) {
            //document.getElementById("ChequeDateTxt").focus();
            ValidationPassed = false;
            return false;
        }

    }


    function SodCheck(ChqDate) {
        debugger;
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


        var currentDate = dd + '/' + mm + '/' + yyyy;
        debugger;

        var dateSplit = ChqDate.split('-');
        //var d1 = dateSplit[0];
        //var m1 = dateSplit[1];
        //var y1 = dateSplit[2];

        var dd = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];

        var chequeDate = new Date(dd);

        //var date2 = new Date();
        //date2 = new Date(currentDate.datepicker("getDate"));

        //debugger;
        //var dd = null;
        //dd.nextDayDate.setDate(currentDate.getDate() + 1);

        var nextDayDate = new Date();
        nextDayDate.setDate(today.getDate() + 1);

        var PostDate = nextDayDate;
        // postDate Check

        var staledt = new Date(today);
        staledt.setMonth(staledt.getMonth() - 3);
        staledt.setDate(staledt.getDate() + 1);

        var StaleDate = staledt;

        debugger;
        if (PostDate <= chequeDate) {
            alert('Alert! Date is Post Dated!');
            return false;
        }
        if (StaleDate >= chequeDate) {
            alert('Alert! Date is Stale Dated!');
            return false;
        }

        return true;
        //debugger;

    }


    function chequeNoValidation() {
        var data = document.getElementById("chqnoDataEntry").value;

        if (data == null || data == "") {
            alert("Alert! Cheque No can not be null!");
            return false;
        }
        else if (!data.match(/^\d+/)) {
            alert("Alert! Cheque No can only accept number!");
            return false;
        }
        else if (data.length != 6) {
            alert("Alert! 6 digit cheque no is required!");
            return false;
        }

        return true;
    }


    function WithdrawChecker() {

        // Acc no verification
        var accno = document.getElementById("accno").value;
        if (accno == null || accno == "") {
            alert("Account number cannot be blank!");
            return false;
        }
        else if (accno == "0" || accno == "00" || accno == "000" || accno == "0000") {
            alert("Alert! Enter valid account number!");
            return false;
        }

        // Payee name verification
        var name = document.getElementById("name").value;
        if (name == null || name == "") {
            alert("Alert! Payee name cannot be blank!");
            return false;
        }


        debugger;
        if (tranType == "CASHWDL") {
            // Date verification
            var date = document.getElementById("ChequeDateTxt").value;

            var out_date_1 = DateValidation();
            if (out_date_1 == false)
                return false;

            // Post and Stale Date
            var date_check = SodCheck(date);
            if (date_check == false)
                return false;
        }

        

        // Amount
        var amt = document.getElementById("amt").value;
        if (amt == null || amt == "") {
            alert("Alert! Amount cannot be null!");
            return false;
        }
        else if (!amt.match(/^\d+/)) {
            alert("Alert! Amount can only accept numbers");
            return false;
        }

        return true;

    }


    function toAccNo_focusOut() {
        debugger;
        var scanType = document.getElementById("scanning_type").value;

        if (GlobalRowNo != " ") {
            if (scanType == "1")
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[29].innerHTML = "0";
            else if (scanType == "2")
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[31].innerHTML = "0";

            GetPayeeeDtls(document.getElementById('ToAccount').value, 'S');
        }
        
    }


    function fromAccNo_focusOut() {
        debugger;
        var scanType = document.getElementById("scanning_type").value;

        if (GlobalRowNo != " ") {
            if (scanType == "1")
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[29].innerHTML = "0";
            else if (scanType == "2")
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "0";

            GetPayeeeDtls(document.getElementById('AccountNo').value, 'C');
        }
        
    }


    function GetPayeeeDtls(Acc, Type) {
        //debugger;
        var scanType = document.getElementById("scanning_type").value;

        debugger;
        if (GlobalRowNo != " ") {

            if (scanType == "1") {
                if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[10].innerHTML == "S") {
                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("ToAccount").value;
                }
                else {
                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = document.getElementById("AccountNo").value;
                }
            }
            else if (scanType == "2") {
                if (Type == "S") {
                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("ToAccount").value;
                }
                else {
                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = document.getElementById("AccountNo").value;
                }
            }

        }


        $.ajax({
            url: x + "GetCBSDtls",
            headers: authHeaders,
            type: 'POST',
            //url: "http://10.9.0.222/WebApi/api/Scanner/GetCBSDtls",
            crossDomain: true,
            data: { 'ac': Acc.trim() },
            success: function (result) {

                debugger;

                //Aniket
                if (scanType == "1") {
                    var cellType = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[10].innerHTML;
                    //debugger;
                    var pageAccNo = Acc;
                    if (Type == "C") {
                        //debugger;
                        var cellAccNo = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML;

                        if (GlobalRowNo != " ") {
                            if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[29].innerHTML == "0") {
                                $("#FinName").text("");
                            }
                        }

                        //if (document.getElementById("PayeeNameCheque_val").value == "0") {
                        //    $("#FinName").text("");
                        //}

                        $("#FinAccOwner").text("");
                        $("#FinAccountStatus").text("");
                        $("#FinMOP").text("");
                        /*$("#FinAmount").text("");*/
                        $("#iqa").text("");
                        $("#uvData").text("");
                        $("#irData").text("");
                        $("#microLettering").text("");
                        $("#FinScheme").text("");
                        $("#FinMOP").text("");

                        //var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
                        //Pay = Pay + '</select>';
                        //$('#Payeeee').html(Pay);

                        var FinDetails = {};
                        FinDetails = result;
                        if (FinDetails.cbsdls == null) {
                            $("#FinName").text("Account does not exist");
                            $("#FinName").css('color', 'red');
                            //debugger;
                            if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo) {
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "false";
                                //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "red";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "";
                            }
                            //GlobalRowNo = " ";
                        }
                        else if (FinDetails.cbsdls.includes("Account does not exist")) {
                            $("#FinName").text("Account does not exist");
                            $("#FinName").css('color', 'red');
                            //debugger;
                            if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo) {
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "false";
                                //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "red";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "";
                            }
                            //GlobalRowNo = " ";
                            return false;
                        }
                        else {
                            //debugger;
                            var chqPayeeName_val = "0";

                            if (GlobalRowNo != " ") {
                                chqPayeeName_val = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[29].innerHTML;
                            }

                            if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo && chqPayeeName_val == "0") {
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "true";
                                //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "green";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = FinDetails.PayeeName[0];
                                //document.getElementById("PayeeNameCheque_val").value = "1";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[29].innerHTML = "1";
                            }
                            //GlobalRowNo = " ";
                            if (FinDetails.PayeeName != null && chqPayeeName_val == "0") {
                                $("#FinName").text(FinDetails.PayeeName[0]);                //done aniket
                                $("#FinName").css('color', 'black');
                            }
                            if (FinDetails.AccountOwnership != null) {
                                $("#FinAccOwner").text(FinDetails.AccountOwnership);
                            }
                            if (FinDetails.AccountStatus != null) {
                                //$("#FinAccountStatus").text(FinDetails.AccountStatus);      //done aniket

                                AccStatusCode(FinDetails.AccountStatus);

                                //var accStatus = FinDetails.AccountStatus;

                                //if (accStatus.toUpperCase() == "A") {
                                //    $("#FinAccountStatus").text(FinDetails.AccountStatus + " - Active");
                                //    $("#FinAccountStatus").css('color', 'green');
                                //}
                                //else if (accStatus.toUpperCase() == "C") {
                                //    $("#FinAccountStatus").text(FinDetails.AccountStatus + " - Closed");
                                //    $("#FinAccountStatus").css('color', 'red');
                                //}
                                //else if (accStatus.toUpperCase() == "D") {
                                //    $("#FinAccountStatus").text(FinDetails.AccountStatus + " - Dormant");
                                //    $("#FinAccountStatus").css('color', 'red');
                                //}
                                //else if (accStatus.toUpperCase() == "I") {
                                //    $("#FinAccountStatus").text(FinDetails.AccountStatus + " - Inactive");
                                //    $("#FinAccountStatus").css('color', 'red');
                                //}
                                //else if (accStatus.toUpperCase() == "S") {
                                //    $("#FinAccountStatus").text(FinDetails.AccountStatus + " - Stop payment");
                                //    $("#FinAccountStatus").css('color', 'red');
                                //}
                            }

                            //debugger;
                            if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML == "true") {
                                //debugger;
                                //var chqAccStatus = document.getElementById("FinAccountStatus").innerHTML;
                                var chqAccStatus = FinDetails.AccountStatus;
                                if (chqAccStatus.toUpperCase() != "A") {
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "false";
                                    //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "";

                                    //if (chqAccStatus.toUpperCase() == "I")
                                    //    alert("Alert! Debit Account Number is Inactive!");
                                    //else if (chqAccStatus.toUpperCase() == "D")
                                    //    alert("Alert! Debit Account Number is Dormant!");
                                    //else if (chqAccStatus.toUpperCase() == "C")
                                    //    alert("Alert! Debit Account Number is Closed!");
                                    //else if (chqAccStatus.toUpperCase() == "S")
                                    //    alert("Alert! Payment for Debit Account Number is stopped!");
                                    //else
                                    //    alert("Alert! Unknown status code!");

                                }
                            }

                            //if (FinDetails.Amount != null) {
                            //    $("#FinAmount").text(FinDetails.Amount);                    //done aniket
                            //}

                            // IQA
                            if (FinDetails.iqa != null) {
                                $("#iqa").text(FinDetails.iqa);
                                if (FinDetails.iqa.includes("Failed"))
                                    $("#iqa").css('color', 'red');
                                else
                                    $("#iqa").css('color', 'green');

                            }
                            else {
                                $("#iqa").text("Failed");
                                $("#iqa").css('color', 'red');
                            }

                            $("#iqa").text("Passed");
                            $("#iqa").css('color', 'white');
                            $("#iqa").css('background-color', 'green');

                            // UV Data
                            if (FinDetails.uvData != null) {
                                $("#uvData").text(FinDetails.uvData);
                                if (FinDetails.uvData.includes("Failed"))
                                    $("#uvData").css('color', 'red');
                                else
                                    $("#uvData").css('color', 'green');
                            }
                            else {
                                $("#uvData").text("Failed");
                                $("#uvData").css('color', 'red');
                            }

                            $("#uvData").text("Failed");
                            $("#uvData").css('color', 'white');
                            $("#uvData").css('background-color', 'red');

                            // IR Data
                            if (FinDetails.irData != null) {
                                $("#irData").text(FinDetails.irData);
                                if (FinDetails.irData.includes("Failed"))
                                    $("#irData").css('color', 'red');
                                else
                                    $("#irData").css('color', 'green');

                            }
                            else {
                                $("#irData").text("Failed");
                                $("#irData").css('color', 'red');
                            }

                            $("#irData").text("Failed");
                            $("#irData").css('color', 'white');
                            $("#irData").css('background-color', 'red');

                            // Micro Lettering
                            if (FinDetails.microLettering != null) {
                                $("#microLettering").text(FinDetails.microLettering);
                                if (FinDetails.microLettering.includes("Failed"))
                                    $("#microLettering").css('color', 'red');
                                else
                                    $("#microLettering").css('color', 'green');

                            }
                            else {
                                $("#microLettering").text("Failed");
                                $("#microLettering").css('color', 'red');
                            }

                            $("#microLettering").text("Failed");
                            $("#microLettering").css('color', 'white');
                            $("#microLettering").css('background-color', 'red');

                            if (FinDetails.MOP != null) {
                                $("#FinMOP").text(FinDetails.MOP);
                            }
                            if (FinDetails.SchemeCode != null) {
                                $("#FinScheme").text(FinDetails.SchemeCode);                //done aniket
                            }


                            if (chqPayeeName_val == "0") {
                                var PayeeName = {};
                                PayeeName = FinDetails.PayeeName;
                                var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
                                //  Pay = Pay + '<option>Select</option>';
                                if (PayeeName != null) {
                                    for (i = 0; i < PayeeName.length; i++) {
                                        Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                                    }
                                }
                                Pay = Pay + '</select>';
                                $('#Payeeee').html(Pay);
                            }


                        }
                    }
                    else {
                        //debugger;
                        var cellAccNo = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML;

                        if (flag == "Cash") {
                            $("#FinName").text("");
                            $("#FinAccOwner").text("");
                            $("#FinAccountStatus").text("");
                            $("#FinMOP").text("");
                            //$("#FinAmount").text("");
                            $("#iqa").text("");
                            $("#uvData").text("");
                            $("#irData").text("");
                            $("#microLettering").text("");
                            $("#FinScheme").text("");
                            $("#FinMOP").text("");
                            var Pay = "<select id='PayeeName' class='form-control'>";
                            Pay = Pay + '</select>';
                            $('#Payeeee').html(Pay);
                            var FinDetails = {};
                            FinDetails = result;
                            if (FinDetails.cbsdls == null) {
                                $("#FinName").text("Account does not exist");
                                $("#FinName").css('color', 'red');
                            }
                            else if (FinDetails.cbsdls.includes("Account does not exist")) {
                                $("#FinName").text("Account does not exist");
                                $("#FinName").css('color', 'red');
                                return false;
                            }
                            else {
                                if (FinDetails.PayeeName != null) {
                                    $("#FinName").text(FinDetails.PayeeName[0]);
                                }
                                if (FinDetails.AccountOwnership != null) {
                                    $("#FinAccOwner").text(FinDetails.AccountOwnership);
                                }
                                if (FinDetails.AccountStatus != null) {
                                    //$("#FinAccountStatus").text(FinDetails.AccountStatus);
                                    AccStatusCode(FinDetails.AccountStatus);
                                }
                                //if (FinDetails.Amount != null) {
                                //    $("#FinAmount").text(FinDetails.Amount);
                                //}

                                // IQA
                                if (FinDetails.iqa != null) {
                                    $("#iqa").text(FinDetails.iqa);
                                    if (FinDetails.iqa.includes("Failed"))
                                        $("#iqa").css('color', 'red');
                                    else
                                        $("#iqa").css('color', 'green');

                                }
                                else {
                                    $("#iqa").text("Failed");
                                    $("#iqa").css('color', 'red');
                                }


                                // UV Data
                                if (FinDetails.uvData != null) {
                                    $("#uvData").text(FinDetails.uvData);
                                    if (FinDetails.uvData.includes("Failed"))
                                        $("#uvData").css('color', 'red');
                                    else
                                        $("#uvData").css('color', 'green');
                                }
                                else {
                                    $("#uvData").text("Failed");
                                    $("#uvData").css('color', 'red');
                                }



                                // IR Data
                                if (FinDetails.irData != null) {
                                    $("#irData").text(FinDetails.irData);
                                    if (FinDetails.irData.includes("Failed"))
                                        $("#irData").css('color', 'red');
                                    else
                                        $("#irData").css('color', 'green');

                                }
                                else {
                                    $("#irData").text("Failed");
                                    $("#irData").css('color', 'red');
                                }

                                // Micro Lettering
                                if (FinDetails.microLettering != null) {
                                    $("#microLettering").text(FinDetails.microLettering);
                                    if (FinDetails.microLettering.includes("Failed"))
                                        $("#microLettering").css('color', 'red');
                                    else
                                        $("#microLettering").css('color', 'green');

                                }
                                else {
                                    $("#microLettering").text("Failed");
                                    $("#microLettering").css('color', 'red');
                                }

                                $("#iqa").text("Passed");
                                $("#iqa").css('color', 'white');
                                $("#iqa").css('background-color', 'green');


                                $("#uvData").text("Failed");
                                $("#uvData").css('color', 'white');
                                $("#uvData").css('background-color', 'red');


                                $("#irData").text("Failed");
                                $("#irData").css('color', 'white');
                                $("#irData").css('background-color', 'red');


                                $("#microLettering").text("Failed");
                                $("#microLettering").css('color', 'white');
                                $("#microLettering").css('background-color', 'red');

                                if (FinDetails.MOP != null) {
                                    $("#FinMOP").text(FinDetails.MOP);
                                }
                                if (FinDetails.SchemeCode != null) {
                                    $("#FinScheme").text(FinDetails.SchemeCode);
                                }

                                var PayeeName = {};
                                PayeeName = FinDetails.PayeeName;
                                var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
                                //  Pay = Pay + '<option>Select</option>';
                                if (PayeeName != null) {
                                    for (i = 0; i < PayeeName.length; i++) {
                                        Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                                    }
                                }
                                Pay = Pay + '</select>';
                                $('#Payeeee').html(Pay);

                            }

                        }
                        else {

                            //debugger;
                            // Slip
                            var d1 = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML;
                            var d2 = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML;
                            var d3 = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[29].innerHTML;
                            //debugger;

                            if (GlobalRowNo != " ") {
                                //if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML == "0")
                                if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[29].innerHTML == "")
                                    $("#SlipFinName").text("");
                            }

                            //if (document.getElementById("PayeeNameSlip_val").value == "0") {
                            //    $("#SlipFinName").text("");
                            //}

                            $("#SlipFinAccOwner").text("");
                            $("#SlipFinAccountStatus").text("");
                            $("#SlipFinMOP").text("");
                            $("#SlipFinAmount").text("");
                            $("#SlipFinScheme").text("");
                            $("#SlipFinMOP").text("");

                            //debugger;
                            //var Pay = "<select id='SlipFinPayeeName' class='form-control' onchange='PayeeNameChangeSlip(this.value)'>";
                            //Pay = Pay + '</select>';
                            //$('#SlipFinPay').html(Pay);

                            var FinDetails = {};
                            FinDetails = result;
                            if (FinDetails.cbsdls == null) {
                                $("#SlipFinName").text("Account does not exist");
                                $("#SlipFinName").css('color', 'red');
                                //debugger;
                                if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo) {
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "false";
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML.backgroundColor = "red";
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "";
                                }
                                //GlobalRowNo = " ";
                            }
                            else if (FinDetails.cbsdls.includes("Account does not exist")) {
                                $("#SlipFinName").text("Account does not exist");
                                $("#SlipFinName").css('color', 'red');
                                //debugger;
                                if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo) {
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "false";
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML.backgroundColor = "red";
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "";
                                }
                                //GlobalRowNo = " ";
                            }
                            else {
                                //debugger;
                                var slipPayeeName_val = "0";

                                if (GlobalRowNo != " ") {
                                    slipPayeeName_val = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[29].innerHTML;
                                }

                                if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo && slipPayeeName_val == "0") {
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "true";
                                    //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "green";
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = FinDetails.PayeeName[0];
                                    //document.getElementById("PayeeNameSlip_val").value = "1";
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[29].innerHTML = "1";
                                }

                                //GlobalRowNo = " ";
                                if (FinDetails.PayeeName != null && slipPayeeName_val == "0") {
                                    $("#SlipFinName").text(FinDetails.PayeeName[0]);
                                    $("#SlipFinName").css('color', 'black');
                                }
                                if (FinDetails.AccountOwnership != null) {
                                    $("#SlipFinAccOwner").text(FinDetails.AccountOwnership);
                                }
                                if (FinDetails.AccountStatus != null) {

                                    AccSlipStatusCode(FinDetails.AccountStatus);

                                    //var accStatus = FinDetails.AccountStatus;

                                    //if (accStatus.toUpperCase() == "A") {
                                    //    $("#SlipFinAccountStatus").text(FinDetails.AccountStatus + " - Active");
                                    //    $("#SlipFinAccountStatus").css('color', 'green');
                                    //}
                                    //else if (accStatus.toUpperCase() == "C") {
                                    //    $("#SlipFinAccountStatus").text(FinDetails.AccountStatus + " - Closed");
                                    //    $("#SlipFinAccountStatus").css('color', 'red');
                                    //}
                                    //else if (accStatus.toUpperCase() == "D") {
                                    //    $("#SlipFinAccountStatus").text(FinDetails.AccountStatus + " - Dormant");
                                    //    $("#SlipFinAccountStatus").css('color', 'red');
                                    //}
                                    //else if (accStatus.toUpperCase() == "I") {
                                    //    $("#SlipFinAccountStatus").text(FinDetails.AccountStatus + " - Inactive");
                                    //    $("#SlipFinAccountStatus").css('color', 'red');
                                    //}
                                    //else if (accStatus.toUpperCase() == "S") {
                                    //    $("#SlipFinAccountStatus").text(FinDetails.AccountStatus + " - Stop payment");
                                    //    $("#SlipFinAccountStatus").css('color', 'red');
                                    //}

                                }

                                //debugger;
                                if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML == "true") {
                                    //debugger;
                                    //var slipAccStatus = document.getElementById("SlipFinAccountStatus").innerHTML;
                                    var slipAccStatus = FinDetails.AccountStatus;
                                    if (slipAccStatus.toUpperCase() != "A") {
                                        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "false";
                                        ////document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "";

                                        //if (slipAccStatus.toUpperCase() == "I")
                                        //    alert("Alert! Credit Account Number is Inactive!");
                                        //else if (slipAccStatus.toUpperCase() == "D")
                                        //    alert("Alert! Credit Account Number is Dormant!");
                                        //else if (slipAccStatus.toUpperCase() == "C")
                                        //    alert("Alert! Credit Account Number is Closed!");
                                        //else if (slipAccStatus.toUpperCase() == "S")
                                        //    alert("Alert! Payment for Credit Account Number is stopped!");
                                        //else
                                        //    alert("Alert! Unknown status code!");

                                    }
                                }                               


                                if (FinDetails.Amount != null) {
                                    $("#SlipFinAmount").text(FinDetails.Amount);
                                }
                                if (FinDetails.MOP != null) {
                                    $("#SlipFinMOP").text(FinDetails.MOP);
                                }
                                if (FinDetails.SchemeCode != null) {
                                    $("#SlipFinScheme").text(FinDetails.SchemeCode);
                                }
                                if (FinDetails.MOP != null) {
                                    $("#SlipFinMOP").text(FinDetails.MOP);
                                }

                                var PayeeName = {};
                                PayeeName = FinDetails.PayeeName;

                                if (slipPayeeName_val == "0") {
                                    var Pay = "<select id='SlipFinPayeeName' class='form-control' onchange='PayeeNameChangeSlip(this.value)'>";
                                    //  Pay = Pay + '<option>Select</option>';
                                    if (PayeeName != null) {
                                        for (i = 0; i < PayeeName.length; i++) {
                                            Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                                        }
                                    }
                                    Pay = Pay + '</select>';
                                    $('#SlipFinPay').html(Pay);
                                }

                            }

                        }

                    }
                }
                else if (scanType == "2") {
                    debugger;
                    if (Type == "C") {
                        debugger;
                        if (GlobalRowNo != " ") {
                            if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML == "0") {
                                $("#FinName").text("");
                            }
                        }

                        $("#FinAccOwner").text("");
                        $("#FinAccountStatus").text("");
                        $("#FinMOP").text("");
                        //$("#FinAmount").text("");

                        $("#iqa").text("");
                        $("#uvData").text("");
                        $("#irData").text("");
                        $("#microLettering").text("");

                        $("#FinScheme").text("");
                        $("#FinMOP").text("");

                        //var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
                        //Pay = Pay + '</select>';
                        //$('#Payeeee').html(Pay);

                        var FinDetails = {};
                        FinDetails = result;

                        //debugger;
                        //var ac2 = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML;
                        //var ac3 = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[31].innerHTML;
                        //var ac4 = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[32].innerHTML;
                        debugger;

                        var chqPayeeName_val = "0";

                        if (GlobalRowNo != " ") {
                            chqPayeeName_val = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML;
                        }

                        if (FinDetails.cbsdls == null) {
                            debugger;
                            $("#FinName").text("Account does not exist");
                            $("#FinName").css('color', 'red');
                            //debugger;
                            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "false";
                            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "";
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[32].innerHTML = "N";
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "0";
                            //return false;
                        }
                        else if (FinDetails.cbsdls.includes("Account does not exist")) {
                            debugger;
                            $("#FinName").text("Account does not exist");
                            $("#FinName").css('color', 'red');
                            //debugger;
                            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "false";
                            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "";
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[32].innerHTML = "N";
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "0";

                            //return false;
                        }
                        else {
                            if (GlobalRowNo != " ") {
                                //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "true";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = FinDetails.PayeeName[0];
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[32].innerHTML = "Y";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "1";
                            }
                            if (FinDetails.PayeeName != null && chqPayeeName_val == "0") {
                                $("#FinName").text(FinDetails.PayeeName[0]);                //done aniket
                                $("#FinName").css('color', 'black');
                            }
                            if (FinDetails.AccountOwnership != null) {
                                $("#FinAccOwner").text(FinDetails.AccountOwnership);
                            }
                            if (FinDetails.AccountStatus != null) {

                                AccStatusCode(FinDetails.AccountStatus);

                                var accStatus = FinDetails.AccountStatus;

                                //if (accStatus.toUpperCase() == "A") {
                                //    $("#FinAccountStatus").text(FinDetails.AccountStatus + " - Active");
                                //    $("#FinAccountStatus").css('color', 'green');
                                //}
                                //else if (accStatus.toUpperCase() == "C") {
                                //    $("#FinAccountStatus").text(FinDetails.AccountStatus + " - Closed");
                                //    alert("Alert! Debit Account Number is Closed!");
                                //}
                                //else if (accStatus.toUpperCase() == "D") {
                                //    $("#FinAccountStatus").text(FinDetails.AccountStatus + " - Dormant");
                                //    alert("Alert! Debit Account Number is Dormant!");
                                //}
                                //else if (accStatus.toUpperCase() == "I") {
                                //    $("#FinAccountStatus").text(FinDetails.AccountStatus + " - Inactive");
                                //    alert("Alert! Debit Account Number is Inactive!");
                                //}
                                //else if (accStatus.toUpperCase() == "S") {
                                //    $("#FinAccountStatus").text(FinDetails.AccountStatus + " - Stop payment");
                                //    alert("Alert! Payment for Debit Account Number is stopped!");
                                //}

                                if (accStatus.toUpperCase() != "A") {
                                    //$("#FinAccountStatus").css('color', 'red');
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[32].innerHTML = "N";
                                }
                            }
                            //if (FinDetails.Amount != null) {
                            //    $("#FinAmount").text(FinDetails.Amount);                    //done aniket
                            //}

                            // IQA
                            if (FinDetails.iqa != null) {
                                $("#iqa").text(FinDetails.iqa);
                                if (FinDetails.iqa.includes("Failed"))
                                    $("#iqa").css('color', 'red');
                                else
                                    $("#iqa").css('color', 'green');

                            }
                            else {
                                $("#iqa").text("Failed");
                                $("#iqa").css('color', 'red');
                            }


                            // UV Data
                            if (FinDetails.uvData != null) {
                                $("#uvData").text(FinDetails.uvData);
                                if (FinDetails.uvData.includes("Failed"))
                                    $("#uvData").css('color', 'red');
                                else
                                    $("#uvData").css('color', 'green');
                            }
                            else {
                                $("#uvData").text("Failed");
                                $("#uvData").css('color', 'red');
                            }



                            // IR Data
                            if (FinDetails.irData != null) {
                                $("#irData").text(FinDetails.irData);
                                if (FinDetails.irData.includes("Failed"))
                                    $("#irData").css('color', 'red');
                                else
                                    $("#irData").css('color', 'green');

                            }
                            else {
                                $("#irData").text("Failed");
                                $("#irData").css('color', 'red');
                            }

                            // Micro Lettering
                            if (FinDetails.microLettering != null) {
                                $("#microLettering").text(FinDetails.microLettering);
                                if (FinDetails.microLettering.includes("Failed"))
                                    $("#microLettering").css('color', 'red');
                                else
                                    $("#microLettering").css('color', 'green');

                            }
                            else {
                                $("#microLettering").text("Failed");
                                $("#microLettering").css('color', 'red');
                            }

                            $("#iqa").text("Passed");
                            $("#iqa").css('color', 'white');
                            $("#iqa").css('background-color', 'green');


                            $("#uvData").text("Failed");
                            $("#uvData").css('color', 'white');
                            $("#uvData").css('background-color', 'red');


                            $("#irData").text("Failed");
                            $("#irData").css('color', 'white');
                            $("#irData").css('background-color', 'red');


                            $("#microLettering").text("Failed");
                            $("#microLettering").css('color', 'white');
                            $("#microLettering").css('background-color', 'red');

                            if (FinDetails.MOP != null) {
                                $("#FinMOP").text(FinDetails.MOP);
                            }
                            if (FinDetails.SchemeCode != null) {
                                $("#FinScheme").text(FinDetails.SchemeCode);                //done aniket
                            }

                            if (chqPayeeName_val == "0") {
                                var PayeeName = {};
                                PayeeName = FinDetails.PayeeName;
                                var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
                                //  Pay = Pay + '<option>Select</option>';
                                if (PayeeName != null) {
                                    for (i = 0; i < PayeeName.length; i++) {
                                        Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                                    }
                                }
                                Pay = Pay + '</select>';
                                $('#Payeeee').html(Pay);
                            }
                        }
                    }
                    else if (Type == "S") {
                        debugger;

                        if (GlobalRowNo != " ") {
                            if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[31].innerHTML == "0")
                                $("#SlipFinName").text("");
                        }

                        //if (document.getElementById("PayeeNameSlip_val").value == "0") {
                        //    $("#SlipFinName").text("");
                        //}

                        $("#SlipFinAccOwner").text("");
                        $("#SlipFinAccountStatus").text("");
                        $("#SlipFinMOP").text("");
                        $("#SlipFinAmount").text("");
                        $("#SlipFinScheme").text("");
                        $("#SlipFinMOP").text("");

                        var FinDetails = {};
                        FinDetails = result;
                        if (FinDetails.cbsdls == null) {
                            $("#SlipFinName").text("Account does not exist");
                            $("#SlipFinName").css('color', 'red');
                            //debugger;
                            if (GlobalRowNo != " ") {
                                //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "false";
                                //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "0";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML = "N";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[31].innerHTML = "0";
                            }
                        }
                        else if (FinDetails.cbsdls.includes("Account does not exist")) {
                            $("#SlipFinName").text("Account does not exist");
                            $("#SlipFinName").css('color', 'red');
                            //debugger;
                            if (GlobalRowNo != " ") {
                                //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "false";
                                //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "0";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML = "N";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[31].innerHTML = "0";
                            }
                            //GlobalRowNo = " ";
                        }
                        else {

                            var slipPayeeName_val = "0";

                            if (GlobalRowNo != " ") {
                                slipPayeeName_val = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[31].innerHTML;
                            }

                            //var Pay = "<select id='SlipFinPayeeName' class='form-control' onchange='PayeeNameChangeSlip(this.value)'>";
                            //Pay = Pay + '</select>';
                            //$('#SlipFinPay').html(Pay);

                            if (GlobalRowNo != " ") {
                                //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = FinDetails.PayeeName[0];
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML = "Y";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[31].innerHTML = "1";
                            }
                            if (FinDetails.PayeeName != null && slipPayeeName_val == "0") {
                                $("#SlipFinName").text(FinDetails.PayeeName[0]);
                                $("#SlipFinName").css('color', 'black');
                            }
                            if (FinDetails.AccountOwnership != null) {
                                $("#SlipFinAccOwner").text(FinDetails.AccountOwnership);
                            }
                            if (FinDetails.AccountStatus != null) {

                                AccSlipStatusCode(FinDetails.AccountStatus);

                                var accStatus = FinDetails.AccountStatus;

                                //if (accStatus.toUpperCase() == "A") {
                                //    $("#SlipFinAccountStatus").text(FinDetails.AccountStatus + " - Active");
                                //    $("#SlipFinAccountStatus").css('color', 'green');
                                //}
                                //else if (accStatus.toUpperCase() == "C") {
                                //    $("#SlipFinAccountStatus").text(FinDetails.AccountStatus + " - Closed");
                                //    alert("Alert! Debit Account Number is Closed!");
                                //}
                                //else if (accStatus.toUpperCase() == "D") {
                                //    $("#SlipFinAccountStatus").text(FinDetails.AccountStatus + " - Dormant");
                                //    alert("Alert! Debit Account Number is Dormant!");
                                //}
                                //else if (accStatus.toUpperCase() == "I") {
                                //    $("#SlipFinAccountStatus").text(FinDetails.AccountStatus + " - Inactive");
                                //    alert("Alert! Debit Account Number is Inactive!");
                                //}
                                //else if (accStatus.toUpperCase() == "S") {
                                //    $("#SlipFinAccountStatus").text(FinDetails.AccountStatus + " - Stop payment");
                                //    alert("Alert! Payment for Debit Account Number is stopped!");
                                //}

                                if (accStatus.toUpperCase() != "A") {
                                    //$("#SlipFinAccountStatus").css('color', 'red');
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML = "N";
                                }
                            }
                            if (FinDetails.Amount != null) {
                                $("#SlipFinAmount").text(FinDetails.Amount);                    //done aniket
                            }
                            if (FinDetails.MOP != null) {
                                $("#SlipFinMOP").text(FinDetails.MOP);
                            }
                            if (FinDetails.SchemeCode != null) {
                                $("#SlipFinScheme").text(FinDetails.SchemeCode);                //done aniket
                            }
                            debugger;

                            var PayeeName = {};
                            PayeeName = FinDetails.PayeeName;

                            if (slipPayeeName_val == "0") {
                                var Pay = "<select id='SlipFinPayeeName' class='form-control' onchange='PayeeNameChangeSlip(this.value)'>";
                                //  Pay = Pay + '<option>Select</option>';
                                if (PayeeName != null) {
                                    for (i = 0; i < PayeeName.length; i++) {
                                        Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                                    }
                                }
                                Pay = Pay + '</select>';
                                $('#SlipFinPay').html(Pay);
                            }
                        }
                    }

                    if (GlobalRowNo != " " && document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[30].innerHTML == "Y"
                        && document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[32].innerHTML == "Y") {
                        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "true";
                    }
                    else if (GlobalRowNo != " ")
                        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = "false";
                }

            },
            error: getError
        });
    }


    function txt_to_grid() {
        //debugger;
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = document.getElementById("HalfSlipAmount").value;
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[3].innerHTML = document.getElementById("HalfChequeAmount").value;
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = document.getElementById("ChequeDateTxt").value;
        var TotSlpAmt = 0;
        var TotChqAmt = 0;
        for (var i = 1, row; row = tableChequeData.rows[i]; i++) {


            TotSlpAmt = TotSlpAmt + parseFloat(row.cells[2].innerHTML);
            TotChqAmt = TotChqAmt + parseFloat(row.cells[3].innerHTML);
        }
        //debugger;

        var dType = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[10].innerHTML;

        if (dType == "C") {
            //debugger;
            var chqNo_DE = document.getElementById("chqnoDataEntry").value;
            if (chqNo_DE != "" && chqNo_DE.length == 6) {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = chqNo_DE;
                document.getElementById("chqnoDataEntry").style.borderColor = "green";
            }
            else {
                document.getElementById("chqnoDataEntry").focus();
                document.getElementById("chqnoDataEntry").style.borderColor = "red";
                return false;
            }

            var sortcode_de = document.getElementById("sortcodeDataEntry").value;
            if (sortcode_de != "" && sortcode_de.length == 9) {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[6].innerHTML = sortcode_de;
                document.getElementById("sortcodeDataEntry").style.borderColor = "green";
            }
            else {
                document.getElementById("sortcodeDataEntry").focus();
                document.getElementById("sortcodeDataEntry").style.borderColor = "red";
                return false;
            }

            var san_de = document.getElementById("sanDataEntry").value;
            //if (san_de != "" && san_de != null) {
            //    if ((san_de.length == 6 || san_de.length == 7) && (san_de != "000000" || san_de != "0000000")) {
            //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[7].innerHTML = san_de;
            //        document.getElementById("sanDataEntry").style.borderColor = "green";
            //    }
            //    else {
            //        document.getElementById("sanDataEntry").focus();
            //        document.getElementById("sanDataEntry").style.borderColor = "red";
            //        return false;
            //    }
            //}
            if (san_de != "" && (san_de.length == 6 || san_de.length == 7)) {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[7].innerHTML = san_de;
                document.getElementById("sanDataEntry").style.borderColor = "green";
            }
            else {
                document.getElementById("sanDataEntry").focus();
                document.getElementById("sanDataEntry").style.borderColor = "red";
                return false;
            }

            var tr_de = document.getElementById("trDataEntry").value;
            if (tr_de != "" && (tr_de.length == 2 || tr_de.length == 3)) {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[8].innerHTML = tr_de;
                document.getElementById("trDataEntry").style.borderColor = "green";
            }
            else {
                document.getElementById("trDataEntry").focus();
                document.getElementById("trDataEntry").style.borderColor = "red";
                return false;
            }
        }

        document.getElementById("SlipAmountForCheque").innerHTML = TotSlpAmt;
        //document.getElementById("SlipAmountForCheque").value = TotSlpAmt;
        document.getElementById("DenomAmountForCheque").innerHTML = TotChqAmt;
        //document.getElementById("DenomAmountForCheque").value = TotChqAmt;

        //var dateResult = DateValidation();
    }


    function decisionPress() {
        debugger;
        var decision = document.getElementById("decision").value.toUpperCase();

        $("#rejectDiv").hide();
        //$("#rejectList").hide();
        $("#popup2").hide();
        //$("#partial_table").hide();
        
        if (decision != "A" && decision != "R")
            document.getElementById("decision").value = "";
        else {
            document.getElementById("decision").value = decision;
            if (decision == "R") {
                $("#rejectDiv").show();
                //$("#rejectList").show();
                //$("#partial_table").show();

                $.ajax({
                    url: x + "ItemReturnList",
                    //headers: authHeaders,
                    type: 'POST',
                    success: itemReasonPopUp,
                    error: getError
                });
            }
            else {
                document.getElementById("rejectCode").value = "";
                document.getElementById("rejectDescription").value = "";
            }
                
        }
            
    }


    function SubmitDecision(type, verf) {
        debugger;
        if (type == "TRF") {

            debugger;
            var decision = document.getElementById("decision").value.toUpperCase();

            if (decision != "A" && decision != "R") {
                alert("Enter correct decision!");
                return false;
            }

            var code = document.getElementById("rejectCode").value;
            var desc = document.getElementById("rejectDescription").value;

            debugger;

            if (decision == "R" && (code == null || code == "" || desc == null || desc == "")) {
                alert("Reject Code and description is mandatory!");
                return false;
            }

            debugger;
            if (decision != "R")
                TransferCtsValidation();
            else
                ValidationPassed = true;
            debugger;

            if (ValidationPassed == true) {
                var scanType = document.getElementById("scanning_type").value;

                var debitAccno = document.getElementById("AccountNo").value;
                var creditAccno = document.getElementById("ToAccount").value;
                var amt = document.getElementById("DenomAmountForCheque").innerHTML;
                var PName = $("#FinName").text();

                var gusername = window.localStorage.getItem('username');

                var cid = document.getElementById("cid").value;
                var icr = document.getElementById("icr_id").value;

                debugger;

                //var verfLevel = document.getElementById("verfLevel").value;

                var y = "postCheckerData";

                $.ajax({
                    url: x + y,
                    headers: authHeaders,
                    type: 'POST',
                    data: {
                        pType: 'TRF', scanType: scanType, decision: decision, VerificationLevel: verf, INtellerid: gusername, cid: cid, icr_id: icr,
                        CreditAccountNo: creditAccno, DebitAccountNo: debitAccno, SlipAmount: amt, ChqAmount: amt, PayeeName: PName,
                        ChqDate: chqDate, chqno: chq_no_final, SortCode: sort_code_final, San: san_final, transCode: trcode_final,
                        RejectCode: code, RejectDesc: desc
                    },
                    success: successmsg,
                    error: getError
                });
                
            }
            
        }
    }


    function itemReturnList_old(result) {
        debugger;

        var i = 0;

        $.each(result, function () {
            var row = document.createElement('tr');
            var cell = document.createElement('td');


            var cell = row.insertCell(1);
            cell.innerHTML = result[i].Code;
            row.appendChild(cell);

            var cell = row.insertCell(2);
            cell.innerHTML = result[i].Description;
            row.appendChild(cell);

            //document.getElementById("tblChequeData").appendChild(row);
            document.getElementById("returnReason").appendChild(row);

            i += i + 1;

        })

    }



    function submitReason(code, desc) {
        debugger;

        $("#popup2").hide();

        document.getElementById("rejectCode").value = code;
        
        document.getElementById("rejectDescription").value = desc;

        if (code == "88") {
            document.getElementById("rejectDescription").disabled = false;
            document.getElementById("rejectDescription").value = "";
        }
        else
            document.getElementById("rejectDescription").disabled = true;

        debugger;


    }



    function AccStatusCode(Status) {
        debugger;
        if (Status != null) {
            //$("#FinAccountStatus").text(Status);      //done aniket

            var accStatus = Status;

            if (accStatus.toUpperCase() == "A") {
                $("#FinAccountStatus").text(Status + " - Active");
                $("#FinAccountStatus").css('color', 'green');
            }
            else if (accStatus.toUpperCase() == "C") {
                $("#FinAccountStatus").text(Status + " - Closed");
                $("#FinAccountStatus").css('color', 'red');
                alert("Alert! Debit Account Number is Closed!");
            }
            else if (accStatus.toUpperCase() == "D") {
                $("#FinAccountStatus").text(Status + " - Dormant");
                $("#FinAccountStatus").css('color', 'red');
                alert("Alert! Debit Account Number is Dormant!");
            }
            else if (accStatus.toUpperCase() == "I") {
                $("#FinAccountStatus").text(Status + " - Inactive");
                $("#FinAccountStatus").css('color', 'red');
                alert("Alert! Debit Account Number is Inactive!");
            }
            else if (accStatus.toUpperCase() == "S") {
                $("#FinAccountStatus").text(Status + " - Stop payment");
                $("#FinAccountStatus").css('color', 'red');
                alert("Alert! Payment for Debit Account Number is stopped!");
            }
            else {
                $("#FinAccountStatus").text(Status);
                $("#FinAccountStatus").css('color', 'red');
                alert("Alert! Unknown status code!");
            }
                

            
        }
    }



    function AccSlipStatusCode(Status) {
        debugger;

        $("#SlipFinAccountStatus").css('color', 'red');

        if (Status.toUpperCase() == "A") {
            $("#SlipFinAccountStatus").text(Status + " - Active");
            $("#SlipFinAccountStatus").css('color', 'green');
        }
        else if (Status.toUpperCase() == "C") {
            $("#SlipFinAccountStatus").text(Status + " - Closed");
            alert("Alert! Debit Account Number is Closed!");
        }
        else if (Status.toUpperCase() == "D") {
            $("#SlipFinAccountStatus").text(Status + " - Dormant");
            alert("Alert! Debit Account Number is Dormant!");
        }
        else if (Status.toUpperCase() == "I") {
            $("#SlipFinAccountStatus").text(Status + " - Inactive");
            alert("Alert! Debit Account Number is Inactive!");
        }
        else if (Status.toUpperCase() == "S") {
            $("#SlipFinAccountStatus").text(Status + " - Stop payment");
            alert("Alert! Payment for Debit Account Number is stopped!");
        }
        else {
            $("#SlipFinAccountStatus").text(Status);
            alert("Alert! Unknown status code!");
        }
            

    }


    function switchimage_new(btnclick, imageid, type) {
        //debugger;
        //alert("change img");

        if (PerviousType == "") {
            tempSrc = document.getElementById("FG").src;
            PerviousType = "BOT";
        }

        tempSrc = document.getElementById("FG").src;
        //document.getElementById("FG").src = tempSrc.replace(/BOT_RGB/g, type).replace(/TOP_RGB/g, type).replace(/BOT_IRR/g, type).replace(/BOT_QG/g, type);
        document.getElementById("FG").src = tempSrc.replace(/BOT_RGB/g, type).replace(/TOP_RGB/g, type).replace(/BOT_IRR/g, type).replace(/TOP_QIR/g, type);


    }


    function kotak_rtgs_validation() {
        debugger;

        var regex_noSpecialChar = /^[A-Za-z0-9 ]+$/;
        var isValid = false;

        // remittance_type
        remittance_type = document.getElementById("remittance_type").value;
        if (remittance_type == null || remittance_type == "") {
            alert("Remittance Type is a Empty!");
            document.getElementById("remittance_type").focus();
            return false;
        }
        else if (remittance_type.toUpperCase() != "RTGS" && remittance_type.toUpperCase() != "NEFT") {
            alert("Enter valid Remittance Type!");
            document.getElementById("remittance_type").focus();
            return false;
        }

        // branch
        branch = document.getElementById("branch").value;
        if (branch == null || branch == "") {
            alert("Enter Branch name!");
            document.getElementById("branch").focus();
            return false;
        }

        // Date
        date = document.getElementById("date").value;
        var dateValidation = DateValidation_rtgs(date);
        if (dateValidation == false) {
            document.getElementById("date").focus();
            return false;
        }
            

        debugger;
        // Debit Acc No
        debitAccNo = document.getElementById("debitAccNo").value;
        if (debitAccNo == null || debitAccNo == "") {
            alert("Enter Debit Account No!");
            document.getElementById("debitAccNo").focus();
            return false;
        }

        // Cheque No
        Chqno = document.getElementById("Chqno").value;
        if (Chqno == null || Chqno == "") {
            alert("Enter Cheque No!");
            document.getElementById("Chqno").focus();
            return false;
        }
        else if (Chqno.length != 6) {
            alert("6 digit Cheque no is required!");
            document.getElementById("Chqno").focus();
            return false;
        }

        // Amount amt
        amt = document.getElementById("amt").value;
        if (amt == null || amt == "" || amt == "0") {
            alert("Enter Amount!");
            document.getElementById("amt").focus();
            return false;
        }

        // Amount In Words
        amtinwords = document.getElementById("amtinwords").value;
        if (amtinwords == null || amtinwords == "") {
            alert("Enter Amount in words!");
            document.getElementById("amtinwords").focus();
            return false;
        }

        // Purpose Code
        PurposeCode = document.getElementById("PurposeCode").value;
        if (PurposeCode == null || PurposeCode == "") {
            alert("Enter Purpose Code!");
            document.getElementById("PurposeCode").focus();
            return false;
        }

        // Beneficiary Acc Type
        BeneficiaryAccType = document.getElementById("BeneficiaryAccType").value;
        if (BeneficiaryAccType == null || BeneficiaryAccType == "") {
            alert("Enter Beneficiary Account Type!");
            document.getElementById("BeneficiaryAccType").focus();
            return false;
        }

        // Beneficiary Name
        BeneficiaryName = document.getElementById("BeneficiaryName").value;
        if (BeneficiaryName == null || BeneficiaryName == "") {
            alert("Enter Beneficiary Name!");
            document.getElementById("BeneficiaryName").focus();
            return false;
        }

        // BeneficiaryAccNo
        BeneficiaryAccNo = document.getElementById("BeneficiaryAccNo").value;
        if (BeneficiaryAccNo == null || BeneficiaryAccNo == "") {
            alert("Enter Beneficiary Account No!");
            document.getElementById("BeneficiaryAccNo").focus();
            return false;
        }

        // confirm Beneficiary Acc No
        cBeneficiaryAccNo = document.getElementById("cBeneficiaryAccNo").value;
        if (cBeneficiaryAccNo == null || cBeneficiaryAccNo == "") {
            alert("Enter Confirmation Beneficiary Account No!");
            document.getElementById("cBeneficiaryAccNo").focus();
            return false;
        }

        if (BeneficiaryAccNo != cBeneficiaryAccNo) {
            alert("Beneficiary Account no. and Confirm Beneficiary Account No. is not matching");
            document.getElementById("BeneficiaryAccNo").focus();
            return false;
        }

        // 
        if (document.getElementById("debitAccNo").value == document.getElementById("BeneficiaryAccNo").value) {
            alert("Debit Account no. and Beneficiary Account No. cannot be same!");
            document.getElementById("BeneficiaryAccNo").focus();
            return false;
        }

        // BeneficiaryIFSCCode
        BeneficiaryIFSCCode = document.getElementById("BeneficiaryIFSCCode").value;
        if (BeneficiaryIFSCCode == null || BeneficiaryIFSCCode == "") {
            alert("Enter Beneficiary IFSC Code!");
            document.getElementById("BeneficiaryIFSCCode").focus();
            return false;
        }

        // Beneficiary Bank
        BeneficiaryBank = document.getElementById("BeneficiaryBank").value;
        if (BeneficiaryBank == null || BeneficiaryBank == "") {
            alert("Enter Beneficiary Bank Name!");
            document.getElementById("BeneficiaryBank").focus();
            return false;
        }

        // BeneficiaryBranch
        BeneficiaryBranch = document.getElementById("BeneficiaryBranch").value;
        if (BeneficiaryBranch == null || BeneficiaryBranch == "") {
            alert("Enter Beneficiary Branch Name!");
            document.getElementById("BeneficiaryBranch").focus();
            return false;
        }

        // Name
        Name = document.getElementById("Name").value;
        if (Name == null || Name == "") {
            alert("Enter Name!");
            document.getElementById("Name").focus();
            return false;
        }

        return true;
    }


    function DateValidation_rtgs(result) {
        var date = result;
        debugger;
        if (date == null || date == "") {
            alert("Date field is blank!");
            //document.getElementById("date").focus();
            //ValidationPassed = false;
            return false;
        }

        var dd = date.substring(0, 2);
        var mm = date.substring(3, 5);
        var yyyy = date.substring(6, 10);



        if (!dd.match(/^\d+/) || !mm.match(/^\d+/) || !yyyy.match(/^\d+/)) {
            alert("Alert! Enter Date in dd-mm-yyyy format!");
            //document.getElementById("date").focus();
            //ValidationPassed = false;
            return false;
        }

        var j1 = date.substring(2, 3);
        var j2 = date.substring(5, 6);


        if (j1 != "-" || j2 != "-") {
            alert("Alert! Enter Date in dd-mm-yyyy format!");
            //document.getElementById("date").focus();
            //ValidationPassed = false;
            return false;
        }

        var fDate = dd + '-' + mm + '-' + yyyy;
        var dateResult = validatedate_rtgs(fDate);

        if (dateResult == false) {
            //alert("Alert! Enter proper Cheque Date!");
            //document.getElementById("date").focus();
            //ValidationPassed = false;
            return false;
        }

        return true;
    }

    function validatedate_rtgs(inputText) {

        var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        // Match the date format through regular expression
        if (inputText.match(dateformat)) {
            //document.form1.text1.focus();
            //Test which seperator is used '/' or '-'
            var opera1 = inputText.split('/');
            var opera2 = inputText.split('-');
            lopera1 = opera1.length;
            lopera2 = opera2.length;
            // Extract the string into month, date and year
            if (lopera1 > 1) {
                var pdate = inputText.split('/');
            }
            else if (lopera2 > 1) {
                var pdate = inputText.split('-');
            }
            var dd = parseInt(pdate[0]);
            var mm = parseInt(pdate[1]);
            var yy = parseInt(pdate[2]);
            // Create list of days of a month [assume there is no leap year by default]
            var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            var currentDate = new Date();
            debugger;
            var dd_now = currentDate.getDate();
            var mm_now = currentDate.getUTCMonth() + 1;
            var yyyy_now = currentDate.getFullYear();

            debugger;
            if (dd != dd_now) {
                alert("RTGS form can only accept today's Date!");
                return false;
            }
            if (mm != mm_now) {
                alert("RTGS form can only accept today's Date!");
                return false;
            }
            if (yy != yyyy_now) {
                alert("RTGS form can only accept today's Date!");
                return false;
            }

            if (mm == 1 || mm > 2) {
                if (dd > ListofDays[mm - 1]) {
                    alert('Invalid date!');
                    return false;
                }
                var currentDate = new Date();
                debugger;
                var dd_now = currentDate.getDate();
                var mm_now = currentDate.getUTCMonth() + 1;
                debugger;
                if (mm == mm_now) {
                    if (dd > dd_now) {
                        alert("Invalid date!");
                        return false;
                    }
                }
            }
            if (mm == 2) {
                var lyear = false;
                if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                    lyear = true;
                }
                if ((lyear == false) && (dd >= 29)) {
                    alert('Invalid date!');
                    return false;
                }
                if ((lyear == true) && (dd > 29)) {
                    alert('Invalid date!');
                    return false;
                }
            }
            return true;
        }
        else {
            alert("Invalid date !");
            //  document.form1.text1.focus();
            return false;
        }
        //  return true;
    }


    function kotak_cheque_validation() {

        // Cheque Date
        rtgs_chq_date = document.getElementById("rtgs_chq_date").value;
        if (rtgs_chq_date == null || rtgs_chq_date == "") {
            alert("Date field is null");
            return false;
        }
        var chqDate_result = DateValidation(rtgs_chq_date);
        if (chqDate_result == false) {
            document.getElementById("rtgs_chq_date").focus();
            return false;
        }
        debugger;
        var regex_noSpecialChar = /^[A-Za-z0-9 ]+$/;
        var regex_number = /^[0-9]+$/;

        // IFSC Code
        rtgs_chq_ifscCode = document.getElementById("rtgs_chq_ifscCode").value;
        if (rtgs_chq_ifscCode == null || rtgs_chq_ifscCode == "") {
            alert("IFSC for Cheque is blank!");
            document.getElementById("rtgs_chq_ifscCode").focus();
            return false;
        }
        var isValid = regex_noSpecialChar.test(rtgs_chq_ifscCode);
        if (!isValid) {
            alert("IFSC Code for Cheque contains Special Characters!");
            document.getElementById("rtgs_chq_ifscCode").focus();
            return false;
        }

        // Cheque payee name
        payeeName = document.getElementById("rtgs_chq_payeeName").value;
        if (payeeName == null || payeeName == "") {
            alert("Cheque Payee Name is blank!");
            document.getElementById("rtgs_chq_payeeName").focus();
            return false;
        }

        // Amt in words
        rtgs_chq_amtInWords = document.getElementById("rtgs_chq_amtInWords").value;
        if (rtgs_chq_amtInWords == null || rtgs_chq_amtInWords == "") {
            alert("Please enter Amount in Words!");
            document.getElementById("rtgs_chq_amtInWords").focus();
            return false;
        }
        isValid = regex_noSpecialChar.test(rtgs_chq_amtInWords);
        if (!isValid) {
            alert("Special Characters are not allowed in Amount in Words");
            document.getElementById("rtgs_chq_amtInWords").focus();
            return false;
        }

        // Amount
        rtgs_chq_amount = document.getElementById("rtgs_chq_amount").value;
        if (rtgs_chq_amount == null || rtgs_chq_amount == "" || rtgs_chq_amount == "0") {
            alert("Cheque Amount is Blank!");
            document.getElementById("rtgs_chq_amount").focus();
            return false;
        }

        // Debit Acc No
        rtgs_chq_debitAccNo = document.getElementById("rtgs_chq_debitAccNo").value;
        if (rtgs_chq_debitAccNo == null || rtgs_chq_debitAccNo == "" || rtgs_chq_debitAccNo == "0") {
            alert("Enter cheque Debit Account No");
            document.getElementById("rtgs_chq_debitAccNo").focus();
            return false;
        }
        isValid = regex_number.test(rtgs_chq_debitAccNo);
        if (!isValid) {
            alert("Only numbers are allowed in Debit Account Number");
            document.getElementById("rtgs_chq_debitAccNo").focus();
            return false;
        }

        return true;
    }

    function kotak_rtgs_cheque_common() {

        debugger;
        //var a1 = document.getElementById("amt").value;

        //var a1_result = decimal_or_not(a1);
        //debugger;
        //if (a1_result == false)
        //    document.getElementById("amt").value = document.getElementById("amt").value + ".00";

        //var a2 = document.getElementById("rtgs_chq_amount").value;
        //var a2_result = decimal_or_not(a2);

        //if (a2_result == false)
        //    document.getElementById("rtgs_chq_amount").value = document.getElementById("rtgs_chq_amount").value + ".00";

        if (document.getElementById("BeneficiaryName").value.trim().toUpperCase() != document.getElementById("rtgs_chq_payeeName").value.trim().toUpperCase()) {
            alert("RTGS and Cheque Beneficiary Name is not matching!");
            return false;
        }

        if (document.getElementById("debitAccNo").value.toUpperCase() != document.getElementById("rtgs_chq_debitAccNo").value.toUpperCase()) {
            alert("RTGS and Cheque Debit Account No. is not matching!");
            return false;
        }

        if (document.getElementById("amt").value != document.getElementById("rtgs_chq_amount").value) {
            alert("RTGS and Cheque Amount is  not matching!");
            return false;
        }

        if (document.getElementById("amtinwords").value.trim().toUpperCase() != document.getElementById("rtgs_chq_amtInWords").value.trim().toUpperCase()) {
            alert("RTGS and Cheque Amount In Words is not matching!");
            return false;
        }

        if (document.getElementById("Chqno").value != document.getElementById("chqnoDataEntry").value) {
            alert("RTGS and Cheque Cheque No is not matching!");
            return false;
        }

        return true;
    }

    function decimal_or_not(num) {
        debugger;
        var r = (num - Math.floor(num)) !== 0;

        if (r)
            return true;
        else
            return false;
    }

}
catch (e) {
    alert(e.message);
}