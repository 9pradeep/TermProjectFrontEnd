$(document).ready(function () {



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
            // alert(recipe.RecipeName);

            $('#posttitle').text("RecipeName: " + recipe.RecipeName);
            // alert("what?")
            // alert(recipe.Uid);
            //  alert(recipe.RecipeImgName);





            var data1 = '->' + recipe.Raw1;
            var data2 = '->' + recipe.Raw2;
            var data3 = '->' + recipe.Raw3;
            var data4 = '->' + recipe.Raw4;
            var data5 = '->' + recipe.Raw5;
            var data6 = '->' + recipe.Raw6;
            var data7 = '->' + recipe.Raw7;
            var data8 = '->' + recipe.Raw8;
            var data9 = '->' + recipe.Raw9;
            var data10 = '->' + recipe.Duration;
            var data11 = '->' + recipe.Servingcount;
            var data12 = '->' + recipe.Difficulty;
            var data13 = '->' + recipe.Direction;

            $('#raw1').append(data1);
            $('#raw2').append(data2);
            $('#raw3').append(data3);
            $('#raw4').append(data4);
            $('#raw5').append(data5);
            $('#raw6').append(data6);
            $('#raw7').append(data7);
            $('#raw8').append(data8);
            $('#raw9').append(data9);
            $('#direction').append(data13);
            $('#duration').append(data10);
            $('#servingcount').append(data11);
            $('#difficulty').append(data12);




            var data = "";
            var recipeeach = new Array();

            if (recipe.RecipeImgName != null && recipe.RecipeImgName != "") {


                data += '<img class="img-fluid rounded" src="http://localhost:4500/' + recipe.RecipeImgName + '" alt="">';
                $('#showrecpimg').append(data);

            }
            $.ajax({
                type: 'GET',
                url: 'http://localhost:4500/posts/likecount/' + id,
                success: function (likecount) {
                    console.log(likecount);
                    //   alert("like counted " + likecount.Like);
                    $('#likecount').text(likecount.Like);

                }
            })
            $.ajax({
                url: 'http://localhost:4500/postcmts/getselectedreciperate/' + id,
                type: 'GET',
                success: function (recipecmt) {
                    //     alert("what?")
                    console.log(recipecmt)
                    //     alert(id);

                    var comment = "";
                    var raters = 0;
                    var totalrate = 0;
                    var totalrating = 0;

                    //this is in object so cant be fetched now ask tomorrow
                    recipeeach.push(recipecmt);
                    $.each(recipecmt, function (index) {
                        // var userid = recipeeach[index].UserId;
                        console.log(recipecmt[index].UserId);

                        // for (key = 0; key < result.length; key++) {

                        $.ajax({
                            type: 'GET',
                            url: 'http://localhost:4500/users/getuserdata/' + recipecmt[index].UserId,
                            success: function (user) {
                                //       alert("hereeeee" + recipe.Uid)
                                console.log(user);
                                //        alert("entered");
                                //       alert(user.Fname);


                                //this is for user details for the comment and rating.

                                raters = raters + 1;
                                totalrate = totalrate + recipecmt[index].Rate;
                                totalrating = totalrate / raters;
                                console.log(raters);
                                console.log(totalrate);
                                console.log(totalrating);
                                // console.log(result);
                                comment += '<div class="card my-4"><h5 class="card-header">Reviewer Name:-     ' + user.Fname + '</h5>'
                                // comment += '<div  style="background-color:lightblue; width:20px; display:block;"></div>'
                                comment += '<div class="row"><div class="col-md-3 col-sd-12"><img class="d-flex mr-3 rounded-circle" height="150px" width="150px" src="http://localhost:4500/images/' + user.ProfilePic + '"+ alt="">'
                                comment += '</div><div class="card-body col-md-9 col-sd-12">'
                                // comment += '<h4 class="mt-0" id="commentername">Reviewer Name:' + user.Fname + '</h4>'
                                comment += '<h5 class="mt-0" id="rate"> Rate:-' + recipecmt[index].Rate + '</h5>'
                                comment += '<h5 class="mt-0" id="comment"> Comment:-' + recipecmt[index].Comment + '</h5>'
                                comment += '</div></div></div>'
                                comment += '</div>'

                                $('#commentsection').html(comment);
                                $('#totalrating').html(totalrating);

                                // }
                            }
                        })


                    })

                }
            })

            $.ajax({
                type: 'GET',
                url: 'http://localhost:4500/users/getuserdata/' + recipe.Uid,
                success: function (user) {
                    console.log(user);
                    //    alert("right here");
                    //    alert(recipe.Uid);
                    $('#username').text(user.Fname);

                    $("#addtowish").click(function (e) {
                        e.preventDefault();
                        var tok = localStorage.getItem('token');
                        $.ajax({
                            type: "GET",
                            url: "http://localhost:4500/users/this",
                            beforeSend: function (xhr) {
                                if (tok) {
                                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                                }
                            }, success: function (data) {

                                console.log(data._id);
                                likeuid = data._id;



                                var Recipeid = recipe._id;
                                console.log(Recipeid);
                                var Userid = likeuid;
                                // alert("userid")
                                // alert(Userid)
                                data1 = {
                                    'RecipeId': Recipeid,
                                    'UserId': Userid,

                                }
                                console.log(data1)

                                $.ajax({
                                    url: 'http://localhost:4500/wishlists/addtowishlist',
                                    type: 'POST',
                                    data: data1,
                                    // enctype: 'multipart/form-data',
                                    //contentType: false,
                                    //processData: false,
                                    //cache: false,
                                    beforeSend: function (xhr) {
                                        if (tok) {
                                            xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                                        }
                                    },
                                    success: function (res, textStatus, xhr) {
                                        console.log(res);
                                        alert("Saved to wishlist!!!");
                                        location.href = "wishlist.html";



                                    },
                                    error: function (xhr, textStatus, errorThrown) {
                                        console.log('Error in Operation');

                                    }
                                });
                            }
                        })

                    })




                    $("#likebtn").click(function (e) {
                        e.preventDefault();
                        //var formData = new FormData(this);
                        var tok = localStorage.getItem('token');
                        var likeuid = "";
                        //     alert(tok)
                        $.ajax({
                            type: "GET",
                            url: "http://localhost:4500/users/this",
                            beforeSend: function (xhr) {
                                if (tok) {
                                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                                }
                            }, success: function (data) {

                                console.log(data._id);
                                likeuid = data._id;



                                var Recipeid = recipe._id;
                                console.log(Recipeid);
                                var Userid = likeuid;
                                //       alert("userid")
                                //     alert(Userid)
                                data1 = {
                                    'RecipeId': Recipeid,
                                    'UserId': Userid,
                                    'Like': '1'
                                }
                                console.log(data1)

                                $.ajax({
                                    url: 'http://localhost:4500/posts/postlike',
                                    type: 'POST',
                                    data: data1,
                                    // enctype: 'multipart/form-data',
                                    //contentType: false,
                                    //processData: false,
                                    //cache: false,
                                    beforeSend: function (xhr) {
                                        if (tok) {
                                            xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                                        }
                                    },
                                    success: function (res, textStatus, xhr) {
                                        console.log(res);
                                        alert("Like saved !!!");
                                        location.reload();



                                    },
                                    error: function (xhr, textStatus, errorThrown) {
                                        console.log('Error in Operation');

                                    }
                                });
                            }
                        })

                    });

                    $("#commentbtn").click(function (e) {
                        e.preventDefault();
                        //var formData = new FormData(this);
                        var tok = localStorage.getItem('token');
                        var likeuid = "";
                        //      alert(tok)
                        $.ajax({
                            type: "GET",
                            url: "http://localhost:4500/users/this",
                            beforeSend: function (xhr) {
                                if (tok) {
                                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                                }
                            }, success: function (data) {

                                console.log(data._id);
                                likeuid = data._id;



                                var Recipeid = recipe._id;
                                console.log(Recipeid);
                                var Userid = likeuid;
                                var rate = $("#rate").val();
                                var comment = $("#comment").val();
                                //        alert("userid")
                                //      alert(Userid)
                                data1 = {
                                    'RecipeId': Recipeid,
                                    'UserId': Userid,
                                    'Comment': comment,
                                    'Rate': rate
                                }
                                console.log(data1)

                                $.ajax({
                                    url: 'http://localhost:4500/postcmts/postcomment',
                                    type: 'POST',
                                    data: data1,
                                    // enctype: 'multipart/form-data',
                                    //contentType: false,
                                    //processData: false,
                                    //cache: false,
                                    beforeSend: function (xhr) {
                                        if (tok) {
                                            xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                                        }
                                    },
                                    success: function (res, textStatus, xhr) {
                                        console.log(res);
                                        alert("Comment saved !!!");
                                        location.reload();



                                    },
                                    error: function (xhr, textStatus, errorThrown) {
                                        console.log('Error in Operation');

                                    }
                                });
                            }
                        })

                    });

                    $("#unlikebtn").click(function (e) {
                        e.preventDefault();
                        //var formData = new FormData(this);
                        var tok = localStorage.getItem('token');
                        var likeuid = "";
                        //     alert(tok)
                        $.ajax({
                            type: "GET",
                            url: "http://localhost:4500/users/this",
                            beforeSend: function (xhr) {
                                if (tok) {
                                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                                }
                            }, success: function (data) {

                                console.log(data._id);
                                likeuid = data._id;



                                var Recipeid = recipe._id;
                                console.log(Recipeid);
                                var Userid = likeuid;
                                //    alert("userid")
                                //   alert(Userid)
                                data1 = {
                                    'RecipeId': Recipeid,
                                    'UserId': Userid,
                                    'Like': '0'
                                }
                                console.log(data1)

                                $.ajax({
                                    url: 'http://localhost:4500/posts/postunlike',
                                    type: 'POST',
                                    data: data1,
                                    // enctype: 'multipart/form-data',
                                    //contentType: false,
                                    //processData: false,
                                    //cache: false,
                                    beforeSend: function (xhr) {
                                        if (tok) {
                                            xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                                        }
                                    },
                                    success: function (res, textStatus, xhr) {
                                        console.log(res);
                                        alert("like deleted !!!");
                                        location.reload();


                                    },
                                    error: function (xhr, textStatus, errorThrown) {
                                        console.log('Error in Operation');

                                    }
                                });
                            }
                        })

                    });


                }
            })

        }

    })
    // $.getJSON("http://localhost:4500/getselectedrecipe/"+id, function (recipe) {
    //     console.log(recipe);
    //     $('#posttitle').val(recipe.RecipeName);
    //     $("#carRentalPrice").val(recipe.carRentalPrice);

    // })



})