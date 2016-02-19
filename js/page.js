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
                initt();
                var speed = 100;  
				 var x = y = z = lastX = lastY = lastZ = 0;  
                var imgcur = 0;
                function initt() {

                    if (window.DeviceMotionEvent) {
                        if(time2==0){
                            window.addEventListener('devicemotion', deviceMotionHandler, false);
                        }else{
                            window.removeEventListener('devicemotion', deviceMotionHandler)
                        }


                    } else {
                        alert('not support mobile event');
                    }


                }

                function deviceMotionHandler() {
                	var acceleration =event.accelerationIncludingGravity;  
					        x = acceleration.x;  
					        y = acceleration.y;  
					        if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {  
					           window.removeEventListener('devicemotion', deviceMotionHandler)
                            if(time2==0){
                                window.addEventListener('devicemotion', deviceMotionHandler, false);
                            }
                            if(imgcur==0){
                            	alert('1')                                         
                            }else{
                            	alert('2')
                            }
                           /* if(imgcur==0){
                                $('.popErr').hide();
                                $('.popSucc').show();
                                imgcur=1;


                            }else if(imgcur=1){
                                $('.popSucc').hide();
                                $('.popErr').show();
                                imgcur=0;
                            }*/
                            window.removeEventListener('devicemotion', deviceMotionHandler)
                            
					        }  
					        lastX = x;  
					        lastY = y;  
       
                }

                function deletea(){

                }
                $('.popErr a').click(function(){
                    time2=0;
                    $('.popErr').fadeOut();
                    window.addEventListener('devicemotion', deviceMotionHandler, false);
                })
                $('.again').click(function(){
                    time2=0;
                    $('.popSucc').fadeOut();
                    window.addEventListener('devicemotion', deviceMotionHandler, false);
                })

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