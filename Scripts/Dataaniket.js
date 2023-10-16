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
        debugger;

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
        debugger;
        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            alert(result.responseText);
        }
    }



   


    function closeDialog() {
        debugger;
        $(popup).dialog("close");
        var ProcessType = "submit";
        var response = "2";
        var transtype = "CASHDEP";
        var y = "PostData";
        flag = "Submit";
        RegNo = document.getElementById("AccountNo").value;    //wrong
        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            data: { pType: ProcessType, INtellerid: gusername, response: response, transtype: transtype, transRefNo: RegNo, BranchSolID: BrCode, CreditAccountNo: acc, PayeeName: PName, SlipAmount: amt,ChqAmount:amt, recipt: recipt, Denoms: dArray, DenomCount: dCount, imageUrl: ImageUrl },
            success: getSuccessReset,
            error: getError
        });
    }
    function getReset() {
        debugger;
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
        debugger;
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

    function getSuccess(result) {
        debugger;
        var TypeTran = localStorage.getItem("typeOfTran");
        if (TypeTran == "WithDraw")
        {
            var tb
            = document.getElementById("Entry");
            tb.style.display = "none";
           // $("#Entry th").remove();
        }
        
        sni_countid = result[0].id

        $("#CashDetails tr").remove();
        $("#DenomDeatils tr").remove();
        var i = 0;
        var totcnt = 0;
        var RjctCnt = 0;
        var TotAmt = 0;
        var Denom10 = 0;
        var Denom10Amt = 0;
        var Denom20 = 0;
        var Denom20Amt = 0;
        var Denom50 = 0;
        var Denom50Amt = 0;
        var Denom100 = 0;
        var Denom100Amt = 0;
        var Denom200 = 0;
        var Denom200Amt = 0;
        var Denom500 = 0;
        var Denom500Amt = 0;
        var Denom2000 = 0;
        var Denom2000Amt = 0;
        $("#CashData").show();


        $.each(result, function (key, item) {
            i = i + 1;
            var newImgStr = item.sn_imagepath.replace(PhysicalImageURL, WebImageURL);
            totcnt = item.totalcount;
            RjctCnt = item.reject_count;
            TotAmt = TotAmt + parseFloat(item.currncy_denom);
        });

        $("#tblDenomination").show();

        while (tableDenom.rows.length > 2) {
            tableDenom.deleteRow(2);
        }
        var DData = ["2000", "500", "200", "100", "50", "20", "10", "5"];

        var DenomCnt = 0;

        //-----------------Aniket----------------------------

        //---------------------END----------------------

        for (var j = 0; j < DData.length; ++j) {
            var row = document.createElement('tr');
            var cell = document.createElement('td');
            cell.innerHTML = DData[j];
            row.appendChild(cell);
            var cell1 = row.insertCell(1);
            var element1 = document.createElement('label');
            element1.innerText = "X";
            element1.className = "tableClass";
            cell1.appendChild(element1);
            if (flag == "Cash" || flag == "vaultcash") {
                var cell2 = row.insertCell(2);
                var element2 = document.createElement("label");
                //element2.type = "text";
                element2.name = "denom";
                element2.id = "denomId_" + j;
                element2.className = "tableClass";
                //element2.disable = true;
                //element2.readOnly = true;
                cell2.appendChild(element2);
                for (k = 0; k < result.length; k++) {
                    if (result[k].currncy_denom == DData[j]) {
                        if (result[k].currncy_denom == "50") {
                            Denom50 += 1;
                            //element2.value = Denom50;
                            element2.innerHTML = Denom50;
                            cell2.appendChild(element2);
                        }
                        else if (result[k].currncy_denom == "20") {
                            Denom20 += 1;
                            //element2.value = Denom20;
                            element2.innerHTML = Denom20;
                            cell2.appendChild(element2);
                        }
                        else if (result[k].currncy_denom == "10") {
                            Denom10 += 1;
                            //element2.value = Denom10;
                            element2.innerHTML = Denom10;
                            cell2.appendChild(element2);
                        }
                        else if (result[k].currncy_denom == "100") {
                            Denom100 += 1;
                            //element2.value = Denom100;
                            element2.innerHTML = Denom100;
                            cell2.appendChild(element2);
                        }
                        else if (result[k].currncy_denom == "200") {
                            Denom200 += 1;
                            //element2.value = Denom200;
                            element2.innerHTML = Denom200;
                            cell2.appendChild(element2);
                        }

                        else if (result[k].currncy_denom == "500") {
                            Denom500 += 1;
                            //element2.value = Denom500;
                            element2.innerHTML = Denom500;
                            cell2.appendChild(element2);
                        }
                        else if (result[k].currncy_denom == "2000") {
                            Denom2000 += 1;
                            //element2.value = Denom2000;
                            element2.innerHTML = Denom2000;
                            cell2.appendChild(element2);
                        }

                        else {
                            //element2.value = "";
                            element2.innerHTML = "0";
                            cell2.appendChild(element2);
                        }
                    }

                }
                var cell3 = row.insertCell(3);
                var element3 = document.createElement("input");
                element3.type = "text";
                element3.name = "denom2";
                element3.id = "denomId2_" + j;
                element3.className = "tableClass";
                element3.readOnly = true;
                cell3.appendChild(element3);


                // just changed
                var cell5 = row.insertCell(4);
                var element5 = document.createElement("input");
                element5.type = "text";
                element5.name = "denom5";
                element5.id = "denomId5_" + j;
                element5.className = "tableClass";
                  element3.readOnly = true;
                cell5.appendChild(element5);
            }
            else {
                var cell2 = row.insertCell(2);
                var element2 = document.createElement("input");
                element2.type = "text";
                element2.name = "denom";
                element2.id = "denomId_" + j;
                element2.className = "tableClass";
                element2.readOnly = true;
                cell2.appendChild(element2);
                var cell3 = row.insertCell(3);
                var element3 = document.createElement("input");
                //element3.type = "text";
                element3.name = "denom2";
                element3.id = "denomId2_" + j;
                element3.className = "tableClass";
               // element3.readOnly = true;
                cell3.appendChild(element3);
                for (k = 0; k < result.length; k++) {
                    if (result[k].currncy_denom == DData[j]) {
                        if (result[k].currncy_denom == "50") {
                            Denom50 += 1;
                            element3.innerHTML = Denom50;
                            //element3.value = Denom50;
                            cell3.appendChild(element3);
                        }
                        else if (result[k].currncy_denom == "20") {
                            Denom20 += 1;
                            element3.ineerHTML = Denom20;
                            //element3.value = Denom20;
                            cell3.appendChild(element3);
                        }
                        else if (result[k].currncy_denom == "10") {
                            Denom10 += 1;
                            element3.innerHTML = Denom10;
                            //element3.value = Denom10;
                            cell3.appendChild(element3);
                        }
                        else if (result[k].currncy_denom == "100") {
                            Denom100 += 1;
                            element3.innerHTML = Denom100;
                            //element3.value = Denom100;
                            cell3.appendChild(element3);
                        }
                        else if (result[k].currncy_denom == "200") {
                            Denom200 += 1;
                            element3.innerHTML = Denom200;
                            //element3.value = Denom200;
                            cell3.appendChild(element3);
                        }

                        else if (result[k].currncy_denom == "500") {
                            Denom500 += 1;
                            element3.innerHTML = Denom500;
                            //element3.value = Denom500;
                            cell3.appendChild(element3);
                        }
                        else if (result[k].currncy_denom == "2000") {
                            Denom2000 += 1;
                            element3.innerHTML = Denom2000;
                            //element3.value = Denom2000;
                            cell3.appendChild(element3);
                        }

                        else {
                            //element3.value = "";
                            element3.innerHTML = "0";
                            cell3.appendChild(element3);
                        }
                    }

                }

            //    var cell5 = row.insertCell(5);
            //    var element5 = document.createElement("input");
            //    element5.type = "text";
            //    element5.name = "denom5";
            //    element5.id = "denomId5_" + j;
            //    element5.className = "tableClass";
            //    element5.readOnly = true;
            //    cell5.appendChild(element5);
            //    for (k = 0; k < result.length; k++) {
            //        if (result[k].currncy_denom == DData[j]) {
            //            if (result[k].currncy_denom == "50") {
            //                Denom50 += 1;
            //                element5.value = Denom50;
            //                cell5.appendChild(element5);
            //            }
            //            else if (result[k].currncy_denom == "20") {
            //                Denom20 += 1;
            //                element5.value = Denom20;
            //                cell5.appendChild(element5);
            //            }
            //            else if (result[k].currncy_denom == "10") {
            //                Denom10 += 1;
            //                element5.value = Denom10;
            //                cell5.appendChild(element5);
            //            }
            //            else if (result[k].currncy_denom == "100") {
            //                Denom100 += 1;
            //                element5.value = Denom100;
            //                cell5.appendChild(element5);
            //            }
            //            else if (result[k].currncy_denom == "200") {
            //                Denom200 += 1;
            //                element5.value = Denom200;
            //                cell5.appendChild(element5);
            //            }

            //            else if (result[k].currncy_denom == "500") {
            //                Denom500 += 1;
            //                element5.value = Denom500;
            //                cell5.appendChild(element5);
            //            }
            //            else if (result[k].currncy_denom == "2000") {
            //                Denom2000 += 1;
            //                element5.value = Denom2000;
            //                cell5.appendChild(element5);
            //            }

            //            else {
            //                element5.value = "";
            //                cell5.appendChild(element5);
            //            }
            //        }

            //    }

            }


            var cell4 = row.insertCell(4);
            var element4 = document.createElement('label');
            for (i = 0; i < result.length; i++) {
                if (result[i].currncy_denom == DData[j]) {
                    //debugger;
                    //var hh = denomId_0.innerHTML;

                    //added by anandi

                    //var Demon = document.getElementById("tblDenomination").getElementsByTagName('tr')[2].cells[2].innerHTML;
                    //var rowdata = [];
                    //rowdata = Demon.split(" ");
                    //var idVal = [];
                    //idVal = rowdata[3].split("=\"");
                    //var DenomDataToaddssMan = idVal[1].replace(/['"]+/g, '');

                    //

                    element4.innerText = result[i].currncy_denom;
                    break;
                }
                else {
                    element4.innerText = "0";
                }
            }

            cell4.appendChild(element4);

            //var cell5 = row.insertCell(5);
            //var element5 = document.createElement('label');
            //element5.innerText = "0";
            //cell5.appendChild(element5);
            //var cell6 = row.insertCell(6);
            //var element6 = document.createElement('label');
            //element6.innerText = "0";
            //cell6.appendChild(element6);
            //var cell7 = row.insertCell(7);
            //var element7 = document.createElement('label');
            //element7.innerText = "0";
            //cell7.appendChild(element7);
            row.className = "rowalign";
            document.getElementById("tblDenomination").appendChild(row);
        }
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        cell.innerHTML = "COINS";
        row.appendChild(cell);
        var cell1 = row.insertCell(1);
        var element1 = document.createElement('label');
        element1.innerText = "X";
        element1.className = "tableClass";
        cell1.appendChild(element1);
        var cell2 = row.insertCell(2);
        var element2 = document.createElement("label");
        element2.type = "text";
        element2.name = "denom";
        element2.id = "denomId";
        element2.className = "tableClass";
        cell2.appendChild(element2);
        var cell3 = row.insertCell(3);
        var element3 = document.createElement("label");
        //element3.type = "text";
        element3.name = "denom2";
        element3.id = "denomId2";
        element3.className = "tableClass";
        cell3.appendChild(element3);
        var cell4 = row.insertCell(4);
        var element4 = document.createElement('label');
        element4.innerText = "0";
        cell4.appendChild(element4);
        if (TypeTran != "WithDraw")
        {
            var cell5 = row.insertCell(5);
            var element5 = document.createElement("input");
            element5.type = "text";
            element5.name = "denom5";
            element5.id = "denomId5";
            element5.className = "tableClass";
            cell5.appendChild(element5);
        }
       






        //var cell5 = row.insertCell(5);
        //var element5 = document.createElement('label');
        //element5.innerText = "0";
        //cell5.appendChild(element5);
        //var cell6 = row.insertCell(6);
        //var element6 = document.createElement('label');
        //element6.innerText = "0";
        //cell6.appendChild(element6);
        //var cell7 = row.insertCell(7);
        //var element7 = document.createElement('label');
        //element7.innerText = "0";
        //cell7.appendChild(element7);
        row.className = "rowalign";
        document.getElementById("tblDenomination").appendChild(row);

        document.getElementById("DenomAmount").value = TotAmt;
        totalAmtToAdd = TotAmt;

        //  document.getElementById("btnSubmit").disabled = false;
        if (sliptotamt == TotAmt) {
            $('#DenomDeatils').append("<tr><td style='color:green' colspan=4>Requested Amount Matched with denom total</td></tr>");
            //document.getElementById("status").innerHTML = "Requested Amount Matched with denom total";
            //document.getElementById("status").style.color = "green";
        }

        else {
            $('#DenomDeatils').append("<tr><td style='color:red' colspan=4>Request Amount Not Matched with denom total</td></tr>");

        }

        //added by anandi
        //for (j = 0; j < DData.length; j++) {
        //    for (i = 0; i < result.length; i++) {
        //        if (result[i].currncy_denom == DData[j]) {
        //            debugger;
        //            //var hh = denomId_0.innerHTML;


        //            var Demon = document.getElementById("tblDenomination").getElementsByTagName('tr')[2].cells[2].innerHTML;
        //            var rowdata = [];
        //            rowdata = Demon.split(" ");
        //            var idVal = [];
        //            idVal = rowdata[3].split("=\"");
        //            var DenomDataToaddssMan = idVal[1].replace(/['"]+/g, '');

        //            if (document.getElementById(DenomDataToaddss).value != "") {
        //                DenomDataToadd = parseInt(document.getElementById(DenomDataToaddss).value);
        //            }
        //            //

        //            element4.innerText = result[i].currncy_denom;
        //            break;
        //        }
        //        else {
        //            element4.innerText = "0";
        //        }
        //    }
        //}
        //added by anandi

       
    }
    function getSuccessReset(result) {
        debugger;
        if (flag == "Sub") {
            alert("Data Submitted successfully.");
            window.location.reload();
        }
        else
        {

           
                if (flag == "Reset")
                {
                    alert("The " + JSON.stringify(result) + " record cleaned successfully.");
                    window.location.reload();
                }
                else
                {
                    var TypeTran = localStorage.getItem("typeOfTran");

                    if (TypeTran == "Deposit") {
                        if (flag == "Submit")
                        {
                            alert("The " + JSON.stringify(result) + " record posted successfully.");
                            window.location.reload();
                        }
                        else
                        {
                            alert( + JSON.stringify(result) + " Cash Inserted successfully.");
                        }
                    }
                    else
                    {
                        alert("The " + JSON.stringify(result) + " record posted successfully.");
                        window.location.reload();
                    }
                    
                }
                

        }

        $("#CashDetails tr").remove();
        $("#VoucherDetails tr").remove();
        $("#DenomDeatils tr").remove();
        document.getElementById("FG").src = "";
        //document.getElementById("status").innerHTML = "";
        document.getElementById("FG").style.display = "none";
        sliptotamt = 0;
        Currtotamt = 0;
    }
    function getSuccessVoucher(result) {
        debugger;
        if (flag == "Cash") {
            $("#VoucherDetails tr").remove();
            if (result[0].instrumenttype == null || result[0].instrumenttype == undefined || result[0].instrumenttype == "C") {
                alert("Please Enter Correct Document.");
                //  return false;
            }
            else {
                instruType = result[0].instrumenttype;
            }
            var i = 0;
            var totchqcnt = 0;
            var totslpcnt = 0;
            sliptotamt = 0;
            document.getElementById("AccountNo").value = result[0].accno;
            document.getElementById("SlipAmount").value = result[0].amount;
            document.getElementById("micr").value = result[0].ocr;
            document.getElementById("ItemId").value = result[0].id;
            machineserialno = result[0].machineserialno;
            var cashinout = ""; //04032022

            if ($('#returncash').is(":checked")) {
                // it is checked
                //alert("true");
               // alert("Hello!");
                cashinout = 'out';
            }
            else {
                //alert("false");
                cashinout = 'in';

            }



            $("#MICRImg").show();
            $.each(result, function (key, item) {
                i = i + 1;
                var newImgStr = item.frontgreyimagepath;
                ImageUrl = item.frontgreyimagepath;
                $('#VoucherDetails').append("<tr><td>" + item.accno + "</td>" + "<td>" + item.amount + "</td><td><img height='30' width='70' id=" + item.id + "  src=" + newImgStr + "  /></td><td><label><input type='radio' id='frontGimg' name='optradio' onclick=switchimage('frontGimg','" + item.id + "')>Front</label></td><td><label><input type='radio' id='backGimg' name='optradio' onclick=switchimage('backGimg','" + item.id + "')>Back</label></td><td><label><input type='radio' id='frontIRimg' name='optradio' onclick=switchimage('frontIRimg','" + item.id + "')>IR</label></td></tr>");
                document.getElementById("FG").src = newImgStr;
                document.getElementById("FG").style.display = "";
                totslpcnt = item.slipcount;
                sliptotamt += item.amount;

            });
            $.ajax({
                type: 'POST',
                url: x + "getcashdetails",
                headers: authHeaders,
                crossDomain: true,
                data: { 'Intellerid': gusername, 'cashinout': cashinout },
                success: getSuccess,
                error: getError

            });
            if (result[0].accno == "") {
                alert("Account Number for Slip is Blank..!")
            }
            else {

                var delayInMilliseconds = 50; //10 second
                setTimeout(function () {
                    GetPayeee(result[0].accno, "S");
                }, delayInMilliseconds);
            }

        }
        if (flag == "With") {

            $("#VoucherDetails tr").remove();
            if (result[0].instrumenttype == null || result[0].instrumenttype == undefined || result[0].instrumenttype == "S") {
                alert("Please Enter Correct Document.");
                // return false;
            }
            else {
                instruType = result[0].instrumenttype;
            }
            var i = 0;
            var totchqcnt = 0;
            var totslpcnt = 0;
            sliptotamt = 0;
            document.getElementById("AccountNo").value = result[0].accno;
            document.getElementById("SlipAmount").value = result[0].amount;
            document.getElementById("micr").value = result[0].ocr;
            document.getElementById("ItemId").value = result[0].id;
            $("#MICRImg").show();

            $.each(result, function (key, item) {
                i = i + 1;
                var newImgStr = item.frontgreyimagepath;
                ImageUrl = item.frontgreyimagepath;
                $('#VoucherDetails').append("<tr><td>" + item.accno + "</td>" + "<td>" + item.amount + "</td>" + "<td>" + item.chqdate + "</td> " + "<td>" + item.ocr + "</td>" + "<td><img height='30' width='70' id=" + item.id + "  src=" + newImgStr + "  /></td><td><label><input type='radio' id='frontGimg' name='optradio' onclick=switchimage('frontGimg','" + item.id + "')>Front</label></td><td><label><input type='radio' id='backGimg' name='optradio' onclick=switchimage('backGimg','" + item.id + "')>Back</label></td><td><label><input type='radio' id='frontIRimg' name='optradio' onclick=switchimage('frontIRimg','" + item.id + "')>IR</label></td></tr>");
                document.getElementById("FG").src = newImgStr;
                document.getElementById("FG").style.display = "";
                totslpcnt = item.slipcount;
                sliptotamt += item.amount;

            });
            $.ajax({
                type: 'POST',
                url: x + "getcashdetails",
                headers: authHeaders,
                crossDomain: true,
                data: { 'Intellerid': gusername, 'cashinout': 'out' },
                success: getSuccess,
                error: getError

            });
            if (result[0].accno == "") {
                alert("Account Number for Cheque is Blank..!")
            }
            else {

                var delayInMilliseconds = 50; //10 second

                setTimeout(function () {
                    GetPayeee(result[0].accno, "C");
                }, delayInMilliseconds);


            }


        }


        if (flag == "Cheque" || flag == "TranCheque") {
            $("#VoucherDetails tr").remove();
            $("#DenomDeatils tr").remove();

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
            debugger;
            $.each(result, function (key, item) {
              
                var newImgStr = item.frontgreyimagepath;
                ImageUrl = item.frontgreyimagepath;
                $('#VoucherDetails').append("<tr><td>" + item.accno + "</td>" + "<td style='display:none;'>" + item.payeename + "</td>" + "<td>" + item.totalamount + "</td>" + "<td style='display:none;'>" + item.cheqno + "</td>" + "<td style='display:none;'>" + item.sortcode + "</td>" + "<td style='display:none;'>" + item.san + "</td>" + "<td style='display:none;'>" + item.trcode + "</td>" + "<td>" + item.amount + "</td>" + "<td>" + item.chqdate + "</td> " + "<td>" + item.micr + "</td>" + "<td>" + item.ocr + "</td>" + "<td>" + item.instrumenttype + "</td>" + "<td style='display:none;'>" + item.iqatest + "</td>" + "<td style='display:none;'><input type='checkbox' id='chkmarkp2f' name='chkmarkp2f'></td>" + "<td><input type='checkbox' id='chkmarkchq' name='chkmarkchq'></td>" + "<td><input type='checkbox' id='chkmarkslip' name='chkmarkslip'></td><td><img height='50' width='70' id=" + item.id + "  src=" + newImgStr + "  /></td><td><label><input type='radio' id='frontGimg' name='optradio' onclick=switchimage('frontGimg','" + item.id + "')>Front</label></td><td><label><input type='radio' id='backGimg' name='optradio' onclick=switchimage('backGimg','" + item.id + "')>Back</label></td><td><label><input type='radio' id='frontIRimg' name='optradio' onclick=switchimage('frontIRimg','" + item.id + "')>IR</label></td></tr>");
                document.getElementById("FG").src = newImgStr;
                document.getElementById("FG").style.display = "";
                totslpcnt = item.slipcount;
                TotSlpAmt = TotSlpAmt + parseFloat(item.totalamount);
                TotChqAmt = TotChqAmt + parseFloat(item.amount);
                document.getElementById("SlipAmountForCheque").value = TotSlpAmt;
                document.getElementById("DenomAmountForCheque").value = TotChqAmt;
                if (result[i].instrumenttype == "S") {
                    document.getElementById("ToAccount").value = result[i].accno; //anandi
                }
                else {
                    document.getElementById("AccountNo").value = result[i].accno;
                    document.getElementById("micr").value = result[i].ocr;
                }


                i = i + 1;
            });
            // -------------------------Commented by me ----------------------
            //var intSlipNo = 0;
            //if (result[0].instrumenttype != "S") {
            //    alert("Slip and Cheque are in wrong Sequence.");
            //    return false;
            //}
            //else {
            //    document.getElementById("ToAccount").value = result[0].accno;
            //    if (result[1] == undefined) {
            //        alert("There is only one slip present.");
            //        return false;
            //    }
            //    if (result[1].accno == undefined || result[1].accno == null) {
            //        alert("There is no Cheque avaliable for the corresponding Slip.");
            //        return false;
            //    }
            //    else {
            //        document.getElementById("AccountNo").value = result[1].accno;
            //    }

            //}
            //if (i > 1)
            //{
            //    if (result[0].instrumenttype == "S") {
            //        document.getElementById("ToAccount").value = result[0].accno;
            //    }
            //    else
            //        document.getElementById("AccountNo").value = result[1].accno;
            //}
            //else
            //{
            //    if (result[0].instrumenttype == "S") {
            //        document.getElementById("ToAccount").value = result[0].accno;
            //    }
            //    else
            //        document.getElementById("AccountNo").value = result[0].accno;
            //}
            
            

            //document.getElementById("AccountNo").value = result[1].accno;

            while (tableChequeData.rows.length > 1) {
                tableChequeData.deleteRow(1);
            }
            for (var i = 0; i < result.length; i++) {
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
                var cell4 = row.insertCell(4);
                cell4.innerHTML = result[i].ocr;
                row.appendChild(cell4);
                var cell5 = row.insertCell(5);
                cell5.innerHTML = result[i].micr;
                row.appendChild(cell5);
                var cell6 = row.insertCell(6);
                cell6.innerHTML = result[i].instrumenttype;
                row.appendChild(cell6);

                var cell7 = row.insertCell(7);
                var r1 = document.createElement("input");
                r1.type = "radio";
                r1.name = "mark_" + i;
                r1.id = "chkboxCheque";
                r1.className = "radio-inline";
                var lbl1 = document.createElement('label');
                lbl1.innerText = "Cheque";
                lbl1.htmlFor = r1.id;
                cell7.appendChild(r1);
                cell7.appendChild(lbl1);

                var r2 = document.createElement("input");
                r2.type = "radio";
                r2.name = "mark_" + i;
                r2.id = "chkboxSlip";
                r2.className = "radio-inline";
                var lbl2 = document.createElement('label');
                lbl2.innerText = "Slip";
                lbl2.htmlFor = r2.id;
                cell7.appendChild(r2);
                cell7.appendChild(lbl2);
                var cell8 = row.insertCell(8);
                cell8.innerHTML = result[i].frontgreyimagepath;
                row.appendChild(cell8);
                var cell9 = row.insertCell(9);
                if (result[i].instrumenttype == "S") {
                    if (intSlipNo == 0) {
                        intSlipNo = 1;
                    }
                    else {
                        intSlipNo = intSlipNo + 1;
                    }
                    cell9.innerHTML = intSlipNo;
                }
                else {
                    intSlipNo = intSlipNo;
                    cell9.innerHTML = intSlipNo;
                }
                row.appendChild(cell9);
                var cell10 = row.insertCell(10);
                cell10.innerHTML = result[i].frontgreyimagepath;
                row.appendChild(cell10);
                var cell11 = row.insertCell(11);
                cell11.innerHTML = result[i].backgreyimagepath;
                row.appendChild(cell11);
                var cell12 = row.insertCell(12);
                cell12.innerHTML = i + 1;
                row.appendChild(cell12);
                var cell13 = row.insertCell(13);
                cell13.innerHTML = result[i].cheqno;
                row.appendChild(cell13);
                var cell14 = row.insertCell(14);
                cell14.innerHTML = result[i].doctype;
                row.appendChild(cell14);
                var cell15 = row.insertCell(15);
                cell15.innerHTML = result[i].sortcode;
                row.appendChild(cell15);
                var cell16 = row.insertCell(16);
                cell16.innerHTML = result[i].trcode;
                row.appendChild(cell16);
                var cell17 = row.insertCell(17);
                cell17.innerHTML = result[i].san;
                row.appendChild(cell17);
                var cell18 = row.insertCell(18);
                cell18.innerHTML = result[i].ignoreiqa;
                row.appendChild(cell18);
                var cell19 = row.insertCell(19);
                cell19.innerHTML = result[i].iqaflag;
                row.appendChild(cell19);
                var cell20 = row.insertCell(20);
                cell20.innerHTML = result[i].iqastring;
                row.appendChild(cell20);
                var cell21 = row.insertCell(21);
                var element21 = document.createElement("button");
                element21.type = "button";
                element21.name = "button";
                element21.className = "fas fa-trash";
                cell21.appendChild(element21);
                row.appendChild(cell21);
                document.getElementById("tblChequeData").appendChild(row);
                $("#tblChequeData tr td:nth-child(9)").hide();
                //$("#tblChequeData tr td:nth-child(10)").hide();
                $("#tblChequeData tr td:nth-child(11)").hide();
                $("#tblChequeData tr td:nth-child(12)").hide();
                $("#tblChequeData tr td:nth-child(13)").hide();
                $("#tblChequeData tr td:nth-child(14)").hide();
                $("#tblChequeData tr td:nth-child(15)").hide();
                $("#tblChequeData tr td:nth-child(16)").hide();
                $("#tblChequeData tr td:nth-child(17)").hide();
                $("#tblChequeData tr td:nth-child(18)").hide();
                $("#tblChequeData tr td:nth-child(19)").hide();
                $("#tblChequeData tr td:nth-child(20)").hide();
                $("#tblChequeData tr td:nth-child(21)").hide();
            }
            $("#ShowToAcc").show();
            $("#MICRImg").show();
            $("#ChequeData").show();
            GetSData();

            if (result[1].accno == "") {
                alert("Account Number is blank for Cheque..!")
            }
            else {

                //var delayInMilliseconds = 30; //10 second
                //setTimeout(function () {                    
                //    $.ajax({
                //        url: x + "GetCBSDtls",
                //        headers: authHeaders,
                //        type: 'POST',
                    
                //        //url: "http://10.9.0.222/WebApi/api/Scanner/GetCBSDtls",
                //        crossDomain: true,
                //        data: { 'ac': result[1].accno },
                //        success: getSuccessFinDetails,
                //        error: getError
                //    });
                //}, delayInMilliseconds);


                $.ajax({
                    url: x + "GetCBSDtls",
                    headers: authHeaders,
                    type: 'POST',
                    async:false,
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
                setTimeout(function () {

                    GetPayeee(result[0].accno, "S");
                }, delayInMilliseconds);


            }


            var rslt = "";
            if (TotSlpAmt == TotChqAmt) {
                rslt = "Slip amount (" + TotSlpAmt + ") matched with cheques total amount (" + TotChqAmt + ")";
            }
            else {
                rslt = "Slip amount (" + TotSlpAmt + ") not matched with cheques total amount (" + TotChqAmt + ")";
            }

        }

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
            Pay = "<select id='PayeeName' class='form-control'>";
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

    //today Anandi
    function txttogrid() {
        debugger;
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = document.getElementById("HalfSlipAmount").value;
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = document.getElementById("HalfChequeAmount").value;
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[3].innerHTML = document.getElementById("ChequeDateTxt").value;
        var TotSlpAmt = 0;
        var TotChqAmt = 0;
        for (var i = 1, row; row = tableChequeData.rows[i]; i++) {


            TotSlpAmt = TotSlpAmt + parseFloat(row.cells[1].innerHTML);
            TotChqAmt = TotChqAmt + parseFloat(row.cells[2].innerHTML);
        }


        document.getElementById("SlipAmountForCheque").value = TotSlpAmt;
        document.getElementById("DenomAmountForCheque").value = TotChqAmt;
    }

    /* on serch click */
    function GetPayeee(Acc, Type) {
        debugger;
        if (GlobalRowNo != " ") {
            if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[6].innerHTML == "S") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("ToAccount").value;
            }
            else {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("AccountNo").value;
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

                if (Type == "C") {
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
                        var Pay = "<select id='PayeeName' class='form-control'>";
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
                            var Pay = "<select id='PayeeName' class='form-control'>";
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
                        $("#SlipFinName").text("");
                        $("#SlipFinAccOwner").text("");
                        $("#SlipFinAccountStatus").text("");
                        $("#SlipFinMOP").text("");
                        $("#SlipFinAmount").text("");
                        $("#SlipFinScheme").text("");
                        $("#SlipFinMOP").text("");
                        var Pay = "<select id='SlipFinPayeeName' class='form-control'>";
                        Pay = Pay + '</select>';
                        $('#SlipFinPay').html(Pay);
                        var FinDetails = {};
                        FinDetails = result;
                        if (FinDetails.cbsdls == null) {
                            $("#SlipFinName").text("Account does not exist");
                            $("#SlipFinName").css('color', 'red');
                        }
                        else if (FinDetails.cbsdls.includes("Account does not exist")) {
                            $("#SlipFinName").text("Account does not exist");
                            $("#SlipFinName").css('color', 'red');
                        }
                        else {

                            if (FinDetails.PayeeName != null) {
                                $("#SlipFinName").text(FinDetails.PayeeName[0]);
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
                            var Pay = "<select id='SlipFinPayeeName' class='form-control'>";
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
            },
            error: getError
        });
    }


    //--------------------------------added by Anandi ---------------------------------------
    function getToken(tokenurl) {
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
        debugger;
        window.localStorage.setItem('AccessToken', result.access_token);
        window.localStorage.setItem('TokenType', result.token_type);

    }

//-----------------------------------End ---------------------------------------
    function SubmitData() {
        debugger;
        //ValidateData();    by meraj sir              
        //if (ValidationPassed == false) { by meraj sir 
       ValidateData();
        if (ValidationPassed == true) {
            var TypeTran = localStorage.getItem("typeOfTran");
            if (TypeTran == "Deposit") {
                Submit = "DepositVoucher";
            }
            if (TypeTran == "WithDraw") {
                Submit = "WithVoucher";
            }
            if (TypeTran == "CTS") {
                Submit = "cts";
            }
            if (TypeTran == "TC") {
                Submit = "ChequeVoucher";
            }
            if (TypeTran == "vaultcash") {
                Submit = "vaultcash";
            }
            if (Submit == "DepositVoucher" || Submit == "WithVoucher" || Submit == "ChequeVoucher") {
                
                if (Submit == "DepositVoucher") {


                    for (var i = 2, row; row = tableDenom.rows[i]; i++) {
                        if (row.cells[0].innerHTML.includes("COINS") == false) {
                            var dValue = row.cells[2].innerHTML;
                            var rowdata = [];
                            rowdata = dValue.split(" ");
                            var idVal = [];
                            idVal = rowdata[3].split("=\"");
                            var DenomDataToaddss = idVal[1].replace(/['"]+/g, '');
                            if (document.getElementById(DenomDataToaddss).value != "") {
                                dCount.push(parseInt(document.getElementById(DenomDataToaddss).value));
                                dArray.push(row.cells[0].innerHTML);
                            }
                        }
                        else {
                            var dValue = row.cells[2].innerHTML;
                            var rowdata = [];
                            rowdata = dValue.split(" ");
                            var idVal = [];
                            idVal = rowdata[3].split("=\"");
                            var DenomDataToaddss = idVal[1].replace(/['"]+/g, '');
                            if (document.getElementById(DenomDataToaddss).value != "") {
                                dCount.push(parseInt(document.getElementById(DenomDataToaddss).value));
                                dArray.push("COINS");
                            }
                        }
                    }

                    BrCode = "Mumbai";
                    PName = $("#FinName").text();
                    acc = document.getElementById("AccountNo").value;
                    amt = document.getElementById("SlipAmount").value;
                    $("#Branch").text(BrCode);
                    $("#Account").text(acc);
                    $("#Amount").text(amt);
                    $("#Name").text(PName);
                    $("#pdate").text(strDate);
                    $("#Receipt").text(RegNo);
                    $("#Cashier").text(gusername);
                    Showmodal();
                }
                if (Submit == "WithVoucher") { //Cash Withdrawl Anandi

                    //ValidateData();

                    PName = $("#FinName").text();
                    acc = document.getElementById("AccountNo").value;
                    amt = document.getElementById("SlipAmount").value;
                   // chqamt =

                    var ProcessType = "submit";
                    BrCode = "Turbhe Naka(6600)";
                    var response = "2";
                    var y = "PostData";
                    var transtype = "CASHWDL";
                    
                    flag = "Submit"
                    $.ajax({
                        url: x + y,
                        headers: authHeaders,
                        type: 'POST',
                        data: { pType: ProcessType, maip: gusername, INtellerid: gusername, response: response, transtype: transtype, transRefNo: RegNo, BranchSolID: BrCode, imageUrl: ImageUrl, SlipAmount: amt, ChqAmount: amt,PayeeName: PName, CreditAccountNo: acc },
                        success: getSuccessReset,
                        error: getError

                    });
                }
                if (Submit == "ChequeVoucher") {
                    debugger;
                    BrCode = "Turbhe Naka(6600)";
                    PName = $("#FinName").text();
                    acc = document.getElementById("AccountNo").value;
                    //amt = document.getElementById("SlipAmount").value;  //2801
                    amt = document.getElementById("SlipAmountForCheque").value;
                    chqamt = document.getElementById("DenomAmountForCheque").value;
                    var toacc = document.getElementById("ToAccount").value;
                    var chqdate = document.getElementById("ChequeDateTxt").value;
                    var ProcessType = "submit";
                    var recipt = "YES";
                    var response = "2";
                    var transtype = "TRF";
                    var y = "PostData";
                    flag = "Submit";

                    $.ajax({
                        url: x + y,
                        headers: authHeaders,
                        type: 'POST',
                        data: { pType: ProcessType, INtellerid: gusername, response: response, transtype: transtype, transRefNo: RegNo, BranchSolID: BrCode, CreditAccountNo: toacc, PayeeName: PName, SlipAmount: amt, ChqAmount: chqamt, recipt: recipt, DebitAccountNo: acc, chqno: "123456", ChqDate: chqdate, imageUrl: ImageUrl },
                        success: getSuccessReset,
                        error: getError
                    });

                   
                }


            }
            else if (Submit == "cts")
            {

                //-------------------------------------added------------------------------------------
                debugger;

                var ChequeData = {}
                ChequeData.pType = "CTS";
                ChequeData.response = "2";
                ChequeData.INtellerid = gusername;
                ChequeData.transtype = "CTS";
                ChequeData.transRefNo = RegNo;
                //ChequeData.AccountNo = document.getElementById("AccountNo").value;
                //ChequeData.ChequeDate = document.getElementById("ChequeDateTxt").value;
                ChequeData.ClearingType = "01"
                ChequeData.ScanningType = "15"
                ChequeData.BranchCode = "111"
                ChequeData.BOFD = "BOFD"
                ChequeData.IFSC = "IFSC"
                ChequeData.machineserialno = "00016C59CED3";  //correct Serial no
                ChequeData.retrycount = "N";
                //ChequeData.machineserialno = "IF601CS124";
                var SorterData = [];
                for (var i = 1, row; row = tableChequeData.rows[i]; i++) {
                    SorterData.push({
                       
                        AccountNo: row.cells[0].innerHTML,
                        //AccountNo: row.cells[0].innnerHTML,
                        AccountNoConf: "90",
                        payeename: document.getElementById("PayeeName").value,
                        ChequeDate: row.cells[3].innerHTML,
                        //ChequeDate: row.cells[3].innnerHTML,
                        ChequeDateConf: "85",
                        ChequeAmount: row.cells[2].innerHTML,
                        ChequeAmountConf: "87",
                        MICR: row.cells[4].innerHTML.trim(),
                        OCR: row.cells[5].innerHTML.trim(),
                        InstrumentType: row.cells[6].innerHTML,
                        SlipNo: row.cells[9].innerHTML,
                        ChequeNoMICR: row.cells[13].innerHTML,
                        SortCode: row.cells[15].innerHTML,
                        transCodeMICR: row.cells[16].innerHTML,
                        SanMICR: row.cells[17].innerHTML,
                        DocNo: i,
                        FrontGray: row.cells[10].innerHTML,
                        BackGray: row.cells[11].innerHTML,
                    })
                }
                var y = "postctsdata";
                $.ajax({
                    type: 'POST',
                    url: x + y,
                    headers: authHeaders,
                    // url: "http://localhost:8198/api/Scanner/postctsdata",

                    crossDomain: true,
                    //data: JSON.stringify(SorterData),
                    data: { 'SorterData': SorterData, 'ChequeData': ChequeData },
                    //datatype: "json",
                    //contentType: 'application/json; charset=utf-8',
                    success: getSuccessReset,
                    error: getError
                });
                //--------------------------------------------------added------------------------------------------
            }
            else if (Submit == "vaultcash") {

                for (var i = 2, row; row = tableDenom.rows[i]; i++) {
                    if (row.cells[0].innerHTML.includes("COINS") == false) {
                        var dValue = row.cells[2].innerHTML;
                        var rowdata = [];
                        rowdata = dValue.split(" ");
                        var idVal = [];
                        idVal = rowdata[3].split("=\"");
                        var DenomDataToaddss = idVal[1].replace(/['"]+/g, '');
                        if (document.getElementById(DenomDataToaddss).value != "") {
                            dCount.push(parseInt(document.getElementById(DenomDataToaddss).value));
                            dArray.push(row.cells[0].innerHTML);
                        }
                    }
                    else {
                        var dValue = row.cells[2].innerHTML;
                        var rowdata = [];
                        rowdata = dValue.split(" ");
                        var idVal = [];
                        idVal = rowdata[3].split("=\"");
                        var DenomDataToaddss = idVal[1].replace(/['"]+/g, '');
                        if (document.getElementById(DenomDataToaddss).value != "") {
                            dCount.push(parseInt(document.getElementById(DenomDataToaddss).value));
                            dArray.push("COINS");
                        }
                    }
                }

                var transtype = "";
                if (typeOfTran == "SOD") {
                    transtype = "CASHDEP";


                    //// added by anandi

                     dArray = [];
                     dCount = [];


                     for (var i = 2, row; row = tableDenom.rows[i]; i++) {
                         if (row.cells[0].innerHTML.includes("COINS") == false) {
                             var dValue = row.cells[2].innerHTML;
                             var rowdata = [];
                             rowdata = dValue.split(" ");
                             var idVal = [];
                             idVal = rowdata[3].split("=\"");
                             var DenomDataToaddss = idVal[1].replace(/['"]+/g, '');
                             if (document.getElementById(DenomDataToaddss).value != "") {

                                 var dnamt = "";
                                 var Demon = document.getElementById("tblDenomination").getElementsByTagName('tr')[i].cells[5].innerHTML;
                                 var rowdata = [];
                                 rowdata = Demon.split(" ");
                                 var idVal = [];
                                 idVal = rowdata[3].split("=\"");
                                 var DenomDataToaddssMan = idVal[1].replace(/['"]+/g, '');

                                 if (document.getElementById(DenomDataToaddssMan).value != "") {
                                     dnamt = parseInt(document.getElementById(DenomDataToaddssMan).value);
                                     dCount.push(dnamt);
                                     dArray.push(row.cells[0].innerHTML);
                                 }



                             }
                             else {
                                 var dnamt = "";
                                 var Demon = document.getElementById("tblDenomination").getElementsByTagName('tr')[i].cells[5].innerHTML;
                                 var rowdata = [];
                                 rowdata = Demon.split(" ");
                                 var idVal = [];
                                 idVal = rowdata[3].split("=\"");
                                 var DenomDataToaddssMan = idVal[1].replace(/['"]+/g, '');
                                 if (document.getElementById(DenomDataToaddssMan).value != "") {
                                     dnamt = parseInt(document.getElementById(DenomDataToaddssMan).value);
                                     dCount.push(dnamt);
                                     dArray.push(row.cells[0].innerHTML);
                                 }
                             }
                         }
                         else {
                             var dValue = row.cells[2].innerHTML;
                             var rowdata = [];
                             rowdata = dValue.split(" ");
                             var idVal = [];
                             idVal = rowdata[3].split("=\"");
                             var DenomDataToaddss = idVal[1].replace(/['"]+/g, '');
                             if (document.getElementById(DenomDataToaddss).value != "") {
                                 dCount.push(parseInt(document.getElementById(DenomDataToaddss).value));
                                 dArray.push("COINS");
                             }
                         }
                     }

                     var count = 1;
                     var INR = 'INR';
                     var y = "ManualDataEntry";
                    //new
                    
                    //new

                     $.ajax({
                         url: x + y,
                         headers: authHeaders,
                         type: 'POST',
                         data: { Tellerid: gusername, Denoms: dArray, DenomCount: dCount, maip: machineserialno, count_id: sni_countid, local: INR },
                         success: getSuccessReset,
                         error: getError
                     });

                    ///

                }

                if (typeOfTran == "EOD") {
                    transtype = "CASHWDL";
                }

                BrCode = $("#brsolid").text().trim();
                // RegNo = "999999999999999";
                //PName = $("#FinName").text(); 23022022

                // acc = $("#telleraccno").text().trim();  //it was uncommented before
                acc = document.getElementById("MobileNo").value; // wrong
                //alert(acc);
               // alert(RegNo);
                //amt = document.getElementById("SlipAmount").value;
                //var toacc = document.getElementById("ToAccount").value;
                //var chqdate = document.getElementById("ChequeDateTxt").value;
                var ProcessType = "submit";
                var printrecipt = "No";
                var response = "2";
                
                var y = "PostData";
                flag = "Sub";
                ImageUrl = "C:\\SIM\\Data";
                
                $.ajax({
                    url: x + y,
                    headers: authHeaders,
                    type: 'POST',
                    data: { pType: ProcessType, maip: gusername, INtellerid: gusername, response: response, transtype: transtype, transRefNo: acc, BranchSolID: BrCode, imageUrl: ImageUrl, recipt: printrecipt },
                    success: getSuccessReset,
                    error: getError

                });


            }
        }

   //----------------New Code on 14 febuary 2022----------------------------------------------------

    
  //----------------END----------------------------------------------------

 //-------------------------------------added------------------------------------------
        

    }


    function ValidateData() {
        debugger;
        var previnstrumenttype = " ";
        var validationflag = 0;
        localIQA = 1;
        localIQATreatment = 1;

        var TypeTran = localStorage.getItem("typeOfTran");
        if (TypeTran == "CTS") {
            Submit = "cts";
        }

        
        if (TypeTran == "TC") {
            Submit = "ChequeVoucher";
        }

        if (TypeTran == "vaultcash") {
            ValidationPassed = true;
            return true;
        }


        //Anandi 2401

       
        if (Submit == "cts" || Submit == "ChequeVoucher") {

            var spamt = document.getElementById("SlipAmountForCheque").value;
            var spamt1 = document.getElementById("DenomAmountForCheque").value;
            if (document.getElementById("SlipAmountForCheque").value == "" || document.getElementById("DenomAmountForCheque").value == "" || document.getElementById("SlipAmountForCheque").value == "0" || document.getElementById("DenomAmountForCheque").value == "0") {
                alert("Slip Amount and Cheque Amount Should not be Blank!"); 
                return false;
            }
            else if (document.getElementById("SlipAmountForCheque").value != document.getElementById("DenomAmountForCheque").value) {
                alert("Slip Amount and Cheque Amount does not Matched..!$$$$");
            return false;
            }

            var spamt2 = document.getElementById("ToAccount").value;
            var spamt3 = document.getElementById("AccountNo").value;

            if ((document.getElementById("ToAccount").value == "" && document.getElementById("AccountNo").value == "") || (document.getElementById("ToAccount").value == " " && document.getElementById("AccountNo").value == ""))
            {
                alert("Debit and credit account cant be null");
                return false;
            }


            if ( document.getElementById("AccountNo").value == "" ) {

                alert("Debit Ac Cant be null");
                return false;

            }

            if (document.getElementById("ToAccount").value == "" || document.getElementById("ToAccount").value == " ") 
            {
                alert("Credit Ac Cant be null");
                return false;
            }
        

            if (document.getElementById("ToAccount").value == document.getElementById("AccountNo").value) {

                alert("Ac no should not same");
                return false;
                
            }

            else if (document.getElementById("ChequeDateTxt").value == "") {

                alert("ChequeDate should not null");
                return false;

            }

            else if ($("#FinName").text() == "Account does not exist" || $("#SlipFinName").text() == "Account does not exist" )  {
               
                if ($("#FinName").text() == "Account does not exist" )
                {
                    alert("Please eneter correct Debit Account Details..!");
                    document.getElementById("FinName").style.backgroundColor = "Yellow";
                    
                }
                else
                {
                    alert("Please eneter correct  Credit Account Details..!");
                    document.getElementById("SlipFinName").style.backgroundColor = "Yellow";
                }
                
                return false;
            }

            
          


            else {
                alert("Validation Passed");
                ValidationPassed = true;
                return true;
            }
        }

        else  {



            if (flag == "Cash" || flag == "With") {
                if (tableDenom.rows.length <= 3) {
                    $.ajax({
                        type: 'POST',
                        url: x + "getcashdetails",
                        headers: authHeaders,
                        crossDomain: true,
                        data: { 'Intellerid': gusername, 'cashinout': 'in' },
                        success: getSuccess,
                        error: getError

                    });
                }
                if (flag == "Cash" && (instruType == "" || instruType == "C")) {
                    if (confirm('Do you want to Continue Cash Deposite with Cheque?')) {
                        if ($("#FinName").text() == "Account does not exist") {
                            alert("Please eneter correct Account Details..!");
                            document.getElementById("FinName").style.backgroundColor = "Yellow";
                            return false;
                        }
                        else if (document.getElementById("SlipAmount").value == "" || document.getElementById("DenomAmount").value == "" || document.getElementById("SlipAmount").value == "0" || document.getElementById("DenomAmount").value == "0") {
                            alert("Transaction Amount and Denomination Amount Should not be Blank!");
                            return false;
                        }
                        else if (document.getElementById("SlipAmount").value != document.getElementById("DenomAmount").value) {
                            alert("Transaction Amount and Denomination Amount does not Matched..!");
                            return false;
                        }
                        else {
                            alert("Validation Passed");
                            ValidationPassed = true;
                            return true;
                        }
                    }
                }
                else if (flag == "With" && (instruType == "" || instruType == "S")) {
                    if (confirm('Do you want to Continue Cash Withdrawl with Slip?')) {
                        if ($("#FinName").text() == "Account does not exist") {
                            alert("Please eneter correct Account Details..!");
                            document.getElementById("FinName").style.backgroundColor = "Yellow";
                            return false;
                        }
                        else if (document.getElementById("SlipAmount").value == "" || document.getElementById("DenomAmount").value == "" || document.getElementById("SlipAmount").value == "0" || document.getElementById("DenomAmount").value == "0") {
                            alert("Transaction Amount and Denomination Amount Should not be Blank!");
                            return false;
                        }
                        else if (document.getElementById("SlipAmount").value != document.getElementById("DenomAmount").value) {
                            alert("Transaction Amount and Denomination Amount does not Matched..!");
                            return false;
                        }
                        else {
                            alert("Validation Passed");
                            ValidationPassed = true;
                            return true;
                        }
                    }
                    else {
                        alert("Please eneter correct Document..!");
                        return false;
                    }
                }
                else { ////  idhar aaa
                    if (document.getElementById("AccountNo").value == "")
                    {
                    alert("Account can not be null");
                    return false;
                    }
                    //else if ($("#FinName").text() == "Account does not exist") {
                    //    alert("Please eneter correct Account Details..!");
                    //document.getElementById("FinName").style.backgroundColor = "Yellow";
                    //return false;
                
                    //}
                    else if (document.getElementById("SlipAmount").value != document.getElementById("DenomAmount").value) {
                        alert("Transaction Amount and Denomination Amount does not Matched..!");
                        return false;
                    }
                    else {
                        alert("Validation Passed");
                        ValidationPassed = true;
                        return true;
                    }

                }

            }

            if (flag == "Cheque") {
                if (tableChequeData.rows.length == 0) {
                    alert("Nothing to Validate");
                    return false;
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
                    if (row.cells[6].innerHTML == "S") {

                        if (row.cells[7].childNodes[0].checked == true) {
                            row.cells[7].childNodes[0].checked = true;
                            InstrumentType = "C";
                            DocType = "B";
                        }
                        else {
                            row.cells[7].childNodes[2].checked = true;
                            if (intSlipNo == 0) {
                                intSlipNo = 1
                            }
                            else {
                                if (batchCntAfterDelete > 0) {
                                    intSlipNo = intSlipNo;
                                }
                                if (docNo == 1) {
                                    intSlipNo = 1
                                }
                                else {
                                    intSlipNo = intSlipNo + 1;
                                }

                            }
                            InstrumentType = "S";
                        }
                        row.cells[9].innerHTML = intSlipNo;
                    }
                    else {
                        InstrumentType = "C";
                        if (row.cells[7].childNodes[2].checked == true) {
                            InstrumentType = "S";
                            row.cells[7].childNodes[2].checked = true;
                            if (intSlipNo == 0) {
                                intSlipNo = 1
                            }
                            else {
                                if (batchCntAfterDelete > 0) {
                                    intSlipNo = intSlipNo;
                                }
                                else {
                                    intSlipNo = intSlipNo + 1;
                                }
                            }
                        }
                        else {
                            row.cells[7].childNodes[0].checked = true;
                        }
                        if (localIQA == 1) {
                            IgnoreIQAFlag = "N";
                            if (InstrumentType == "C") {
                                DocType = "B";
                                if (intSlipNo > 0) {
                                    row.cells[9].innerHTML = intSlipNo;
                                }
                                else {
                                    row.cells[9].innerHTML = 0;
                                }
                            }
                            else {
                                DocType = "";
                                row.cells[9].innerHTML = intSlipNo;
                            }
                        }
                    }

                    row.cells[6].innerHTML = InstrumentType;
                    row.cells[14].innerHTML = DocType;
                    row.cells[19].innerHTML = IQAFlag;

                    if (previnstrumenttype == " " && InstrumentType == "C") {
                        alert("Batch Cannot Start with a Cheque");
                        row.style.backgroundColor = "Yellow";
                        return false;
                    }
                    if (previnstrumenttype == "S" && InstrumentType == "S") {
                        alert("Validation Failed!!! 2 Slips in a SequenceDetected")
                        row.Selected = true;
                        row.style.backgroundColor = "Yellow";
                        return false;
                    }
                    previnstrumenttype = InstrumentType;
                }

                if (previnstrumenttype == "S") {
                    alert("Validation Failed!!! Last Item Cannot be a Slip");
                    row.style.backgroundColor = "Yellow";
                    return false;

                }
                if (document.getElementById("SlipAmountForCheque").value != document.getElementById("DenomAmountForCheque").value) {
                    alert("Validation Failed!!! Slip And Cheque Amount does not matched..!");
                    return false;


                }
                if (validationflag == 0) {
                    alert("Validation Passed");
                    ValidationPassed = true;
                    return true;
                }
            }

            if (flag == "vaultcash" || flag == "Currencychestcash") {
                if (tableDenom.rows.length >= 3) {
                    if (validationflag == 0) {
                        alert("Validation Passed");
                        ValidationPassed = true;
                        return true;
                    }
                }
            }
            if (flag == "") {
                alert("Please count cash before submit.");
                return false;
            }

        }
    }
}
catch (e) {
    alert(e.message);
}

