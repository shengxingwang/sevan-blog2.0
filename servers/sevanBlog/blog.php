<?php
	header("Access-Control-Allow-Origin: *");
	header('conten-type:text/html;charset=utf-8'); 
	header('Access-Control-Allow-Headers: Authorization'); 
	include 'config.php';
	include 'Mysql.class.php';
	include 'resMsg.php';
	include 'Blog.class.php';
	include 'mstoken.php';

	
	$action = isset($_GET['action'])?$_GET['action']:die('<h1>404 no found!</h1>');
	$work = new Blog($action);



?>