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
    var played = '';
    var owner = '';
    h5.wxShare('《趣发现·风光美》我的风光记录', '制作专属风光相册，车主集赞还能赢取iPhone 7、iPad、现金红包！', '《趣发现·风光美》我的风光记录', h5.baseUrl + 'index.php', h5.baseUrl + 'images/jsshare.jpg');
    h5._loadimg(imgarr, function () {
        setTimeout(function () {
            $('.loading').addClass('none');
            $('.page_index').removeClass('none');
            played = $('.played').val();
            owner = $('.owner').val();
            if (played == 1) { //玩过
                $('.btn_my').removeClass('none').siblings('.btn_make').addClass('none');
                $.ajax({
                    url: 'index.php?mod=info&ac=share',
                    type: 'POST',
                    data: {},
                    dataType: 'json',
                    beforeSend: function () {
                        // $('.tk-load').removeClass('none');
                    },
                    success: function (data) {
                        // $('.tk-load').addClass('none');
                        // alert('data.shareid:' + data.shareid);
                        h5.wxShare('《趣发现·风光美》我的风光记录', '制作专属风光相册，车主集赞还能赢取iPhone 7、iPad、现金红包！', '《趣发现·风光美》我的风光记录', h5.baseUrl + 'index.php?mod=share&shareid=' + data.shareid, h5.baseUrl + 'images/jsshare.jpg');
                    }
                })
            } else {  //没玩过
                $('.btn_make').removeClass('none').siblings('.btn_my').addClass('none');
            }
            //alert("owner:"+owner);
            if (owner == 1) { //已经验证过
                $('.btn_jizan').addClass('none');
            } else { //未验证过
                $('.btn_jizan').removeClass('none');
            }
            slideBg()   //背景图动效
        }, 500);
    });
    //var sr = new StaticResoucesUtil();  //加载资源对象
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


    var serverIds = '';
    var i = 0;
    var len = 0;
    var localIds = '';
    var upnum1=0;
    var upnum2=0;
    //微信传图
    wx.ready(function () {
        var ran = Math.random().toFixed(2);
        // alert(ran)
        $('.btn_upload').on('tap', function () {
            $('.swiper-container-a .swiper-wrapper').html('');
            $('.lst_wrap .my_pic_lsts').html('');
            var upNum = 9; //最多允许传的图片数
            var tapType = 1;
            serverIds = '';
            i = 0;
            len = 0;
            localIds = '';
            $.ajax({
                url: 'index.php?ac=exceed',
                type: 'POST',
                data: {},
                dataType: 'json',
                beforeSend: function () {
                    $('.tk-load').removeClass('none');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('重新上传');
                },
                success: function (data) {
                    $('.tk-load').addClass('none');
                    if (data.result == true) {
                        selImg(upNum, tapType);
                    } else {
                        alert('一共最多上传18张图片！');
                    }
                }
            });
        })

        //新增图片
        $('.btn_add').on('tap', function () {
            var upNum = 9; //最多允许传的图片数
            var tapType = 2;
            var length = $('.my_pic_lsts>li').length;
            serverIds = '';
            i = 0;
            len = 0;
            localIds = '';
           // alert('length:'+length )
            if(length>=18){
                alert('最多上传18张图！')
            }else{
                $.ajax({
                    url: 'index.php?ac=exceed',
                    type: 'POST',
                    data: {},
                    dataType: 'json',
                    beforeSend: function () {
                        $('.tk-load').removeClass('none');
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert('重新上传');
                    },
                    success: function (data) {
                        $('.tk-load').addClass('none');
                        if (data.result == true) {
                            selImg(upNum, tapType);
                        } else {
                            alert('一共最多上传18张图片！');
                        }
                    }
                });
            }
        })

        function selImg(upNum, tapType) {
            //alert(upNum)
            var upNum = upNum;
            wx.chooseImage({
                count: upNum, // 默认9
                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有original   compressed
                sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有     album     camera
                success: function (res) {
                    //var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    // alert(res.localIds);
                    if (res.localIds.length > upNum) {
                        alert('每次最多只能上传九张图片！');
                        return;
                    }
                    // alert('res.localIds:'+res.localIds);
                    localIds = res.localIds; //本地图片ID数组
                    len = localIds.length
                    upImg(localIds[i], tapType);
                },
                error: function () {
                    alert(error.message)
                }
            });
        }

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
                       // upnum1++;
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

        //获取服务器端图片地址
        function getImg(id, tapType) {
            //alert('传给程序的ID：' + id);
            console.log('传给程序的ID：' + id);
            var id = id;
            //location.href = 'index.php?mod=index&ac=img&serverId='+id;
            $.ajax({
                url: 'index.php?mod=index&ac=img&serverId=' + id,
                type: 'POST',
                data: {
                    serverId: id
                },
                dataType: 'json',
                beforeSend: function () {
                    $('.tk-load').removeClass('none');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('重新上传');
                },
                success: function (data) {
                    $('.tk-load').addClass('none');
                    //alert('请求成功后：' + data);
                    // alert('请求成功后data.id：' + data.url);
                    //请求后台图片成功后的回调
                    if (tapType == 1) {
                        //alert('tapType:'+tapType)
                        sucOne(data.url, data.id);  //第一次上传
                    } else if (tapType == 2) {
                        // alert('tapType:'+tapType)
                        sucAdd(data.url, data.id);  //新增图片
                    }
                }
            });
        }
    });

    function sucOne(url, id) {
        var htm = '';
        var htms = '';
        $('.swiper-container-a .swiper-wrapper').html('');
        $('.btn_upload').addClass('none');
        // alert('url:'+url)

        for (var i = 0; i < url.length; i++) {
            htm += '<div class="swiper-slide"><img class="test swiper-no-swiping" data-id="' + id[i] + '" src="' + url[i] + '" alt=""/></div>';
            // alert(id[i])
            htms += '<li><img class="test" data-id="' + id[i] + '" src="' + url[i] + '" alt=""/><a href="javascript:;" class="btn_dele"></a></li>';
        }
        /* for (var j = 0; j < url.length; j++) {
         htms += '<li><img class="test" data-id="'+ id[i]+'" src="' + url[i] + '" alt=""/><a href="javascript:;" class="btn_dele"></a></li>';
         }*/
        $('.swiper-container-a .swiper-wrapper').append(htm);
        $('.swiper-container-a').removeClass('none');
        $('.page_mylst .my_pic_lsts').append(htms);


        $('.swiper-container-b .swiper-wrapper').empty();
        $('.swiper-container-b .swiper-wrapper').append(htm);
        new Lunbo('.swiper-container-a').run();
    }

    function sucAdd(url, id) {
        var htm = '';
        for (var i = 0; i < url.length; i++) {
            htm += '<li><img class="test swiper-no-swiping" data-id="' + id[i] + '" src="' + url[i] + '" alt=""/><a href="javascript:;" class="btn_dele"></a></li>';
            // alert(id[i])
        }
        $('.my_pic_lsts').prepend(htm);

    }

    function slideBg() { //背景图动效
        var swipera = new Swiper('.swiper-container-bg-a', {
            effect: 'fade',
            noSwiping: true,
            loop: true,
            autoplay: 5000
        });
        setTimeout(function () {
            var swiperb = new Swiper('.swiper-container-bg-b', {
                effect: 'fade',
                noSwiping: true,
                loop: true,
                autoplay: 5000
            });
        }, 500);
    }

    //删除相册
    $('.btn_dele').live('tap', function () {
        // alert(33)
        var This = $(this);
        var lenth = $(this).closest('.lst_wrap').find('li').length;
      //  alert('lenth:'+lenth)
        var id = This.siblings('img').attr('data-id'); //要删除的当前图片的ID
        //  alert('id:' + id)
        if(lenth==1){
            alert('请至少保留一张图片！')
        }else {
            if (confirm("确定要删除数据吗？")) {
                //alert(2)
                $.ajax({
                    url: 'index.php?mod=info&ac=delete',
                    type: 'POST',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    beforeSend: function () {
                        $('.tk-load').removeClass('none');
                    },
                    success: function (data) {
                        if (data.result == true) {
                            $('.tk-load').addClass('none');
                            This.closest('li').remove();
                            //alert('删除成功!');
                        }
                    }
                });
            }
        }
    })
    //我的相册
    $('.btn_my').on('tap', function () {
        $.ajax({
            url: 'index.php?ac=see',
            type: 'POST',
            data: {},
            dataType: 'json',
            beforeSend: function () {
                $('.tk-load').removeClass('none');
            },
            success: function (data) {
                $('.tk-load').addClass('none');
                if (data.result == true) {
                    // alert('共' + data.data.length + '条');
                    // alert('data.id:'+data.id);
                    var htm = '',
                        htms = '';
                    for (var i = 0; i < data.data.length; i++) {
                        htm += '<div class="swiper-slide"><img class="test swiper-no-swiping" data-id="' + data.id[i] + '" src="' + data.data[i] + '" alt=""/></div>';
                        // alert(id[i])
                        htms += '<li><img class="test" data-id="' + data.id[i] + '" src="' + data.data[i] + '" alt=""/><a href="javascript:;" class="btn_dele"></a></li>';
                    }
                    $('.swiper-container-c .swiper-wrapper').empty();
                    $('.swiper-container-c .swiper-wrapper').append(htm);
                    $('.my_pic_lsts').empty();
                    $('.my_pic_lsts').append(htms);

                    setTimeout(function () {
                        new Lunbo('.swiper-container-c').run();
                        h5.moveTo(5, true);
                    }, 500)

                } else {

                }
            }
        })
    })

    //创作相册
    $('.btn_list').on('tap', function () {
        var ran = Math.random();
        setTimeout(function () {
            window.location.href = "index.php?mod=zan";
        }, 200)
    })

    //创作相册
    $('.btn_make').on('tap', function () {
        h5.moveTo(2, false);
    })

    //风光集赞
    $('.btn_jizan').on('tap', function () {
       // alert('played:'+played)
        if (played == 1) { //玩过
            $('.tk_nopic').addClass('none');
        } else { //没玩过
            $('.tk_nopic').removeClass('none');
        }
        h5.moveTo(1, false);
    })

    $('.tk_nopic .sure_btn').on('tap', function () {
        $('.tk_nopic').addClass('none');
        h5.moveTo(0, false);
    })

    $('.tk_nopic .make_btn').on('tap', function () {
        $('.tk_nopic').addClass('none');
        h5.moveTo(2, false);
    })
    //编辑
    $('.btn_editor').on('tap', function () {
        h5.moveTo(3, false);
    })

    //验证提交
    $('.btn_submit').on('tap', function () {
        var username = $('.username').val();
        var phone = $('.phone').val();
        if (username == '' || username == '姓名：') {
            alert('请填写您的姓名!');
        } else if (phone == '' || phone == '电话：' || !checkMobile(phone)) {
            alert('请填写合法的手机号!');
        } else {
            $.ajax({
                url: 'index.php?ac=checkout',
                type: 'POST',
                data: {
                    username: username,
                    phone: phone
                },
                dataType: 'json',
                beforeSend: function () {
                    $('.tk-load').removeClass('none');
                },
                success: function (data) {
                    $('.tk-load').addClass('none');
                    if (data.result == true) {  //车主
                        $('.tk_info').removeClass('none');
                        $('.tk_test_fail').addClass('none');
                        $('.pic_na').html(data.album);
                        $('.pic_num').html(toZero(data.number));
                    } else {//非车主
                        if (data.error == 1) {
                            $('.tk_test_fail').removeClass('none');
                            $('.tk_info').addClass('none');
                        } else if (data.error == 2) {
                            alert('参数不全!');
                        }
                    }
                }
            })
        }
    })

//认证失败弹窗
    $('.tk_test_fail .sure_btn').on('tap', function () {
        $('.tk_test_fail').addClass('none');
    })

//你真棒 确定
    $('.tk_pic_suc .sure_btn').on('tap', function () {
        $('.tk_pic_suc').addClass('none');
        new Lunbo('.swiper-container-b').run();
        h5.moveTo(4, false);
    })
//你真棒 去集赞
    $('.tk_pic_suc .jizan_btn').on('tap', function () {
        $('.tk_pic_suc').addClass('none');
        h5.moveTo(1, false);
    })

//生成相册
    $('.btn_done').on('tap', function () {
        var val = $('.pic_name').val();
        var len = $('.swiper-container-a .swiper-slide').length; //上传成功的图片数量
        //  $('.tk_info').removeClass('none');
        // alert(len)
        if (len == 0) {
            alert('请先上传图片!')
        } else if (val == '' || val == '请输入风光相册命名：') {
            $('.tk_noname').removeClass('none');
        } else if (val.length > 10) {
            $('.tk_ten').removeClass('none');
        } else {
            //$('.tk_info').removeClass('none');
            $.ajax({
                url: 'index.php?mod=info&ac=album',   //相册名称入库
                type: 'POST',
                data: {
                    album: val
                },
                dataType: 'json',
                beforeSend: function () {
                    $('.tk-load').removeClass('none');
                },
                success: function (data) {
                    $('.tk-load').addClass('none');
                    //alert('data.shareid:'+data.shareid);
                    h5.wxShare('《趣发现·风光美》我的风光记录', '制作专属风光相册，车主集赞还能赢取iPhone 7、iPad、现金红包！', '《趣发现·风光美》我的风光记录', h5.baseUrl + 'index.php?mod=share&shareid=' + data.shareid, h5.baseUrl + 'images/jsshare.jpg');
                    $.ajax({
                        url: 'index.php?mod=info&ac=complete',
                        type: 'POST',
                        data: {},
                        dataType: 'json',
                        beforeSend: function () {
                            $('.tk-load').removeClass('none');
                        },
                        success: function (data) {
                            $('.tk-load').addClass('none');
                            $('.swiper-container-b .swiper-wrapper').empty();
                            var htm = '';
                            if (data.result == true) {

                                for (var i = 0; i < data.arr.length; i++) {
                                    htm += '<div class="swiper-slide"><img class="test swiper-no-swiping" src="' + data.arr[i].picurl + '" alt=""/></div>';
                                }
                                $('.swiper-container-b .swiper-wrapper').append(htm);
                                $('.tk_pic_suc').removeClass('none');

                            } else {
                                if (data.error == 1) {
                                    alert('非法请求!');
                                } else {
                                    alert('提交失败!');
                                }
                            }
                        }
                    })
                }
            })
        }
    })

    $('.tk_noname .sure_btn,.tk_ten .sure_btn,.tk_info .cancel_btn').on('tap', function () {
        $(this).closest('.tk').addClass('none');
    })

//留资提交
    $('.tk_info .sure_btn').on('tap', function () {
        var p = $('.pro option:selected').text();
        var c = $('.city option:selected').text();
        var a = $('.address').val();
        if (p == '' || p == '--请选择省份--') {
            alert('请选择省份！');
            return false;
        } else if (c == '' || c == '--请选择城市--') {
            alert('请填写城市！');
            return false;
        } else if (a == '') {
            alert('请填写地址！');
            return false;
        } else {
            $.ajax({
                url: 'index.php?ac=info',
                type: 'POST',
                data: {
                    province: p,
                    city: c,
                    address: a
                },
                dataType: 'json',
                beforeSend: function () {
                    $('.tk-load').removeClass('none');
                },
                success: function (data) {
                    $('.tk-load').addClass('none');
                    if (data.result == true) {
                        //alert('留资成功');
                        $('.tk_info').addClass('none');
                        setTimeout(function () {
                            window.location.href = "index.php?mod=zan";
                        }, 200)
                        // h5.moveTo(3, false);
                    } else {
                        if (data.error == 1) {
                            alert('参数不全');
                        } else if (data.error == 2) {
                            alert('提交失败');
                        }
                    }
                }
            })
        }
    })

    var move = null;
    var moveBtn = true;
//完成相册编辑
    $('.btn_over').on('tap', function () {
        var len = $('.my_pic_lsts>li').length;
        if (len == 0) {
            alert('请至少上传一张图！')
        }else if(len>=18){
            alert('最多上传18张图！')
        } else {
            $.ajax({
                url: 'index.php?mod=info&ac=complete',
                type: 'POST',
                data: {},
                dataType: 'json',
                beforeSend: function () {
                    $('.tk-load').removeClass('none');
                },
                success: function (data) {
                    $('.tk-load').addClass('none');``

                    var htm = '';
                    if (data.result == true) {
                        //  alert('data.arr.length:'+data.arr.length)
                        $('.swiper-container-b .swiper-wrapper').empty();
                        $('.swiper-container-b .swiper-wrapper').html('');
                        for (var i = 0; i < data.arr.length; i++) {
                            //alert(data.arr[i].picurl);
                            htm += '<div class="swiper-slide"><img class="test swiper-no-swiping" src="' + data.arr[i].picurl + '" alt=""/></div>';
                        }
                        $('.swiper-container-b .swiper-wrapper').append(htm);

                        if (!move) {
                            move = new Lunbo('.swiper-container-b');
                            if (moveBtn) {
                                moveBtn = false;
                                move.run();
                            }
                        } else {
                            move.swiper.update();
                           // move.swiper.destroy(false);
                            // move.swiper = new Swiper('.swiper-container-b', {
                            //     spaceBetween: 0,
                            //     noSwiping: true,
                            // });
                            move.swiperlen = data.arr.length;
                            this.swiperIndex = 0;
                            //alert('move.swiperlen:'+move.swiperlen)
                            // alert('data.arr.length:'+data.arr.length)
                        }
                        h5.moveTo(4, false);
                    } else {

                    }
                }
            })
        }

    })

    $('.page_test .btn_backs').on('tap', function (ev) {
        h5.moveTo(0, false);
    })
//返回首页按钮
    $('.page_mylst .btn_back').on('tap', function (ev) {
        // h5.moveTo(0, false);
        ev.stopPropagation();
        var ran = Math.random();
        setTimeout(function () {
            window.location.href = "index.php?" + ran;
        }, 200)
    })
//返回首页按钮
    $('.page_share .btn_backs').on('tap', function (ev) {
        ev.stopPropagation();
        var ran = Math.random();
        setTimeout(function () {
            window.location.href = "index.php?" + ran;
        }, 200)
    })

    $('.page_check .btn_backs').on('tap', function (ev) {
        // h5.moveTo(0, false);
        ev.stopPropagation();
        var ran = Math.random();
        setTimeout(function () {
            window.location.href = "index.php?" + ran;
        }, 200)
    })

//返回首页按钮
    $('.page_sure .btn_backs').on('tap', function (ev) {
        // h5.moveTo(0, false);
        ev.stopPropagation();
        var ran = Math.random();
        setTimeout(function () {
            window.location.href = "index.php?" + ran;
        }, 200)
    })

//规则弹窗
    $('.btn_rule').on('tap', function (ev) {
        ev.stopPropagation();
        $('.tk_rule').removeClass('none');
    })
//关闭弹窗
    $('.close_btn').on('tap', function (ev) {
        ev.stopPropagation();
        $(this).closest('.tk').addClass('none');
    })

    var shared = true;
//分享弹层
    $('.btn_share').on('tap', function (ev) { //点击分享按钮，请求接口 分享专属相册链接
        ev.stopPropagation();
        if (shared) {
            shared = false;
            $.ajax({
                url: 'index.php?mod=info&ac=share',
                type: 'POST',
                data: {},
                dataType: 'json',
                beforeSend: function () {
                    $('.tk-load').removeClass('none');
                },
                success: function (data) {
                    $('.tk-load').addClass('none');
                    // alert('data.shareid:' + data.shareid);
                    h5.wxShare('《趣发现·风光美》我的风光记录', '制作专属风光相册，车主集赞还能赢取iPhone 7、iPad、现金红包！', '《趣发现·风光美》我的风光记录', h5.baseUrl + 'index.php?mod=share&shareid=' + data.shareid, h5.baseUrl + 'images/jsshare.jpg');
                }
            })
        }
        $('.tk_share').removeClass('none');
    });

    $(document).on('tap', function (ev) {
        ev.stopPropagation();
        $('.tk_share').addClass('none');
    });

//再玩一次
    $('.btn_again').on('tap', function (ev) {
        ev.stopPropagation();
        var ran = Math.random();
        setTimeout(function () {
            window.location.href = "index.php?" + ran;
        }, 200)
    })

    function getJsonLength(jsonData) {
        var jsonLength = 0;
        for (var item in jsonData) {
            jsonLength++;
        }
        return jsonLength;
    }

    function RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }

    /* 阻止ios默认活动*/
    document.addEventListener('touchstart', stopSlide, false);
    $('.lst_wrap,.pic_name,.ipt3,.ipt').on('touchstart', function () { //释放默认事件
        document.removeEventListener('touchstart', stopSlide, false);
    }).on('touchend', function () {
        document.addEventListener('touchstart', stopSlide, false);
    });
    //时间补零
    function toZero(num) {
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

    function stopSlide(e) { //阻止页面默认行为
        var e = window.event || e;
        e.stopPropagation();
        e.preventDefault();
    };
    function checkMobile(s) {
        if (s.length != 11) return false;
        var partten = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15\d{9}$)|(^17\d{9}$)|(^18\d{9}$)/g;
        return partten.test(s);
    }
})
;