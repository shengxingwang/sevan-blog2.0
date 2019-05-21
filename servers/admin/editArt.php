<?php
	header("Access-Control-Allow-Origin: *");
	header('conten-type:text/html;charset=utf-8');
	require 'dbconfig.php';
	require 'reponseMsg.class.php';
	require 'mstoken.php';
	
	$mstoken = new Mstoken;
	$response = new reponseMsg;
	$code='413';
  	$message='未知请求！';
	$data =null;
	$hasimg ='';
	$stringtime = date('Y-m-d H:i:s',time());
	$param = $_POST;
	if(!empty($_POST["token"])){
		$token = $_POST["token"];
		$userid = $mstoken->getToken($token);
		if(!$userid){
			$code = 900;
			$message ="登录超时，请重新登录！";
			echo $response->enjson($code,$message,$data);
			exit;
		}
	}else{
		$code = 900;
		$message ="无效登录信息";
		echo $response->enjson($code,$message,$data);
		exit;
	}
	function checkForm($arr){
		global $code,$message,$hasimg;
		$code='403';
		if(!empty($arr["imgurl"])){
			$hasimg = $arr["imgurl"];
		}
		
		if(empty($arr["artname"])){
			$message='文章名不能为空！';
			return false;
		}
		if(empty($arr["artitem"])){
			$message='栏目不能为空！';
			return false;
		}
		if(empty($arr["arttype"])){
			$message='请填写文章类型！';
			return false;
		}
		if(empty($arr["anthor"])){
			$message='请填写作者！';
			return false;
		}
		if(empty($arr["desc"])){
			$message='请填写描述！';
			return false;
		}
		return true;
	}
	if(checkForm($param)){
		$id = $param['id'];
		$sql = "update arthome set anthor='{$param['anthor']}',artname='{$param['artname']}',artdesc='{$param['desc']}',contxt='{$param['content']}',hasimg='{$hasimg}',stype='{$param['arttype']}',item='{$param['artitem']}' where id='$id'"; 

		$result = mysqli_query($conn,$sql);
		if($result){
			if(mysqli_affected_rows($conn)){
				$code = 200;
				$message = "修改成功";
				$data = "ok";
			}else{
				$code = 200;
				$message = "未做任何修改";
				$data = "";
			}
		}else{
			$code = 403;
			$message = "修改失败";
			$data = "";
		}
		
	}
	
	echo $response->enjson($code,$message,$data);
	mysqli_close($conn);
	
	
?>