;(function ($, window) {

    //默认参数
    var defaults = {
        direction: 'vertical',    //滚动方向：vertical/horizontal
        currentClass: 'current',  //当前 className
        gestureFollowing: false,  //是否需要手势跟随
        hasDot: false,            //是否生成标识点
        rememberLastVisited: false,
        preventDefault: true,
        animationPlayOnce: false,
        dev: false,               //开发模式，传入数值，直接跳到正在开发的屏数
        musicUrl: false,          //是否需要背景音乐
        shareUrl: 'https://yidian.weiyihui.com.cn/weixinshare/index.php', //默认分享方式
        baseUrl: '',      
        onSwipeUp: function () {  //swipeUp 回调
        },
        checkMobile: function(s) { //正则匹配手机号
			if (s.length != 11) return false;
			var partten = /^0?1(3|4|5|7|8|9)\d{9}$/;
			var dx = /^1[3578][01379]\d{8}$/g;
		    var lt = /^1[34578][01256]\d{8}$/g;
		    var yd = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g;
			return partten.test(s);
		},		
        onSwipeDown: function () {//swipeDown 回调
        },
        onSwipeLeft: function () {//swipeLeft 回调
        },
        onSwipeRight: function () {//swipeRight 回调
        },
        oninit: function () {     //初始化完成时的回调
        },
        onbeforechange: function () {  //开始切换前的回调
          
        },
        onchange: function () {   //每一屏切换完成时的回调
             var index = this.index + 1;
             var This = this;
             var viewHeight= $(window).height();
             if (index == 1) {

             } else if (index == 10) {
                 $('.redwindow').animate({height:viewHeight},5000,function (){
                    $('.p10_1').removeClass('none').addClass('zoomIn');
                     $('.p10_1').on('animationend webkitAnimationEnd',function(){
                          
                          setTimeout(function (){
                            $('.p10_1').addClass('none');
                            $('.p10_2 ').animate({top:0},4000,function (){
                                $('.share_btn').removeClass('none');
                                 $('.p10_3 ').addClass('tada');
                                $('.p10_4 ').addClass('wobble');
                            });
                          },2000)                        
                     });
                 });
             }
        }
    };

    //一些辅助全局变量
    var pageWidth = document.documentElement.clientWidth,
        pageHeight = document.documentElement.clientHeight,
        hei = window.screen.height,
        lockNext,
        lockPrev,
        state,
        startPos,
        isGestureFollowing,
        offset,
        pageScrollTop;

    function PageSlider(options) {
        $.extend(this, defaults, options);

        if (this.pages.length <= 0) {
            throw new Error('target para not pass');
        }

        this.target = this.pages.eq(0).parent();
        this.length = this.pages.length;
        this.moveTo = PageSlider.prototype.moveTo;
        this.index = 0;
        this.curPage = this.pages.eq(this.index);
        this.timer = null;

        isGestureFollowing = this.gestureFollowing;

        if (this.direction === 'vertical' || this.direction === 'v') {
            this.direction = 'v';
        }

        if (this.direction === 'horizontal' || this.direction === 'h') {
            this.direction = 'h';
        }

       if (this.length < 1) return;

        this._init();
    }

    PageSlider.prototype = {
        _init: function () {

            var self = this;
       
            //初始化CSS动画，好让滑动有缓动效果
            this.target.css('-webkit-transition', '-webkit-transform 0.5s ease');

            //如果是长页面
            this.pages.each(function () {
                var $this = $(this),
                    $PageSliderWraper = $this.wrapInner('<div class="PageSlider__wraper"></div>').find('.PageSlider__wraper'),
                    height = $PageSliderWraper.height();

                //console.log('height:' + height);
                //console.log('pageHeight:' + pageHeight);

                //当子元素高度超过页面时，需滚完再切换
                if (height > pageHeight) {
                    $this.data('height', height);
                    $this.css('overflow', 'auto');
                }

                //再清除辅助层
                $PageSliderWraper.children().unwrap();
            });

            //如果是横向滚动
            if (this.direction === 'h') {
                this.target.css('position', 'relative');
                this.pages.each(function (index) {
                    $(this).css({
                        position: 'absolute',
                        left: index * 100 + '%',
                        top: 0
                    });
                });
            }

            //如果需要生成屏标识
            if (this.hasDot) {
                this._createDot();
            }

            //绑定动态动画效果
            self._bindAnimation();

            this.target.on('touchstart', function (e) {
                self._startHandle(e);
            });

            this.target.on('touchmove', function (e) {
                self._moveHandle(e);
            });

            this.target.on('touchend', function (e) {
                self._endHandle(e);
            });

            //如果需要记住上次访问的屏索引
            if (this.rememberLastVisited) {
                this.lastVisitedIndex = this._getLastVisited();
            }

            this.target.css('-webkit-transform', 'translate(0, 0)');
            this.pages.eq(0).addClass(this.currentClass);

            this.oninit.call(this);

            //调用开发
            this._dev();

            //调用横竖屏
            this._orientationTip();

            //默认开启微信验证
            this._initWeixin(this.shareUrl);

            //默认开启
            this._bgMusic();
            
            this.smallScreen();
            //默认开启预加载
            //this._loadimg();
        },
         smallScreen: function(){
			if (hei < 568) {
				//alert(1)
				//$('head').append('<link rel="stylesheet" href="css/b-small.css" />');
			}
		},
        _startHandle: function (e) {
            var touch =e.changedTouches[0];

            //如果动画在执行中则不予以操作
            if (state === 'running') {
                e.preventDefault();
                return;
            }

            startPos = this.direction === 'v' ? touch.clientY : touch.clientX;

            //是否禁止滑屏参数获取
            lockNext = this.curPage.data('lock-next');
            lockPrev = this.curPage.data('lock-prev');

            //是否是长页面
            this.curPage[0].pageScrollHeight = this.curPage.data('height');
            if (this.curPage[0].pageScrollHeight) {
                isGestureFollowing && (this.gestureFollowing = false);
                this.preventDefault = false;
                pageScrollTop = pageHeight + this.curPage.scrollTop();
            }

            //手势跟随判断
            if (this.gestureFollowing) {
                //获取当前的位置值
                offset = -this.index * (this.direction === 'v' ? pageHeight : pageWidth);
            }
        },

        _moveHandle: function (e) {
            var touch = e.changedTouches[0],
                distance,
                endPos;

            //如果动画在执行中则不予以操作
            if (state === 'running') {
                e.preventDefault();
                return;
            }

            endPos = this.direction === 'v' ? touch.clientY : touch.clientX;
            distance = endPos - startPos;

            //如果存在长页面，需多判断一下，以阻止默认行为
            if (this.curPage[0].pageScrollHeight) {
                if (distance > 0 && pageScrollTop === pageHeight) e.preventDefault();

                if (distance < 0 && pageScrollTop === this.curPage[0].pageScrollHeight) e.preventDefault();
            }

            //如果不需要手势跟随，直接返回
            if (!this.gestureFollowing) {
                this._preventDefault(e);
                return;
            }

            //下面是在有手势跟随时的一些情况
            //1. 如果在第一屏或最后一屏，直接返回
            if ((this.index <= 0 && endPos > startPos) || (this.index >= this.length - 1 && endPos < startPos)) {
                e.preventDefault();
                return;
            }

            //2. 如果向上或向下被禁止，直接返回
            if ((distance > 0 && lockPrev) || distance < 0 && lockNext) {
                e.preventDefault();
                return;
            }

            //3. 没有特殊情况，需要手势跟随了，则
            distance = offset + distance + 'px';

            //移除动画缓动
            this._removeTransition();

            if (this.direction === 'v') {
                this.target.css('-webkit-transform', 'translate(0, ' + distance + ')');
            } else {
                this.target.css('-webkit-transform', 'translate(' + distance + ', 0)');
            }


            this._preventDefault(e);
        },

        _endHandle: function (e) {
            var touch = e.changedTouches[0] ,
                distance,
                endPos;

            //如果动画在执行中则不予以操作
            if (state === 'running') {
                e.preventDefault();
                return;
            }

            endPos = this.direction === 'v' ? touch.clientY : touch.clientX;
            distance = endPos - startPos;


            //设置动画缓动
            this._setTransition();

            //swipeDown
            if (distance > 0) {
                this.direction === 'v' ? this.onSwipeDown.call(this) : this.onSwipeRight.call(this);

                if (!lockPrev) {
                    //如果是长页面，需判断一下是否到顶
                    if (this.curPage[0].pageScrollHeight && pageScrollTop > pageHeight) {
                        return;
                    } else if (distance > 20) {
                        this.prev();
                    } else {
                        this.moveTo(this.index);
                    }
                }
            }

            //swipeUp
            if (distance < 0) {
                this.direction === 'v' ? this.onSwipeUp.call(this) : this.onSwipeLeft.call(this);

                if (!lockNext) {
                    //如果是长页面，需判断一下是否到底
                    if (this.curPage[0].pageScrollHeight && pageScrollTop < this.curPage[0].pageScrollHeight) {
                        return;
                    } else if (distance < -20) {
                        this.next();
                    } else {
                        this.moveTo(this.index);
                    }
                    //循环
                    //if($(this.curPage[0]).hasClass('page5')){
                    //
                    //    this.moveTo(0, true);
                    //}
                }
            }
        },

        moveTo: function (index, direct) {
            var distance,
                self = this;

            state = 'running';

            direct = direct || false;

            if (index >= this.length || index < 0) {
                state = 'end';
                return;
            }

            direct && this._removeTransition();

            this.onbeforechange.call(this);

            if (this.direction === 'v') {
                distance = -index * 100 + '%';
                this.target.css('-webkit-transform', 'translate(0, ' + distance + ')');
            }

            if (this.direction === 'h') {
                distance = -index * 100 + '%';
                this.target.css('-webkit-transform', 'translate(' + distance + ', 0)');
            }

            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                self._currentClass(index);
                self.prevIndex = self.index;
                self.index = index;
                self.onchange.call(self);

                direct && self._setTransition();

                //如果是较长的页面，在翻屏时，重置滚动条位置
                if (self.curPage && self.curPage[0].pageScrollHeight) {
                    isGestureFollowing && (self.gestureFollowing = true);
                    self.preventDefault = true;
                    self.curPage.scrollTop(0);
                }

                self.curPage = self.pages.eq(self.index);

                self.rememberLastVisited && self._saveLastVisited();

                state = 'end';
                clearTimeout(this.timer);
            }, 500);
        },

        prev: function () {
            this.moveTo(this.index - 1);
        },

        next: function () {
            this.moveTo(this.index + 1);
        },

        _setTransition: function () {
            this.target.css('-webkit-transition', '-webkit-transform 0.5s ease');
        },

        _removeTransition: function () {
            this.target.css('-webkit-transition', 'none');
        },

        _currentClass: function (index) {
            var currentClass = this.currentClass;

            this.pages.eq(index).addClass(currentClass);
            if (index !== this.index && !this.animationPlayOnce) {
                this.pages.eq(this.index).removeClass(currentClass);
            }
        },

        _createDot: function () {
            var dots = '';

            for (var i = 0; i < this.length; i++) {
                dots += '<li>' + (i + 1) + '</li>';
            }

            $(dots).appendTo(this.target).wrapAll('<ul class="dot-list">');
        },

        _saveLastVisited: function () {
            var storage = window.localStorage;

            if (storage) {
                storage.setItem('pageSliderIndex', this.index);
            }
        },

        _getLastVisited: function () {
            var storage = window.localStorage;

            if (storage) {
                this.cacheIndex = storage.getItem('pageSliderIndex');
                return parseInt(this.cacheIndex);
            }
        },

        _bindAnimation: function () {
            var self = this,
                styleText = '<style>';

            $('[data-animation]').each(function (index) {
                var $this = $(this),
                    dataAnimation = $this.data('animation'),
                    animationName = dataAnimation['name'],
                    animationDuration = dataAnimation['duration'] || 500,
                    animationDelay = dataAnimation['delay'] || 0,
                    animationTimeFunction = dataAnimation['timing-function'] || 'ease',
                    animationFillMode = dataAnimation['fill-mode'] || 'both',
                    animationIterationCount = dataAnimation['iteration-count'] || 1,
                    animationDirection = dataAnimation['direction'] || 'normal';

                $this.data('animationid', ++index);

                styleText += '.' + self.currentClass +
                    ' ' +
                    '[data-animationid="' + index + '"]' +
                    '{' +
                    '-webkit-animation-name: ' + animationName + ';' +
                    '-webkit-animation-duration: ' + animationDuration + 'ms;' +
                    '-webkit-animation-delay: ' + animationDelay + 'ms;' +
                    '-webkit-animation-timing-function: ' + animationTimeFunction + ';' +
                    '-webkit-animation-fill-mode: ' + animationFillMode + ';' +
                    '-webkit-animation-iteration-count: ' + animationIterationCount + ';' +
                    '-webkit-animation-direction: ' + animationDirection + ';' +
                    '}';
            });

            styleText + '</style>';
            $('head').eq(0).append(styleText);
        },

        _preventDefault: function (e) {
            this.preventDefault && e.preventDefault();
        },

        _dev: function () {
            if (this.dev !== false) {
                this.moveTo(this.dev, true);
            }
        },

        _orientationTip: function(){
            var tpl = '';

            if(!$('#qr-box__img').length){
                $('body').append(tpl);
            }

            // 插入二维码
            var img_url = $('meta[name="wxm:link"]').attr('content');
            if(!img_url)
                img_url = window.location.href;
            img_url = encodeURIComponent(img_url);

            $('#qr-box__img').attr('style', 'background-image:url(https://game.weixin.qq.com/cgi-bin/comm/qrcode?s=10&m=1&d=' + img_url + ')');

            // 插入缩略图
            var thumb_img = $('meta[name="wxm:img_url"]').attr('content');
            if (thumb_img)
                $('#qr-box__thumb').attr('style', 'background-image:url(' + thumb_img + ')');
        },
        _bgMusic: function () {
            if (this.musicUrl) {
               
                var htm = '<a class="u-btn-play rotate"></a><audio id="bgmusic" src="' + this.musicUrl + '" preload="auto" style="visibility: hidden;" loop="loop"></audio>';
                $('body').append(htm);

                //平常播放
                var bgmusic = document.getElementById('bgmusic');
                bgmusic.play();

                //ios兼容处理
                document.addEventListener("WeixinJSBridgeReady", function () {
                    bgmusic.play();
                }, false);

                //切换音乐播放
                $(".u-btn-play").live('tap', function () {
                    if (bgmusic.paused) {
                        bgmusic.play();
                        $(this).removeClass("zanting").addClass('rotate');
                    } else {
                        bgmusic.pause();
                        $(this).removeClass('rotate').addClass("zanting");
                    }
                });
            } else {
                console.log('不需要背景音乐？');
            }

        },

        _initWeixin: function (shareUrl) {
            var url = location.href.split('#')[0];
            $.ajax({
                url: shareUrl,
                type: "get",            // 数据发送方式
                dataType: "jsonp",      // 接受数据格式
                jsonp: 'jsoncallback',
                data: {"url": url},
                success: function (jsonData) {
                    if (jsonData.error == 1) {
                        //alert('发生错误,请联系管理员!');
                    } else {
                        wx.config({
                            debug: false,
                            appId: jsonData.appId,
                            timestamp: jsonData.timestamp,
                            nonceStr: jsonData.nonceStr,
                            signature: jsonData.signature,
                            jsApiList: [
                                'checkJsApi',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeibo',
                               'closeWindow'
                            ]
                        });
                    }
                },
                error: function (e) {
                         //alert(e)
                }
            });
        },

        _loadimg: function (imgarr, callback) {
            //初始化图片加载
            var baseUrl = this.baseUrl;
            var loader = new PxLoader();
            var LoadingImg = imgarr;
            var loadnum = $('.load .num');
            var imgLength = LoadingImg.length; //获取图片的数量

            for (var i = 0; i < imgLength; i++) {
                var pxImage = new PxLoaderImage(baseUrl + LoadingImg[i]);
                pxImage.imageNumber = i + 1;
                loader.add(pxImage);
            }

            //监听加载的过程
            loader.addProgressListener(function (e) {
                var completedCount = e.completedCount; //完成图片的数量
                var percent = parseInt(completedCount * 100 / imgLength); //加载的百分比
                var cssLeft = parseInt(percent / 100); //移动距离
                loadnum.text(percent + '%');
            });

            loader.addCompletionListener(callback);
            loader.start();

            /*function(){
             setTimeout(function(){
             $('.load').addClass('hide');
             $('.page').eq(0).removeClass('hide');
             },500);
             }*/
        },

        wxShare: function(sharetitle1, sharetitle2, sharedesc, url1, url2){
            wx.ready(function(){
                wx.onMenuShareTimeline({
                    title: sharetitle2, // 分享标题
                    link: url1, // 分享链接
                    imgUrl: url2, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                      //  alert(1)
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                wx.onMenuShareAppMessage({
                    title: sharetitle1, // 分享标题
                    desc: sharetitle2, // 分享描述
                    link: url1, // 分享链接
                    imgUrl: url2, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function (){
                        // 用户确认分享后执行的回调函数
                        //alert(2)
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        }
    };

    window.PageSlider = PageSlider;

})(Zepto, window);

if (typeof define === "function" && define.amd) {
    define("PageSlider", [], function () {
        return PageSlider;
    });
}
