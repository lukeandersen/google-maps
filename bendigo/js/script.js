// Modernizr.load loading the right scripts only if you need them
Modernizr.load([
	{
    // Let's see if we need to load selectivizr
    test : Modernizr.borderradius,
    // Modernizr.load loads selectivizr for IE6-8
    nope : ['js/libs/selectivizr.js']
	}
]);


// as the page loads, call these scripts
$(document).ready(function() {
	
	

    // HTML5 Placeholder Fallbacks for older browsers
    if (!Modernizr.input.placeholder) {
        // set placeholder values
        $(this).find('[placeholder]').each(function() {
            $(this).val( $(this).attr('placeholder') );
        });

        // focus and blur of placeholders
        $('[placeholder]').focus(function() {
            if ($(this).val() == $(this).attr('placeholder')) {
                $(this).val('');
                $(this).removeClass('placeholder');
            }
        }).blur(function() {
            if ($(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
                $(this).val($(this).attr('placeholder'));
                $(this).addClass('placeholder');
            }
        });

        // remove placeholders on submit
        $('[placeholder]').closest('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                if ($(this).val() == $(this).attr('placeholder')) {
                    $(this).val('');
                }
            });
        });
    }
	 
}); /* end of as page load scripts */


// Google Maps
function initialize() {
    var myOptions = {
      center: new google.maps.LatLng(-33.865284,151.195822),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);

    setMarkers(map, branches);
}

// Branch Locations
var branches = [
  ['Balmain', -33.857498,151.180881, 3],
  ['Sydney CBD', -33.868705,151.210325, 2],
  ['Pyrmont', -33.869378,151.193675, 1]
];

// Custom options for markers amd info window
function setMarkers(map, locations) {

    // Marker styling
    var image = new google.maps.MarkerImage('images/marker-icon.png',
        new google.maps.Size(40, 53),
        new google.maps.Point(0,0), 
        new google.maps.Point(20, 53));
    var shadow = new google.maps.MarkerImage('images/marker-icon-shadow.png',
        new google.maps.Size(40, 15),
        new google.maps.Point(0,0),
        new google.maps.Point(20, 10));
    var shape = {
        coord: [21,0,26,1,28,2,30,3,31,4,32,5,34,6,34,7,35,8,36,9,36,10,37,11,37,12,38,13,38,14,38,15,38,16,38,17,39,18,39,19,39,20,39,21,38,22,38,23,38,24,38,25,37,26,37,27,37,28,36,29,36,30,35,31,34,32,34,33,33,34,32,35,32,36,31,37,30,38,29,39,29,40,28,41,27,42,27,43,26,44,25,45,24,46,24,47,23,48,22,49,22,50,21,51,20,52,19,52,18,51,17,50,17,49,16,48,15,47,15,46,14,45,13,44,13,43,12,42,11,41,10,40,10,39,9,38,8,37,8,36,7,35,6,34,6,33,5,32,4,31,3,30,3,29,2,28,2,27,1,26,1,25,1,24,1,23,1,22,0,21,0,20,0,19,0,18,0,17,1,16,1,15,1,14,1,13,2,12,2,11,3,10,3,9,4,8,5,7,5,6,6,5,8,4,9,3,11,2,13,1,17,0,21,0],
        type: 'poly'
    };

   // Info window format
   var contentString = 
    '<div class="details">'+
        '<h2>Elizabeth St Branch</h2>'+
        '<p>3/75 Elizabeth Street <br> Sydney NSW 2000, Australia <br> Phone: (02) 9221 1410 </p>' +
        '<p><b>Operating Hours</b><br>9:00am - 5:00pm<br> MON - FRI, 9:00am - 12:00pm SAT</p> '+
        '<a href="http://facebook.com/BendigoBank">Visit Facebook Branch Page</a>'+
    '</div>';

    var infowindow = new google.maps.InfoWindow(); 

    var marker, i;

    for (var i = 0; i < locations.length; i++) {
    var branch = locations[i];
    var myLatLng = new google.maps.LatLng(branch[1], branch[2]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        shadow: shadow,
        icon: image,
        shape: shape,
        title: 'Bendigo Bank',
        zIndex: branch[3]
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
        }
    })(marker, i));

  }
}
