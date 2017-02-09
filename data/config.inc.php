<?php
	header('Content-Type: text/html; charset=UTF-8');
	
//  微信信息
	//$appid = "wxc7089ba9b86b1b1c";
	//$secret = "bdbd72b7c96131810a53d326a1368335";
	
	
// 连接数据库参数
	$dbhost = 'localhost';              // 数据库服务器
    $dbuser = 'root';						// 数据库用户名
    $dbpw = 'root';						// 数据库密码
    $dbname = 'dffg_580_album';			// 数据库名
	$tablepre = 'gx_';						// 数据库表前缀
    $pconnect = 0;                          // 数据库持久连接 0=关闭, 1=打开

// cookie 
	$cookiepre = '';					   // cookie 前缀
	$cookiedomain = ''; 			       // cookie 作用域
	$cookiepath = '/';			           // cookie 作用路径
	
// 编码
	$dbcharset = '';					   // MySQL 字符集, 可选 'gbk', 'big5', 'utf8', 'latin1', 留空为按照网站字符集设定
	$charset = 'utf-8';					   // 网站页面默认字符集, 可选 'gbk', 'big5', 'utf-8'


//网站配置
	$cfg_webname = '东风小康相册';
	$cfg_softname = '东风小康相册';
	$cfg_soft_enname = '东风小康相册';
	$cfg_soft_devteam = '东风小康相册';
	$adminsitecopyright = "copyright @ 东风小康相册";

?>