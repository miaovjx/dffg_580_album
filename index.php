<?php
/*
 * 首页入口文件
*/
error_reporting(0);
require_once(dirname(__FILE__)."/data/common.inc.php");

$mod = getgpc('mod');

if(!in_array($mod, array('index','weixin','share','info','zan','see'))) 
{
	$mod = 'index';
}

require_once libfile('index/'.$mod, 'module');

?>