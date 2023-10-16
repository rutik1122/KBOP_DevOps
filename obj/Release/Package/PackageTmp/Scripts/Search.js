try {


    $('#FromDate').datepicker({
        changeMonth: true,
        changeYear: true,
        format: "yyyy-mm-dd",
        language: "tr"

    });

    $('#ToDate').datepicker({
        changeMonth: true,
        changeYear: true,
        format: "yyyy-mm-dd",
        language: "tr"

    });

    function getDate(data) {
        //debugger;
        var date = new Date();
        if (data == 'Day') {
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            //var Todaysdate = yyyy + '/' + mm + '/' + dd;
            var Todaysdate = yyyy + '-' + mm + '-' + dd;
            document.getElementById("FromDate").value = Todaysdate;
            // $('#FromDate').datepicker("setDate", new Date(Todaysdate));
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            //var Todaysdate = yyyy + '/' + mm + '/' + dd;
            var Todaysdate = yyyy + '-' + mm + '-' + dd;
            document.getElementById("ToDate").value = Todaysdate;

        }
        if (data == 'Week') {
            var day = date.getDay();
            var firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day == 0 ? -6 : 1) - day);
            var dd = firstDayOfWeek.getDate();
            var mm = firstDayOfWeek.getMonth() + 1;
            var yyyy = firstDayOfWeek.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            //var firstDayOfWeek = yyyy + '/' + mm + '/' + dd;
            var firstDayOfWeek = yyyy + '-' + mm + '-' + dd;
            document.getElementById("FromDate").value = firstDayOfWeek;

            var lastDayOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (day == 0 ? 0 : 7) - day);
            var dd = lastDayOfWeek.getDate();
            var mm = lastDayOfWeek.getMonth() + 1;
            var yyyy = lastDayOfWeek.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            //var lastDayOfWeek = yyyy + '/' + mm + '/' + dd;
            var lastDayOfWeek = yyyy + '-' + mm + '-' + dd;
            document.getElementById("ToDate").value = lastDayOfWeek;
        }
        if (data == 'Month') {
            var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

            var dd = firstDayOfMonth.getDate();
            var mm = firstDayOfMonth.getMonth() + 1;
            var yyyy = firstDayOfMonth.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            //var firstDayOfMonth = yyyy + '/' + mm + '/' + dd;
            var firstDayOfMonth = yyyy + '-' + mm + '-' + dd;
            document.getElementById("FromDate").value = firstDayOfMonth;

            var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            var dd = lastDayOfMonth.getDate();
            var mm = lastDayOfMonth.getMonth() + 1;
            var yyyy = lastDayOfMonth.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            //var lastDayOfMonth = yyyy + '/' + mm + '/' + dd;
            var lastDayOfMonth = yyyy + '-' + mm + '-' + dd;
            document.getElementById("ToDate").value = lastDayOfMonth;

        }

    }

    function SearchByData() {
        //debugger;
        var val = document.getElementById("SearchBy").value;

        $("#Currency_1").hide();
        $('#Cheque_1').hide();
        $("#DataSubmit").hide();
        

        if (val != "0") {
            if (val == "1")
                $("#Currency_1").show();
            else if (val == "2")
                $('#Cheque_1').show();

            $("#DataSubmit").show();
        }
        else {

        }
    }

    function SubmitData() {

        var FromDate = $("#FromDate").val();
        var ToDate = $("#ToDate").val();
        //debugger;
        if (FromDate == null || FromDate == "") {
            alert("From Date is mandatory!");
            document.getElementById("FromDate").focus();
            return false;
        }

        if (ToDate == null || ToDate == "") {
            alert("To Date is required!");
            document.getElementById("ToDate").focus();
            return false;
        }

        $("#CurrencyData").hide();

        var val = document.getElementById("SearchBy").value;

        if (val == "1") {
            var MachineNo, TellerId, TransRefNo, SerialNo, Branch;

            MachineNo = $("#MachineSerialNo_1").val();
            TellerId = $("#TellerId_1").val();
            TransRefNo = $("#TransRefNo_1").val();
            SerialNo = $("#NoteSerialNo_1").val();
            Branch = $("#Branch_1").val();

            var validate = false;

            if (MachineNo != "" || TellerId != "" || TransRefNo != "" || SerialNo != "" || Branch != "")
                validate = true;

            if (validate == false) {
                alert("Minimum 1 addition data is required!");
                return false;
            }

            $("#ProcessingBar").show();
            $('#ViewCount').hide();
            document.getElementById("DataCount").innerHTML = "0";
            $("#tbl_Currency").find("tr:gt(0)").remove();
            //debugger;
            $.ajax({
                type: 'POST',
                url: x + "getnotedetails",
                //url: "http://localhost:8198/api/Scanner/getnotedetails",
                // url: "https://103.231.78.237:9443/ibasWebapi/api/Scanner/getnotedetails",
                crossDomain: true,
                dataType: 'json',
                //data: { 'serialno': SerailNum, 'fromdate': FromDate, 'todate': ToDate, 'branch': branch },  //by anandi
                data: { 'serialno': SerialNo, 'TellerID': TellerId, 'fromdate': FromDate, 'todate': ToDate, 'branch': Branch, 'MachineSerialNo': MachineNo, 'TransRefNo': TransRefNo },
                success: LoadCurrencyData,
                error: getError
            });
        }
        else if (val == "2") {
            var MachineNo, TellerId, TransRefNo, ChequeNo, Branch;

            MachineNo = $("#MachineSerialNo_2").val();
            TellerId = $("#TellerId_2").val();
            TransRefNo = $("#TransRefNo_2").val();
            ChequeNo = $("#ChequeNo_2").val();
            Branch = $("#Branch_2").val();

            var validate = false;

            if (MachineNo != "" || TellerId != "" || TransRefNo != "" || ChequeNo != "" || Branch != "")
                validate = true;

            if (validate == false) {
                alert("Minimum 1 addition data is required!");
                return false;
            }

            $("#ProcessingBar").show();
        }
    }

    function LoadCurrencyData(result) {
        //debugger;
        var SerialData = {};
        SerialData = result;
        //debugger;
        //$("#TotalCount").text(SerialData.length);

        $('#ViewCount').show();
        $('#lbl_generate').show();
        $('#btn_report').show();

        document.getElementById("DataCount").innerHTML = SerialData.length;

        var c = "1";
        var col = "";

        for (var i = 0; i < SerialData.length; i++) {

            if (c == "1")
                col = "white";
            else
                col = "aliceblue";

            var row = document.createElement('tr');
            row.bgColor = col;
            var cell = document.createElement('td');
            cell.innerHTML = SerialData[i].capturetimestamp;
            //cell.bgColor = "grey";
            row.appendChild(cell);
            var cell2 = row.insertCell(1);
            cell2.innerHTML = SerialData[i].MachineSerialNo;
            row.appendChild(cell2);
            var cell3 = row.insertCell(2);
            //debugger;
            cell3.innerHTML = SerialData[i].branch;
            row.appendChild(cell3);
            var cell4 = row.insertCell(3);
            cell4.innerHTML = SerialData[i].TellerID;
            row.appendChild(cell4);
            var cell5 = row.insertCell(4);
            cell5.innerHTML = SerialData[i].serialno;
            row.appendChild(cell5);
            var cell6 = row.insertCell(5);
            if (SerialData[i].sn_imagepath != null) {
                var newImgStr = SerialData[i].sn_imagepath.replace(PhysicalImageURL, WebImageURL);
                var splitedUrl = newImgStr.replace(/\\/g, "/");
                var element = document.createElement("img");
                element.id = "imageId_" + i;
                element.src = splitedUrl;
                element.height = 17;
                element.width = 180;

            }
            cell6.appendChild(element);

            row.appendChild(cell6);
            var cell7 = row.insertCell(6);
            cell7.innerHTML = SerialData[i].scanneddoctype;
            row.appendChild(cell7);
            var cell8 = row.insertCell(7);
            cell8.innerHTML = result[i].currncy_version;
            row.appendChild(cell8);
            var cell9 = row.insertCell(8);
            cell9.innerHTML = SerialData[i].currncy_denom;
            row.appendChild(cell9);
            var cell10 = row.insertCell(9);
            cell10.innerHTML = SerialData[i].output_pocket;
            row.appendChild(cell10);
            var cell11 = row.insertCell(10);
            cell11.innerHTML = SerialData[i].error_code;
            row.appendChild(cell11);

            var cell12 = row.insertCell(11);
            cell12.innerHTML = SerialData[i].TransRefNo;
            row.appendChild(cell12);

            document.getElementById("tbl_Currency").appendChild(row);

            if (c == "1")
                c = "2";
            else
                c = "1";
        }

        $("#CurrencyData").show();
        $("#ProcessingBar").hide();
    }

    function getError(result) {
        //debugger;
        $("#ProcessingBar").hide();
        $('#ViewCount').hide();

        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            alert(result.responseText);
        }
    }

    function exportExcel() {
        debugger;
        var tableToExcel = new Table2Excel();
        tableToExcel.export(document.querySelectorAll("tbl_Currency"));
    }

    //function exportExcel() {
    //    debugger;
    //    $("#ProcessingBar").show();
    //    let data = document.getElementById("tbl_Currency");

    //    //// File pointer
    //    //var fp = XLSX.utils.table_to_book(data, { sheet: 'DataExport' });

    //    ////XLSX.write(fp, {
    //    ////    bookType: 'xlsx',
    //    ////    type: 'base64'
    //    ////});

    //    //XLSX.write(fp, { bookType: 'xlsx', type: 'buffer' });
    //    //XLSX.write(fp, { bookType: 'xlsx', type: 'binary' });

    //    //XLSX.writeFile(fp, 'dataTest.xlsx');

    //    const workSheet = XLSX.utils.table_to_book(data, { sheet: 'DataExport' });
    //    const workBook = XLSX.utils.book_new();

    //    XLSX.utils.book_append_sheet(workBook, workSheet, 'students');
    //    // Generate buffer
    //    XLSX.write(workSheet, { bookType: 'xlsx', type: 'buffer' });

    //    // Binary string
    //    XLSX.write(workSheet, { bookType: 'xlsx', type: 'binary' });

    //    XLSX.writeFile(workSheet, 'ExcelData.xlsx');

    //    $("#ProcessingBar").hide();
    //}


    //// Function is working - But image is not getting loaded...
    //function exportExcel() {
    //    debugger;
    //    $("#ProcessingBar").show();
    //    let data = document.getElementById("tbl_Currency");

    //    // File pointer
    //    var fp = XLSX.utils.table_to_book(data, { sheet: 'DataExport' });

    //    XLSX.write(fp, {
    //        bookType: 'xlsx',
    //        type: 'base64'
    //    });

    //    XLSX.writeFile(fp, 'dataTest.xlsx');
    //    $("#ProcessingBar").hide();
    //}


    
}
catch (e) {
    alert(e.message);
}