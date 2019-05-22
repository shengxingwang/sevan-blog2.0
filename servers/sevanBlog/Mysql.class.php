<?php 
	class Mysql{
		protected $conn = false;
		protected $sql;

		/**
		 *($servername,$username,$password,$dbname,$port)
		 * 构造函数，负责连接服务器、选择数据库、设置字符集等
		 * @param $config string 配置数组
		 */
		public function __construct($config = array()){
			$tempConn = mysqli_connect($config['host'], $config['db_user'], $config['db_pwd'], $config['db_name'], $config['port']);
			if(!$tempConn){
				die('database connect error!');
			}
			$this->conn = $tempConn;
			$this->setChar();
		}

		/**
		*设置字符集
		*/
		public function setChar(){
			$sql = 'set names utf8';
			$this->query($sql);
		}

		public function rollback(){
			mysqli_rollback($this->conn);
		}
		public function commmit(){
			mysqli_commit($this->conn);
		}
		public function closeauto(){
			mysqli_autocommit($this->conn,false);
		}
		public function openauto(){
			mysqli_autocommit($this->conn,true);
		}
		/**
		*执行sql语句函数
		*/
		public function query($sql){
			$this->sql = $sql;
			$result = mysqli_query($this->conn, $this->sql);
			if(!$result){
				echo mysqli_error($this->conn);
				return false;
			}
			return $result;
		}

		/**
		*获取一条记录
		*/
		public function getRow($sql){
			if ($result = $this->query($sql)){
				$row = mysqli_fetch_assoc($result);
				return $row;
			}else{
				return false;
			}
		}

		/**
		*获取一页数据
		*/
		public function getOffset($table, $sql, $offset = 10, $page = 1, $order = ''){
			$sqlNum = 'select count(*) from '.$table;
			if($count = $this->query($sqlNum)){
				list($totalCount) = mysqli_fetch_row($count);
				$totalPage = ceil($totalCount/$offset);
				$selectSql = $sql.' limit '.(($page-1)*$offset).','.$offset;
				if($result = $this->query($selectSql)){
					$list = array();
					while ($row = mysqli_fetch_assoc($result)){
						$list[] = $row;
					}
					$res = array(
						'totalPage' => $totalPage,
						'page' => intval($page),
						'count' => intval($totalCount),
						'offset' => $offset,
						'list' => $list
					);
					return $res;
				}else{
					return false;
				}
			}else{
				return false;
			}
			
		}
		/**
		*获取全部数据
		*/
		public function getAll($sql){
			$result = $this->query($sql);
			if($result){
				$list = array();
				while ($row = mysqli_fetch_assoc($result)){
					$list[] = $row;
				}
				$res = $list;
				if(count($res)<=0){
					return true;
				}
				return array(
					'list' => $res
				);
			}else{
				return false;
			}
		}
		
		/**
		 * 获取上一步insert操作产生的id
		 */
		public function getInsertId(){
			return mysqli_insert_id($this->conn);
		}

		/**
		*插入数据
		*/
		public function insertRow($table, $arrData)
		{
			$keyStr = '';
			$valueStr = '';
			if(!is_array($arrData)||count($arrData)<=0){
				return false;
			}
			foreach ($arrData as $key => $value) {
				$keyStr .="{$key},";
				$valueStr .= "'$value',";
			}
			$keyStr = substr($keyStr, 0, -1);
			$valueStr = substr($valueStr, 0, -1);
			$sql = "insert into $table($keyStr) values($valueStr)";
			$result = $this->query($sql);
			if($result){
				return $this->getInsertId();
			}
			return false;
		}

		public function updateRow($table, $arrData, $tj){
			$keyValue = '';
			if(!is_array($arrData)||count($arrData)<=0){
				return false;
			}
			foreach ($arrData as $key => $value) {
				$keyValue .="$key = '$value',";
			} 
			$keyValue = substr($keyValue, 0, -1);
			$sql = "update $table set $keyValue $tj";
			$result = $this->query($sql);
			if($result){
				return 1;
			}
			return false;
		}
		/**
		*删除记录
		*/
		public function delRow($table, $tj){
			$sql = "delete from $table $tj";
			$result = $this->query($sql);
			if($result){
				return 1;
			}
			return false;
		}

	}
?>