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
    h5.wxShare('《趣发现·风光美》我的风光记录', '东风风光车主福利，制作风光相册赢取iPhone 7、iPad、还有现金红包等你抢', '《趣发现·风光美》我的风光记录', h5.baseUrl + 'index.php', h5.baseUrl + 'images/jsshare.jpg');
    h5._loadimg(imgarr, function () {
        setTimeout(function () {
            $('.loading').addClass('none');
            setTimeout(function () {
                if ( $('.tk_exsit').length) {
                    // 没搜到
                   // alert('没搜到')
                    var ran = Math.random();
                    setTimeout(function () {
                        window.location.href = "index.php?mod=zan&" + ran;
                    }, 200)
                } else {
                    // 搜到了
                    //alert('搜到了')
                    var length = $('.zan_lst>li').length;
                    // $('.zan_lst>li').each(function (i,ele){
                    //     console.log(length)
                    //     if($(this).find('.metal').html==1){
                    //         $(this).css('background','url(../images/metal.png) no-repeat 0px 0;')
                    //     }else if($(this).find('.metal').html=2){
                    //         $(this).css('background','url(../images/metal.png) no-repeat -52px 0;')
                    //     }else if($(this).find('.metal').html=3){
                    //         $(this).css('background','url(../images/metal.png) no-repeat -104px 0;')
                    //     }else if($(this).find('.metal').html=4){
                    //         $(this).css('background','url(../images/metal.png) no-repeat -156px 0;')
                    //     }else if($(this).find('.metal').html=5){
                    //         $(this).css('background','url(../images/metal.png) no-repeat -208px 0;')
                    //     }
                    // })

                }
            }, 2000);

        }, 500);
    });
    var sr = new StaticResoucesUtil();  //加载资源对象


    //返回首页2
    $('.btn_backs').on('tap', function (ev) {
        ev.stopPropagation();
        var ran = Math.random();
        setTimeout(function () {
            window.location.href = "index.php?" + ran;
        }, 200)
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

    (function () {
        var box = document.querySelector('#box');
        var inner = document.querySelector('#inner');
        var list = document.querySelector('#list');
        var footer = inner.querySelector('footer');
        var imgPage = document.querySelector('#imgPage');
        var bigImg = document.querySelector('#bigImg');
        var lis = list.children;
        var dataImg = [];
        var length = 4;
        var start = 0;
        // var nowpage = 1;
        var isEnd = false;

        $('.test').css('opacity', 1);
        setScroll();
        function setScroll() {
            mScroll({
                el: box,
                start: function (e) {
                    //console.log("手指按下要执行的函数");
                    var innerTop = Math.round(css(inner, "translateY")) - 5;
                    var minTop = box.clientHeight - inner.offsetHeight;
                    if (minTop >= innerTop) {
                        console.log("用户是在底部进行拖拽的");
                        //footer.style.opacity = 1;
                        isEnd = true;
                    } else {
                        // footer.style.opacity = 0;
                        isEnd = false;
                    }
                },
                move: function (e) {
                    //console.log("发生滚动的时候，执行的函数")
                    // createImg();
                },
                end: function (e) {
                    //console.log("手指抬起要执行的函数");
                    var innerTop = Math.round(css(inner, "translateY")) - 5;
                    var minTop = box.clientHeight - inner.offsetHeight;
                    if (isEnd && minTop >= innerTop) {
                        console.log("可以加载更多");
                        clearInterval(inner.timer);//清除定时阻止滑屏函数回弹动画
                        //start += length;
                        document.querySelector('#scrollBar').style.opacity = 0;
                        isEnd = false;
                    } else {
                        // footer.style.opacity = 0;
                    }
                },
                over: function () {
                    //console.log("滚动结束");
                }
            });
        }
    })();
    function mScroll(init) {
        if (!init.el) {
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
        var back = document.documentElement.clientWidth / 8;
        var maxTranslate = wrap.clientHeight - inner.offsetHeight;
        scrollBar.id = "scrollBar";
        if (!init.offBar) {
            var scale = wrap.clientHeight / inner.offsetHeight;
            inner.style.minHeight = "100%";
            scrollBar.style.cssText = "width:4px;background:rgba(0,0,0,.5);position:absolute;right:0;top:0;border-radius:2px;opacity:0;transition:.3s opacity;";
            wrap.appendChild(scrollBar);
        }
        css(inner, "translateZ", 0.01);
        inner.addEventListener('touchstart', function (e) {
            maxTranslate = wrap.clientHeight - inner.offsetHeight;
            if (!init.offBar) {
                if (maxTranslate >= 0) {
                    scrollBar.style.display = "none";
                } else {
                    scrollBar.style.display = "block";
                }
                scale = wrap.clientHeight / inner.offsetHeight;
                scrollBar.style.height = wrap.clientHeight * scale + "px";
            }
            clearInterval(inner.timer);
            startPoint = e.changedTouches[0].pageY;
            startEl = css(inner, "translateY");
            lastY = startEl;
            lastTime = new Date().getTime();
            lastTimeDis = lastDis = 0;
            (init.offBar) || (scrollBar.style.opacity = 1);
            init.start && init.start.call(box, e);
        });
        inner.addEventListener('touchmove', function (e) {
            var nowTime = new Date().getTime();
            var nowPoint = e.changedTouches[0].pageY;
            var dis = nowPoint - startPoint;
            var translateY = startEl + dis;
            if (translateY > back) {
                translateY = back
            } else if (translateY < maxTranslate - back) {
                translateY = maxTranslate - back;
            }
            css(inner, "translateY", translateY);
            (init.offBar) || css(scrollBar, "translateY", -translateY * scale);
            lastDis = translateY - lastY;
            lastY = translateY;
            lastTimeDis = nowTime - lastTime;
            lastTime = nowTime;
            init.move && init.move.call(box, e);
        });
        inner.addEventListener('touchend', function (e) {
            var type = "easeOut";
            var speed = Math.round(lastDis / lastTimeDis * 10);
            speed = lastTimeDis <= 0 ? 0 : speed;
            var target = Math.round(speed * 30 + css(inner, "translateY"));
            if (target > 0) {
                target = 0;
                type = "backOut";
            } else if (target < maxTranslate) {
                target = maxTranslate;
                type = "backOut";
            }
            MTween({
                el: inner,
                target: {translateY: target},
                time: Math.round(Math.abs(target - css(inner, "translateY")) * 1.8),
                type: type,
                callBack: function () {
                    (init.offBar) || (scrollBar.style.opacity = 0);
                    init.over && init.over.call(box, e);
                },
                callIn: function () {
                    var translateY = css(inner, "translateY");
                    init.offBar || css(scrollBar, "translateY", -translateY * scale);
                    init.move && init.move.call(box, e);
                }
            });
            init.end && init.end.call(box, e);
        });
    }

    $('.zan_btn').live('tap', function (ev) {
        ev.stopPropagation();
        var This = $(this);
        var openid = $(this).closest('.pic_wrap').attr('data-openid');
        //  alert('openid:'+openid)
        $.ajax({  //请求相册列表的数据
            url: 'index.php?mod=zan&ac=hand',
            type: 'POST',
            data: {
                openid: openid
            },
            dataType: 'json',
            beforeSend: function () {
            },
            success: function (data) {
                if (data.result == true) {
                    This.addClass('active');
                    setTimeout(function () {
                        This.removeClass('active');
                    }, 500)
                    This.closest('.pic_wrap').find('.zan_num').html(data.arr.num);

                } else {
                    if (data.error == 1) {
                        alert('今日已无点赞机会！')
                    }else if(data.error == 404){
                        alert('非法请求！')
                    }
                }
            }
        })
    })
    $('.btn_check').live('tap', function (ev) {
        var openid = $(this).closest('.pic_wrap').attr('data-openid');
        console.log(openid);
        setTimeout(function () {
            window.location.href = 'index.php?mod=share&shareid=' + openid;
        }, 500);
    })

    /* 阻止ios默认活动*/
    document.addEventListener('touchstart', stopSlide, false);
    $('.search_ipt,.btn_search ').add('#form').on('touchstart', function () { //释放默认事件
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
        if (num) {
            var len = num.length
            if (len == 1) {
                return '00' + num;
            }
            else if (len == 2) {
                return '0' + num;
            } else if (len == 3) {
                return num;
            }
        }
    }
});