// userInput id needs to be changed!
// console.log(uid)
console.log("inside maps.js");


//variables
var map;
var service;
var infoWindow
var geocoder; 
var address; 
var service;
var coordinates = {};
var place = [];
var lat = localStorage.getItem('latitude')
var lon = localStorage.getItem('longitude')



function initMap() {
    var geocoder = new google.maps.Geocoder();
//all of my changes are here
//google map style
  var mapOptions = {
    zoom:10,
    center: new google.maps.LatLng(lat, lon),
    styles: [{"featureType":"administrative.country","elementType":"labels.icon","stylers":[{"visibility":"on"}]}]
  }
  //CHANGE THE ID
  var mapElement = document.getElementById("map");
  var map = new google.maps.Map(mapElement, mapOptions);


  var geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();
  //CHANGE THE ID
  
  initialize(lat, lon)


  function initialize(lat, long) {
    var pyrmont = new google.maps.LatLng(lat, long);
    var request = {
        location: pyrmont,
        radius: '20',
        type: ['restaurant']
      };

    var address = localStorage.getItem('address')
    address = JSON.stringify(address)
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          //if the address works, then the location is shown on the map
          map.setCenter(results[0].geometry.location);
          //marks the user's location on the map
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
        }
    })

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    console.log('event')
  }

  function callback(results, status) {
      console.log('cb')
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];

        //shows the list of results
        // console.log(results);
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
      console.log('marker')
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location});

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
      //change the ID
      document.getElementById("searchResults").innerHTML= "Name:" + place.name + "<br />" + "Address:" + place.vicinity + "<br />" + "Rating:" + place.rating;
    });

  }
}