$(document).ready(function () {

    var tok = localStorage.getItem('token');
    var id = localStorage.getItem('uid');
   
    var imagedata = '';
    var imagename = "";
    //  alert(tok)
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
            // imagename=data.ProfilePic;
            $("#fname").text(data.Fname + ' ' + data.Mname + ' ' + data.Lname);
            $("#mname").text(data.Mname);
            console.log(data.Mname);
            console.log(data.Lname);
            $("#lname").text(data.Lname);
            $("#uname").text(data.Username + "'S Profile");
            $("#udesc").text(data.UserDesc);
            $("#age").text(data.Age);
            $("#sex").text(data.Sex);
            $("#nationality").text(data.Nationality);
            $("#pass").text(data.Password);
            // $("#profilepic").text(data.ProfilePic);
            // console.log(imagedata);
            $("#profileimage").attr("src", "http://localhost:4500/images/" + data.ProfilePic)
            // imagedata = '<img src="http://localhost:4500/images/"'+imagename+'">'
            // $('#profileimg').append(imagedata);
        }
    })

    $.ajax({
        type: "GET",
        url: "http://localhost:4500/recipes/recipecount",
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {
            console.log(data.recipecount);
            $("#recipecount").text(data.recipecount);


        }
    })
    $.ajax({
        type: "GET",
        url: "http://localhost:4500/wishlists/wishcount",
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {
            console.log(data.wishcount);
            $("#wishescount").text(data.wishcount);


        }
    })

    // function deselect(e) {
    //     $('.pop').slideFadeToggle(function () {
    //         e.removeClass('selected');
    //     });
    // }

    // $(function () {
    //     $('#contact').on('click', function () {
    //         if ($(this).hasClass('selected')) {
    //             deselect($(this));
    //         } else {
    //             $(this).addClass('selected');
    //             $('.pop').slideFadeToggle();
    //         }
    //         return false;
    //     });

    //     $('.close').on('click', function () {
    //         deselect($('#contact'));
    //         return false;
    //     });
    // });

    // $.fn.slideFadeToggle = function (easing, callback) {
    //     return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
    // };

    // $("#myModal").modal('show');
})


