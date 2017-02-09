<?php
	header('Content-Type: text/html; charset=UTF-8');
	
	// 连接redis
	/* $redis  = new Redis();
	$redis->connect("176.10.10.231","6379");
	$redis->select(1);  */    
	  $redis  = new Redis();
	 $redis->connect("127.0.0.1","6401");
	 $redis->auth('guoxin@2016');
	 $redis->select(15);     


?>