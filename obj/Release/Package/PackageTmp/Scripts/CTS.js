try {
    var access_token = window.localStorage.getItem('AccessToken');
    var bearer = window.localStorage.getItem('TokenType');
    var gusername = window.localStorage.getItem('username');
    var authHeaders = {};
    authHeaders.Authorization = bearer + " " + access_token;
    var sliptotamt = 0;
    var Currtotamt = 0;
    var BrCode = "";
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
    //var solID
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

        document.getElementById("tiff").style.display = 'none';
        document.getElementById("FG").style.display = 'block';

    }
    function tiffImgConverter(type, img) {
        debugger;
        tempSrc = document.getElementById("FG").src;
        var imgSrc = tempSrc.replace(/BOT_RGB/g, type).replace(/TOP_RGB/g, type).replace(/BOT_IRR/g, type).replace(/TOP_QIR/g, type);
        //document.getElementById("FG").src = tempSrc.replace(/BOT_RGB/g, type).replace(/TOP_RGB/g, type).replace(/BOT_IRR/g, type).replace(/TOP_QIR/g, type);
        var bas64string = null;



        $.ajax({
            //url: rooturl + 'TransferCts/getTiffImage',
            url: rooturl + 'TransferCts/ImageToBase64CompressTiff',
            //url: x + 'JpgImageToTiff',
            dataType: 'html',
            data: { imgpath: imgSrc },
            success: function (imgdata) {
                debugger;

                //document.getElementById("FG").src = "http://103.231.78.237/iHunterImages/20220512/IF601JS001/131525/FullImage/sampletiff.tiff";
                //document.getElementById("myimg1").src = imgdata;

                document.getElementById("FG").style.display = 'none';

                document.getElementById("tiff").src = imgdata;
                document.getElementById("tiff").style.display = 'block';
            }
        });

    }
    function goBack() {
        window.location = rooturl + "home/Index";
    }
    function getError(result) {
        $("#ProcessingBar").hide();

        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            alert(result.responseText);
        }
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

        var TotalCountDenom = 0;

        var dCashIn = Denom2000 + Denom500 + Denom200 + Denom100 + Denom50 + Denom20 + Denom10 + Denom5 + Denom2 + Denom1;
        var dCashOut = Denom2000_out + Denom500_out + Denom200_out + Denom100_out + Denom50_out + Denom20_out + Denom10_out + Denom5_out + Denom2_out + Denom1_out;

        TotalCountDenom = TotalCountDenom + dCashIn + dCashOut;

        document.getElementById("denomcount").value = TotalCountDenom;

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
        debugger;

        $("#SlipAmnt").hide();
        $("#SlipCheque").hide();
        $("#ChequeAmnt").hide();
        $("#ChequeSlip").hide();
        $("#ChequeDate").hide();
        $("#ChequeDateTxt").hide();

        //if (flag == "CTS") {
        //    $("#VoucherDetails tr").remove();
        //    $("#DenomDeatils tr").remove();

        //    var i = 0;
        //    var totchqcnt = 0;
        //    var totslpcnt = 0;
        //    var TotChqAmt = 0;
        //    var TotSlpAmt = 0;

        //    //$("#ChequeDate").show();
        //    $("#HalfChequeAmount").show();
        //    $("#DivChequeAmount").show();
        //    $("#HalfSlipAmount").show();
        //    $("#DivSlipAmount").show();
        //    //$("#ChequeSlip").show();
        //    //$("#SlipCheque").show();
        //    //$("#SlipAmnt").show();
        //    //$("#ChequeAmnt").show();
        //    debugger;
        //    $.each(result, function (key, item) {
        //        //debugger;
        //        var newImgStr = item.frontgreyimagepath;
        //        ImageUrl = item.frontgreyimagepath;
        //        $('#VoucherDetails').append("<tr><td>" + item.accno + "</td>" + "<td style='display:none;'>" + item.payeename + "</td>" + "<td>" + item.totalamount + "</td>" + "<td style='display:none;'>" + item.cheqno + "</td>" + "<td style='display:none;'>" + item.sortcode + "</td>" + "<td style='display:none;'>" + item.san + "</td>" + "<td style='display:none;'>" + item.trcode + "</td>" + "<td>" + item.amount + "</td>" + "<td>" + item.chqdate + "</td> " + "<td>" + item.micr + "</td>" + "<td>" + item.ocr + "</td>" + "<td>" + item.instrumenttype + "</td>" + "<td style='display:none;'>" + item.iqatest + "</td>" + "<td style='display:none;'><input type='checkbox' id='chkmarkp2f' name='chkmarkp2f'></td>" + "<td><input type='checkbox' id='chkmarkchq' name='chkmarkchq'></td>" + "<td><input type='checkbox' id='chkmarkslip' name='chkmarkslip'></td><td><img height='50' width='70' id=" + item.id + "  src=" + newImgStr + "  /></td><td><label><input type='radio' id='frontGimg' name='optradio' onclick=switchimage('frontGimg','" + item.id + "')>Front</label></td><td><label><input type='radio' id='backGimg' name='optradio' onclick=switchimage('backGimg','" + item.id + "')>Back</label></td><td><label><input type='radio' id='frontIRimg' name='optradio' onclick=switchimage('frontIRimg','" + item.id + "')>IR</label></td></tr>");
        //        document.getElementById("FG").src = newImgStr;
        //        document.getElementById("FG").style.display = "";
        //        totslpcnt = item.slipcount;
        //        TotSlpAmt = TotSlpAmt + parseFloat(item.totalamount);
        //        TotChqAmt = TotChqAmt + parseFloat(item.amount);
        //        //document.getElementById("SlipAmountForCheque").value = TotSlpAmt;
        //        document.getElementById("SlipAmountForCheque").innerHTML = TotSlpAmt;
        //        //document.getElementById("DenomAmountForCheque").value = TotChqAmt;
        //        document.getElementById("DenomAmountForCheque").innerHTML = TotChqAmt;
        //        if (result[i].instrumenttype == "S") {
        //            //document.getElementById("ToAccount").value = result[i].accno; //anandi
        //            document.getElementById("AccountNo").value = result[i].accno; //anandi
        //        }
        //        else {
        //            document.getElementById("AccountNo").value = result[i].accno;
        //            document.getElementById("micr").value = result[i].ocr;
        //        }


        //        i = i + 1;
        //    });
        //    debugger;
        //    //document.getElementById("AccountNo").value = result[1].accno;
        //    var dataCountLoop = 0;
        //    var dataCountLoop1 = 0;

        //    while (tableChequeData.rows.length > 1) {
        //        tableChequeData.deleteRow(1);
        //    }
        //    for (var i = 0; i < result.length; i++) {

        //        // Machine sserial number;
        //        debugger;
        //        if (dataCountLoop == 0 && result[i].machineserialno != "") {
        //            machineserialno = result[i].machineserialno;
        //            dataCountLoop += 1;
        //        }

        //        // Branch Code
        //        if (dataCountLoop1 == 0 && result[i].SolID != "") {
        //            BrCode = result[i].SolID;
        //            dataCountLoop1 += 1;
        //        }

        //        var row = document.createElement('tr');
        //        var cell = document.createElement('td');
        //        cell.innerHTML = result[i].accno;
        //        row.appendChild(cell);
        //        var cell1 = row.insertCell(1);
        //        if (result[i].instrumenttype == "S") {
        //            cell1.innerHTML = result[i].totalamount;
        //        }
        //        else {
        //            cell1.innerHTML = "0";
        //        }

        //        row.appendChild(cell1);
        //        var cell2 = row.insertCell(2);
        //        if (result[i].instrumenttype == "C") {
        //            cell2.innerHTML = result[i].amount;

        //        }
        //        else {
        //            cell2.innerHTML = "0";
        //        }

        //        row.appendChild(cell2);

        //        var cell3 = row.insertCell(3);
        //        cell3.innerHTML = result[i].chqdate;
        //        row.appendChild(cell3);

        //        if (result[i].instrumenttype == "C") {
        //            var cell4 = row.insertCell(4);
        //            cell4.innerHTML = result[i].cheqno;
        //            row.appendChild(cell4);

        //            var cell5 = row.insertCell(5);
        //            cell5.innerHTML = result[i].sortcode;
        //            row.appendChild(cell5);

        //            var cell6 = row.insertCell(6);
        //            cell6.innerHTML = result[i].san;
        //            row.appendChild(cell6);

        //            var cell7 = row.insertCell(7);
        //            cell7.innerHTML = result[i].trcode;
        //            row.appendChild(cell7);
        //        }
        //        else {
        //            var cell4 = row.insertCell(4);
        //            cell4.innerHTML = "";
        //            row.appendChild(cell4);

        //            var cell5 = row.insertCell(5);
        //            cell5.innerHTML = "";
        //            row.appendChild(cell5);

        //            var cell6 = row.insertCell(6);
        //            cell6.innerHTML = "";
        //            row.appendChild(cell6);

        //            var cell7 = row.insertCell(7);
        //            cell7.innerHTML = "";
        //            row.appendChild(cell7);
        //        }

        //        var cell8 = row.insertCell(8);
        //        cell8.innerHTML = result[i].instrumenttype;
        //        row.appendChild(cell8);

        //        var cell9 = row.insertCell(9);
        //        var r1 = document.createElement("input");
        //        r1.type = "radio";
        //        r1.name = "mark_" + i;
        //        //r1.id = "chkboxCheque";   -- Made Changes by Aniketadit on 2022-05-18
        //        r1.id = "chkboxCheque_" + i;
        //        r1.className = "radio-inline";
        //        var lbl1 = document.createElement('label');
        //        lbl1.innerText = "Cheque";
        //        lbl1.htmlFor = r1.id;
        //        cell9.appendChild(r1);
        //        cell9.appendChild(lbl1);

        //        var r2 = document.createElement("input");
        //        r2.type = "radio";
        //        r2.name = "mark_" + i;
        //        //r2.id = "chkboxSlip";     -- Made Changes by Aniketadit on 2022-05-18
        //        r2.id = "chkboxSlip_" + i;
        //        r2.className = "radio-inline";
        //        var lbl2 = document.createElement('label');
        //        lbl2.innerText = "Slip";
        //        lbl2.htmlFor = r2.id;
        //        cell9.appendChild(r2);
        //        cell9.appendChild(lbl2);

        //        var cell10 = row.insertCell(10);
        //        cell10.innerHTML = result[i].frontgreyimagepath;
        //        row.appendChild(cell10);

        //        var cell11 = row.insertCell(11);
        //        if (result[i].instrumenttype == "S") {
        //            if (intSlipNo == 0) {
        //                intSlipNo = 1;
        //            }
        //            else {
        //                intSlipNo = intSlipNo + 1;
        //            }
        //            cell11.innerHTML = intSlipNo;
        //        }
        //        else {
        //            intSlipNo = intSlipNo;
        //            cell11.innerHTML = intSlipNo;
        //        }
        //        row.appendChild(cell11);

        //        //var cell10 = row.insertCell(10);
        //        //cell10.innerHTML = result[i].frontgreyimagepath;
        //        //row.appendChild(cell10);

        //        //var cell11 = row.insertCell(11);
        //        //cell11.innerHTML = result[i].instrumenttype;
        //        //row.appendChild(cell11);

        //        var cell12 = row.insertCell(12);
        //        cell12.innerHTML = result[i].frontgreyimagepath;
        //        row.appendChild(cell12);

        //        var cell13 = row.insertCell(13);
        //        cell13.innerHTML = result[i].backgreyimagepath;
        //        row.appendChild(cell13);

        //        var cell14 = row.insertCell(14);
        //        cell14.innerHTML = i + 1;
        //        row.appendChild(cell14);

        //        var cell15 = row.insertCell(15);
        //        cell15.innerHTML = result[i].cheqno;
        //        row.appendChild(cell15);

        //        var cell16 = row.insertCell(16);
        //        cell16.innerHTML = result[i].doctype;
        //        row.appendChild(cell16);

        //        var cell17 = row.insertCell(17);
        //        cell17.innerHTML = result[i].AccNoConf;
        //        row.appendChild(cell17);

        //        var cell18 = row.insertCell(18);
        //        cell18.innerHTML = result[i].DateScore;
        //        row.appendChild(cell18);

        //        var cell19 = row.insertCell(19);
        //        cell19.innerHTML = result[i].AmountScore;
        //        row.appendChild(cell19);

        //        var cell20 = row.insertCell(20);
        //        cell20.innerHTML = result[i].ignoreiqa;
        //        row.appendChild(cell20);

        //        var cell21 = row.insertCell(21);
        //        cell21.innerHTML = result[i].iqaflag;
        //        row.appendChild(cell21);

        //        var cell22 = row.insertCell(22);
        //        cell22.innerHTML = result[i].iqastring;
        //        row.appendChild(cell22);


        //        var cell23 = row.insertCell(23);
        //        var element23 = document.createElement("button");
        //        element23.type = "button";
        //        element23.name = "button";
        //        element23.className = "menu-icon fa fa-trash";
        //        cell23.appendChild(element23);
        //        row.appendChild(cell23);

        //        //debugger;
        //        var cell24 = row.insertCell(24);
        //        cell24.innerHTML = result[i].micr;
        //        row.appendChild(cell24);

        //        var cell25 = row.insertCell(25);
        //        cell25.innerHTML = result[i].ocr;
        //        row.appendChild(cell25);

        //        //debugger;
        //        var cell26 = row.insertCell(26);
        //        cell26.innerHTML = "false";
        //        row.appendChild(cell26);

        //        var cell27 = row.insertCell(27);
        //        cell27.innerHTML = result[i].payeename;
        //        row.appendChild(cell27);

        //        var cell28 = row.insertCell(28);
        //        cell28.innerHTML = "0";
        //        row.appendChild(cell28);

        //        document.getElementById("tblChequeData").appendChild(row);
        //        $("#tblChequeData tr td:nth-child(11)").hide();
        //        //$("#tblChequeData tr td:nth-child(10)").hide();
        //        $("#tblChequeData tr td:nth-child(13)").hide();
        //        $("#tblChequeData tr td:nth-child(14)").hide();
        //        $("#tblChequeData tr td:nth-child(15)").hide();
        //        $("#tblChequeData tr td:nth-child(16)").hide();
        //        $("#tblChequeData tr td:nth-child(17)").hide();
        //        $("#tblChequeData tr td:nth-child(18)").hide();
        //        $("#tblChequeData tr td:nth-child(19)").hide();
        //        $("#tblChequeData tr td:nth-child(20)").hide();
        //        $("#tblChequeData tr td:nth-child(21)").hide();
        //        $("#tblChequeData tr td:nth-child(22)").hide();
        //        $("#tblChequeData tr td:nth-child(23)").hide();
        //        //$("#tblChequeData tr td:nth-child(24)").hide();
        //        $("#tblChequeData tr td:nth-child(25)").hide();
        //        $("#tblChequeData tr td:nth-child(26)").hide();
        //        //$("#tblChequeData tr td:nth-child(27)").hide();
        //        //$("#tblChequeData tr td:nth-child(28)").hide();
        //        $("#tblChequeData tr td:nth-child(29)").hide();     //PayeeNameChange
        //    }

        //    var scanType = document.getElementById("ScanningType").value;
        //    debugger;
        //    //if (scanType != "2") {
        //    //    $("#ShowToAcc").show();
        //    //}

        //    $("#MICRImg").show();
        //    $("#ChequeData").show();
        //    GetSData();

        //    if (result[1].accno == "") {
        //        alert("Account Number is blank for Cheque..!")
        //    }
        //    else {

        //        $.ajax({
        //            url: x + "GetCBSDtls",
        //            headers: authHeaders,
        //            type: 'POST',
        //            async: false,
        //            //url: "http://10.9.0.222/WebApi/api/Scanner/GetCBSDtls",
        //            crossDomain: true,
        //            data: { 'ac': result[1].accno },
        //            success: getSuccessFinDetails,
        //            error: getError
        //        });

        //    }



        //    if (result[0].accno == "") {
        //        alert("Account Number is bank for Slip..!");
        //    }
        //    else {
        //        var delayInMilliseconds = 50; //5 second
        //        //setTimeout(function () {
        //        //    //debugger;
        //        //    GetPayeee(result[0].accno, "S");
        //        //}, delayInMilliseconds);


        //    }


        //    var rslt = "";
        //    if (TotSlpAmt == TotChqAmt) {
        //        rslt = "Slip amount (" + TotSlpAmt + ") matched with cheques total amount (" + TotChqAmt + ")";
        //    }
        //    else {
        //        rslt = "Slip amount (" + TotSlpAmt + ") not matched with cheques total amount (" + TotChqAmt + ")";
        //    }

        //}

        //$("#HalfSlipAmount").hide();
        //$("#HalfChequeAmount").hide();
        //$("#cheque_Data").hide();
        //$("#ChequeDateTxt").hide();

        $("#VoucherDetails tr").remove();
        $("#DenomDeatils tr").remove();

        var i = 0;
        var totchqcnt = 0;
        var totslpcnt = 0;
        var TotChqAmt = 0;
        var TotSlpAmt = 0;

        //$("#ChequeDate").show();
        $("#HalfChequeAmount").show();
        $("#DivChequeAmount").show();
        $("#HalfSlipAmount").show();
        $("#DivSlipAmount").show();
        //$("#ChequeSlip").show();
        //$("#SlipCheque").show();
        //$("#SlipAmnt").show();
        //$("#ChequeAmnt").show();
        debugger;
        $.each(result, function (key, item) {
            //debugger;
            var newImgStr = item.frontgreyimagepath;
            ImageUrl = item.frontgreyimagepath;
            $('#VoucherDetails').append("<tr><td>" + item.accno + "</td>" + "<td style='display:none;'>" + item.payeename + "</td>" + "<td>" + item.totalamount + "</td>" + "<td style='display:none;'>" + item.cheqno + "</td>" + "<td style='display:none;'>" + item.sortcode + "</td>" + "<td style='display:none;'>" + item.san + "</td>" + "<td style='display:none;'>" + item.trcode + "</td>" + "<td>" + item.amount + "</td>" + "<td>" + item.chqdate + "</td> " + "<td>" + item.micr + "</td>" + "<td>" + item.ocr + "</td>" + "<td>" + item.instrumenttype + "</td>" + "<td style='display:none;'>" + item.iqatest + "</td>" + "<td style='display:none;'><input type='checkbox' id='chkmarkp2f' name='chkmarkp2f'></td>" + "<td><input type='checkbox' id='chkmarkchq' name='chkmarkchq'></td>" + "<td><input type='checkbox' id='chkmarkslip' name='chkmarkslip'></td><td><img height='50' width='70' id=" + item.id + "  src=" + newImgStr + "  /></td><td><label><input type='radio' id='frontGimg' name='optradio' onclick=switchimage('frontGimg','" + item.id + "')>Front</label></td><td><label><input type='radio' id='backGimg' name='optradio' onclick=switchimage('backGimg','" + item.id + "')>Back</label></td><td><label><input type='radio' id='frontIRimg' name='optradio' onclick=switchimage('frontIRimg','" + item.id + "')>IR</label></td></tr>");
            document.getElementById("FG").src = newImgStr;
            document.getElementById("FG").style.display = "";
            totslpcnt = item.slipcount;
            TotSlpAmt = TotSlpAmt + parseFloat(item.totalamount);
            TotChqAmt = TotChqAmt + parseFloat(item.amount);
            //document.getElementById("SlipAmountForCheque").value = TotSlpAmt;
            document.getElementById("SlipAmountForCheque").innerHTML = TotSlpAmt;
            //document.getElementById("DenomAmountForCheque").value = TotChqAmt;
            document.getElementById("DenomAmountForCheque").innerHTML = TotChqAmt;
            if (result[i].instrumenttype == "S") {
                //document.getElementById("ToAccount").value = result[i].accno; //anandi
                document.getElementById("AccountNo").value = result[i].accno; //anandi
            }
            else {
                document.getElementById("AccountNo").value = result[i].accno;
                document.getElementById("micr").value = result[i].ocr;
            }


            i = i + 1;
        });
        debugger;
        //document.getElementById("AccountNo").value = result[1].accno;
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

            //var cell10 = row.insertCell(10);
            //cell10.innerHTML = result[i].frontgreyimagepath;
            //row.appendChild(cell10);

            //var cell11 = row.insertCell(11);
            //cell11.innerHTML = result[i].instrumenttype;
            //row.appendChild(cell11);

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
            cell17.innerHTML = result[i].AccNoConf;
            row.appendChild(cell17);

            var cell18 = row.insertCell(18);
            cell18.innerHTML = result[i].DateScore;
            row.appendChild(cell18);

            var cell19 = row.insertCell(19);
            cell19.innerHTML = result[i].AmountScore;
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
            var cell26 = row.insertCell(26);
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
            //$("#tblChequeData tr td:nth-child(24)").hide();
            $("#tblChequeData tr td:nth-child(25)").hide();
            $("#tblChequeData tr td:nth-child(26)").hide();
            //$("#tblChequeData tr td:nth-child(27)").hide();
            //$("#tblChequeData tr td:nth-child(28)").hide();
            $("#tblChequeData tr td:nth-child(29)").hide();     //PayeeNameChange
        }

        var scanType = document.getElementById("ScanningType").value;
        debugger;
        //if (scanType != "2") {
        //    $("#ShowToAcc").show();
        //}

        $("#MICRImg").show();
        $("#ChequeData").show();
        GetSData();

        var scanType = document.getElementById("ScanningType").value;
        debugger;

        //if (result[0].accno == "" && scanType == "2") {
        //    alert("Account Number is blank for Cheque..!")
        //}
        //else {

        //    $.ajax({
        //        url: x + "GetCBSDtls",
        //        headers: authHeaders,
        //        type: 'POST',
        //        async: false,
        //        //url: "http://10.9.0.222/WebApi/api/Scanner/GetCBSDtls",
        //        crossDomain: true,
        //        data: { 'ac': result[0].accno },
        //        success: getSuccessFinDetails,
        //        error: getError
        //    });

        //}


        //if (result[0].accno == "") {
        //    alert("Account Number is bank for Slip..!");
        //}
        //else {
        //    //var delayInMilliseconds = 50; //5 second
        //    //setTimeout(function () {
        //    //    //debugger;
        //    //    GetPayeee(result[0].accno, "S");
        //    //}, delayInMilliseconds);

        //}


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

        debugger;

        $("#FinName").text("");
        $("#FinAccOwner").text("");
        $("#FinAccountStatus").text("");
        $("#FinMOP").text("");
        $("#FinAmount").text("");
        $("#FinScheme").text("");
        $("#FinMOP").text("");
        var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)' >";
        Pay = Pay + '</select>';
        $('#Payeeee').html(Pay);

        debugger;

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
                    Pay = Pay + '<option value="' + PayeeName[i] + '">' + PayeeName[i] + '</option>';
                }
            }

            Pay = Pay + '</select>';
            $('#Payeeee').html(Pay);
        }

    }

    // Credit Accno Validation
    function toAccNo() {
        //debugger;
        //check_ToAccNo = 1;
        if (GlobalRowNo != " ") {
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "0";
        }
        GetPayeee(document.getElementById('ToAccount').value, 'S');
    }

    function fromAccNo() {
        //debugger;
        //check_FromAccNo = 1;
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
            //if (document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[8].innerHTML == "S") {
            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("ToAccount").value;
            //}
            //else {
            //    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("AccountNo").value;
            //}
            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = document.getElementById("AccountNo").value;
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = Acc;
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
                debugger;

                //Type = cellType;

                if (Type == "C") {
                    debugger;

                    if (GlobalRowNo != " ") {
                        var FinDetails = {};
                        FinDetails = result;
                        var chequeName = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML;
                        var ScanningType = document.getElementById("ScanningType").value;
                        if (chequeName == "0" && ((ScanningType == "1" && cellType == "S") || (ScanningType == "2" && cellType == "C"))) {
                            $("#FinName").text("");
                            $("#FinAccOwner").text("");
                            $("#FinAccountStatus").text("");
                            $("#FinMOP").text("");
                            $("#FinAmount").text("");
                            $("#FinScheme").text("");
                            $("#FinMOP").text("");

                            var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
                            Pay = Pay + '</select>';
                            $('#Payeeee').html(Pay);
                            //var FinDetails = {};
                            //FinDetails = result;

                            debugger;
                            if (FinDetails.cbsdls == null) {
                                $("#FinName").text("Account does not exist");
                                $("#FinName").css('color', 'red');
                                //debugger;
                                //if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo) {
                                if (GlobalRowNo != " " && pageAccNo == cellAccNo) {
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML = "false";
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "red";
                                }
                                //GlobalRowNo = " ";
                            }
                            else if (FinDetails.cbsdls.includes("Account does not exist")) {
                                $("#FinName").text("Account does not exist");
                                $("#FinName").css('color', 'red');
                                //debugger;
                                /*if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo) {*/
                                if (GlobalRowNo != " " && pageAccNo == cellAccNo) {
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

                                if (GlobalRowNo != " " && pageAccNo == cellAccNo && chqPayeeName_val == "0") {
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
                                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = FinDetails.PayeeName[0];
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
                                            //Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                                            Pay = Pay + '<option value="' + PayeeName[i] + '" >' + PayeeName[i] + '</option>';
                                        }
                                    }
                                    Pay = Pay + '</select>';
                                    $('#Payeeee').html(Pay);
                                }

                            }
                        }
                        else if (chequeName == "1") {
                            debugger;
                            $("#FinName").text(document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML);
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

                            var PayeeName = {};
                            PayeeName = FinDetails.PayeeName;
                            var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
                            //  Pay = Pay + '<option>Select</option>';
                            if (PayeeName != null) {
                                for (i = 0; i < PayeeName.length; i++) {
                                    //Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                                    Pay = Pay + '<option value="' + PayeeName[i] + '" >' + PayeeName[i] + '</option>';
                                }
                            }
                            Pay = Pay + '</select>';
                            $('#Payeeee').html(Pay);
                        }
                        else {
                            $("#FinName").text("");
                            $("#FinAccOwner").text("");
                            $("#FinAccountStatus").text("");
                            $("#FinMOP").text("");
                            $("#FinAmount").text("");
                            $("#FinScheme").text("");
                            $("#FinMOP").text("");
                        }
                    }

                    //if (document.getElementById("PayeeNameCheque_val").value == "0") {
                    //    $("#FinName").text("");
                    //}

                    //$("#FinName").text("");
                    //$("#FinAccOwner").text("");
                    //$("#FinAccountStatus").text("");
                    //$("#FinMOP").text("");
                    //$("#FinAmount").text("");
                    //$("#FinScheme").text("");
                    //$("#FinMOP").text("");

                    //var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
                    //Pay = Pay + '</select>';
                    //$('#Payeeee').html(Pay);
                    //var FinDetails = {};
                    //FinDetails = result;

                    //debugger;
                    //if (FinDetails.cbsdls == null) {
                    //    $("#FinName").text("Account does not exist");
                    //    $("#FinName").css('color', 'red');
                    //    //debugger;
                    //    //if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo) {
                    //    if (GlobalRowNo != " " && pageAccNo == cellAccNo) {
                    //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML = "false";
                    //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "red";
                    //    }
                    //    //GlobalRowNo = " ";
                    //}
                    //else if (FinDetails.cbsdls.includes("Account does not exist")) {
                    //    $("#FinName").text("Account does not exist");
                    //    $("#FinName").css('color', 'red');
                    //    //debugger;
                    //    /*if (GlobalRowNo != " " && Type == cellType && pageAccNo == cellAccNo) {*/
                    //    if (GlobalRowNo != " " && pageAccNo == cellAccNo) {
                    //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML = "false";
                    //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "red";
                    //    }
                    //    //GlobalRowNo = " ";
                    //    return false;
                    //}
                    //else {
                    //    debugger;

                    //    var chqPayeeName_val = "0";

                    //    //if (GlobalRowNo != " ") {
                    //    //    chqPayeeName_val = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML;
                    //    //}

                    //    if (GlobalRowNo != " " && pageAccNo == cellAccNo && chqPayeeName_val == "0") {
                    //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML = "true";
                    //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[26].innerHTML.backgroundColor = "green";
                    //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = FinDetails.PayeeName[0];
                    //        //document.getElementById("PayeeNameCheque_val").value = "1";
                    //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[28].innerHTML = "1";
                    //    }
                    //    //GlobalRowNo = " ";
                    //    if (FinDetails.PayeeName != null && chqPayeeName_val == "0") {
                    //        $("#FinName").text(FinDetails.PayeeName[0]);                //done aniket
                    //        $("#SlipFinName").css('color', 'black');
                    //        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = FinDetails.PayeeName[0];
                    //    }
                    //    if (FinDetails.AccountOwnership != null) {
                    //        $("#FinAccOwner").text(FinDetails.AccountOwnership);
                    //    }
                    //    if (FinDetails.AccountStatus != null) {
                    //        $("#FinAccountStatus").text(FinDetails.AccountStatus);      //done aniket
                    //    }
                    //    if (FinDetails.Amount != null) {
                    //        $("#FinAmount").text(FinDetails.Amount);                    //done aniket
                    //    }
                    //    if (FinDetails.MOP != null) {
                    //        $("#FinMOP").text(FinDetails.MOP);
                    //    }
                    //    if (FinDetails.SchemeCode != null) {
                    //        $("#FinScheme").text(FinDetails.SchemeCode);                //done aniket
                    //    }
                    //    if (FinDetails.MOP != null) {
                    //        $("#FinMOP").text(FinDetails.MOP);
                    //    }

                    //    if (chqPayeeName_val == "0") {
                    //        var PayeeName = {};
                    //        PayeeName = FinDetails.PayeeName;
                    //        var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
                    //        //  Pay = Pay + '<option>Select</option>';
                    //        if (PayeeName != null) {
                    //            for (i = 0; i < PayeeName.length; i++) {
                    //                //Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                    //                Pay = Pay + '<option value="' + PayeeName[i] + '" >' + PayeeName[i] + '</option>';
                    //            }
                    //        }
                    //        Pay = Pay + '</select>';
                    //        $('#Payeeee').html(Pay);
                    //    }

                    //}
                }
                else {
                    debugger;
                    if (flag == "Cash") {
                        $("#FinName").text("");
                        $("#FinAccOwner").text("");
                        $("#FinAccountStatus").text("");
                        $("#FinMOP").text("");
                        $("#FinAmount").text("");
                        $("#FinScheme").text("");
                        $("#FinMOP").text("");
                        var Pay = "<select id='PayeeName' class='form-control' onchange='PayeeNameChange(this.value)'>";
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
                                    //Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                                    Pay = Pay + '<option value="' + PayeeName[i] + '" >' + PayeeName[i] + '</option>';
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
                                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[27].innerHTML = FinDetails.PayeeName[0];
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
                                        //Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                                        Pay = Pay + '<option value="' + PayeeName[i] + '" >' + PayeeName[i] + '</option>';
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
        //TransferCtsValidation();
        CtsValidation();
        //debugger;
        //if (ValidationPassed == true)
        //    ValidateData();

        //debugger;

        if (ValidationPassed == true) {
            //debugger;

            var TypeTran = localStorage.getItem("typeOfTran");

            var currentDate = new Date();

            //if (TypeTran == "CTS") {
            //    debugger;

            //    var RefNo = "CTS" + currentDate.getFullYear() + String(currentDate.getUTCMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0') + String(currentDate.getSeconds()).padStart(2, '0');

            //    var ClearingType = document.getElementById("ClearingType").value;
            //    var ScanningType = document.getElementById("ScanningType").value;
            //    debugger;
            //    var ChequeData = {}
            //    ChequeData.pType = "CTS";
            //    ChequeData.response = "2";
            //    ChequeData.INtellerid = gusername;
            //    ChequeData.transtype = "CTS";
            //    //ChequeData.transRefNo = RegNo;      // Common vaidation call for Trans No generation    -- aniket
            //    ChequeData.transRefNo = RefNo;
            //    //ChequeData.AccountNo = document.getElementById("AccountNo").value;
            //    //ChequeData.ChequeDate = document.getElementById("ChequeDateTxt").value;
            //    ChequeData.ClearingType = ClearingType
            //    ChequeData.ScanningType = ScanningType
            //    ChequeData.BranchCode = BrCode;
            //    ChequeData.BOFD = "BOFD"
            //    ChequeData.IFSC = "IFSC"
            //    //ChequeData.machineserialno = "00016C59CED3";  //correct Serial no
            //    ChequeData.machineserialno = machineserialno;
            //    ChequeData.retrycount = "N";
            //    //ChequeData.machineserialno = "IF601CS124";
            //    var SorterData = [];
            //    // Aniket add validation in below for loop for amount validation
            //    for (var i = 1, row; row = tableChequeData.rows[i]; i++) {
            //        //debugger;

            //        for (var ij = 0; ij < 26; ij++) {
            //            var vj = row.cells[ij].innerHTML;
            //        }
            //        debugger;
            //        SorterData.push({

            //            AccountNo: row.cells[0].innerHTML,
            //            //AccountNo: row.cells[0].innnerHTML,
            //            //AccountNoConf: "90",
            //            AccountNoConf: row.cells[17].innerHTML,
            //            //payeename: document.getElementById("PayeeName").value,
            //            payeename: row.cells[27].innerHTML,
            //            ChequeDate: row.cells[3].innerHTML,
            //            //ChequeDateConf: "85",
            //            ChequeDateConf: row.cells[18].innerHTML,
            //            ChequeAmount: row.cells[2].innerHTML,
            //            //ChequeAmountConf: "87",
            //            ChequeAmountConf: row.cells[19].innerHTML,
            //            MICR: row.cells[24].innerHTML.trim(),
            //            OCR: row.cells[25].innerHTML.trim(),
            //            InstrumentType: row.cells[8].innerHTML,
            //            SlipNo: row.cells[11].innerHTML,
            //            ChequeNoMICR: row.cells[4].innerHTML,
            //            SortCode: row.cells[5].innerHTML,
            //            transCodeMICR: row.cells[7].innerHTML,
            //            SanMICR: row.cells[6].innerHTML,
            //            DocNo: i,
            //            FrontGray: row.cells[12].innerHTML,
            //            BackGray: row.cells[13].innerHTML,
            //        })
            //    }

            //    var y = "postctsdata";
            //    $.ajax({
            //        type: 'POST',
            //        url: x + y,
            //        headers: authHeaders,
            //        // url: "http://localhost:8198/api/Scanner/postctsdata",

            //        crossDomain: true,
            //        //data: JSON.stringify(SorterData),
            //        data: { 'SorterData': SorterData, 'ChequeData': ChequeData },
            //        //datatype: "json",
            //        //contentType: 'application/json; charset=utf-8',
            //        success: getSuccessReset,
            //        error: getError
            //    });
            //}

            debugger;

            var RefNo = "CTS" + currentDate.getFullYear() + String(currentDate.getUTCMonth() + 1).padStart(2, '0') + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0') + String(currentDate.getSeconds()).padStart(2, '0');

            var ClearingType = document.getElementById("ClearingType").value;
            var ScanningType = document.getElementById("ScanningType").value;
            debugger;
            var ChequeData = {}
            ChequeData.pType = "CTS";
            ChequeData.response = "2";
            ChequeData.INtellerid = gusername;
            ChequeData.transtype = "CTS";
            //ChequeData.transRefNo = RegNo;      // Common vaidation call for Trans No generation    -- aniket
            ChequeData.transRefNo = RefNo;
            //ChequeData.AccountNo = document.getElementById("AccountNo").value;
            //ChequeData.ChequeDate = document.getElementById("ChequeDateTxt").value;
            ChequeData.ClearingType = ClearingType
            ChequeData.ScanningType = ScanningType
            ChequeData.BranchCode = BrCode;
            ChequeData.BOFD = "BOFD"
            ChequeData.IFSC = "IFSC"
            //ChequeData.machineserialno = "00016C59CED3";  //correct Serial no
            ChequeData.machineserialno = machineserialno;
            ChequeData.retrycount = "N";

            //// test aniket begin
            //ChequeData.Hacked = "Hacked";
            //// test aniket end

            //ChequeData.machineserialno = "IF601CS124";
            var SorterData = [];
            // Aniket add validation in below for loop for amount validation
            for (var i = 1, row; row = tableChequeData.rows[i]; i++) {
                //debugger;

                for (var ij = 0; ij < 26; ij++) {
                    var vj = row.cells[ij].innerHTML;
                }
                debugger;
                SorterData.push({

                    AccountNo: row.cells[0].innerHTML,
                    //AccountNo: row.cells[0].innnerHTML,
                    //AccountNoConf: "90",
                    AccountNoConf: row.cells[17].innerHTML,
                    //payeename: document.getElementById("PayeeName").value,
                    payeename: row.cells[27].innerHTML,
                    ChequeDate: row.cells[3].innerHTML,
                    //ChequeDateConf: "85",
                    ChequeDateConf: row.cells[18].innerHTML,
                    ChequeAmount: row.cells[2].innerHTML,
                    //ChequeAmountConf: "87",
                    ChequeAmountConf: row.cells[19].innerHTML,
                    MICR: row.cells[24].innerHTML.trim(),
                    OCR: row.cells[25].innerHTML.trim(),
                    InstrumentType: row.cells[8].innerHTML,
                    SlipNo: row.cells[11].innerHTML,
                    ChequeNoMICR: row.cells[4].innerHTML,
                    SortCode: row.cells[5].innerHTML,
                    transCodeMICR: row.cells[7].innerHTML,
                    SanMICR: row.cells[6].innerHTML,
                    DocNo: i,
                    FrontGray: row.cells[12].innerHTML,
                    BackGray: row.cells[13].innerHTML,
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


        if (TypeTran == "TC") {
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

    /*$("#PayeeName").on*/

}
catch (e) {
    alert(e.message);
}

