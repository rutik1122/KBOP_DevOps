try {
    function ErrorResp(result) {
        debugger;
        $("#ProcessingBar").show();
        document.getElementById("ProcessingBar").innerHTML = result;
    }

    function GenerateReport() {
        debugger;
        $("#div_Report_Data").hide();



        var fromDate = document.getElementById("fromDate").value;
        var toDate = document.getElementById("toDate").value;

        document.getElementById("yes1").value = fromDate;
        document.getElementById("yes2").value = toDate;

        var ReportName, ReportType;
        var val = document.getElementById("sel_ReportType").value;

        if (val == "1") {
            $("#tbl_report tbody").empty();
            $("#Transaction_Summary").hide();


            ReportType = $("#sel_ReportType").val();
            ReportName = $("#reportName").val();

            var FromDate = $("#fromDate").val().replaceAll('-', '/'); // "2023/02/04";//
            var ToDate = $("#toDate").val().replaceAll('-', '/'); // "2023/02/04";

            var validate = false;

            if (ReportType != "" || ReportName != "")
                validate = true;
            debugger;
            if (validate == false) {
                alert("Report Type and Report Name are Required!");
                return false;
            }


            if (FromDate == null || FromDate == "") {
                alert("From Date is mandatory!");
                return false;
            }

            if (ToDate == null || ToDate == "") {
                alert("To Date is mandatory!");
                return false;
            }

            $("#ProcessingBar").show();
            document.getElementById("ProcessingBar").innerHTML = "Processing Request...";

            debugger;

            $.ajax({
                url: rooturl + 'Report/ReportPage',
                type: 'POST',
                data: { fromdate: FromDate, todate: ToDate },
                success: SuccessResp,
                error: ErrorResp
            });


            //debugger;
            //$.ajax({
            //    url: rooturl + 'Report/ReportPage', // Replace with your actual URL
            //    type: 'POST',
            //    datatype: 'html',
            //    data: { fromdate: fromDate, todate: toDate },
            //    success: function (result) {
            //        debugger;
            //        // Assuming the partial view container has the id "partialViewContainer"
            //        $("#partialViewContainer").html(result);
            //    },
            //    error: ErrorResp
            //    //error: function (xhr, status, error) {
            //    //    console.error(error);
            //    //    // Handle error scenario appropriately, e.g., show an error message to the user
            //    //}
            //});

        }
    }

    function SuccessResp(result) {
        debugger;

        if (result.length == 0) {
            $("#exportToPDFButton").hide();
            $("#exportToCSVButton").hide();
            document.getElementById("ProcessingBar").innerHTML = "No Data Found!";
        }
        else {

            $("#exportToPDFButton").show();
            $("#exportToCSVButton").show();

            $("#div_Report_data").show();
            //$("#partialViewContainer").html(result);
            $("#ProcessingBar").hide();

            $("#tbl_Report_Data").find("tr:gt(0)").remove();

            recordId = 0;
            $.each(result, function (index, print) {
                // Add a row to the Product table
                AddRecordRow(print);
            });
        }


    }

    function AddRecordRow(print) {
        debugger;
        // Check if <tbody> tag exists, add one if not
        if ($("#tbl_Report_Data tbody").length == 0) {
            $("#tbl_Report_Data").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#tbl_Report_Data tbody").append(
            RecordTableRow(print));
    }

    function RecordTableRow(print) {
        debugger;

        var rowData;

        if (print.sni_id != null) {
            recordId += 1;
            var imagePath = '/vendors/assets/img/favicons/Kores_Logo.png';

            rowData =
                '<tr>' +
                '<td class="text-wrap"><span>' + recordId + '</span></td>' +
                '<td class="text-wrap"><span>' + print.sni_id + '</span></td>' +
                '<td class="text-wrap"><span>' + print.input_date + '</span></td>' +
                '<td class="text-wrap"><span>' + print.branch_code + '</span></td>' +
                '<td class="text-wrap"><span>' + print.machineserialno + '</span></td>' +
                '<td class="text-wrap"><span>' + print.count_id + '</span></td>' +
                '<td class="text-wrap"><span>' + print.note_index + '</span></td>' +
                '<td class="text-wrap"><span>' + print.cheqno + '</span></td>' +
                '<td class="text-wrap"><span>' + print.chqamount + '</span></td>' +
                '<td class="text-wrap"><span>' + print.sortcode + '</span></td>' +
                '<td class="text-wrap"><span>' + print.transcode + '</span></td>' +
                '<td class="text-wrap"><span>' + print.transaction_refno + '</span></td>' +
                '<td class="text-wrap"><span>' + print.account_no + '</span></td>' +

                '</tr>';
        }
        else
            alert("No Records Found!!!!");


        return rowData;

    }
    function exportToExcel() {
        debugger;
        const table = document.getElementById('tbl_Report_Data');
        const wb = XLSX.utils.table_to_book(table, { sheet: 'ReportData' });

        const currentDate = new Date();
        const datePart = currentDate.toISOString().split('T')[0];
        const timePart = currentDate.toLocaleTimeString().replace(/:/g, '-');
        const fileName = `report_${datePart}_${timePart}.xlsx`;

        //XLSX.writeFile(wb, 'report_data.xlsx');
        XLSX.writeFile(wb, fileName);
    }

    //function exportToPDF() {
    //    debugger;

    //    const table = document.getElementById('tbl_Report_Data');


    //    const currentDate = new Date();
    //    const datePart = currentDate.toISOString().split('T')[0];
    //    const timePart = currentDate.toLocaleTimeString().replace(/:/g, '-');
    //    const fileName = `report_${datePart}_${timePart}.pdf`;

    //    const pdfOptions = {
    //        margin: 10,
    //        filename: fileName,
    //        image: { type: 'jpeg', quality: 0.98 },
    //        html2canvas: { scale: 2 },
    //        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }, // Adjust orientation if necessary
    //    };


    //    html2pdf().from(table).set(pdfOptions).save();
    //}




    //function exportToPDF() {
    //    debugger;

    //    const bankName = document.getElementById('bankname').value;
    //    const branchName = document.getElementById('branchname').value;

    //    const table = document.getElementById('tbl_Report_Data');
    //    const reportNameSelect = document.getElementById('reportName');
    //    const selectedReportName = reportNameSelect.options[reportNameSelect.selectedIndex].text;

    //    const currentDate = new Date();
    //    const datePart = currentDate.toISOString().split('T')[0];
    //    const timePart = currentDate.toLocaleTimeString().replace(/:/g, '-');
    //    const fileName = `report_${datePart}_${timePart}.pdf`;

    //    const container = document.createElement('div');

    //    const bankAndBranchDiv = document.createElement('div');
    //    bankAndBranchDiv.style.position = 'absolute';
    //    bankAndBranchDiv.style.top = '10px'; // Adjust the position as needed
    //    bankAndBranchDiv.style.left = '10px'; // Adjust the position as needed
    //    bankAndBranchDiv.appendChild(document.createTextNode(`Bank: ${bankName}, Branch: ${branchName}`));
    //    container.appendChild(bankAndBranchDiv);

    //    const reportNameDiv = document.createElement('div');
    //    reportNameDiv.style.textAlign = 'center';
    //    reportNameDiv.appendChild(document.createTextNode(`${selectedReportName}`));
    //    container.appendChild(reportNameDiv);

    //    const dateDiv = document.createElement('div');
    //    dateDiv.style.position = 'absolute';
    //    dateDiv.style.top = '10px'; // Adjust the position as needed
    //    dateDiv.style.right = '10px'; // Adjust the position as needed
    //    dateDiv.appendChild(document.createTextNode(`Date: ${datePart}`));
    //    container.appendChild(dateDiv);

    //    container.appendChild(document.createElement('br'));

    //    container.appendChild(table.cloneNode(true));

    //    const pdfOptions = {
    //        margin: 10,
    //        filename: fileName,
    //        html2canvas: { scale: 2 },
    //        jsPDF: {
    //            unit: 'mm',
    //            format: 'a4',
    //            orientation: 'landscape',
    //            putOnlyUsedFonts: true, // Only embed fonts that are used
    //            compress: true, // Enable text and image compression
    //            precision: 16, // Increase text rendering precision
    //        },
    //    };

    //    html2pdf().from(container).set(pdfOptions).save();
    //}

    function exportToPDF() {
        const bankName = document.getElementById('bankname').value;
        const branchName = document.getElementById('branchname').value;

        const table = document.getElementById('tbl_Report_Data');
        const reportNameSelect = document.getElementById('reportName');
        const selectedReportName = reportNameSelect.options[reportNameSelect.selectedIndex].text;

        const currentDate = new Date();
        const datePart = currentDate.toISOString().split('T')[0];
        const timePart = currentDate.toLocaleTimeString().replace(/:/g, '-');
        const fileName = `report_${datePart}_${timePart}.pdf`;


        const container = document.createElement('div');


        const headerDiv = document.createElement('div');
        headerDiv.style.display = 'flex';


        const logoImg = document.createElement('img');
        logoImg.src = '/vendors/assets/img/favicons/Kores_Logo.png';
        logoImg.style.width = '50px';
        logoImg.style.height = 'auto';
        headerDiv.appendChild(logoImg);


        const bankAndBranchDiv = document.createElement('div');
        bankAndBranchDiv.style.marginLeft = '10px'; // Add spacing between logo and bank/branch
        bankAndBranchDiv.appendChild(document.createTextNode(`Bank: ${bankName}, Branch: ${branchName}`));
        headerDiv.appendChild(bankAndBranchDiv);

        container.appendChild(headerDiv); // Add the header div to the container


        const dateDiv = document.createElement('div');
        dateDiv.style.position = 'absolute';
        dateDiv.style.top = '10px'; // Adjust the position as needed
        dateDiv.style.right = '10px';
        dateDiv.appendChild(document.createTextNode(`Date: ${datePart}`));
        container.appendChild(dateDiv);


        const reportNameDiv = document.createElement('div');
        reportNameDiv.style.textAlign = 'center';
        reportNameDiv.appendChild(document.createTextNode(selectedReportName));
        container.appendChild(reportNameDiv);


        container.appendChild(document.createElement('br'));


        container.appendChild(table.cloneNode(true));

        const pdfOptions = {
            margin: 10,
            filename: fileName,
            html2canvas: { scale: 2 },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'landscape',
                putOnlyUsedFonts: true,
                compress: true,
                precision: 16,
            },
        };

        html2pdf().from(container).set(pdfOptions).save();
    }






    //function exportToCSV() {
    //    debugger;
    //    const table = document.getElementById('tbl_Report_Data');

    //    const rows = table.getElementsByTagName('tr');
    //    if (rows.length === 1) {

    //        document.getElementById("ProcessingBar").innerHTML = "There is No data to Export";
    //        return;
    //    }

    //    const ws = XLSX.utils.table_to_sheet(table);
    //    const csv = XLSX.utils.sheet_to_csv(ws);

    //    const currentDate = new Date();
    //    const datePart = currentDate.toISOString().split('T')[0];
    //    const timePart = currentDate.toLocaleTimeString().replace(/:/g, '-');
    //    const fileName = `report_${datePart}_${timePart}.csv`;

    //    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    //    if (navigator.msSaveBlob) {
    //        // For Internet Explorer
    //        navigator.msSaveBlob(blob, fileName);
    //    } else {
    //        // For other browsers
    //        const link = document.createElement('a');
    //        if (link.download !== undefined) {
    //            const url = URL.createObjectURL(blob);
    //            link.setAttribute('href', url);
    //            link.setAttribute('download', fileName);
    //            document.body.appendChild(link);
    //            link.click();
    //            document.body.removeChild(link);
    //        }
    //    }
    //}


    function exportToCSV() {
        debugger;
        const table = document.getElementById('tbl_Report_Data');

        const reportNameSelect = document.getElementById('reportName');
        const selectedReportName = reportNameSelect.options[reportNameSelect.selectedIndex].text;

        const rows = table.getElementsByTagName('tr');

        if (rows.length === 1) {
            document.getElementById("ProcessingBar").innerHTML = "There is No data to Export";
            return;
        }

        const currentDate = new Date();
        const datePart = currentDate.toISOString().split('T')[0];
        const timePart = currentDate.toLocaleTimeString().replace(/:/g, '-');
        const fileName = `report_${datePart}_${timePart}.csv`;

        // Create a header row for the CSV
        const headerRow = document.createElement('tr');

        const reportNameCell = document.createElement('th');
        reportNameCell.textContent = 'Report Name: ' + selectedReportName; // Assuming selectedReportName is defined
        reportNameCell.colSpan = table.rows[0].cells.length - 1; // Span across all columns except one for the logo
        headerRow.appendChild(reportNameCell);

        // Add Date cell
        const currentDateCell = document.createElement('th');
        currentDateCell.textContent = 'Date: ' + datePart;
        currentDateCell.colSpan = 1; // Span only one column for the date
        headerRow.appendChild(currentDateCell);

        // Append the header row to the table
        table.insertBefore(headerRow, table.firstChild);

        const ws = XLSX.utils.table_to_sheet(table);
        const csv = XLSX.utils.sheet_to_csv(ws);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) {
            // For Internet Explorer
            navigator.msSaveBlob(blob, fileName);
        } else {
            // For other browsers
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }

        // Remove the header row after exporting
        table.removeChild(headerRow);
    }





}
catch (e) {
    alert(e.message);
}