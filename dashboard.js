$(document).ready(function () {
        var tok = localStorage.getItem("token");
        $.getJSON("http://localhost:4500/recipes/alldishes", function (res) {

                var data = "";
                $.each(res, function (index) {


                        var image = res[index].RecipeImgName;
                        if (image != null && image != "") {


                                data += '<div class="col-lg-3 col-md-6 mb-4">';
                                data += '<div class="card h-100">';
                                data += '<img class="card-img-top" src="http://localhost:4500/' + res[index].RecipeImgName + '" alt="">';
                                data += ' <div class="card-body">';
                                data += '<h4 class="card-title">' + res[index].RecipeName + '</h4>';
                                data += '<p class="card-text"></p>';
                                data += '</div>';
                                data += '<div class="card-footer">';
                                data += '<a href="showpost.html?id=' + res[index]._id + '" class="btn btn-primary">More details...</a>';
                                data += '</div>';
                                data += '</div>';
                                data += '</div>';



                                console.log(res[index].RecipeImgName)
                                console.log(res);
                                $('#hotdishes').html(data);

                        }

                })

        })

        // $.getJSON("http://localhost:4500/recipes/recipebyorigin",
        $.ajax({
                type: "GET",
                url: "http://localhost:4500/recipes/recipebyorigin",
                beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + tok);
                },
                success: function (res) {

                        console.log(res)

                        var data2 = "";
                        $.each(res, function (index) {


                                var image = res[index].RecipeImgName;
                                if (image != null && image != "") {


                                        data2 += '<div class="col-lg-3 col-md-6 mb-4">';
                                        data2 += '<div class="card h-100">';
                                        data2 += '<img class="card-img-top" src="http://localhost:4500/' + res[index].RecipeImgName + '" alt="">';
                                        data2 += ' <div class="card-body">';
                                        data2 += '<h4 class="card-title">' + res[index].RecipeName + '</h4>';
                                        data2 += '<p class="card-text"></p>';
                                        data2 += '</div>';
                                        data2 += '<div class="card-footer">';
                                        data2 += '<a href="showpost.html?id=' + res[index]._id + '" class="btn btn-primary">More details...</a>';
                                        data2 += '</div>';
                                        data2 += '</div>';
                                        data2 += '</div>';



                                        console.log(res[index].RecipeImgName)
                                        console.log(res);
                                        $('#origindishes').html(data2);



                                }


                        })
                }

        })

        $("#logout").click(function (e) {
                console.log(tok);
                $.ajax({
                        type: 'POST',
                        url: 'http://localhost:4500/users/logout',
                        beforeSend: function (xhr) {
                                if (tok) {
                                        xhr.setRequestHeader('Authorization', 'Bearer' + tok);

                                }

                        },
                        success: function (data) {

                        },
                        error: function (jqxhr, textStatus, errorThrown) {
                                alert("Logged Out Successfully!!!");
                                location.href = "index.html";

                        }
                })
        })
})




$("#searchrec").click(function (e) {

        var data10 = "";
        // alert("clicked")
        data10 += '<h1 class="display-4">Searched dishes</h1><hr class="light">';

        $('#title').append(data10);



        raw1 = $("#raw1").val();
        raw2 = $("#raw2").val();
        //alert(password)
        data = {
                "raw1": raw1,
                "raw2": raw2
        }

        // $.getJSON("http://localhost:4500/recipes/recipesearch", function (res) {
        $.ajax({
                type: "POST",
                url: "http://localhost:4500/recipes/recipesearch/",
                dataType: 'json',
                data: data,
                success: function (res) {
                        console.log(res)
                        // alert("success");
                        var data1 = "";
                        $.each(res, function (index) {
                                //  alert("entered")


                                var image = res[index].RecipeImgName;
                                if (image != null && image != "") {


                                        data1 += '<div class="col-lg-3 col-md-6 mb-4">';
                                        data1 += '<div class="card h-100">';
                                        data1 += '<img class="card-img-top" src="http://localhost:4500/' + res[index].RecipeImgName + '" alt="">';
                                        data1 += ' <div class="card-body">';
                                        data1 += '<h4 class="card-title">' + res[index].RecipeName + '</h4>';
                                        data1 += '<p class="card-text"></p>';
                                        data1 += '</div>';
                                        data1 += '<div class="card-footer">';
                                        data1 += '<a href="showpost.html?id=' + res[index]._id + '" class="btn btn-primary">More details...</a>';

                                        data1 += '</div>';
                                        data1 += '</div>';
                                        data1 += '</div>';



                                        console.log(res[index].RecipeImgName)
                                        console.log(res);
                                        $('#searcheddishes').append(data1);




                                }
                        })

                }

        })
});







