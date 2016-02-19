/**
 * Created by Administrator on 2015/9/21.
 */
var PAGE = (function () {
    var time2= 0,
        fn = {
            /*横屏监测*/
            listenOrientation: function () {
                var supportsOrientationChange = "onorientationchange" in window,
                    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
                $(window).bind(orientationEvent, function () {
                    var tips = $('#lateralTips');
                    if (window.orientation == 180 || window.orientation == 0) {
                        tips.fadeOut();
                    }
                    if (window.orientation == 90 || window.orientation == -90) {
                        $('html,body').scrollTop(0);
                        tips.fadeIn();
                    }
                }).trigger('orientationEvent');
            },
            setyao: function () {
        /*        initt();
                var SHAKE_THRESHOLD = 1000;
                var last_update = 0;
                var x = y = z = last_x = last_y = last_z = 0;
                var imgcur = 0;
                function initt() {

                    if (window.DeviceMotionEvent) {
                        if(time2==0){
                            window.addEventListener('devicemotion', deviceMotionHandler, false);
                        }else{
                            window.removeEventListener('devicemotion', deviceMotionHandler)
                        }

                    }else {
                        alert('not support mobile event');
                    }


                }

                function deviceMotionHandler(eventData) {
                    var acceleration=null;
                    acceleration = eventData.accelerationIncludingGravity;
                    var curTime = new Date().getTime();
                    if ((curTime - last_update) > 50) {
                        var diffTime = curTime - last_update;
                        last_update = curTime;

                        x = acceleration.x;
                        y = acceleration.y;
                        z = acceleration.z;
                        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                        if (speed > SHAKE_THRESHOLD) {
                            alert(x +' a ' +' a '+ y +' a ' + z +' a ' +last_x +' a ' +last_y +' a ' +last_z)
                            $('.title').html(x +' a ' +' a '+ y +' a ' + z +' a ' +last_x +' a ' +last_y +' a ' +last_z)
                            window.removeEventListener('devicemotion', deviceMotionHandler)
                            if(time2==0){
                                window.addEventListener('devicemotion', deviceMotionHandler, false);
                            }
                            if(imgcur==0){
                                $('.popErr').hide();
                                $('.popSucc').show();
                                imgcur=1;


                            }else if(imgcur=1){
                                $('.popSucc').hide();
                                $('.popErr').show();
                                imgcur=0;
                            }
                            window.removeEventListener('devicemotion', deviceMotionHandler)
                            time2=1;
                        }
                        last_x = x;
                        last_y = y;
                        last_z = z;
                    }
                }

                function deletea(){

                }*/
                var myShakeEvent = new Shake({
                    threshold: 15
                });
                myShakeEvent.start();
                var imgcur=0;

                // register a shake event
                window.addEventListener('shake', shakeEventDidOccur, false);
                function shakeEventDidOccur () {
                    window.removeEventListener('shake', shakeEventDidOccur, false);
                    myShakeEvent.stop();
                    if(imgcur==0){
                        $('.popErr').hide();
                        $('.popSucc').show();
                        imgcur=1;
                    }else if(imgcur=1){
                        $('.popSucc').hide();
                        $('.popErr').show();
                        imgcur=0;
                    }
                }
                $('.popErr a').click(function(){
                    alert('a')
                    setTimeout(function(){
                        myShakeEvent.start();
                        window.addEventListener('shake', shakeEventDidOccur, false);
                    },2000)

                    $('.popErr').fadeOut();

                    /*setTimeout(function(){
                    	time2=0;
                    	window.addEventListener('devicemotion', deviceMotionHandler, false);
                    },2000)*/
                   /* fn.setyao();
                    var deviceMotionHandler=function(){

                    }*/
                    
                })
                $('.again').click(function(){

                    setTimeout(function(){
                        myShakeEvent.start();
                        window.addEventListener('shake', shakeEventDidOccur, false);
                    },2000)


                    $('.popSucc').fadeOut();
                /*
                      setTimeout(function(){
                    	time2=0;
                    	window.addEventListener('devicemotion', deviceMotionHandler, false);
                    },2000)*/
                })

                $('.title').toggle(
                    yaoMu,
                    yaoNoMu
                )
                function yaoMu(){
                    $('audio').attr('src','yao.mp3')
                }
                function yaoNoMu(){
                    $('audio').attr('src','aa.mp3')
                }

            },
            setpop: function () {
                $('.top a').click(function () {
                    $('.pop').fadeIn()
                })
                $('.close').click(function () {
                    $('.pop').fadeOut()
                })
            },
            setBgSound: function () {
                var clickone = true;

                var btn = $('.music2'),
                    audio = document.getElementById("audio");
                btn.bind('click', function () {
                    if (audio.paused) {
                        audio.play();
                        btn.removeClass('curr');

                    } else {
                        audio.pause();
                        btn.addClass('curr');
                        clickone = false;
                    }
                });
                audio.play();

                $(window).bind('click.firstClick', function (e) {
                    if (clickone) {
                        audio.play();
                        btn.removeClass('stop');
                    }
                    $(window).unbind('click.firstClick');
                })
            }


        },
        init = function () {
            fn.setyao();
            fn.setpop();
            fn.setBgSound();

            var index=0;
         /*   setInterval(function(){
                $(".music").css("transform", "rotate(" + (index) + "deg)");
                index++;
            },10)*/

           /* var jinzhi=0;
            document.addEventListener("touchmove",function(e){
                if(jinzhi==0){
                    e.preventDefault();
                    e.stopPropagation();
                }
            },false);*/

        }
    return {
        fn: fn,
        init: init,
        time2:time2
    }
})()
$(function () {
    PAGE.init();
    PAGE.time2=1;
})