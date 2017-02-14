/**
 * Created by json(610330335@qq.com) .
 */
$(function () {
    //加载图
    var imgarr = ['images/bg.jpg'];
    //app初始化
    var h5 = new PageSlider({
        pages: $('.page-wrap .page'),
        dev: 0, //
        musicUrl: 'music/bg.mp3',
        baseUrl: 'http://fg.weiyihui.com.cn/dffg_580_record/'
    });
    ////默认分享
    h5.wxShare('迹录风光·100小时', '迹录风光·100小时，风光580超级公路粉丝节海南三亚风光大片等您品鉴！', '迹录风光·100小时', h5.baseUrl + 'index.html', h5.baseUrl + 'images/jsshare.jpg');
    h5._loadimg(imgarr, function () {
        setTimeout(function () {
            $('.loading').addClass('none');
           // $('.page1').removeClass('none');
            vediofunc.init(); //播放视频
        }, 500);
    });

    $('.btn_a').on('tap', function (ev) {
        ev.stopPropagation();
        h5.moveTo(1, false);
    });
    $('.btn_b').on('tap', function (ev) {
        ev.stopPropagation();  //图片列表
        $.ajax({
            url: 'index.php?ac=fotoplace',
            type: 'POST',
            data: {},
            dataType: 'json',
            beforeSend: function () {
                $('.tk-load').removeClass('none');
            },
            success: function (data) {
                $('.tk-load').addClass('none');
                var html11 = '';
                var html1 = '';
                var html2 = '';
                var html3 = '';
                var html4 = '';
                $('.swiper-container-a .swiper-wrapper').empty();
                $('.swiper-container-b .swiper-wrapper').empty();
                $('.swiper-container-c .swiper-wrapper').empty();
                $('.swiper-container-d .swiper-wrapper').empty();
                if (data.result == true) {
                    if (data.datajs) {
                        for (var i = 0; i < data.datajs.length; i++) {
                            //console.dir(data.datajs[0])
                            html11 += '<div class="swiper-slide"><img class="test" src="' + data.datajs[i].picurl + '"/></div>'
                        }
                    } else {
                        html11 += '<div class="swiper-slide">' + '暂无数据' + '</div>'
                    }
                    if (data.datast) {
                        for (var i = 0; i < data.datast.length; i++) {
                            //console.dir(data.datast[0])
                            html1 += '<div class="swiper-slide"><img class="test" src="' + data.datast[i].picurl + '"/></div>'
                        }
                    } else {
                        html1 += '<div class="swiper-slide">' + '暂无数据' + '</div>'
                    }
                    if (data.datafg) {
                        for (var j = 0; j < data.datafg.length; j++) {
                            html2 += '<div class="swiper-slide"><img class="test" src="' + data.datafg[j].picurl + '"/></div>'
                        }
                    } else {
                        html2 += '<div class="swiper-slide">' + '暂无数据' + '</div>'
                    }
                    if (data.datazx) {
                        for (var l = 0; l < data.datazx.length; l++) {
                            console.dir(data.datazx[l])
                            html3 += '<div class="swiper-slide"><img class="test" src="' + data.datazx[l].picurl + '"/></div>'
                        }

                    } else {
                        html3 += '<div class="swiper-slide">' + '暂无数据' + '</div>'
                    }
                    if (data.datafs) {
                        for (var g = 0; g < data.datafs.length; g++) {
                            html4 += '<div class="swiper-slide"><img class="test" src="' + data.datafs[g].picurl + '"/></div>'
                        }
                    } else {
                        html4 += '<div class="swiper-slide">' + '暂无数据' + '</div>'
                    }
                    $('.swiper-container-aa .swiper-wrapper').append(html11);
                    $('.swiper-container-a .swiper-wrapper').append(html1);
                    $('.swiper-container-b .swiper-wrapper').append(html2);
                    $('.swiper-container-c .swiper-wrapper').append(html3);
                    $('.swiper-container-d .swiper-wrapper').append(html4);
                    setTimeout(function () {
                        lunfunc.init();//轮播图
                    }, 300)

                    h5.moveTo(2, true);
                } else {

                }
            }
        })

    });

    $('.btn_c').on('tap', function (ev) {
        ev.stopPropagation();  //媒体列表
        $.ajax({
            url: 'index.php?ac=forum',
            type: 'POST',
            data: {},
            dataType: 'json',
            beforeSend: function () {
                $('.tk-load').removeClass('none');
            },
            success: function (data) {
                $('.tk-load').addClass('none');
                if (data.result == true) {
                    var html = '';
                    $('.media_lst').empty();
                    if (data.arr) {
                        for (var i = 0; i < data.arr.length; i++) {
                            if(i==0){
                                html += '<li class="media_wrap"><div class="headline clearfix"><img class="media_title1 fl" src="images/tit1.png"/><div class="media_title2 fl">' + data.arr[i].title + '</div></div><div class="media_box"><div class="media_txt">' + data.arr[i].content + '</div><ul class="media_info clearfix"><li class="fl">' + data.arr[i].pubdate + '</li><li class="fr"><a data-href="' + data.arr[i].url + '" class="btn_detail">查看详情</a></li></ul></div></li>';
                            }else if(i==1){
                                html += '<li class="media_wrap"><div class="headline clearfix"><img class="media_title1 fl" src="images/tit2.png"/><div class="media_title2 fl">' + data.arr[i].title + '</div></div><div class="media_box"><div class="media_txt">' + data.arr[i].content + '</div><ul class="media_info clearfix"><li class="fl">' + data.arr[i].pubdate + '</li><li class="fr"><a data-href="' + data.arr[i].url + '" class="btn_detail">查看详情</a></li></ul></div></li>';
                            }else if(i==2){
                                html += '<li class="media_wrap"><div class="headline clearfix"><img class="media_title1 fl" src="images/tit3.png"/><div class="media_title2 fl">' + data.arr[i].title + '</div></div><div class="media_box"><div class="media_txt">' + data.arr[i].content + '</div><ul class="media_info clearfix"><li class="fl">' + data.arr[i].pubdate + '</li><li class="fr"><a data-href="' + data.arr[i].url + '" class="btn_detail">查看详情</a></li></ul></div></li>';
                            }else{
                                html += '<li class="media_wrap"><div class="headline clearfix"><img class="media_title1 fl" src="images/tit.png"/><div class="media_title2 fl">' + data.arr[i].title + '</div></div><div class="media_box"><div class="media_txt">' + data.arr[i].content + '</div><ul class="media_info clearfix"><li class="fl">' + data.arr[i].pubdate + '</li><li class="fr"><a data-href="' + data.arr[i].url + '" class="btn_detail">查看详情</a></li></ul></div></li>';
                            }

                        }
                    }
                    else {
                        html += '<li class="media_wrap"><div class="headline clearfix"><img class="media_title1 fl" src="images/tit.png"/><div class="media_title2 fl">' + '暂无数据' + '</div></div><div class="media_box"><div class="media_txt">' + '暂无数据' + '</div><ul class="media_info clearfix"><li class="fl">' + '暂无数据' + '</li><li class="fr"></li></ul></div></li>';
                    }
                    $('.media_lst').append(html);
                    h5.moveTo(3, true);
                } else {

                }
            }
        })
    });
    $('.btn_d').on('tap', function (ev) {
        ev.stopPropagation();  //车主列表
        setTimeout(function () {
            $.ajax({
                url: 'index.php?ac=carer',
                type: 'POST',
                data: {},
                dataType: 'json',
                beforeSend: function () {
                    $('.tk-load').removeClass('none');
                },
                success: function (data) {
                    $('.tk-load').addClass('none');
                    if (data.result == true) {
                        var html = '';
                        $('.friend_lst').empty();
                        if (data.arr) {
                            for (var i = 0; i < data.arr.length; i++) {
                                html += '<li class="friend_wrap"><div class="headline">' + data.arr[i].title + '</div><div class="friend_box"><div class="media_txt">' + data.arr[i].content + '</div><div class="friend_bottom"><a data-href="' + data.arr[i].url + '" class="btn_detail">查看详情</a></div></div></li>';
                            }
                        } else {
                            html += '<li class="friend_wrap"><div class="headline">' + '暂无数据' + '</div><div class="friend_box"><div class="media_txt">' + '暂无数据' + '</div><div class="friend_bottom"></div></div></li>';
                        }

                        $('.friend_lst').append(html);
                        h5.moveTo(4, true);
                    } else {

                    }
                }
            })
        }, 200)


    });
    $('.btn_back').on('tap', function (ev) {
        ev.stopPropagation();
        h5.moveTo(0, true);
    });

    $('.btn_detail').live('tap', function (e) {
        var ran = Math.random();
        var href = $(this).attr('data-href');
      //  alert(href);
        setTimeout(function () {
            window.location.href = href + '?' + ran;
        }, 500)
    });

    //分享弹层
    $('.share_btn').on('tap', function (ev) {
        ev.stopPropagation();
        $('.tk_share').removeClass('none');
    });
    $(document).on('tap', function () {
        $('.tk_share').addClass('none');
    });


    //播放视频
    var vediofunc = (function () {
        var bgmusic = document.getElementById('bgmusic');

        function init() {
            $('.v_btn1').on('tap', function (ev) {
                ev.stopPropagation();
                $('.tk-video-a').removeClass("none");
                $('.tk-video-a .videos').get(0).play();
                $(".u-btn-play").addClass("zanting").removeClass('rotate');
                bgmusic.pause();
            })
            $('.v_btn2').on('tap', function (ev) {
                ev.stopPropagation();
                $('.tk-video-b').removeClass("none");
                $('.tk-video-b .videos').get(0).play();
                $(".u-btn-play").addClass("zanting").removeClass('rotate');
                bgmusic.pause();
            })
            $('.v_btn3').on('tap', function (ev) {
                ev.stopPropagation();
                $('.tk-video-c').removeClass("none");
                $('.tk-video-c .videos').get(0).play();
                $(".u-btn-play").addClass("zanting").removeClass('rotate');
                bgmusic.pause();
            })
            $('.v_btn4').on('tap', function (ev) {
                ev.stopPropagation();
                $('.tk-video-d').removeClass("none");
                $('.tk-video-d .videos').get(0).play();
                $(".u-btn-play").addClass("zanting").removeClass('rotate');
                bgmusic.pause();
            })
            // $('.v_btn5').on('tap', function (ev) {
            //     ev.stopPropagation();
            //     $('.tk-video-e').removeClass("none");
            //     $('.tk-video-e .videos').get(0).play();
            //     $(".u-btn-play").addClass("zanting").removeClass('rotate');
            //     bgmusic.pause();
            // })
            $('.tkvMsk').on('tap', function () {
                $('.tk-video').addClass('none');
                $('.tk-video-a .videos').get(0).pause();
                $('.tk-video-b .videos').get(0).pause();
                $('.tk-video-c .videos').get(0).pause();
                $('.tk-video-d .videos').get(0).pause();
                $(".u-btn-play").removeClass("zanting").addClass('rotate');
                bgmusic.play();
            })
        }

        return {
            init: init
        };
    })();

    //轮播图
    var lunfunc = (function () {
        function init() {
            var swiperaa = new Swiper('.swiper-container-aa', {
                nextButton: '.swiper-container-aa .swiper-button-next',
                prevButton: '.swiper-container-aa .swiper-button-prev',
                spaceBetween: 0,
                loop: true,
                autoplay: 1000,
                preloadImages: true,
                lazyLoading: true,
                onTouchStart: function (swiper) {
                    timer = setTimeout(function () {
                        swiperaa.stopAutoplay();
                    }, 200)
                },
                onTouchEnd: function (swiper) {
                    timer = setTimeout(function () {
                        swiperaa.startAutoplay();
                    }, 200)
                }
            });
            swiperaa.stopAutoplay();
            swiperaa.startAutoplay();
            var swipera = new Swiper('.swiper-container-a', {
                nextButton: '.swiper-container-a .swiper-button-next',
                prevButton: '.swiper-container-a .swiper-button-prev',
                spaceBetween: 0,
                loop: true,
                autoplay: 1000,
                preloadImages: true,
                lazyLoading: true,
                onTouchStart: function (swiper) {
                    timer = setTimeout(function () {
                        swipera.stopAutoplay();
                    }, 200)
                },
                onTouchEnd: function (swiper) {
                    timer = setTimeout(function () {
                        swipera.startAutoplay();
                    }, 200)
                }
            });
            swipera.stopAutoplay();
            swipera.startAutoplay();
            var swiperb = new Swiper('.swiper-container-b', {
                nextButton: '.swiper-container-b .swiper-button-next',
                prevButton: '.swiper-container-b .swiper-button-prev',
                spaceBetween: 0,
                loop: true,
                preloadImages: true,
                lazyLoading: true,
                autoplay: 1000,
                onTouchStart: function (swiper) {
                    timer = setTimeout(function () {
                        swiperb.stopAutoplay();
                    }, 200)
                },
                onTouchEnd: function (swiper) {
                    timer = setTimeout(function () {
                        swiperb.startAutoplay();
                    }, 200)
                }
            });
            swiperb.stopAutoplay();
            swiperb.startAutoplay();
            var swiperc = new Swiper('.swiper-container-c', {
                nextButton: '.swiper-container-c .swiper-button-next',
                prevButton: '.swiper-container-c .swiper-button-prev',
                spaceBetween: 0,
                loop: true,
                preloadImages: true,
                lazyLoading: true,
                autoplay: 1000,
                onTouchStart: function (swiper) {
                    timer = setTimeout(function () {
                        swiperc.stopAutoplay();
                    }, 200)
                },
                onTouchEnd: function (swiper) {
                    timer = setTimeout(function () {
                        swiperc.startAutoplay();
                    }, 200)
                }
            });
            swiperc.stopAutoplay();
            swiperc.startAutoplay();
            var swiperd = new Swiper('.swiper-container-d', {
                nextButton: '.swiper-container-d .swiper-button-next',
                prevButton: '.swiper-container-d .swiper-button-prev',
                spaceBetween: 0,
                loop: true,
                preloadImages: true,
                lazyLoading: true,
                autoplay: 1000,
                onTouchStart: function (swiper) {
                    timer = setTimeout(function () {
                        swiperd.stopAutoplay();
                    }, 200)
                },
                onTouchEnd: function (swiper) {
                    timer = setTimeout(function () {
                        swiperd.startAutoplay();
                    }, 200)
                }
            });
            swiperd.stopAutoplay();
            swiperd.startAutoplay();

        }

        return {
            init: init
        };
    })();
    /* 阻止ios默认活动*/
    // document.addEventListener('touchstart', stopSlide, false);
    // $('.btn_detail').on('touchstart', function () { //释放默认事件
    //     document.removeEventListener('touchstart', stopSlide, false);
    // }).on('touchend', function () {
    //     document.addEventListener('touchstart', stopSlide, false);
    // });
    function stopSlide(e) { //阻止页面默认行为
        var e = window.event || e;
        e.stopPropagation();
        e.preventDefault();
    };
});