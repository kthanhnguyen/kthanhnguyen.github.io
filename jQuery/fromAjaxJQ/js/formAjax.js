function validateUsername() {
	var username = $("#username").val();
	var message_username = $("#message_username");
	message_username.html("");

	if(username == ""){
		message_username.html("Please enter username");
		return false;
	}
	if(username.length < 8 || username.length > 50){
		message_username.html("Username length min 8 letter.");
		return false;
	}
	if (isSpecialCharacter(username)) {
		message_username.html("Not enter special character !");
		return false;
	}
	message_username.css("color", "blue");
	message_username.html("OK");
	return true;
}

function isSpecialCharacter(str){
	return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}


function validatePassword() {
	var password = $("#password").val();
	var message_password = $("#message_password");
	message_password.html("");

	if(password == ""){
		message_password.html("Please enter password");
		return false;
	}
	if (password.length < 8 || password.length > 30) {
		message_password.html("Password length min 8 letter.");
		return false;
	}
	message_password.css("color", "blue");
	message_password.html("OK");
	return true;
}


function validateEmail() {
	var email = $("#email").val();
	var message_email = $("#message_email");
	message_email.html("");
	var reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;

	if(email == ""){
		message_email.html("Please enter email");
		return false;
	}
	if (reg_mail.test(email) == false) {
		message_email.html("Email is not valid");
		return false;
	}
	message_email.css("color", "blue");
	message_email.html("OK");
	return true;
}

function formatDate(dateString) {
	// First check for the pattern
	var reg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if(!reg.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);
    // Check the ranges of month and year
    if(year < 1920 || year > 2100 || month == 0 || month > 12 || day < 1 || day > 31)
        return false;
   return true;
}

function validateBirthday() {
	var birthday = $("#birthday").val();
	var message_birthday = $("#message_birthday");
	message_birthday.html("");

	if(birthday == ""){
		message_birthday.html("Please enter birthday");
		return false;
	}
	if (!formatDate(birthday)) {
		message_birthday.html("Date not format");
		return false;
	}
	message_birthday.css("color", "blue");
	message_birthday.html("OK");
	return true;
}

function submit_form() {
	if(validateUsername() && validatePassword() && validateEmail() && validateBirthday()){
		var username = $("#username").val();
		var password = $("#password").val();

		$.ajax({
			type: "GET",
			url: "checklogin.php",
			dataType:"html",
			data: {
				username: username,
				password: password
			},
			success: function(response) {
				$("#result").html(response);
			}
		})
	}
}