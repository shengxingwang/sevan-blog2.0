<?php 
	header("Access-Control-Allow-Origin: *");
	header('conten-type:text/html;charset=utf-8');
	include 'BaiduBce.phar';
	require 'bosConfig.php';
	include '../resMsg.php';
	use BaiduBce\BceClientConfigOptions;
	use BaiduBce\Util\Time;
	use BaiduBce\Util\MimeTypes;
	use BaiduBce\Http\HttpHeaders;
	use BaiduBce\Services\Bos\BosClient;
	use BaiduBce\Services\Bos\BosOptions;
	use BaiduBce\Auth\SignOptions;

	global $BOS_TEST_CONFIG;
	//响应数据封装
	$response = new Response;
	//Bos客户端
	$client = new BosClient($BOS_TEST_CONFIG);
	$code = 304;
	$msg = '未知请求';
	$data = null;
	if($_FILES['file']){
		#包含了一些错误处理的方法；
		if ($_FILES['file']['error'] > 0)
		 {
		 	$code=403;
		  	$msg= 'Problem: ';
		  	switch ($_FILES['file']['error'])
		  	{
			    case 1:
					$msg = $msg.'File exceeded upload_max_filesize';
	                break;
			    case 2:
					$msg = $msg.'File exceeded max_file_size';
	            	break;
			    case 3:
					$msg = $msg.'File only partially uploaded';
	                break;
			    case 4:
					$msg = $msg.'No file uploaded';
	                break;
			    case 6:
					$msg = $msg.'Cannot upload file: No temp directory specified.';
	                break;
			    case 7:
					$msg = $msg.'Upload failed: Cannot write to disk.';
	                break;
		  	}
		  	$response->json($code, $msg, $data);
	 		exit;
		}

		$name = time().$_FILES['file']['name'];
		// echo $name;
		$filePath = $_FILES['file']['tmp_name'];
		$type = $_FILES['file']['type'];

		$bucketName =isset($_GET['bucket'])?$_GET['bucket']:die('未知请求！');

		//Bucket是否存在，若不存在创建Bucket
		$exist = $client->doesBucketExist($bucketName);
		if(!$exist){
		    $client->createBucket($bucketName);
		}
		$client->putObjectFromFile($bucketName, $name, $filePath);
		//检查文件是否存在
		try {

		    $check = $client->getObjectMetadata($bucketName, $name);

		    $code = 200;
		    $msg = 'success!';
				$data =  "http://".$bucketName.".gz.bcebos.com/".$name;
				$response->json($code, $msg, $data);

		} catch (\BaiduBce\Exception\BceBaseException $e) {
		    if ($e->getStatusCode() == 404) {
					$code = 403;
			    $msg = "upload error!";
					$response->json($code, $msg, $data);
		    }
		}
		//如果$bucket数据权限是私有的，则使用下面注释方式获取访问链接
		// $signOptions = array(
		 //        SignOptions::TIMESTAMP=>new \DateTime(),
		 //        SignOptions::EXPIRATION_IN_SECONDS=>-1,
		 //    );
		 //    $url = $client->generatePreSignedUrl($bucketName,
		 //        $name,
		 //        array(BosOptions::SIGN_OPTIONS => $signOptions)
		 //    );
		 //    echo $url;
	}else{
		$response->json($code, $msg, $data);
	}

?>