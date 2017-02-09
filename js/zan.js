/**
 * Created by json(610330335@qq.com) on 2016/9/6 .
 */
$(function () {
    //加载图片
    var imgarr = ['images/bg1.jpg'];
    //app初始化
    var h5 = new PageSlider({
        pages: $('.page-wrap .page'),
        dev: 0,
         musicUrl: 'music/bg.mp3',
        baseUrl: 'http://dffg.weiyihui.com.cn/dffg_580_album/'
    });
    ////默认分享
    h5.wxShare('《趣发现·风光美》我的风光记录', '制作专属风光相册，车主集赞还能赢取iPhone 7、iPad、现金红包！', '《趣发现·风光美》我的风光记录', h5.baseUrl + 'index.php', h5.baseUrl + 'images/jsshare.jpg');
    h5._loadimg(imgarr, function () {
        setTimeout(function () {
            $('.loading').addClass('none');
        }, 500);
    });
    var sr = new StaticResoucesUtil();  //加载资源对象

    $('.tk_noname .sure_btn,.tk_ten .sure_btn,.tk_info .cancel_btn').on('tap', function () {
        $(this).closest('.tk').addClass('none');
    })

    $('.zan_btn').live('tap', function (ev) {
        ev.stopPropagation();
        var This = $(this);
        var openid = $(this).closest('.pic_wrap').attr('data-openid');
      //  alert('openid:'+openid)
        $.ajax({  //请求相册列表的数据
            url: 'index.php?mod=zan&ac=hand',
            type: 'POST',
            data: {
                openid : openid
            },
            dataType: 'json',
            beforeSend: function () {
            },
            success: function (data) {
                if (data.result == true) {
                    This.addClass('active');
                    setTimeout(function (){
                        This.removeClass('active');
                    },500)
                    This.closest('.pic_wrap').find('.zan_num').html(data.arr.num);

                } else {
                    if(data.error==1){
                        alert('今日已无点赞机会！')
                    }else if(data.error == 404){
                        alert('非法请求！')
                    }
                }
            }
        })
    })

    //返回首页2
    $('.btn_backs').on('tap', function (ev) {
        ev.stopPropagation();
        var ran = Math.random();
        setTimeout(function () {
            window.location.href = "index.php?" + ran;
        }, 200)
    })

    $('.tk_exsit').on('tap', function (ev) {
        ev.stopPropagation();
        $(this).addClass('none');
    })

    //规则弹窗
    $('.btn_rules').on('tap', function (ev) {
        ev.stopPropagation();
        $('.tk_rule').removeClass('none');
    });
    //关闭弹窗
    $('.close_btn').on('tap', function (ev) {
        ev.stopPropagation();
        $(this).closest('.tk').addClass('none');
    });



    (function(){
        var box = document.querySelector('#box');
        var inner = document.querySelector('#inner');
        var list = document.querySelector('#list');
        var footer = inner.querySelector('footer');
        var imgPage = document.querySelector('#imgPage');
        var bigImg = document.querySelector('#bigImg');
        var lis = list.children;
        var dataImg = [];
        var length = 8;
        var start = 0;
       // var nowpage = 1;
        var isEnd = false;
        for(var i = 0; i < 26; i++){
            //dataImg.push("images/"+(i%26+1)+".jpg");
        }

       setScroll();
       createLi();

        /* createLi 请求数据 加载li */
        function createLi(){
            // if(start >= dataImg.length){
            //     //alert("对不起没有更多图片了");
            //     footer.innerHTML = "对不起没有更多相册了!";
            //     setTimeout(function(){
            //         footer.style.opacity = 0;
            //         MTween({
            //             el:inner,
            //             target:{
            //                 translateY:box.clientHeight -inner.offsetHeight
            //             },
            //             time:300,
            //             type:"easeBoth"
            //         });
            //     },1000);
            //     return;
            // }

            var nowpage =  parseInt(start/length)+1; //当前页数，8个一页
            console.log('start:'+start)
            console.log('nowpage:'+nowpage);
            
            $.ajax({  //请求相册列表的数据
                url: 'index.php?mod=zan&ac=pulldown',
                type: 'POST',
                data: {
                    nowpage : nowpage
                },
                dataType: 'json',
                beforeSend: function () {
                },
                success: function (data) {
                    if (data.result == true) {
                       // alert(data.arr);
                        if(data.arr){
                          //  end = end > data.arr.length?data.arr.length:end;
                            for(var i = 0; i < data.arr.length; i++){
                                var li = document.createElement("li");
                                li.className= 'li';
                                li.innerHTML='<div class="metal metal_five"></div><div class="pic_wrap" data-openid="'+ data.arr[i].openid+'"><ul class="pic_bom"><li class="clearfix"><div class="col1 fl"><div class="tx_wrap"><img class="tx" src="'+data.arr[i].headimgurl +'" alt=""/></div><span class="name">'+data.arr[i].nickname+'</span></div><div class="col2 fr"><a href="javascript:;" class="btn_check">查看</a></div></li><li class="clearfix"><div class="col1 fl"><span class="picture_name">'+ data.arr[i].album+'</span></div><div class="col2 fr"><span class="zans"><span class="zan_num">'+ data.arr[i].num +'</span>赞</span></div></li><li class="clearfix"><div class="col1 fl"><span class="xuhao">'+ toZero(data.arr[i].number)+'</span></div><div class="col2 fr"><a href="javascript:;" class="zan_btn "></a></div></li></ul></div>'
                                li.src = data.arr[i].url.picurl;
                                li.isLoad = true;
                                li.addEventListener('touchstart', function(e) {
                                    this.querySelector('.btn_check').isMove = false;
                                });
                                li.addEventListener('touchmove', function(e) {
                                    this.querySelector('.btn_check').isMove = true;
                                });
                                li.querySelector('.btn_check').addEventListener('touchend', function(e) {
                                    console.log(this.isMove);
                                    if(this.isMove) {
                                        return;
                                    }
                                    var openid = $(this).closest('.pic_wrap').attr('data-openid');
                                   console.log(openid);
                                        setTimeout(function(){
                                            window.location.href='index.php?mod=share&shareid='+openid;
                                        },500);
                                });
                                list.appendChild(li);
                            }
                            createImg();
                            footer.style.opacity = 0;
                            start+=length;
                            console.log('start:'+start)
                            var liLen =  $('.zan_lst>li').length;
                           // console.log('liLen:'+liLen)
                            if(liLen>5){
                                $('.zan_lst>li').each(function(index,ele){
                                 //   console.log(index)
                                    if(index>4){
                                        //console.log(index)
                                        $(this).find('.metal').html(index+1);
                                    }
                                })
                            }

                        }else {
                                footer.innerHTML = "对不起没有更多相册了!";
                                setTimeout(function(){
                                    footer.style.opacity = 0;
                                    MTween({
                                        el:inner,
                                        target:{
                                            translateY:box.clientHeight -inner.offsetHeight+50
                                        },
                                        time:300,
                                        type:"easeBoth"
                                    });
                                },1000);
                                return;
                        }

                    } else {

                    }
                }
            })
        }
        /* 判断是否该创建图片 */
        function createImg(){
            var boxRect = box.getBoundingClientRect();
            var bottom = boxRect.top + boxRect.height;
            for(var i = 0; i < lis.length; i++){
                var top = lis[i].getBoundingClientRect().top;//li相对可视区的top值
                if(top < bottom && lis[i].isLoad){//当前li进入可视区
                    lis[i].isLoad = false;
                    showImg(lis[i]);
                }
            }
        }
        /* 创建图片并显示 */
        function showImg(li){
            var img = new Image();
            img.src = li.src;
            img.onload = function(){
                li.querySelector('.pic_wrap').appendChild(img);
                /* 元素没有渲染完成，transition不起作用*/
                setTimeout(function(){
                    img.style.opacity = 1;
                },100);
            }
        }
        function setScroll(){
            mScroll({
                el:box,
                start:function(e){
                    //console.log("手指按下要执行的函数");
                    var innerTop = Math.round(css(inner,"translateY"))-5;
                    var minTop = box.clientHeight - inner.offsetHeight;
                    if(minTop >= innerTop ){
                        console.log("用户是在底部进行拖拽的");
                        footer.style.opacity = 1;
                        isEnd = true;
                    } else {
                        footer.style.opacity = 0;
                        isEnd = false;
                    }
                },
                move:function(e){
                    //console.log("发生滚动的时候，执行的函数")
                    createImg();
                },
                end:function(e){
                    //console.log("手指抬起要执行的函数");
                    var innerTop = Math.round(css(inner,"translateY")) - 5;
                    var minTop = box.clientHeight - inner.offsetHeight;
                    if(isEnd&&minTop >= innerTop){
                        console.log("可以加载更多");
                        clearInterval(inner.timer);//清除定时阻止滑屏函数回弹动画
                        //start += length;
                        createLi();
                        document.querySelector('#scrollBar').style.opacity = 0;
                        isEnd = false;
                    }else {
                        footer.style.opacity = 0;
                    }
                },
                over:function(){
                    //console.log("滚动结束");
                }
            });
        }
    })();
    function mScroll(init){
        if(!init.el){
            return;
        }
        var wrap = init.el;
        var inner = init.el.children[0];
        var scrollBar = document.createElement("div");
        var startPoint = 0;
        var startEl = 0;
        var lastY = 0;
        var lastDis = 0;
        var lastTime = 0;
        var lastTimeDis = 0;
        var back = document.documentElement.clientWidth/8;
        var maxTranslate = wrap.clientHeight - inner.offsetHeight;
        scrollBar.id = "scrollBar";
        if(!init.offBar){
            var scale = wrap.clientHeight/inner.offsetHeight;
            inner.style.minHeight = "100%";
            scrollBar.style.cssText = "width:4px;background:rgba(0,0,0,.5);position:absolute;right:0;top:0;border-radius:2px;opacity:0;transition:.3s opacity;";
            wrap.appendChild(scrollBar);
        }
        css(inner,"translateZ",0.01);
        inner.addEventListener('touchstart', function(e) {
            maxTranslate = wrap.clientHeight - inner.offsetHeight;
            if(!init.offBar){
                if(maxTranslate >= 0) {
                    scrollBar.style.display = "none";
                } else {
                    scrollBar.style.display = "block";
                }
                scale = wrap.clientHeight/inner.offsetHeight;
                scrollBar.style.height = wrap.clientHeight * scale + "px";
            }
            clearInterval(inner.timer);
            startPoint = e.changedTouches[0].pageY;
            startEl = css(inner,"translateY");
            lastY = startEl;
            lastTime = new Date().getTime();
            lastTimeDis = lastDis = 0;
            (init.offBar)||(scrollBar.style.opacity = 1);
            init.start&&init.start.call(box,e);
        });
        inner.addEventListener('touchmove', function(e) {
            var nowTime = new Date().getTime();
            var nowPoint = e.changedTouches[0].pageY;
            var dis = nowPoint - startPoint;
            var translateY = startEl + dis;
            if(translateY > back){
                translateY = back
            } else if(translateY < maxTranslate -back){
                translateY = maxTranslate - back;
            }
            css(inner,"translateY",translateY);
            (init.offBar)||css(scrollBar,"translateY",-translateY*scale);
            lastDis = translateY - lastY;
            lastY = translateY;
            lastTimeDis = nowTime - lastTime;
            lastTime = nowTime;
            init.move&&init.move.call(box,e);
        });
        inner.addEventListener('touchend', function(e) {
            var type = "easeOut";
            var speed = Math.round(lastDis / lastTimeDis*10);
            speed = lastTimeDis <= 0?0 :speed;
            var target = Math.round(speed*30 + css(inner,"translateY"));
            if(target > 0){
                target = 0;
                type = "backOut";
            } else if(target < maxTranslate){
                target = maxTranslate;
                type = "backOut";
            }
            MTween({
                el:inner,
                target: {translateY:target},
                time: Math.round(Math.abs(target - css(inner,"translateY"))*1.8),
                type: type,
                callBack: function(){
                    (init.offBar) || (scrollBar.style.opacity = 0);
                    init.over&&init.over.call(box,e);
                },
                callIn: function(){
                    var translateY = css(inner,"translateY");
                    init.offBar||css(scrollBar,"translateY",-translateY*scale);
                    init.move&&init.move.call(box,e);
                }
            });
            init.end&&init.end.call(box,e);
        });
    }


    /* 阻止ios默认活动*/
    document.addEventListener('touchstart', stopSlide, false);
    $('.search_ipt,.btn_search').add('#form').on('touchstart', function () { //释放默认事件
        document.removeEventListener('touchstart', stopSlide, false);
    }).on('touchend', function () {
        document.addEventListener('touchstart', stopSlide, false);
    });

    function stopSlide(e) { //阻止页面默认行为
        var e = window.event || e;
        e.stopPropagation();
        e.preventDefault();
    };
    //时间补零
    function toZero(num) {
        if(num){
            var len = num.length
            if (len == 1) {
                return '00' + num;
            }
            else if (len == 2) {
                return '0' + num;
            } else if (len == 3) {
                return  num;
            }
        }

    }
});