### 一、微信接口一次性传多张图
  1.线上预览: https://open.weixin.qq.com/connect/qrconnect?appid=wx902a00f78effd864&redirect_uri=http://vcrm.dfsk.com.cn/DF_Link.aspx?tourl=http://dffg.weiyihui.com.cn/dffg_580_album/index.php?mod=weixin&response_type=code&scope=snsapi_login,snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect
  2. 传单张图的时候，我们只需传给PHP一个用户所上传图片在微信端的**serverId** ，这个**serverId**在  uploadImage 接口成功后可以得到，根据此原理，若用户传的是多张图片，我们首先定义一个全局的变量**serverIds** ，每次当uploadImage 成功后（即获取用户上传的图片的微信端的serverId）， 执行** serverIds += '||' + serverId;**，得到所有上传图片微信端的id字符串拼接，当得到所有上传的图片的serverId 后做个截取 serverIds = serverIds.substr(2)，最后再把做个代表所有上传图片serverId的字符串一次性传给PHP，具体代码如下：

```
function upImg(id, tapType) {
            //alert(4234234234);
            wx.uploadImage({
                localId: id.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的微信端ID
                    // alert('serverId:'+serverId);
                    serverIds += '||' + serverId;
                    i++;
                    if (i < len) {
                        upImg(localIds[i], tapType);
                    } else {
                        serverIds = serverIds.substr(2);
                        // alert('serverIdss:' + serverIds);
                        getImg(serverIds, tapType);
                    }
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        }
```
     
### 二、通过translateY设置滑屏、分页加载

```
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
                                            translateY:box.clientHeight -inner.offsetHeight
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
                        isEnd = true; //用户在底部往下滑屏
                    } else {
                        footer.style.opacity = 0;
                        isEnd = false; //用户在底部往上滑屏
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
```

### 三、多种动效的轮播图
       因为用户可以增删图片，所以每当请求到新的数据了，当前move对象下的swiper对象一定要执行update()更新数据
       
```
 var move = new Lunbo('.swiper-container-b');
 move.swiper.update();
 
  function Lunbo(obj) {
    this.obj = obj;
    this.inClass = ['fadeInRight', 'twisterInDown', 'lightSpeedIn', 'slideLeft', 'rotateInDownRight', 'rotateIn', 'pullUp', 'rotateInDownRight'];
    this.outClass = ['rotateOut', 'bounceOutLeft', 'rotateOutUpLeft', 'rotateOutDownRight', 'bounceOutLeft', 'fadeOutLeft', 'bounceOutLeft', 'rotateOut'];
    this.len = this.inClass.length - 1;
    //this.ran = RandomNumBoth(0, len);
    this.ran = 0;
    this.swiperBtn = true;
    this.swiper = '';
    this.swiperIndex = 0;
    this.swiperlen = $(this.obj).find('.swiper-slide').length;
    if (this.swiperBtn) {
        this.swiperBtn = false;
        this.swiper = new Swiper(this.obj, {
            spaceBetween: 0,
            noSwiping: true,
        });
    }
}

Lunbo.prototype.run = function () {

    //console.log(this.swiperIndex)
    var This = this;

    $(This.obj).addClass('delay500 ' + This.inClass[This.ran]);
    $(This.obj).on('animationend webkitAnimationEnd', function () {
        $(This.obj).removeClass('delay500 ' + This.inClass[This.ran])
        $(This.obj).addClass('zoomIn1');
        $(This.obj).on('animationend webkitAnimationEnd', function () {
            $(This.obj).removeClass('zoomIn1').addClass('zoomOut1');
            $(This.obj).on('animationend webkitAnimationEnd', function () {
                $(This.obj).removeClass('zoomOut1').addClass(This.outClass[This.ran]);
                $(This.obj).on('animationend webkitAnimationEnd', function () {
                    $(This.obj).off();
                    setTimeout(function () {
                        $(This.obj).removeClass(This.outClass[This.ran]);
                        This.ran = This.ran == This.len ? 0 : This.ran += 1;
                        This.swiperIndex = This.swiperIndex == This.swiperlen - 1 ? 0 : This.swiperIndex += 1;
                        This.swiper.slideTo(This.swiperIndex, 10, false);
                        This.run(This.obj)
                    }, 200)
                });
            });
        });
    });
```
