// JavaScript Document

function left_height()
{
	//ߵĸ߶
	var height = $(window).height();
	if(height < 641)
	{
		$('.wapper_leftbg').css('height','');
	}
	else
	{
		$('.wapper_leftbg').css('height',height);
	}	
}


$(document).ready(function(){
	left_height();
	
	$('.child_div').hide();						   
	$('.ioc_19').click(function(){
		$(this).next('.child_div').toggle();		
	});		
	
	$('.child_div span').mouseover(function(){
		$(this).addClass('ioc_9');	
	}).mouseout(function(){
		$(this).removeClass('ioc_9');
		$(this).addClass('ioc_0');
		});
	
	$('.ioc_01_lm').click(function(){		
		$(this).next('.child_table').toggle();
	});
	
});
//ڷ仯ʱִ
window.onresize = function(){
	left_height();
	}