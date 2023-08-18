$(document).ready(function () {

    var uploadimage = "";

    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get("id"));
    // alert("this");

    var id = urlParams.get("id");
    // alert(id);
    console.log(id);
    $.ajax({
        type: 'GET',
        url: 'http://localhost:4500/recipes/getselectedrecipe/' + id,
        success: function (recipe) {
            console.log(recipe);

            var data14 = recipe.RecipeName;
            var data15 = recipe.Origin;
            var data1 = recipe.Raw1;
            var data2 = recipe.Raw2;
            var data3 = recipe.Raw3;
            var data4 = recipe.Raw4;
            var data5 = recipe.Raw5;
            var data6 = recipe.Raw6;
            var data7 = recipe.Raw7;
            var data8 = recipe.Raw8;
            var data9 = recipe.Raw9;
            var data10 = recipe.Duration;
            var data11 = recipe.Servingcount;
            var data12 = recipe.Difficulty;
            var data13 = recipe.Direction;

            $('#rname').val(data14);
            $('#origin').val(data15);
            $('#raw1').val(data1);
            $('#raw2').val(data2);
            $('#raw3').val(data3);
            $('#raw4').val(data4);
            $('#raw5').val(data5);
            $('#raw6').val(data6);
            $('#raw7').val(data7);
            $('#raw8').val(data8);
            $('#raw9').val(data9);
            $('#direction').val(data13);
            $('#duration').val(data10);
            $('#servingcount').val(data11);
            $('#difficulty').val(data12);
        }
    })
    $("#recipeimgname").on('change', function () {
        //    alert('clicked');
        let formData = new FormData();
        let files = $("#recipeimgname").get(0).files;
        if (files.length > 0) {
            formData.append("upload", files[0]);
        }
        // $("#add-hero").prop("disabled", true);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:4500/recipes/uploadrecipeimg',

            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (res) {
                Profileimg = res.Filename;
                console.log(res);
                uploadimage = res;

                // $("#add-hero").prop("disabled", false);
                //     alert('something happened')
            },
            error: function () {
                alert("Image upload failed!");
            }
        });
    });

    $("#updaterecipebtn").click(function (e) {
        e.preventDefault();
        //var formData = new FormData(this);


        var rname = $("#rname").val();
        var origin = $("#origin").val();
        var raw1 = $("#raw1").val();
        var raw2 = $("#raw2").val();
        var raw3 = $("#raw3").val();

        var raw4 = $("#raw4").val();
        var raw5 = $("#raw5").val();
        var raw6 = $("#raw6").val();
        var raw7 = $("#raw7").val();
        var raw8 = $("#raw8").val();
        var raw9 = $("#raw9").val();
        var direction = $("#direction").val();
        var duration = $("#duration").val();
        var servingcount = $("#servingcount").val();
        var difficulty = $("#difficulty").val();
        // var userProfileImg = uploadimage;

        if (uploadimage == "") {
            data1 = {
                'RecipeName': rname,
                'Origin': origin,
                'Raw1': raw1,
                'Raw2': raw2,
                'Raw3': raw3,
                'Raw4': raw4,

                'Raw5': raw5,

                'Raw6': raw6,
                'Raw7': raw7,
                'Raw8': raw8,
                'Raw9': raw9,
                'Direction': direction,
                'Duration': duration,
                'Servingcount': servingcount,
                'Difficulty': difficulty,
                // 'profileimg': uploadimage
            }

        }
        else {
            data1 = {
                'RecipeName': rname,
                'Origin': origin,
                'Raw1': raw1,
                'Raw2': raw2,
                'Raw3': raw3,
                'Raw4': raw4,

                'Raw5': raw5,

                'Raw6': raw6,
                'Raw7': raw7,
                'Raw8': raw8,
                'Raw9': raw9,
                'Direction': direction,
                'Duration': duration,
                'Servingcount': servingcount,
                'Difficulty': difficulty,
                'RecipeImgName': uploadimage
                // 'profileimg': uploadimage
            }
        }
        // formData.append("firstname",firstname);
        // formData.append("middlename",middlename);
        // formData.append("lastname",lastname);
        // formData.append("uname",uname);
        // formData.append("password",password);
        // formData.append("userdescription",userdescription);
        // formData.append("age",age);
        // formData.append("sex",sex);
        // formData.append("nationality",nationality);



        $.ajax({
            url: 'http://localhost:4500/recipes/updaterecipe/' + id,
            type: 'PUT',
            data: data1,
            // enctype: 'multipart/form-data',
            //contentType: false,
            //processData: false,
            //cache: false,

            success: function (res, textStatus, xhr) {
                console.log(res);
                alert("Recipe updated Succesfully!!!");
                location.href = "wishlist.html";
                console.log(uploadimage);


            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');

            }
        });

    });



})