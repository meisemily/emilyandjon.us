var google = google || {};

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
    },
    initializeMaps: function()   {

      var setMarkers = function(map, locations) {
        var infowindow = new google.maps.InfoWindow();

        var markerClick =(function(marker) {
          return function() {
            infowindow.setContent(marker.title);
            infowindow.open(map, marker);
          };
        });

        for (var i = 0; i < locations.length; i++) {

          var location = locations[i];
          var myLatLng = new google.maps.LatLng(location[1], location[2]);
          var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              icon: location[3],
              title: location[0]
          });

          google.maps.event.addListener(marker, 'click', markerClick(marker));
        }
      };
      var homeLatlng = new google.maps.LatLng(40.70562,-73.972558);

      var mapOptions = {
        zoom: 13,
        scrollwheel: false,
        mapTypeControl: false,
        center: homeLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

      // @todo: make retina
      var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 1,
        scale: 0.1,
        strokeColor: '#c73c30',
        strokeWeight: 2
      };

      var places = [
        ['Brooklyn Winery', 40.717371,-73.955123, goldStar],
        ['Brooklyn Bridge Marriott', 40.694306,-73.988206]
        //['Wythe Hotel', 40.722429,-73.95799],
        //['King & Grove Hotel', 40.721274,-73.955437]
      ];
      setMarkers(map, places);

      google.maps.event.addDomListener(window, 'resize', function() {
          map.setCenter(homeLatlng);
      });
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

    // @todo: disable on touch devices.
    $('.parallax_bg').parallax("50%", 0.2);
    $('.ring').parallax("50%", 0.05);
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

$(window).load(Ws.initializeMaps);
