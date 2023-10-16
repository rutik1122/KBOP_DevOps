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
    getSuccess
    function getSuccess(result) {
        //debugger;
        //-----------------------07032022----------------------------------

        var TypeTran = localStorage.getItem("typeOfTran");
        //if (TypeTran == "WithDraw") {

        //    var tb
        //        = document.getElementById("Entry");
        //    tb.style.display = "none";
        //    // $("#Entry th").remove();
        //}

        sni_countid = result[0].id

        $("#CashDetails tr").remove();
        $("#DenomDeatils tr").remove();
        var i = 0;
        var totcnt = 0;
        var RjctCnt = 0;
        var TotAmt = 0;
        var Denom1 = 0;
        var Denom1_out = 0;
        var Denom2 = 0;
        var Denom2_out = 0;
        var Denom5 = 0;
        var Denom5_out = 0;
        var Denom10 = 0;
        var Denom10_out = 0;
        var Denom10Amt = 0;
        var Denom20 = 0;
        var Denom20_out = 0;
        var Denom20Amt = 0;
        var Denom50 = 0;
        var Denom50_out = 0;
        var Denom50Amt = 0;
        var Denom100 = 0;
        var Denom100_out = 0;
        var Denom100Amt = 0;
        var Denom200 = 0;
        var Denom200_out = 0;
        var Denom200Amt = 0;
        var Denom500 = 0;
        var Denom500_out = 0;
        var Denom500Amt = 0;
        var Denom2000 = 0;
        var Denom2000_out = 0;
        var Denom2000Amt = 0;

        var cashinout = null;
        var cashInAmt = 0;
        var cashOutAmt = 0;

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
        var DData = ["2000", "500", "200", "100", "50", "20", "10", "5", "2", "1"];

        var DenomCnt = 0;

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

            var cell2 = row.insertCell(2);
            var element2 = document.createElement("label");
            element2.type = "text";
            element2.name = "denom";
            element2.id = "denomId_" + j;
            element2.className = "tableClass";
            element2.readOnly = true;
            cell2.appendChild(element2);

            var cell3 = row.insertCell(3);
            var element3 = document.createElement("label");
            element3.type = "text";
            element3.name = "denom2";
            element3.id = "denomId2_" + j;
            element3.className = "tableClass";
            element3.readOnly = true;
            cell3.appendChild(element3);

            //debugger;
            var dp = TypeTran;

            if (TypeTran != "EOD") {
                var cell5 = row.insertCell(4);
                var element5 = document.createElement("input");
                element5.type = "number";
                element5.name = "denom5";
                element5.id = "denomId5_" + j;
                element5.className = "tableClass";
                element3.readOnly = true;
                cell5.appendChild(element5);
            }
            else {
                var cell5 = row.insertCell(4);
                var element5 = document.createElement("label");
                element5.type = "number";
                element5.name = "denom5";
                element5.id = "denomId5_" + j;
                element5.className = "tableClass";
                element3.readOnly = true;
                cell5.appendChild(element5);
            }

            //debugger;
            var pageType = document.getElementById('TransMode').value;
            for (k = 0; k < result.length; k++) {
                //debugger;
                if (result[k].currncy_denom == DData[j]) {
                    //debugger;
                    var dVal = result[k].cashinout;
                    if (pageType == "SOD") {
                        if (result[k].currncy_denom == "2000") {
                            Denom2000 += 1;
                            element2.innerHTML = Denom2000;
                            cell2.appendChild(element2);
                            cashInAmt = cashInAmt + 2000;
                        }
                        else if (result[k].currncy_denom == "500") {
                            Denom500 += 1;
                            element2.innerHTML = Denom500;
                            cell2.appendChild(element2);
                            cashInAmt = cashInAmt + 500;
                        }
                        else if (result[k].currncy_denom == "200") {
                            Denom200 += 1;
                            element2.innerHTML = Denom200;
                            cell2.appendChild(element2);
                            cashInAmt = cashInAmt + 200;
                        }
                        else if (result[k].currncy_denom == "100") {
                            Denom100 += 1;
                            element2.innerHTML = Denom100;
                            cell2.appendChild(element2);
                            cashInAmt = cashInAmt + 100;
                        }
                        else if (result[k].currncy_denom == "50") {
                            Denom50 += 1;
                            element2.innerHTML = Denom50;
                            cell2.appendChild(element2);
                            cashInAmt = cashInAmt + 50;
                        }
                        else if (result[k].currncy_denom == "20") {
                            Denom20 += 1;
                            element2.innerHTML = Denom20;
                            cell2.appendChild(element2);
                            cashInAmt = cashInAmt + 20;
                        }
                        else if (result[k].currncy_denom == "10") {
                            Denom10 += 1;
                            element2.innerHTML = Denom10;
                            cell2.appendChild(element2);
                            cashInAmt = cashInAmt + 10;
                        }
                        else if (result[k].currncy_denom == "5") {
                            Denom5 += 1;
                            element2.innerHTML = Denom5;
                            cell2.appendChild(element2);
                            cashInAmt = cashInAmt + 5;
                        }
                        else if (result[k].currncy_denom == "2") {
                            Denom2 += 1;
                            element2.innerHTML = Denom2;
                            cell2.appendChild(element2);
                            cashInAmt = cashInAmt + 2;
                        }
                        else if (result[k].currncy_denom == "1") {
                            Denom1 += 1;
                            element2.innerHTML = Denom1;
                            cell2.appendChild(element2);
                            cashInAmt = cashInAmt + 1;
                        }
                        else {
                            element2.innerHTML = "";
                            cell2.appendChild(element2);
                        }
                    }
                    else if (pageType == "EOD") {
                        if (result[k].currncy_denom == "2000") {
                            Denom2000_out += 1;
                            element3.innerHTML = Denom2000_out;
                            cell3.appendChild(element3);
                            cashInAmt = cashInAmt + 2000;
                        }
                        else if (result[k].currncy_denom == "500") {
                            Denom500_out += 1;
                            element3.innerHTML = Denom500_out;
                            cell3.appendChild(element3);
                            cashInAmt = cashInAmt + 500;
                        }
                        else if (result[k].currncy_denom == "200") {
                            Denom200_out += 1;
                            element3.innerHTML = Denom200_out;
                            cell3.appendChild(element3);
                            cashInAmt = cashInAmt + 200;
                        }
                        else if (result[k].currncy_denom == "100") {
                            Denom100_out += 1;
                            element3.innerHTML = Denom100_out;
                            cell3.appendChild(element3);
                            cashInAmt = cashInAmt + 100;
                        }
                        else if (result[k].currncy_denom == "50") {
                            Denom50_out += 1;
                            element3.innerHTML = Denom50_out;
                            cell3.appendChild(element3);
                            cashInAmt = cashInAmt + 50;
                        }
                        else if (result[k].currncy_denom == "20") {
                            Denom20_out += 1;
                            element3.innerHTML = Denom20_out;
                            cell3.appendChild(element3);
                            cashInAmt = cashInAmt + 20;
                        }
                        else if (result[k].currncy_denom == "10") {
                            Denom10_out += 1;
                            element3.innerHTML = Denom10_out;
                            cell3.appendChild(element3);
                            cashInAmt = cashInAmt + 10;
                        }
                        else if (result[k].currncy_denom == "5") {
                            Denom5_out += 1;
                            element3.innerHTML = Denom5_out;
                            cell3.appendChild(element3);
                            cashInAmt = cashInAmt + 5;
                        }
                        else if (result[k].currncy_denom == "2") {
                            Denom2_out += 1;
                            element3.innerHTML = Denom2_out;
                            cell3.appendChild(element3);
                            cashInAmt = cashInAmt + 2;
                        }
                        else if (result[k].currncy_denom == "1") {
                            Denom1_out += 1;
                            element3.innerHTML = Denom1_out;
                            cell3.appendChild(element3);
                            cashInAmt = cashInAmt + 1;
                        }
                        else {
                            element3.innerHTML = "";
                            cell3.appendChild(element3);
                        }
                    }
                    else if (pageType == "WithDraw") {
                        if (result[k].cashinout == 'out') {
                            if (result[k].currncy_denom == "2000") {
                                Denom2000_out += 1;
                                element3.innerHTML = Denom2000_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 2000;
                            }
                            else if (result[k].currncy_denom == "500") {
                                Denom500_out += 1;
                                element3.innerHTML = Denom500_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 500;
                            }
                            else if (result[k].currncy_denom == "200") {
                                Denom200_out += 1;
                                element3.innerHTML = Denom200_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 200;
                            }
                            else if (result[k].currncy_denom == "100") {
                                Denom100_out += 1;
                                element3.innerHTML = Denom100_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 100;
                            }
                            else if (result[k].currncy_denom == "50") {
                                Denom50_out += 1;
                                element3.innerHTML = Denom50_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 50;
                            }
                            else if (result[k].currncy_denom == "20") {
                                Denom20_out += 1;
                                element3.innerHTML = Denom20_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 20;
                            }
                            else if (result[k].currncy_denom == "10") {
                                Denom10_out += 1;
                                element3.innerHTML = Denom10_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 10;
                            }
                            else if (result[k].currncy_denom == "5") {
                                Denom5_out += 1;
                                element3.innerHTML = Denom5_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 5;
                            }
                            else if (result[k].currncy_denom == "2") {
                                Denom2_out += 1;
                                element3.innerHTML = Denom2_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 2;
                            }
                            else if (result[k].currncy_denom == "1") {
                                Denom1_out += 1;
                                element3.innerHTML = Denom1_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 1;
                            }
                            else {
                                element3.innerHTML = "";
                                cell3.appendChild(element3);
                            }
                        }
                    }
                    else {
                        if (result[k].cashinout == 'in') {
                            //debugger;
                            if (result[k].currncy_denom == "2000") {
                                Denom2000 += 1;
                                element2.innerHTML = Denom2000;
                                cell2.appendChild(element2);
                                cashInAmt = cashInAmt + 2000;
                            }
                            else if (result[k].currncy_denom == "500") {
                                Denom500 += 1;
                                element2.innerHTML = Denom500;
                                cell2.appendChild(element2);
                                cashInAmt = cashInAmt + 500;
                            }
                            else if (result[k].currncy_denom == "200") {
                                Denom200 += 1;
                                element2.innerHTML = Denom200;
                                cell2.appendChild(element2);
                                cashInAmt = cashInAmt + 200;
                            }
                            else if (result[k].currncy_denom == "100") {
                                Denom100 += 1;
                                element2.innerHTML = Denom100;
                                cell2.appendChild(element2);
                                cashInAmt = cashInAmt + 100;
                            }
                            else if (result[k].currncy_denom == "50") {
                                Denom50 += 1;
                                element2.innerHTML = Denom50;
                                cell2.appendChild(element2);
                                cashInAmt = cashInAmt + 50;
                            }
                            else if (result[k].currncy_denom == "20") {
                                Denom20 += 1;
                                element2.innerHTML = Denom20;
                                cell2.appendChild(element2);
                                cashInAmt = cashInAmt + 20;
                            }
                            else if (result[k].currncy_denom == "10") {
                                Denom10 += 1;
                                element2.innerHTML = Denom10;
                                cell2.appendChild(element2);
                                cashInAmt = cashInAmt + 10;
                            }
                            else if (result[k].currncy_denom == "5") {
                                Denom5 += 1;
                                element2.innerHTML = Denom5;
                                cell2.appendChild(element2);
                                cashInAmt = cashInAmt + 5;
                            }
                            else if (result[k].currncy_denom == "2") {
                                Denom2 += 1;
                                element2.innerHTML = Denom2;
                                cell2.appendChild(element2);
                                cashInAmt = cashInAmt + 2;
                            }
                            else if (result[k].currncy_denom == "1") {
                                Denom1 += 1;
                                element2.innerHTML = Denom1;
                                cell2.appendChild(element2);
                                cashInAmt = cashInAmt + 1;
                            }
                            else {
                                element2.innerHTML = "";
                                cell2.appendChild(element2);
                            }

                            //if (TypeTran != "WithDraw") {
                            //    var cell5 = row.insertCell(4);
                            //    var element5 = document.createElement("input");
                            //    element5.type = "text";
                            //    element5.name = "denom5";
                            //    element5.id = "denomId5_" + j;
                            //    element5.className = "tableClass";
                            //    element3.readOnly = true;
                            //    cell5.appendChild(element5);
                            //}
                        }
                        else if (result[k].cashinout == 'out') {
                            if (result[k].currncy_denom == "2000") {
                                Denom2000_out += 1;
                                element3.innerHTML = Denom2000_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 2000;
                            }
                            else if (result[k].currncy_denom == "500") {
                                Denom500_out += 1;
                                element3.innerHTML = Denom500_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 500;
                            }
                            else if (result[k].currncy_denom == "200") {
                                Denom200_out += 1;
                                element3.innerHTML = Denom200_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 200;
                            }
                            else if (result[k].currncy_denom == "100") {
                                Denom100_out += 1;
                                element3.innerHTML = Denom100_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 100;
                            }
                            else if (result[k].currncy_denom == "50") {
                                Denom50_out += 1;
                                element3.innerHTML = Denom50_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 50;
                            }
                            else if (result[k].currncy_denom == "20") {
                                Denom20_out += 1;
                                element3.innerHTML = Denom20_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 20;
                            }
                            else if (result[k].currncy_denom == "10") {
                                Denom10_out += 1;
                                element3.innerHTML = Denom10_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 10;
                            }
                            else if (result[k].currncy_denom == "5") {
                                Denom5_out += 1;
                                element3.innerHTML = Denom5_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 5;
                            }
                            else if (result[k].currncy_denom == "2") {
                                Denom2_out += 1;
                                element3.innerHTML = Denom2_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 2;
                            }
                            else if (result[k].currncy_denom == "1") {
                                Denom1_out += 1;
                                element3.innerHTML = Denom1_out;
                                cell3.appendChild(element3);
                                cashOutAmt = cashOutAmt + 1;
                            }
                            else {
                                element3.innerHTML = "";
                                cell3.appendChild(element3);
                            }
                        }
                    }


                    //if (TypeTran != "WithDraw") {
                    //    var cell5 = row.insertCell(4);
                    //    var element5 = document.createElement("input");
                    //    element5.type = "text";
                    //    element5.name = "denom5";
                    //    element5.id = "denomId5_" + j;
                    //    element5.className = "tableClass";
                    //    element3.readOnly = true;
                    //    cell5.appendChild(element5);
                    //}
                }
            }
            //debugger;
            //var pageType = document.getElementById('TransMode').value;
            var cell4 = row.insertCell(4);
            var element4 = document.createElement('label');
            for (i = 0; i < result.length; i++) {
                if (result[i].currncy_denom == DData[j]) {
                    //element4.innerText = result[i].currncy_denom;
                    //debugger;
                    //------- Aniket 500
                    var denomination = result[i].currncy_denom;
                    var dtotal = 0;
                    if (pageType == "Deposit") {
                        if (denomination == "2000")
                            dtotal = 2000 * (Denom2000 - Denom2000_out);
                        else if (denomination == "500")
                            dtotal = 500 * (Denom500 - Denom500_out);
                        else if (denomination == "200")
                            dtotal = 200 * (Denom200 - Denom200_out);
                        else if (denomination == "100")
                            dtotal = 100 * (Denom100 - Denom100_out);
                        else if (denomination == "50")
                            dtotal = 50 * (Denom50 - Denom50_out);
                        else if (denomination == "20")
                            dtotal = 20 * (Denom20 - Denom20_out);
                        else if (denomination == "10")
                            dtotal = 10 * (Denom10 - Denom10_out);
                        else if (denomination == "5")
                            dtotal = 5 * (Denom5 - Denom5_out);
                        else if (denomination == "2")
                            dtotal = 2 * (Denom2 - Denom2_out);
                        else if (denomination == "1")
                            dtotal = 1 * (Denom1 - Denom1_out);

                        element4.innerText = dtotal;
                    }
                    else if (pageType == "SOD") {
                        if (denomination == "2000")
                            dtotal = 2000 * Denom2000;
                        else if (denomination == "500")
                            dtotal = 500 * Denom500;
                        else if (denomination == "200")
                            dtotal = 200 * Denom200;
                        else if (denomination == "100")
                            dtotal = 100 * Denom100;
                        else if (denomination == "50")
                            dtotal = 50 * Denom50;
                        else if (denomination == "20")
                            dtotal = 20 * Denom20;
                        else if (denomination == "10")
                            dtotal = 10 * Denom10;
                        else if (denomination == "5")
                            dtotal = 5 * Denom5;
                        else if (denomination == "2")
                            dtotal = 2 * Denom2;
                        else if (denomination == "1")
                            dtotal = 1 * Denom1;

                        //debugger;
                        element4.innerText = dtotal;
                    }
                    else {
                        if (denomination == "2000")
                            dtotal = 2000 * Denom2000_out;
                        else if (denomination == "500")
                            dtotal = 500 * Denom500_out;
                        else if (denomination == "200")
                            dtotal = 200 * Denom200_out;
                        else if (denomination == "100")
                            dtotal = 100 * Denom100_out;
                        else if (denomination == "50")
                            dtotal = 50 * Denom50_out;
                        else if (denomination == "20")
                            dtotal = 20 * Denom20_out;
                        else if (denomination == "10")
                            dtotal = 10 * Denom10_out;
                        else if (denomination == "5")
                            dtotal = 5 * Denom5_out;
                        else if (denomination == "2")
                            dtotal = 2 * Denom2_out;
                        else if (denomination == "1")
                            dtotal = 1 * Denom1_out;

                        element4.innerText = dtotal;
                    }

                    break;
                }
                else {
                    element4.innerText = "0";
                }
            }
            //debugger;
            cell4.appendChild(element4);

            row.className = "rowalign";
            document.getElementById("tblDenomination").appendChild(row);
        }
        //debugger;


        //---------------- Added on 2022-03-19 ------- By Aniketadit Jamuar
        var row2 = document.createElement('tr');
        var cell_C = document.createElement('td');
        cell_C.innerHTML = "Total Count";
        row2.appendChild(cell_C);
        var cell1_C = row2.insertCell(1);
        var element1_C = document.createElement('label');
        element1_C.innerText = "X";
        element1_C.className = "tableClass";
        cell1_C.appendChild(element1_C);
        //debugger;
        var cell2_C = row2.insertCell(2);
        var element2_C = document.createElement("label");
        element2_C.type = "text";
        element2_C.name = "denom_C";
        element2_C.id = "denomId_C";
        element2_C.className = "tableClass";
        cell2_C.appendChild(element2_C);
        //debugger;
        var cell3_C = row2.insertCell(3);
        var element3_C = document.createElement("label");
        element3_C.type = "text";
        element3_C.name = "denom2_C";
        element3_C.id = "denomId2_C";
        element3_C.className = "tableClass";
        cell3_C.appendChild(element3_C);
        //debugger;
        var cell4_C = row2.insertCell(4);
        var element4_C = document.createElement('label');
        element4_C.innerText = "0";
        cell4_C.appendChild(element4_C);
        //if (TypeTran != "WithDraw")  //08032022
        //{
            //debugger;
            var cell5 = row2.insertCell(5);
            var element5 = document.createElement("label");
            element5.type = "number";
            element5.name = "denom5_C";
            element5.id = "denomId5_C";
            element5.className = "tableClass";
            cell5.appendChild(element5);

        //}
        row2.className = "rowalign";

        document.getElementById("tblDenomination").appendChild(row2);
        //debugger;
        document.getElementById("denomId_C").innerText = Denom2000 + Denom500 + Denom200 + Denom100 + Denom50 + Denom20 + Denom10 + Denom5 + Denom2 + Denom1;
        document.getElementById("denomId2_C").innerText = Denom2000_out + Denom500_out + Denom200_out + Denom100_out + Denom50_out + Denom20_out + Denom10_out + Denom5_out + Denom2_out + Denom1_out;


        //debugger;
        var inoutTotal = 0;
        inoutTotal = cashInAmt - cashOutAmt;
        if (pageType == "WithDraw")
            document.getElementById("DenomAmount").value = cashOutAmt;
        else
            document.getElementById("DenomAmount").value = inoutTotal;


        TotAmt = inoutTotal;

        //document.getElementById("DenomAmount").value = TotAmt;
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
        //            //debugger;
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
        //added by anandi-----------------07032022------------------
        //debugger;
        var TotalCountDenom = 0;
        //for (var i = 2; i < tblDenomination.rows.length; i++) {

        //    //debugger;
        //    var Ddnamt = "";
        //    var DDemon = document.getElementById("tblDenomination").getElementsByTagName('tr')[i].cells[3].innerHTML;
        //    var Drowdata = [];
        //    Drowdata = DDemon.split(" ");
        //    var DidVal = [];
        //    DidVal = Drowdata[3].split("=\"");
        //    var DDenomDataToaddss = DidVal[1].replace(/['"]+/g, '');

        //    if (document.getElementById(DDenomDataToaddss).value != "") {
        //        Ddnamt = parseInt(document.getElementById(DDenomDataToaddss).value);
        //    }
        //    else {
        //        Ddnamt = 0;
        //    }

        //    var Ddnamt2 = "";
        //    var DDemon2 = document.getElementById("tblDenomination").getElementsByTagName('tr')[i].cells[2].innerHTML;
        //    var Drowdata2 = [];
        //    Drowdata2 = DDemon2.split(" ");
        //    var DidVal2 = [];
        //    DidVal2 = Drowdata2[3].split("=\"");
        //    var DDenomDataToaddss2 = DidVal2[1].replace(/['"]+/g, '');

        //    if (document.getElementById(DDenomDataToaddss2).value != "") {
        //        Ddnamt2 = parseInt(document.getElementById(DDenomDataToaddss2).value);
        //    }
        //    else {
        //        Ddnamt2 = 0;
        //    }

        //    //var dCashIn = Denom2000 + Denom500 + Denom200 + Denom100 + Denom50 + Denom20 + Denom10;
        //    //var dCashOut = Denom2000_out + Denom500_out + Denom200_out + Denom100_out + Denom50_out + Denom20_out + Denom10_out;

        //    //TotalCountDenom = TotalCountDenom + dCashIn + dCashOut;
        //    //TotalCountDenom = TotalCountDenom + (Ddnamt2 / 2) + (Ddnamt / 2);
        //}
        var dCashIn = Denom2000 + Denom500 + Denom200 + Denom100 + Denom50 + Denom20 + Denom10 + Denom5 + Denom2 + Denom1;
        var dCashOut = Denom2000_out + Denom500_out + Denom200_out + Denom100_out + Denom50_out + Denom20_out + Denom10_out + Denom5_out + Denom2_out + Denom1_out;

        TotalCountDenom = TotalCountDenom + dCashIn + dCashOut;

        //document.getElementById("denomcount1").value = Denom2000 + Denom500 + Denom200 + Denom100 + Denom50 + Denom20 + Denom10;
        //document.getElementById("denomcount").value = Denom2000_out + Denom500_out + Denom200_out + Denom100_out + Denom50_out + Denom20_out + Denom10_out;
        document.getElementById("denomcount").value = TotalCountDenom;


        //------------------07032022------------------------------------

    }

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
        //debugger;
        if (flag == "Cash") {
            $("#VoucherDetails tr").remove();
            if (result[0].instrumenttype == null || result[0].instrumenttype == undefined || result[0].instrumenttype == "C") {
                //alert("Please Enter Correct Document.");
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
                data: { 'Intellerid': gusername, 'cashinout': 'out' },
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


        document.getElementById("SlipAmountForCheque").value = TotSlpAmt;
        document.getElementById("DenomAmountForCheque").value = TotChqAmt;
    }

    /* on serch click */
    function GetPayeee(Acc, Type) {
        //debugger;
        if (GlobalRowNo != " ") {
            if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[6].innerHTML == "S") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("ToAccount").value;
            }
            else {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("AccountNo").value;
            }
        }
        //debugger;
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
        debugger;
        var credentials = {
            username: "101203",
            password: "101203"

            //username: "meraj",
            //password: "101203"
        };
        //alert(tokenurl);
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
        //debugger;
        //ValidateData();    by meraj sir              
        //if (ValidationPassed == false) { by meraj sir 
        ValidateData();
        //debugger;

        var pageType2 = document.getElementById('TransMode').value;

        if (ValidationPassed == true) {
            //debugger;
            //if (pageType2 == "Deposit") {
            //    Data_ManualDataEntry();
            //}
            //debugger;
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
            //debugger;
            if (Submit == "DepositVoucher" || Submit == "WithVoucher" || Submit == "ChequeVoucher") {

                if (Submit == "DepositVoucher") {

                    for (var i = 2, row; row = tableDenom.rows[i]; i++) {
                        //debugger;
                        //if (row.cells[0].innerHTML.includes("COINS") == false) {

                        //------------------- Added on 2022-03-21 --------------- By Aniketadit Jamuar ------------ Begin
                        var j = i - 2;
                        var newId = j.toString();
                        var inId = 'denomId_' + newId;
                        if (j < 10) {
                            var inVal = document.getElementById(inId).textContent;
                            if (inVal != "") {
                                dCount.push(parseInt(inVal));
                                dArray.push(row.cells[0].innerHTML);
                            }
                        }
                        //------------------- Added on 2022-03-21 --------------- By Aniketadit Jamuar ------------ End

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
                        data: { pType: ProcessType, maip: gusername, INtellerid: gusername, response: response, transtype: transtype, transRefNo: RegNo, BranchSolID: BrCode, imageUrl: ImageUrl, SlipAmount: amt, ChqAmount: amt, PayeeName: PName, CreditAccountNo: acc },
                        success: getSuccessReset,
                        error: getError

                    });
                }
                if (Submit == "ChequeVoucher") {
                    //debugger;
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
            else if (Submit == "cts") {

                //-------------------------------------added------------------------------------------
                //debugger;

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

                var transtype = "";
                if (typeOfTran == "SOD") {
                    transtype = "CASHDEP";

                    dArray = [];
                    dCount = [];

                    //----------- Added on 2022-03-22 -------- By Aniketadit Jamuar ---------- Begin
                    for (var inv = 0; inv < 10; inv++) {
                        var cellId5 = "denomId5_" + inv.toString();
                        var cellVal5 = document.getElementById(cellId5).value;
                        if (cellVal5 != "" && cellVal5 != "0") {
                            if (cellId5 == "denomId5_0")
                                dArray.push("2000");
                            if (cellId5 == "denomId5_1")
                                dArray.push("500");
                            if (cellId5 == "denomId5_2")
                                dArray.push("200");
                            if (cellId5 == "denomId5_3")
                                dArray.push("100");
                            if (cellId5 == "denomId5_4")
                                dArray.push("50");
                            if (cellId5 == "denomId5_5")
                                dArray.push("20");
                            if (cellId5 == "denomId5_6")
                                dArray.push("10");
                            if (cellId5 == "denomId5_7")
                                dArray.push("5");
                            if (cellId5 == "denomId5_8")
                                dArray.push("2");
                            if (cellId5 == "denomId5_9")
                                dArray.push("1");

                            dCount.push(parseInt(cellVal5));
                        }
                    }
                    //----------- Added on 2022-03-22 -------- By Aniketadit Jamuar ---------- End

                    //for (var i = 2, row; row = tableDenom.rows[i]; i++) {
                    //    if (row.cells[0].innerHTML.includes("COINS") == false) {
                    //        var dValue = row.cells[2].innerHTML;
                    //        var rowdata = [];
                    //        rowdata = dValue.split(" ");
                    //        var idVal = [];
                    //        idVal = rowdata[3].split("=\"");
                    //        var DenomDataToaddss = idVal[1].replace(/['"]+/g, '');
                    //        if (document.getElementById(DenomDataToaddss).value != "") {

                    //            var dnamt = "";
                    //            var Demon = document.getElementById("tblDenomination").getElementsByTagName('tr')[i].cells[5].innerHTML;
                    //            var rowdata = [];
                    //            rowdata = Demon.split(" ");
                    //            var idVal = [];
                    //            idVal = rowdata[3].split("=\"");
                    //            var DenomDataToaddssMan = idVal[1].replace(/['"]+/g, '');

                    //            if (document.getElementById(DenomDataToaddssMan).value != "") {
                    //                dnamt = parseInt(document.getElementById(DenomDataToaddssMan).value);
                    //                dCount.push(dnamt);
                    //                dArray.push(row.cells[0].innerHTML);
                    //            }
                    //        }
                    //        else {
                    //            var dnamt = "";
                    //            var Demon = document.getElementById("tblDenomination").getElementsByTagName('tr')[i].cells[5].innerHTML;
                    //            var rowdata = [];
                    //            rowdata = Demon.split(" ");
                    //            var idVal = [];
                    //            idVal = rowdata[3].split("=\"");
                    //            var DenomDataToaddssMan = idVal[1].replace(/['"]+/g, '');
                    //            if (document.getElementById(DenomDataToaddssMan).value != "") {
                    //                dnamt = parseInt(document.getElementById(DenomDataToaddssMan).value);
                    //                dCount.push(dnamt);
                    //                dArray.push(row.cells[0].innerHTML);
                    //            }
                    //        }
                    //    }
                    //    else {
                    //        var dValue = row.cells[2].innerHTML;
                    //        var rowdata = [];
                    //        rowdata = dValue.split(" ");
                    //        var idVal = [];
                    //        idVal = rowdata[3].split("=\"");
                    //        var DenomDataToaddss = idVal[1].replace(/['"]+/g, '');
                    //        if (document.getElementById(DenomDataToaddss).value != "") {
                    //            dCount.push(parseInt(document.getElementById(DenomDataToaddss).value));
                    //            dArray.push("COINS");
                    //        }
                    //    }
                    //}

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

                acc = document.getElementById("MobileNo").value; // wrong
                
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
        //debugger;
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

            if ((document.getElementById("ToAccount").value == "" && document.getElementById("AccountNo").value == "") || (document.getElementById("ToAccount").value == " " && document.getElementById("AccountNo").value == "")) {
                alert("Debit and credit account cant be null");
                return false;
            }


            if (document.getElementById("AccountNo").value == "") {

                alert("Debit Ac Cant be null");
                //document.getElementById("AccountNo").autofocus = true;

                return false;

            }

            if (document.getElementById("ToAccount").value == "" || document.getElementById("ToAccount").value == " ") {
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

            else if ($("#FinName").text() == "Account does not exist" || $("#SlipFinName").text() == "Account does not exist") {

                if ($("#FinName").text() == "Account does not exist") {
                    alert("Please eneter correct Debit Account Details..!");
                    document.getElementById("FinName").style.backgroundColor = "Yellow";

                }
                else {
                    alert("Please eneter correct  Credit Account Details..!");
                    document.getElementById("SlipFinName").style.backgroundColor = "Yellow";
                }

                return false;
            }





            else {
                //alert("Validation Passed");
                ValidationPassed = true;
                return true;
            }
        }

        else {


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
                        
                        //debugger;
                        var pg = document.getElementById("TransMode").value;
                        if ((document.getElementById("AccountNo").value == "" || document.getElementById("AccountNo").value == null) && pg != "Deposit") {
                            alert("Please enter account Number!!");
                            document.getElementById("AccountNo").focus();
                            return false;
                        }
                        else if (document.getElementById("SlipAmount").value == "" || document.getElementById("DenomAmount").value == "" || document.getElementById("SlipAmount").value == "0" || document.getElementById("DenomAmount").value == "0") {
                            alert("Transaction Amount and Denomination Amount Should not be Blank!");
                            document.getElementById("SlipAmount").focus();
                            return false;
                        }
                        else if (document.getElementById("SlipAmount").value != document.getElementById("DenomAmount").value) {
                            alert("Transaction Amount and Denomination Amount does not Matched..!");
                            document.getElementById("SlipAmount").focus();
                            return false;
                        }
                        else {
                            //alert("Validation Passed");
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
                            //alert("Validation Passed");
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
                    if (document.getElementById("AccountNo").value == "") {
                        alert("Account Number can not be null");
                        document.getElementById("AccountNo").focus();
                        return false;
                    }
                    //else if ($("#FinName").text() == "Account does not exist") {
                    //    alert("Please eneter correct Account Details..!");
                    //document.getElementById("FinName").style.backgroundColor = "Yellow";
                    //return false;

                    //}
                    else if (document.getElementById("SlipAmount").value != document.getElementById("DenomAmount").value) {
                        alert("Transaction Amount and Denomination Amount does not Matched..!");
                        document.getElementById("SlipAmount").focus();
                        return false;
                    }
                    else {
                        //alert("Validation Passed");
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
                    //alert("Validation Passed");
                    ValidationPassed = true;
                    return true;
                }
            }

            if (flag == "vaultcash" || flag == "Currencychestcash") {
                if (tableDenom.rows.length >= 3) {
                    if (validationflag == 0) {
                        //alert("Validation Passed");
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

