try {

    function CashValidation() {
        //debugger;
        var TypeTran = localStorage.getItem("typeOfTran");
        var accNoVal = document.getElementById("AccountNo").value;

        if (accNoVal == null || accNoVal == "") {
            alert("Alert! Account Number can not be blank!");
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

        var deAmt = document.getElementById("DenomAmount").value;
        if (deAmt != trAmt) {
            alert("Transaction Amount is not matching with Denomination Amount!");
            document.getElementById("SlipAmount").focus();
            ValidationPassed = false;
            return false;
        }

        ValidationPassed = true;
    }

    function ChequeDataValidation() {
        var chqNo_DE = document.getElementById("chqnoDataEntry").value;
        if (chqNo_DE != "" && chqNo_DE.length == 6) {
            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = chqNo_DE;
            document.getElementById("chqnoDataEntry").style.borderColor = "green";
        }
        else {
            document.getElementById("chqnoDataEntry").focus();
            document.getElementById("chqnoDataEntry").style.borderColor = "red";
            ValidationPassed = false;
            return false;
        }

        var sortcode_de = document.getElementById("sortcodeDataEntry").value;
        if (sortcode_de != "" && sortcode_de.length == 9) {
            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = sortcode_de;
            document.getElementById("sortcodeDataEntry").style.borderColor = "green";
        }
        else {
            document.getElementById("sortcodeDataEntry").focus();
            document.getElementById("sortcodeDataEntry").style.borderColor = "red";
            ValidationPassed = false;
            return false;
        }

        var san_de = document.getElementById("sanDataEntry").value;
        if (san_de != "" && (san_de.length == 6 || san_de.length == 7)) {
            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[6].innerHTML = san_de;
            document.getElementById("sanDataEntry").style.borderColor = "green";
        }
        else {
            document.getElementById("sanDataEntry").focus();
            document.getElementById("sanDataEntry").style.borderColor = "red";
            ValidationPassed = false;
            return false;
        }

        var tr_de = document.getElementById("trDataEntry").value;
        if (tr_de != "" && (tr_de.length == 2 || tr_de.length == 3)) {
            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[7].innerHTML = tr_de;
            document.getElementById("trDataEntry").style.borderColor = "green";
        }
        else {
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
        
        ValidationPassed = true;

        var SlipAmount = 0;
        var ChqAmount = 0;

        var previnstrumenttype = " ";
        var validationflag = 0;
        localIQA = 1;
        localIQATreatment = 1;

        var TypeTran = localStorage.getItem("typeOfTran");
        if (TypeTran == "CTS") {
            Submit = "cts";
        }
        else if (TypeTran == "TRF") {
            Submit = "ChequeVoucher";
        }

        if (TypeTran == "vaultcash") {
            ValidationPassed = true;
            return true;
        }

        if (TypeTran == "CTS" || TypeTran == "TRF") {
            
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

                if (accVal != "true") {
                    alert("Alert! Account number validation is pending! Pls refer ValidAcc status for reference!");
                    ValidationPassed = false;
                    return false;
                }
                //debugger;
                CompleteAccNo[i - 1] = row.cells[0].innerHTML;

                if (row.cells[8].innerHTML == "S") {
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
            if (TypeTran == "TRF") {
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
            }
            else if (TypeTran == "CTS") {
                if (slipNo > 1) {
                    alert("Alert! More than 1 slip cannot be accepted !");
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

            //debugger;
            //var ig = CompleteAccNo[0];
            if (slipNo == 1 && TypeTran == "TRF") {
                for (var j = 1, row; row = tableChequeData.rows[j]; j++) {
                    if (row.cells[8].innerHTML == "C" && SlipAccNo == row.cells[0].innerHTML) {
                        alert("Alert! Slip and Chque account number cannot be same!");
                        ValidationPassed = false;
                        return false;
                    }
                    if (row.cells[8].innerHTML == "C")
                        ChqAccNo = row.cells[0].innerHTML;
                }
                document.getElementById("Chq_Dedit_AccNo").value = ChqAccNo;
            }
            if (slipNo == 1 && TypeTran == "CTS") {
                for (var j = 1, row; row = tableChequeData.rows[j]; j++) {
                    if (row.cells[8].innerHTML == "C" && SlipAccNo == row.cells[0].innerHTML) {
                        alert("Alert! Slip and Chque account number cannot be same!");
                        ValidationPassed = false;
                        return false;
                    }
                }
            }
            //if (TypeTran == "CTS" && CompleteAccNo.length > 1) {
            //    for (var i = 0; i < CompleteAccNo.length; i++) {
            //        //debugger;
            //        var accnum = CompleteAccNo[i];
            //        for (var j = 0; j < CompleteAccNo.length; j++) {
            //            if (i != j && accnum == CompleteAccNo[j]) {
            //                alert("Alert! Chque account numbers cannot be same!");
            //                ValidationPassed = false;
            //                return false;
            //            }
            //        }
            //    }
            //}

            //if (TypeTran == "TC" && slipNo == 1) {
            //    if (SlipAccNo == ChqAccNo) {
            //        alert("Alert! Slip and Cheque Account Number is same!");
            //        ValidationPassed = false;
            //        return false;
            //    }
            //}
            //else if (TypeTran == "CTS" && slipNo == 1) {

            //}

            if (slipAmt != chqAmt && slipNo != 0) {
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
        //alert("PayeeName change functoin called");
        document.getElementById("FinName").innerHTML = val;
        if (GlobalRowNo != " ") {
            //if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[8].innerHTML == "C") {
            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = val;
            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "1";
            //}
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = val;
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "1";
        }
    }

    function PayeeNameChangeSlip(val) {
        //debugger;
        //alert("PayeeName change functoin called");
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

    function DateValidation() {
        var date = document.getElementById("ChequeDateTxt").value;
        var dd = date.substring(0, 2);
        var mm = date.substring(3, 5);
        var yyyy = date.substring(6, 10);

        if (date == null || date == "") {
            alert("Date field is blank!");
            document.getElementById("ChequeDateTxt").focus;
            ValidationPassed = false;
            return false;
        }

        if (!dd.match(/^\d+/) || !mm.match(/^\d+/) || !yyyy.match(/^\d+/)) {
            alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
            document.getElementById("ChequeDateTxt").focus;
            ValidationPassed = false;
            return false;
        }

        var j1 = date.substring(2, 3);
        var j2 = date.substring(5, 6);


        if (j1 != "-" || j2 != "-") {
            alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
            document.getElementById("ChequeDateTxt").focus;
            ValidationPassed = false;
            return false;
        }

        var fDate = dd + '-' + mm + '-' + yyyy;
        var dateResult = validatedate(fDate);

        if (dateResult == false) {
            alert("Alert! Enter proper Cheque Date!");
            document.getElementById("ChequeDateTxt").focus;
            ValidationPassed = false;
            return false;
        }
    }

    
    

}
catch (e) {
    alert(e.message);
}