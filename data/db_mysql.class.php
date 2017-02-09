<?php
class dbstuff {
	var $querynum = 0;
	var $link;

	//连接数据库
	function connect($dbhost, $dbuser, $dbpw, $dbname = '', $pconnect = 0, $halt = TRUE) {
		if($pconnect) {
			if(!$this->link = @mysql_pconnect($dbhost, $dbuser, $dbpw)) {
				$halt && $this->halt('Can not connect to MySQL server');
			}
		} else {
			if(!$this->link = @mysql_connect($dbhost, $dbuser, $dbpw, 1)) {
				$halt && $this->halt('Can not connect to MySQL server');
			}
		}

		if($this->version() > '4.1') {
			global $charset, $dbcharset;
			if(!$dbcharset && in_array(strtolower($charset), array('gbk', 'big5', 'utf-8'))) {
				$dbcharset = str_replace('-', '', $charset);
			}

			if($dbcharset) {
				@mysql_query("SET character_set_connection=$dbcharset, character_set_results=$dbcharset, 

character_set_client=binary", $this->link);
			}

			if($this->version() > '5.0.1') {
				@mysql_query("SET sql_mode=''", $this->link);
			}
		}

		if($dbname) {
			@mysql_select_db($dbname, $this->link);
		}

	}

    //选择数据库
	function select_db($dbname) {
		return mysql_select_db($dbname, $this->link);
	}

    //从结果集中取得一行作为关联数组，或数字数组，或二者兼有 提取一行记录
	function fetch_array($query, $result_type = MYSQL_ASSOC) {
		return mysql_fetch_array($query, $result_type);
	}
    
	//执行语句
	function query($sql, $type = '') {
		global $debug, $discuz_starttime, $sqldebug, $sqlspenttimes;

		$func = $type == 'UNBUFFERED' && @function_exists('mysql_unbuffered_query') ?
			'mysql_unbuffered_query' : 'mysql_query';
		if(!($query = $func($sql, $this->link))) {
			if(in_array($this->errno(), array(2006, 2013)) && substr($type, 0, 5) != 'RETRY') {
				$this->close();
				require DISCUZ_ROOT.'./config.inc.php';
				$this->connect($dbhost, $dbuser, $dbpw, $dbname, $pconnect);
				$this->query($sql, 'RETRY'.$type);
			} elseif($type != 'SILENT' && substr($type, 5) != 'SILENT') {
				$this->halt('MySQL Query Error', $sql);
			}
		}

		$this->querynum++;
		return $query;
	}

    //查询记录数
	function affected_rows() {
		return mysql_affected_rows($this->link);
	}
    
	//返回上一个 MySQL 操作产生的文本错误信息
	function error() {
		return (($this->link) ? mysql_error($this->link) : mysql_error());
	}
    
	//返回上一个 MySQL 操作中的错误信息的数字编码
	function errno() {
		return intval(($this->link) ? mysql_errno($this->link) : mysql_errno());
	}
    
	//取得结果数据
	function result($query, $row) {
		$query = @mysql_result($query, $row);
		return $query;
	}

    //取得结果集中行的数目
	function num_rows($query) {
		$query = mysql_num_rows($query);
		return $query;
	}
    
	//取得结果集中字段的数目
	function num_fields($query) {
		return mysql_num_fields($query);
	}
    
	//释放结果内存
	function free_result($query) {
		return mysql_free_result($query);
	}

    //新插入记录的ID
	function insert_id() {
		return ($id = mysql_insert_id($this->link)) >= 0 ? $id : $this->result($this->query("SELECT 

last_insert_id()"), 0);
	}

    //从结果集中取得一行作为枚举数组
	function fetch_row($query) {
		$query = mysql_fetch_row($query);
		return $query;
	}

    //从结果集中取得列信息并作为对象返回
	function fetch_fields($query) {
		return mysql_fetch_field($query);
	}

	function version() {
		return mysql_get_server_info($this->link);
	}

	function close() {
		return mysql_close($this->link);
	}

	function halt($message = '', $sql = '') {

		define('CACHE_FORBIDDEN', TRUE);
		require_once(dirname(__FILE__)."/db_mysql_error.inc.php");
	}

	//查询多条记录集
    function getAll($sql)
    {
        $res = $this->query($sql);
        if ($res !== false)
        {
            $arr = array();
            while ($row = mysql_fetch_assoc($res))
            {
                $arr[] = $row;
            }

            return $arr;
        }
        else
        {
            return false;
        }
    }

	// 查询单条记录

	function getOne($sql, $limited = false)
    {
        if ($limited == true)
        {
            $sql = trim($sql . ' LIMIT 1');
        }

        $res = $this->query($sql);
        if ($res !== false)
        {
            $row = mysql_fetch_row($res);

            if ($row !== false)
            {
                return $row[0];
            }
            else
            {
                return '';
            }
        }
        else
        {
            return false;
        }
    }
}

?>