$(document).ready(function () {
    var tok = localStorage.getItem("token");

    $.ajax({
        type: "GET",
        url: "http://localhost:4500/wishlists/wishlistsearch",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + tok);
        },
        success: function (res) {
            console.log(res)
            //    alert("success");
            // var wishlistdata = "";
            $.each(res, function (index) {
                //      alert("entered")


                var recipeideach = res[index].RecipeId;

                console.log(recipeideach)
                data = { '_id': recipeideach };

                $.ajax({
                    type: "POST",
                    url: "http://localhost:4500/recipes/recipesearchwishlist/",
                    dataType: 'json',
                    data: data,
                    success: function (res) {
                        console.log(res)
                        //        alert("success");


                        //        alert("entered")
                        $.each(res, function (index) {

                            var data1 = "";
                            var image = res[index].RecipeImgName;
                            // console.log(image);
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

                                data1 += '<button class="btn btn-primary" value=' + res[index]._id + ' id="delete" type="submit">Delete</a>';

                                data1 += '</div>';
                                data1 += '</div>';
                                data1 += '</div>';



                                console.log(res[index].RecipeImgName)
                                console.log(res);
                                $('#wishlist').append(data1);




                            }
                            $("#wishlist").on('click', "#delete", function () {
                                id = $(this).val();


                                //         alert("clicked")
                                console.log(id)
                                alert(id);
                                $.ajax({
                                    type: "DELETE",
                                    url: "http://localhost:4500/wishlists/delete/" + id,
                                    data: id,
                                    success: function (res) {

                                        alert("deleted From your wishlist!!!");
                                        location.reload();

                                    }


                                })
                            })
                        })


                    }

                })





            })

        }

    })

    $.ajax({
        type: "GET",
        url: "http://localhost:4500/recipes/postedsearch",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + tok);
        },
        success: function (res) {
            console.log(res)
            //    alert("success for posted");


            //  alert("entered")
            $.each(res, function (index) {

                var data2 = "";
                var image = res[index].RecipeImgName;
                console.log(image);
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
                    data2 += '<a href="updaterecipe.html?id=' + res[index]._id + '" class="btn btn-primary">Update dish</a>';
                    data2 += '<button class="btn btn-primary" value=' + res[index]._id + ' id="deletepost" type="submit">Delete</a>';
                    data2 += '</div>';
                    data2 += '</div>';
                    data2 += '</div>';



                    console.log(res[index].RecipeImgName)
                    console.log(res);
                    $('#yourdish').append(data2);




                }
                $("#yourdish").on('click', "#deletepost", function () {
                    id = $(this).val();


                    //      alert("clicked")
                    //      alert(id);
                    $.ajax({
                        type: "DELETE",
                        url: "http://localhost:4500/recipes/delete/" + id,
                        data: id,
                        success: function (res) {

                            alert("Your dish has been deleted!!!");
                            location.reload();

                        }


                    })
                })

            })


        }
    })

});


    // $.getJSON("http://localhost:4500/recipes/wishlistsearch", function (res) {
    //     var data = "";
    //     $.each(res, function (index) {


    //         var image = res[index].RecipeImgName;
    //         if (image != null && image != "") {


    //             data += '<div class="col-lg-3 col-md-6 mb-4">';
    //             data += '<div class="card h-100">';
    //             data += '<img class="card-img-top" src="http://localhost:4500/' + res[index].RecipeImgName + '" alt="">';
    //             data += ' <div class="card-body">';
    //             data += '<h4 class="card-title">Card title</h4>';
    //             data += '<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo magni sapiente, tempore debitis beatae culpa natus architecto.</p>';
    //             data += '</div>';
    //             data += '<div class="card-footer">';
    //             data += '<a href="showpost.html?id=' + res[index]._id + '" class="btn btn-primary">More details...</a>';
    //             data += '</div>';
    //             data += '</div>';
    //             data += '</div>';



    //             console.log(res[index].RecipeImgName)
    //             console.log(res);
    //             $('#hotdishes').append(data);



    //         }
    //     })

    // })





