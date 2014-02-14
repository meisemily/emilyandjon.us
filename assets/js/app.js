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
    // lifted from http://stackoverflow.com/questions/6031649/jquery-show-hide-div-when-section-is-in-viewport?rq=1
    checkVisible: function(element) {
          var height = $(window).height();
          var scrollTop = $(window).scrollTop();
          var obj = $(element);
          var pos = obj.position();
          return (height + scrollTop > pos.top);
    },
    parallax: function() {
      if (!$('body').hasClass('ie')) {
        $.each($('.parallax'), function (i, el) {
          var scrollTop = $(window).scrollTop();
          var speed = $(el).data('speed');
          if (Ws.checkVisible($(el))) {
            var px = -($(el).offset().top - scrollTop);
            var pxToBump = px * speed;
            $(el).css('transform',  'translate(0, ' + pxToBump + 'px)');
          }
          if (scrollTop === 0) {
            $('.hero').css('transform',  'matrix(1, 0, 0, 1, 0px, 0px)');
            $('.ring_wrapper').css('transform',  'matrix(1, 0, 0, 1, 0px, 0px)');
          }
        });
      }
    },
};

$(document).ready(function(){
  var shouldScroll = true;
  setInterval(function(){
    shouldScroll = true;
  }, 16); // roughly 60 Hz

  Ws.detectIE();

  $(window).scroll(function() {
    if(shouldScroll) {
      Ws.handleScroll();
      shouldScroll = false;
    }
  }).scroll();
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
      }, 300, 'swing', function(){
          Ws.lastHash = "";
      });
      Ws.highlightSelected();
  });
});


