<?php
	require 'dbconfig.php';
	require 'reponseMsg.class.php';
	$ctime = date('Y-m-d H:i:s',time());
	$data=null;
	$code =403;
	$message="not Found";
	$pageSize = 14;
	if(!empty($_GET["action"])){
		$action = $_GET["action"];
		switch($action){
			case "getArtList":
				$page = 1;
				if(!empty($_GET["page"])){
					$page = $_GET["page"];
				}
				if(!empty($_GET["pageSize"])){
					$pageSize = $_GET["pageSize"];
				}
				$type = $_GET["type"];
				
				//获取总条数
				$star = $pageSize*($page-1);
				$sql2 = "select count(*) from arthome where item='$type'";
				$result2 = mysqli_query($conn, $sql2);
				list($pageCount) = mysqli_fetch_row($result2);
				//总页数
				$pageNum = ceil($pageCount/$pageSize);
				
				$sql = "SELECT id,anthor,stype,artname,hasimg,artdesc,clicknum,item FROM arthome where item='$type' limit $star,$pageSize";
				$result = mysqli_query($conn,$sql);
				if($result){
					if(mysqli_num_rows($result)>0){
						while(($row = mysqli_fetch_assoc($result))!==null){
							$arr[]=$row;
						}
						$code =200;
						$data = array("pageNum"=>$pageNum,"pageSize"=>$pageSize,"curPage"=>$page,"list"=>$arr);
						$message = "success";
					}else{
						$code =203;
						$data =null;
						$message = "无数据";
					}
				}else{
					$code =403;
					$message="啊噢！系统开小差了";
				}
				break;
			case "search":
				if(!empty($_GET["keyword"])){
					$keyword = $_GET["keyword"];
					$sql = "SELECT id,anthor,artname,artdesc,item FROM arthome where artname like '%{$keyword}%' ";
					$result = mysqli_query($conn,$sql);
					if($result){
						$stotal = mysqli_num_rows($result);
						if($stotal>0){
							while(($row = mysqli_fetch_assoc($result))!==null){
								$arr[]=$row;
							}
							$code =200;
							$data = array("total"=>$stotal,"list"=>$arr);
							$message = "success";
						}else{
							$code =203;
							$data =null;
							$message = "无数据";
							}
					}else{
						$code =403;
						$message="啊噢！系统开小差了";
					}
				}else{
					$code =203;
					$message="无数据";
					$data=null;
				}
				break;
			case "getConTxt":
				$id = $_GET["id"];
				$sql = "SELECT * FROM arthome where id='$id'";
		     	$result = mysqli_query($conn,$sql);
				if($result){
					if(mysqli_num_rows($result)>0){
						$row = mysqli_fetch_array($result,MYSQL_ASSOC);
				        foreach ($row as $key => $v) {
				            $res[$key] = $v;
				        }
						$code =200;
				        $data = $res;
						$message = "success";
					}else{
						$code =203;
						$message="无数据";
						$data=null;
					}
				}else{
					$code =403;
					$message="啊噢！系统开小差了";
				}
		     	break;
			case "lookcount":
				$artid = $_GET["id"];
				$nickname = $_GET["nickname"];
				$sql1 = "UPDATE arthome SET clicknum=clicknum+1 WHERE id='$artid'";
				mysqli_query($conn,$sql1);
				$sql2 = "insert into clicktab(artid,userid,looktime) values ('$artid','$nickname','$ctime')";
				$result = mysqli_query($conn,$sql2);
				if($result){
					if(mysqli_affected_rows($conn)){
						$code=200;
						$message="ok";
					}else{
						$code=200;
						$message="ok--but nothing";
					}
				}else{
					$code=413;
					$message="修改失败，请重新尝试或联系管理员";
				}
				break;
			case "getCollImg":
				$id = $_GET["id"];
				$sql = "SELECT id,hsrc,imgtxt FROM imgcoll where id=$id";
				$result = mysqli_query($conn,$sql);
				if($result){
					if(mysqli_num_rows($result)>0){
						while(($row = mysqli_fetch_assoc($result))!==null){
							$arr[]=$row;
						}
						$code =200;
						$data = $arr;
						$message = "success";
					}else{
						$code =203;
						$data =null;
						$message = "无数据";
					}
				}else{
					$code =403;
					$message="啊噢！系统开小差了";
				}
				break;
			case "getComm":
				$id = $_GET['id'];
				$sql = "SELECT comment.*,usertab.userid,usertab.nickname,usertab.headimg FROM comment INNER JOIN usertab on comment.userid=usertab.userid where comment.id ='$id'";
				$result = mysqli_query($conn,$sql);
				if($result){
					if(mysqli_num_rows($result)>0){
						while(($row = mysqli_fetch_assoc($result))!==null){
							$arr[]=$row;
						}
						$code =200;
						$data = $arr;
						$message = "success";
					}else{
						$code =203;
						$data =null;
						$message = "无数据";
					}
				}else{
					$code =403;
					$message="啊噢！系统开小差了";
				}
				break;
			case "getlunbo":
				$type = $_GET['item'];
				$sql = "SELECT * FROM lunbo where type='$type'";
				$result = mysqli_query($conn,$sql);
				if($result){
					if(mysqli_num_rows($result)>0){
						while(($row = mysqli_fetch_assoc($result))!==null){
							$arr[]=$row;
						}
						$code =200;
						$data = $arr;
						$message = "success";
					}else{
						$code =203;
						$data =null;
						$message = "无数据";
					}
				}else{
					$code =403;
					$message="啊噢！系统开小差了";
				}
				break;
			default:
	        	$code=413;
				$message="啊噢！系统开小差了";
				$data=null;
		}
	}else{
		$code=404;
		$message="404!不存在的请求";
		$data = null;
	}
	$response = new reponseMsg;
	echo $response->enjson($code,$message,$data);
	mysqli_close($conn);
?>