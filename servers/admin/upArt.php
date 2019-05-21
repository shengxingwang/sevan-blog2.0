<?php
	header("Access-Control-Allow-Origin: *");
	header('conten-type:text/html;charset=utf-8');
	require 'dbconfig.php';
	require 'reponseMsg.class.php';
	
	$code='413';
  	$message='未知请求！';
	$data =null;
	$hasimg ='';
	$stringtime = date('Y-m-d H:i:s',time());
	$param = $_POST;
	
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
		if(empty($arr["content"])){
			$message='请填写内容！';
			return false;
		}
		return true;
	}
	if(checkForm($param)){
		$sql = "INSERT INTO arthome (anthor,artname,artdesc,contxt,ptime,hasimg,stype,item) VALUES ('{$param['anthor']}','{$param['artname']}','{$param['desc']}','{$param['content']}','{$stringtime}','{$hasimg}','{$param['arttype']}','{$param['artitem']}')";
		$result = mysqli_query($conn,$sql);
		if($result){
			$code = 200;
			$message = "发布成功";
			$data = "ok";
		}else{
			$code = 403;
			$message = "发布失败";
			$data = "";
		}
	}
	
	
	$response = new reponseMsg;
	echo $response->enjson($code,$message,$data);
	mysqli_close($conn);
	
	
?>