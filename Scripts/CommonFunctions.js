////const { type } = require("jquery");

function switchimage(btnclick, type) {

    if (PerviousType == "") {
        tempSrc = document.getElementById("FG").src;
        PerviousType = "BOT";
    }

    // UV IMAGE "BOT_UV"

    //document.getElementById("FG").src = tempSrc.replace(/BOT_RGB/g, type).replace(/TOP_RGB/g, type).replace(/BOT_IRR/g, type).replace(/TOP_QIR/g, type);
    document.getElementById("FG").src = tempSrc.replace(/BOT_RGB/g, type);

    if (type == "FRONT" || type == "BACK") {
        //alert("tiff function call");

        $.ajax({
            url: rooturl + 'TransferCts/ImageToBase64CompressTiff',
            dataType: 'html',
            //data: { imgpath: tempSrc },
            data: { imgpath: tempSrc.replace(/BOT_RGB/g, btnclick) },
            success: function (imgdata) {
                document.getElementById("FG").src = imgdata;
            }
        });

        //if (type == "FRONT") {

        //}
        //else {
        //    $.ajax({
        //        url: rooturl + 'TransferCts/ImageToBase64CompressTiff',
        //        dataType: 'html',
        //        //data: { imgpath: tempSrc },
        //        data: { imgpath: tempSrc.replace(/BOT_RGB/g, btnclick) },
        //        success: function (imgdata) {
        //            //debugger;

        //            document.getElementById("FG").src = imgdata;

        //            //document.getElementById("FG").style.display = 'none';
        //            //document.getElementById("tiff").style.display = 'block';
        //        }
        //    });
        //}

    }
}

function switchimageGrid(btnclick, type) {
    //debugger;

    tempSrc = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[12].innerHTML;

    //document.getElementById("FG").src = tempSrc.replace(/BOT_RGB/g, type).replace(/TOP_RGB/g, type).replace(/BOT_IRR/g, type).replace(/TOP_QIR/g, type);


    if (btnclick == "FRONT" || btnclick == "BACK") {
        //alert("tiff function call");

        $.ajax({
            url: rooturl + 'TransferCts/ImageToBase64CompressTiff',
            dataType: 'html',
            //data: { imgpath: tempSrc },
            data: { imgpath: tempSrc.replace(/BOT_RGB/g, type) },
            success: function (imgdata) {
                //debugger;

                document.getElementById("FG").src = imgdata;

                //document.getElementById("FG").style.display = 'none';
                //document.getElementById("tiff").style.display = 'block';
            }
        });

    }
    else
        document.getElementById("FG").src = tempSrc.replace(/BOT_RGB/g, type);
}

function GetPayeee(Type) {
    debugger;

    $("#ProcessingBar").hide();
    //$("#span_acc_status").hide();

    if (Type == "NONAME" || Type == "TRF")
        Type = transtype;
    else if (Type == "RTGS_03_04")
        Type = transtype;

    if (Type == "CASHWDL" || Type == "CASHWDL01" || Type == "CASHWDL02")
        document.getElementById("btn_verf_sign").disabled = true;

    var AccNo = "";

    debugger;
    if (transtype == "TRF02") {
        debugger;
        //var depositFlag = document.getElementById("debit").checked;
        DepositCreditFlag();

        if (depositFlag == true) {
            // deposit details
            AccNo = document.getElementById("DebitAccountNo").value;
            document.getElementById("accStatus_debit").innerHTML = "";

            var Pay = "<select id='DebitAccHolderName' class='form-control' onfocusout='setTableData()'>";
            Pay = Pay + '</select>';
            $('#div_DebitAccHolderName').html(Pay);


            //debugger;
            document.getElementById("FinScheme_debit").innerHTML = "";
            document.getElementById("FinFreeze_debit").innerHTML = "";
            document.getElementById("FinMOP_debit").innerHTML = "";
            document.getElementById("NREFlag_debit").innerHTML = "";
            document.getElementById("FinSchemeType_debit").innerHTML = "";
            document.getElementById("FinAccOwner_debit").innerHTML = "";
        }
        else {
            // credit details
            AccNo = document.getElementById("CreditAccountNo").value;
            document.getElementById("accStatus_credit").innerHTML = "";

            var Pay = "<select id='CreditAccHolderName' class='form-control' onfocusout='setTableData()'>";
            Pay = Pay + '</select>';
            $('#div_CreditAccHolderName').html(Pay);


            //debugger;
            document.getElementById("FinScheme_credit").innerHTML = "";
            document.getElementById("FinFreeze_credit").innerHTML = "";
            document.getElementById("FinMOP_credit").innerHTML = "";
            document.getElementById("NREFlag_credit").innerHTML = "";
            document.getElementById("FinSchemeType_credit").innerHTML = "";
            document.getElementById("FinAccOwner_credit").innerHTML = "";
        }
    }
    else {
        if (Type == "RTGS03" || Type == "RTGS04" || Type == "RTGS_03_04")
            AccNo = document.getElementById("chq_account_no").value;
        else
            AccNo = document.getElementById("AccountNo").value;

       /* AccNo = document.getElementById("AccountNo").value;*/
        document.getElementById("accStatus").innerHTML = "";

        var Pay = "<select id='PayeeName' class='form-control' onfocusout='setTableData()'>";
        Pay = Pay + '</select>';
        $('#Payeeee').html(Pay);


        //debugger;
        if (Type != "RTGS03" && Type != "RTGS04" && Type == "RTGS_03_04") {
            document.getElementById("FinScheme").innerHTML = "";
            document.getElementById("FinFreeze").innerHTML = "";
            document.getElementById("FinMOP").innerHTML = "";
            document.getElementById("NREFlag").innerHTML = "";
            document.getElementById("FinSchemeType").innerHTML = "";
            document.getElementById("FinAccOwner").innerHTML = "";
        }
    }


    if (Type == "TRF02") {
        if (depositFlag == false)
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = "";
    }
    else if (Type == "CTS" || Type == "TRF03" || Type == "TRF04" || Type == "TRF05" || Type == "TRF06" || Type == "TRF07" || Type == "TRF08"
        || Type == "DI02" || Type == "DI03"
        || Type == "CI02" || Type == "CI03" || Type == "CI04")
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = "";

    if (AccNo == "" || AccNo == null || AccNo.toUpperCase() == "NULL") {
        //alert("Account No is blank");
        if (Type == "TRF02") {
            if (depositFlag == true) {
                document.getElementById("accStatus_debit").innerHTML = "Account No is Blank!";
                $("#accStatus_debit").css('color', 'red');
                DebitAccountValidation = false;
            }
            else {
                document.getElementById("accStatus_credit").innerHTML = "Account No is Blank!";
                $("#accStatus_credit").css('color', 'red');
                CreditAccountValidation = false;
            }
        }
        else {
            document.getElementById("accStatus").innerHTML = "Account No is Blank!";
            $("#accStatus").css('color', 'red');
            AccountValidation = false;
        }

        if (Type == "CTS" || Type == "TRF02" || Type == "TRF03" || Type == "TRF04" || Type == "TRF05" || Type == "TRF06" || Type == "TRF07" || Type == "TRF08"
            || Type == "DI02" || Type == "DI03"
            || Type == "CI02" || Type == "CI03" || Type == "CI04")
            setTableData();
        
        return false;
    }

    
    if (finalAccount != "") {
        //debugger;
        if (AccNo.indexOf('.') !== -1) {
            //debugger;
            if (Type == "TRF02") {
                if (depositFlag == true)
                    document.getElementById("DebitAccountNo").value = finalAccount;
                else
                    document.getElementById("CreditAccountNo").value = finalAccount;
                AccNo = finalAccount;
            }
            else {
                document.getElementById("AccountNo").value = finalAccount;
                AccNo = document.getElementById("AccountNo").value;
            }
            
        }

    }
    

    var numbers = /^[0-9]+$/;
    if (!AccNo.match(numbers)) {
        if (Type == "TRF02") {
            if (depositFlag == true) {
                document.getElementById("accStatus_debit").innerHTML = "Invalid Account No!";
                $("#accStatus_debit").css('color', 'red');
            }
            else {
                document.getElementById("accStatus_credit").innerHTML = "Invalid Account No!";
                $("#accStatus_credit").css('color', 'red');
            }
            //setTableData();
        }
        else {
            document.getElementById("accStatus").innerHTML = "Invalid Account No!";
            $("#accStatus").css('color', 'red');
        }

        if (Type == "CTS" || Type == "TRF02" || Type == "TRF03" || Type == "TRF04" || Type == "TRF05" || Type == "TRF06" || Type == "TRF07" || Type == "TRF08"
            || Type == "DI02" || Type == "DI03"
            || Type == "CI02" || Type == "CI03" || Type == "CI04")
            setTableData();
        return false;
    }

    if (Type == "TRF02") {
        if (depositFlag == true)
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = AccNo;
        else
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = AccNo;
    }
    else if (Type == "RTGS03" || Type == "RTGS04" || Type == "RTGS_03_04") {
        document.getElementById("chq_account_no").value = finalAccount;
        AccNo = document.getElementById("chq_account_no").value;
    } 
    else if (Type == "CTS" || Type == "TRF03" || Type == "TRF04" || Type == "TRF05" || Type == "TRF06" || Type == "TRF07" || Type == "TRF08"
        || Type == "DI02" || Type == "DI03"
        || Type == "CI02" || Type == "CI03" || Type == "CI04")
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[0].innerHTML = AccNo;

    var AccNoMinLength = document.getElementById("AccNoMinLength").value;
    var AccNoMaxLength = document.getElementById("AccNoMaxLength").value;
    if (AccNo.length < parseInt(AccNoMinLength)) {
        if (Type == "TRF02") {
            if (depositFlag == true) {
                document.getElementById("accStatus_debit").innerHTML = "Minimum " + AccNoMinLength + " digit Account No is required!";
                $("#accStatus_debit").css('color', 'red');
                DebitAccountValidation = false;
            }
            else {
                document.getElementById("accStatus_credit").innerHTML = "Minimum " + AccNoMinLength + " digit Account No is required!";
                $("#accStatus_credit").css('color', 'red');
                CreditAccountValidation = false;
            }
            /*AccountValidation = false;*/
        }
        else {
            document.getElementById("accStatus").innerHTML = "Minimum " + AccNoMinLength + " digit Account No is required!";
            $("#accStatus").css('color', 'red');
            AccountValidation = false;
        }
        
        if (Type == "CTS" || Type == "TRF02" || Type == "TRF03" || Type == "TRF04" || Type == "TRF05" || Type == "TRF06" || Type == "TRF07" || Type == "TRF08"
            || Type == "DI02" || Type == "DI03"
            || Type == "CI02" || Type == "CI03" || Type == "CI04")
            setTableData();
        return false;
    }
    else if (AccNo.length > parseInt(AccNoMaxLength)) {
        if (Type == "TRF02") {
            if (depositFlag == true) {
                document.getElementById("accStatus_debit").innerHTML = "Maximum " + AccNoMaxLength + " digit Account No is allowed!";
                $("#accStatus_debit").css('color', 'red');
                DebitAccountValidation = false;
            }
            else {
                document.getElementById("accStatus_credit").innerHTML = "Maximum " + AccNoMaxLength + " digit Account No is allowed!";
                $("#accStatus_credit").css('color', 'red');
                CreditAccountValidation = false;
            }
        }
        else {
            document.getElementById("accStatus").innerHTML = "Maximum " + AccNoMaxLength + " digit Account No is allowed!";
            $("#accStatus").css('color', 'red');
            AccountValidation = false;
        }
        
        if (Type == "CTS" || Type == "TRF02" || Type == "TRF03" || Type == "TRF04" || Type == "TRF05" || Type == "TRF06" || Type == "TRF07" || Type == "TRF08"
            || Type == "DI02" || Type == "DI03"
            || Type == "CI02" || Type == "CI03" || Type == "CI04")
            setTableData();
        return false;
    }

    // Account No Encryption - Begin

    debugger;
    var kVal = document.getElementById("KVal").value;
    var key = CryptoJS.enc.Utf8.parse(kVal);
    var iv = CryptoJS.enc.Utf8.parse(kVal);

    //var encrypted_AccNo = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(AccNo), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    debugger;

    var data = {
        asdrf: "1234",
        ac: AccNo,
        BankCode: BankCode,
        RefNo: RefNo,
        loginId: username,
        TransactionType: transtype
    };

    debugger;
    var jsonData = JSON.stringify(data);

    var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
    //var encrypted_data = CryptoJS.AES.encrypt(jsonData, kVal).toString();
    debugger;

    // Account No Encryption - End

    if (Type == "TRF02") {
        if (depositFlag == true) {
            document.getElementById("accStatus_debit").innerHTML = "Processing...";
            $("#accStatus_debit").css('color', 'red');
        }
        else {
            document.getElementById("accStatus_credit").innerHTML = "Processing...";
            $("#accStatus_credit").css('color', 'red');
        }
    }
    else {
        document.getElementById("accStatus").innerHTML = "Processing...";
        $("#accStatus").css('color', 'red');
    }


    if (BankCode == "240") {
        //debugger;
        var y = "Get_Async_AccountDetails";

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            crossDomain: true,
            ////data: { ac: AccNo.trim(), BankCode: BankCode, RefNo: RefNo, loginId: username },
            //data: { ac: encrypted_AccNo.toString(), BankCode: BankCode, RefNo: RefNo, loginId: username, Request_Data: encrypted_data },
            data: { Request_Data: encrypted_data },
            success: readPayeeDetails,
            error: ErrorAccDetails
        });

    }
    else {

        var y = "GetCBSDtls";

        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            crossDomain: true,
            ////data: { ac: AccNo.trim(), BankCode: BankCode, RefNo: RefNo, loginId: username },
            //data: { ac: encrypted_AccNo.toString(), BankCode: BankCode, RefNo: RefNo, loginId: username, Request_Data: encrypted_data },
            data: { Request_Data: encrypted_data },
            success: readPayeeDetails,
            error: ErrorAccDetails
        });

    }

}


function ErrorAccDetails(data) {
    //debugger;
    //alert("Error Found in api call");
    $("#ProcessingBar").show();
    document.getElementById("ProcessingBar").innerHTML = data.responseText;
    if (transtype == "TRF02") {
        if (depositFlag == true) {
            document.getElementById("accStatus_debit").innerHTML = "Failed";
            $("#accStatus_debit").css('color', 'red');
            DebitAccountValidation = false;
        }
        else {
            document.getElementById("accStatus_credit").innerHTML = "Failed";
            $("#accStatus_credit").css('color', 'red');
            CreditAccountValidation = false;
        }
    }
    else {
        document.getElementById("accStatus").innerHTML = "Failed";
        $("#accStatus").css('color', 'red');
        AccountValidation = false;
    }
    
}


function readPayeeDetails(FinDetails) {
    debugger;
    var kVal = document.getElementById("KVal").value;
    var response_data = decryptJsonData(FinDetails, kVal);
    debugger;

    if (response_data.cbsdls == null) {
        if (transtype == "TRF02") {
            if (depositFlag == true) {
                document.getElementById("accStatus_debit").innerHTML = "Account Does Not Exists!";
                $("#accStatus_debit").css('color', 'red');
                DebitAccountValidation = false;
            }
            else {
                document.getElementById("accStatus_credit").innerHTML = "Account Does Not Exists!";
                $("#accStatus_credit").css('color', 'red');
                CreditAccountValidation = false;
            }
        }
        else {
            document.getElementById("accStatus").innerHTML = "Account Does Not Exists!";
            $("#accStatus").css('color', 'red');
            AccountValidation = false;
        }
        
        if (transtype == "CTS"
            || transtype == "TRF02" || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04")
            setTableData();
        return false;
    }
    else if (response_data.cbsdls.includes("Account does not exist")) {
        if (transtype == "TRF02") {
            if (depositFlag == true) {
                document.getElementById("accStatus_debit").innerHTML = "Account Does Not Exists!";
                $("#accStatus_debit").css('color', 'red');
                DebitAccountValidation = false;
            }
            else {
                document.getElementById("accStatus_credit").innerHTML = "Account Does Not Exists!";
                $("#accStatus_credit").css('color', 'red');
                CreditAccountValidation = false;
            }
        }
        else {
            document.getElementById("accStatus").innerHTML = "Account Does Not Exists!";
            $("#accStatus").css('color', 'red');
            AccountValidation = false;
        }
        
        if (transtype == "CTS"
            || transtype == "TRF02" || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04")
            setTableData();

        return false;
    }
    else {

        //debugger;
        if (transtype == "CASHDEP" || transtype == "CASHWDL" || transtype == "CASHWDL01" || transtype == "CASHWDL02"
            || transtype == "DI01" || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI01" || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {
            if (CheckerPage == true)
                $("#btn_Verify").show();
        }

        if (transtype == "CTS") {
            CheckImgFlip_Front();
        }

        debugger;

        if (transtype == "TRF02") {
            if (depositFlag == true) {
                if (ValidateAccBalance == "Y") {
                    AccBalance = response_data.Amount;
                }
            }
        }
        else if (transtype == "CASHWDL" || transtype == "CASHWDL01" || transtype == "CASHWDL02"
            || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI01" || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI01" || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {
            debugger;
            if (ValidateAccBalance == "Y") {
                AccBalance = response_data.Amount;
            }
        }

        if (response_data.AccountStatus != null) {
            if (BankCode == "240") {
                AccStatusCode_240(response_data);
            }
            else
                AccStatusCode_059(response_data);
        }
        debugger;

        //if (response_data.SchemeCode != null)
        //    document.getElementById("FinScheme").innerHTML = response_data.SchemeCode;

        if (transtype == "TRF02") {
            if (depositFlag == true)
                document.getElementById("FinAccountStatus").innerHTML = document.getElementById("accStatus_debit").innerHTML;
            else
                document.getElementById("FinAccountStatus").innerHTML = document.getElementById("accStatus_credit").innerHTML;
        }
        else if (transtype != "RTGS03" && transtype != "RTGS04" && transtype != "RTGS_03_04") {

            document.getElementById("FinAccountStatus").innerHTML = document.getElementById("accStatus").innerHTML;
        }
        else
            document.getElementById("FinAccountStatus").innerHTML = document.getElementById("accStatus").innerHTML;
        //debugger;


        if (transtype == "TRF02") {
            //if (depositFlag == true) {
            //    if (DebitAccountValidation == true) {
            //        $("#FinAccountStatus").css('color', '#03C988');
            //        if (transtype == "CTS" || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05"
            //            || transtype == "DI02" || transtype == "DI03"
            //            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {
            //            //$("#pass_" + GlobalRowNo).show();
            //            //$("#fail_" + GlobalRowNo).hide();
            //            $("#tr_id_" + row_unique_id).css('color', '#03C988');
            //            document.getElementById("valid_" + row_unique_id).innerHTML = "TRUE";
            //        }
            //    }
            //    else {
            //        $("#FinAccountStatus").css('color', 'red');
            //        if (transtype == "CTS" || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05"
            //            || transtype == "DI02" || transtype == "DI03"
            //            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {
            //            //$("#pass_" + GlobalRowNo).hide();
            //            //$("#fail_" + GlobalRowNo).show();
            //            $("#tr_id_" + row_unique_id).css('color', 'red');
            //            document.getElementById("valid_" + row_unique_id).innerHTML = "FALSE";
            //        }
            //    }
            //}
        }
        else if (transtype != "RTGS03" && transtype != "RTGS04" && transtype != "RTGS_03_04") {
            if (AccountValidation == true) {
                $("#FinAccountStatus").css('color', '#03C988');
                if (transtype == "CTS"
                    || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
                    || transtype == "DI02" || transtype == "DI03"
                    || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {
                    //$("#pass_" + GlobalRowNo).show();
                    //$("#fail_" + GlobalRowNo).hide();
                    $("#tr_id_" + row_unique_id).css('color', '#03C988');
                    document.getElementById("valid_" + row_unique_id).innerHTML = "TRUE";
                }
            }
            else {
                $("#FinAccountStatus").css('color', 'red');
                if (transtype == "CTS"
                    || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
                    || transtype == "DI02" || transtype == "DI03"
                    || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {
                    //$("#pass_" + GlobalRowNo).hide();
                    //$("#fail_" + GlobalRowNo).show();
                    $("#tr_id_" + row_unique_id).css('color', 'red');
                    document.getElementById("valid_" + row_unique_id).innerHTML = "FALSE";
                }
            }
        }
        if (AccountValidation == true) {
            $("#FinAccountStatus").css('color', '#03C988');
            if (transtype == "CTS"
                || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
                || transtype == "DI02" || transtype == "DI03"
                || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {
                //$("#pass_" + GlobalRowNo).show();
                //$("#fail_" + GlobalRowNo).hide();
                $("#tr_id_" + row_unique_id).css('color', '#03C988');
                document.getElementById("valid_" + row_unique_id).innerHTML = "TRUE";
            }
        }
        else {
            $("#FinAccountStatus").css('color', 'red');
            if (transtype == "CTS"
                || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
                || transtype == "DI02" || transtype == "DI03"
                || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {
                //$("#pass_" + GlobalRowNo).hide();
                //$("#fail_" + GlobalRowNo).show();
                $("#tr_id_" + row_unique_id).css('color', 'red');
                document.getElementById("valid_" + row_unique_id).innerHTML = "FALSE";
            }
        }
    }
        

    debugger;
    if (transtype == "TRF02") {
        if (depositFlag == true)
            DebitCustId = response_data.CustomerId;
        else
            CreditCustId = response_data.CustomerId;
    }
    else
        CustId = response_data.CustomerId;

    //if (response_data.NRE_Flag != null && (transtype == "TRF" || transtype == "CASHWDL" || transtype == "CASHDEP"))
    //    NRE_Flag = response_data.NRE_Flag;
    //else
    //    NRE_Flag = "N";


    // Freeze Code
    if (response_data.FreezeStatusCode != null && response_data.FreezeStatusCode != "") {
        if (transtype == "CTS"
            || transtype == "TRF02" || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[19].innerHTML = response_data.FreezeStatusCode;

        if (transtype == "TRF02") {
            if (depositFlag == true)
                document.getElementById("FinFreeze_debit").innerHTML = response_data.FreezeStatusCode;
            else
                document.getElementById("FinFreeze_credit").innerHTML = response_data.FreezeStatusCode;
        }
        else if (transtype != "RTGS03" && transtype != "RTGS04" && transtype != "RTGS_03_04") {
            document.getElementById("FinFreeze").innerHTML = response_data.FreezeStatusCode;
        }
        else
            document.getElementById("FinFreeze").innerHTML = response_data.FreezeStatusCode;
    }


    // NRE Flag
    if (response_data.NRE_Flag != null && response_data.NRE_Flag != "") {
        if (transtype == "CTS"
            || transtype == "TRF02" || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[21].innerHTML = response_data.NRE_Flag;

        if (response_data.NRE_Flag.toUpperCase() == "Y")
            alert("This is an NRE Account!");

        if (response_data.NRE_Flag != null && (transtype == "TRF02" || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "CASHWDL" || transtype == "CASHWDL01" || transtype == "CASHWDL02"
            || transtype == "CASHDEP"
            || transtype == "DI01" || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI01" || transtype == "CI02" || transtype == "CI03" || transtype == "CI04"))
            NRE_Flag = response_data.NRE_Flag;
        else
            NRE_Flag = "N";

        if (transtype == "TRF02") {
            if (depositFlag == true)
                document.getElementById("NREFlag_debit").innerHTML = response_data.NRE_Flag;
            else
                document.getElementById("NREFlag_credit").innerHTML = response_data.NRE_Flag;
        }
        else if (transtype != "RTGS03" && transtype != "RTGS04" && transtype != "RTGS_03_04") {
            document.getElementById("NREFlag").innerHTML = response_data.NRE_Flag;
        }
        else
            document.getElementById("NREFlag").innerHTML = response_data.NRE_Flag;
    }


    // Scheme Type
    if (response_data.SchemeType != null && response_data.SchemeType != "") {
        if (transtype == "CTS"
            || transtype == "TRF02" || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[22].innerHTML = response_data.SchemeType;

        if (transtype == "TRF02") {
            if (depositFlag == true)
                document.getElementById("FinSchemeType_debit").innerHTML = response_data.SchemeType;
            else
                document.getElementById("FinSchemeType_credit").innerHTML = response_data.SchemeType;
        }
        else if (transtype != "RTGS03" && transtype != "RTGS04" && transtype != "RTGS_03_04") {
            document.getElementById("FinSchemeType").innerHTML = response_data.SchemeType;
        }
        else
            document.getElementById("FinSchemeType").innerHTML = response_data.SchemeType;
    }


    if (response_data.MOP != null) {
        if (transtype == "CTS"
            || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[20].innerHTML = response_data.MOP;

        if (transtype == "TRF02") {
            if (depositFlag == true)
                document.getElementById("FinMOP_debit").innerHTML = response_data.MOP;
            else
                document.getElementById("FinMOP_credit").innerHTML = response_data.MOP;
        }
        else if (transtype != "RTGS03" && transtype != "RTGS04" && transtype != "RTGS_03_04") {
            document.getElementById("FinMOP").innerHTML = response_data.MOP;
        }
        else
            document.getElementById("FinMOP").innerHTML = response_data.MOP;
    }

    if (response_data.SchemeCode != null) {
        if (transtype == "CTS"
            || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[18].innerHTML = response_data.SchemeCode;

        if (transtype == "TRF02") {
            if (depositFlag == true)
                document.getElementById("FinScheme_debit").innerHTML = response_data.SchemeCode;
            else
                document.getElementById("FinScheme_credit").innerHTML = response_data.SchemeCode;
        }
        else if (transtype != "RTGS03" && transtype != "RTGS04" && transtype != "RTGS_03_04") {
            document.getElementById("FinScheme").innerHTML = response_data.SchemeCode;
        }
        else
            document.getElementById("FinScheme").innerHTML = response_data.SchemeCode;
    }

    if (response_data.AccountOwnership != null) {
        if (transtype == "CTS"
            || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[23].innerHTML = response_data.AccountOwnership;

        if (transtype == "TRF02") {
            if (depositFlag == true)
                document.getElementById("FinAccOwner_debit").innerHTML = response_data.AccountOwnership;
            else
                document.getElementById("FinAccOwner_credit").innerHTML = response_data.AccountOwnership;
        }
        else if (transtype != "RTGS03" && transtype != "RTGS04" && transtype != "RTGS_03_04") {
            document.getElementById("FinAccOwner").innerHTML = response_data.AccountOwnership;
        }
        else
            document.getElementById("FinAccOwner").innerHTML = response_data.AccountOwnership;
    }

    // Account holder name in drop down menu
    var PayeeName = {};
    debugger;
    if (transtype == "TRF02") {
        if (depositFlag == true) {
            PayeeName = response_data.PayeeName;
            var Pay = "<select id='DebitAccHolderName' class='form-control' onfocusout='setTableData()'>";
            if (PayeeName != null) {
                for (i = 0; i < PayeeName.length; i++) {
                    Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                }
            }
            Pay = Pay + '</select>';
            $('#div_DebitAccHolderName').html(Pay);

            setTableData();
        }
        else {
            PayeeName = response_data.PayeeName;
            var Pay = "<select id='CreditAccHolderName' class='form-control' onfocusout='setTableData()'>";
            if (PayeeName != null) {
                for (i = 0; i < PayeeName.length; i++) {
                    Pay = Pay + '<option>' + PayeeName[i] + '</option>';
                }
            }
            Pay = Pay + '</select>';
            $('#div_CreditAccHolderName').html(Pay);

            setTableData();
            //document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = document.getElementById("CreditAccHolderName").value;
        }
    }
    else if (transtype == "CTS"
        || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
        || transtype == "DI02" || transtype == "DI03"
        || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {
            
        PayeeName = response_data.PayeeName;
        var Pay = "<select id='PayeeName' class='form-control' onfocusout='setTableData()'>";
        if (PayeeName != null) {
            for (i = 0; i < PayeeName.length; i++) {
                Pay = Pay + '<option>' + PayeeName[i] + '</option>';
            }
        }
        Pay = Pay + '</select>';
        $('#Payeeee').html(Pay);

        if (transtype == "DI02" || transtype == "DI03" || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {
            if (CheckerPage != false) {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = document.getElementById("PayeeName").value;
            }
        }
        else
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[1].innerHTML = document.getElementById("PayeeName").value;

        setTableData();

        //$("#pass_" + GlobalRowNo).show();
        //$("#fail_" + GlobalRowNo).hide();
    }
    else {
            
        PayeeName = response_data.PayeeName;
        var Pay = "<select id='PayeeName' class='form-control'>";
        if (PayeeName != null) {
            for (i = 0; i < PayeeName.length; i++) {
                Pay = Pay + '<option>' + PayeeName[i] + '</option>';
            }
        }
        Pay = Pay + '</select>';
        $('#Payeeee').html(Pay);
    }

    if (transtype == "CASHDEP" && BankCode == "240" && CheckerPage == false) {
        var name1 = document.getElementById("PayeeName").value;
        var name2 = document.getElementById("input_payeename").value;
        if (name1 == null || name1 == "" || name2 == null || name2 == "")
            $("#input_payeename").css('backgroundColor', '#DE3163');
        else if (name1.toUpperCase() != name2.toUpperCase())
            $("#input_payeename").css('backgroundColor', '#DE3163');
    }

    //debugger;
    var pan = false;
    if (transtype == "TRF02") {
        if (depositFlag == true)
            preCheckPancard();
    }
    else if (transtype == "CASHDEP" || transtype == "CASHWDL" || transtype == "CASHWDL01" || transtype == "CASHWDL02"
        || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
        || transtype == "DI01" || transtype == "DI02" || transtype == "DI03"
        || transtype == "CI01" || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {

        preCheckPancard();
    }

}

//}


//function validatePancard() {
//    $("#row_pan").show();
//    PanValidation_Req = true;
//}

function preCheckPancard() {
    debugger;

    var panVerf = document.getElementById("Pancard_Verf").value;
    var pan_amt_limit = parseInt(document.getElementById("pancard_verf_limit").value);

    if (panVerf == "Y") {

        if (transtype == "CASHDEP") {
            var inst_amt = document.getElementById("amt").value;

            if (BankCode == "240") {
                PanValidation_Req = false;
            }
            else if (BankCode == "059") {
                if (inst_amt != null && inst_amt != "") {
                    var amountVal = parseInt(inst_amt);
                    if (amountVal >= pan_amt_limit) {
                        PanValidation_Req = true;
                    }
                    else
                        PanValidation_Req = false;

                    if (amountVal < 0)
                        document.getElementById("amt").value = 0;
                }
                else {
                    PanValidation_Req = false;
                    document.getElementById("amt").value = 0;
                }
            }


            if (PanValidation_Req == true) {
                //validatePancard();
                document.getElementById("pan").disabled = false;
                Chq_Pan_Validation();
            }
            else {
                $("#row_pan").hide();
            }
        }
        else if (transtype == "CASHWDL") {

            var inst_Type = document.getElementById("inst_type").value;

            if (inst_Type == "CHQ") {

                chq_validation = false;
                Chq_Pan_Validation();

                //if (BankCode == "240") {
                //    //chq_validation = true;
                //    chq_validation = false;
                //    Chq_Pan_Validation();
                //}
                //else {
                //    chq_validation = false;
                //    Chq_Pan_Validation();
                //}
            }
            else
                chq_validation = true;

        }
        else if (transtype == "CASHWDL01") {
            chq_validation = false;
            Chq_Pan_Validation();
        }
        else if (transtype == "TRF02" || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "CI02") {
            debugger;
            var inst_type = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML;
            if (inst_type == "C") {
                if (BankCode == "240") {
                    //chq_validation = false;
                    if (transtype == "TRF02") {
                        if (depositFlag == true)
                            Chq_Pan_Validation();
                        else
                            chq_validation = true;
                    }
                    else
                        Chq_Pan_Validation();
                }
                else {
                    //chq_validation = false;
                    Chq_Pan_Validation();
                }
            }
        }
        else
            chq_validation = true;
    }
    else
        chq_validation = true;

    if (transtype == "TRF02" || transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
        || transtype == "CI02")
        setTableData();
}

function AccStatusCode_059(data) {

    var accStatus = data.AccountStatus.toUpperCase();
    if (data.FinCall.toUpperCase() == "Y") {

        if (transtype == "CTS") {

            // FreezeCode
            if (data.FreezeStatusCode.toUpperCase() == "" || data.FreezeStatusCode.toUpperCase() == null) {
                AccountValidation = true;
            }
            else if (data.FreezeStatusCode.toUpperCase() == "D") {
                alert("Account in Debit Freeze Status");
                AccountValidation = true;
            }
            else if (data.FreezeStatusCode.toUpperCase() == "C") {
                alert("Account in Credit Freeze Status");
                AccountVal_ErrorMsg = "Account in Credit Freeze Status";
                AccountValidation = false;
            }
            else if (data.FreezeStatusCode.toUpperCase() == "T") {
                alert("Account in Total Freeze Status");
                AccountVal_ErrorMsg = "Account in Total Freeze Status";
                AccountValidation = false;
            }
            else {
                alert("Unknown Freeze Status Code:" + data.FreezeStatusCode.toUpperCase());
                AccountVal_ErrorMsg = "Unknown Freeze Status Code:" + data.FreezeStatusCode.toUpperCase();
                AccountValidation = false;
            }

            // Account Status
            if (accStatus.toUpperCase() == "A") {
                document.getElementById("accStatus").innerHTML = "A - Active";
                if (AccountValidation == true)
                    $("#accStatus").css('color', '#03C988');
                else
                    $("#accStatus").css('color', 'red');
            }
            else if (accStatus.toUpperCase() == "D") {
                document.getElementById("accStatus").innerHTML = "D - Dormant";
                $("#accStatus").css('color', 'red');
            }
            else {
                document.getElementById("accStatus").innerHTML = "Unknown Status - " + accStatus;
                $("#accStatus").css('color', 'red');
                AccountValidation = false;
            }

            // 

        }
        else if (transtype == "TRF02") {
            if (depositFlag == true) {
                // FreezeCode
                if (data.FreezeStatusCode.toUpperCase() == "" || data.FreezeStatusCode.toUpperCase() == null) {
                    DebitAccountValidation = true;
                }
                else if (data.FreezeStatusCode.toUpperCase() == "D") {
                    alert("Account in Debit Freeze Status");
                    DebitAccountValidation = false;
                }
                else if (data.FreezeStatusCode.toUpperCase() == "C") {
                    alert("Account in Credit Freeze Status");
                    DebitAccountValidation = true;
                }
                else if (data.FreezeStatusCode.toUpperCase() == "T") {
                    alert("Account in Total Freeze Status");
                    DebitAccountValidation = false;
                }
                else {
                    alert("Unknown Freeze Status Code:" + data.FreezeStatusCode.toUpperCase());
                    DebitAccountValidation = false;
                }

                // Account Status
                if (accStatus.toUpperCase() == "A") {
                    document.getElementById("accStatus").innerHTML = "A - Active";
                    $("#accStatus").css('color', '#03C988');
                }
                else if (accStatus.toUpperCase() == "D") {
                    document.getElementById("accStatus").innerHTML = "D - Dormant";
                    $("#accStatus").css('color', 'red');
                    DebitAccountValidation = false;
                    alert("Dormant Account debit not permitted");
                }
                else {
                    document.getElementById("accStatus").innerHTML = "Unknown Status - " + accStatus;
                    $("#accStatus").css('color', 'red');
                    DebitAccountValidation = false;
                }

                SignCheckFlag = false;
                if (DebitAccountValidation == false) {
                    document.getElementById("btn_verf_sign").disabled = true;
                }
                else {
                    document.getElementById("btn_verf_sign").disabled = false;
                }
            }
            else {
                // FreezeCode
                if (data.FreezeStatusCode.toUpperCase() == "" || data.FreezeStatusCode.toUpperCase() == null) {
                    CreditAccountValidation = true;
                }
                else if (data.FreezeStatusCode.toUpperCase() == "D") {
                    alert("Account in Debit Freeze Status");
                    CreditAccountValidation = true;
                }
                else if (data.FreezeStatusCode.toUpperCase() == "C") {
                    alert("Account in Credit Freeze Status");
                    CreditAccountValidation = false;
                }
                else if (data.FreezeStatusCode.toUpperCase() == "T") {
                    alert("Account in Total Freeze Status");
                    CreditAccountValidation = false;
                }
                else {
                    alert("Unknown Freeze Status Code:" + data.FreezeStatusCode.toUpperCase());
                    CreditAccountValidation = false;
                }

                // Account Status
                if (accStatus.toUpperCase() == "A") {
                    document.getElementById("accStatus").innerHTML = "A - Active";
                    $("#accStatus").css('color', '#03C988');
                }
                else if (accStatus.toUpperCase() == "D") {
                    document.getElementById("accStatus").innerHTML = "D - Dormant";
                    $("#accStatus").css('color', 'red');
                }
                else {
                    document.getElementById("accStatus").innerHTML = "Unknown Status - " + accStatus;
                    $("#accStatus").css('color', 'red');
                    CreditAccountValidation = false;
                }
            }
        }
        else if (transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI01" || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI01" || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {
            debugger;
            var inst_type = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML;

            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "FALSE";

            // FreezeCode
            if (data.FreezeStatusCode.toUpperCase() == "" || data.FreezeStatusCode.toUpperCase() == null) {
                AccountValidation = true;
            }
            else if (data.FreezeStatusCode.toUpperCase() == "D") {
                alert("Account in Debit Freeze Status");
                if (inst_type == "C") {
                    AccountVal_ErrorMsg = "Account in Debit Freeze Status";
                    AccountValidation = false;
                }
                else
                    AccountValidation = true;
            }
            else if (data.FreezeStatusCode.toUpperCase() == "C") {
                alert("Account in Credit Freeze Status");
                if (inst_type == "C")
                    AccountValidation = true;
                else {
                    AccountVal_ErrorMsg = "Account in Credit Freeze Status";
                    AccountValidation = false;
                }
            }
            else if (data.FreezeStatusCode.toUpperCase() == "T") {
                alert("Account in Total Freeze Status");
                AccountVal_ErrorMsg = "Account in Total Freeze Status";
                AccountValidation = false;
            }
            else {
                alert("Unknown Freeze Status Code:" + data.FreezeStatusCode.toUpperCase());
                AccountVal_ErrorMsg = "Unknown Freeze Status Code:" + data.FreezeStatusCode.toUpperCase();
                AccountValidation = false;
            }

            // Account Status
            if (accStatus.toUpperCase() == "A") {
                document.getElementById("accStatus").innerHTML = "A - Active";
                $("#accStatus").css('color', '#03C988');
            }
            else if (accStatus.toUpperCase() == "D") {
                document.getElementById("accStatus").innerHTML = "D - Dormant";
                $("#accStatus").css('color', 'red');
                if (inst_type == "") {
                    alert("Do")
                    AccountVal_ErrorMsg = "";
                    AccountValidation = false;
                }
            }
            else {
                document.getElementById("accStatus").innerHTML = "Unknown Status - " + accStatus;
                $("#accStatus").css('color', 'red');
                AccountValidation = false;
            }
        }
        else if (transtype == "CASHWDL" || transtype == "CASHWDL01" || transtype == "CASHWDL02" || transtype == "DI01") {

            // FreezeCode
            if (data.FreezeStatusCode.toUpperCase() == "" || data.FreezeStatusCode.toUpperCase() == null) {
                AccountValidation = true;
            }
            else if (data.FreezeStatusCode.toUpperCase() == "D") {
                alert("Account in Debit Freeze Status");
                AccountValidation = false;
            }
            else if (data.FreezeStatusCode.toUpperCase() == "C") {
                alert("Account in Credit Freeze Status");
                AccountValidation = true;
            }
            else if (data.FreezeStatusCode.toUpperCase() == "T") {
                alert("Account in Total Freeze Status");
                AccountValidation = false;
            }
            else {
                alert("Unknown Freeze Status Code:" + data.FreezeStatusCode.toUpperCase());
                AccountValidation = false;
            }

            // Account Status
            if (accStatus.toUpperCase() == "A") {
                document.getElementById("accStatus").innerHTML = "A - Active";
                $("#accStatus").css('color', '#03C988');
            }
            else if (accStatus.toUpperCase() == "D") {
                document.getElementById("accStatus").innerHTML = "D - Dormant";
                $("#accStatus").css('color', 'red');
                AccountValidation = false;
                alert("Dormant Account debit not permitted");
            }
            else {
                document.getElementById("accStatus").innerHTML = "Unknown Status - " + accStatus;
                $("#accStatus").css('color', 'red');
                AccountValidation = false;
            }

            SignCheckFlag = false;
            if (AccountValidation == false) {
                document.getElementById("btn_verf_sign").disabled = true;
            }
            else {
                document.getElementById("btn_verf_sign").disabled = false;
            }
                
        }
        else if (transtype == "CASHDEP" || transtype == "CI01") {

            // FreezeCode
            if (data.FreezeStatusCode.toUpperCase() == "" || data.FreezeStatusCode.toUpperCase() == null) {
                AccountValidation = true;
            }
            else if (data.FreezeStatusCode.toUpperCase() == "D") {
                alert("Account in Debit Freeze Status");
                AccountValidation = true;
            }
            else if (data.FreezeStatusCode.toUpperCase() == "C") {
                alert("Account in Credit Freeze Status");
                AccountValidation = false;
            }
            else if (data.FreezeStatusCode.toUpperCase() == "T") {
                alert("Account in Total Freeze Status");
                AccountValidation = false;
            }
            else {
                alert("Unknown Freeze Status Code:" + data.FreezeStatusCode.toUpperCase());
                AccountValidation = false;
            }

            // Account Status
            if (accStatus.toUpperCase() == "A") {
                document.getElementById("accStatus").innerHTML = "A - Active";
                $("#accStatus").css('color', '#03C988');
            }
            else if (accStatus.toUpperCase() == "D") {
                document.getElementById("accStatus").innerHTML = "D - Dormant";
                $("#accStatus").css('color', 'red');
            }
            else {
                document.getElementById("accStatus").innerHTML = "Unknown Status - " + accStatus;
                $("#accStatus").css('color', 'red');
                AccountValidation = false;
            }
        }

    }
    else {

        AccStatusCode_iBas(data);

        if (transtype == "TRF02") {
            if (depositFlag == true) {
                SignCheckFlag = false;
                if (DebitAccountValidation == false) {
                    document.getElementById("btn_verf_sign").disabled = true;
                }
                else {
                    document.getElementById("btn_verf_sign").disabled = false;
                }
            }
            else {
                /*if (CreditAccountValidation==)*/
            }
        }
        else if (transtype == "CASHWDL" || transtype == "CASHWDL01" || transtype == "CASHWDL02") {
            SignCheckFlag = false;
            if (AccountValidation == false) {
                document.getElementById("btn_verf_sign").disabled = true;
            }
            else {
                document.getElementById("btn_verf_sign").disabled = false;
            }
        }
        else if (transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "FALSE";
        

        //if (accStatus == "A") {
        //    document.getElementById("accStatus").innerHTML = "A - Active";
        //    $("#accStatus").css('color', '#03C988');
        //    AccountValidation = true;
        //}
        //else {
        //    $("#accStatus").css('color', 'red');
        //    AccountValidation = false;

        //    if (accStatus == "C") {
        //        document.getElementById("accStatus").innerHTML = "Account is C - Closed";
        //        //alert("Alert! Debit Account Number is Closed!");
        //    }
        //    else if (accStatus == "D") {
        //        document.getElementById("accStatus").innerHTML = "Account is D - Dormant";
        //        //alert("Alert! Debit Account Number is Dormant!");
        //    }
        //    else if (accStatus == "I") {
        //        document.getElementById("accStatus").innerHTML = "Account is I - Inactive";
        //        //alert("Alert! Debit Account Number is Inactive!");
        //    }
        //    else if (accStatus == "S") {
        //        document.getElementById("accStatus").innerHTML = "Account is S - Stop payment";
        //        //alert("Alert! Payment for Debit Account Number is stopped!");
        //    }
        //    else {
        //        document.getElementById("accStatus").innerHTML = accStatus.toUpperCase() + " - Unknow Status!";
        //        //alert("Alert! Unknown status code!");
        //    }
        //}
    }
}


function AccStatusCode_240(data) {

    debugger;
    var accStatus = data.AccountStatus.toUpperCase();

    if (data.FinCall == "Y") {
        //debugger;
        var accStatusDesc = data.AccountDesc;

        if (transtype == "TRF02") {
            if (depositFlag == true)
                document.getElementById("accStatus_debit").innerHTML = accStatus + ' - ' + accStatusDesc;
            else
                document.getElementById("accStatus_credit").innerHTML = accStatus + ' - ' + accStatusDesc;
        }
        else
            document.getElementById("accStatus").innerHTML = accStatus + ' - ' + accStatusDesc;

        if (transtype == "CTS") {
            if (accStatus == "8") {
                $("#accStatus").css('color', '#03C988');
                AccountValidation = true;
            }
            else {
                $("#accStatus").css('color', 'red');
                AccountValidation = false;
            }
        }
        else if (transtype == "TRF02") {
            if (depositFlag == true) {
                if (accStatus == "8") {
                    $("#accStatus_debit").css('color', '#03C988');
                    DebitAccountValidation = true;
                }
                else {
                    $("#accStatus_debit").css('color', 'red');
                    DebitAccountValidation = false;
                }

                SignCheckFlag = false;
                if (DebitAccountValidation == false) {
                    document.getElementById("btn_verf_sign").disabled = true;
                }
                else {
                    document.getElementById("btn_verf_sign").disabled = false;
                }
            }
            else {
                if (accStatus == "3" || accStatus == "6" || accStatus == "8") {
                    $("#accStatus_credit").css('color', '#03C988');
                    CreditAccountValidation = true;
                }
                else {
                    $("#accStatus_credit").css('color', 'red');
                    CreditAccountValidation = false;
                }
            }
        }
        else if (transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08"
            || transtype == "DI02" || transtype == "DI03"
            || transtype == "CI02" || transtype == "CI03" || transtype == "CI04") {

            var inst_type = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML;
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "FALSE";

            if (inst_type == "C" || inst_type == "WF" || inst_type == "DI") {
                if (accStatus == "8") {
                    $("#accStatus").css('color', '#03C988');
                    AccountValidation = true;
                }
                else {
                    $("#accStatus").css('color', 'red');
                    AccountValidation = false;
                }

                if (inst_type == "C") {
                    SignCheckFlag = false;
                    if (AccountValidation == false) {
                        document.getElementById("btn_verf_sign").disabled = true;
                    }
                    else {
                        document.getElementById("btn_verf_sign").disabled = false;
                    }
                }
            }
            else if (inst_type == "S" || inst_type == "CI") {
                if (accStatus == "3" || accStatus == "6" || accStatus == "8") {
                    $("#accStatus").css('color', '#03C988');
                    AccountValidation = true;
                }
                else {
                    $("#accStatus").css('color', 'red');
                    AccountValidation = false;
                }
            }
            //if (accStatus == "8") {
            //    $("#accStatus").css('color', '#03C988');
            //    AccountValidation = true;
            //}
            //else {
            //    $("#accStatus").css('color', 'red');
            //    AccountValidation = false;
            //}
        }
        else if (transtype == "CASHWDL" || transtype == "CASHWDL01" || transtype == "CASHWDL02" || transtype == "DI01"
            || transtype == "RTGS03" || transtype == "RTGS04") {
            if (accStatus == "8") {
                $("#accStatus").css('color', '#03C988');
                AccountValidation = true;
            }
            else {
                $("#accStatus").css('color', 'red');
                AccountValidation = false;
            }

            SignCheckFlag = false;
            if (AccountValidation == false) {
                document.getElementById("btn_verf_sign").disabled = true;
            }
            else {
                document.getElementById("btn_verf_sign").disabled = false;
            }

        }
        else if (transtype == "CASHDEP" || transtype == "CI01") {
            if (accStatus == "3" || accStatus == "6" || accStatus == "8") {
                $("#accStatus").css('color', '#03C988');
                AccountValidation = true;
            }
            else {
                $("#accStatus").css('color', 'red');
                AccountValidation = false;
            }
        }
    }
    else {

        AccStatusCode_iBas(data);

        if (transtype == "CASHWDL" || transtype == "CASHWDL01" || transtype == "CASHWDL02"
            || transtype == "RTGS03" || transtype == "RTGS04") {
            SignCheckFlag = false;
            if (AccountValidation == false) {
                document.getElementById("btn_verf_sign").disabled = true;
            }
            else {
                document.getElementById("btn_verf_sign").disabled = false;
            }
        }
        else if (transtype == "TRF03" || transtype == "TRF04" || transtype == "TRF05" || transtype == "TRF06" || transtype == "TRF07" || transtype == "TRF08")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "FALSE";
        

        //if (accStatus == "A") {
        //    document.getElementById("accStatus").innerHTML = "A - Active";
        //    $("#accStatus").css('color', '#03C988');
        //    AccountValidation = true;
        //}
        //else {
        //    $("#accStatus").css('color', 'red');
        //    AccountValidation = false;

        //    if (accStatus == "C") {
        //        document.getElementById("accStatus").innerHTML = "Account is C - Closed";
        //        //alert("Alert! Debit Account Number is Closed!");
        //    }
        //    else if (accStatus == "D") {
        //        document.getElementById("accStatus").innerHTML = "Account is D - Dormant";
        //        //alert("Alert! Debit Account Number is Dormant!");
        //    }
        //    else if (accStatus == "I") {
        //        document.getElementById("accStatus").innerHTML = "Account is I - Inactive";
        //        //alert("Alert! Debit Account Number is Inactive!");
        //    }
        //    else if (accStatus == "S") {
        //        document.getElementById("accStatus").innerHTML = "Account is S - Stop payment";
        //        //alert("Alert! Payment for Debit Account Number is stopped!");
        //    }
        //    else {
        //        document.getElementById("accStatus").innerHTML = "Account is " + accStatus.toUpperCase() + " - Unknow Status!";
        //        //alert("Alert! Unknown status code!");
        //    }
        //}
    }

}


function AccStatusCode_iBas(data) {
    //debugger;
    var accStatus = data.AccountStatus.toUpperCase();
    if (accStatus == "A") {
        if (transtype == "TRF02") {
            if (depositFlag == true) {
                document.getElementById("accStatus_debit").innerHTML = "A - Active";
                $("#accStatus_debit").css('color', '#03C988');
                DebitAccountValidation = true;
            }
            else {
                document.getElementById("accStatus_credit").innerHTML = "A - Active";
                $("#accStatus_credit").css('color', '#03C988');
                CreditAccountValidation = true;
            }
        }
        else {
            document.getElementById("accStatus").innerHTML = "A - Active";
            $("#accStatus").css('color', '#03C988');
            AccountValidation = true;
        }
        
    }
    else {
        if (transtype == "TRF02") {
            if (depositFlag == true) {
                $("#accStatus_debit").css('color', 'red');
                DebitAccountValidation = false;

                if (accStatus == "C") {
                    document.getElementById("accStatus_debit").innerHTML = "Account is C - Closed";
                    //alert("Alert! Debit Account Number is Closed!");
                }
                else if (accStatus == "D") {
                    document.getElementById("accStatus_debit").innerHTML = "Account is D - Dormant";
                    //alert("Alert! Debit Account Number is Dormant!");
                }
                else if (accStatus == "I") {
                    document.getElementById("accStatus_debit").innerHTML = "Account is I - Inactive";
                    //alert("Alert! Debit Account Number is Inactive!");
                }
                else if (accStatus == "S") {
                    document.getElementById("accStatus_debit").innerHTML = "Account is S - Stop payment";
                    //alert("Alert! Payment for Debit Account Number is stopped!");
                }
                else {
                    document.getElementById("accStatus_debit").innerHTML = "Account is " + accStatus.toUpperCase() + " - Unknow Status!";
                    //alert("Alert! Unknown status code!");
                }
            }
            else {
                $("#accStatus_credit").css('color', 'red');
                CreditAccountValidation = false;

                if (accStatus == "C") {
                    document.getElementById("accStatus_credit").innerHTML = "Account is C - Closed";
                    //alert("Alert! Debit Account Number is Closed!");
                }
                else if (accStatus == "D") {
                    document.getElementById("accStatus_credit").innerHTML = "Account is D - Dormant";
                    //alert("Alert! Debit Account Number is Dormant!");
                }
                else if (accStatus == "I") {
                    document.getElementById("accStatus_credit").innerHTML = "Account is I - Inactive";
                    //alert("Alert! Debit Account Number is Inactive!");
                }
                else if (accStatus == "S") {
                    document.getElementById("accStatus_credit").innerHTML = "Account is S - Stop payment";
                    //alert("Alert! Payment for Debit Account Number is stopped!");
                }
                else {
                    document.getElementById("accStatus_credit").innerHTML = "Account is " + accStatus.toUpperCase() + " - Unknow Status!";
                    //alert("Alert! Unknown status code!");
                }
            }
        }
        else {
            $("#accStatus").css('color', 'red');
            AccountValidation = false;

            if (accStatus == "C") {
                document.getElementById("accStatus").innerHTML = "Account is C - Closed";
                //alert("Alert! Debit Account Number is Closed!");
            }
            else if (accStatus == "D") {
                document.getElementById("accStatus").innerHTML = "Account is D - Dormant";
                //alert("Alert! Debit Account Number is Dormant!");
            }
            else if (accStatus == "I") {
                document.getElementById("accStatus").innerHTML = "Account is I - Inactive";
                //alert("Alert! Debit Account Number is Inactive!");
            }
            else if (accStatus == "S") {
                document.getElementById("accStatus").innerHTML = "Account is S - Stop payment";
                //alert("Alert! Payment for Debit Account Number is stopped!");
            }
            else {
                document.getElementById("accStatus").innerHTML = "Account is " + accStatus.toUpperCase() + " - Unknow Status!";
                //alert("Alert! Unknown status code!");
            }
        }
        
    }

    if (transtype == "CASHWDL" || transtype == "CASHWDL01" || transtype == "CASHWDL02") {
        SignCheckFlag = false;
        if (AccountValidation == false) {
            document.getElementById("btn_verf_sign").disabled = true;
        }
        else {
            document.getElementById("btn_verf_sign").disabled = false;
        }
    }
    else if (transtype == "TRF")
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "FALSE";
    
}


function ValidateChequeNo(data) {
    //debugger;
    var numbers = /^[0-9]+$/;
    if (data == null || data == "") {
        //alert("Alert! Cheque No can not be null!");
        ErrorMessage = "Cheque No can not be null!";
        return false;
    }
    else if (!data.match(numbers)) {
        //alert("Alert! Cheque No can only accept number!");
        ErrorMessage = "Cheque No can only accept number!";
        return false;
    }
    else if (data.length != 6) {
        //alert("Alert! 6 digit cheque no is required!");
        ErrorMessage = "6 digit cheque no is required!";
        return false;
    }
    return true;
}

function ValidateWithdrawalFormNo(data) {
    //debugger;
    var numbers = /^[0-9]+$/;
    if (data == null || data == "") {
        //alert("Alert! Cheque No can not be null!");
        ErrorMessage = "WF no. can not be null!";
        return false;
    }
    else if (!data.match(numbers)) {
        //alert("Alert! Cheque No can only accept number!");
        ErrorMessage = "WF no. can only accept number!";
        return false;
    }
}


function DateValidation(date, sodRequired) {
    //debugger;
    //PostDated_status = true;
    //StaleDated_status = true;

    if (date == null || date == "") {
        //alert("Alert! Date field is Blank!");
        ErrorMessage = "Date field is Blank!";
        return false;
    }

    var dd = date.substring(0, 2);
    var mm = date.substring(3, 5);
    var yyyy = date.substring(6, 10);

    var num = /^[0-9]+$/;

    if (!dd.match(num) || !mm.match(num) || !yyyy.match(num)) {
        //alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
        ErrorMessage = "Enter Cheque Date in dd-mm-yyyy format!";
        return false;
    }

    var j1 = date.substring(2, 3);
    var j2 = date.substring(5, 6);

    if (j1 != "-" || j2 != "-") {
        //alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
        ErrorMessage = "Enter Cheque Date in dd-mm-yyyy format!";
        return false;
    }

    var fDate = dd + '-' + mm + '-' + yyyy;
    if (transtype != "CTS") {
        var dateResult = validatedate(fDate);
        //debugger;
        if (dateResult == false) {
            //alert("Alert! Enter proper Cheque Date!");
            //ErrorMessage = "Enter proper Cheque Date!";
            return false;
        }

        var sodResult = false;
        //debugger;
        if (sodRequired == true)
            sodResult = SodCheck(fDate);
        else
            sodResult = true;
        //debugger;

        if (sodResult == false) {
            return false;
        }
    }
    else {
        var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        if (fDate.match(dateformat)) {

            debugger;
            var opera1 = fDate.split('/');
            var opera2 = fDate.split('-');
            lopera1 = opera1.length;
            lopera2 = opera2.length;
            // Extract the string into month, date and year  
            if (lopera1 > 1) {
                var pdate = fDate.split('/');
            }
            else if (lopera2 > 1) {
                var pdate = fDate.split('-');
            }
            var dd = parseInt(pdate[0]);
            var mm = parseInt(pdate[1]);
            var yy = parseInt(pdate[2]);
            // Create list of days of a month [assume there is no leap year by default]  
            var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            var currentDate = new Date();
            //debugger;
            var dd_now = currentDate.getDate();
            var mm_now = currentDate.getUTCMonth() + 1;
            var yyyy_now = currentDate.getFullYear();

            if (mm == 1 || mm > 2) {
                if (dd > ListofDays[mm - 1]) {
                    ErrorMessage = "Instrument Date is Invalid!";
                    return false;
                }
            }
            if (mm == 2) {
                var lyear = false;
                if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                    lyear = true;
                }
                if ((lyear == false) && (dd >= 29)) {
                    //alert('Invalid date!');
                    ErrorMessage = "Instrument Date is Invalid!";
                    return false;
                }
                if ((lyear == true) && (dd > 29)) {
                    //alert('Invalid date!');
                    ErrorMessage = "Instrument Date is Invalid!";
                    return false;
                }
            }

        }
        else {
            ErrorMessage = "Instrument Date is Invalid!";
            return false;
        }
    }

    return true;
}


function Check_Date() {
    //debugger;
    PostDated_status = false;
    StaleDated_status = false;
    setTableData();
}


function SetDate() {

    //debugger;
    var date = document.getElementById("date").value;
    if (date == null || date == "") {
        //alert("Alert! Date field is Blank!");
        //ErrorMessage = "Date field is Blank!";
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = "";
        return false;
    }

    if (date.length != 10) {
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = "";
        return false;
    }

    var dd = date.substring(0, 2);
    var mm = date.substring(3, 5);
    var yyyy = date.substring(6, 10);

    var num = /^[0-9]+$/;

    if (!dd.match(num) || !mm.match(num) || !yyyy.match(num)) {
        //alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
        //ErrorMessage = "Enter Cheque Date in dd-mm-yyyy format!";
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = "";
        return false;
    }

    var j1 = date.substring(2, 3);
    var j2 = date.substring(5, 6);

    if (j1 != "-" || j2 != "-") {
        //alert("Alert! Enter Cheque Date in dd-mm-yyyy format!");
        //ErrorMessage = "Enter Cheque Date in dd-mm-yyyy format!";
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = "";
        $("#tr_id_" + row_unique_id).css('color', 'red');
        document.getElementById("valid_" + row_unique_id).innerHTML = "FALSE";
        return false;
    }

    var fDate = dd + '-' + mm + '-' + yyyy;

    if (dd == "00" || mm == "00" || yyyy == "0000") {
        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = "";
        return false;
    }

    //debugger;
    var sodResult = SodCheck(fDate);
    //debugger;
    if (sodResult == false) {

        if (PostDated_status == false) {
            //debugger;
            var resp1 = confirm("Do you want to accept this post dated cheque?");

            //debugger;
            if (!resp1) {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = "";
                document.getElementById("date").value = "";
                PostDated_status = true;
                return false;
            }
            else {
                PostDated_status = true;
            }

        }
        if (StaleDated_status == false) {
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = "";
            //document.getElementById("date").value = "";
            //StaleDated_status = true;
            return false;
        }
        else {
            StaleDated_status = true;
        }
    }

    //debugger;

    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[4].innerHTML = fDate;
    //setTableData();

    return true;

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
        //debugger;
        var dd_now = currentDate.getDate();
        var mm_now = currentDate.getUTCMonth() + 1;
        var yyyy_now = currentDate.getFullYear();

        //debugger;
        if (mm == mm_now) {
            if (dd > dd_now) {
                //alert("Alert! Date is post Dated!");
                ErrorMessage = "Instrument Date is post Dated!";
                PostDated_status = false;
                return false;
            }
        }
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                //alert('Invalid date!');
                ErrorMessage = "Instrument Date is Invalid!";
                return false;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {
                //alert('Invalid date!');
                ErrorMessage = "Instrument Date is Invalid!";
                return false;
            }
            if ((lyear == true) && (dd > 29)) {
                //alert('Invalid date!');
                ErrorMessage = "Instrument Date is Invalid!";
                return false;
            }
        }
        if (mm == mm_now && dd > dd_now) {
            ErrorMessage = "Date is Post Dated!!";
            PostDated_status = false;
            return false;
        }
        return true;
    }
    else {
        //alert("Invalid date !");
        ErrorMessage = "Instrument Date is Invalid!";
        return false;
    }
}


function SodCheck(ChqDate) {
    //debugger;
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
    //debugger;

    var dateSplit = ChqDate.split('-');
    //var d1 = dateSplit[0];
    //var m1 = dateSplit[1];
    //var y1 = dateSplit[2];

    var dd = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];

    var chequeDate = new Date(dd);

    var nextDayDate = new Date();
    nextDayDate.setDate(today.getDate() + 1);

    var PostDate = nextDayDate;
    // postDate Check

    var staledt = new Date(today);
    staledt.setMonth(staledt.getMonth() - 3);
    staledt.setDate(staledt.getDate() + 1);

    var StaleDate = staledt;
    PostDated_status = true;
    StaleDated_status = true;

    //debugger;
    if (PostDate <= chequeDate) {
        //alert('Alert! Date is Post Dated!');
        //var resp = confirm("Date is Post Dated! Do you wish to continue!");

        //if (resp) {

        //}
        //else {
        //    ErrorMessage = "Date is Post Dated!";
        //    return false;
        //}
        ErrorMessage = "Date is Post Dated!";
        PostDated_status = false;

        return false;

    }
    if (StaleDate >= chequeDate) {
        //alert('Alert! Date is Stale Dated!');
        ErrorMessage = "Date is Stale Dated!";
        StaleDated_status = false;
        return false;
    }

    return true;
}


function ResetData() {

    flag = "reset";
    var loginid = document.getElementById("loginid").value;
    var y = "PostData";

    document.getElementById("btn_yes_reset").disabled = true;

    $.ajax({
        url: x + y,
        headers: authHeaders,
        type: 'POST',
        data: { pType: 'reset', maip: loginid, INtellerid: loginid },
        success: getSuccessPush,
        error: getErrorResetData
    });

}


function reloadpage() {
    window.location.reload();
}



function getSuccessPush(result) {
    //debugger;

    $("#tbl_verf_pass").hide();
    $("#tbl_verf_fail").hide();
    $("#div_submit_pass").hide();
    $("#div_submit_fail").hide();
    $("#tbl_verf_result").hide();
    $("#div_response_success").hide();

    if (flag == "submit") {
        if (result == 1) {

            // success resp
            $("#tbl_verf_result").show();
            $("#div_response_success").show();

            document.getElementById("successMsg").innerHTML = "Data Submitted Successfully!";
        }
        else {
            $("#tbl_verf_fail").show();
            $("#div_submit_fail").show();

            document.getElementById("errorMsg").innerHTML = "Data Submission Failed!";
        }
    }
    else if (flag == "reset") {

        // Reset Logic Begin
        $("#div_reset_msg").hide();
        $("#div_reset_button").hide();
        $("#btn_close_reset").hide();
        $("#btn_yes_reset").hide();
        $("#btn_no_reset").hide();
        $("#div_reset_success").show();
        $("#tbl_reset_response").show();
        //$("#success_reset").hide();
        //$("#failed_reset").hide();
        $("#div_reload_page_button").show();
        $("#btn_reload").show();
        // Reset Logic End

        if (result > 0) {

            $("#success_reset").show();
            $("#failed_reset").hide();
            document.getElementById("success_reset").innerHTML = "Data Reset Successful";

            //alert("Data Reset Successfull");
            //window.location.reload();
        }
        else {

            $("#success_reset").hide();
            $("#failed_reset").show();
            document.getElementById("failed_reset").innerHTML = "No Data to Reset";

            //alert("No Data to reset");
            //window.location.reload();
        }
    }

    document.getElementById("btn_yes_reset").disabled = false;
}


function getErrorResetData(result) {
    //alert("Error found in js");
    $("#ProcessingBar").hide();
    document.getElementById("btn_yes_reset").disabled = false;
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

function getSignDetails() {
    //debugger;

    var AccNo = "";
    if (transtype == "TRF02") {
        if (depositFlag == true)
            AccNo = document.getElementById("DebitAccountNo").value;
        else
            AccNo = document.getElementById("CreditAccountNo").value;
    }
    else if (transtype == "RTGS03" || transtype == "RTGS04" || transtype == "RTGS_03_04") {
        AccNo = document.getElementById("chq_account_no").value;
    }
    else
        AccNo = document.getElementById("AccountNo").value;
    
    if (transtype != "RTGS03" && transtype != "RTGS04" && transtype != "RTGS_03_04") {
        if (AccNo == null || AccNo == "") {
            //alert("Account number is empty");
            document.getElementById("AccountNo").focus();
            document.getElementById("accStatus").innerHTML = "Account No is Blank!";
            $("#accStatus").css('color', 'red');
            return false;
        }
    }

    $("#ProcessingBar").show();

    debugger;

    var kVal = document.getElementById("KVal").value;
    var key = CryptoJS.enc.Utf8.parse(kVal);
    var iv = CryptoJS.enc.Utf8.parse(kVal);

    //var encrypted_AccNo = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(AccNo), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    debugger;

    if (BankCode == "240") {

        var customerid = "";
        if (transtype == "TRF02") {
            if (depositFlag == true)
                customerid = DebitCustId;
            else
                customerid = CreditCustId;
        }
        else
            customerid = CustId;

        var data = {
            asdrf: "1234",
            AccNo: customerid,
            BankCode: BankCode
        };

        debugger;
        var jsonData = JSON.stringify(data);
        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        $.ajax({
            type: 'POST',
            url: x + "GetAccSignDetails",
            headers: authHeaders,
            crossDomain: true,
            //data: { AccNo: CustId, BankCode: BankCode },
            data: { Request_Data: encrypted_data },
            success: signPopUp_New,
            error: getError
        });

    }
    else {

        var data = {
            asdrf: "1234",
            AccNo: AccNo,
            BankCode: BankCode
        };

        debugger;
        var jsonData = JSON.stringify(data);
        var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();

        $.ajax({
            type: 'POST',
            url: x + "GetAccSignDetails",
            headers: authHeaders,
            crossDomain: true,
            //data: { 'AccNo': AccNo, BankCode: BankCode },
            data: { Request_Data: encrypted_data },
            //success: getSignCtsTrfSuccess,
            success: signPopUp_New,
            error: getError

        });
    }
}

function signPopUp_New(response_data) {
    debugger;

    var kVal = document.getElementById("KVal").value;
    var result = decryptJsonData(response_data, kVal);

    debugger;

    document.getElementById("ProcessingBar").innerHTML = "Processing Request...";

    if (result.length > 0) {
        var tableSignData = document.getElementById('signTable');
        var c = 0;

        while (tableSignData.rows.length > 1) {
            tableSignData.deleteRow(1);
        }

        for (var i = 0; i < result.length; i++) {
            //debugger;
            c += 1;
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
            imgTag.setAttribute('onclick', "ChqSlipPopUp('SignId_" + i + "')");
            cell1.appendChild(imgTag);
            cell1.height = "100px";
            cell1.width = "100px";
            row.appendChild(cell1);

            var cell2 = row.insertCell(2);
            cell2.innerHTML = result[i].Status;
            row.appendChild(cell2);

            document.getElementById("signTable").appendChild(row);

            //$("#SignData").show();
            if (transtype == "CASHWDL" || transtype == "CASHWDL01")
                SignCheckFlag = true;
            else if (transtype == "TRF02") {
                if (depositFlag == true)
                    document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "TRUE";
                setTableData();
            }
            else if (transtype == "TRF03" || transtype == "TRF06") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "TRUE";
                setTableData();
            }
            else if (transtype == "CI02") {
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[33].innerHTML = "TRUE";
                setTableData();
            }
                
        }

        $("#ProcessingBar").hide();
    }
}

function minmumZeroAmount() {
    var inst_amt = document.getElementById("amt").value;
    //debugger;
    if (inst_amt == null || inst_amt == "")
        document.getElementById("amt").value = 0;
    else {
        if (parseInt(inst_amt) < 0)
            document.getElementById("amt").value = 0;
        else
            preCheckPancard();
    }

}

function change_iqa(Type) {

    var inst_val = document.getElementById("btn_iqa").checked;

    if (inst_val == false) {
        $("#pass_iqa").hide();
        $("#fail_iqa").show();
        if (Type == "CTS") {
            var inst_type = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML;
            //var inst_type = document.getElementById("id_inst_type").checked;
            if (inst_type == "C")
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[14].innerHTML = "FAIL";
        }

    }
    else {
        $("#pass_iqa").show();
        $("#fail_iqa").hide();
        if (Type == "CTS") {
            var inst_type = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML;
            //var inst_type = document.getElementById("id_inst_type").checked;
            if (inst_type == "C")
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[14].innerHTML = "PASS";
        }
    }

    if (Type == "CTS")
        setTableData();
    else if (Type == "CASHWDL" || Type == "CASHWDL01" || Type == "CASHWDL02")
        CheckFlag();
}

function change_uv(Type) {

    var inst_val = document.getElementById("btn_uv").checked;
    debugger;
    if (inst_val == false) {
        $("#pass_uv").hide();
        $("#fail_uv").show();
        if (Type == "CTS" || Type == "TRF" || Type == "TRF02" || Type == "CI") {
            var inst_type = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML;
            //var inst_type = document.getElementById("id_inst_type").checked;
            if (inst_type == "C")
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[15].innerHTML = "FAIL";
        }
    }
    else {
        $("#pass_uv").show();
        $("#fail_uv").hide();
        if (Type == "CTS" || Type == "TRF" || Type == "TRF02") {
            var inst_type = document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[9].innerHTML;
            //var inst_type = document.getElementById("id_inst_type").checked;
            if (inst_type == "C")
                document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[15].innerHTML = "PASS";
        }
    }

    if (Type == "CTS" || Type == "TRF" || Type == "TRF02" || Type == "CI")
        setTableData();
    else if (Type == "CASHWDL" || Type == "CASHWDL01" || Type == "CASHWDL02")
        CheckFlag();
}

function change_ir(Type) {

    var inst_val = document.getElementById("btn_ir").checked;
    if (inst_val == false) {
        $("#pass_ir").hide();
        $("#fail_ir").show();
        if (Type == "CTS")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[16].innerHTML = "FAIL";
    }
    else {
        $("#pass_ir").show();
        $("#fail_ir").hide();
        if (Type == "CTS")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[16].innerHTML = "PASS";
    }

    if (Type == "CTS")
        setTableData();
    else if (Type == "CASHWDL" || Type == "CASHWDL01" || Type == "CASHWDL02")
        CheckFlag();
}

function change_ml(Type) {

    var inst_val = document.getElementById("btn_ml").checked;
    if (inst_val == false) {
        $("#pass_ml").hide();
        $("#fail_ml").show();
        if (Type == "CTS")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[17].innerHTML = "FAIL";
    }
    else {
        $("#pass_ml").show();
        $("#fail_ml").hide();
        if (Type == "CTS")
            document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[17].innerHTML = "PASS";
    }

    if (Type == "CTS")
        setTableData();
    else if (Type == "CASHWDL" || Type == "CASHWDL01" || Type == "CASHWDL02")
        CheckFlag();
}

function CheckFlag() {
    var iqa = document.getElementById("btn_iqa").checked;
    var uv = document.getElementById("btn_uv").checked;
    var ir = document.getElementById("btn_ir").checked;
    var ml = document.getElementById("btn_ml").checked;
    if (transtype == "CASHWDL02") {
        if (iqa == true && ir == true && ml == true) {
            $("#div_submit_pass").show();
        }
        else {
            $("#div_submit_pass").hide();
        }
    }
    else {
        if (iqa == true && uv == true && ir == true && ml == true) {
            $("#div_submit_pass").show();
        }
        else {
            $("#div_submit_pass").hide();
        }
    }
    
}


function chqAmtChange(amt_type) {
    //debugger;
    if (amt_type == "SLIP") {

        var slipamt = document.getElementById("slip_amt").value;

        if (slipamt.length > 13) {
            slipamt = slipamt.substring(0, 13);
            document.getElementById("slip_amt").value = slipamt;
        }

        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[2].innerHTML = slipamt;

        var total = 0;

        for (i = 1; i < tableChequeData.rows.length; i++) {
            var amt = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[2].innerHTML;
            if (amt != null && amt != "")
                total += parseFloat(amt);
            else
                total += 0;
        }

        document.getElementById("total_slip_amt").value = total;
    }
    else if (amt_type == "CHQ") {

        var chqamt = document.getElementById("chq_amt").value;

        if (chqamt.length > 13) {
            chqamt = chqamt.substring(0, 13);
            document.getElementById("chq_amt").value = chqamt;
        }

        document.getElementById("tblChequeData").getElementsByTagName('tr')[GlobalRowNo].cells[3].innerHTML = chqamt;

        var total = 0;

        for (i = 1; i < tableChequeData.rows.length; i++) {
            var amt = document.getElementById("tblChequeData").getElementsByTagName('tr')[i].cells[3].innerHTML;
            if (amt != null && amt != "")
                total += parseFloat(amt);
            else
                total += 0;
        }

        if (transtype != "TRF02")
            document.getElementById("total_chq_amt").value = total;
    }
    else if (amt_type == "USER_MANAGEMENT_L1_1" || amt_type == "USER_MANAGEMENT_L1_2" || amt_type == "USER_MANAGEMENT_L2_1" || 
        amt_type == "USER_MANAGEMENT_L2_2" || amt_type == "USER_MANAGEMENT_L3_1" || amt_type == "USER_MANAGEMENT_L3_2") {
        //debugger;
        var amt = "";
        var input_id = "";

        if (amt_type == "USER_MANAGEMENT_L1_1") {
            amt = document.getElementById("L1StartLimit").value;
            input_id = "L1StartLimit";
        }
        else if (amt_type == "USER_MANAGEMENT_L1_2") {
            amt = document.getElementById("L1StopLimit").value;
            input_id = "L1StopLimit";
        }
        else if (amt_type == "USER_MANAGEMENT_L2_1") {
            amt = document.getElementById("L2StartLimit").value;
            input_id = "L2StartLimit";
        }
        else if (amt_type == "USER_MANAGEMENT_L2_2") {
            amt = document.getElementById("L2StopLimit").value;
            input_id = "L2StopLimit";
        }
        else if (amt_type == "USER_MANAGEMENT_L3_1") {
            amt = document.getElementById("L3StartLimit").value;
            input_id = "L3StartLimit";
        }
        else if (amt_type == "USER_MANAGEMENT_L3_2") {
            amt = document.getElementById("L3StopLimit").value;
            input_id = "L3StopLimit";
        }

        if (amt.length > 13) {
            amt = amt.substring(0, 13);
            document.getElementById(input_id).value = amt;
        }

        if (parseFloat(amt) < 0) {
            document.getElementById(input_id).value = "0";
        }
            
    }
}


function dotAccNo() {
    //debugger;
    var DotA = parseInt(document.getElementById("DotAccNoPartA").value);
    var DotB = parseInt(document.getElementById("DotAccNoPartB").value);
    var DotC = parseInt(document.getElementById("DotAccNoPartC").value);

    var acc = $("#AccountNo").val();
    var acclen = acc.length;

    if (acc.indexOf('.') !== -1) {
        var num = acc.match(/\./g).length;
        if (num > 0) {
            //console.log('dot');
            //console.log(num);
            if (num === 1) {
                var dotIndex1 = acc.indexOf('.');
                //console.log('dotIndex1 - ' + dotIndex1);
                //console.log('currentCharacterIndex - ' + acc.length);
                if (dotIndex1 !== 0) {
                    if ((acc.length - 1) <= dotIndex1) {
                        var accStringNew1 = acc;
                        //console.log('accStringNew1 - ' + accStringNew1);
                        var accString1 = accStringNew1.replace(/\./g, "");
                        //console.log('accString1 - ' + accString1);
                        //acc1 = padLeadingZeros(accString1, 4);
                        //debugger;
                        if (accString1.length > DotA) {
                            var a = accString1.substring(0, DotA);
                            document.getElementById("AccountNo").value = a;
                            //alert('');
                            document.getElementById("AccountNo").focus();
                            return false;
                        }
                        acc1 = padLeadingZeros(accString1, DotA);
                        //console.log('acc1 - ' + acc1);
                        var chkResult = checkStringWithAllZero(acc1);
                        if (chkResult === true) {
                            finalAccount = acc1;
                            //console.log('finalAccount - ' + finalAccount);
                        }
                        else {
                            //alert('Please enter non zero value.');
                            document.getElementById("accStatus").innerHTML = "Please enter non zero value!";
                            $("#accStatus").css('color', 'red');
                            document.getElementById("AccountNo").focus();
                            return false;
                        }

                    }
                }
                else {
                    var str = $("#AccountNo").val();
                    var strNew = str.replace(/\./g, "");
                    $("#AccountNo").val(strNew);
                    //alert('Please Enter digit');
                    document.getElementById("accStatus").innerHTML = "Please Enter digit!";
                    $("#accStatus").css('color', 'red');
                    return false;
                }


            }
            if (num === 2) {
                var dotIndex2 = acc.indexOf('.');
                var lastdotIndex2 = acc.lastIndexOf('.');
                //console.log('Last dotIndex - ' + lastdotIndex2);
                //debugger;
                if ((acc.length - 1) <= lastdotIndex2) {
                    var subAccString = acc.substring(dotIndex2);
                    //console.log('subAccString - ' + subAccString);
                    var accStringNew2 = subAccString;
                    var accString2 = accStringNew2.replace(/\./g, "");
                    //console.log('accString2 - ' + accString2);
                    //debugger;
                    if (accString2.length > DotB) {
                        var i = accString2.length - DotB;
                        var l = DotA + DotB + 1;
                        var a = acc.substring(0, acc.length - i - 1);
                        document.getElementById("AccountNo").value = a;
                        //alert('');
                        document.getElementById("AccountNo").focus();
                        return false;
                    }
                    acc2 = padLeadingZeros(accString2, DotB);
                    //console.log('acc2 - ' + acc2);
                    var chkResult1 = checkStringWithAllZero(acc2);
                    if (chkResult1 === true) {
                        finalAccount = acc1 + acc2;
                        //console.log('finalAccount - ' + finalAccount);
                    }
                    else {
                        //alert('Please enter non zero value.');
                        document.getElementById("accStatus").innerHTML = "Please enter non zero value!";
                        $("#accStatus").css('color', 'red');
                        document.getElementById("AccountNo").focus();
                        return false;
                    }
                }
                else {
                    acc3 = acc.substring(acc.lastIndexOf('.') + 1);
                    //console.log('acc3 - ' + acc3);
                    acc3 = padLeadingZeros(acc3, DotC);
                    var chkResult2 = checkStringWithAllZero(acc3);
                    if (chkResult2 === true) {
                        finalAccount = acc1 + acc2 + acc3;
                        //console.log('finalAccount - ' + finalAccount);
                    }
                    else {
                        //alert('Please enter non zero value.');
                        document.getElementById("accStatus").innerHTML = "Please enter non zero value!";
                        $("#accStatus").css('color', 'red');
                        document.getElementById("AccountNo").focus();
                        return false;
                    }
                    finalAccount = acc1 + acc2 + acc3;
                    //console.log('finalAccount - ' + finalAccount);
                }
            }
            if (num > 2) {
                //alert('You can not enter more than 2 dot.');
                document.getElementById("accStatus").innerHTML = "You can not enter more than 2 dot!";
                $("#accStatus").css('color', 'red');
                return false;
            }
            return finalAccount;
        }
    }
}

function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
};

function checkStringWithAllZero(str) {
    var number = Number(str);
    if (number > 0) {
        return true;
    }
    else {
        return false;
    }
};

function changeAccNo() {
    var dotcall = document.getElementById("DotAccNo").value;
    if (dotcall == "Y") {
        //console.log("ChangeAccNo function");
        //var accNo = document.getElementById("AccountNo").value;
        var result = dotAccNo();
        //debugger;
        if (result == false) {
            return false;
        }
        else {
            finalAccount = result;
        }
    }

}

//================== Amol changes validation for DOB,Email,Mobile on 19/05/2023 start ======================================

function ValidateDOB(inputDate) {
    //var lblError = document.getElementById("lblError");

    debugger;

    //Get the date from the TextBox.
    //var dateString = document.getElementById("txtDate").value;
    var dateString = inputDate;
    //var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
    var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\-(0[1-9]|1[0-2])\-((19|20)\d\d))$/;

    if (dateString.length != 10) {
        ErrorMessage = "Enter date in dd-MM-yyyy format ONLY.";
        return false;
    }

    var dd = dateString.substring(0, 2);
    var mm = dateString.substring(3, 5);
    var yyyy = dateString.substring(6, 10);

    var num = /^[0-9]+$/;

    if (!dd.match(num) || !mm.match(num) || !yyyy.match(num)) {
        ErrorMessage = "Enter proper date";
        return false;
    }

    var j1 = dateString.substring(2, 3);
    var j2 = dateString.substring(5, 6);

    if (j1 != "-" || j2 != "-") {
        ErrorMessage = "Enter Proper Date";
        return false;
    }

    //Check whether valid dd/MM/yyyy Date Format.
    if (regex.test(dateString)) {
        var parts = dateString.split("-");
        var dtDOB = new Date(parts[1] + "-" + parts[0] + "-" + parts[2]);
        var dtCurrent = new Date();
        //lblError.innerHTML = "Eligibility 18 years ONLY."

        debugger;
        if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
            ErrorMessage = "Eligibility 18 years ONLY.";
            return false;
        }

        if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {

            //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
            if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                ErrorMessage = "Eligibility 18 years ONLY. 1";
                return false;
            }
            if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
                if (dtCurrent.getDate() < dtDOB.getDate()) {
                    ErrorMessage = "Eligibility 18 years ONLY. 2";
                    return false;
                }
            }
        }
        //lblError.innerHTML = "";
        return true;
    }
    //else {
    //    //lblError.innerHTML = "Enter date in dd/MM/yyyy format ONLY."
    //    ErrorMessage = "Enter date in dd-MM-yyyy format ONLY.";
    //    return false;
    //}
}

function ValidateEmail(inputEmail) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //debugger;
    if (inputEmail == "" || inputEmail == null) {
        ErrorMessage = "Email Id cannot be blank!";
        return false;
    }
    else if (inputEmail.value.match(validRegex)) {

        return true;

    } else {

        ErrorMessage = "Invalid Email format.";

        return false;

    }
}

function ValidateMobile(inputNumber) {

    //var val = inputNumber.value
    if (/^\d{10}$/.test(inputNumber)) {
        // value is ok, use it
    } else {

        ErrorMessage = "Invalid number; must be ten digits.";

        return false
    }
}

function BackToPage(FormType, VerfLevel) {

    //debugger;
    if (FormType == "THIRD_PARTY") {
        if (VerfLevel == "L1") {
            window.open(rooturl + "BankingForm/BankList?FormType=THIRD_PARTY", "_self");
        }
    }
    else if (FormType == "NRO") {
        if (VerfLevel == "L1") {
            window.open(rooturl + "BankingForm/BankList?FormType=NRO", "_self");
        }
    }
    else if (FormType == "RTGS") {
        if (VerfLevel == "L1") {
            window.open(rooturl + "RtgsNeft/RtgsList", "_self");
        }
    }
    else if (FormType == "ROLEMASTER") {
        if (VerfLevel == "EDIT") {
            window.open(rooturl + "RoleMaster/ListOfRoles", "_self");
        }
    }

}

function rotateImage() {
    //debugger;

    imgRotateVal += 180;

    let img = document.getElementById("FG");
    img.style.transform = 'rotate(' + imgRotateVal + 'deg)';
}

function Chq_Pan_Validation() {

    debugger;
    var numbers = /^[0-9]+$/;
    var InstrumentNo = "";
    var amt = "";

    if (transtype != "TRF02" && transtype != "TRF03" && transtype != "TRF04" && transtype != "TRF05" && transtype != "TRF06" && transtype != "TRF07" && transtype != "TRF08"
        && transtype != "DI02" && transtype != "DI03"
        && transtype != "CI02" && transtype != "CI03" && transtype != "CI04")
        amt = document.getElementById("amt").value;

    var accountno = "";
    if (transtype == "TRF02") {
        if (depositFlag == true)
            accountno = document.getElementById("DebitAccountNo").value;
        else {
            chq_validation = true;
            return true;
        }
    }
    else
        accountno = document.getElementById("AccountNo").value;

    if (transtype == "CASHWDL") {
        var instType = document.getElementById("inst_type").value;
        InstrumentNo = document.getElementById("chqnoDataEntry").value;
        if (instType != "CHQ" || ValidateChequeNo(InstrumentNo) == false) {
            chq_validation = false;
            return false;
        }
    }
    else if (transtype == "CASHWDL01") {
        InstrumentNo = document.getElementById("chqnoDataEntry").value;
        if (ValidateChequeNo(InstrumentNo) == false) {
            chq_validation = false;
            return false;
        }
    }
    else if (transtype == "TRF02") {
        InstrumentNo = document.getElementById("id_chq").value;
        if (InstrumentNo == null || InstrumentNo == "") {
            chq_validation = false;
            return false;
        }
        else if (InstrumentNo.length != 6) {
            chq_validation = false;
            return false;
        }
        else if (!InstrumentNo.match(numbers)) {
            chq_validation = false;
            return false;
        }
    }
    else if (transtype == "TRF03" || transtype == "TRF06" || transtype == "CI02") {
        InstrumentNo = document.getElementById("id_chq").value;
        if ((InstrumentNo == null || InstrumentNo == "") && (Scanning_Type == "3" || Scanning_Type == "4")) {
            chq_validation = false;
            return false;
        }
        else if (InstrumentNo.length != 6 && Scanning_Type == "3") {
            chq_validation = false;
            return false;
        }
        else if (!InstrumentNo.match(numbers) && (Scanning_Type == "3" || Scanning_Type == "4")) {
            chq_validation = false;
            return false;
        }
    }
    //else if (transtype == "CI01" || transtype == "CI03" || transtype == "CI04" || transtype == "DI01" || transtype == "DI02" || transtype == "DI03") {
    //    chq_validation = true;
    //}
    else if (transtype == "CASHDEP")
        InstrumentNo = "000000";
    else {
        //PanValidation_Status = false;
        return false;
    }
    debugger;

    var kVal = document.getElementById("KVal").value;
    var key = CryptoJS.enc.Utf8.parse(kVal);
    var iv = CryptoJS.enc.Utf8.parse(kVal);

    //var encrypted_AccNo = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(accountno), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    var customerid = "";
    if (transtype == "TRF02") {
        if (depositFlag == true)
            customerid = DebitCustId;
        else
            customerid = CreditCustId;
    }
    else
        customerid = CustId;

    var data = {
        asdrf: "1234",
        AccNo: accountno,
        ChequeNo: InstrumentNo,
        Amt: amt,
        BankCode: BankCode,
        CustomerId: customerid,
        RefNo: RefNo
    };

    //var data = {
    //    asdrf: "1234",
    //    AccNo: accountno,
    //    ChequeNo: InstrumentNo,
    //    Amt: amt,
    //    BankCode: BankCode
    //};

    debugger;
    var jsonData = JSON.stringify(data);
    var encrypted_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(jsonData), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
    debugger;

    var y = "Async_Cheque_Pan_Validation";

    debugger;
    $.ajax({
        type: "POST",
        url: x + y,
        data: {
            //AccNo: encrypted_AccNo.toString(), ChequeNo: InstrumentNo, Amt: amt, BankCode: BankCode
            Request_Data: encrypted_data
        },
        success: getChqPanSuccessResp,
        error: FailedApiResp
    });

}

function FailedApiResp(data) {
    debugger;
    document.getElementById("ProcessingBar").innerHTML = data.responseText;
    chq_validation_msg = data.responseText;
    $("#ProcessingBar").show();
}

function getChqPanSuccessResp(response_data) {
    $("#ProcessingBar").hide();

    debugger;
    var kVal = document.getElementById("KVal").value;
    var data = decryptJsonData(response_data, kVal);
    debugger;


    if (data.FinCall.toUpperCase() == "Y") {
        if (transtype == "CASHDEP") {
            if (BankCode == "059") {
                if (data.panExistsFlag.toUpperCase() == "Y") {
                    PanValidation_Status = true;
                    document.getElementById("pan").value = data.panNumber;
                    document.getElementById("pan").disabled = true;
                }
                else {
                    PanValidation_Status = false;
                    document.getElementById("pan").disabled = false;
                    alert("PAN number not available!");
                }
            }
        }
        else if (transtype == "CASHWDL" || transtype == "CASHWDL01" || transtype == "TRF02" || transtype == "TRF03" || transtype == "TRF06" || transtype == "CI02") {

            if (data.Status_Flg.toUpperCase() == "SUCCESS") {
                // Common for 240 & 059
                chq_validation = true;
            }
            else {
                chq_validation_msg = data.Status_desc;
                chq_validation = false;
            }
        }
        else if (transtype == "CASHWDL02") {
            chq_validation = true;
        }
    }
    else if (data.FinCall.toUpperCase() == "N") {
        if (transtype == "CASHDEP") {
            PanValidation_Status = true;
            document.getElementById("pan").disabled = false;
        }
        else if (transtype == "CASHWDL" || transtype == "CASHWDL01" || transtype == "CASHWDL02"
            || transtype == "TRF02" || transtype == "TRF03" || transtype == "TRF06"
            || transtype == "CI02") {
            chq_validation = true;
        }
    }

    debugger;
    if (transtype == "TRF02" || transtype == "TRF03" || transtype == "TRF06" || transtype == "CI02") {
        setTableData();
    }
}

function GetMasterList(result) {
    //debugger;
    //var acctype = document.getElementById("accesstype").value;
    var y = "UserDetails";

    if (result == "ORG") {
        $("#div_data_list").show();
        document.getElementById("th_head").innerHTML = "Organization list";
    }
    else if (result == "CUST") {
        $("#div_data_list").show();
        document.getElementById("th_head").innerHTML = "Customer list";
    }
    else if (result == "DOM") {
        $("#div_data_list").show();
        document.getElementById("th_head").innerHTML = "Domain list";
    }
    else if (result == "BRANCH") {
        $("#div_data_list").show();
        document.getElementById("th_head").innerHTML = "Branch list";
    }
    else {
        $("#div_data_list").hide();
        return false;
    }
        

    $.ajax({
        type: "POST",
        url: x + y,
        data: { SearchType: result, ActionType: actionType, LoginId: id },
        success: SuccessList,
        error: getError

    });
}


function SuccessList(data) {
    //debugger;

    $("#data_list").find("tr:gt(0)").remove();
    rowcount = 0;

    $.each(data, function (index, print) {
        AddRecordRow(print);
    });


    /*document.getElementsByClassName("form-check-label")[0].value = data.Name;*/
}

function AddRecordRow(print) {
    if ($("#data_list tbody").length == 0) {
        $("#data_list").append("<tbody></tbody>");
    }
    // Append row to <table>
    $("#data_list tbody").append(
        RecordTableRow(print));
}

function RecordTableRow(print) {

    //debugger;
    rowcount += 1;

    if (print.Status == "1") {
        var list =/*'<tr>'+'<th id="'+print.Id+'">'+'Organization Name'+'</th></tr>'+*/
            '<tr>' +
            '<td onclick="tick_data(' + rowcount + ')" class="form-check">' +
            '<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" onclick="tick_data(' + rowcount + ')" checked>' + print.Name + '</input>' +
            '</td>' +
            '</tr>';
    }
    else {
        var list =/*'<tr>'+'<th id="'+print.Id+'">'+'Organization Name'+'</th></tr>'+*/
            '<tr>' +
            '<td onclick="tick_data(' + rowcount + ')" class="form-check">' +
            '<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" onclick="tick_data(' + rowcount + ')">' + print.Name + '</input>' +
            '</td>' +
            '</tr>';
    }

    return list;
}

function tick_data(input_para) {
    //debugger;
    var data = document.getElementById('id_' + input_para).checked;
    //debugger;
    if (data == true) {
        document.getElementById('id_' + input_para).checked = false;
    }
    else {
        document.getElementById('id_' + input_para).checked = true;
    }
    //debugger;
}

function ResetDataFunctionCall() {
    debugger;
    $("#div_reset_msg").show();
    $("#div_reset_button").show();
    $("#div_reset_success").hide();
    $("#tbl_reset_response").hide();
    $("#div_reload_page_button").hide();
    $("#btn_reload").hide();
}

function resetCreateUserData() {
    //debugger;
    //document.getElementById("LoginId").value = "";
    document.getElementById("FirstName").value = "";
    document.getElementById("LastName").value = "";
    document.getElementById("emailId").value = "";
    document.getElementById("UserLevel").value = "0";
    document.getElementById("accesstype").value = "0";
    document.getElementById("L1StartLimit").value = "";
    document.getElementById("L1StopLimit").value = "";
    document.getElementById("L2StartLimit").value = "";
    document.getElementById("L2StopLimit").value = "";
    document.getElementById("L3StartLimit").value = "";
    document.getElementById("L3StopLimit").value = "";

    $("#data_list").find("tr:gt(0)").remove();
    document.getElementById("th_head").innerHTML = "";
}

function RestrictData(result) {
    //debugger;
    if (result == "Teller") {
        if (document.getElementById("accesstype").value != "BRANCH") {
            $("#org").hide();
            $("#customer").hide();
            $("#domain").hide();
            $("#data_list").find("tr:gt(0)").remove();
            document.getElementById("th_head").innerHTML = "";
        }
    }
    else {
        $("#org").show();
        $("#customer").show();
        $("#domain").show();
    }
}

//function CheckDenomFlag(denom) {
//    debugger;
//    var outCash = parseInt(document.getElementById("lbl_" + denom + "_out").innerHTML);
//    var input = parseInt(document.getElementById("input_" + denom).value);
//    var inCash = parseInt(document.getElementById("lbl_" + denom + "_in").innerHTML);
//    var AVal = parseInt(document.getElementById("lbl_" + denom + "_AValue").innerHTML);

//    debugger;
//    if (PageType == "CASHEX") {
//        if ((inCash + AVal) < (outCash + input)) {
//            outputData = false;
//            $("#row_" + denom).css('color', 'red');
//            return false;
//        }
//        else
//            $("#row_" + denom).css('color', '');
//    }
//    else {
//        if (AVal < (outCash + input)) {
//            outputData = false;
//            $("#row_" + denom).css('color', 'red');
//            //return false;
//        }
//        else
//            $("#row_" + denom).css('color', '');
//    }

//    debugger;
//    //return true;

//}

// user02
function ReportCodeList(data) {
    //debugger;

    var ReportName = data;
    var rpt = "<select id='rpt_code' class='form-select form-select-sm'>";
    if (ReportName != null) {
        for (i = 0; i < ReportName.length; i++) {
            rpt = rpt + '<option value="' + ReportName[i].Code + '" >' + ReportName[i].Name + '</option>';
        }
    }
    rpt = rpt + '</select>';
    $('#rpt_list').html(rpt);
    //debugger;

    $("#ProcessingBar").hide();
}

// user02
function ReportCodeList_selected(data) {
    //debugger;

    var ReportName = data;
    var rpt = "<select id='rpt_code' class='form-select form-select-sm'>";
    if (ReportName != null) {
        for (i = 0; i < ReportName.length; i++) {
            if (ReportName[i].Code == old_rpt_code)
                rpt = rpt + '<option value="' + ReportName[i].Code + '" selected>' + ReportName[i].Name + '</option>';
            else
                rpt = rpt + '<option value="' + ReportName[i].Code + '">' + ReportName[i].Name + '</option>';
        }
    }
    rpt = rpt + '</select>';
    $('#rpt_list').html(rpt);
    //debugger;

    $("#ProcessingBar").hide();
}

// user02
function ErrorReportCode(data) {
    //debugger;
    document.getElementById("ProcessingBar").innerHTML = data;
}

function GetRole() {
    debugger;
    $.ajax({
        url: x + 'RoleMasterList',
        type: 'POST',
        data: { LoginId: userId },
        success: function (successRole) {
            var usertype = successRole;
            var role = "<select id='UserLevel' class='form-control' onchange='RoleChange()'>";

            if (usertype != null) {
                for (i = 0; i < usertype.length; i++) {
                    debugger;
                    if (usertype[i].Name == old_UserLevel)
                        role = role + '<option id="' + usertype[i].Name + '" value="' + usertype[i].Name + '" selected>' + usertype[i].Name + '</option>';
                    //else
                    //    role = role + '<option id=' + usertype[i].Name + ' value=' + usertype[i].Name + '>' + usertype[i].Name + '</option>';
                }
                for (i = 0; i < usertype.length; i++) {
                    if (usertype[i].Name != old_UserLevel)
                        role = role + '<option id="' + usertype[i].Name + '" value="' + usertype[i].Name + '">' + usertype[i].Name + '</option>';
                }
            }
            role = role + '</select>';
            $('#userType').html(role);

        },
        error: getError

    });


}

function GetRoleUserChecker() {

    debugger;
    $.ajax({
        url: x + 'RoleMasterList',
        type: 'POST',
        data: { LoginId: userId },
        success: function (successRole) {
            var usertype = successRole;
            var role = "<select id='UserLevel' class='form-control' onchange='RoleChange()' disabled >";

            if (usertype != null) {
                for (i = 0; i < usertype.length; i++) {
                    debugger;
                    if (usertype[i].Name == old_UserLevel)
                        role = role + '<option id="' + usertype[i].Name + '" value="' + usertype[i].Name + '" selected>' + usertype[i].Name + '</option>';
                }

                for (i = 0; i < usertype.length; i++) {
                    if (usertype[i].Name != old_UserLevel)
                        role = role + '<option id="' + usertype[i].Name + '" value="' + usertype[i].Name + '">' + usertype[i].Name + '</option>';
                }
            }
            role = role + '</select>';
            $('#userType').html(role);
        },
        error: getError
    });



}
function decrypt(encryptedText, key) {
    var cryptoKey = crypto.createHash('sha256').update(key).digest();
    var decipher = crypto.createDecipheriv('aes-256-cbc', cryptoKey, '');
    var decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


                
//// Decrypt the data
//function decryptData(encryptedText, key) {
//    // Convert the 16-digit key into a WordArray
//    var keyWordArray = CryptoJS.enc.Utf8.parse(key);

//    // Extract the IV from the encrypted data (assuming it's prepended)
//    var iv = CryptoJS.enc.Hex.parse(encryptedText.substr(0, 32)); // Assuming 16 bytes IV length
//    var encryptedData = encryptedText.substr(32);

//    // Decrypt the data using the key and IV
//    var decrypted = CryptoJS.AES.decrypt(
//        {
//            ciphertext: CryptoJS.enc.Base64.parse(encryptedData),
//        },
//        keyWordArray,
//        {
//            iv: iv,
//        }
//    );

//    // Convert the decrypted WordArray to a string
//    var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

//    return decryptedText;
//}

//function decryptData(encryptedText, key) {
//    // Convert the 16-digit key into a WordArray
//    var keyWordArray = CryptoJS.enc.Utf8.parse(key);

//    // Extract the IV from the encrypted data (assuming it's prepended)
//    var iv = CryptoJS.enc.Hex.parse(encryptedText.substr(0, 32)); // Assuming 16 bytes IV length
//    var encryptedData = encryptedText.substr(32);

//    // Decrypt the data using the key and IV
//    var decrypted = CryptoJS.AES.decrypt(
//        encryptedData,
//        keyWordArray,
//        {
//            iv: iv,
//        }
//    );

//    // Convert the decrypted WordArray to a string
//    var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

//    return decryptedText;
//}

function decryptData(encryptedText, key) {
    debugger;
    // Convert the 16-digit key into a WordArray
    var keyWordArray = CryptoJS.enc.Utf8.parse(key);

    // Extract the IV from the encrypted data (assuming it's prepended)
    var iv = CryptoJS.enc.Hex.parse(encryptedText.substr(0, 32)); // Assuming 16 bytes IV length
    var encryptedData = encryptedText.substr(32);

    // Decrypt the data using the key and IV
    var decrypted = CryptoJS.AES.decrypt(
        {
            ciphertext: CryptoJS.enc.Base64.parse(encryptedData),
        },
        keyWordArray,
        {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7, // Add PKCS7 padding
            mode: CryptoJS.mode.CBC, // Set the cipher mode to CBC
        }
    );

    // Convert the decrypted WordArray to a string
    var decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);

    return decryptedText;
}


function decryptJsonData(encryptedData, encryptionKey) {
    //debugger;
    // Convert the encryption key to a byte array
    var keyBytes = CryptoJS.enc.Utf8.parse(encryptionKey);

    // Extract the IV from the encrypted data
    var iv = encryptedData.substring(0, 24);

    // Remove the IV from the encrypted data
    var data = encryptedData.substring(24);

    // Convert the IV and encrypted data from base64 to bytes
    var ivBytes = CryptoJS.enc.Base64.parse(iv);
    var encryptedBytes = CryptoJS.enc.Base64.parse(data);

    // Create a decryption configuration object
    var decryptConfig = {
        iv: ivBytes,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        key: keyBytes,
    };

    // Decrypt the encrypted data using the decryption configuration
    var decryptedData = CryptoJS.AES.decrypt(
        { ciphertext: encryptedBytes },
        keyBytes,
        decryptConfig
    );

    // Convert the decrypted data to a string and trim any padding
    var decryptedString = decryptedData.toString(CryptoJS.enc.Utf8).trim();

    // Parse the decrypted JSON data into an object
    var decryptedObject = JSON.parse(decryptedString);

    //debugger;

    // Use the decrypted object as needed
    //console.log(decryptedObject);

    return decryptedObject;
}

function RemoveHighlight(id) {
    document.getElementById(id).style.backgroundColor = "";
}


function Ref_No_Generator(Transaction_Type) {
    var newRefNo = "";

    var currentDate = new Date();
    var yyyy = currentDate.getFullYear();

    newRefNo = Transaction_Type + yyyy.toString().substring(2, 4) + String(currentDate.getUTCMonth() + 1).padStart(2, '0')
        + String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getHours()).padStart(2, '0') + String(currentDate.getMinutes()).padStart(2, '0')
        + String(currentDate.getSeconds()).padStart(2, '0') + String(currentDate.getMilliseconds()).padStart(3, '0');

    return newRefNo;
}


function Ref_No_Generator(Transaction_Type, count_id) {
    debugger;
    var newRefNo = "";
    var dataid = count_id.padStart(12, "0");
    newRefNo = Transaction_Type + dataid;
    return newRefNo;
}

function ColorCodeScore(data) {
    debugger;

    var score = parseFloat(data) * 10;
    if (score >= 9)
        return "03C988";
    else if (parseFloat(score) >= 3)
        return "FFBF00";
    else
        return "DE3163";
    
}


function DateFormatter(data) {
    debugger;
    var outDate = "";
    if (data != null && data != "") {

        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();

        var dd, mm, yyyy;
        //data = "31072023";
        if (data.length == 8) {
            dd = data.substring(0, 2);
            mm = data.substring(2, 4);
            yyyy = data.substring(4, 8);
        }
        else if (data.length == 10) {
            dd = data.substring(0, 2);
            mm = data.substring(3, 5);
            yyyy = data.substring(6, 10);
        }
        else {
            if (BankCode == "059")
                outDate = data;
            return outDate;
        }
            

        var num = /^[0-9]+$/;

        if (!dd.match(num) || !mm.match(num) || !yyyy.match(num))
            return outDate;
        else if (parseInt(dd) > 31 || parseInt(mm) > 12)
            return outDate;
        else if (parseInt(yyyy) > parseInt(currentYear))
            return outDate;

        outDate = dd + "-" + mm + "-" + yyyy;
    }
    return outDate;
}


function currentDate() {
    var currentDate = new Date();

    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
    var yyyy = currentDate.getFullYear();

    return dd + '-' + mm + '-' + yyyy;
}   

function RoleChange() {
    debugger;
    var role = document.getElementById("UserLevel").value;
    if (role.toUpperCase() == "TELLER" || role.toUpperCase() == "BRANCH") {
        $("#select").show();
        $("#org").hide();
        $("#customer").hide();
        $("#domain").hide();
        $("#branch").show();
    }
    else {
        $("#select").show();
        $("#org").show();
        $("#customer").show();
        $("#domain").show();
        $("#branch").show();
    }
}


function GetMasterListChecker(result) {
    //debugger;
    //var acctype = document.getElementById("accesstype").value;
    var y = "UserDetails";

    if (result == "ORG") {
        document.getElementById("th_head").innerHTML = "Organization list";
    }
    else if (result == "CUST") {
        document.getElementById("th_head").innerHTML = "Customer list";
    }
    else if (result == "DOM") {
        document.getElementById("th_head").innerHTML = "Domain list";
    }
    else if (result == "BRANCH") {
        document.getElementById("th_head").innerHTML = "Branch list";
    }
    else {
        return false;
    }
        

    $.ajax({
        type: "POST",
        url: x + y,
        data: { SearchType: result, ActionType: actionType, LoginId: id },
        success: SuccessListChecker,
        error: getError

    });
}


function SuccessListChecker(data) {
    //debugger;

    $("#data_list").find("tr:gt(0)").remove();
    rowcount = 0;

    $.each(data, function (index, print) {
        AddRecordRowChecker(print);
    });


    /*document.getElementsByClassName("form-check-label")[0].value = data.Name;*/
}

function AddRecordRowChecker(print) {
    if ($("#data_list tbody").length == 0) {
        $("#data_list").append("<tbody></tbody>");
    }
    // Append row to <table>
    $("#data_list tbody").append(
        RecordTableRowChecker(print));
}

function RecordTableRowChecker(print) {

    //debugger;
    rowcount += 1;

    if (print.Status == "1") {
        var list =/*'<tr>'+'<th id="'+print.Id+'">'+'Organization Name'+'</th></tr>'+*/
            '<tr>' +
            //'<td onclick="tick_data(' + rowcount + ')" class="form-check">' +
            //'<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" onclick="tick_data(' + rowcount + ')" checked disabled>' + print.Name + '</input>' +
            //'</td>' +
            //'</tr>';
            '<td class="form-check">' +
            '<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" checked disable>' +
            '<label for="id_' + rowcount + '">' + print.Name + '</label>' +
            '</td>' +
            '<tr>';
    }
    else {
        var list =/*'<tr>'+'<th id="'+print.Id+'">'+'Organization Name'+'</th></tr>'+*/
            '<tr>' +
            //'<td onclick="tick_data(' + rowcount + ')" class="form-check">' +
            //'<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" onclick="tick_data(' + rowcount + ')" disabled>' + print.Name + '</input>' +
            //'</td>' +
            //'</tr>';

            '<td class="form-check">' +
            '<input type="checkbox" id="id_' + rowcount + '" value="' + print.Id + '" disabled>' +
            '<label for="id_' + rowcount + '">' + print.Name + '</label>' +
            '</td>' +
            '<tr>';
    }

    return list;
}

function ChequeValidation(ChqNo) {
    debugger;
    var result = "";
    if (BankCode == "240") {
        var numbers = /^[0-9]+$/;
        if (ChqNo == null || ChqNo == "") {
            //alert("Alert! Cheque No can not be null!");
            ErrorMessage = "Instrument No can not be null!";
            return false;
        }
        else if (!ChqNo.match(numbers)) {
            //alert("Alert! Cheque No can only accept number!");
            ErrorMessage = "Instrument No can only accept number!";
            return false;
        }
        else if (ChqNo.length != 6) {
            //alert("Alert! 6 digit cheque no is required!");
            ErrorMessage = "6 digit instrument no is required!";
            return false;
        }
        return true;
    }
    else if (BankCode == "059") {
        var numbers = /^[0-9]+$/;
        if (ChqNo == null || ChqNo == "") {
            //alert("Alert! Cheque No can not be null!");
            ErrorMessage = "Instrument No can not be null!";
            return false;
        }
        else if (!ChqNo.match(numbers)) {
            //alert("Alert! Cheque No can only accept number!");
            ErrorMessage = "Instrument No can only accept number!";
            return false;
        }
        else if (ChqNo.length != 6 && ChqNo.length != 8) {
            //alert("Alert! 6 digit cheque no is required!");
            ErrorMessage = "6 or 8 digit instrument no is required!";
            return false;
        }
        return true;
    }
}


function AmountValidationWith50Paise(amount) {
    debugger;
    var numbers = /^[0-9]+$/;
    var amtCheck = /^[-+]?[0-9]+\.[0-9]+$/;

    if (amount == null || amount == "") {
        ErrorMessage = "Amount cannot be null!";
        return false;
    }
    else if (!amount.match(numbers)) {
        if (parseInt(amount) < 1) {
            ErrorMessage = "Enter valid amount!";
            return false;
        }
        else if (!amount.match(amtCheck)) {
            ErrorMessage = "Amount can accept 2 decimal or numeric values!";
            return false;
        }
        else {
            var splitstr = amount.split('.');
            //debugger;
            if (splitstr[1] != null) {
                var strlength = splitstr[1].length;
                if (strlength != 2) {
                    ErrorMessage = "2 decimal value required!";
                    return false;
                }
                else if (splitstr[1] != "50") {
                    ErrorMessage = "Only 50 paisa allowed!";
                    return false;
                }
            }
        }
    }
    else if (parseInt(amount) < 1) {
        ErrorMessage = "Enter valid amount!";
        return false;
    }
    else {
        var splitstr = amount.split('.');
        //debugger;
        if (splitstr[1] != null) {
            var strlength = splitstr[1].length;
            if (strlength != 2) {
                ErrorMessage = "2 decimal value required!";
                return false;
            }
            else if (splitstr[1] != "50") {
                ErrorMessage = "Only 50 paisa allowed!";
                return false;
            }
        }
    }

    return true;
}


function AmountValidationWithDecimal(amount) {
    debugger;
    var numbers = /^[0-9]+$/;
    var amtCheck = /^[-+]?[0-9]+\.[0-9]+$/;

    if (amount == null || amount == "") {
        ErrorMessage = "Amount cannot be null!";
        return false;
    }
    else if (!amount.match(numbers)) {
        if (parseInt(amount) < 1) {
            ErrorMessage = "Enter valid amount!";
            return false;
        }
        else if (!amount.match(amtCheck)) {
            ErrorMessage = "Amount can accept 2 decimal or numeric values!";
            return false;
        }
        else {
            var splitstr = amount.split('.');
            //debugger;
            if (splitstr[1] != null) {
                var strlength = splitstr[1].length;
                if (strlength != 2) {
                    ErrorMessage = "2 decimal value required!";
                    return false;
                }
            }
        }
    }
    else if (parseInt(amount) < 1) {
        ErrorMessage = "Enter valid amount!";
        return false;
    }
    else {
        var splitstr = amount.split('.');
        //debugger;
        if (splitstr[1] != null) {
            var strlength = splitstr[1].length;
            if (strlength != 2) {
                ErrorMessage = "2 decimal value required!";
                return false;
            }
        }
    }

    return true;
}