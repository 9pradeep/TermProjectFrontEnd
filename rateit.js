$(function(){
  
    $('[data-toggle="tooltip"]').tooltip(); 
	
	$(".req-input input, .req-input textarea").on("click input", function(){
		validate($(this).closest("[data-form-container]"));
	});
    
	//This is for the on blur, if the form fields are all empty but the target was one of the fields do not reset to defaul state
	var currentlySelected;
	$(document).mousedown(function(e) {
        currentlySelected = $(e.target);
    });
	
	//Reset to form to the default state of the none of the fields were filled out
	$(".req-input input,  .req-input textarea").on("blur", function(e){
		var Parent = $(this).closest("[data-form-container]");
		//if the target that was clicked is inside this form then do nothing
		if(typeof currentlySelected != "undefined" && currentlySelected.parent().hasClass("req-input") && Parent.attr("id") == currentlySelected.closest(".form-container").attr("id"))
			return;
		
		var length = 0;
		Parent.find("input").each(function(){
			length += $(this).val().length;
		});
		Parent.find("textarea").each(function(){
			length += $(this).val().length;
		});
		if(length == 0){
			var container = $(this).closest(".form-container");
			resetForm(container);
		}
	});
	
	$(".create-account").on('click', function(){
		if($(".confirm-password").is(":visible")){
			$(this).text("Create an Account");
			$(this).closest("[data-form-container]").find(".submit-form").text("Login");
			$(".confirm-password").parent().slideUp(function(){
				validate($(this).closest("[data-form-container]"));
			});
		} else {
			$(this).closest("[data-form-container]").find(".submit-form").text("Create Account");
			$(this).text("Already Have an Account");
			$(".confirm-password").parent().slideDown(function(){
				validate($(this).closest("[data-form-container]"));
			});
		}
		
    })
});