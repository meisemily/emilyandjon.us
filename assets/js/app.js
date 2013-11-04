$(document).ready(function(){
    $('.scroll').click(function(event){
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top - $('#site_nav').height(),
        }, 500, 'swing', function(){
        });
    });

    $('.parallax_bg').parallax("50%", 0.3);
    $('.ring').parallax("50%", 0.15);
});

$(window).scroll(function () {
    var started = $(window).scrollTop();
    var fromBottom = $(document).height() - ($(window).scrollTop() + $(window).height());
    var boundary = started  + $('#site_nav').height() + $('section').first().height();

    // For testing
    $('#middle').css({top: boundary});

    if (started === 0) {
        $('nav a.active').removeClass('active');
        $('nav a:first').addClass('active');
    } else if (fromBottom === 0) {
        $('nav a.active').removeClass('active');
        $('nav a:last').addClass('active');
    } else {
        $('section').each(function(i) {
            if(boundary >= $(this).position().top) {
                $('nav a.active').removeClass('active');
                $('nav a').eq(i).addClass('active');
            }
        });
    }
}).scroll();
