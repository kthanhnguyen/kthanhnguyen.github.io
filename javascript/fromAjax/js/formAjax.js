function validateUsername(){
	var username = document.getElementById("username").value;
	var message_username = document.getElementById("message_username");
	message_username.innerHTML = "";
	
	if(username == ""){
		message_username.innerHTML = "Please enter username";
		return false;
	}
	if(username.length < 8 || username.length > 50){
		message_username.innerHTML = "Username length min 8 letter.";
		return false;
	}
	if (isSpecialCharacter(username)) {
		message_username.innerHTML = "Not enter special character !";
		return false;
	}
	message_username.style.color = "blue";
	message_username.innerHTML = "OK";
	return true;
}

function isSpecialCharacter(str){
	return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}


function validatePassword() {
	var password = document.getElementById("password").value;
	var message_password = document.getElementById("message_password");
	message_password.innerHTML = "";
	
	if(password == ""){
		message_password.innerHTML = "Please enter password";
		return false;
	}
	if (password.length < 8 || password.length > 30) {
		message_password.innerHTML = "Password length min 8 letter.";
		return false;
	}
	message_password.style.color = "blue";
	message_password.innerHTML = "OK";
	return true;
}

function validateEmail() {
	var email = document.getElementById("email").value;
	var message_email = document.getElementById("message_email");
	message_email.innerHTML = "";
	var reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
	 
	if(email == ""){
		message_email.innerHTML = "Please enter email";
		return false;
	}
	if (reg_mail.test(email) == false) {
		message_email.innerHTML = "Email is not valid";
		return false;
	}
	message_email.style.color = "blue";
	message_email.innerHTML = "OK";
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
	var birthday = document.getElementById("birthday").value;
	var message_birthday = document.getElementById("message_birthday");
	message_birthday.innerHTML ="";
	
	if(birthday == ""){
		message_birthday.innerHTML = "Please enter birthday";
		return false;
	}
	if (!formatDate(birthday)) {
		message_birthday.innerHTML = "Date not format";
		return false;
	}
	message_birthday.style.color = "blue";
	message_birthday.innerHTML = "OK";
	return true;
}

function submit_form() {
	var result = document.getElementById("result");
	if(validateUsername() && validatePassword() && validateEmail() && validateBirthday()){
		var xhttp;
		xhttp = new XMLHttpRequest() || ActiveXObject("Microsoft.XMLHTTP");
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				result.innerHTML = xhttp.responseText;
			}
		};
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var queryString = "?username=" + username + "&password=" + password;
		console.log(queryString);
		xhttp.open('GET', 'checklogin.php' + queryString , true);
		//xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhttp.send();
	}
	else {
		result.innerHTML = "Please enter data";
	}
}