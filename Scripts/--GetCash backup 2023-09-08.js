try {

    function getError(result) {
        //alert("Error found in js");
        $("#ProcessingBar").hide();
        //document.getElementById("VoucherCheck").value = "false";
        if (result.status == 401 && result.statusText == "Unauthorized") {
            //document.getElementById("ProcessingBar").innerHTML = result.responseText;
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            //alert(result.responseText);
            document.getElementById("ProcessingBar").innerHTML = result.responseText;
        }
    }
    
    function getResult(result) {
        debugger;
        //alert("new result");
        var img = result.Image;
        document.getElementById("FG").src = result.Image;
        if (PageType == "Deposit" || PageType == "CI01") {
            document.getElementById("accno").innerHTML = result.CreditAccNo;
        }
        else if (PageType == "WithDraw" || PageType == "DI01") {
            document.getElementById("accno").innerHTML = result.DebitAccNo;
            document.getElementById("inst_alpha").innerHTML = result.instrument_alpha;
            document.getElementById("inst_srlno").innerHTML = result.ChequeNo;
            if (PageType == "DI01") {
                document.getElementById("inst_type").innerHTML = "DI";
            }
            else {
                document.getElementById("inst_type").innerHTML = result.InstrumentType;
            }
            document.getElementById("inst_date").innerHTML = result.date;
        }
        document.getElementById("name").innerHTML = result.PayeeName;
        document.getElementById("Instr_Amt").value = result.ChqAmount;
        document.getElementById("Trans_Par").innerHTML = result.transaction_particular;
        document.getElementById("rtp_code").innerHTML = result.report_code;
        document.getElementById("remark1").innerHTML = result.remark_1;
        document.getElementById("remark2").innerHTML = result.remark_2;

        $("#ProcessingBar").hide();
    }

    function getErrorNoData(data) {
        debugger;
        document.getElementById("btn_cash").disabled = false;
        //document.getElementById("ProcessingBar").innerHTML = "No Data Found!";
        document.getElementById("ProcessingBar").innerHTML = data.responseJSON.Message;
    }

    function getErrorNoDataSod() {
        debugger;
        document.getElementById("btn_cash").disabled = false;

        document.getElementById("ProcessingBar").innerHTML = "SOD not Done!";
        //$("#ProcessingBar").show();
        //var msg = result.responseJSON.Message;
        //alert(msg);
    }
    

    function CashInput(denom) {
        debugger;
        // 2000 - Two Thousand
        var in_2000 = parseInt(document.getElementById("lbl_2000_in").innerHTML);
        var out_2000 = parseInt(document.getElementById("lbl_2000_out").innerHTML);
        var DVal_2000 = parseInt(document.getElementById("lbl_2000_DValue").innerHTML);
        var AVal_2000 = parseInt(document.getElementById("lbl_2000_AValue").innerHTML);
        var input_2000 = 0;
        if (document.getElementById("input_2000").value == null || document.getElementById("input_2000").value == "") {
            input_2000 = 0;
            document.getElementById("input_2000").value = 0;
        }
        else {
            input_2000 = parseInt(document.getElementById("input_2000").value);
            document.getElementById("input_2000").value = parseInt(document.getElementById("input_2000").value);
        }
            

        // 500 - Five Hundred
        var in_500 = parseInt(document.getElementById("lbl_500_in").innerHTML);
        var out_500 = parseInt(document.getElementById("lbl_500_out").innerHTML);
        var DVal_500 = parseInt(document.getElementById("lbl_500_DValue").innerHTML);
        var AVal_500 = parseInt(document.getElementById("lbl_500_AValue").innerHTML);
        var input_500 = 0;
        if (document.getElementById("input_500").value == null || document.getElementById("input_500").value == "") {
            input_500 = 0;
            document.getElementById("input_500").value = 0;
        }
        else {
            input_500 = parseInt(document.getElementById("input_500").value);
            document.getElementById("input_500").value = parseInt(document.getElementById("input_500").value);
        }
            

        // 200 - Two Hundred
        var in_200 = parseInt(document.getElementById("lbl_200_in").innerHTML);
        var out_200 = parseInt(document.getElementById("lbl_200_out").innerHTML);
        var DVal_200 = parseInt(document.getElementById("lbl_200_DValue").innerHTML);
        var AVal_200 = parseInt(document.getElementById("lbl_200_AValue").innerHTML);
        var input_200 = 0;
        if (document.getElementById("input_200").value == null || document.getElementById("input_200").value == "") {
            input_200 = 0;
            document.getElementById("input_200").value = 0;
        }
        else {
            input_200 = parseInt(document.getElementById("input_200").value);
            document.getElementById("input_200").value = parseInt(document.getElementById("input_200").value);
        }
            

        // 100 - One Hundred
        var in_100 = parseInt(document.getElementById("lbl_100_in").innerHTML);
        var out_100 = parseInt(document.getElementById("lbl_100_out").innerHTML);
        var DVal_100 = parseInt(document.getElementById("lbl_100_DValue").innerHTML);
        var AVal_100 = parseInt(document.getElementById("lbl_100_AValue").innerHTML);
        var input_100 = 0;
        if (document.getElementById("input_100").value == null || document.getElementById("input_100").value == "") {
            input_100 = 0;
            document.getElementById("input_100").value = 0;
        }
        else {
            input_100 = parseInt(document.getElementById("input_100").value);
            document.getElementById("input_100").value = parseInt(document.getElementById("input_100").value);
        }
            

        // 50 - Fifty
        var in_50 = parseInt(document.getElementById("lbl_50_in").innerHTML);
        var out_50 = parseInt(document.getElementById("lbl_50_out").innerHTML);
        var DVal_50 = parseInt(document.getElementById("lbl_50_DValue").innerHTML);
        var AVal_50 = parseInt(document.getElementById("lbl_50_AValue").innerHTML);
        var input_50 = 0;
        if (document.getElementById("input_50").value == null || document.getElementById("input_50").value == "") {
            input_50 = 0;
            document.getElementById("input_50").value = 0;
        }
        else {
            input_50 = parseInt(document.getElementById("input_50").value);
            document.getElementById("input_50").value = parseInt(document.getElementById("input_50").value);
        }
            

        // 20 - Twenty
        var in_20 = parseInt(document.getElementById("lbl_20_in").innerHTML);
        var out_20 = parseInt(document.getElementById("lbl_20_out").innerHTML);
        var DVal_20 = parseInt(document.getElementById("lbl_20_DValue").innerHTML);
        var AVal_20 = parseInt(document.getElementById("lbl_20_AValue").innerHTML);
        var input_20 = 0;
        if (document.getElementById("input_20").value == null || document.getElementById("input_20").value == "") {
            input_20 = 0;
            document.getElementById("input_20").value = 0;
        }
        else {
            input_20 = parseInt(document.getElementById("input_20").value);
            document.getElementById("input_20").value = parseInt(document.getElementById("input_20").value);
        }
            

        // 10 - Ten
        var in_10 = parseInt(document.getElementById("lbl_10_in").innerHTML);
        var out_10 = parseInt(document.getElementById("lbl_10_out").innerHTML);
        var DVal_10 = parseInt(document.getElementById("lbl_10_DValue").innerHTML);
        var AVal_10 = parseInt(document.getElementById("lbl_10_AValue").innerHTML);
        var input_10 = 0;
        if (document.getElementById("input_10").value == null || document.getElementById("input_10").value == "") {
            input_10 = 0;
            document.getElementById("input_10").value = 0;
        }
        else {
            input_10 = parseInt(document.getElementById("input_10").value);
            document.getElementById("input_10").value = parseInt(document.getElementById("input_10").value);
        }
            

        // 5 - Ten
        var in_5 = parseInt(document.getElementById("lbl_5_in").innerHTML);
        var out_5 = parseInt(document.getElementById("lbl_5_out").innerHTML);
        var DVal_5 = parseInt(document.getElementById("lbl_5_DValue").innerHTML);
        var AVal_5 = parseInt(document.getElementById("lbl_5_AValue").innerHTML);
        var input_5 = 0;
        if (document.getElementById("input_5").value == null || document.getElementById("input_5").value == "") {
            input_5 = 0;
            document.getElementById("input_5").value = 0;
        }
        else {
            input_5 = parseInt(document.getElementById("input_5").value);
            document.getElementById("input_5").value = parseInt(document.getElementById("input_5").value);
        }
            

        // 2 - Ten
        var in_2 = parseInt(document.getElementById("lbl_2_in").innerHTML);
        var out_2 = parseInt(document.getElementById("lbl_2_out").innerHTML);
        var DVal_2 = parseInt(document.getElementById("lbl_2_DValue").innerHTML);
        var AVal_2 = parseInt(document.getElementById("lbl_2_AValue").innerHTML);
        var input_2 = 0;
        if (document.getElementById("input_2").value == null || document.getElementById("input_2").value == "") {
            input_2 = 0;
            document.getElementById("input_2").value = 0;
        }
        else {
            input_2 = parseInt(document.getElementById("input_2").value);
            document.getElementById("input_2").value = parseInt(document.getElementById("input_2").value);
        }
            

        // 1 - Ten
        var in_1 = parseInt(document.getElementById("lbl_1_in").innerHTML);
        var out_1 = parseInt(document.getElementById("lbl_1_out").innerHTML);
        var DVal_1 = parseInt(document.getElementById("lbl_1_DValue").innerHTML);
        var AVal_1 = parseInt(document.getElementById("lbl_1_AValue").innerHTML);
        var input_1 = 0;
        if (document.getElementById("input_1").value == null || document.getElementById("input_1").value == "") {
            input_1 = 0;
            document.getElementById("input_1").value = 0;
        }
        else {
            input_1 = parseInt(document.getElementById("input_1").value);
            document.getElementById("input_1").value = parseInt(document.getElementById("input_1").value);
        }
            

        debugger;
        PageType = document.getElementById("PageType").value;
        var cashinout = "";

        if (PageType == "Deposit" || PageType == "CASHEX" || PageType == "CI01") {
            if ($('#outbox').is(":checked")) {
                cashinout = 'out';
            }
            else {
                cashinout = 'in';
            }
        }
        else if (PageType == "WithDraw" || PageType == "DI01")
            cashinout = 'out';
        else if (PageType == "SOD")
            cashinout = 'v';
        else if (PageType == "EOD")
            cashinout = 'c';

        if (denom == "CheckBox") {
            if (PageType == "Deposit" || PageType == "SOD" || PageType == "CASHEX" || PageType == "CI01") {
                if (cashinout == "in" || cashinout == "v") {
                    // 2000
                    var inAmt_2000 = 2000 * (in_2000 + input_2000);
                    var outAmt_2000 = 2000 * (out_2000);
                    var sum_2000 = inAmt_2000 - outAmt_2000;
                    document.getElementById("lbl_2000_DValue").innerHTML = sum_2000;

                    // 500
                    var inAmt_500 = 500 * (in_500 + input_500);
                    var outAmt_500 = 500 * (out_500);
                    var sum_500 = inAmt_500 - outAmt_500;
                    document.getElementById("lbl_500_DValue").innerHTML = sum_500;

                    // 200
                    var inAmt_200 = 200 * (in_200 + input_200);
                    var outAmt_200 = 200 * (out_200);
                    var sum_200 = inAmt_200 - outAmt_200;
                    document.getElementById("lbl_200_DValue").innerHTML = sum_200;

                    // 100
                    var inAmt_100 = 100 * (in_100 + input_100);
                    var outAmt_100 = 100 * (out_100);
                    var sum_100 = inAmt_100 - outAmt_100;
                    document.getElementById("lbl_100_DValue").innerHTML = sum_100;

                    // 50
                    var inAmt_50 = 50 * (in_50 + input_50);
                    var outAmt_50 = 50 * (out_50);
                    var sum_50 = inAmt_50 - outAmt_50;
                    document.getElementById("lbl_50_DValue").innerHTML = sum_50;

                    // 20
                    var inAmt_20 = 20 * (in_20 + input_20);
                    var outAmt_20 = 20 * (out_20);
                    var sum_20 = inAmt_20 - outAmt_20;
                    document.getElementById("lbl_20_DValue").innerHTML = sum_20;

                    // 10
                    var inAmt_10 = 10 * (in_10 + input_10);
                    var outAmt_10 = 10 * (out_10);
                    var sum_10 = inAmt_10 - outAmt_10;
                    document.getElementById("lbl_10_DValue").innerHTML = sum_10;

                    // 5
                    var inAmt_5 = 5 * (in_5 + input_5);
                    var outAmt_5 = 5 * (out_5);
                    var sum_5 = inAmt_5 - outAmt_5;
                    document.getElementById("lbl_5_DValue").innerHTML = sum_5;

                    // 2
                    var inAmt_2 = 2 * (in_2 + input_2);
                    var outAmt_2 = 2 * (out_2);
                    var sum_2 = inAmt_2 - outAmt_2;
                    document.getElementById("lbl_2_DValue").innerHTML = sum_2;

                    // 1
                    var inAmt_1 = 1 * (in_1 + input_1);
                    var outAmt_1 = 1 * (out_1);
                    var sum_1 = inAmt_1 - outAmt_1;
                    document.getElementById("lbl_1_DValue").innerHTML = sum_1;

                    if (PageType == "Deposit" || PageType == "SOD" || PageType == "CI01") {
                        document.getElementById("D_Amt").value = sum_2000 + sum_500 + sum_200 + sum_100 + sum_50 + sum_20 + sum_10 + sum_5 + sum_2 + sum_1;
                    }
                    else if (PageType == "CASHEX") {
                        document.getElementById("in_cash").value = inAmt_2000 + inAmt_500 + inAmt_200 + inAmt_100 + inAmt_50 + inAmt_20 + inAmt_10 + inAmt_5 + inAmt_2 + inAmt_1;
                    }

                }
                else if (cashinout == "out") {
                    // 2000
                    var inAmt_2000 = 2000 * (in_2000);
                    var outAmt_2000 = 2000 * (out_2000 + input_2000);
                    var sum_2000 = inAmt_2000 - outAmt_2000;
                    document.getElementById("lbl_2000_DValue").innerHTML = sum_2000;

                    // 500
                    var inAmt_500 = 500 * (in_500);
                    var outAmt_500 = 500 * (out_500 + input_500);
                    var sum_500 = inAmt_500 - outAmt_500;
                    document.getElementById("lbl_500_DValue").innerHTML = sum_500;

                    // 200
                    var inAmt_200 = 200 * (in_200);
                    var outAmt_200 = 200 * (out_200 + input_200);
                    var sum_200 = inAmt_200 - outAmt_200;
                    document.getElementById("lbl_200_DValue").innerHTML = sum_200;

                    // 100
                    var inAmt_100 = 100 * (in_100);
                    var outAmt_100 = 100 * (out_100 + input_100);
                    var sum_100 = inAmt_100 - outAmt_100;
                    document.getElementById("lbl_100_DValue").innerHTML = sum_100;

                    // 50
                    var inAmt_50 = 50 * (in_50);
                    var outAmt_50 = 50 * (out_50 + input_50);
                    var sum_50 = inAmt_50 - outAmt_50;
                    document.getElementById("lbl_50_DValue").innerHTML = sum_50;

                    // 20
                    var inAmt_20 = 20 * (in_20);
                    var outAmt_20 = 20 * (out_20 + input_20);
                    var sum_20 = inAmt_20 - outAmt_20;
                    document.getElementById("lbl_20_DValue").innerHTML = sum_20;

                    // 10
                    var inAmt_10 = 10 * (in_10);
                    var outAmt_10 = 10 * (out_10 + input_10);
                    var sum_10 = inAmt_10 - outAmt_10;
                    document.getElementById("lbl_10_DValue").innerHTML = sum_10;

                    // 5
                    var inAmt_5 = 5 * (in_5);
                    var outAmt_5 = 5 * (out_5 + input_5);
                    var sum_5 = inAmt_5 - outAmt_5;
                    document.getElementById("lbl_5_DValue").innerHTML = sum_5;

                    // 2
                    var inAmt_2 = 2 * (in_2);
                    var outAmt_2 = 2 * (out_2 + input_2);
                    var sum_2 = inAmt_2 - outAmt_2;
                    document.getElementById("lbl_2_DValue").innerHTML = sum_2;

                    // 1
                    var inAmt_1 = 1 * (in_1);
                    var outAmt_1 = 1 * (out_1 + input_1);
                    var sum_1 = inAmt_1 - outAmt_1;
                    document.getElementById("lbl_1_DValue").innerHTML = sum_1;

                    if (PageType == "Deposit" || PageType == "SOD" || PageType == "CI01") {
                        document.getElementById("D_Amt").value = sum_2000 + sum_500 + sum_200 + sum_100 + sum_50 + sum_20 + sum_10 + sum_5 + sum_2 + sum_1;
                    }
                    else if (PageType == "CASHEX")
                        document.getElementById("out_cash").value = outAmt_2000 + outAmt_500 + outAmt_200 + outAmt_100 + outAmt_50 + outAmt_20 + outAmt_10 + outAmt_5 + outAmt_2 + outAmt_1;
                }
            }
        }
        else {
            if (PageType == "Deposit" || PageType == "SOD" || PageType == "CASHEX" || PageType == "CI01") {
                if (cashinout == "in" || cashinout == "v") {
                    // 2000
                    var inAmt_2000 = 2000 * (in_2000 + input_2000);
                    var outAmt_2000 = 2000 * (out_2000);
                    var sum_2000 = inAmt_2000 - outAmt_2000;
                    document.getElementById("lbl_2000_DValue").innerHTML = sum_2000;

                    // 500
                    var inAmt_500 = 500 * (in_500 + input_500);
                    var outAmt_500 = 500 * (out_500);
                    var sum_500 = inAmt_500 - outAmt_500;
                    document.getElementById("lbl_500_DValue").innerHTML = sum_500;

                    // 200
                    var inAmt_200 = 200 * (in_200 + input_200);
                    var outAmt_200 = 200 * (out_200);
                    var sum_200 = inAmt_200 - outAmt_200;
                    document.getElementById("lbl_200_DValue").innerHTML = sum_200;

                    // 100
                    var inAmt_100 = 100 * (in_100 + input_100);
                    var outAmt_100 = 100 * (out_100);
                    var sum_100 = inAmt_100 - outAmt_100;
                    document.getElementById("lbl_100_DValue").innerHTML = sum_100;

                    // 50
                    var inAmt_50 = 50 * (in_50 + input_50);
                    var outAmt_50 = 50 * (out_50);
                    var sum_50 = inAmt_50 - outAmt_50;
                    document.getElementById("lbl_50_DValue").innerHTML = sum_50;

                    // 20
                    var inAmt_20 = 20 * (in_20 + input_20);
                    var outAmt_20 = 20 * (out_20);
                    var sum_20 = inAmt_20 - outAmt_20;
                    document.getElementById("lbl_20_DValue").innerHTML = sum_20;

                    // 10
                    var inAmt_10 = 10 * (in_10 + input_10);
                    var outAmt_10 = 10 * (out_10);
                    var sum_10 = inAmt_10 - outAmt_10;
                    document.getElementById("lbl_10_DValue").innerHTML = sum_10;

                    // 5
                    var inAmt_5 = 5 * (in_5 + input_5);
                    var outAmt_5 = 5 * (out_5);
                    var sum_5 = inAmt_5 - outAmt_5;
                    document.getElementById("lbl_5_DValue").innerHTML = sum_5;

                    // 2
                    var inAmt_2 = 2 * (in_2 + input_2);
                    var outAmt_2 = 2 * (out_2);
                    var sum_2 = inAmt_2 - outAmt_2;
                    document.getElementById("lbl_2_DValue").innerHTML = sum_2;

                    // 1
                    var inAmt_1 = 1 * (in_1 + input_1);
                    var outAmt_1 = 1 * (out_1);
                    var sum_1 = inAmt_1 - outAmt_1;
                    document.getElementById("lbl_1_DValue").innerHTML = sum_1;

                    if (PageType == "Deposit" || PageType == "SOD" || PageType == "CI01") {
                        document.getElementById("D_Amt").value = sum_2000 + sum_500 + sum_200 + sum_100 + sum_50 + sum_20 + sum_10 + sum_5 + sum_2 + sum_1;
                    }
                    else if (PageType == "CASHEX")
                        document.getElementById("in_cash").value = inAmt_2000 + inAmt_500 + inAmt_200 + inAmt_100 + inAmt_50 + inAmt_20 + inAmt_10 + inAmt_5 + inAmt_2 + inAmt_1;
                }
                else if (cashinout == "out") {
                    // 2000
                    var inAmt_2000 = 2000 * (in_2000);
                    var outAmt_2000 = 2000 * (out_2000 + input_2000);
                    var sum_2000 = inAmt_2000 - outAmt_2000;
                    document.getElementById("lbl_2000_DValue").innerHTML = sum_2000;

                    // 500
                    var inAmt_500 = 500 * (in_500);
                    var outAmt_500 = 500 * (out_500 + input_500);
                    var sum_500 = inAmt_500 - outAmt_500;
                    document.getElementById("lbl_500_DValue").innerHTML = sum_500;

                    // 200
                    var inAmt_200 = 200 * (in_200);
                    var outAmt_200 = 200 * (out_200 + input_200);
                    var sum_200 = inAmt_200 - outAmt_200;
                    document.getElementById("lbl_200_DValue").innerHTML = sum_200;

                    // 100
                    var inAmt_100 = 100 * (in_100);
                    var outAmt_100 = 100 * (out_100 + input_100);
                    var sum_100 = inAmt_100 - outAmt_100;
                    document.getElementById("lbl_100_DValue").innerHTML = sum_100;

                    // 50
                    var inAmt_50 = 50 * (in_50);
                    var outAmt_50 = 50 * (out_50 + input_50);
                    var sum_50 = inAmt_50 - outAmt_50;
                    document.getElementById("lbl_50_DValue").innerHTML = sum_50;

                    // 20
                    var inAmt_20 = 20 * (in_20);
                    var outAmt_20 = 20 * (out_20 + input_20);
                    var sum_20 = inAmt_20 - outAmt_20;
                    document.getElementById("lbl_20_DValue").innerHTML = sum_20;

                    // 10
                    var inAmt_10 = 10 * (in_10);
                    var outAmt_10 = 10 * (out_10 + input_10);
                    var sum_10 = inAmt_10 - outAmt_10;
                    document.getElementById("lbl_10_DValue").innerHTML = sum_10;

                    // 5
                    var inAmt_5 = 5 * (in_5);
                    var outAmt_5 = 5 * (out_5 + input_5);
                    var sum_5 = inAmt_5 - outAmt_5;
                    document.getElementById("lbl_5_DValue").innerHTML = sum_5;

                    // 2
                    var inAmt_2 = 2 * (in_2);
                    var outAmt_2 = 2 * (out_2 + input_2);
                    var sum_2 = inAmt_2 - outAmt_2;
                    document.getElementById("lbl_2_DValue").innerHTML = sum_2;

                    // 1
                    var inAmt_1 = 1 * (in_1);
                    var outAmt_1 = 1 * (out_1 + input_1);
                    var sum_1 = inAmt_1 - outAmt_1;
                    document.getElementById("lbl_1_DValue").innerHTML = sum_1;

                    if (PageType == "Deposit" || PageType == "SOD" || PageType == "CI01") {
                        document.getElementById("D_Amt").value = sum_2000 + sum_500 + sum_200 + sum_100 + sum_50 + sum_20 + sum_10 + sum_5 + sum_2 + sum_1;
                    }
                    else if (PageType == "CASHEX")
                        document.getElementById("out_cash").value = outAmt_2000 + outAmt_500 + outAmt_200 + outAmt_100 + outAmt_50 + outAmt_20 + outAmt_10 + outAmt_5 + outAmt_2 + outAmt_1;
                }
            }
            else if (PageType == "WithDraw" || PageType == "EOD" || PageType == "DI01") {
                var sum_2000 = 2000 * (out_2000 + input_2000);
                document.getElementById("lbl_2000_DValue").innerHTML = sum_2000;

                var sum_500 = 500 * (out_500 + input_500);
                document.getElementById("lbl_500_DValue").innerHTML = sum_500;

                var sum_200 = 200 * (out_200 + input_200);
                document.getElementById("lbl_200_DValue").innerHTML = sum_200;

                var sum_100 = 100 * (out_100 + input_100);
                document.getElementById("lbl_100_DValue").innerHTML = sum_100;

                var sum_50 = 50 * (out_50 + input_50);
                document.getElementById("lbl_50_DValue").innerHTML = sum_50;

                var sum_20 = 20 * (out_20 + input_20);
                document.getElementById("lbl_20_DValue").innerHTML = sum_20;

                var sum_10 = 10 * (out_10 + input_10);
                document.getElementById("lbl_10_DValue").innerHTML = sum_10;

                var sum_5 = 5 * (out_5 + input_5);
                document.getElementById("lbl_5_DValue").innerHTML = sum_5;

                var sum_2 = 2 * (out_2 + input_2);
                document.getElementById("lbl_2_DValue").innerHTML = sum_2;

                var sum_1 = 1 * (out_1 + input_1);
                document.getElementById("lbl_1_DValue").innerHTML = sum_1;

                document.getElementById("D_Amt").value = sum_2000 + sum_500 + sum_200 + sum_100 + sum_50 + sum_20 + sum_10 + sum_5 + sum_2 + sum_1;
            }
        }

        var outData = cashOutValidation();

        //document.getElementById("D_Amt").value = document.getElementById("lbl_2000_DValue").innerHTML + document.getElementById("lbl_500_DValue").innerHTML
        //    + document.getElementById("lbl_200_DValue").innerHTML=document.getElementById("lbl_100_DValue").innerHTML + document.getElementById("lbl_50_DValue").innerHTML
        //        + document.getElementById("lbl_20_DValue").innerHTML + document.getElementById("lbl_10_DValue").innerHTML + document.getElementById("lbl_5_DValue").innerHTML
        //        + document.getElementById("lbl_2_DValue").innerHTML + document.getElementById("lbl_1_DValue").innerHTML;
    }

    function fetchCashData() {
        debugger;
        document.getElementById("ProcessingBar").innerHTML = "Processing Request...";
        $("#ProcessingBar").show();
        var cashinout = "";
        if (PageType == "WithDraw" || PageType == "DI01")
            cashinout = "out";
        else if (PageType == "Deposit" || PageType == "CASHEX" || PageType == "CI01") {
            if ($('#outbox').is(":checked")) {
                cashinout = 'out';
            }
            else {
                cashinout = 'in';
            }
        }
        else if (PageType == "SOD")
            cashinout = 'v';
        else if (PageType == "EOD")
            cashinout = 'c';
        else {
            alert("Alert! CashType is not defined!");
            return false;
        }
        debugger;

        document.getElementById("btn_cash").disabled = true;

        $.ajax({
            type: 'POST',
            url: x + "getcashdetails",
            headers: authHeaders,
            crossDomain: true,
            data: { Intellerid: username, cashinout: cashinout },
            success: getSuccess_CashData,
            error: getErrorNoData
        });
    }

    function resetCashToZero() {
        debugger;

        // 2000
        document.getElementById("lbl_2000_in").innerHTML = 0;
        document.getElementById("lbl_2000_out").innerHTML = 0;
        document.getElementById("lbl_2000_DValue").innerHTML = 0;
        document.getElementById("lbl_2000_AValue").innerHTML = 0;
        document.getElementById("input_2000").value = 0;

        // 500
        document.getElementById("lbl_500_in").innerHTML = 0;
        document.getElementById("lbl_500_out").innerHTML = 0;
        document.getElementById("lbl_500_DValue").innerHTML = 0;
        document.getElementById("lbl_500_AValue").innerHTML = 0;
        document.getElementById("input_500").value = 0;

        // 200
        document.getElementById("lbl_200_in").innerHTML = 0;
        document.getElementById("lbl_200_out").innerHTML = 0;
        document.getElementById("lbl_200_DValue").innerHTML = 0;
        document.getElementById("lbl_200_AValue").innerHTML = 0;
        document.getElementById("input_200").value = 0;

        // 100
        document.getElementById("lbl_100_in").innerHTML = 0;
        document.getElementById("lbl_100_out").innerHTML = 0;
        document.getElementById("lbl_100_DValue").innerHTML = 0;
        document.getElementById("lbl_100_AValue").innerHTML = 0;
        document.getElementById("input_100").value = 0;

        // 50
        document.getElementById("lbl_50_in").innerHTML = 0;
        document.getElementById("lbl_50_out").innerHTML = 0;
        document.getElementById("lbl_50_DValue").innerHTML = 0;
        document.getElementById("lbl_50_AValue").innerHTML = 0;
        document.getElementById("input_50").value = 0;

        // 20
        document.getElementById("lbl_20_in").innerHTML = 0;
        document.getElementById("lbl_20_out").innerHTML = 0;
        document.getElementById("lbl_20_DValue").innerHTML = 0;
        document.getElementById("lbl_20_AValue").innerHTML = 0;
        document.getElementById("input_20").value = 0;

        // 10
        document.getElementById("lbl_10_in").innerHTML = 0;
        document.getElementById("lbl_10_out").innerHTML = 0;
        document.getElementById("lbl_10_DValue").innerHTML = 0;
        document.getElementById("lbl_10_AValue").innerHTML = 0;
        document.getElementById("input_10").value = 0;

        // 5
        document.getElementById("lbl_5_in").innerHTML = 0;
        document.getElementById("lbl_5_out").innerHTML = 0;
        document.getElementById("lbl_5_DValue").innerHTML = 0;
        document.getElementById("lbl_5_AValue").innerHTML = 0;
        document.getElementById("input_5").value = 0;

        // 2
        document.getElementById("lbl_2_in").innerHTML = 0;
        document.getElementById("lbl_2_out").innerHTML = 0;
        document.getElementById("lbl_2_DValue").innerHTML = 0;
        document.getElementById("lbl_2_AValue").innerHTML = 0;
        document.getElementById("input_2").value = 0;

        // 1
        document.getElementById("lbl_1_in").innerHTML = 0;
        document.getElementById("lbl_1_out").innerHTML = 0;
        document.getElementById("lbl_1_DValue").innerHTML = 0;
        document.getElementById("lbl_1_AValue").innerHTML = 0;
        document.getElementById("input_1").value = 0;

    }

    function availableDenom() {

        debugger;

        //var username = document.getElementById("loginid").value;

        $.ajax({
            type: 'POST',
            url: x + "AvailableDenoms",
            headers: authHeaders,
            crossDomain: true,
            data: { Tellerid: username },
            success: getSuccess_CashData_Sod,
            error: getErrorNoDataSod

        });

    }

    function getSuccess_CashData_Sod(result) {
        debugger;
        var available_2000 = 0;
        var available_500 = 0;
        var available_200 = 0;
        var available_100 = 0;
        var available_50 = 0;
        var available_20 = 0;
        var available_10 = 0;
        var available_5 = 0;
        var available_2 = 0;
        var available_1 = 0;

        debugger;
        var DData = ["2000", "500", "200", "100", "50", "20", "10", "5", "2", "1"];

        for (var i = 0; i < DData.length; i++) {
            for (var j = 0; j < result.length; j++) {
                if (result[j].Denoms == DData[i]) {
                    var dCount = parseInt(result[j].DenomCount);
                    if (result[j].Denoms == "2000") {
                        available_2000 += dCount;
                    }
                    else if (result[j].Denoms == "500") {
                        available_500 += dCount;
                    }
                    else if (result[j].Denoms == "200") {
                        available_200 += dCount;
                    }
                    else if (result[j].Denoms == "100") {
                        available_100 += dCount;
                    }
                    else if (result[j].Denoms == "50") {
                        available_50 += dCount;
                    }
                    else if (result[j].Denoms == "20") {
                        available_20 += dCount;
                    }
                    else if (result[j].Denoms == "10") {
                        available_10 += dCount;
                    }
                    else if (result[j].Denoms == "5") {
                        available_5 += dCount;
                    }
                    else if (result[j].Denoms == "2") {
                        available_2 += dCount;
                    }
                    else if (result[j].Denoms == "1") {
                        available_1 += dCount;
                    }
                }
            }
        }
        debugger;
        document.getElementById("lbl_2000_AValue").innerHTML = available_2000;
        document.getElementById("lbl_500_AValue").innerHTML = available_500;
        document.getElementById("lbl_200_AValue").innerHTML = available_200;
        document.getElementById("lbl_100_AValue").innerHTML = available_100;
        document.getElementById("lbl_50_AValue").innerHTML = available_50;
        document.getElementById("lbl_20_AValue").innerHTML = available_20;
        document.getElementById("lbl_10_AValue").innerHTML = available_10;
        document.getElementById("lbl_5_AValue").innerHTML = available_5;
        document.getElementById("lbl_2_AValue").innerHTML = available_2;
        document.getElementById("lbl_1_AValue").innerHTML = available_1;

        var outData = cashOutValidation();
    }

    function getSuccess_CashData(result) {
        debugger;
        //alert("Sucess Call");

        availableDenom();
        debugger;

        document.getElementById("sniId").value = result[0].id;

        var in_2000 = 0;
        var out_2000 = 0;
        var dval_2000 = 0;
        
        var in_500 = 0;
        var out_500 = 0;
        var dval_500 = 0;
        
        var in_200 = 0;
        var out_200 = 0;
        var dval_200 = 0;
        
        var in_100 = 0;
        var out_100 = 0;
        var dval_100 = 0;
        
        var in_50 = 0;
        var out_50 = 0;
        var dval_50 = 0;
        
        var in_20 = 0;
        var out_20 = 0;
        var dval_20 = 0;
        
        var in_10 = 0;
        var out_10 = 0;
        var dval_10 = 0;
        
        var in_5 = 0;
        var out_5 = 0;
        var dval_5 = 0;
        var in_2 = 0;
        var out_2 = 0;
        var dval_2 = 0;
        var in_1 = 0;
        var out_1 = 0;
        var dval_1 = 0;

        var DData = ["2000", "500", "200", "100", "50", "20", "10", "5", "2", "1"];

        for (var i = 0; i < DData.length; i++) {
            for (var j = 0; j < result.length; j++) {
                if (result[j].currncy_denom == DData[i]) {
                    if (PageType == "Deposit" || PageType == "SOD" || PageType == "CASHEX" || PageType == "CI01") {
                        if (result[j].cashinout == 'in' || result[j].cashinout == 'v') {
                            if (result[j].currncy_denom == "2000") {
                                in_2000 += 1;
                                dval_2000 += 2000;
                            }
                            else if (result[j].currncy_denom == "500") {
                                in_500 += 1;
                                dval_500 += 500;
                            }
                            else if (result[j].currncy_denom == "200") {
                                in_200 += 1;
                                dval_200 += 200;
                            }
                            else if (result[j].currncy_denom == "100") {
                                in_100 += 1;
                                dval_100 += 100;
                            }
                            else if (result[j].currncy_denom == "50") {
                                in_50 += 1;
                                dval_50 += 50;
                            }
                            else if (result[j].currncy_denom == "20") {
                                in_20 += 1;
                                dval_20 += 20;
                            }
                            else if (result[j].currncy_denom == "10") {
                                in_10 += 1;
                                dval_10 += 10;
                            }
                            else if (result[j].currncy_denom == "5") {
                                in_5 += 1;
                                dval_5 += 5;
                            }
                            else if (result[j].currncy_denom == "2") {
                                in_2 += 1;
                                dval_2 += 2;
                            }
                            else if (result[j].currncy_denom == "1") {
                                in_1 += 1;
                                dval_1 += 1;
                            }
                        }
                        else if (result[j].cashinout == 'out') {
                            if (result[j].currncy_denom == "2000") {
                                out_2000 += 1;
                                dval_2000 -= 2000;
                            }
                            else if (result[j].currncy_denom == "500") {
                                out_500 += 1;
                                dval_500 -= 500;
                            }
                            else if (result[j].currncy_denom == "200") {
                                out_200 += 1;
                                dval_200 -= 200;
                            }
                            else if (result[j].currncy_denom == "100") {
                                out_100 += 1;
                                dval_100 -= 100;
                            }
                            else if (result[j].currncy_denom == "50") {
                                out_50 += 1;
                                dval_50 -= 50;
                            }
                            else if (result[j].currncy_denom == "20") {
                                out_20 += 1;
                                dval_20 -= 20;
                            }
                            else if (result[j].currncy_denom == "10") {
                                out_10 += 1;
                                dval_10 -= 10;
                            }
                            else if (result[j].currncy_denom == "5") {
                                out_5 += 1;
                                dval_5 -= 5;
                            }
                            else if (result[j].currncy_denom == "2") {
                                out_2 += 1;
                                dval_2 -= 2;
                            }
                            else if (result[j].currncy_denom == "1") {
                                out_1 += 1;
                                dval_1 -= 1;
                            }
                        }
                    }
                    else if (PageType == "WithDraw" || PageType == "EOD" || PageType == "DI01") {
                        if (result[j].currncy_denom == "2000") {
                            out_2000 += 1;
                            dval_2000 += 2000;
                        }
                        else if (result[j].currncy_denom == "500") {
                            out_500 += 1;
                            dval_500 += 500;
                        }
                        else if (result[j].currncy_denom == "200") {
                            out_200 += 1;
                            dval_200 += 200;
                        }
                        else if (result[j].currncy_denom == "100") {
                            out_100 += 1;
                            dval_100 += 100;
                        }
                        else if (result[j].currncy_denom == "50") {
                            out_50 += 1;
                            dval_50 += 50;
                        }
                        else if (result[j].currncy_denom == "20") {
                            out_20 += 1;
                            dval_20 += 20;
                        }
                        else if (result[j].currncy_denom == "10") {
                            out_10 += 1;
                            dval_10 += 10;
                        }
                        else if (result[j].currncy_denom == "5") {
                            out_5 += 1;
                            dval_5 += 5;
                        }
                        else if (result[j].currncy_denom == "2") {
                            out_2 += 1;
                            dval_2 += 2;
                        }
                        else if (result[j].currncy_denom == "1") {
                            out_1 += 1;
                            dval_1 += 1;
                        }
                    }
                }
            }
        }

        document.getElementById("lbl_2000_in").innerHTML = in_2000;
        document.getElementById("lbl_2000_out").innerHTML = out_2000;
        document.getElementById("lbl_500_in").innerHTML = in_500;
        document.getElementById("lbl_500_out").innerHTML = out_500;
        document.getElementById("lbl_200_in").innerHTML = in_200;
        document.getElementById("lbl_200_out").innerHTML = out_200;
        document.getElementById("lbl_100_in").innerHTML = in_100;
        document.getElementById("lbl_100_out").innerHTML = out_100;
        document.getElementById("lbl_50_in").innerHTML = in_50;
        document.getElementById("lbl_50_out").innerHTML = out_50;
        document.getElementById("lbl_20_in").innerHTML = in_20;
        document.getElementById("lbl_20_out").innerHTML = out_20;
        document.getElementById("lbl_10_in").innerHTML = in_10;
        document.getElementById("lbl_10_out").innerHTML = out_10;
        document.getElementById("lbl_5_in").innerHTML = in_5;
        document.getElementById("lbl_5_out").innerHTML = out_5;
        document.getElementById("lbl_2_in").innerHTML = in_2;
        document.getElementById("lbl_2_out").innerHTML = out_2;
        document.getElementById("lbl_1_in").innerHTML = in_1;
        document.getElementById("lbl_1_out").innerHTML = out_1;

        document.getElementById("lbl_2000_DValue").innerHTML = dval_2000;
        document.getElementById("lbl_500_DValue").innerHTML = dval_500;
        document.getElementById("lbl_200_DValue").innerHTML = dval_200;
        document.getElementById("lbl_100_DValue").innerHTML = dval_100;
        document.getElementById("lbl_50_DValue").innerHTML = dval_50;
        document.getElementById("lbl_20_DValue").innerHTML = dval_20;
        document.getElementById("lbl_10_DValue").innerHTML = dval_10;
        document.getElementById("lbl_5_DValue").innerHTML = dval_5;
        document.getElementById("lbl_2_DValue").innerHTML = dval_2;
        document.getElementById("lbl_1_DValue").innerHTML = dval_1;

        if (PageType == "Deposit" || PageType == "WithDraw" || PageType == "DI01" || PageType == "CI01") {
            document.getElementById("lbl_total_in").innerHTML = in_2000 + in_500 + in_200 + in_100 + in_50 + in_20 + in_10 + in_5 + in_2 + in_1;
            document.getElementById("lbl_total_out").innerHTML = out_2000 + out_500 + out_200 + out_100 + out_50 + out_20 + out_10 + out_5 + out_2 + out_1;
            document.getElementById("D_Amt").value = dval_2000 + dval_500 + dval_200 + dval_100 + dval_50 + dval_20 + dval_10 + dval_5 + dval_2 + dval_1;
            if (PageType == "CASHEX") {
                document.getElementById("in_cash").value = dval_2000 + dval_500 + dval_200 + dval_100 + dval_50 + dval_20 + dval_10 + dval_5 + dval_2 + dval_1;
            }
        }
        else if (PageType == "SOD") {
            document.getElementById("D_Amt").value = dval_2000 + dval_500 + dval_200 + dval_100 + dval_50 + dval_20 + dval_10 + dval_5 + dval_2 + dval_1;
            document.getElementById("denom_count").value = in_2000 + in_500 + in_200 + in_100 + in_50 + in_20 + in_10 + in_5 + in_2 + in_1;
        }
        else if (PageType == "EOD") {
            document.getElementById("D_Amt").value = dval_2000 + dval_500 + dval_200 + dval_100 + dval_50 + dval_20 + dval_10 + dval_5 + dval_2 + dval_1;
            document.getElementById("denom_count").value = out_2000 + out_500 + out_200 + out_100 + out_50 + out_20 + out_10 + out_5 + out_2 + out_1;
        }

        $("#ProcessingBar").hide();
        $("#div_denom_tbl").show();
        document.getElementById("btn_cash").disabled = false;
    }

    function cashOutValidation() {
        debugger;
        outputData = true;

        //var aval_2000 = parseInt(document.getElementById("lbl_2000_AValue").innerHTML);
        //var aval_500 = parseInt(document.getElementById("lbl_500_AValue").innerHTML);
        //var aval_200 = parseInt(document.getElementById("lbl_200_AValue").innerHTML);
        //var aval_100 = parseInt(document.getElementById("lbl_100_AValue").innerHTML);
        //var aval_50 = parseInt(document.getElementById("lbl_50_AValue").innerHTML);
        //var aval_20 = parseInt(document.getElementById("lbl_20_AValue").innerHTML);
        //var aval_10 = parseInt(document.getElementById("lbl_10_AValue").innerHTML);
        //var aval_5 = parseInt(document.getElementById("lbl_5_AValue").innerHTML);
        //var aval_2 = parseInt(document.getElementById("lbl_2_AValue").innerHTML);
        //var aval_1 = parseInt(document.getElementById("lbl_1_AValue").innerHTML);

        var cashinout = "";
        if (PageType == "Deposit" || PageType == "CASHEX" || PageType == "CI01") {
            if ($('#outbox').is(":checked")) {
                cashinout = 'out';
            }
            else {
                cashinout = 'in';
            }
        }
        else if (PageType == "WithDraw" || PageType == "DI01")
            cashinout = 'out';
        else if (PageType == "SOD")
            cashinout = 'v';
        else if (PageType == "EOD")
            cashinout = 'c';

        if (PageType == "WithDraw" || cashinout == "out" || PageType == "EOD" || PageType == "DI01") {
            debugger;
            // 2000
            CheckDenomFlag("2000");

            debugger;
            // 500
            CheckDenomFlag("500");

            // 200
            CheckDenomFlag("200");

            // 100
            CheckDenomFlag("100");

            // 50
            CheckDenomFlag("50");

            // 20
            CheckDenomFlag("20");

            // 10
            debugger;
            CheckDenomFlag("10");

            // 5
            CheckDenomFlag("5");

            // 2
            CheckDenomFlag("2");

            // 1
            CheckDenomFlag("1");

            debugger;
            if (outputData == false) {
                document.getElementById("btn_insert_cash").disabled = true;
                return false;
            }
            else {
                document.getElementById("btn_insert_cash").disabled = false;
                return true;
            }
                
        }
        else {
            $("#row_2000").css('color', '');
            $("#row_500").css('color', '');
            $("#row_200").css('color', '');
            $("#row_100").css('color', '');
            $("#row_50").css('color', '');
            $("#row_20").css('color', '');
            $("#row_10").css('color', '');
            $("#row_5").css('color', '');
            $("#row_2").css('color', '');
            $("#row_1").css('color', '');
        }
    }

    function ManualDataEntry() {

        var outData = cashOutValidation();

        if (outData == false) {
            if (PageType == "WithDraw" || PageType == "EOD" || PageType == "DI01") {
                document.getElementById("ProcessingBar").innerHTML = "Please check Denom count!";
                $("#ProcessingBar").show();
            }
            return false;
        }

        //------------ Added on 2022-03-24 ----------- By Aniketadit Jamuar ----------- Begin
        debugger;
        var dArray_insert = [];
        var dCount_insert = [];

        var d2000 = document.getElementById("input_2000").value;
        if (d2000 != null && d2000 != "") {
            if (d2000 > 0) {
                dArray_insert.push("2000");
                dCount_insert.push(parseInt(d2000));
            }
        }

        var d500 = document.getElementById("input_500").value;
        if (d500 != null && d500 != "") {
            if (d500 > 0) {
                dArray_insert.push("500");
                dCount_insert.push(parseInt(d500));
            }
        }

        var d200 = document.getElementById("input_200").value;
        if (d200 != null && d200 != "") {
            if (d200 > 0) {
                dArray_insert.push("200");
                dCount_insert.push(parseInt(d200));
            }
        }

        var d100 = document.getElementById("input_100").value;
        if (d100 != null && d100 != "") {
            if (d100 > 0) {
                dArray_insert.push("100");
                dCount_insert.push(parseInt(d100));
            }
        }

        var d50 = document.getElementById("input_50").value;
        if (d50 != null && d50 != "") {
            if (d50 > 0) {
                dArray_insert.push("50");
                dCount_insert.push(parseInt(d50));
            }
        }

        var d20 = document.getElementById("input_20").value;
        if (d20 != null && d20 != "") {
            if (d20 > 0) {
                dArray_insert.push("20");
                dCount_insert.push(parseInt(d20));
            }
        }

        var d10 = document.getElementById("input_10").value;
        if (d10 != null && d10 != "") {
            if (d10 > 0) {
                dArray_insert.push("10");
                dCount_insert.push(parseInt(d10));
            }
        }

        var d5 = document.getElementById("input_5").value;
        if (d5 != null && d5 != "") {
            if (d5 > 0) {
                dArray_insert.push("5");
                dCount_insert.push(parseInt(d5));
            }
        }

        var d2 = document.getElementById("input_2").value;
        if (d2 != null && d2 != "") {
            if (d2 > 0) {
                dArray_insert.push("2");
                dCount_insert.push(parseInt(d2));
            }
        }

        var d1 = document.getElementById("input_1").value;
        if (d1 != null && d1 != "") {
            if (d1 > 0) {
                dArray_insert.push("1");
                dCount_insert.push(parseInt(d1));
            }
        }

        
        //debugger;;
        //------------ Added on 2022-03-24 ----------- By Aniketadit Jamuar ----------- End

        var count = 1;
        //var INR = 'INR';
        var x = document.getElementById("urlVal").value;
        var y = "ManualDataEntry";

        //new
        debugger;
        var cashinout = ""; //m

        if (PageType == "WithDraw" || PageType == "DI01")
            cashinout = 'out';
        else if (PageType == "SOD")
            cashinout = 'v';
        else if (PageType == "EOD")
            cashinout = 'c';
        else {
            if ($('#outbox').is(":checked")) {
                cashinout = 'out';
            }
            else {
                cashinout = 'in';
            }
        }

        //new
        //debugger;

        //var username = document.getElementById("loginid").value;
        var machineserialno = "";
        var sni_countid = document.getElementById("sniId").value;

        resetCashToZero();

        document.getElementById("ProcessingBar").innerHTML = "Processing Request...";
        $("#ProcessingBar").show();

        debugger;
        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            data: { Tellerid: username, Denoms: dArray_insert, DenomCount: dCount_insert, maip: machineserialno, count_id: sni_countid, local: 'INR', cashinout: cashinout },
            success: getSuccessCashData,
            error: getErrorNoData
        });
    }

    function getSuccessCashData(result) {
        //alert("The " + JSON.stringify(result) + " record for cash posted successfully.");
        fetchCashData();
    }

    function SubmitData() {
        debugger;
        if (PageType == "SOD" || PageType == "EOD" || PageType == "CASHEX") {
            var dArray = [];
            var dCount = [];

            dArray.push("2000");
            dCount.push(document.getElementById("lbl_2000_in").innerHTML);
            dArray.push("500");
            dCount.push(document.getElementById("lbl_500_in").innerHTML);
            dArray.push("200");
            dCount.push(document.getElementById("lbl_200_in").innerHTML);
            dArray.push("100");
            dCount.push(document.getElementById("lbl_100_in").innerHTML);
            dArray.push("50");
            dCount.push(document.getElementById("lbl_50_in").innerHTML);
            dArray.push("20");
            dCount.push(document.getElementById("lbl_20_in").innerHTML);
            dArray.push("10");
            dCount.push(document.getElementById("lbl_10_in").innerHTML);
            var transType = "";
            dArray.push("5");
            dCount.push(document.getElementById("lbl_5_in").innerHTML);
            dArray.push("1");
            dCount.push(document.getElementById("lbl_1_in").innerHTML);

            var acc = document.getElementById("AccNo").value;
            var amt = document.getElementById("D_Amt").value;

            $("#div_confirm_msg").hide();
            $("#div_reject_button").hide();
            $("#tbl_verf_fail").hide();
            $("#tbl_verf_result").show();
            $("#div_submit_fail").hide();
            $("#div_response_success").hide();

            $('#successMsg').removeClass('bg-success').addClass('bg-info');
            document.getElementById("successMsg").innerHTML = "Processing Request...";

            var y = "PostData";
            debugger;
            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                data: {
                    /*Tellerid: username, Denoms: dArray, DenomCount: dCount, maip: machineserialno, count_id: sni_countid, local: 'INR'*/
                    pType: 'submit', INtellerid: username, response: 2, transtype: PageType, transRefNo: acc, CreditAccountNo: acc,
                    SlipAmount: amt, ChqAmount: amt, Denoms: dArray, DenomCount: dCount
                },
                success: SubmitSuccessMsg,
                error: getErrorMsg
            });
        }
    }

    function VerifyCashData() {
        debugger;
        if (PageType == "SOD" || PageType == "EOD") {
            $("#div_confirm_msg").hide();
            $("#div_reject_button").hide();
        }

        $("#tbl_verf_fail").show();
        $("#div_submit_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        var d2000 = document.getElementById("input_2000").value;
        if (d2000 != null && d2000 != "") {
            if (d2000 > 0) {
                document.getElementById("errorMsg").innerHTML = "Please Click on INSERT CASH button to Proceed";
                return false;
            }
        }

        var d500 = document.getElementById("input_500").value;
        if (d500 != null && d500 != "") {
            if (d500 > 0) {
                document.getElementById("errorMsg").innerHTML = "Please Click on INSERT CASH button to Proceed";
                return false;
            }
        }

        var d200 = document.getElementById("input_200").value;
        if (d200 != null && d200 != "") {
            if (d200 > 0) {
                document.getElementById("errorMsg").innerHTML = "Please Click on INSERT CASH button to Proceed";
                return false;
            }
        }

        var d100 = document.getElementById("input_100").value;
        if (d100 != null && d100 != "") {
            if (d100 > 0) {
                document.getElementById("errorMsg").innerHTML = "Please Click on INSERT CASH button to Proceed";
                return false;
            }
        }

        var d50 = document.getElementById("input_50").value;
        if (d50 != null && d50 != "") {
            if (d50 > 0) {
                document.getElementById("errorMsg").innerHTML = "Please Click on INSERT CASH button to Proceed";
                return false;
            }
        }

        var d20 = document.getElementById("input_20").value;
        if (d20 != null && d20 != "") {
            if (d20 > 0) {
                document.getElementById("errorMsg").innerHTML = "Please Click on INSERT CASH button to Proceed";
                return false;
            }
        }

        var d10 = document.getElementById("input_10").value;
        if (d10 != null && d10 != "") {
            if (d10 > 0) {
                document.getElementById("errorMsg").innerHTML = "Please Click on INSERT CASH button to Proceed";
                return false;
            }
        }

        var d5 = document.getElementById("input_5").value;
        if (d5 != null && d5 != "") {
            if (d5 > 0) {
                document.getElementById("errorMsg").innerHTML = "Please Click on INSERT CASH button to Proceed";
                return false;
            }
        }

        var d2 = document.getElementById("input_2").value;
        if (d2 != null && d2 != "") {
            if (d2 > 0) {
                document.getElementById("errorMsg").innerHTML = "Please Click on INSERT CASH button to Proceed";
                return false;
            }
        }

        var d1 = document.getElementById("input_1").value;
        if (d1 != null && d1 != "") {
            if (d1 > 0) {
                document.getElementById("errorMsg").innerHTML = "Please Click on INSERT CASH button to Proceed";
                return false;
            }
        }

        if (PageType == "Deposit" || PageType == "WithDraw" || PageType == "DI01" || PageType == "CI01") {
            if (parseFloat(document.getElementById("Instr_Amt").value) != parseFloat(document.getElementById("D_Amt").value)) {
                document.getElementById("errorMsg").innerHTML = "Instrument and Denom Amount is not matching";
                return false;
            }

            var outData = cashOutValidation();
            if (outData == false) {
                document.getElementById("errorMsg").innerHTML = "Mismatched denom count!";
                return false;
            }
        }
        debugger;
        if (PageType == "CASHEX") {
            if (parseFloat(document.getElementById("in_cash").value) != parseFloat(document.getElementById("out_cash").value)) {
                document.getElementById("errorMsg").innerHTML = "Cash in and out amount is not matching";
                return false;
            }
            else if (parseFloat(document.getElementById("in_cash").value) == 0 || parseFloat(document.getElementById("in_cash").value == null)) {
                document.getElementById("errorMsg").innerHTML = "Cash in value cannot be null";
                return false;
            }
            else if (parseFloat(document.getElementById("out_cash").value) == 0 || parseFloat(document.getElementById("out_cash").value == null)) {
                document.getElementById("errorMsg").innerHTML = "Cash out value cannot be null";
                return false;
            }
        }

        debugger;
        $("#tbl_verf_fail").hide();
        $("#div_submit_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_response_success").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";

        if (PageType == "Deposit" || PageType == "WithDraw" || PageType == "DI01" || PageType == "CI01") {
            document.getElementById("errorMsg").innerHTML = "Error";
            var countId = document.getElementById("cid").value;
            var sniId = document.getElementById("sniId").value;

            refno = document.getElementById("refno").value;
            var L2_required = "N";

            var transType = "";
            var data_amt = parseFloat(document.getElementById("Instr_Amt").value);

            debugger;
            //if (PageType == "Deposit") {
            //transType = "CASHDEP";
            if (PageType == "Deposit" || PageType == "CI01" || PageType == "DI01") {
                if (PageType == "CI01") {
                    transType = "CI01";
                }
                else if (PageType == "DI01") {
                    transType = "DI01";
                }
                else if (PageType == "Deposit") {
                    transType = "CASHDEP";
                }
                

                var l2start = parseFloat(document.getElementById("L2StartLimit").value);
                var CheckerModule = document.getElementById("CheckerModule").value;

                if (CheckerModule != "Y")
                    L2_required = "N";
                else if (data_amt >= parseFloat(l2start))
                    L2_required = "Y";
                else
                    L2_required = "N";

            }
            else if (PageType == "WithDraw" || PageType == "DI01") {
                if (PageType == "DI01") {
                    transType = "DI01";
                }
                else {
                    var insttype = document.getElementById("inst_type").innerHTML;
                    if (insttype == "Cheque")
                        transType = "CASHWDL01";
                    else
                        transType = "CASHWDL02";
                }
                
            }

            var AccNo = document.getElementById("accno").innerHTML;

            var transPart = document.getElementById("Trans_Par").innerHTML;
            var remark1 = document.getElementById("remark1").innerHTML;
            var rpt_code = document.getElementById("rtp_code").innerHTML;

            debugger;

            var y = 'postCheckerWithdrawData';

            $.ajax({
                url: x + y,
                headers: authHeaders,
                type: 'POST',
                data: {
                    btnVal: 'CASH_SUBMIT', count_id: countId, sni_id: sniId, RefNo: refno, UserName: username, Verf: L2_required, BankCode: BankCode,
                    transactionType: transType, AccNo: AccNo, Amt: data_amt, transaction_particular: transPart, remark_1: remark1, report_code: rpt_code
                },
                success: SuccessMsg,
                error: getErrorMsg
            });
        }
        else {
            $("#div_confirm_msg").show();
            $("#div_reject_button").show();
            $("#tbl_verf_fail").hide();
            $("#tbl_verf_result").hide();
            $("#div_submit_fail").hide();
            $("#div_response_success").hide();
        }

    }

    function SubmitSuccessMsg() {
        debugger;
        $("#tbl_verf_fail").hide();
        $("#div_submit_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_response_success").show();

        $('#successMsg').removeClass('bg-info').addClass('bg-success');
        document.getElementById("successMsg").innerHTML = "Data Submitted";
    }

    function SuccessMsg(result) {
        debugger;
        $("#tbl_verf_fail").hide();
        $("#div_submit_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_response_success").show();

        if (PageType == "Deposit") {
            if (BankCode == "240") {
                debugger;
                document.getElementById("successMsg").innerHTML = "Successful! Refno: " + refno;
            }
            else if (BankCode == "059") {
                var outData = result.split("|");
                if (outData[1] != null && outData[1] != "") {
                    if (outData[1] == "YES")
                        document.getElementById("successMsg").innerHTML = "Successful! Refno: " + refno + "; CBS Ref: " + outData[2];
                    else
                        document.getElementById("successMsg").innerHTML = "Successful! Refno: " + refno;
                }
                else
                    document.getElementById("successMsg").innerHTML = "Successful! Refno: " + refno;
            }
        }
        else
            document.getElementById("successMsg").innerHTML = "Successful! Refno: " + refno;

        //window.open(rooturl + "DepositWithdraw/CheckerWithdrawList", "_self"),
    }

    function getErrorMsg(result) {
        debugger;
        $("#tbl_verf_fail").show();
        $("#div_submit_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_response_success").hide();

        document.getElementById("errorMsg").innerHTML = result.responseText;
    }

    function returnToCheckerList() {
        if (PageType == "WithDraw")
            window.open(rooturl + "Checker/Index", "_self");
        else if (PageType == "Deposit")
            window.open(rooturl + "DepositWithdraw/Deposit", "_self");
        else if (PageType == "SOD" || PageType == "EOD" || PageType == "CASHEX")
            window.open(rooturl + "BranchSod/CashData?Name=" + PageType, "_self");
        else if (PageType == "DI01")
            window.open(rooturl + "CI_DI_Form/DISelectionPage", "_self");
        else if (PageType == "CI01")
            window.open(rooturl + "CI_DI_Form/CISelectionPage", "_self");
    }

    function ResetCashCall() {
        // Reset Logic Begin
        $("#div_reset_msg_cash").show();
        $("#div_reset_button_cash").show();
        $("#btn_close_reset_cash").show();
        $("#btn_yes_reset_cash").show();
        $("#btn_no_reset_cash").show();
        $("#div_reset_success_cash").hide();
        $("#tbl_reset_response_cash").hide();
        $("#success_reset_cash").hide();
        $("#failed_reset_cash").hide();
        $("#div_reload_page_button_cash").hide();
        $("#btn_reload_cash").hide();
        // Reset Logic End
    }

    function ResetCashData() {

        flag = "reset";
        var loginid = document.getElementById("loginid").value;
        var y = "PostData";

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            data: { pType: 'reset', maip: loginid, INtellerid: loginid },
            success: getSuccessPush_Cash
            //error: getError
        });

    }

    function getSuccessPush_Cash(result) {
        debugger;
        resetCashToZero();

        document.getElementById("D_Amt").value = "";

        $("#div_denom_tbl").hide();

        // Reset Logic Begin
        $("#div_reset_msg_cash").hide();
        $("#div_reset_button_cash").hide();
        $("#btn_close_reset_cash").hide();
        $("#btn_yes_reset_cash").hide();
        $("#btn_no_reset_cash").hide();

        $("#div_reset_success_cash").show();
        $("#tbl_reset_response_cash").show();
        $("#success_reset_cash").hide();
        $("#failed_reset_cash").hide();
        $("#div_reload_page_button_cash").show();
        $("#btn_reload_cash").show();
        // Reset Logic End

        if (result > 0) {
            $("#success_reset_cash").show();
            document.getElementById("success_reset_cash").innerHTML = "Data Reset Successful!";
        }
        else {
            $("#failed_reset_cash").show();
            document.getElementById("failed_reset_cash").innerHTML = "No Data to reset!";
        }
    }

    function CheckDenomFlag(denom) {
        debugger;
        var outCash = parseInt(document.getElementById("lbl_" + denom + "_out").innerHTML);
        var input = parseInt(document.getElementById("input_" + denom).value);
        var inCash = parseInt(document.getElementById("lbl_" + denom + "_in").innerHTML);
        var AVal = parseInt(document.getElementById("lbl_" + denom + "_AValue").innerHTML);
        // updated change
        debugger;
        if (PageType == "CASHEX") {
            if ((inCash + AVal) < (outCash + input)) {
                outputData = false;
                $("#row_" + denom).css('color', 'red');
                return false;
            }
            else
                $("#row_" + denom).css('color', '');
        }
        else {
            if (AVal < (outCash + input)) {
                outputData = false;
                $("#row_" + denom).css('color', 'red');
                //return false;
            }
            else
                $("#row_" + denom).css('color', '');
        }

        debugger;
        //return true;

    }

}
catch (e) {
    alert(e.message);
}