<?php

	require 'dbconfig.php';
	require 'reponseMsg.class.php';
	require 'php-sdk-7.2.3/autoload.php';
	require 'mstoken.php';
	use Qiniu\Auth;
	use Qiniu\Storage\UploadManager;
	
	$mstoken = new Mstoken;
	  // 用于签名的公钥和私钥
	$accessKey = 'Ve4kyo2uJJT7KEAmBmQ0As2CJkNrC5McaW_Arz39';
	$secretKey = 'rChVfuaxjdrfnHaO3nyluC6E9QfHYm0iUy22NEoy';
	$bucket = "yuebook";
	  // 初始化签权对象
	$response = new reponseMsg;
	
	$auth = new Auth($accessKey, $secretKey);
	// 生成上传 Token
	$token = $auth->uploadToken($bucket);
	if($_FILES['file']){
		#包含了一些错误处理的方法；
		if ($_FILES['file']['error'] > 0)
		 {
		 	$code='403';
		  	$message= 'Problem: ';
		  switch ($_FILES['file']['error'])
		  {
		    case 1:
				$message = $message.'File exceeded upload_max_filesize';
                break;
		    case 2:
				$message = $message.'File exceeded max_file_size';
            	break;
		    case 3:
				$message = $message.'File only partially uploaded';
                break;
		    case 4:
				$message = $message.'No file uploaded';
                break;
		    case 6:
				$message = $message.'Cannot upload file: No temp directory specified.';
                break;
		    case 7:
				$message = $message.'Upload failed: Cannot write to disk.';
                break;
		  }
		 exit;
		}
		
		$name = time().$_FILES['file']['name'];
		$filePath = $_FILES['file']['tmp_name'];
		$type = $_FILES['file']['type'];
		// 初始化 UploadManager 对象并进行文件的上传。
		$uploadMgr = new UploadManager();
		// 调用 UploadManager 的 putFile 方法进行文件的上传。
		list($ret, $err) = $uploadMgr->putFile($token, $name,$filePath);
	}

	if ($err !== null) {
		$code='403';
	  	$message='上传失败！';
	  	$data = $err;
	} else {
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
		$url = 'http://p6cc5b5ex.bkt.clouddn.com/'.$ret["key"];
		$sql = "UPDATE usertab SET headimg='$url' WHERE userid='$userid'";
		$result = mysqli_query($conn,$sql);
		if($result){
			$code=200;
	  		$message='上传成功！';
			$data = array('imgUrl'=>$url);
		}else{
			$code=413;
			$message="修改失败，请重新尝试或联系管理员";
		}
	}
	echo $response->enjson($code,$message,$data);
	mysqli_close($conn);
	
?>