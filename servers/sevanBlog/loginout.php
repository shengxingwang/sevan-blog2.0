<?php
	header("Access-Control-Allow-Origin: *");
	header('conten-type:text/html;charset=utf-8'); 
	header('Access-Control-Allow-Headers: Authorization'); 
	include 'config.php';
	include 'resMsg.php';
	include 'mstoken.php';
	include 'Mysql.class.php';
	$mstoken = new Mstoken;
	$data = null;
	$action = $_GET["action"];
	$db = new Mysql($config);
	switch($action){
		case 'login':
			$userid = isset($_POST["userid"])?$_POST["userid"]:'';
			$pwd = md5($_POST["pwd"]);
			$sql = "select * from user_admin where userid='$userid'";
			$result = $db->query($sql);
			if($result){
				if(($row = mysqli_fetch_array($result))!==null){
					if($row["pwd"]===$pwd){
						$code=200;
						$quan = $row["quan"];
						$message="登录成功";
						$userid = $row["userid"];
						$token = $mstoken->setToken($userid);
						$data = array("userid"=>"$userid","token"=>"$token");
					}else{
						$code=405;
						$message="用户名或密码错误";
					}
				}else{
					$code=402;
					$message="用户名未注册";
				}
		    }else{
				$code =403;
				$message="登录失败";
			}
			break;
		default:
			$code=413;
			$message="啊噢！系统开小差了";
	}
	$response = new Response();;
	echo $response->json($code,$message,$data);
	mysqli_close($conn);
?>