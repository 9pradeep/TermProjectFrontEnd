$(document).ready(function () {

    var tok = localStorage.getItem('token');
    var id = ""
    //   alert(tok);
    $.ajax({
        type: "GET",
        url: "http://localhost:4500/users/this",
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {
            console.log(data);

            id = data._id
            //     alert(id);
            $("#Uid").val(id);
        }
    });
    $("form.Register").on("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        var RecipeName = $("#rname").val();
        var Origin = $("#origin").val();


        $("#fname").val(id);


        var Raw1 = $("#raw1").val();
        var Raw2 = $("#raw2").val();
        var Raw3 = $("#raw3").val();
        var Raw4 = $("#raw4").val();
        var Raw5 = $("#raw5").val();
        var Raw6 = $("#raw6").val();
        var Raw7 = $("#raw7").val();
        var Raw8 = $("#raw8").val();
        var Raw9 = $("#raw9").val();
        var Direction = $("#Direction").val();
        var Duration = $("#duration").val();
        var Servingcount = $("#servingcount").val();
        var Difficulty = $("#difficulty").val();
        var Recipedesc = $("#recipedesc").val();

        formData.append("RecipeName", RecipeName);
        formData.append("Origin", Origin);
        formData.append("Uid", id);
        formData.append("Raw1", Raw1);
        formData.append("Raw2", Raw2);
        formData.append("Raw3", Raw3);
        formData.append("Raw4", Raw4);
        formData.append("Raw5", Raw5);
        formData.append("Raw6", Raw6);
        formData.append("Raw7", Raw7);
        formData.append("Raw8", Raw8);
        formData.append("Raw9", Raw9);
        formData.append("Direction", Direction);
        formData.append("Duration", Duration);
        formData.append("Servingcount", Servingcount);
        formData.append("Difficulty", Difficulty);
        formData.append("RecipeDesc", Recipedesc);

        $.ajax({
            url: 'http://localhost:4500/recipes/craftrecipe/',
            type: 'post',

            data: formData,
            enctype: 'multipart/form-data',
            contentType: false,
            processData: false,
            cache: false,
            success: function (res, textStatus, xhr) {
                console.log(res);
                alert("Registered Succesfully!!!");

                console.log(res);
                location.href = "dashboard.html";


            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');

            }
        });

    });








});  