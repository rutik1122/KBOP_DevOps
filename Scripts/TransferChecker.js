function getError(result) {
    //debugger;

    //alert("This is error alert!");

    $("#ProcessingBar").hide();

    alert(result.responseText);
}

function getSuccessVoucher(result) {
    //debugger;

    /*alert("Alert! getSuccessVoucher function!");*/

    document.getElementById("scanning_type").value = "2";

    var i = 0;
    var TotChqAmt = 0;
    var TotSlpAmt = 0;

    $("#cheque_Data").hide();

    var verf = document.getElementById("verfLevel").value;

    if (verf == "L2")
        $("#btnSubmit_l3").hide();
    else if (verf == "L3")
        $("#btnSubmit").hide();

    $.each(result, function (key, item) {

        //debugger;

        var newImgStr = item.frontImg;
        ImageUrl = item.frontImg;

        /*$('#VoucherDetails').append("<tr><td>" + item.accno + "</td>" + "<td style='display:none;'>" + item.payeename + "</td>" + "<td>" + item.totalamount + "</td>" + "<td style='display:none;'>" + item.cheqno + "</td>" + "<td style='display:none;'>" + item.sortcode + "</td>" + "<td style='display:none;'>" + item.san + "</td>" + "<td style='display:none;'>" + item.trcode + "</td>" + "<td>" + item.amount + "</td>" + "<td>" + item.chqdate + "</td> " + "<td>" + item.micr + "</td>" + "<td>" + item.ocr + "</td>" + "<td>" + item.instrumenttype + "</td>" + "<td style='display:none;'>" + item.iqatest + "</td>" + "<td style='display:none;'><input type='checkbox' id='chkmarkp2f' name='chkmarkp2f'></td>" + "<td><input type='checkbox' id='chkmarkchq' name='chkmarkchq'></td>" + "<td><input type='checkbox' id='chkmarkslip' name='chkmarkslip'></td><td><img height='50' width='70' id=" + item.id + "  src=" + newImgStr + "  /></td><td><label><input type='radio' id='frontGimg' name='optradio' onclick=switchimage('frontGimg','" + item.id + "')>Front</label></td><td><label><input type='radio' id='backGimg' name='optradio' onclick=switchimage('backGimg','" + item.id + "')>Back</label></td><td><label><input type='radio' id='frontIRimg' name='optradio' onclick=switchimage('frontIRimg','" + item.id + "')>IR</label></td></tr>");*/

        document.getElementById("FG").src = newImgStr;
        document.getElementById("FG").style.display = "";
        //totslpcnt = item.slipcount;

        if (item.SlipAmount != "" && item.SlipAmount != null)
            TotSlpAmt = TotSlpAmt + parseFloat(item.SlipAmount);

        if (item.ChqAmount != "" && item.ChqAmount != null)
            TotChqAmt = TotChqAmt + parseFloat(item.ChqAmount);

        document.getElementById("SlipAmountForCheque").innerHTML = TotSlpAmt;
        
        document.getElementById("DenomAmountForCheque").innerHTML = TotChqAmt;
        
        if (result[i].InstrumentType == "S") {
            //$('#VoucherDetails').append("<tr><td>" + item.CreditAccountNo + "</td>" + "<td style='display:none;'>" + item.payeename + "</td>" + "<td>" + item.totalamount + "</td>" + "<td style='display:none;'>" + item.cheqno + "</td>" + "<td style='display:none;'>" + item.sortcode + "</td>" + "<td style='display:none;'>" + item.san + "</td>" + "<td style='display:none;'>" + item.trcode + "</td>" + "<td>" + item.amount + "</td>" + "<td>" + item.chqdate + "</td> " + "<td>" + item.micr + "</td>" + "<td>" + item.ocr + "</td>" + "<td>" + item.instrumenttype + "</td>" + "<td style='display:none;'>" + item.iqatest + "</td>" + "<td style='display:none;'><input type='checkbox' id='chkmarkp2f' name='chkmarkp2f'></td>" + "<td><input type='checkbox' id='chkmarkchq' name='chkmarkchq'></td>" + "<td><input type='checkbox' id='chkmarkslip' name='chkmarkslip'></td><td><img height='50' width='70' id=" + item.id + "  src=" + newImgStr + "  /></td><td><label><input type='radio' id='frontGimg' name='optradio' onclick=switchimage('frontGimg','" + item.id + "')>Front</label></td><td><label><input type='radio' id='backGimg' name='optradio' onclick=switchimage('backGimg','" + item.id + "')>Back</label></td><td><label><input type='radio' id='frontIRimg' name='optradio' onclick=switchimage('frontIRimg','" + item.id + "')>IR</label></td></tr>");
            document.getElementById("ToAccount").value = result[i].CreditAccountNo;
            document.getElementById("scanning_type").value = "1";
        }
        else {
            //$('#VoucherDetails').append("<tr><td>" + item.DebitAccountNo + "</td>" + "<td style='display:none;'>" + item.payeename + "</td>" + "<td>" + item.totalamount + "</td>" + "<td style='display:none;'>" + item.cheqno + "</td>" + "<td style='display:none;'>" + item.sortcode + "</td>" + "<td style='display:none;'>" + item.san + "</td>" + "<td style='display:none;'>" + item.trcode + "</td>" + "<td>" + item.amount + "</td>" + "<td>" + item.chqdate + "</td> " + "<td>" + item.micr + "</td>" + "<td>" + item.ocr + "</td>" + "<td>" + item.instrumenttype + "</td>" + "<td style='display:none;'>" + item.iqatest + "</td>" + "<td style='display:none;'><input type='checkbox' id='chkmarkp2f' name='chkmarkp2f'></td>" + "<td><input type='checkbox' id='chkmarkchq' name='chkmarkchq'></td>" + "<td><input type='checkbox' id='chkmarkslip' name='chkmarkslip'></td><td><img height='50' width='70' id=" + item.id + "  src=" + newImgStr + "  /></td><td><label><input type='radio' id='frontGimg' name='optradio' onclick=switchimage('frontGimg','" + item.id + "')>Front</label></td><td><label><input type='radio' id='backGimg' name='optradio' onclick=switchimage('backGimg','" + item.id + "')>Back</label></td><td><label><input type='radio' id='frontIRimg' name='optradio' onclick=switchimage('frontIRimg','" + item.id + "')>IR</label></td></tr>");
            document.getElementById("AccountNo").value = result[i].DebitAccountNo;
            //debugger;
            document.getElementById("icr_id").value = result[i].icr_id;

            if (result[i].CreditAccountNo != null && result[i].CreditAccountNo != "" && result[i].CreditAccountNo != "0")
                document.getElementById("ToAccount").value = result[i].CreditAccountNo;

            document.getElementById("micr").value = result[i].ocr;
        }


        i = i + 1;
    });

    tableChequeData = document.getElementById('tblChequeData');
    i = 0;

    //debugger;
    $.each(result, function () {

        //debugger;

        var row = document.createElement('tr');
        var cell = document.createElement('td');
        //cell.onclick = rowSelect(i);


        //debugger;
        var scanType = document.getElementById("scanning_type").value;
        if (scanType == "1") {
            //debugger;
            if (result[i].InstrumentType == "S") {

                if (result[i].CreditAccountNo != "" && result[i].CreditAccountNo != null)
                    cell.innerHTML = result[i].CreditAccountNo;

                row.appendChild(cell);

                cell = row.insertCell(1);
                cell.innerHTML = "0";
                row.appendChild(cell);
            }
            else {
                cell.innerHTML = "0";
                row.appendChild(cell);

                cell = row.insertCell(1);
                cell.innerHTML = result[i].DebitAccountNo;
                row.appendChild(cell);
            }

            $("#creditAccValid").hide();
            $("#creditChange_1").hide();
            $("#debitAccValid").hide();
            $("#debitChange_1").hide();

        }
        else if (scanType == "2") {
            cell.innerHTML = result[i].CreditAccountNo;
            row.appendChild(cell);

            cell = row.insertCell(1);
            cell.innerHTML = result[i].DebitAccountNo;
            row.appendChild(cell);
        }


        cell = row.insertCell(1);
        if (result[i].InstrumentType == "S") {
            cell.innerHTML = result[i].SlipAmount;
        }
        else {
            cell.innerHTML = "0";
        }

        row.appendChild(cell);


        var cell2 = row.insertCell(2);
        if (result[i].InstrumentType == "C") {
            cell2.innerHTML = result[i].ChqAmount;

        }
        else {
            cell2.innerHTML = "0";
        }

        row.appendChild(cell2);

        var cell3 = row.insertCell(3);
        cell3.innerHTML = result[i].ChqDate;
        row.appendChild(cell3);

        //var cell4 = row.insertCell(4);
        //cell4.innerHTML = result[i].ocr;
        //row.appendChild(cell4);

        //var cell5 = row.insertCell(5);
        //cell5.innerHTML = result[i].micr;
        //row.appendChild(cell5);

        if (result[i].InstrumentType == "C") {
            var cell4 = row.insertCell(4);
            cell4.innerHTML = result[i].chqno;
            row.appendChild(cell4);

            var cell5 = row.insertCell(5);
            cell5.innerHTML = result[i].SortCode;
            row.appendChild(cell5);

            var cell6 = row.insertCell(6);
            cell6.innerHTML = result[i].San;
            row.appendChild(cell6);

            var cell7 = row.insertCell(7);
            cell7.innerHTML = result[i].transCode;
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
        cell8.innerHTML = result[i].InstrumentType;
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
        cell10.innerHTML = result[i].frontImg;
        row.appendChild(cell10);

        var cell11 = row.insertCell(11);
        if (result[i].InstrumentType == "S") {
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
        cell12.innerHTML = result[i].frontImg;
        row.appendChild(cell12);
        var cell13 = row.insertCell(13);
        cell13.innerHTML = result[i].backImg;
        row.appendChild(cell13);
        var cell14 = row.insertCell(14);
        cell14.innerHTML = i + 1;
        row.appendChild(cell14);
        var cell15 = row.insertCell(15);
        cell15.innerHTML = result[i].chqno;
        row.appendChild(cell15);
        var cell16 = row.insertCell(16);
        //cell16.innerHTML = result[i].doctype;
        cell16.innerHTML = "";
        row.appendChild(cell16);
        var cell17 = row.insertCell(17);
        cell17.innerHTML = result[i].SortCode;
        row.appendChild(cell17);
        var cell18 = row.insertCell(18);
        cell18.innerHTML = result[i].transCode;
        row.appendChild(cell18);
        var cell19 = row.insertCell(19);
        cell19.innerHTML = result[i].San;
        row.appendChild(cell19);
        var cell20 = row.insertCell(20);
        //cell20.innerHTML = result[i].ignoreiqa;
        cell20.innerHTML = "";
        row.appendChild(cell20);
        var cell21 = row.insertCell(21);
        //cell21.innerHTML = result[i].iqaflag;
        cell21.innerHTML = "";
        row.appendChild(cell21);
        var cell22 = row.insertCell(22);
        //cell22.innerHTML = result[i].iqastring;
        cell22.innerHTML = "";
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
        cell27.innerHTML = result[i].PayeeName;
        row.appendChild(cell27);

        var cell28 = row.insertCell(28);
        cell28.innerHTML = "0";
        row.appendChild(cell28);

        if (scanType == "2") {
            // Credit Acc validation
            var cell29 = row.insertCell(29);
            cell29.innerHTML = "N";
            row.appendChild(cell29);

            // Credit Acc name change
            var cell30 = row.insertCell(30);
            cell30.innerHTML = "0";
            row.appendChild(cell30);

            // Debit Acc validation
            var cell31 = row.insertCell(31);
            cell31.innerHTML = "N";
            row.appendChild(cell31);

            // Debit Acc name change
            var cell32 = row.insertCell(32);
            cell32.innerHTML = "0";
            row.appendChild(cell32);
        }


        document.getElementById("tblChequeData").appendChild(row);

        $("#tblChequeData tr td:nth-child(12)").hide();
        //$("#tblChequeData tr td:nth-child(11)").hide();
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
        $("#tblChequeData tr td:nth-child(24)").hide();

        $("#tblChequeData tr td:nth-child(26)").hide();
        $("#tblChequeData tr td:nth-child(27)").hide();
        //$("#tblChequeData tr td:nth-child(28)").hide();
        $("#tblChequeData tr td:nth-child(30)").hide();     //PayeeNameChange


        i = i + 1;
    });

    
}


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


function successmsg(result) {
    //debugger;
    alert(result);
    //debugger;
    /*var rooturl = @Url.Content("~/")*/

    window.open(root + "TransferCts/TrfCheckerList", "_self");
}
