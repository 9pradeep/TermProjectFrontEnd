$(document).ready(function () {


    $('form.login').on("submit", function (e) {
        e.preventDefault();

        username = $("#username").val();
        password = $("#password").val();
        //alert(password)
        data = {
            "username": username,
            "password": password
        }


        $.ajax({
            url: 'http://localhost:4500/users/Login/',
            type: 'post',
            dataType: 'json',
            data: data,

            success: function (res, textStatus, xhr) {
                if (res.token != null) {

                    location.href = "dashboard.html";


                    //    alert(res.token);
                    localStorage.setItem('token', res.token);
                }
                else {
                    alert("Invalid Username or Password");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');

            }
        });
    });
    $('#signupbtn').click(function (e) {
        e.preventDefault();
        firstname = $("#fname").val();
        middlename = $("#mname").val();
        lastname = $("#lname").val();
        uname = $("#uname").val();
        userdescription = $("#udesc").val();
        profilepic = $("#ppic").val();
        age = $("#age").val();
        sex = $("#sex").val();
        nationality = $("#nationality").val();
        password = $("#pass").val();
        //alert(password)
        data = {
            "firstname": firstname,
            "middlename": middlename,
            "lastname": lastname,
            "uname": uname,
            "password": password,
            "userdescription": userdescription,
            "profilepic": profilepic,
            "age": age,
            "sex": sex,
            "nationality": nationality
        }
        if (firstname == "" || lastname == "" || middlename == "" ||
            uname == "" || password == "" || userdescription == "" || profilepic == "" ||
            age == "" || sex == "" || nationality == "") {
            alert("please fill out all of the fields!");
        }

        else {
            $.ajax({
                url: 'http://localhost:4500/users/registeruser/',
                type: 'post',
                dataType: 'json',
                data: data,

                success: function (res, textStatus, xhr) {
                    console.log(res);
                    alert("Registered Succesfully!!!");
                    $("#tabLogin").click();

                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error in Operation');

                }
            });
        }
    });




    //var tok = localStorage.getItem('token');
    //alert(tok)

});  