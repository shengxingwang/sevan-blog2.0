<?php 
	class Response {
		public static function json($code = 304, $msg = '未知请求', $data = null){
			$res = array(
				'code'=>$code,
				'msg'=>$msg,
				'data'=>$data
			);
			echo json_encode($res);
			exit;
		}
	}
?>