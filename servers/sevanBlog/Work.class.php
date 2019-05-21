<?php 
	/**
	 * 服务响应
	 */
	class Work
	{
		protected $response; //响应数据处理
		protected $db;//数据库对象
		protected $code;
		protected $msg;
		protected $data;
		protected $tk;
		public function __construct($action)
		{
			global $config;
			$this->code = 304;
			$this->msg = '未知请求';
			$this->data = null;
			$this->response = new Response();
			$this->db = new Mysql($config);
			$this->tk = new Mstoken;
			switch ($action) {
				case 'getHomeNews':
						$this->getHomeNews();
					break;
				case 'getStatus':
						$this->getStatus();
					break;
				case 'getCouldComment':
						$this->getCloudComment();
					break;
				case 'getTouch':
						$this->getTouchList();
					break;
				case 'getInfo':
						$this->getInfo();
					break;
				case 'getExpre':
						$this->getExpre();
					break;
				case 'getLocal':
						$this->getLocal();
					break;
				case 'addNews':
						$this->checkToken();
						$this->addNews();
					break;
				case 'addTouch':
						$this->addTouch();
					break;
				case 'addExpre':
						$this->checkToken();
						$this->addExpre();
					break;
				case 'upInfo':
						$this->checkToken();
						$this->upInfo();
					break;
				case 'upExpre':
						$this->checkToken();
						$this->upExpre();
					break;
				case 'delTouch':
						$this->checkToken();
						$this->delTouch(1);
					break;
				case 'delAllTouch':
						$this->checkToken();
						$this->delTouch(2);
					break;
				case 'delNews':
						$this->checkToken();
						$this->delNews(1);
					break;
				case 'delAllNews':
						$this->checkToken();
						$this->delNews(2);
					break;
				case 'delExpre':
						$this->checkToken();
						$this->delExpre();
					break;
				case 'addlocal':
						$this->addlocal();
					break;
				default:
						$this->reponseFun();
					break;
			}
		}
		//验证Token
		public function checkToken(){
			if(!empty($_POST["token"])){
				$token = $_POST["token"];
				$userid = $this->tk->getToken($token);
				if(!$userid){
					$this->code = 900;
					$this->msg ="登录超时，请重新登录！";
					$this->reponseFun();
				}
			}else{
				$this->code  = 900;
				$this->msg ="无效登录信息";
				$this->reponseFun();
			}
			return;
		}
		//获取今日头条信息
		public function getHomeNews()
		{
			$res = $this->HttpGet('https://www.toutiao.com/api/pc/focus/');
			echo $res;
			exit();
		}
		//获取云音乐评论
		public function getCloudComment(){
			$sql = 'select * from cloud_comment';
			$page = isset($_GET['page'])?$_GET['page']:1;
			$offset = isset($_GET['offset'])?$_GET['offset']:10;
			$order = "order by cloudzan";
			$res = $this->db->getOffset('cloud_comment',$sql, $offset, $page, $order);
			if($res){
				$this->data = $res;
				$this->code = 200;
				$this->msg = 'success!';
			}else{
				$this->code = 405;
				$this->msg = 'error！';
			}
			$this->reponseFun();
		}
		//获取动态列表
		public function getStatus(){
			$sql = 'select * from blog_news';
			$page = isset($_GET['page'])?$_GET['page']:1;
			$offset = isset($_GET['offset'])?$_GET['offset']:10;
			$res = $this->db->getOffset('blog_news',$sql, $offset, $page);
			if($res){
				$this->data = $res;
				$this->code = 200;
				$this->msg = 'success!';
			}else{
				$this->code = 405;
				$this->msg = 'error！';
			}
			$this->reponseFun();
		}
		//获取经历信息
		public function getExpre(){
			$sql = 'select * from blog_exper order by top';
			$res = $this->db->getAll($sql);
			if($res){
				if(is_array($res)){
					$this->data = $res;
				}
				$this->code = 200;
				$this->msg = 'success!';
			}else{
				$this->code = 405;
				$this->msg = 'error！';
			}
			$this->reponseFun();
		}
		//获取留言列表
		public function getTouchList()
		{
			$sql = 'select * from blog_touch';
			$page = isset($_GET['page'])?$_GET['page']:1;
			$offset = isset($_GET['offset'])?$_GET['offset']:10;
			$res = $this->db->getOffset('blog_touch',$sql, $offset, $page);
			if($res){
				$this->data = $res;
				$this->code = 200;
				$this->msg = 'success!';
			}else{
				$this->code = 405;
				$this->msg = 'error！';
			}
			$this->reponseFun();
		}
		//获取个人信息
		public function getInfo()
		{
			$id = $_POST['uid'];
			$sql = "select * from blog_info where id = $id";
			$res = $this->db->getRow($sql);
			if($res){
				$this->data = $res;
				$this->code = 200;
				$this->msg = 'success!';
			}else{
				$this->code = 405;
				$this->msg = 'error！';
			}
			$this->reponseFun();
		}
		//获取定位信息
		public function getLocal()
		{
			$sql = "select * from yue_local";
			$res = $this->db->getAll($sql);
			if($res){
				if(is_array($res)){
					$this->data = $res;
				}
				$this->code = 200;
				$this->msg = 'success!';
			}else{
				$this->code = 405;
				$this->msg = 'error！';
			}
			$this->reponseFun();
		}
		/**
		*Get请求
		*/
		public function httpGet($url)
		{
			$curl = curl_init ();
	        curl_setopt ( $curl, CURLOPT_URL, $url );
	        curl_setopt ( $curl, CURLOPT_RETURNTRANSFER, true );
	        // curl_setopt ( $curl, CURLOPT_TIMEOUT, 500 );
	        // curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36');
	        
	        //如果用的协议是https则打开下面两行
	        curl_setopt ( $curl, CURLOPT_SSL_VERIFYPEER, false );
	        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	        
	        $res = curl_exec ( $curl );
	        curl_close ( $curl );
	        return $res;
		}
		//添加联系信息
		public function addTouch()
		{
			$table = 'blog_touch';
			$touchType = isset($_POST['touchType'])?$_POST['touchType']:$this->reponseFun();
			$uname = isset($_POST['uName'])?$_POST['uName']:$this->reponseFun();
			$msgtxt = isset($_POST['msgtxt'])?$_POST['msgtxt']:$this->reponseFun();
			$comp = isset($_POST['comp'])?$_POST['comp']:'';
			$job = isset($_POST['job'])?$_POST['job']:'';

			$dataArr = array(
				'uname'=>$uname,
				'msgtxt'=>$msgtxt,
				'touchType'=>$touchType,
				'comp'=>$comp,
				'job'=>$job
			);

			$res = $this->db->insertRow($table, $dataArr);
			if($res){
				$this->data = $res;
				$this->code = 200;
				$this->msg = '数据提交成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据提交失败！';
			}
			$this->reponseFun();
		}
		//添加经历
		public function addExpre(){
			$table = 'blog_exper';
			$comp = isset($_POST['comp'])?$_POST['comp']:$this->reponseFun();
			$start = isset($_POST['start'])?$_POST['start']:$this->reponseFun();
			$end = isset($_POST['end'])?$_POST['end']:$this->reponseFun();
			$expre = isset($_POST['expre'])?$_POST['expre']:$this->reponseFun();
			$job = isset($_POST['job'])?$_POST['job']:$this->reponseFun();
			$top = isset($_POST['top'])?$_POST['top']:$this->reponseFun();
			$dataArr = array(
				'comp'=>$comp,
				'start'=>$start,
				'end'=>$end,
				'expre'=>$expre,
				'job'=>$job,
				'top'=>$top,
			);
			$res = $this->db->insertRow($table, $dataArr);
			if($res){
				$this->data = $res;
				$this->code = 200;
				$this->msg = '数据提交成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据提交失败！';
			}
			$this->reponseFun();
		}
		//添加动态
		public function addNews(){
			$table = 'blog_news';

			$title = isset($_POST['title'])?$_POST['title']:$this->reponseFun();
			$desc = isset($_POST['desc'])?$_POST['desc']:$this->reponseFun();
			$imgurl = isset($_POST['imgurl'])?$_POST['imgurl']:'';
			$addres = isset($_POST['addres'])?$_POST['addres']:'';
			$turnurl = isset($_POST['turnurl'])?$_POST['turnurl']:'';

			$dataArr = array(
				'ndesc'=>$desc,
				'imgurl'=>$imgurl,
				'title'=>$title,
				'address'=>$addres,
				'turnUrl'=>$turnurl
			);
			$res = $this->db->insertRow($table, $dataArr);
			if($res){
				$this->data = $res;
				$this->code = 200;
				$this->msg = '数据提交成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据提交失败！';
			}
			$this->reponseFun();
		}
		//修改个人信息
		public function upInfo(){
			$table = 'blog_info';
			$id = 940819;
			$uname = isset($_POST['uname'])?$_POST['uname']:$this->reponseFun();
			$headimg = isset($_POST['headimg'])?$_POST['headimg']:$this->reponseFun();
			$birthday = isset($_POST['birthday'])?$_POST['birthday']:$this->reponseFun();
			$objective = isset($_POST['objective'])?$_POST['objective']:$this->reponseFun();
			$email = isset($_POST['email'])?$_POST['email']:$this->reponseFun();
			$degree = isset($_POST['degree'])?$_POST['degree']:$this->reponseFun();
			$profiles = isset($_POST['profiles'])?$_POST['profiles']:$this->reponseFun();

			$dataArr = array(
				'uname'=>$uname,
				'headimg'=>$headimg,
				'birthday'=>$birthday,
				'objective'=>$objective,
				'email'=>$email,
				'degree'=>$degree,
				'profiles'=>$profiles
			);
			$res = $this->db->updateRow($table, $dataArr, $id);
			if($res){
				$this->code = 200;
				$this->msg = '数据更新成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据更新失败！';
			}
			$this->reponseFun();
		}
		//修改个人经历
		public function upExpre(){
			$table = 'blog_exper';
			$id = isset($_POST['id'])?$_POST['id']:$this->reponseFun();
			$comp = isset($_POST['comp'])?$_POST['comp']:$this->reponseFun();
			$start = isset($_POST['start'])?$_POST['start']:$this->reponseFun();
			$end = isset($_POST['end'])?$_POST['end']:$this->reponseFun();
			$expre = isset($_POST['expre'])?$_POST['expre']:$this->reponseFun();
			$job = isset($_POST['job'])?$_POST['job']:$this->reponseFun();
			$top = isset($_POST['top'])?$_POST['top']:$this->reponseFun();

			$dataArr = array(
				'comp'=>$comp,
				'start'=>$start,
				'end'=>$end,
				'expre'=>$expre,
				'job'=>$job,
				'top'=>$top,
			);
			$res = $this->db->updateRow($table, $dataArr, $id);
			if($res){
				$this->code = 200;
				$this->msg = '数据更新成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据更新失败！';
			}
			$this->reponseFun();
		}
		//删除联系留言
		public function delTouch($type){
			$table = 'blog_touch';
			$id = $_POST['tid'];
			$tj ='';
			if($type==1){
				$tj = "where tid = $id";
			}else{
				$idstr = implode("','",$id);
				$tj = "where tid in ('{$idstr}')";
			}
			$res = $this->db->delRow($table, $tj);
			if($res){
				$this->code = 200;
				$this->msg = '数据删除成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据删除失败！';
			}
			$this->reponseFun();
		}
		//删除经历
		public function delExpre(){
			$table = 'blog_exper';
			$id = $_POST['id'];
			$tj = "where id = $id";
			$res = $this->db->delRow($table, $tj);
			if($res){
				$this->code = 200;
				$this->msg = '数据删除成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据删除失败！';
			}
			$this->reponseFun();
		}
		//删除动态
		public function delNews($type){
			$table = 'blog_news';
			$id = $_POST['nid'];
			$tj ='';
			if($type==1){
				$tj = "where nid = $id";
			}else{
				$idstr = implode("','",$id);
				$tj = "where nid in ('{$idstr}')";
			}
			$res = $this->db->delRow($table, $tj);
			if($res){
				$this->code = 200;
				$this->msg = '数据删除成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据删除失败！';
			}
			$this->reponseFun();
		}

		//添加定位信息
		public function addlocal()
		{
			$table = 'yue_local';
			$usernick = !empty($_POST['usernick'])?$_POST['usernick']:'游客';
			$lng = isset($_POST['lng'])?$_POST['lng']:$this->reponseFun();
			$lat = isset($_POST['lat'])?$_POST['lat']:$this->reponseFun();
			$dot = isset($_POST['dot'])?$_POST['dot']:'';
			$dataArr = array(
				'user'=>$usernick,
				'lng'=>$lng,
				'lat'=>$lat,
				'dot'=>$dot
			);

			$res = $this->db->insertRow($table, $dataArr);
			if($res){
				$this->data = $res;
				$this->code = 200;
				$this->msg = '数据提交成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据提交失败！';
			}
			$this->reponseFun();
		}

		public function reponseFun(){
			$this->response->json($this->code, $this->msg, $this->data);
		}
	}
?>