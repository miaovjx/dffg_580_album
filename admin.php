<?php
	/*
	 * 后台管理入口文件
	 */

require_once(dirname(__FILE__)."/data/common.inc.php");
require_once(dirname(__FILE__)."/data/conn.inc.php");
require_once(dirname(__FILE__).'/data/smarty/smarty.class.php');

//实例化smarty模版
$t = new Smarty;
$t->compile_check = true;
//$smarty->debugging = true;
$t->left_delimiter = '<{';
$t->right_delimiter = '}>';
$t->template_dir="templates/default/";
$t->compile_dir="data/templates_c/";

$mod = getgpc('mod');
if(!in_array($mod, array('index', 'index_menu', 'index_top', 'index_body', 'login', 'password','order','pass','vip','category','channel','liandong','message','prize','user','album')))
{
	$mod = 'index';
}

require_once libfile('admin/'.$mod, 'module');

?>