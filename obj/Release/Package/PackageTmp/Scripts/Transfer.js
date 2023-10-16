try {
    var access_token = window.localStorage.getItem('AccessToken');
    var bearer = window.localStorage.getItem('TokenType');
    var gusername = window.localStorage.getItem('username');
    var authHeaders = {};
    authHeaders.Authorization = bearer + " " + access_token;
    var sliptotamt = 0;
    var Currtotamt = 0;
    var BrCode = null;
    var PName = null;
    var acc = null;
    var amt = null;
    var chqamt = null;
    var strDate = null;
    var flag = null;
    var PerviousType = "";
    var tempSrc = "";
    var ImageUrl = "";
    var machineserialno = "";
    var sni_countid = 0;
    function switchimage(btnclick, imageid, type) {
        //debugger;

        if (PerviousType == "") {
            tempSrc = document.getElementById("FG").src;
            PerviousType = "BOT";
        }

        tempSrc = document.getElementById("FG").src;
        //document.getElementById("FG").src = tempSrc.replace(/BOT_RGB/g, type).replace(/TOP_RGB/g, type).replace(/BOT_IRR/g, type).replace(/BOT_QG/g, type);
        document.getElementById("FG").src = tempSrc.replace(/BOT_RGB/g, type).replace(/TOP_RGB/g, type).replace(/BOT_IRR/g, type).replace(/TOP_QIR/g, type);


    }
    function goBack() {
        window.location = rooturl + "home/Index";
    }
    function getError(result) {
        //debugger;

        $("#ProcessingBar").hide();

        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            alert(result.responseText);


        }
    }


    function closeDialog() {
        //debugger;
        $(popup).dialog("close");
        var ProcessType = "submit";
        var response = "2";
        var transtype = "CASHDEP";
        var y = "PostData";
        flag = "Submit";
        RegNo = document.getElementById("AccountNo").value;    //wrong

        var dArray_Print = [];
        var dCount_Print = [];

        for (var idVal = 0; idVal < 10; idVal++) {
            var c2 = "denomId_" + idVal.toString();
            var c3 = "denomId2_" + idVal.toString();
            var c5 = "denomId5_" + idVal.toString();
            var inCount = 0;
            var outCount = 0;
            //debugger;
            var c2val = document.getElementById(c2).innerHTML;
            if (c2val != "")
                inCount = inCount + parseInt(c2val);
            var c3val = document.getElementById(c3).innerHTML;
            if (c3val != "")
                outCount = outCount + parseInt(c3val);
            //var c5val = document.getElementById(c5).value;
            //if (c5val != "")
            //    inCount = inCount + parseInt(c5val);

            if (c2val != "") {
                if (c2 == "denomId_0")
                    dArray_Print.push("2000");
                else if (c2 == "denomId_1")
                    dArray_Print.push("500");
                else if (c2 == "denomId_2")
                    dArray_Print.push("200");
                else if (c2 == "denomId_3")
                    dArray_Print.push("100");
                else if (c2 == "denomId_4")
                    dArray_Print.push("50");
                else if (c2 == "denomId_5")
                    dArray_Print.push("20");
                else if (c2 == "denomId_6")
                    dArray_Print.push("10");
                else if (c2 == "denomId_7")
                    dArray_Print.push("5");
                else if (c2 == "denomId_8")
                    dArray_Print.push("2");
                else if (c2 == "denomId_9")
                    dArray_Print.push("1");

                dCount_Print.push(inCount);
            }

            if (c3val != "") {
                if (c3 == "denomId2_0")
                    dArray_Print.push("-2000");
                else if (c3 == "denomId2_1")
                    dArray_Print.push("-500");
                else if (c3 == "denomId2_2")
                    dArray_Print.push("-200");
                else if (c3 == "denomId2_3")
                    dArray_Print.push("-100");
                else if (c3 == "denomId2_4")
                    dArray_Print.push("-50");
                else if (c3 == "denomId2_5")
                    dArray_Print.push("-20");
                else if (c3 == "denomId2_6")
                    dArray_Print.push("-10");
                else if (c3 == "denomId2_7")
                    dArray_Print.push("-5");
                else if (c3 == "denomId2_8")
                    dArray_Print.push("-2");
                else if (c3 == "denomId2_9")
                    dArray_Print.push("-1");

                dCount_Print.push(outCount);
            }
        }
        //debugger;
        //var pin = parseInt("-200") * 2;
        //debugger;
        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            data: { pType: ProcessType, INtellerid: gusername, response: response, transtype: transtype, transRefNo: RegNo, BranchSolID: BrCode, CreditAccountNo: acc, PayeeName: PName, SlipAmount: amt, ChqAmount: amt, recipt: recipt, Denoms: dArray_Print, DenomCount: dCount_Print, imageUrl: ImageUrl },
            success: getSuccessReset,
            error: getError
        });
    }
    function getReset() {
        //debugger;
        var ProcessType = "reset";
        var y = "PostData";
        flag = "Reset"
        if (confirm('Do you want to reset captured data?')) {
            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                data: { pType: ProcessType, maip: gusername, INtellerid: gusername },
                success: getSuccessReset,
                error: getError
            });
        }
    };
    function SubmitVault() {
        //debugger;
        var ProcessType = "submit";
        var y = "PostData";
        flag = "Sub"
        if (confirm('Do you want to submit captured data?')) {
            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                data: { pType: ProcessType, maip: gusername, INtellerid: gusername },
                success: getSuccessReset,
                error: getError
            });
        }
    };
    

    function getSuccessReset(result) {
        //debugger;
        if (flag == "Sub") {
            alert("Data Submitted successfully.");
            window.location.reload();
        }
        else {


            if (flag == "Reset") {
                alert("The " + JSON.stringify(result) + " record cleaned successfully.");
                window.location.reload();
            }
            else {
                var TypeTran = localStorage.getItem("typeOfTran");
                //debugger;
                if (TypeTran == "Deposit") {
                    if (flag == "Submit") {
                        alert("The " + JSON.stringify(result) + " record posted successfully.");
                        window.location.reload();
                    }
                    else {
                        alert(+ JSON.stringify(result) + " Cash Inserted successfully.");
                        //debugger;
                        //for (vr i = 0; i < 10; i++) {
                        //    var 
                        //}
                        getSubmit();
                    }
                }
                else if (TypeTran == "vaultcash" || flag == "vaultcash") {
                    alert("The " + JSON.stringify(result) + " record posted successfully.");
                    getSubmit();
                }
                else if (TypeTran == "WithDraw" && flag == "Cash") {
                    alert("The " + JSON.stringify(result) + " record posted successfully.");
                    getSubmit();
                }
                else {
                    alert("The " + JSON.stringify(result) + " record posted successfully.");
                    window.location.reload();
                }

            }


        }

        $("#CashDetails tr").remove();
        $("#VoucherDetails tr").remove();
        $("#DenomDeatils tr").remove();

        //var pg_ty = document.getElementById()

        document.getElementById("FG").src = "";
        //document.getElementById("status").innerHTML = "";
        document.getElementById("FG").style.display = "none";
        sliptotamt = 0;
        Currtotamt = 0;
    }
    function getSuccessVoucher(result) {
        debugger;
        //alert("getSuccessVoucher");
        $("#VoucherDetails tr").remove();
        $("#DenomDeatils tr").remove();

        //$("#cheque_Data").show();

        var i = 0;
        var totchqcnt = 0;
        var totslpcnt = 0;
        var TotChqAmt = 0;
        var TotSlpAmt = 0;

        $("#ChequeDate").show();
        $("#HalfChequeAmount").show();
        $("#DivChequeAmount").show();
        $("#HalfSlipAmount").show();
        $("#DivSlipAmount").show();
        $("#ChequeSlip").show();
        $("#SlipCheque").show();
        $("#SlipAmnt").show();
        $("#ChequeAmnt").show();
        //debugger;
        $.each(result, function (key, item) {

            var newImgStr = item.frontgreyimagepath;
            ImageUrl = item.frontgreyimagepath;
            $('#VoucherDetails').append("<tr><td>" + item.accno + "</td>" + "<td style='display:none;'>" + item.payeename + "</td>" + "<td>" + item.totalamount + "</td>" + "<td style='display:none;'>" + item.cheqno + "</td>" + "<td style='display:none;'>" + item.sortcode + "</td>" + "<td style='display:none;'>" + item.san + "</td>" + "<td style='display:none;'>" + item.trcode + "</td>" + "<td>" + item.amount + "</td>" + "<td>" + item.chqdate + "</td> " + "<td>" + item.micr + "</td>" + "<td>" + item.ocr + "</td>" + "<td>" + item.instrumenttype + "</td>" + "<td style='display:none;'>" + item.iqatest + "</td>" + "<td style='display:none;'><input type='checkbox' id='chkmarkp2f' name='chkmarkp2f'></td>" + "<td><input type='checkbox' id='chkmarkchq' name='chkmarkchq'></td>" + "<td><input type='checkbox' id='chkmarkslip' name='chkmarkslip'></td><td><img height='50' width='70' id=" + item.id + "  src=" + newImgStr + "  /></td><td><label><input type='radio' id='frontGimg' name='optradio' onclick=switchimage('frontGimg','" + item.id + "')>Front</label></td><td><label><input type='radio' id='backGimg' name='optradio' onclick=switchimage('backGimg','" + item.id + "')>Back</label></td><td><label><input type='radio' id='frontIRimg' name='optradio' onclick=switchimage('frontIRimg','" + item.id + "')>IR</label></td></tr>");
            document.getElementById("FG").src = newImgStr;
            document.getElementById("FG").style.display = "";
            totslpcnt = item.slipcount;
            TotSlpAmt = TotSlpAmt + parseFloat(item.totalamount);
            TotChqAmt = TotChqAmt + parseFloat(item.amount);
            document.getElementById("SlipAmountForCheque").innerHTML = TotSlpAmt;
            //document.getElementById("SlipAmountForCheque").value = TotSlpAmt;
            document.getElementById("DenomAmountForCheque").innerHTML = TotChqAmt;
            //document.getElementById("DenomAmountForCheque").value = TotChqAmt;
            if (result[i].instrumenttype == "S") {
                document.getElementById("ToAccount").value = result[i].accno; //anandi
            }
            else {
                document.getElementById("AccountNo").value = result[i].accno;
                document.getElementById("micr").value = result[i].ocr;
            }


            i = i + 1;
        });

        //document.getElementById("AccountNo").value = result[1].accno;
        debugger;
        var dataCountLoop = 0;
        var dataCountLoop1 = 0;

        while (tableChequeData.rows.length > 1) {
            tableChequeData.deleteRow(1);
        }
        for (var i = 0; i < result.length; i++) {

            // Machine sserial number;
            debugger;
            if (dataCountLoop == 0 && result[i].machineserialno != "") {
                machineserialno = result[i].machineserialno;
                dataCountLoop += 1;
            }

            // Branch Code
            if (dataCountLoop1 == 0 && result[i].SolID != "") {
                BrCode = result[i].SolID;
                dataCountLoop1 += 1;
            }

            var row = document.createElement('tr');
            var cell = document.createElement('td');
            cell.innerHTML = result[i].accno;
            row.appendChild(cell);
            var cell1 = row.insertCell(1);
            if (result[i].instrumenttype == "S") {
                cell1.innerHTML = result[i].totalamount;
            }
            else {
                cell1.innerHTML = "0";
            }

            row.appendChild(cell1);
            var cell2 = row.insertCell(2);
            if (result[i].instrumenttype == "C") {
                cell2.innerHTML = result[i].amount;

            }
            else {
                cell2.innerHTML = "0";
            }

            row.appendChild(cell2);

            var cell3 = row.insertCell(3);
            cell3.innerHTML = result[i].chqdate;
            row.appendChild(cell3);

            //var cell4 = row.insertCell(4);
            //cell4.innerHTML = result[i].ocr;
            //row.appendChild(cell4);

            //var cell5 = row.insertCell(5);
            //cell5.innerHTML = result[i].micr;
            //row.appendChild(cell5);

            if (result[i].instrumenttype == "C") {
                var cell4 = row.insertCell(4);
                cell4.innerHTML = result[i].cheqno;
                row.appendChild(cell4);

                var cell5 = row.insertCell(5);
                cell5.innerHTML = result[i].sortcode;
                row.appendChild(cell5);

                var cell6 = row.insertCell(6);
                cell6.innerHTML = result[i].san;
                row.appendChild(cell6);

                var cell7 = row.insertCell(7);
                cell7.innerHTML = result[i].trcode;
                row.appendChild(cell7);
            }
            else {
                var cell4 = row.insertCell(4);
                cell4.innerHTML = "";
                row.appendChild(cell4);

                var cell5 = row.insertCell(5);
                cell5.innerHTML = "";
                row.appendChild(cell5);

                var cell6 = row.insertCell(6);
                cell6.innerHTML = "";
                row.appendChild(cell6);

                var cell7 = row.insertCell(7);
                cell7.innerHTML = "";
                row.appendChild(cell7);
            }

            var cell8 = row.insertCell(8);
            cell8.innerHTML = result[i].instrumenttype;
            row.appendChild(cell8);

            var cell9 = row.insertCell(9);
            var r1 = document.createElement("input");
            r1.type = "radio";
            r1.name = "mark_" + i;
            //r1.id = "chkboxCheque";   -- Made Changes by Aniketadit on 2022-05-18
            r1.id = "chkboxCheque_" + i;
            r1.className = "radio-inline";
            var lbl1 = document.createElement('label');
            lbl1.innerText = "Cheque";
            lbl1.htmlFor = r1.id;
            cell9.appendChild(r1);
            cell9.appendChild(lbl1);

            var r2 = document.createElement("input");
            r2.type = "radio";
            r2.name = "mark_" + i;
            //r2.id = "chkboxSlip";     -- Made Changes by Aniketadit on 2022-05-18
            r2.id = "chkboxSlip_" + i;
            r2.className = "radio-inline";
            var lbl2 = document.createElement('label');
            lbl2.innerText = "Slip";
            lbl2.htmlFor = r2.id;
            cell9.appendChild(r2);
            cell9.appendChild(lbl2);

            var cell10 = row.insertCell(10);
            cell10.innerHTML = result[i].frontgreyimagepath;
            row.appendChild(cell10);

            var cell11 = row.insertCell(11);
            if (result[i].instrumenttype == "S") {
                if (intSlipNo == 0) {
                    intSlipNo = 1;
                }
                else {
                    intSlipNo = intSlipNo + 1;
                }
                cell11.innerHTML = intSlipNo;
            }
            else {
                intSlipNo = intSlipNo;
                cell11.innerHTML = intSlipNo;
            }
            row.appendChild(cell11);

            var cell12 = row.insertCell(12);
            cell12.innerHTML = result[i].frontgreyimagepath;
            row.appendChild(cell12);
            var cell13 = row.insertCell(13);
            cell13.innerHTML = result[i].backgreyimagepath;
            row.appendChild(cell13);
            var cell14 = row.insertCell(14);
            cell14.innerHTML = i + 1;
            row.appendChild(cell14);
            var cell15 = row.insertCell(15);
            cell15.innerHTML = result[i].cheqno;
            row.appendChild(cell15);
            var cell16 = row.insertCell(16);
            cell16.innerHTML = result[i].doctype;
            row.appendChild(cell16);
            var cell17 = row.insertCell(17);
            cell17.innerHTML = result[i].sortcode;
            row.appendChild(cell17);
            var cell18 = row.insertCell(18);
            cell18.innerHTML = result[i].trcode;
            row.appendChild(cell18);
            var cell19 = row.insertCell(19);
            cell19.innerHTML = result[i].san;
            row.appendChild(cell19);
            var cell20 = row.insertCell(20);
            cell20.innerHTML = result[i].ignoreiqa;
            row.appendChild(cell20);
            var cell21 = row.insertCell(21);
            cell21.innerHTML = result[i].iqaflag;
            row.appendChild(cell21);
            var cell22 = row.insertCell(22);
            cell22.innerHTML = result[i].iqastring;
            row.appendChild(cell22);

            var cell23 = row.insertCell(23);
            var element23 = document.createElement("button");
            element23.type = "button";
            element23.name = "button";
            element23.className = "menu-icon fa fa-trash";
            cell23.appendChild(element23);
            row.appendChild(cell23);

            //debugger;
            var cell24 = row.insertCell(24);
            cell24.innerHTML = result[i].micr;
            row.appendChild(cell24);

            var cell25 = row.insertCell(25);
            cell25.innerHTML = result[i].ocr;
            row.appendChild(cell25);

            //debugger;
            var cell26 = row.insertCell(24);
            cell26.innerHTML = "false";
            row.appendChild(cell26);

            var cell27 = row.insertCell(27);
            cell27.innerHTML = result[i].payeename;
            row.appendChild(cell27);

            var cell28 = row.insertCell(28);
            cell28.innerHTML = "0";
            row.appendChild(cell28);

            document.getElementById("tblChequeData").appendChild(row);
            $("#tblChequeData tr td:nth-child(11)").hide();
            //$("#tblChequeData tr td:nth-child(10)").hide();
            $("#tblChequeData tr td:nth-child(13)").hide();
            $("#tblChequeData tr td:nth-child(14)").hide();
            $("#tblChequeData tr td:nth-child(15)").hide();
            $("#tblChequeData tr td:nth-child(16)").hide();
            $("#tblChequeData tr td:nth-child(17)").hide();
            $("#tblChequeData tr td:nth-child(18)").hide();
            $("#tblChequeData tr td:nth-child(19)").hide();
            $("#tblChequeData tr td:nth-child(20)").hide();
            $("#tblChequeData tr td:nth-child(21)").hide();
            $("#tblChequeData tr td:nth-child(22)").hide();
            $("#tblChequeData tr td:nth-child(23)").hide();

            $("#tblChequeData tr td:nth-child(25)").hide();
            $("#tblChequeData tr td:nth-child(26)").hide();
            //$("#tblChequeData tr td:nth-child(27)").hide();
            $("#tblChequeData tr td:nth-child(29)").hide();     //PayeeNameChange
        }
        $("#ShowToAcc").show();
        $("#MICRImg").show();
        $("#ChequeData").show();
        GetSData();

        if (result[1].accno == "") {
            alert("Account Number is blank for Cheque..!")
        }
        else {

            $.ajax({
                url: x + "GetCBSDtls",
                headers: authHeaders,
                type: 'POST',
                async: false,
                //url: "http://10.9.0.222/WebApi/api/Scanner/GetCBSDtls",
                crossDomain: true,
                data: { 'ac': result[1].accno },
                success: getSuccessFinDetails,
                error: getError
            });

        }



        if (result[0].accno == "") {
            alert("Account Number is bank for Slip..!");
        }
        else {
            var delayInMilliseconds = 50; //5 second
            //setTimeout(function () {
            //    //debugger;
            //    GetPayeee(result[0].accno, "S");
            //}, delayInMilliseconds);


        }


        var rslt = "";
        if (TotSlpAmt == TotChqAmt) {
            rslt = "Slip amount (" + TotSlpAmt + ") matched with cheques total amount (" + TotChqAmt + ")";
        }
        else {
            rslt = "Slip amount (" + TotSlpAmt + ") not matched with cheques total amount (" + TotChqAmt + ")";
        }

        $("#ProcessingBar").hide();

    }
    function GetSData() {
        $.ajax({
            type: "POST",
            url: x + "GetData",
            //url: 'http://localhost:8198/api/Scanner/GetData',
            data: {},
            datatype: "json",
            success: function (data) {
                batchNo = data.BatchNo;
            }
        });

    }
    function getSuccessFinDetails(result) {
        $("#FinName").text("");
        $("#FinAccOwner").text("");
        $("#FinAccountStatus").text("");
        $("#FinMOP").text("");
        $("#FinAmount").text("");
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
        }

        else {

            if (FinDetails.PayeeName != null) {
                $("#FinName").text(FinDetails.PayeeName[0]);

            }
            if (FinDetails.AccountOwnership != null) {
                $("#FinAccOwner").text(FinDetails.AccountOwnership);

            }
            if (FinDetails.AccountStatus != null) {
                $("#FinAccountStatus").text(FinDetails.AccountStatus);

            }
            if (FinDetails.Amount != null) {
                $("#FinAmount").text(FinDetails.Amount);

            }

            if (FinDetails.MOP != null) {
                $("#FinMOP").text(FinDetails.MOP);

            }
            if (FinDetails.SchemeCode != null) {
                $("#FinScheme").text(FinDetails.SchemeCode);

            }
            if (FinDetails.MOP != null) {
                $("#FinMOP").text(FinDetails.MOP);

            }

            var PayeeName = {};
            PayeeName = FinDetails.PayeeName;
            Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
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

    // Credit Accno Validation
    function toAccNo() {
        debugger;
        //check_ToAccNo = 1;
        //document.getElementById("PayeeNameSlip_val").value = "0";
        if (GlobalRowNo != " ") {
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "0";
        }
        GetPayeee(document.getElementById('ToAccount').value, 'S');
    }

    function fromAccNo() {
        debugger;
        //check_FromAccNo = 1;
        //document.getElementById("PayeeNameCheque_val").value = "0";
        if (GlobalRowNo != " ") {
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "0";
        }
        GetPayeee(document.getElementById('AccountNo').value, 'C');
    }

    function txttogrid() {
        //debugger;
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = document.getElementById("HalfSlipAmount").value;
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = document.getElementById("HalfChequeAmount").value;
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[3].innerHTML = document.getElementById("ChequeDateTxt").value;
        var TotSlpAmt = 0;
        var TotChqAmt = 0;
        for (var i = 1, row; row = tableChequeData.rows[i]; i++) {


            TotSlpAmt = TotSlpAmt + parseFloat(row.cells[1].innerHTML);
            TotChqAmt = TotChqAmt + parseFloat(row.cells[2].innerHTML);
        }
        //debugger;

        var dType = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[8].innerHTML;

        if (dType == "C") {
            //debugger;
            var chqNo_DE = document.getElementById("chqnoDataEntry").value;
            if (chqNo_DE != "" && chqNo_DE.length == 6) {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = chqNo_DE;
                document.getElementById("chqnoDataEntry").style.borderColor = "green";
            }
            else {
                document.getElementById("chqnoDataEntry").focus();
                document.getElementById("chqnoDataEntry").style.borderColor = "red";
                return false;
            }

            var sortcode_de = document.getElementById("sortcodeDataEntry").value;
            if (sortcode_de != "" && sortcode_de.length == 9) {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[5].innerHTML = sortcode_de;
                document.getElementById("sortcodeDataEntry").style.borderColor = "green";
            }
            else {
                document.getElementById("sortcodeDataEntry").focus();
                document.getElementById("sortcodeDataEntry").style.borderColor = "red";
                return false;
            }

            var san_de = document.getElementById("sanDataEntry").value;
            if (san_de != "" && (san_de.length == 6 || san_de.length == 7)) {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[6].innerHTML = san_de;
                document.getElementById("sanDataEntry").style.borderColor = "green";
            }
            else {
                document.getElementById("sanDataEntry").focus();
                document.getElementById("sanDataEntry").style.borderColor = "red";
                return false;
            }

            var tr_de = document.getElementById("trDataEntry").value;
            if (tr_de != "" && (tr_de.length == 2 || tr_de.length == 3)) {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[7].innerHTML = tr_de;
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
    }

    /* on serch click */
    function GetPayeee(Acc, Type) {
        debugger;
        var validAccNo = "";
        if (GlobalRowNo != " ") {
            if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[8].innerHTML == "S") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("ToAccount").value;
            }
            else {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("AccountNo").value;
            }
        }
        //debugger;
        //var dbc = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[23].innerHTML;
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
                var cellType = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[8].innerHTML;
                var cellAccNo = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML;
                var pageAccNo = Acc;
                if (Type == "C") {

                    if (GlobalRowNo != " ") {
                        if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML == "0") {
                            $("#FinName").text("");
                        }
                    }

                    //if (document.getElementById("PayeeNameCheque_val").value == "0") {
                    //    $("#FinName").text("");
                    //}

                    $("#FinAccOwner").text("");
                    $("#FinAccountStatus").text("");
                    $("#FinMOP").text("");
                    $("#FinAmount").text("");
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
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML = "false";
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "red";
                        }
                        //GlobalRowNo = " ";
                    }
                    else if (FinDetails.cbsdls.includes("Account does not exist")) {
                        $("#FinName").text("Account does not exist");
                        $("#FinName").css('color', 'red');
                        //debugger;
                        if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo) {
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML = "false";
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "red";
                        }
                        //GlobalRowNo = " ";
                        return false;
                    }
                    else {
                        debugger;
                        var chqPayeeName_val = "0";

                        if (GlobalRowNo != " ") {
                            chqPayeeName_val = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML;
                        }

                        if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo && chqPayeeName_val == "0") {
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML = "true";
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "green";
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = FinDetails.PayeeName[0];
                            //document.getElementById("PayeeNameCheque_val").value = "1";
                            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "1";
                        }
                        //GlobalRowNo = " ";
                        if (FinDetails.PayeeName != null && chqPayeeName_val == "0") {
                            $("#FinName").text(FinDetails.PayeeName[0]);                //done aniket
                            $("#SlipFinName").css('color', 'black');
                        }
                        if (FinDetails.AccountOwnership != null) {
                            $("#FinAccOwner").text(FinDetails.AccountOwnership);
                        }
                        if (FinDetails.AccountStatus != null) {
                            $("#FinAccountStatus").text(FinDetails.AccountStatus);      //done aniket
                        }
                        if (FinDetails.Amount != null) {
                            $("#FinAmount").text(FinDetails.Amount);                    //done aniket
                        }
                        if (FinDetails.MOP != null) {
                            $("#FinMOP").text(FinDetails.MOP);
                        }
                        if (FinDetails.SchemeCode != null) {
                            $("#FinScheme").text(FinDetails.SchemeCode);                //done aniket
                        }
                        if (FinDetails.MOP != null) {
                            $("#FinMOP").text(FinDetails.MOP);
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

                        //var PayeeName = {};
                        //PayeeName = FinDetails.PayeeName;
                        //var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
                        ////  Pay = Pay + '<option>Select</option>';
                        //if (PayeeName != null) {
                        //    for (i = 0; i < PayeeName.length; i++) {
                        //        Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                        //    }
                        //}
                        //Pay = Pay + '</select>';
                        //$('#Payeeee').html(Pay);

                    }
                }
                else {
                    if (flag == "Cash") {
                        $("#FinName").text("");
                        $("#FinAccOwner").text("");
                        $("#FinAccountStatus").text("");
                        $("#FinMOP").text("");
                        $("#FinAmount").text("");
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
                                $("#FinAccountStatus").text(FinDetails.AccountStatus);
                            }
                            if (FinDetails.Amount != null) {
                                $("#FinAmount").text(FinDetails.Amount);
                            }
                            if (FinDetails.MOP != null) {
                                $("#FinMOP").text(FinDetails.MOP);
                            }
                            if (FinDetails.SchemeCode != null) {
                                $("#FinScheme").text(FinDetails.SchemeCode);
                            }
                            if (FinDetails.MOP != null) {
                                $("#FinMOP").text(FinDetails.MOP);
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

                        if (GlobalRowNo != " ") {
                            if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML == "0")
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
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML = "false";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "red";
                            }
                            //GlobalRowNo = " ";
                        }
                        else if (FinDetails.cbsdls.includes("Account does not exist")) {
                            $("#SlipFinName").text("Account does not exist");
                            $("#SlipFinName").css('color', 'red');
                            //debugger;
                            if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo) {
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML = "false";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "red";
                            }
                            //GlobalRowNo = " ";
                        }
                        else {
                            debugger;
                            var slipPayeeName_val = "0";

                            if (GlobalRowNo != " ") {
                                slipPayeeName_val = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML;
                            }

                            if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo && slipPayeeName_val == "0") {
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML = "true";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "green";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = FinDetails.PayeeName[0];
                                //document.getElementById("PayeeNameSlip_val").value = "1";
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "1";
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
                                $("#SlipFinAccountStatus").text(FinDetails.AccountStatus);
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
            },
            error: getError
        });
    }


    //--------------------------------added by Anandi ---------------------------------------
    function getToken(tokenurl) {
        //debugger;
        var credentials = {
            username: "101203",
            password: "101203"

            //username: "meraj",
            //password: "101203"
        };
        var x = tokenurl;
        var y = "token";
        $.ajax({
            url: x + y,
            type: 'POST',
            data: { 'username': credentials.username, 'password': credentials.password, 'grant_type': 'password' },
            crossDomain: true,
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            //success: callbackFunction,
            success: function (result, textStatus, xhr) {
                callbackFunction(result);
            },
            error: errorResponse
        });

    }

    function callbackFunction(result) {
        //debugger;
        window.localStorage.setItem('AccessToken', result.access_token);
        window.localStorage.setItem('TokenType', result.token_type);

    }

    //-----------------------------------End ---------------------------------------
    function SubmitData() {
        //debugger;
        TransferCtsValidation();
        //debugger;
        //if (ValidationPassed == true)
        //    ValidateData();

        //debugger;
        if (ValidationPassed == true) {
            //debugger;
            var TypeTran = localStorage.getItem("typeOfTran");

            var currentDate = new Date();

            var currentDate = new Date();
            var yyyy = currentDate.getFullYear();
            var RefNo = "TRF" + yyyy.toString().substring(2, 4) + String(currentDate.getUTCMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0') + String(currentDate.getSeconds()).padStart(2, '0');

            //var RefNo = "TRF" + currentDate.getFullYear() + String(currentDate.getUTCMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0') + String(currentDate.getSeconds()).padStart(2, '0');

            BrCode = "Turbhe Naka(6600)";
            PName = $("#FinName").text();
            acc = document.getElementById("AccountNo").value;
            ////amt = document.getElementById("SlipAmount").value;  //2801
            //amt = document.getElementById("SlipAmountForCheque").value;
            amt = document.getElementById("SlipAmountForCheque").innerHTML;
            //chqamt = document.getElementById("DenomAmountForCheque").value;
            chqamt = document.getElementById("DenomAmountForCheque").innerHTML;
            var toacc = document.getElementById("ToAccount").value;
            var chqdate = document.getElementById("ChequeDateTxt").value;
            var ProcessType = "submit";
            var recipt = "YES";
            var response = "2";
            //debugger;
            var transtype = "TRF";
            var y = "PostData";
            flag = "Submit";


            //debugger;
            var ttype = localStorage.getItem("typeOfTran");

            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                //////data: { pType: ProcessType, INtellerid: gusername, response: response, transtype: transtype, transRefNo: RegNo, BranchSolID: BrCode, CreditAccountNo: toacc, PayeeName: PName, SlipAmount: amt, ChqAmount: chqamt, recipt: recipt, DebitAccountNo: acc, chqno: "123456", ChqDate: chqdate, imageUrl: ImageUrl },
                ////data: { pType: ProcessType, INtellerid: gusername, response: response, transtype: transtype, transRefNo: RegNo, BranchSolID: BrCode, CreditAccountNo: toacc, PayeeName: PName, SlipAmount: amt, ChqAmount: chqamt, recipt: recipt, DebitAccountNo: acc, chqno: chq_no_final, ChqDate: chqdate, imageUrl: ImageUrl },
                //data: { pType: ProcessType, INtellerid: gusername, response: response, transtype: transtype, transRefNo: RegNo, BranchSolID: BrCode, CreditAccountNo: toacc, PayeeName: PName, SlipAmount: amt, ChqAmount: chqamt, recipt: recipt, DebitAccountNo: acc, chqno: chq_no_final, ChqDate: chqdate, imageUrl: ImageUrl, SortCode: sort_code_final, San: san_final, transCode: trcode_final },
                data: { pType: ProcessType, INtellerid: gusername, response: response, transtype: 'TRF', transRefNo: RefNo, BranchSolID: BrCode, CreditAccountNo: toacc, PayeeName: PName, SlipAmount: amt, ChqAmount: chqamt, recipt: recipt, DebitAccountNo: acc, chqno: chq_no_final, ChqDate: chqdate, imageUrl: ImageUrl, SortCode: sort_code_final, San: san_final, transCode: trcode_final },
                success: getSuccessReset,
                error: getError
            });



        }

        //----------------New Code on 14 febuary 2022----------------------------------------------------


        //----------------END----------------------------------------------------

        //-------------------------------------added------------------------------------------


    }


    function ValidateData() {
        //debugger;

        ValidationPassed = false;

        var previnstrumenttype = " ";
        var validationflag = 0;
        localIQA = 1;
        localIQATreatment = 1;

        var TypeTran = localStorage.getItem("typeOfTran");
        if (TypeTran == "CTS") {
            Submit = "cts";
        }


        if (TypeTran == "TRF") {
            Submit = "ChequeVoucher";
        }

        if (TypeTran == "vaultcash") {
            ValidationPassed = true;
            return true;
        }


        if (Submit == "cts" || Submit == "ChequeVoucher") {

            //var spamt = document.getElementById("SlipAmountForCheque").value;
            var spamt = document.getElementById("SlipAmountForCheque").innerHTML;
            //var spamt1 = document.getElementById("DenomAmountForCheque").value;
            var spamt1 = document.getElementById("DenomAmountForCheque").innerHTML;
            //if (document.getElementById("SlipAmountForCheque").value == "" || document.getElementById("DenomAmountForCheque").value == "" || document.getElementById("SlipAmountForCheque").value == "0" || document.getElementById("DenomAmountForCheque").value == "0") {
            if (document.getElementById("SlipAmountForCheque").innerHTML == "" || document.getElementById("DenomAmountForCheque").innerHTML == "" || document.getElementById("SlipAmountForCheque").innerHTML == "0" || document.getElementById("DenomAmountForCheque").innerHTML == "0") {
                alert("Slip Amount and Cheque Amount Should not be Blank!");
                return false;
            }
            else if (document.getElementById("SlipAmountForCheque").innerHTML != document.getElementById("DenomAmountForCheque").innerHTML) {
                alert("Slip Amount and Cheque Amount does not Matched..!$$$$");
                return false;
            }
            else {
                ValidationPassed = true;
                return true;
            }

            var spamt2 = document.getElementById("ToAccount").value;
            var spamt3 = document.getElementById("AccountNo").value;

            //if ((document.getElementById("ToAccount").value == "" && document.getElementById("AccountNo").value == "") || (document.getElementById("ToAccount").value == " " && document.getElementById("AccountNo").value == "")) {
            //    alert("Debit and credit account cant be null");
            //    return false;
            //}


            //if (document.getElementById("AccountNo").value == "") {

            //    alert("Debit Ac Cant be null");
            //    //document.getElementById("AccountNo").autofocus = true;

            //    return false;

            //}

            //if (document.getElementById("ToAccount").value == "" || document.getElementById("ToAccount").value == " ") {
            //    alert("Credit Ac Cant be null");
            //    return false;
            //}

            //debugger;
            //if (document.getElementById("ToAccount").value == document.getElementById("AccountNo").value) {

            //    alert("Ac no should not same");

            //    return false;

            //}

            //else if (document.getElementById("ChequeDateTxt").value == "") {

            //    alert("ChequeDate should not null");
            //    return false;

            //}

            //else if ($("#FinName").text() == "Account does not exist" || $("#SlipFinName").text() == "Account does not exist") {

            //    if ($("#FinName").text() == "Account does not exist") {
            //        alert("Please eneter correct Debit Account Details..!");
            //        document.getElementById("FinName").style.backgroundColor = "Yellow";

            //    }
            //    else {
            //        alert("Please eneter correct  Credit Account Details..!");
            //        document.getElementById("SlipFinName").style.backgroundColor = "Yellow";
            //    }

            //    return false;
            //}
            //else {
            //    //alert("Validation Passed");
            //    ValidationPassed = true;
            //    return true;
            //}
        }

    }

    function Data_ManualDataEntry() {
        //debugger;

        for (var i = 2, row; row = tableDenom.rows[i]; i++) {
            //debugger;
            //if (row.cells[0].innerHTML.includes("COINS") == false) {
            var dValue = row.cells[2].innerHTML;
            var rowdata = [];
            rowdata = dValue.split(" ");
            var idVal = [];
            //idVal = rowdata[3].split("=\"");
            //var DenomDataToaddss = idVal[1].replace(/['"]+/g, '');
            //------------ Added on 2022-03-21 ----------- By Aniketadit Jamuar ----------- Begin
            var j = i - 2;
            var newId = j.toString();
            var inId = 'denomId_' + newId;
            var DenomDataToaddss = inId;
            if (j < 10) {
                //debugger;
                var dnamt = "";
                var inVal = document.getElementById(inId).textContent;
                var element5 = "denomId5_" + newId;
                var DenomDataToaddssMan = element5;
                if (inVal != "") {
                    if (document.getElementById(DenomDataToaddssMan).value != "") {
                        dnamt = parseInt(document.getElementById(DenomDataToaddssMan).value);
                        dCount.push(dnamt);
                        dArray.push(row.cells[0].innerHTML);
                    }
                }
                else {
                    if (document.getElementById(DenomDataToaddssMan).value != "") {
                        dnamt = parseInt(document.getElementById(DenomDataToaddssMan).value);
                        dCount.push(dnamt);
                        dArray.push(row.cells[0].innerHTML);
                    }
                }
            }
            //------------ Added on 2022-03-21 ----------- By Aniketadit Jamuar ----------- End

        }

        var count = 1;
        var INR = 'INR';
        var y = "ManualDataEntry";

        //new 
        //debugger;
        var cashinout = "in"; //m
        //debugger;
        //if ($('#returncash').is(":checked")) {
        //    // it is checked
        //    //alert("true");
        //    // alert("Hello!");
        //    cashinout = 'out';
        //}
        //else {
        //    //alert("false");
        //    cashinout = 'in';

        //}

        //new

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            data: { Tellerid: gusername, Denoms: dArray, DenomCount: dCount, maip: machineserialno, count_id: sni_countid, local: INR, cashinout: cashinout },
            success: getSuccessReset,
            error: getError
        });

        return true;
    }

}
catch (e) {
    alert(e.message);
}

