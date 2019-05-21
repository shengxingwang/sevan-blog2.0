<?php
	require 'firebase/JWT.php';
	use Firebase\JWT\JWT;
	
	// $dbname = "WRpAQmCsvoieMzpeCJsj"; //数据库名称
	/*从环境变量里取host,port,user,pwd*/
	// $host = 'redis.duapp.com';
	// $port = '80';
	// $user = 'dbec51db00804198a66392cd3a78c6ac';
	// $pwd = '50329fddef6b406fa0a2d475f2aa4476';
	//实例化redis
	// $redis = new Redis();
	//连接	
	// $ret = $redis->connect($host, $port);
	//$redis->connect('127.0.0.1',6379);
 	// if ($ret === false) {
  //   	die($redis->getLastError());
  //   }
  //   $ret = $redis->auth($user . "-" . $pwd . "-" . $dbname);
  //   if ($ret === false) {
  //   	die($redis->getLastError());
  //   }	
	class Mstoken{
		public static $key = "adminyuebook";
		
		//生成token 参数userid 返回token
		public static function setToken($userid){
			global $redis;
			$nowtime = time();
			$expir = 3600;
			$tokenStr = array("userid"=>$userid,"nowtime"=>$nowtime,"endTime"=>($expir+$nowtime));
			$jwt = JWT::encode($tokenStr, self::$key);
			// $redis->set($userid,$jwt);
			// $redis->expire($userid,$expir);
			return $jwt;
		}
		//解析token 参数token 返回userid
		public static function getToken($token){
			// global $redis;
			$dtoken = JWT::decode($token, self::$key, array('HS256'));
			$nowtime = time();
			$tokenArr = (array) $dtoken;
			$userid = $tokenArr["userid"];
			$endTime = $tokenArr["endTime"];
			
			if ($nowtime<$endTime&&$userid){
				return $userid;
			}else{
				return false;
			}
		}
	}
?>