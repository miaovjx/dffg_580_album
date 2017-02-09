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
    var url = document.location.href;
    var pos = url.lastIndexOf("shareid=");
    var shareid='';
    var realshareid='';
    h5._loadimg(imgarr, function () {
        shareid = url.substr(pos + 8, url.length);
        //alert('shareid:'+shareid);
        var poss = shareid.indexOf("&");
        if(poss!==-1){
            realshareid=shareid.substr(0,poss);
        }else {
            realshareid=shareid;
        }
        //alert('realshareid:'+realshareid);
            setTimeout(function () {
            $('.loading').addClass('none');
            $('.page_index').removeClass('none');
            slideBg();
            $.ajax({  //请求个人专属相册的数据
                url: 'index.php?mod=share&ac=friend',
                type: 'POST',
                data: {
                    shareid:realshareid
                },
                dataType: 'json',
                beforeSend: function () {
                    $('.tk-load').removeClass('none');
                },
                success: function (data) {
                    $('.tk-load').addClass('none');
                    if (data.result == true) {
                       // alert('data.arr:'+data.arr);
                        if(data.owner==1){ //车主
                            $('.btn_zan').removeClass('none');
                        }else{ //非车主
                            $('.btn_zan').addClass('none');
                        }
                        var htm='';
                        $('.swiper-container-b .swiper-wrapper').empty();
                        for (var i = 0; i < data.arr.length; i++) {
                            htm += '<div class="swiper-slide"><img class="test swiper-no-swiping" src="' + data.arr[i].picurl + '" alt=""/></div>';
                        }
                        $('.swiper-container-b .swiper-wrapper').append(htm);
                        new Lunbo('.swiper-container-b').run();

                    } else {

                    }
                }
            })
        }, 500);
    });
    var sr = new StaticResoucesUtil();  //加载资源对象
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


    }

    function slideBg() { //背景图动效
        var swiper = new Swiper('.swiper-container-bg', {
            effect : 'fade',
            noSwiping : true,
            loop : true,
            autoplay : 5000
        });
    }
    
    $('.tk_noname .sure_btn,.tk_ten .sure_btn,.tk_info .cancel_btn').on('tap', function () {
        $(this).closest('.tk').addClass('none');
    })

    //点赞列表
    $('.btn_chk').on('tap', function () {
        var ran = Math.random();
        setTimeout(function () {
            window.location.href = "index.php?mod=zan";
        }, 200)
    })

    //返回首页
    $('.btn_maker').on('tap', function () {
        var ran = Math.random();
        setTimeout(function () {
            window.location.href = "index.php?"+ran;
        }, 200)
    })



    // 赞一个
    $('.btn_zan').on('tap', function (ev) {
        //alert('shareid:'+shareid);
        $.ajax({  //请求个人专属相册的数据
            url: 'index.php?mod=share&ac=support',
            type: 'POST',
            data: {
                shareid:shareid
            },
            dataType: 'json',
            beforeSend: function () {
                $('.tk-load').removeClass('none');
            },
            success: function (data) {
                $('.tk-load').addClass('none');
                if (data.result == true) {
                    $('.goodBig').removeClass('none').addClass('fadeInUp');
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
    $('.goodBig').on('animationend webkitAnimationEnd',function(){
        $('.goodBig').removeClass('fadeInUp').addClass('none');
    });

    //再玩一次
    $('.btn_again').on('tap', function (ev) {
        ev.stopPropagation();
        var ran = Math.random();
        setTimeout(function () {
            window.location.href = "index.html?" + ran;
        }, 200)
    });
    
    /* 阻止ios默认活动*/
    document.addEventListener('touchstart', stopSlide, false);
    $('.my_pic_lsts').on('touchstart', function () { //释放默认事件
        document.removeEventListener('touchstart', stopSlide, false);
    }).on('touchend', function () {
        document.addEventListener('touchstart', stopSlide, false);
    });
    function RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }
    function stopSlide(e) { //阻止页面默认行为
        var e = window.event || e;
        e.stopPropagation();
        e.preventDefault();
    };

});