<?php 
	/**
	 * 服务响应
	 */
	class Blog
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
				case 'getArtList':
						$this->getArtList();
					break;
				case 'getArtHot':
					$this->getArtHot();
					break;
				case 'getArtDet':
					$this->getArtDet();
					break;
				case 'addArtcle':
						$this->checkToken();
						$this->addArtcle();
					break;
				case 'delArt':
					$this->delArt();
					break;
				case 'editArt':
					$this->editArt();
					break;
				case 'lookCount':
					$this->lookCount();
					break;
                case 'addNews':
					$this->checkToken();
					$this->addNews();
					break;
				case 'getNews':
					$this->getNews();
					break;
				case 'getNewsAdmin':
					$this->getNewsAdmin();
					break;
				case 'hideNews':
					$this->checkToken();
					$this->hideNews();
					break;
				case 'showNews':
					$this->checkToken();
					$this->showNews();
					break;
				case 'delNews':
					$this->checkToken();
					$this->delNews();
					break;
				case 'getTaglist':
						$this->getTaglist();
					break;
				case 'getAllTag':
					$this->getAllTag();
					break;
                case 'addTag':
					$this->checkToken();
					$this->addTag();
					break;
				case 'upTag':
					$this->checkToken();
					$this->upTag();
					break;
				case 'delTag':
					$this->checkToken();
					$this->delTag();
					break;
				case 'getDateData':
					$this->getDateData();
					break;
				case 'getTouchList':
					$this->getTouchList();
					break;
				case 'addTouch':
					$this->addTouch();
					break;
				case 'delTouch':
						$this->checkToken();
						$this->delTouch(1);
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
			  //获取头部信息end
			if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
				return;
			}
			if(!empty($_SERVER['HTTP_AUTHORIZATION'])){
				$token = $_SERVER['HTTP_AUTHORIZATION'];
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

		//添加文章
		public function addArtcle(){
			$aid = uniqid();
			$table = 'blog_list';
			$content = isset($_POST['content'])?$_POST['content']:$this->reponseFun();
			$title = isset($_POST['title'])?$_POST['title']:$this->reponseFun();
			$descript = isset($_POST['descript'])?$_POST['descript']:$this->reponseFun();
			$editContent = isset($_POST['editContent'])?$_POST['editContent']:$this->reponseFun();
			$keyword = isset($_POST['keyword'])?$_POST['keyword']:$this->reponseFun();
            $tag = isset($_POST['tag'])?$_POST['tag']:$this->reponseFun();
			$puttime = date('Y-m-d h:i:s', time());
			$dataArr = array(
				'aid'=>$aid,
				'content'=>$content,
				'title'=>$title,
				'descript'=>$descript,
				'editContent'=>$editContent,
				'keyword'=>$keyword,
                'create_at'=>$puttime
			);
			$this->db->closeauto();
			$restag = $this->inserRela($aid, $tag);
			$res = $this->db->insertRow($table, $dataArr);
			if($res&&$restag){
				$this->db->commmit();
				$this->data = $res;
				$this->code = 200;
				$this->msg = '数据提交成功！';
			}else{
				$this->db->rollback();
				$this->code = 405;
				$this->msg = '数据提交失败！';
			}
			$this->db->openauto();
			$this->reponseFun();
		}
		//添加文章标签关系表
		public function inserRela($aid, $tag, $isup=false){
			$sql = "insert into art_tag(aid,tid) ";
			for($i=0;$i<count($tag);$i++){
				if($i<1){
					$sql = $sql."values('$aid', '$tag[$i]')";
				}
				if($i>=1){
					$sql = $sql.",('$aid', '$tag[$i]')";
				}
			}
			if($isup){
				$tj = "where aid = '$aid'";
				$table = "art_tag";
				$resDel = $this->db->delRow($table, $tj);
				$res = $this->db->query($sql);
				return $resDel&&$res;
			}else{
				$res = $this->db->query($sql);
				return $res;
			}
		}
		//获取文章列表
		public function getArtList()
		{
			$page = isset($_GET['page'])?$_GET['page']:1;
			$offset = isset($_GET['offset'])?$_GET['offset']:10;
			$sql = 'select b.*, group_concat(t.tag separator "|")tag from blog_list b inner join art_tag a on b.aid = a.aid inner join blog_tag t on a.tid = t.tid group by b.aid';
			if(!empty($_GET['tid'])){
				$tid = $_GET['tid'];
				$sql = "select b.*, group_concat(t.tag separator '|')tag from blog_list b inner join art_tag a on b.aid = a.aid inner join blog_tag t on a.tid = t.tid where a.tid = '$tid' group by b.aid";
			}
			$res = $this->db->getOffset('blog_list',$sql, $offset, $page);
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
		//获取热门文章列表
		public function getArtHot()
		{
			$sql = 'select * from blog_list order by hot Desc limit 0,6';
			$res = $this->db->getAll($sql);
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
		//根据ID获取文章
		public function getArtDet()
		{
			$id = $_GET['id'];
			$sql = "select b.*, group_concat(concat_ws('-', t.tag, t.tid) separator '|')tag  from blog_list b left join art_tag a on b.aid = a.aid left join blog_tag t on a.tid = t.tid where b.aid = '$id' group by b.aid";
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
		//修改文章
		public function editArt(){
			$table = 'blog_list';
			$id = isset($_POST['id'])?$_POST['id']:$this->reponseFun();
			$content = isset($_POST['content'])?$_POST['content']:$this->reponseFun();
			$title = isset($_POST['title'])?$_POST['title']:$this->reponseFun();
			$descript = isset($_POST['descript'])?$_POST['descript']:$this->reponseFun();
			$editContent = isset($_POST['editContent'])?$_POST['editContent']:$this->reponseFun();
			$keyword = isset($_POST['keyword'])?$_POST['keyword']:$this->reponseFun();
            $tag = isset($_POST['tag'])?$_POST['tag']:$this->reponseFun();
			$dataArr = array(
				'content'=>$content,
				'title'=>$title,
				'descript'=>$descript,
				'editContent'=>$editContent,
				'keyword'=>$keyword
			);
			$this->db->closeauto();//关闭自动提交
			$restag = $this->inserRela($id, $tag, true);
			$tj = "where aid = '$id'";
			$res = $this->db->updateRow($table, $dataArr, $tj);
			if($res&&$restag){
				$this->db->commmit();//提交
				$this->code = 200;
				$this->msg = '数据更新成功！';
			}else{
				$this->db->rollback();//回滚
				$this->code = 405;
				$this->msg = '数据更新失败！';
			}
			$this->db->openauto();//打开自动提交
			$this->reponseFun();
		}
		//更新文章阅读
		public function lookCount(){
			$aid = $_GET["id"];
			$sql = "UPDATE blog_list SET hot=hot+1 WHERE aid='$aid'";
			$res = $this->db->query($sql);
		}
		//删除文章
		public function delArt(){
			$table = 'blog_list';
			$relaTable = 'art_tag';
			$id = $_POST['id'];
			$tj = "where aid = $id";
			$this->db->closeauto();//关闭自动提交
			$relaRes = $this->db->delRow($relaTable, $tj);
			$res = $this->db->delRow($table, $tj);
			if($res&&$relaRes){
				$this->db->commmit();//提交
				$this->code = 200;
				$this->msg = '数据删除成功！';
			}else{
				$this->db->rollback();//回滚
				$this->code = 405;
				$this->msg = '数据删除失败！';
			}
			$this->db->openauto();//打开自动提交
			$this->reponseFun();
		}
        //获取存在文章的标签列表
        public function getTaglist(){
			$sql = 'select b.*, count(*) as count from blog_tag b inner join art_tag a on b.tid = a.tid group by b.tid';
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
		//获取全部标签列表
        public function getAllTag(){
			$sql = 'select * from blog_tag';
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
        //添加标签
        public function addTag()
		{
			$table = 'blog_tag';
			$tid=uniqid();
			$name = isset($_POST['name'])?$_POST['name']:$this->reponseFun();
            $descript = isset($_POST['descript'])?$_POST['descript']:$this->reponseFun();
			$dataArr = array(
				'tid'=>$tid,
				'tag'=>$name,
				'descript'=>$descript
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
		//删除标签
		public function delTag(){
			$table = 'blog_tag';
			$relaTable = 'art_tag';
			$id = $_POST['id'];
			$tj = "where tid = '$id'";
			$this->db->closeauto();//关闭自动提交
			$relaRes = $this->db->delRow($relaTable, $tj);
			$res = $this->db->delRow($table, $tj);

			if($res&&$relaRes){
				$this->db->commmit();//提交
				$this->code = 200;
				$this->msg = '数据删除成功！';
			}else{
				$this->db->rollback();//回滚
				$this->code = 405;
				$this->msg = '数据删除失败！';
			}
			$this->db->openauto();//打开自动提交
			$this->reponseFun();
		}
		//修改标签
		public function upTag(){
			$table = 'blog_tag';
			$id = isset($_POST['tid'])?$_POST['tid']:$this->reponseFun();
			$name = isset($_POST['tag'])?$_POST['tag']:$this->reponseFun();
			$descript = isset($_POST['descript'])?$_POST['descript']:$this->reponseFun();
			
			$tj = "where tid = '$id'";

			$dataArr = array(
				'tag'=>$name,
				'descript'=>$descript
			);
			$res = $this->db->updateRow($table, $dataArr, $tj);
			if($res){
				$this->code = 200;
				$this->msg = '数据更新成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据更新失败！';
			}
			$this->reponseFun();
		}
		//添加动态
		public function addNews(){
			$table = 'blog_news';
			$ndesc = isset($_POST['ndesc'])?$_POST['ndesc']:$this->reponseFun();;
			$imgurl = isset($_POST['imgurl'])?$_POST['imgurl']:'';
			$turnurl = isset($_POST['turnurl'])?$_POST['turnurl']:'';

			$dataArr = array(
				'ndesc'=>$ndesc,
				'imgurl'=>$imgurl,
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
		//获取显示动态列表
		public function getNews(){
			$sql = 'select * from blog_news where isshow=1 order by ptime DESC';
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
		//获取全部动态列表
		public function getNewsAdmin(){
			$sql = 'select * from blog_news order by ptime DESC';
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
		//隐藏动态
		public function hideNews(){
			$table = 'blog_news';
			$id = isset($_POST['id'])?$_POST['id']:$this->reponseFun();
			
			$tj = "where nid = '$id'";

			$dataArr = array(
				'isshow'=>2,
			);
			$res = $this->db->updateRow($table, $dataArr, $tj);
			if($res){
				$this->code = 200;
				$this->msg = '数据更新成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据更新失败！';
			}
			$this->reponseFun();
		}
		//显示动态
		public function showNews(){
			$table = 'blog_news';
			$id = isset($_POST['id'])?$_POST['id']:$this->reponseFun();
			
			$tj = "where nid = '$id'";

			$dataArr = array(
				'isshow'=>1,
			);
			$res = $this->db->updateRow($table, $dataArr, $tj);
			if($res){
				$this->code = 200;
				$this->msg = '数据更新成功！';
			}else{
				$this->code = 405;
				$this->msg = '数据更新失败！';
			}
			$this->reponseFun();
		}
		//删除动态
		public function delNews(){
			$table = 'blog_news';
			$id = $_POST['id'];
			$tj = "where nid = '$id'";
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
		//获取归档数据
		public function getDateData(){
			$sql = "select date_format(`create_at`,'%Y/%m') as create_at, group_concat(concat_ws('-', title, aid) separator '|')title, count(*) as cnt from blog_list group by date_format(`create_at`,'%Y/%m')";
			$res = $this->db->getAll($sql);
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
		//批量删除动态
		// public function delNews($type){
		// 	$table = 'blog_news';
		// 	$id = $_POST['nid'];
		// 	$tj ='';
		// 	if($type==1){
		// 		$tj = "where nid = $id";
		// 	}else{
		// 		$idstr = implode("','",$id);
		// 		$tj = "where nid in ('{$idstr}')";
		// 	}
		// 	$res = $this->db->delRow($table, $tj);
		// 	if($res){
		// 		$this->code = 200;
		// 		$this->msg = '数据删除成功！';
		// 	}else{
		// 		$this->code = 405;
		// 		$this->msg = '数据删除失败！';
		// 	}
		// 	$this->reponseFun();
		// }

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