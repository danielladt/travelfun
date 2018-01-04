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
var place =[];

  // turning the user input into address for google
    function converter() {
    var myPlace = document.getElementById("userInput").value;
    console.log(myPlace);
    var address = myPlace;
    console.log(address);
  }

  
    function initMap() {
        //google map
        var mapOptions = {
          zoom:11,
          center: new google.maps.LatLng(40.6700, -73.9400),
          styles: [{"featureType":"administrative.country","elementType":"labels.icon","stylers":[{"visibility":"on"}]}]
        }

      	var mapElement = document.getElementById("map");

        var map = new google.maps.Map(mapElement, mapOptions);
        var geocoder = new google.maps.Geocoder();
        infowindow = new google.maps.InfoWindow();
        var address = document.getElementById("userInput").value;

        //event listener 
        document.getElementById("butt").addEventListener("click", function(){
          geocodeAddress(geocoder, map), getType();
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
            initialize(loc.latitude, loc.longitude)
          }
        })
      }

    var type = ['restaurant' ,  'bar' , 'shopping_mall' , 'museum' , 'amusement_park'];
    var arrayType = type.length
    

    function getType() {
      var select = document.getElementById("selectType");
      var objSelect = select.selectedIndex;
      console.log(objSelect); 
      
      }
      
    


      function initialize(lat, long) {
      var pyrmont = new google.maps.LatLng(lat, long);

      var request = {
        location: pyrmont,
        radius: '500',
        type: ['restaurant']
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
      var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
          document.getElementById("searchResults").innerHTML= place.name + "<br />" + "address:" + place.vicinity + "<br />" + "rating:" + place.rating;
        });
      }
    }
  




        
    




  

    