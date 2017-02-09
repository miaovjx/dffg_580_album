<?php /* Smarty version 2.6.26, created on 2012-03-26 07:55:06
         compiled from news_view.html */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $this->_tpl_vars['list']['title']; ?>
</title>
<link href="../../css/style.css" type="text/css" rel="stylesheet" />
<script src="../../js/jquery-1.7.1.min.js" type="text/javascript"></script>
</head>
<body class="ovh">
<script>
var url=location.search;
var Request = new Object();
if(url.indexOf("?")!=-1)
{
     var str = url.substr(1)   //去掉?号
     strs = str.split("&");
     for(var i=0;i<strs.length;i++)
     {
         Request[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
     }
}
document.write("<div class='header'>");
document.write("<div class='wrap'>");
document.write("<a class='logo fl' href='#'></a><span class='rlogo fr'></span>");
document.write("<ul class='nav lifl clearfix'>");
document.write("<li><a class='menu' href='../../"+Request["id"]+"/index.php'>首页</a></li>");
document.write("<li><a class='menu' href='../../"+Request["id"]+"/index.php?mod=show'>车型展示</a>");
document.write("<div class='slp2'>");
document.write("<ul class='tab2 fmyh fl'><li>国产车型</li><!--<li>进口车型</li>--></ul>");
document.write("<div class='pan fl'>");
document.write("<div class='box'>");
document.write("<dl>");
document.write("<dd><div class='pic'><img src='../../images/50-ely.jpg' /></div><div class='info'><h3 class='fmyh'>新爱丽舍 2012款</h3><p>厂商指导价：</p><i>RMB <span>7.38万-8.48");
document.write("万</span></i><a href='http://newelysee.com.cn/a/html/cpld_2012.html'>产品亮点</a><a ");
document.write("href='http://www.dongfeng-citroen.com.cn/citroen/jsp/VmodelParamConfigTable.jsp?CatalogID=9561'>参数配置表</a></div></dd>");
document.write("<dd><div class='pic'><img src='../../images/40-C2.jpg' /></div><div class='info'><h3 class='fmyh'>C2 2012款</h3><p>厂商指导价：</p><i>RMB <span>7.18万-8.98万");
document.write("</span></i><a href='http://www.dongfeng-citroen.com.cn/citroen/jsp/cx/xc/c2/dqwg/index.shtml'>产品亮点</a><a ");
document.write("href='http://www.dongfeng-citroen.com.cn/citroen/jsp/VmodelParamConfigTable.jsp?CatalogID=9562'>参数配置表</a></div></dd>");
document.write("<dd><div class='pic'><img src='../../images/10-C5.jpg' /></div><div class='info'><h3 class='fmyh'>C5 2012款</h3><p>厂商指导价：</p><i>RMB ");
document.write("<span>176,900-298,900</span></i><a href='http://c5.dongfeng-citroen.com.cn/#/product'>产品亮点</a><a ");
document.write("href='http://www.dongfeng-citroen.com.cn/citroen/jsp/VmodelParamConfigTable.jsp?CatalogID=9557'>参数配置表</a></div></dd>");
document.write("<dd><div class='pic'><img src='../../images/20-sj.jpg' /></div><div class='info'><h3 class='fmyh'>世嘉两厢 2012款</h3><p>厂商指导价：</p><i>RMB <span>14.78万");
document.write("-10.88万</span></i><a href='http://www.dongfeng-citroen.com.cn/citroen/jsp/cx/xc/sjlx/xdwg/index.shtml'>产品亮点</a><a ");
document.write("href='http://www.dongfeng-citroen.com.cn/citroen/jsp/VmodelParamConfigTable.jsp?CatalogID=9559'>参数配置表</a></div></dd>");
document.write("<dd><div class='pic'><img src='../../images/30-sj.jpg' /></div><div class='info'><h3 class='fmyh'>世嘉三厢 2012款</h3><p>厂商指导价：</p><i>RMB <span>14.98万");
document.write("-10.88万</span></i><a href='http://www.dongfeng-citroen.com.cn/citroen/jsp/cx/xc/sjsx/yywg/index.shtml'>产品亮点</a><a ");
document.write("href='http://www.dongfeng-citroen.com.cn/citroen/jsp/VmodelParamConfigTable.jsp?CatalogID=9560'>参数配置表</a></div></dd>");
document.write("<dd><div class='pic'><img src='../../images/60-kxu.jpg' /></div><div class='info'><h3 class='fmyh'>凯旋 2012款</h3><p>厂商指导价：</p><i>RMB <span>17.28万-14.98万");
document.write("</span></i><a href='http://www.dongfeng-citroen.com.cn/citroen/jsp/cx/xc/kx/dqwg/index.shtml'>产品亮点</a><a ");
document.write("href='http://www.dongfeng-citroen.com.cn/citroen/jsp/VmodelParamConfigTable.jsp?CatalogID=9558'>参数配置表</a></div></dd></dl></div>");
document.write("<div class='box'><dl><dd><div class='pic'><img src='../../images/15.jpg' /></div><div class='info'><h3 class='fmyh'>C5 2012款</h3><p>厂商指导价：</p><i>RMB");
document.write("<span>176,900-298,900</span></i><a href='#'>产品亮点</a><a href='#'>参数配置表</a></div></dd>");
document.write("<dd><div class='pic'><img src='../../images/15.jpg' /></div><div class='info'><h3 class='fmyh'>C5 2012款</h3><p>厂商指导价：</p><i>RMB ");
document.write("<span>176,900-298,900</span></i><a href='#'>产品亮点</a><a href='#'>参数配置表</a></div></dd>");
document.write("<dd><div class='pic'><img src='../../images/15.jpg' /></div><div class='info'><h3 class='fmyh'>C5 2012款</h3><p>厂商指导价：</p><i>RMB ");
document.write("<span>176,900-298,900</span></i><a href='#'>产品亮点</a><a href='#'>参数配置表</a></div></dd>");
document.write("<dd><div class='pic'><img src='../../images/15.jpg' /></div><div class='info'><h3 class='fmyh'>C5 2012款</h3><p>厂商指导价：</p><i>RMB ");
document.write("<span>176,900-298,900</span></i><a href='#'>产品亮点</a><a href='#'>参数配置表</a></div></dd>");
document.write("<dd><div class='pic'><img src='../../images/15.jpg' /></div><div class='info'><h3 class='fmyh'>C5 2012款</h3><p>厂商指导价：</p><i>RMB ");
document.write("<span>176,900-298,900</span></i><a href='#'>产品亮点</a><a href='#'>参数配置表</a></div></dd><dd>");
document.write("<div class='pic'><img src='../../images/15.jpg' /></div><div class='info'><h3 class='fmyh'>C5 2012款</h3><p>厂商指导价：</p><i>RMB ");
document.write("<span>176,900-298,900</span></i><a href='#'>产品亮点</a><a href='#'>参数配置表</a></div></dd></dl></div>");
document.write("</div>");
document.write("</div>");
document.write("</li>");
document.write("<li><a class='menu' href='../../"+Request["id"]+"/index.php?mod=price'>车型报价</a></li>");
document.write("<li><a class='menu' href='../../"+Request["id"]+"/index.php?mod=huodong'>市场活动</a></li>");
document.write("<li><a class='menu' href='../../"+Request["id"]+"/index.php?mod=news'>新闻动态</a></li>");
document.write("<li><a class='menu' href='../../"+Request["id"]+"/index.php?mod=jingrong'>服务专区</a><div ");
document.write("class='slp'>");
document.write("<ul class='sll lifl clearfix'>");
document.write("<li><dl><dt class='fmyh'>金融服务</dt><dd><a href='../../"+Request["id"]+"/index.php?mod=jingrong'><img src='../../images/100.jpg' /></a></dd><dd><a class='sp' ");
document.write("href='../../"+Request["id"]+"/index.php?mod=jingrong'>金融服务</a></dd></dl></li>");
document.write("<li><dl><dt class='fmyh'>预约维修保养</dt><dd><a href='../../"+Request["id"]+"/index.php?mod=baoyang'><img src='../../images/101.jpg' /></a></dd><dd><a class='sp' ");
document.write("href='../../"+Request["id"]+"/index.php?mod=baoyang'>预约维修保养</a></dd></dl></li>");
document.write("<li><dl><dt class='fmyh'>二手车服务</dt><dd><a href='http://www.citroenlongxin.com.cn/exchangecar.do' target='_blank'><img src='../../images/102.jpg' /></a></dd><dd><a class='sp' href='http://www.citroenlongxin.com.cn/exchangecar.do' target='_blank'>二手车服务</a></dd></dl></li>");
document.write("<li class='n'><dl><dt class='fmyh'>精品与附件</dt><dd><a href='http://www.dongfeng-citroen.com.cn/citroen/bwyqc/jpyfj/bjjp/index.shtml' target='_blank'><img src='../../images/103.jpg' /></a></dd><dd><a class='sp' href='http://www.dongfeng-citroen.com.cn/citroen/bwyqc/jpyfj/bjjp/index.shtml' target='_blank'>备件精品</a><a class='sp'");
document.write("href='http://www.dongfeng-citroen.com.cn/citroen/bwyqc/jpyfj/lp/index.shtml' target='_blank'>礼品</a></dd></dl></li>");
document.write("</ul></div></li>");
document.write("<li><a class='menu' ");
document.write("href='../../"+Request["id"]+"/index.php?mod=dinggou'>购车助手</a><div class='slp'>");
document.write("<ul class='sll lifl clearfix'>");
document.write("<li><dl><dt class='fmyh'>在线订车</dt><dd><a href='../../"+Request["id"]+"/index.php?mod=dinggou'><img src='../../images/104.jpg' /></a></dd><dd><a class='sp' ");
document.write("href='../../"+Request["id"]+"/index.php?mod=dinggou'>在线订车</a></dd></dl></li>");
document.write("<li><dl><dt class='fmyh'>预约试驾</dt><dd><a href='../../"+Request["id"]+"/index.php?mod=yuyue'><img src='../../images/105.jpg' /></a></dd><dd><a class='sp' href='../../"+Request["id"]+"/index.php?mod=yuyue'>预");
document.write("约试驾</a></dd></dl></li>");
document.write("<li><dl><dt class='fmyh'>型录索取</dt><dd><a href='../../"+Request["id"]+"/index.php?mod=download'><img src='../../images/106.jpg' /></a></dd><dd><a class='sp' ");
document.write("href='../../"+Request["id"]+"/index.php?mod=download'>型录索取</a></dd></dl></li>");
document.write("<li class='n'><dl><dt class='fmyh'>在线咨询</dt><dd><a href='../../"+Request["id"]+"/index.php?mod=purchase'><img src='../../images/107.jpg' /></a></dd><dd><a class='sp' ");
document.write("href='../../"+Request["id"]+"/index.php?mod=purchase'>在线咨询</a></dd></dl></li>");
document.write("</ul></div></li>");
document.write("<li><a class='menu' href='http://www.dongfeng-citroen.com.cn/citroen/jsp/download_center.jsp' target='_blank'>下载专区</a></li>");
document.write("<li><a class='menu' href='http://www.dongfeng-citroen.com.cn/club/' target='_blank'>车主俱乐部</a></li>");
document.write("</ul>");
document.write("</div>");
document.write("</div>");
document.write("<div class='main2'>");
document.write("<div class='htb'>");
document.write("<div class='wrap'>");
document.write("<ul class='brd lifl clearfix'>");
document.write("<li><a href='../../"+Request["id"]+"/index.php'>首页</a></li>");
document.write("<li>&gt;</li>");
document.write("<li><a href='../../"+Request["id"]+"/index.php?mod=news'>新闻动态</a></li>");
document.write("<li>&gt;</li>");
document.write("<li>新闻详细页</li>");
document.write("</ul>");
document.write("<h2 class='wt fl fmyh'>新闻动态</h2>");
document.write("</div>");
document.write("</div>");
</script>

	<div class="wrap">
		<div class="inner clearfix">
			<div class="lbar fl">
				<h3 class="t2 fmyh">相关新闻</h3>
					<ul class="scl fmyh">
						<?php echo $this->_tpl_vars['xgnews_view']; ?>

					</ul>
				
				<h3 class="t2 fmyh">最新活动</h3>
				<ul class="nal">
					<?php echo $this->_tpl_vars['newevent']; ?>

				</ul>
			</div>
		
			<div class="rbar fr">
				<h3 class="t2 fmyh"><?php echo $this->_tpl_vars['list']['title']; ?>
</h3>
				<div class="ndb">
				<div class="tb">
					<ul class="lifl fl">
					<li></li>
					<li></li>
					</ul>
					<i class="fr"><?php echo $this->_tpl_vars['list']['pubdate']; ?>
</i></div>
					<div class="txt">
					<?php echo $this->_tpl_vars['list']['content']; ?>

					</div>
				</div>
				</div>
			</div>
	</div>
</div>
</div>

</body>
<div style="display:none">
<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F665337b3249a67dfc978c7e6e4e77c6c' type='text/javascript'%3E%3C/script%3E"));
</script>
</div>
<script src="../../js/jquery.tools.min.js" type="text/javascript"></script>
<script src="../../js/ciads.js" type="text/javascript"></script>
<!--[if lte IE 6]><script type="text/javascript" src="js/iepng.js"></script><![endif]-->
</html>