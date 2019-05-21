<?php
	require 'dbconfig.php';
	require 'reponseMsg.class.php';
	require 'mstoken.php';
	
	$mstoken = new Mstoken;
	$response = new reponseMsg;
	
	$ctime = date('Y-m-d H:i:s',time());
	$now = time();
	$data = null;
	if(!empty($_REQUEST["action"])){
		$action = $_REQUEST["action"];
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
		switch($action){
			case "editpwd":
				$pastpwd = md5($_POST["pastpwd"]);
				$newpwd = md5($_POST["newpwd"]);
				$sql = "select pwd from usertab where userid = '$userid'";
				$result = mysqli_query($conn,$sql);
				if($result){
					$row = mysqli_fetch_array($result);
					if($row!=null){
						if($row["pwd"]===$pastpwd){
							$sql2 = "UPDATE usertab SET pwd='$newpwd' WHERE userid='$userid'";
							$result2 = mysqli_query($conn,$sql2);
							if($result2){
								$code = 200;
								$message ="恭喜您！密码修改成功";
							}else{
								$code = 403;
								$message ="修改失败，请重新尝试或联系管理员";
							}
						}else{
							$code = 403;
							$message ="密码错误，请您确认再试";
						}
					}else{
						$code = 403;
						$message ="账户不存在！";
					}
				}else{
					$code = 403;
					$message ="出现错误，请联系管理员！";
				}
				break;
			case "editnick":
				$newnick = $_POST["newnick"];
				$sql = "UPDATE usertab SET nickname='$newnick' WHERE userid='$userid'";
				$result = mysqli_query($conn,$sql);
				if($result){
					$code = 200;
					$message ="修改成功";
				}else{
					$code = 403;
					$message ="修改失败，请重新尝试或联系管理员";
				}
				break;
			case "editfeed":
				$feedtxt = $_POST["feedtxt"];
				$sql = "insert into feed_back(userid,feedtxt,ftime) values ('$userid','$feedtxt','$ctime')";
				$result = mysqli_query($conn,$sql);
				if($result){
					$code=200;
					$message="提交成功";
				}else{
					$code=413;
					$message="提交失败，请重新尝试或联系管理员";
				}
				break;
			case "edithead":
				$headimg = $_POST["headimg"];
				$sql = "UPDATE usertab SET headimg='$headimg' WHERE userid='$userid'";
				$result = mysqli_query($conn,$sql);
				if($result){
					$code=200;
					$message="修改成功";
				}else{
					$code=413;
					$message="修改失败，请重新尝试或联系管理员";
				}
				break;
			case "putComm":
				$id = $_POST['id'];
				$commtxt = $_POST['commtxt'];
				$ptime = date('Y-m-d H:i:s',time());
				$sql = "INSERT INTO comment (id,userid,commtxt,ptime) VALUES ('$id','$userid','$commtxt','$ptime')";
				$result = mysqli_query($conn,$sql);
				if($result){
					$code = 200;
					$message = "评论成功";
				}else{
					$code = 403;
					$message="啊噢！系统开小差了";
				}
				break;
			case "zancomment":
				$cid = $_POST["id"];
				$sql = "select * from zantab where userid = '$userid' and cid = '$cid'";
				if(mysqli_affected_rows($conn)){
					$code=403;
					$message="您已赞过该评论！";
				}else{
					$sql1 = "UPDATE comment SET zannum=zannum+1 WHERE cid='$cid'";
					mysqli_query($conn,$sql1);
					$sql2 = "insert into zantab(cid,userid) values ('$cid','$userid')";
					$result = mysqli_query($conn,$sql2);
					if($result){
						$code=200;
						$message="点赞成功！";
					}else{
						$code=413;
						$message="服务器出错咯！";
					}
				}
				break;
			default:
	        	$code=413;
				$message="啊噢！系统开小差了";
		}
	}else{
		$code=404;
		$message="404!不存在的请求";
	}
	echo $response->enjson($code,$message,$data);
	mysqli_close($conn);
?>