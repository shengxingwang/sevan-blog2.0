<?php
	class reponseMsg{
		public function enjson($code,$msg,$data){
			$resultMsg = array(
				"code"=>$code,
				"message"=>$msg,
				"data"=>$data
			);
			return json_encode($resultMsg);
		}
	}
?>