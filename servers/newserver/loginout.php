<?php
	require 'dbconfig.php';
	require 'reponseMsg.class.php';
	require 'mstoken.php';
	
	$mstoken = new Mstoken;
	$response = new reponseMsg;
	$data = null;
	$nowtime = time();
	
	if(!empty($_REQUEST["action"])){
		$action = $_REQUEST["action"];
	}else{
		$code = 403;
		$message="未知请求";
		echo $response->enjson($code,$message,$data);
		exit;
	}
	if($action==="login"){
		$uname = $_POST["acunt"];
		$pwd = md5($_POST["pwd"]);
		$sql = "SELECT pwd,nickname,userid,headimg FROM usertab where userid='$uname'";
		$result = mysqli_query($conn,$sql);
		if($result){
			if(($row = mysqli_fetch_array($result))!==null){
				if($row["pwd"]===$pwd){
					$code=200;
					$nickname = $row["nickname"];
					$headimg = $row["headimg"];
					$message="登录成功";
					$userid = $row["userid"];
					$token = $mstoken->setToken($userid);
					$data = array("nickname"=>"$nickname","headimg"=>"$headimg","yuetoken"=>"$token");
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
	}else if($action==="reg"){
		$uname = $_POST["acunt"];
		$pwd = md5($_POST["pwd"]);
		$nickname = $_POST["nickname"];
		$sql = "INSERT INTO usertab (userid,pwd,nickname,headimg) VALUES ('$uname','$pwd','$nickname','http://lookart.gz.bcebos.com/headimg%2FdefaultHead.jpg?authorization=bce-auth-v1%2Fdbec51db00804198a66392cd3a78c6ac%2F2018-03-29T02%3A55%3A45Z%2F-1%2Fhost%2F4dbb696d7ebe2a98ad0e9c2ba433ea2e1a4062c34b38b4f8fb85b4a17339b854')";
		$result = mysqli_query($conn,$sql);
		if($result){
			$code = 200;
			$message="注册成功";
			$data = array("userId"=>"$uname","nickname"=>"$nickname","headimg"=>"http://lookart.gz.bcebos.com/headimg%2FdefaultHead.jpg?authorization=bce-auth-v1%2Fdbec51db00804198a66392cd3a78c6ac%2F2018-03-29T02%3A55%3A45Z%2F-1%2Fhost%2F4dbb696d7ebe2a98ad0e9c2ba433ea2e1a4062c34b38b4f8fb85b4a17339b854");
		}else{
			$sql ="select count(*) from usertab where userid='$uname'";
			$ckresult = mysqli_query($conn,$sql);
        	$pass=mysqli_fetch_row($ckresult);
			if($pass[0]>=1){
				$code =405;
				$message="用户名已经存在";
			}else{
				$code =403;
				$message="注册失败";
			}
		}
	}else{
		$code = 403;
		$message="啊噢！系统开小差了";
	}
	echo $response->enjson($code,$message,$data);
	mysqli_close($conn);
?>