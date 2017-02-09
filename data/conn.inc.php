<?php
/*
 *   初始化 数据连接 
*/

isset($db)?$db->close():'';
$db = new dbstuff;
$db->connect($dbhost, $dbuser, $dbpw, $dbname, $pconnect);
$cfg["dbuser"] = $cfg["dbpw"] = $cfg["dbname"] = $cfg["pconnect"] = NULL; 

?>