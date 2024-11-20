
$(document).ready(function () {


    // Ajax Request for Retriving Data
    function showdata() {
        output = "";
        $.ajax({
            url: "retrieve.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data) {
                    x = data;
                } else {
                    x = "";
                }
                for (i = 0; i < x.length; i++) {
                    output +=
                        "<tr><td>" +
                        x[i].id +
                        "</td><td>" +
                        x[i].name +
                        "</td><td>" +
                        x[i].email +
                        "</td><td>" +
                        x[i].password +
                        "</td><td> <button class='btn btn-warning btn-sm btn-edit'>Edit</button> <button class='btn btn-danger btn-sm btn-del' data-sid=" + x[i].id + ">Delete</button></td></tr>"
                }
                $("#tbody").html(output);
            },
        });
    }
    showdata();



    // Ajax Request for Insert Data
    $("#btnadd").click(function (e) {
        e.preventDefault();
        let nm = $("#nameid").val();
        let em = $("#emailid").val();
        let pw = $("#passwordid").val();

        mydata = { name: nm, email: em, password: pw };

        $.ajax({
            url: "insert.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success: function (data) {
                // console.log(data);
                msg = "<div class='alert alert-dark mt-3'>" + data + "</div>";
                $("#msg").html(msg);
                $("#myform")[0].reset();
                showdata();
            },
        });
    });


    // Ajax Request for delete Data
    $("tbody").on("click", ".btn-del", function (){
        let id = $(this).attr("data-sid");

        mydata = { sid: id };
        mythis = this;
         $.ajax({
            url: "delete.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success: function (data){
                if(data == 1){
                    msg = "<div class='alert alert-dark mt-3'>Student Delete Successfully!</div>";
                    $(mythis).closest("tr").fadeOut(); 
                    
                } else {
                    msg = "<div class='alert alert-dark mt-3'>Unable Delete Student</div>";

                }

                $("#msg").html(msg);
                // showdata();

            },
         });
    });
});

