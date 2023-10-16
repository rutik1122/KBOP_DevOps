try {
    function getError(result) {
        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/Login";
        }
        else {
            alert(result.responseText);
        }
    }


    function VerifyData() {

        //$("#tbl_verf_fail").show();
        //$("#tbl_verf_result").hide();
        //$("#div_submit_pass").hide();
        //$("#div_submit_fail").show();
        //$("#div_response_success").hide();
        //$("#div_create_question").hide();

        $("#ProcessingBar").hide();

        $("#tbl_verf_fail").show();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").show();
        $("#div_response_success").hide();
        $("#div_create_question").hide();


        // var y = "insertprinterdetails";
        debugger;
        branch_code = $("#branch_code").val();
        drpsorter = $("#drpsorter").val();
        sorter_ip = $("#sorter_ip").val();
        sorter_port = $("#sorter_port").val();
        printer_ip = $("#printer_ip").val();
        printer_port = $("#printer_port").val();
        printer_model = $("#printer_model").val();
        receipt_printing = $("#receipt_printing").val();
        //User04 --starts 2023/06/26
        //teller_id = '@Session["Login_Page_Id"]'; 
        teller_id = document.getElementById("loginid").value;
        //User04 --ends
        bofd = $("#bofd").val();
        ifsc = $("#ifsc").val();
        grid_name = $("#grid_name").val();
        server_ip = $("#server_ip").val();//User04

        if (branch_code == "0" || drpsorter == "0" || sorter_ip == "" || sorter_port == "" || printer_ip == ""
            || printer_port == "" || printer_model == "0" || receipt_printing == "0" || bofd == ""
            || ifsc == "" || grid_name == "") {
            //alert("fields should not be empty");
            //location.reload();
            document.getElementById("errorMsg").innerHTML = "all fields are mandatory!";

            return false;

        }
        debugger;
        var regexbranch_code = /^[0-9]+$/;
        if (!regexbranch_code.test(branch_code)) {
            //alert("Branch Code can only accept numbers !!");
            //document.getElementById("branch_code").value = "";
            //$("#branch_code").focus();
            //location.reload();
            document.getElementById("errorMsg").innerHTML = "Branch Code can only accept numbers !!";
            return false;
        }

        var regexsorter_ip = /^[0-9.]+$/;
        //var regexsorter_ip = /^[0-9]+$/ && /^[.]+$/;
        if (!regexsorter_ip.test(sorter_ip)) {
            // alert("Please enter proper Ip details !!");
            //document.getElementById("sorter_ip").value = "";
            //document.getElementById("sorter_ip").focus();
            //location.reload();
            document.getElementById("errorMsg").innerHTML = "Please enter proper Ip details !!";
            return false;
        }

        var regexsorter_port = /^[0-9]+$/;
        if (!regexsorter_port.test(sorter_port)) {
            //alert("Sorter Port can only accept numbers !!");
            //document.getElementById("sorter_port").value = "";
            //document.getElementById("sorter_port").focus();
            //location.reload();
            document.getElementById("errorMsg").innerHTML = "Sorter Port can only accept numbers !!";
            return false;
        }

        var regexprinter_ip = /^[A-Za-z0-9,.]+$/;
        //var regexprinter_ip = /^[A-Z]+$/ && /^[a-z]+$/ && /^[0-9]+$/ && /^[,]+$/ && /^[.]+$/;
        if (!regexprinter_ip.test(printer_ip)) {
            // alert("Printer Ip.. Should contain numcers,characters comma dot only !!");
            //document.getElementById("printer_ip").value = "";
            //document.getElementById("printer_ip").focus();
            //location.reload();
            document.getElementById("errorMsg").innerHTML = "Printer Ip.. Should contain numcers,characters comma dot only !!";
            return false;
        }


        //a
        var regexprinter_port = /^[0-9]+$/;
        if (!regexprinter_port.test(printer_port)) {
            //alert("Printer Port can only accept numbers !!");
            //document.getElementById("printer_port").value = "";
            //document.getElementById("printer_port").focus();
            //location.reload();
            document.getElementById("errorMsg").innerHTML = "Printer Port can only accept numbers !!";
            return false;
        }


        var regex = /^[A-Za-z0-9.,]+$/;
        if (!regex.test(branch_code) || !regex.test(drpsorter) || !regex.test(sorter_ip) || !regex.test(sorter_port) || !regex.test(printer_ip) || !regex.test(printer_port) || !regex.test(printer_model) || !regex.test(receipt_printing)) {
            // alert("Fields should not contain special characters");
            //location.reload();
            document.getElementById("errorMsg").innerHTML = "Fields should not contain special characters";
            return false;
        }

        //User04 --starts 2023/06/26
        var ippattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;


        if (ippattern.test(sorter_ip) == false || ippattern.test(printer_ip) == false) {

            //alert("ip format is invalid");
            document.getElementById("errorMsg").innerHTML = "ip format is invalid";
            return false;
        }
        //User04 --ends

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").hide();
        $("#div_submit_pass").show();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").show();

    }

    function PushData() {

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").hide();
        $("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Processing Request...";

        if (printer_ip != "USB") {
            printer_ip = "Net." + printer_ip;
        }

        debugger;
        var y = "insertprinterdetails";
        $.ajax({
            url: x + y,
            headers: authHeaders,
            type: 'POST',
            dataType: 'json',
            data: {
                'inbranch_code': branch_code, 'inmachineserialno': drpsorter, 'insorter_ip': sorter_ip, 'insorter_port': sorter_port,
                'inprinter_ip': printer_ip, 'inprinter_port': printer_port, 'inprinter_model': printer_model,
                'inteller_id': teller_id, 'inrecieptprinting': receipt_printing, 'bofd': bofd, 'ifsc': ifsc, 'gridname': grid_name, 'server_ip': server_ip
            },
            success: SuccessResp,
            error: getError

        });


        //$("#tbl_verf_fail").hide();
        //$("#tbl_verf_result").show();
        //$("#div_submit_pass").hide();
        //$("#div_submit_fail").hide();
        //$("#div_response_success").show();
        //$("#div_create_question").hide();



    }

    function SuccessResp(result) {
        //console.log(data);
        debugger;
        $("#branch_code").val('');
        $("#drpsorter").val('');
        $("#sorter_ip").val('');
        $("#sorter_port").val('');
        $("#printer_ip").val('');
        $("#printer_port").val('');
        $("#printer_model").val('');
        $("#receipt_printing").val('');
        $("#teller_id").val('');
        $("#bofd").val('');
        $("#ifsc").val('');
        $("#grid_name").val('');
        $("#server_ip").val('');//User04


        // alert("Printer Mapped Successfully!!!!!");

        //location.replace('Index');

        $("#tbl_verf_fail").hide();
        $("#tbl_verf_result").show();
        $("#div_submit_pass").hide();
        $("#div_submit_fail").hide();
        $("#div_response_success").show();
        $("#div_create_question").hide();

        document.getElementById("successMsg").innerHTML = "Printer Mapped Successfully!!!!!";
    }




    function GetData(currentRow) {

        $("#printer_id").val(currentRow.find("td:eq(0)").text());
        $("#branch_Code").val(currentRow.find("td:eq(1)").text());
        $("#drpsorter").val(currentRow.find("td:eq(2)").text());
        $("#sorter_ip").val(currentRow.find("td:eq(3)").text());
        $("#sorter_port").val(currentRow.find("td:eq(4)").text());
        $("#printer_ip").val(currentRow.find("td:eq(5)").text());
        $("#printer_port").val(currentRow.find("td:eq(6)").text());
        $("#printer_Model").val(currentRow.find("td:eq(7)").text());
        $("#teller_id").val(currentRow.find("td:eq(8)").text());
        $("#bofd").val(currentRow.find("td:eq(10)").text());
        $("#ifsc").val(currentRow.find("td:eq(11)").text());
        $("#grid_name").val(currentRow.find("td:eq(12)").text());
        $("#server_ip").val(currentRow.find("td:eq(13)").text());//User04


        var y1 = "getsorterdetails";
        $.ajax({
            url: x + y1,
            headers: authHeaders,
            type: 'POST',
            success: function (result) {

                var district = "";
                $("#drpsorter").empty();

                debugger;

                var selectedMachineSerialNo = currentRow.find("td:eq(2)").text();
                $("#drpsorter").append(
                    $('<option></option>').val(selectedMachineSerialNo).html(selectedMachineSerialNo));
                $.each(result, function (i, drpsorter) {
                    $("#drpsorter").append(
                        $('<option></option>').val(drpsorter.inmachineserialno).html(drpsorter.inmachineserialno));
                });



            },
            error: getError
        });



        if (currentRow.find("td:eq(9)").text() == "YES")
            $("#receipt_printing").val('1');
        else
            $("#receipt_printing").val('2');
    }





    function HideEditButtons() {
        debugger;
        $("#btnSubmit").hide();
        $("#btnCancel").hide();
        $("#edit-modal-label").html("Printer Mapping");


        $("#tbl_content").show();
        $("#div_create_question1").hide();
        $("#tbl_verf_fail1").hide();
        $("#tbl_verf_result1").hide();
        $("#div_submit_pass1").hide();
        $("#div_submit_fail1").hide();
        $("#div_response_success1").hide();
    }
    function ShowEditButtons() {
        $("#btnSubmit").show();
        $("#btnCancel").show();
        $("#edit-modal-label").html("Edit Printer Mapping");

        $("#tbl_content").show();
        $("#div_create_question1").hide();
        $("#tbl_verf_fail1").hide();
        $("#tbl_verf_result1").hide();
        $("#div_submit_pass1").hide();
        $("#div_submit_fail1").hide();
        $("#div_response_success1").hide();

    }

    function PrinterMapDetails(printer) {
        // Iterate over the collection of data
        debugger;
        $.each(printer, function (index, print) {
            // Add a row to the Product table
            AddRow(print);
        });
    }



    function AddRow(print) {

        // Check if <tbody> tag exists, add one if not
        if ($("#myDatatable tbody").length == 0) {
            $("#myDatatable").append("<tbody></tbody>");
        }
        // Append row to <table>
        $("#myDatatable tbody").append(
            TableRow(print));
    }
    function TableRow(print) {



        var ret =

            "<tr>" +
            '<td class="text-wrap"><span id="printerId">' + print.id + '</span></td>' +
            '<td class="text-wrap"><span id="inbranch_code">' + print.inbranch_code + '</span></td>' +
            '<td class="text-wrap"><span id="inmachineserialno">' + print.inmachineserialno + '</span></td>' +
            '<td class="text-wrap"><span id="insorter_ip">' + print.insorter_ip + '</span></td>' +
            '<td class="text-wrap"><span id="insorter_port">' + print.insorter_port + '</span></td>' +
            '<td class="text-wrap"><span id="inprinter_ip">' + print.inprinter_ip.replace("Net.", "") + '</span></td>' +
            '<td class="text-wrap"><span id="inprinter_port">' + print.inprinter_port + '</span></td>' +
            '<td class="text-wrap"><span id="inprinter_model">' + print.inprinter_model + '</span></td>' +
            '<td class="text-wrap"><span id="inteller_id">' + print.inteller_id + '</span></td>' +
            '<td class="text-wrap"><span id="inrecieptprinting">' + print.inrecieptprinting + '</span></td>' +
            '<td class="text-wrap"><span id="inprinter_model">' + print.bofd + '</span></td>' +
            '<td class="text-wrap"><span id="inteller_id">' + print.ifsc + '</span></td>' +
            '<td class="text-wrap"><span id="inrecieptprinting">' + print.gridname + '</span></td>' +
            '<td class="text-wrap"><span id="inrecieptprinting">' + print.server_ip + '</span></td>' +//User04


            '<td class="text-wrap btn-group"> ' +
            '<button class="btn btn-primary btn-sm" id="edit" data-bs-toggle="modal" href="#editmodal" onclick=ShowEditButtons()> ' +
            '<span data-bs-toggle="tooltip" data-bs-placement="top" title = "View Details" >' +
            '<i class="far fa-edit text-white"></i>' +
            '<span>' +
            '</button>' +
            '<button class="btn btn-primary btn-sm" id="view" data-bs-toggle="modal" href="#editmodal"  onclick=HideEditButtons()>' +
            '<span data-bs-toggle="tooltip" data-bs-placement="top" title="View Details" >' +
            '<i class="far fa-eye text-white"></i>' +
            '<span>' +
            '</button>' +
            '<button class="btn btn-danger btn-sm" data-bs-toggle="modal" id="delete" href = "#delete-modal" >' +
            '<span data-bs-toggle="tooltip" data-bs-placement="top" title = "View Details" >' +
            '<i class="far fa-trash-alt text-white"></i>' +
            '<span>' +
            '</button>' +
            '</td> ' +

            "</tr>";
        return ret;
    }

    function getError(result) {
        if (result.status == 401 && result.statusText == "Unauthorized") {
            alert(result.responseText);
            window.location = rooturl + "home/LoginiBAS";
        }
        else {
            alert(result.responseText);
        }
    }


    function ValidateData() {

        $("#ProcessingBar").hide();

        $("#tbl_verf_fail1").show();
        $("#tbl_verf_result1").hide();
        $("#div_submit_pass1").hide();
        $("#div_submit_fail1").hide();
        $("#div_response_success1").show();
        $("#div_create_question1").hide();
        $("#tbl_content").hide();
        $("#div_submit_pass").hide();


        debugger;

        id = $("#printer_id").val();
        branch_code = $("#branch_Code").val();
        drpsorter = $("#drpsorter").val();
        sorter_ip = $("#sorter_ip").val();
        sorter_port = $("#sorter_port").val();
        printer_ip = $("#printer_ip").val();
        printer_port = $("#printer_port").val();
        printer_model = $("#printer_Model").val();
        inteller_id = $("#teller_id").val();
        bofd = $("#bofd").val();
        ifsc = $("#ifsc").val();
        grid_name = $("#grid_name").val();
        server_ip = $("#server_ip").val();

        if ($("#receipt_printing").val() == "1")
            receipt_printing = 'YES';
        else
            receipt_printing = 'NO';


        if (branch_code == "" || drpsorter == "" || sorter_ip == "" || sorter_port == "" || printer_ip == "" || printer_port == "" || printer_model == "" || receipt_printing == "") {
            //alert("Fields should not be empty");
            document.getElementById("errorMsg1").innerHTML = "Fields should not be empty";
            //location.reload();
            return false;

        }

        var regexbranch_code = /^\d{0,5}$/;

        if (!regexbranch_code.test(branch_code)) {
            //alert("Baranch code should contain numbers  with 5 digits only, branch_code !!"); //max 15
            document.getElementById("errorMsg1").innerHTML = "Baranch code should contain numbers  with 5 digits only, branch_code !!";
            //location.reload();
            return false;
        }

        var regexsorter_port = /^\d{0,5}$/;
        if (!regexsorter_port.test(sorter_port)) {
            //alert("Sorter port should contain numbers with 5 digits  only,sorter_port !!"); //max 15
            document.getElementById("errorMsg1").innerHTML = "Sorter port should contain numbers with 5 digits  only,sorter_port !!";
            //location.reload();
            return false;
        }


        var regexprinter_ip = /^[A-Za-z0-9,.]{0,21}$/;
        if (!regexprinter_ip.test(printer_ip)) {
            //alert("Printer IP should contain numcers,characters (,)(.) and 21 digits only,printer_ip !!");
            document.getElementById("errorMsg1").innerHTML = "Printer IP should contain numcers,characters (,)(.) and 21 digits only,printer_ip !!";
            // location.reload();
            return false;
        }

        var regexprinter_port = /^\d{0,5}$/;
        if (!regexprinter_port.test(printer_port)) {
            //alert("Printer port should contain numbers with 5 digits  only,printer_port !!");   //max 15
            document.getElementById("errorMsg1").innerHTML = "Printer port should contain numbers with 5 digits  only,printer_port !!";
            //location.reload();
            return false;
        }

        var regexsorter_ip = /^[0-9.]{0,16}$/;
        if (!regexsorter_ip.test(sorter_ip)) {
            //alert("Sorter IP should contain numbers , (.) and 16 digits only,sorter_ip !!");    // max 15
            document.getElementById("errorMsg1").innerHTML = "Sorter IP should contain numbers , (.) and 16 digits only,sorter_ip !!";
            //location.reload();
            return false;
        }

        var regex = /^[A-Za-z0-9.,]+$/;
        if (!regex.test(branch_code) || !regex.test(drpsorter) || !regex.test(sorter_ip) || !regex.test(sorter_port) || !regex.test(printer_ip) || !regex.test(printer_port) || !regex.test(printer_model) || !regex.test(receipt_printing)) {
            //alert("Fields should not contain special characters");
            document.getElementById("errorMsg1").innerHTML = "Fields should not contain special characters";
            //location.reload();
            return false;
        }

        //User04 --starts 2023/06/26
        var ippattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;

        debugger;
        if (ippattern.test(sorter_ip) == false || ippattern.test(printer_ip) == false) {

            //alert("ip format is invalid");
            document.getElementById("errorMsg1").innerHTML = "ip format is invalid";
            return false;
        }
        //User04 --ends

        debugger;
        $("#div_create_question1").show();
        $("#tbl_verf_fail1").hide();
        $("#tbl_verf_result1").hide();

        $("#div_submit_pass1").show();
        $("#div_submit_fail1").hide();
        $("#div_response_success1").hide();
        $("#tbl_content").hide();
        $("#div_submit_pass").hide();


    }

    function reloadpage() {
        window.location.reload();
    }



}
catch (e) {
    alert(e.message);
}