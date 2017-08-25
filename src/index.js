import $ from 'jquery'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import './style.css'
import './style_.css'
import detectmob from './detectmob.js'
import 'lazysizes'
import { TweenMax, Power2, TimelineLite } from "gsap"
import './videoController.js'
import './smartBrain1.js'
import './smartBrain2.js'
import "./smartBrain1_mobile.js";
import "./smartBrain2_mobile.js";

($(document).ready(function(){

    var scroll_now
    var read_progress = 10
    var isMob = detectmob();
    var platform = (isMob == true) ? 'Mob' : 'PC'

    let w = $(window).width()
    let h = $(window).height()
    let total_height = $('body').height() - h
    const headTop = (w >= 768) ? '6px' : '4px'
    var title = $('title').text()

    //cover page animation
        //山從下往上浮起來
        // $("#mountains").css("bottom","0");
        // $("#mountains").css("padding-bottom", "55%");

        //山從高度0長出來
        $("#mountains").css("height", "100%");
        $("#cover").css("opacity","1");
        $("#cover-title").css("opacity","1");

        //最後插上旗子
        setTimeout(function(){
            $("#flag").css("opacity","1");
            // $("#flag").css("padding-top", "10px");
        },1000);

    //smart brain loading icon
        $('')

    //on scroll
        $(window).on('scroll', function(){
            scroll_now = $(window).scrollTop();
            // let movie1 = scroll_now - $('#movie-1').offset().top + h;        

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