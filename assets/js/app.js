$(document).ready(function(){
    $('.scroll').click(function(event){
        event.preventDefault();
        $('html,body').animate({
            scrollTop:$(this.hash).offset().top}, 500
        );
    });

    $('.parallax').parallax("50%", 0.3);
    $('.ring').parallax("50%", 0.2);
});

$(window).scroll(function () {
    var windowScroll = $(window).scrollTop();
    var fromBottom = $(document).height() - ($(window).scrollTop() + $(window).height());

    if (fromBottom === 0) {
        $('nav a.active').removeClass('active');
        $('nav a:last').addClass('active');
    } else {
        $('section').each(function(i) {
            if ($(this).position().top <= windowScroll + 150) {
                $('nav a.active').removeClass('active');
                $('nav a').eq(i).addClass('active');
            }
        });
    }
}).scroll();
