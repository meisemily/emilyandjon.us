var google = google || {};
var Modernizr = Modernizr || {};

var Ws = {
    lastHash: "",
    detectIE: function () {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf('MSIE ');

      if (msie > 0) {
        $('body').addClass('ie');
      }
    },
    handleScroll: function () {
      if (!Modernizr.touch) {
        Ws.parallax();

        $('.fade_in').each( function(i, element){
          if(Ws.checkVisible($(element))) {
            $(element).delay(100).addClass('animate');
          }
        });
      }

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
    },
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
    },
    // lifted from http://upshots.org/javascript/jquery-test-if-element-is-in-viewport-visible-on-screen
    checkVisible: function(element) {
          var win = $(window);
          var viewport = {
              top : win.scrollTop(),
              left : win.scrollLeft()
          };
          viewport.right = viewport.left + win.width();
          viewport.bottom = viewport.top + win.height();
           
          var bounds = element.offset();
          bounds.right = bounds.left + element.outerWidth();
          bounds.bottom = bounds.top + element.outerHeight();
          return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    },
    parallax: function() {
      if (!$('body').hasClass('ie')) {
        $.each($('.parallax'), function (i, el) {
          var scrollTop = $(window).scrollTop();
          var speed = $(el).data('speed');
          if (Ws.checkVisible($(el))) {
            var pxToBump = -($(el).offset().top - scrollTop) * speed;
            $(el).css('top',  pxToBump + 'px');
          }
        });
      }
    },
};

$(document).ready(function(){
  Ws.detectIE();
  $(window).scroll(Ws.handleScroll).scroll();
  $(window).resize(Ws.handleScroll);

  $('.fade_in_always').each( function(i, element){
    $(element).addClass('animate');
  });

  $('.move_up').each( function(i, element){
    $(element).addClass('animate');
  });

  if (Modernizr.touch) {
    $('.fade_in').css('opacity','1');
  }

  $('.scroll').click(function(event){
      event.preventDefault();
      Ws.lastHash = this.hash;

      $('html,body').animate({
          scrollTop: $(this.hash).offset().top - $('#site_nav').height() + 1,
      }, 500, 'swing', function(){
          Ws.lastHash =  "";
      });
      Ws.highlightSelected();
  });
});


