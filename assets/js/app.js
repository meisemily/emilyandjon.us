var Ws = {
    lastHash: "",
    highlightSelected: function () {
        var shouldBail = false;
        $('section').each(function(i) {
            var clickedID = ("#"+$(this).attr('id'));
            if(clickedID === (Ws.lastHash)) {
                $('nav a.active').removeClass('active');
                $('nav a').eq(i).addClass('active');
                shouldBail = true;
                return false;
            }
        });
        return shouldBail;
    }
};

$(document).ready(function(){
    $('.scroll').click(function(event){
        event.preventDefault();
        Ws.lastHash = this.hash;
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top - $('#site_nav').height(),
        }, 500, 'swing', function(){
            Ws.lastHash =  "";
        });
        Ws.highlightSelected();
    });

    $('.parallax_bg').parallax("50%", 0.2);
    $('.ring').parallax("50%", 0.1);
});

$(window).scroll(function () {
    var shouldBail = false;
    // if doing this from a click, just select the clicked thing
    if(Ws.lastHash.length) {
        shouldBail = Ws.highlightSelected();
    }
    if(shouldBail) {
      return;
    }
    var started = $(window).scrollTop();
    var fromBottom = $(document).height() - ($(window).scrollTop() + $(window).height());
    var boundary = started  + $('#site_nav').height() + $('section').first().height();

    // For testing
    $('#middle').css({top: boundary});

    if (started === 0) {
        $('nav a.active').removeClass('active');
        $('nav a:first').addClass('active');
    } else if (fromBottom < 1) {
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
