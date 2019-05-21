<?php
	require 'dbconfig.php';
	require 'reponseMsg.class.php';
	
	header("Access-Control-Allow-Origin: *");
	header('conten-type:text/html;charset=utf-8');
	if(empty($_GET["action"])){
		exit('404');
	}
	$action = $_GET["action"];
	$tj1 = "1 = 1";
	$tj2 = "1 = 1";
	$pageSize = 14;
	$data=null;
	$code=413;
	$message="未知请求";
	switch($action){
		case 'artManage':
			$page = 1;
			if(!empty($_GET["page"])){
				$page = $_GET["page"];
			}
			if(!empty($_GET["type"])){
				$type = $_GET["type"];
				$tj1 = "item='{$type}'";
			}
			if(!empty($_GET["stype"])){
				$stype = $_GET["stype"];
				$tj1 = "stype='{$stype}'";
			}
			if(!empty($_GET["anthor"])){
				$anthor = $_GET["anthor"];
				$tj2 = "anthor='{$anthor}'";
			}
			if(!empty($_GET["artname"])){
				$artname = $_GET["artname"];
				$tj2 = "artname='{$artname}'";
			}
			if(!empty($_GET["pageSize"])){
				$pageSize = $_GET["pageSize"];
			}
			$star = $pageSize*($page-1);
			$tj =  "where ".$tj1." and ".$tj2;
			//获取总条数
			$sql2 = "select count(*) from arthome ".$tj;
			$result2 = mysqli_query($conn, $sql2);
			list($pageCount) = mysqli_fetch_row($result2);
			//总页数
			$pageNum = ceil($pageCount/$pageSize);
			
			$sql = "select * from arthome ".$tj." limit $star,$pageSize";
			$result = mysqli_query($conn, $sql);
			if($result){
				if(count($result)>0){
					while(($row = mysqli_fetch_assoc($result))!==null){
						$arr[]=$row;
					}
					$code =200;
					$data = array("pageNum"=>$pageNum,"pageSize"=>$pageSize,"curPage"=>$page,"list"=>$arr);
					$message = "success";
				}else{
					$code =200;
					$message="查询结果为空";
					$data=[];
				}
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'commManage':
			$page = 1;
			if(!empty($_GET["page"])){
				$page = $_GET["page"];
			}
			if(!empty($_GET["userid"])){
				$userid = $_GET["userid"];
				$tj1 = "userid='{$userid}'";
			}
			if(!empty($_GET["pageSize"])){
				$pageSize = $_GET["pageSize"];
			}
			$star = $pageSize*($page-1);
			$tj =  "where ".$tj1;
			
			//获取总条数
			$sql2 = "select count(*) from comment ".$tj;
			$result2 = mysqli_query($conn, $sql2);
			list($pageCount) = mysqli_fetch_row($result2);
			//总页数
			$pageNum = ceil($pageCount/$pageSize);
			
			$sql = "select * from comment ".$tj." limit $star,$pageSize";
			$result = mysqli_query($conn, $sql);
			if($result){
				if(mysqli_num_rows($result)>0){
					while(($row = mysqli_fetch_assoc($result))!==null){
						$arr[]=$row;
					}
					$code =200;
					$data = array("pageNum"=>$pageNum,"pageSize"=>$pageSize,"curPage"=>$page,"list"=>$arr);
					$message = "success";
				}else{
					$code =403;
					$message="结果为空";
					$data=[];
				}
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'feedManage':
			$page = 1;
			if(!empty($_GET["page"])){
				$page = $_GET["page"];
			}
			if(!empty($_GET["userid"])){
				$userid = $_GET["userid"];
				$tj1 = "userid='{$userid}'";
			}
			if(!empty($_GET["pageSize"])){
				$pageSize = $_GET["pageSize"];
			}
			$star = $pageSize*($page-1);
			$tj =  "where ".$tj1;
			
			//获取总条数
			$sql2 = "select count(*) from feed_back ".$tj;
			$result2 = mysqli_query($conn, $sql2);
			list($pageCount) = mysqli_fetch_row($result2);
			//总页数
			$pageNum = ceil($pageCount/$pageSize);
			
			$sql = "select * from feed_back ".$tj." limit $star,$pageSize";
			$result = mysqli_query($conn, $sql);
			if($result){
				if(mysqli_num_rows($result)>0){
					while(($row = mysqli_fetch_assoc($result))!==null){
						$arr[]=$row;
					}
					$code =200;
					$data = array("pageNum"=>$pageNum,"pageSize"=>$pageSize,"curPage"=>$page,"list"=>$arr);
					$message = "success";
				}else{
					$code =403;
					$message="结果为空";
					$data=[];
				}
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'lunboManage':
			$page = 1;
			if(!empty($_GET["page"])){
				$page = $_GET["page"];
			}
			if(!empty($_GET["imgitem"])){
				$type = $_GET["imgitem"];
				$tj1 = "type='{$type}'";
			}
			if(!empty($_GET["pageSize"])){
				$pageSize = $_GET["pageSize"];
			}
			$star = $pageSize*($page-1);
			$tj =  "where ".$tj1;
			
			//获取总条数
			$sql2 = "select count(*) from lunbo ".$tj;
			$result2 = mysqli_query($conn, $sql2);
			list($pageCount) = mysqli_fetch_row($result2);
			//总页数
			$pageNum = ceil($pageCount/$pageSize);
			
			$sql = "select * from lunbo ".$tj." limit $star,$pageSize";
			$result = mysqli_query($conn, $sql);
			if($result){
				if(mysqli_num_rows($result)>0){
					while(($row = mysqli_fetch_assoc($result))!==null){
						$arr[]=$row;
					}
					$code =200;
					$data = array("pageNum"=>$pageNum,"pageSize"=>$pageSize,"curPage"=>$page,"list"=>$arr);
					$message = "success";
				}else{
					$code =403;
					$message="结果为空";
					$data=[];
				}
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'userManage':
			$page = 1;
			if(!empty($_GET["page"])){
				$page = $_GET["page"];
			}
			if(!empty($_GET["userid"])){
				$userid = $_GET["userid"];
				$tj1 = "userid='{$userid}'";
			}
			if(!empty($_GET["nickname"])){
				$nickname = $_GET["nickname"];
				$tj1 = "nickname='{$nickname}'";
			}
			if(!empty($_GET["pageSize"])){
				$pageSize = $_GET["pageSize"];
			}
			$star = $pageSize*($page-1);
			$tj =  "where ".$tj1;
			
			//获取总条数
			$sql2 = "select count(*) from usertab ".$tj;
			$result2 = mysqli_query($conn, $sql2);
			list($pageCount) = mysqli_fetch_row($result2);
			//总页数
			$pageNum = ceil($pageCount/$pageSize);
			
			$sql = "select userid,nickname,headimg from usertab ".$tj." limit $star,$pageSize";
			$result = mysqli_query($conn, $sql);
			if($result){
				if(mysqli_num_rows($result)>0){
					while(($row = mysqli_fetch_assoc($result))!==null){
						$arr[]=$row;
					}
					$code =200;
					$data = array("pageNum"=>$pageNum,"pageSize"=>$pageSize,"curPage"=>$page,"list"=>$arr);
					$message = "success";
				}else{
					$code =200;
					$message="结果为空";
					$data=[];
				}
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'getArtItem':
			$id = $_GET["id"];
			
			$sql = "select * from arthome where id='$id'";
			$result = mysqli_query($conn, $sql);
			if($result){
				$row = mysqli_fetch_array($result,MYSQL_ASSOC);
				if($row!=null){
					foreach ($row as $key => $v) {
			            $res[$key] = $v;
			        }
					$code =200;
			        $data = $res;
					$message = "success";
				}else{
					$code =403;
					$message="查询失败";
				}
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'getArtimgColl':
			$id = $_GET["id"];
			
			$sql = "select * from imgcoll where id='$id'";
			$result = mysqli_query($conn, $sql);
			if($result){
				if(mysqli_num_rows($result)<1){
					$code =403;
					$message="查询结果为空";
				}else{
					while(($row = mysqli_fetch_assoc($result))!==null){
						$arr[]=$row;
					}
					$code =200;
					$data =$arr;
					$message = "success";
				}
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		case 'getimgCollItem':
			$imgid = $_GET["imgid"];
			
			$sql = "select * from imgcoll where imgid='$imgid'";
			$result = mysqli_query($conn, $sql);
			if($result){
				$row = mysqli_fetch_array($result,MYSQL_ASSOC);
				if($row!=null){
					foreach ($row as $key => $v) {
			            $res[$key] = $v;
			        }
					$code =200;
			        $data = $res;
					$message = "success";
				}else{
					$code =403;
					$message="查询失败";
				}
			}else{
				$code =403;
				$message="啊噢！系统开小差了";
			}
			break;
		default:
        	$code=413;
			$message="啊噢！系统开小差了";
	}
	$response = new reponseMsg;
	echo $response->enjson($code,$message,$data);
	mysqli_close($conn);
?>