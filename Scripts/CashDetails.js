function getCashDetails(CashType) {
    debugger;

    var cashinout = "";
    var gusername = document.getElementById("loginid").value;

    if (CashType == "WithDraw") {
        cashinout = 'out';
    }
    else if (CashType == "Deposit") {
        if ($('#returncash').is(":checked")) {
            cashinout = 'out';
        }
        else {
            cashinout = 'in';
        }
    }
    else {
        alert("Alert! CashType is not defined!");
        return false;
    }


    //if (CashType == "Deposit" && resultPassed == "Voucher") {
    //    if ($('#returncash').is(":checked")) {
    //        cashinout = 'out';
    //    }
    //    else {
    //        cashinout = 'in';
    //    }
    //}
    //else if (CashType == "Deposit" && resultPassed == "Cash") {
    //    if ($('#returncash').is(":checked")) {
    //        cashinout = 'out';
    //    }
    //    else {
    //        cashinout = 'in';
    //    }
    //}

    debugger;

    
    

    var x = document.getElementById("urlVal").value;
    $.ajax({
        type: 'POST',
        url: x + "getcashdetails",
        headers: authHeaders,
        crossDomain: true,
        data: { 'Intellerid': gusername, 'cashinout': cashinout },
        success: getSuccess,
        error: getErrorNew

    });

}

function getErrorNew(result) {
    var msg = result.responseJSON.Message;
    alert(msg);
}


function getSuccess(result) {
    
    /*$("#ProcessingBar").hide();*/

    var TypeTran = document.getElementById("PageType").value;

    BrCode = result[0].SolID;

    debugger;
    sni_countid = result[0].id
    document.getElementById("sniId").value = sni_countid;
    
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

    /*$("#CashData").show();*/

    

    $.each(result, function (key, item) {
        i = i + 1;
        //var newImgStr = item.sn_imagepath.replace(PhysicalImageURL, WebImageURL);
        totcnt = item.totalcount;
        RjctCnt = item.reject_count;
        TotAmt = TotAmt + parseFloat(item.currncy_denom);
    });

    $("#tblDenomination").show();

    var tableDenom = document.getElementById("tblDenomination");

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
            element5.min = 0;
            element5.className = "tableClass";
            element5.style.width = "70px";
            element3.readOnly = true;
            
            cell5.appendChild(element5);
        }
        //else {
        //    var cell5 = row.insertCell(4);
        //    var element5 = document.createElement("label");
        //    element5.type = "number";
        //    element5.name = "denom5";
        //    element5.id = "denomId5_" + j;
        //    element5.min = 0;
        //    element5.className = "tableClass";
        //    element3.readOnly = true;
        //    cell5.appendChild(element5);
        //}

        //debugger;
        //var pageType = document.getElementById('TransMode').value;
        var pageType = TypeTran;
        for (k = 0; k < result.length; k++) {
            debugger;
            if (result[k].currncy_denom == DData[j]) {
                debugger;
                var dVal = result[k].cashinout;
                if (pageType == "WithDraw") {
                    if (result[k].cashinout == 'out') {
                        debugger;
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
                    else {
                        debugger;
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


    debugger;
    var inoutTotal = 0;
    inoutTotal = cashInAmt - cashOutAmt;
    if (TypeTran == "WithDraw")
        document.getElementById("DenomAmount").value = cashOutAmt;
    else
        document.getElementById("DenomAmount").value = inoutTotal;


    TotAmt = inoutTotal;

    //document.getElementById("DenomAmount").value = TotAmt;
    totalAmtToAdd = TotAmt;

    //  document.getElementById("btnSubmit").disabled = false;

    var sliptotamt = document.getElementById("amt").value;

    if (sliptotamt == TotAmt) {
        $('#DenomDeatils').append("<tr><td style='color:green' colspan=4>Requested Amount Matched with denom total</td></tr>");
        //document.getElementById("status").innerHTML = "Requested Amount Matched with denom total";
        //document.getElementById("status").style.color = "green";
    }

    else {
        $('#DenomDeatils').append("<tr><td style='color:red' colspan=4>Request Amount Not Matched with denom total</td></tr>");

    }

    
    //debugger;
    var TotalCountDenom = 0;
    
    var dCashIn = Denom2000 + Denom500 + Denom200 + Denom100 + Denom50 + Denom20 + Denom10 + Denom5 + Denom2 + Denom1;
    var dCashOut = Denom2000_out + Denom500_out + Denom200_out + Denom100_out + Denom50_out + Denom20_out + Denom10_out + Denom5_out + Denom2_out + Denom1_out;

    TotalCountDenom = TotalCountDenom + dCashIn + dCashOut;

    //document.getElementById("denomcount1").value = Denom2000 + Denom500 + Denom200 + Denom100 + Denom50 + Denom20 + Denom10;
    //document.getElementById("denomcount").value = Denom2000_out + Denom500_out + Denom200_out + Denom100_out + Denom50_out + Denom20_out + Denom10_out;
    document.getElementById("denomcount").value = TotalCountDenom;


    //------------------07032022------------------------------------

}



