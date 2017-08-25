import $ from "jquery";

$(document).ready(function(){
    var scroll_now;
    var progress = [];
    var movie_progress = [null];
    let w = $(window).width();
    let h = $(window).height();
    let total_height = $("body").height() - h;
    const headTop = w >= 768 ? "6px" : "4px";
    var title = $("title").text();

    function moviePlay(id) {
        $("#movie-" + id).get(0).play();
        if (progress[id - 1] == null) {
        progress[id - 1] = setInterval(function() {
            var curTime = $("#movie-" + id).get(0).currentTime;
            var temp = curTime / $("#movie-" + id).get(0).duration * 100;
            if (temp > 0.6) {
            $('.video-play[data-target="' + id + '"]').css("opacity", 0);
            }
            if (Math.floor(curTime / 5) > movie_progress) {
            movie_progress = Math.floor(curTime / 5);
            }

            $("#progress-bar-" + id).css("width", temp + "%");
        }, 600);
        }
    }

    function moviePause(id) {
        $("#movie-" + id).get(0).pause();
        $('.video-play[data-target="' + id + '"]').css("opacity", 1);
        if (progress[id - 1]) {
        clearInterval(progress[id - 1]);
        progress[id - 1] = null;
        }
    }

    function movieReplay(id) {
        $("#movie-" + id).get(0).currentTime = 0;
        $("#movie-" + id).get(0).play();
        $(".progress-bar").css("width", 0);
        clearInterval(progress[id - 1]);
        progress[id - 1] = setInterval(function() {
        var temp = $("#movie-" + id).get(0).currentTime / $("#movie-" + id).get(0).duration * 100;
        $("#progress-bar-" + id).css("width", temp + "%");
        }, 600);
    }

    function movieVolume(id) {
        if ($("#movie-" + id).get(0).muted == true) {
        $("#movie-" + id).get(0).muted = false;
        $('.volume[data-target="' + id + '"]')
            .removeClass("fa-volume-off")
            .addClass("fa-volume-up");
        $('.volume-text[data-target="' + id + '"]').text("點按關聲音");
        } else {
        $("#movie-" + id).get(0).muted = true;
        $('.volume[data-target="' + id + '"]')
            .removeClass("fa-volume-up")
            .addClass("fa-volume-off");
        $('.volume-text[data-target="' + id + '"]').text("點按開聲音");
        }
    }

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

    $(window).on('scroll', function(){
        scroll_now = $(window).scrollTop();
        let movie1 = scroll_now - $("#movie-1").offset().top + h;        

        if (movie1 > h / 3 && movie1 < h + 200) {
          if ($("#movie-1").get(0).paused == true) {
            moviePlay(1);
          }
        } else {
          if ($("#movie-1").get(0).paused == false) {
            moviePause(1);
          }
        }


    });


});
