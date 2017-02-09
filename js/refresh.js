(function($){

	
	var scrollTop = 0;
	var scrollHeight = 0;
	var lstHei = $('.p5').height();//获取滑动div高度
	console.log(lstHei)
	var nowpage = 2;//当前页数
	loadMore();
    
	$('.p5').scroll(function() {
		
        scrollTop = $(this)[0].scrollTop;
        scrollHeight = $(this)[0].scrollHeight;

        if (scrollTop + lstHei >= scrollHeight) {

            loadMore();

        }//当滑动到页面最底部时调用loadMore()
    });


	function loadMore(){
		var htm = '';
		var flag = true;
		console.log('当前页数：' + nowpage);
	
		if(flag){
			flag = false;
			$.ajax({
			    url: 'index.php?mod=list&ac=rank',
			    type: 'POST',
			    data: {
				    nowpage: nowpage	
			    },
			    dataType: 'json',
			    beforeSend: function(){
	              //$('#tk-load1').show();
	         	},
			    success: function (data) {
			    	//$('#tk-load1').hide();
		        	var allpage = data.allpage;//获取总页数

					console.log('总页数：' + allpage);

					if(nowpage <= allpage){

						if(data.all.length>0){//有数据 追加数据
							
							for(var i = 0; i<data.all.length; i++){
								htm += '<li class="pr">';
								htm += '<div class="box2-img">';
								htm += '<img src="'+data.all[i].img+'" alt="" />';
								htm += '</div>';
								htm += '<div class="box2-codes pa">'+data.all[i].id+'</div>';
								htm += '<div class="box2-vote">';
								htm += '<div class="votes-num">票数 : <span>'+data.all[i].num+'</span>票 </div>';
								htm += '<div class="votes-btn">投票</div>';
								htm += '</div>';
								htm += '</li>';
							}
							nowpage++;
							$('.box2-con').append(htm);
							flag = true;
						}else{//无数据 提示
							htm += '<div style="font-size: 20px; color: #fff; line-height: 60px; text-align: center;">暂无数据</div>'

							return false;
						}
					}
			        
			    }
			})
			
		}else{
			alert('已经没有数据了！');
			return false;
		}
	}

	
})(Zepto)
