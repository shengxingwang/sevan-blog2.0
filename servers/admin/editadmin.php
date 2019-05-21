<?php
	require 'dbconfig.php';
	require 'reponseMsg.class.php';
	require 'mstoken.php';
	
	$mstoken = new Mstoken;
	$response = new reponseMsg;
	$tj1 = "1 = 1";
	$tj2 = "1 = 1";
	$data=null;
	$code=413;
	$message="未知请求";
	if(empty($_POST["action"])){
		echo $response->enjson($code,$message,$data);
		exit;
	}
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
	$action = $_POST["action"];
	$id = isset($_POST["id"])?$_POST["id"]:'';
	switch($action){
		case 'delArt':
			$sql = "delete from arthome where id = '$id'";
			$result = mysqli_query($conn, $sql);
			if($result){
				$code =200;
				$data ="删除成功";
				$message = "success";
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'delArtAll':
			$idstr = implode("','",$id);
			$sql = "delete from arthome where id in ('{$idstr}')";
			$result = mysqli_query($conn, $sql);
			if($result){
				$code =200;
				$data ="删除成功";
				$message = "success";
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'delComm':
			$sql = "delete from comment where cid = '$id'";
			$result = mysqli_query($conn, $sql);
			if($result){
				$code =200;
				$data ="删除成功";
				$message = "success";
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'delCommAll':
			$idstr = implode("','",$id);
			$sql = "delete from comment where cid in ('{$idstr}')";
			$result = mysqli_query($conn, $sql);
			if($result){
				$code =200;
				$data ="删除成功";
				$message = "success";
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'delFeed':
			$sql = "delete from feed_back where id = '$id'";
			$result = mysqli_query($conn, $sql);
			if($result){
				$code =200;
				$data ="删除成功";
				$message = "success";
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'delFeedAll':
			$idstr = implode("','",$id);
			$sql = "delete from feed_back where id in ('{$idstr}')";
			$result = mysqli_query($conn, $sql);
			if($result){
				$code =200;
				$data ="删除成功";
				$message = "success";
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'delUser':
			$id = isset($_POST["userid"])?$_POST["userid"]:'';
			$sql = "delete from usertab where userid = '$id'";
			$result = mysqli_query($conn, $sql);
			if($result){
				$code =200;
				$data ="删除成功";
				$message = "success";
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'delcollimg':
			$sql = "delete from imgcoll where imgid = '$id'";
			$result = mysqli_query($conn, $sql);
			if($result){
				$code =200;
				$data ="删除成功";
				$message = "success";
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'delimgbach':
			$idstr = implode("','",$id);
			$sql = "delete from imgcoll where imgid in ('{$idstr}')";
			$result = mysqli_query($conn, $sql);
			if($result){
				$code =200;
				$data ="删除成功";
				$message = "success";
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'addBatchImg':
			$imgarr = isset($_POST["imgarr"])?$_POST["imgarr"]:'';
			$count = count($imgarr);
			$sui = 0;
			$fail = 0;
			for($i=0;$i<$count;$i++){
				$item = $imgarr[$i];
			    $sql = "INSERT INTO imgcoll (id,hsrc) VALUES ('$id','$item')";
			    $result = mysqli_query($conn,$sql);
				if($result){
					$sui=$sui+1;
				}else{
					$fail=$fail+1;
				}
			}
			if($sui==$count){
				$code=200;
				$message="提交成功";
				$data =null;
			}else{
				$code=403;
				$message="提交失败";
				$data = array("fail"=>$fail,"success"=>$sui);
			}
			break;
		case 'editimgitem':
			$imgid= isset($_POST["imgid"])?$_POST["imgid"]:'';
			$imgurl = isset($_POST["imgurl"])?$_POST["imgurl"]:'';
			$imgtxt = isset($_POST["imgtxt"])?$_POST["imgtxt"]:'';
			$sql = "update imgcoll set hsrc='{$imgurl}',imgtxt='{$imgtxt}' where imgid='$imgid'";
			$result = mysqli_query($conn, $sql);
			if($result){
				if(mysqli_affected_rows($conn)){
					$code =200;
					$data ="修改成功";
					$message = "success";
				}else{
					$code =200;
					$message="未做任何修改";
				}
			}else{
				$code =403;
				$message="修改失败";
			}
			break;
		case 'addlunbo':
			$imgarr = isset($_POST["imgarr"])?$_POST["imgarr"]:'';
			$type = isset($_POST["lunitem"])?$_POST["lunitem"]:'';
			$topath=null;
			$imgdesc = null;
			if(!empty($_POST["topath"])){
				$topath=$_POST["topath"];
			}
			if(!empty($_POST["imgdesc"])){
				$imgdesc=$_POST["imgdesc"];
			}
			$count = count($imgarr);
			$sui = 0;
			$fail = 0;
			for($i=0;$i<$count;$i++){
				$item = $imgarr[$i];
			    $sql = "INSERT INTO lunbo (type,imgurl,topath,imgdesc) VALUES ('$type','$item','$topath','$imgdesc')";
			    $result = mysqli_query($conn,$sql);
				if($result){
					$sui=$sui+1;
				}else{
					$fail=$fail+1;
				}
			}
			if($sui==$count){
				$code=200;
				$message="提交成功";
				$data =null;
			}else{
				$code=403;
				$message="提交失败";
				$data = array("fail"=>$fail,"success"=>$sui);
			}
			break;
		case 'dellunbo':
			$sql = "delete from lunbo where id = '$id'";
			$result = mysqli_query($conn, $sql);
			if($result){
				$code =200;
				$data ="删除成功";
				$message = "success";
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'dellunboAll':
			$idstr = implode("','",$id);
			$sql = "delete from lunbo where id in ('{$idstr}')";
			$result = mysqli_query($conn, $sql);
			if($result){
				$code =200;
				$data ="删除成功";
				$message = "success";
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'editlunboitem':
			$imgurl = $_POST["imgurl"];
			$imgitem = $_POST["imgitem"];
			$sql = "update lunbo set imgurl='{$imgurl}',type='{$imgitem}' where id='$id'";
			$result = mysqli_query($conn, $sql);
			if($result){
				if(mysqli_affected_rows($conn)){
					$code =200;
					$data ="修改成功";
					$message = "success";
				}else{
					$code =200;
					$message="未做任何修改";
				}
			}else{
				$code =403;
				$message="修改失败";
			}
			break;
		default:
        	$code=413;
			$message="啊噢！系统开小差了";
	}
	echo $response->enjson($code,$message,$data);
	mysqli_close($conn);
?>