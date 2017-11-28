<?php
	define("SERVER", "localhost");
	define("DB", "id3683526_btajaxjq");
	define("UID", "id3683526_thanhnk");
	define("PWD", "thanh901");

	$connection = mysqli_connect(SERVER, UID, PWD, DB) or
	die ("couldn't connect to localhost");

	mysqli_select_db($connection, 'id3683526_btajaxjq');


	$username = $_GET["username"];
	$password = $_GET["password"];

	if (validateUsername($username) && validatePassword($password)) {
		$query = "select * from users where username = '$username' and password = '$password'";
		$result = mysqli_query($connection, $query) or die(mysqli_errno($connection));

		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		if($row > 0){
			echo "Login Successfully";
			exit();
		}
		echo "Login Fail";
		exit();
	}


	function validateUsername($username) {
		if (strlen($username) < 8 || strlen($username) > 50) {
			echo 'Username length min 8 letter.';
			return false;
		}
		if (preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $username)){
		   echo 'Not enter special character.';
		   return false;
		}
		return true;
	}

	function validatePassword($password) {
		if (strlen($password) < 8 || strlen($password) > 30) {
			echo 'Password length min 8 letter.';
			return false;
		}
		return true;
	}
?>