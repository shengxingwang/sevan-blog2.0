<?php
	header("Access-Control-Allow-Origin: *");
	header("content-type:text/html;charset=utf-8");
	// $servername = "localhost";
	// $username = "root";
	// $password = "";
	// $dbname = "yuebook";
	// $prot = 3306;
	$servername = "sqld-gz.bcehost.com";
	$username = "5c43316533034dbd8fb3d56d1f752f1a";
	$password = "57c7acf973ca4442afd6b79bf4b76060";
	$dbname = "tmggjpWsMRQJEqjUSfVo";
	$prot = 3306;
	$conn = mysqli_connect($servername,$username,$password,$dbname,$prot);
	if (!$conn) {
	    die("连接失败: " . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "set names utf8");
?>