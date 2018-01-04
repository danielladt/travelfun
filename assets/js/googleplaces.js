// userInput id needs to be changed!

//variables
var map;
var service;
var infoWindow
var geocoder; 
var address; 
var service;
var latitude;
var longitude;
var place = [];

  // turning the user input into address for google
    function converter() {
    var myPlace = document.getElementById("userInput").value;
    console.log(myPlace);
    var address = myPlace;
    console.log(address);
  }

  
    function initMap() {
        //google map
      	var map = new google.maps.Map(document.getElementById("map"),{
          zoom:15,
          center: {lat: 42.3601, lng: -71.0589}
      	});
        var geocoder = new google.maps.Geocoder();

        var address = document.getElementById("userInput").value;

        //event listener 
        document.getElementById("butt").addEventListener("click", function(){
          geocodeAddress(geocoder, map);
        });

        // autocomplete
        var input = document.getElementById('userInput');
        var autocomplete = new google.maps.places.Autocomplete(input);

      // locating the address on the map
      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById("userInput").value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
              });
            //console.log(resultsMap);
            var latitude = results[0].geometry.location.lat();;
            var longitude = results[0].geometry.location.lng();;
            console.log(latitude);
            console.log(longitude);
            var loc = {
              latitude,
              longitude
            } 
            console.log(loc);
            type  = getType()
            initialize(loc.latitude, loc.longitude, type);
          }
        })
      }



    function initialize(lat, long) {
      var pyrmont = new google.maps.LatLng(lat, long);

      var request = {
        location: pyrmont,
        radius: '20',
        type: [type]
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    }

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          console.log(place);
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {

    }
  }




        
    




  

    