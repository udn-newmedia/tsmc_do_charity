import $ from 'jquery'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import './style.css'
import './style_.css'
import 'lazysizes'
import { TweenMax, Power2, TimelineLite } from "gsap";

($(document).ready(function(){

    var scroll_now
    var read_progress = 10
    var isMob = detectmob()
    var platform = (isMob == true) ? 'Mob' : 'PC'
    var progress = []
    var movie_progress = [null]

    function detectmob() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    function moviePlay(id){
        $('#movie-' + id).get(0).play();
        if(progress[id - 1] == null){
            progress[id - 1] = setInterval(function(){
                var curTime = $('#movie-' + id).get(0).currentTime;
                var temp = curTime / $('#movie-' + id).get(0).duration * 100;
                if(temp > 0.6){
                    $('.video-play[data-target="' + id + '"]').css('opacity', 0);
                }
                if(Math.floor(curTime/5) > movie_progress){
                    movie_progress = Math.floor(curTime/5)
                }
                
                $('#progress-bar-' + id).css('width', temp + '%')
            }, 600)
        }
    }
        
    function moviePause(id){
        $('#movie-' + id).get(0).pause();
        $('.video-play[data-target="' + id + '"]').css('opacity', 1);
        if(progress[id-1]){
            clearInterval(progress[id-1])
            progress[id-1] = null;
        }
    }

    function movieReplay(id){
        $('#movie-' + id).get(0).currentTime = 0;
        $('#movie-' + id).get(0).play();
        $('.progress-bar').css('width', 0);
        clearInterval(progress[id - 1])
        progress[id - 1] = setInterval(function(){
            var temp = $('#movie-' + id).get(0).currentTime / $('#movie-' + id).get(0).duration * 100
            $('#progress-bar-' + id).css('width', temp + '%')
        }, 600)
    }

    function movieVolume(id){
        
        if($('#movie-' + id).get(0).muted == true){
            $('#movie-' + id).get(0).muted = false;
            $('.volume[data-target="' + id + '"]').removeClass('fa-volume-off').addClass('fa-volume-up')
            $('.volume-text[data-target="' + id + '"]').text('點按關聲音');
        }
        else{
            $('#movie-' + id).get(0).muted = true;
            $('.volume[data-target="' + id + '"]').removeClass('fa-volume-up').addClass('fa-volume-off')
            $('.volume-text[data-target="' + id + '"]').text('點按開聲音');
        }
    }

    let w = $(window).width()
    let h = $(window).height()
    let total_height = $('body').height() - h
    const headTop = (w >= 768) ? '6px' : '4px'
    var title = $('title').text()

    //cover page animation
    //山從下往上浮起來
    // $("#mountains").css("bottom","0");
    // $("#mountains").css("padding-bottom", "55%");

    $("#mountains").css("height", "100%");
    $("#cover").css("opacity","1");
    $("#cover-title").css("opacity","1");

    setTimeout(function(){
        $("#flag").css("opacity","1");
        $("#flag").css("padding-top", "10px");
    },1100);

    //for video operation
    $('video').on('waiting', function () {
        var tar = $(this).data('target')
        $('.video-play[data-target="' + tar + '"]').css('opacity', 0)
        $('.fa-spinner[data-target="' + tar + '"]').css('opacity', 1)
        // console.log('wait' + $(this).data('target'))
    })

    $('video').on('canplay', function () {
        var tar = $(this).data('target')
        $('.fa-spinner[data-target="' + tar + '"]').css('opacity', 0)
        // console.log('canplay' + $(this).data('target'))
    })   

    $('video').click(function () {
        var tar = $(this).data('target')
        if ($(this).get(0).paused == true) {
            moviePlay(tar);
            if ($(this).get(0).muted == true) {
                $(this).get(0).muted = false;
                $('.volume[data-target="' + tar + '"]').removeClass('fa-volume-off').addClass('fa-volume-up')
                $('.volume-text[data-target="' + tar + '"]').text('點按關聲音');
            }
        }
        else {
            $(this).get(0).pause();
            moviePause(tar);
        }
        // ga("send", {
        //     "hitType": "event",
        //     "eventCategory": "movie click",
        //     "eventAction": "click",
        //     "eventLabel": "[" + platform + "] [" + title + "] [movie " + tar + " click]"
        // });
    });

    $('.replay').click(function () {
        var tar = $(this).data('target')
        movieReplay(tar)
        // ga("send", {
        //     "hitType": "event",
        //     "eventCategory": "movie replay",
        //     "eventAction": "click",
        //     "eventLabel": "[" + platform + "] [" + title + "] [movie " + tar + " replay]"
        // });
    })

    $('.volume').click(function () {
        var tar = $(this).data('target');
        movieVolume(tar);
        // ga("send", {
        //     "hitType": "event",
        //     "eventCategory": "movie volume",
        //     "eventAction": "click",
        //     "eventLabel": "[" + platform + "] [" + title + "] [movie " + tar + " volume]"
        // });
    });

    $('.volume-text').click(function () {
        var tar = $(this).data('target');
        movieVolume(tar);
        // ga("send", {
        //     "hitType": "event",
        //     "eventCategory": "movie volume text",
        //     "eventAction": "click",
        //     "eventLabel": "[" + platform + "] [" + title + "] [movie " + tar + " volume text]"
        // });
    });

    //行動版預設靜音
    if(w<=768){
        $('video').prop('muted', 'true');
    }

    //on scroll
    $(window).on('scroll', function(){
        scroll_now = $(window).scrollTop();
        let movie1 = scroll_now - $('#movie-1').offset().top + h;        

        //for indicator
        if(scroll_now > h){
            $('#indicator').css('opacity', 1)
            $('#head').css('top', headTop)
        }
        else{
            $('#indicator').css('opacity', 0)
            $('#head').css('top', '0')
        }

        $('#indicator-bar').css('width', scroll_now/total_height * 100 + '%');

        if(movie1 > h/3 && movie1 < h + 200){
            if($('#movie-1').get(0).paused == true){
                moviePlay(1);
            }
        }
        else{
            if($('#movie-1').get(0).paused == false){
                moviePause(1)
            }
        }

        //deal with pop out animation
        //想一下popout 這裡如何改
        if($('.popout').length){
            if(scroll_now > $('.popout').offset().top - 1/3*h){
                TweenMax.to(".popout", 0.5, {css: {scale: 0.8, opacity: 1}, ease: Strong.easeInOut, yoyo: true, repeat: 1});
                $('.popout').removeClass('popout');
            }
        }

        //text in member box pop out
        if(scroll_now > $('.member').offset().top) {
            if (!$('.member_box').hasClass('done')) {

                for(let tar=1;tar<=$('.partner').length;tar++){
                    setTimeout(function(){
                        $('.partner[data-target="' + tar + '"]').css('opacity', 1);
                        TweenMax.to('.partner[data-target="' + tar + '"]', 0.2, { css: { scale: 0.8}, ease: Strong.easeInOut, yoyo: true, repeat: 1 });
                    },tar*200);
                }

                $(".member_box").addClass('done');
            }
        } 

        //member picture animation
        if(scroll_now > $('.member_box').offset().top){
            if(!$('.member_anim').hasClass('done')){
                $("#member01").css("opacity","0");
                $("#member02").css("opacity", "1");     
                $(".member_anim").addClass('done');           
            }
        } 

        //news picpopout
        if (scroll_now > $('.news').offset().top) {
            if (!$('.news').hasClass('done')) {

                for (let tar = 1; tar <= $('.news_pic').length; tar++) {
                    setTimeout(function () {
                        TweenMax.to('.news_pic[data-target="' + tar + '"]', 0.2, { css: { scale: 0.7, opacity: 1}, ease: Strong.easeInOut, yoyo: true, repeat: 1 });
                        $('.news_pic[data-target="' + tar + '"]').css('opacity', 1);
                    }, tar * 200);
                }

                $(".news").addClass('done');
            }
        } 
    })

}))