<?php 
	header("Access-Control-Allow-Origin: *");
	header('conten-type:text/html;charset=utf-8');
	
	interface partest{
        public function getConn();
    	public function resMsg();
    }

	class testServer implements partest{
		public $code = 403;
		public $msg ='无效操作！';
		public $data=null;
		//链接数据库
		public function getConn($servername='localhost',$username='root',$password='',$dbname='arttest',$port=3306){
			$conn = mysqli_connect($servername,$username,$password,$dbname,$port);
			if($conn){
				return $conn;
			}else{
				$this->code =101;
				$this->msg = 'sql connect error';
			}
		}
		//返回数据
		public function resMsg(){
			$resTxt = array('code' => $this->code ,'msg' => $this->msg ,'data' => $this->data);
			return json_encode($resTxt);
		}
		//获取诗词
		public function getPoem($conn){
			$sql = 'select * from poems limit 0,10';
			$result = mysqli_query($conn,$sql);
			if($result){
				while(($row=mysqli_fetch_assoc($result))!==null){
						$arr[]=$row;
					}
					$this->code = 200;
					$this->data = $arr;
					$this->msg = "success";
			}else{
				$this->code =403;
				$this->msg = "啊噢！系统开小差了";
			}
		}

		public function HttpGet($url){
	        $curl = curl_init ();
	        curl_setopt ( $curl, CURLOPT_URL, $url );
	        curl_setopt ( $curl, CURLOPT_RETURNTRANSFER, true );
	        // curl_setopt ( $curl, CURLOPT_TIMEOUT, 500 );
	        // curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36');
	        
	        //如果用的协议是https则打开鞋面这个注释
	        curl_setopt ( $curl, CURLOPT_SSL_VERIFYPEER, false );
	        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	        
	        $res = curl_exec ( $curl );
	        curl_close ( $curl );
	        return $res;
    	}

	}

	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$dbname = 'arttest';
	$port = 3306;

	$testserver = new testServer;
	$conn = $testserver->getConn($servername,$username,$password,$dbname,$port);
	$res = $testserver->HttpGet('https://www.toutiao.com/api/pc/focus/');
	$response =  $res;
	// $response = $testserver->resMsg();
	echo $response;
?>