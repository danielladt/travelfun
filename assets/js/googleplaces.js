// userInput id needs to be changed!
console.log(uid)
console.log("inside googleplaces.js");

//variables
var map;
var service;
var infoWindow
var geocoder; 
var address; 
var service;
var coordinates = {};
var place = [];
var lat = "";
var lon = "";
 

  // turning the user input into address for google
  // so there's been a change here that's not in your code
  // lets find it
console.log('google places')

// turning the user input into address for google
function converter() {
  var myPlace = document.getElementById("userInput").value;
  console.log(myPlace);
  var address = myPlace;
  console.log(address);
}

function initMap() {
//all of my changes are here
//google map style
  var mapOptions = {
    zoom:10,
    center: new google.maps.LatLng(40.6700, -73.9400),
    styles: [{"featureType":"administrative.country","elementType":"labels.icon","stylers":[{"visibility":"on"}]}]
  }
  //CHANGE THE ID
  var mapElement = document.getElementById("map");
  var map = new google.maps.Map(mapElement, mapOptions);


  var geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();
  //CHANGE THE ID
  var address = document.getElementById("userInput").value;

        //event listener. CHANGE THE ID. this is the search button
  document.getElementById("butt").addEventListener("click", function(){
    geocodeAddress(geocoder, map);
    console.log(results[0].geometry.location.lat());
    localStorage.latitude   =  results[0].geometry.location.lat();
    localStorage.longitude   =  results[0].geometry.location.lng();   
    console.log(localStorage.longitude); 
  });

        // autocomplete. CHANGE THE ID
  var input = document.getElementById('userInput');
  var autocomplete = new google.maps.places.Autocomplete(input);

      // locating the address on the map
  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById("userInput").value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        //if the address works, then the location is shown on the map
        resultsMap.setCenter(results[0].geometry.location);
        //marks the user's location on the map
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        //console.log(resultsMap);
        //GIVES US THE LATITUDE AND LONGITUDE
        var latitude = results[0].geometry.location.lat();;
        var longitude = results[0].geometry.location.lng();;
        console.log(latitude);
        console.log(longitude);
        var loc = {
              latitude,
              longitude
            } 
          console.log(loc);
        //type  = getType()
        initialize(loc.latitude, loc.longitude);
        }
    })
  }
    /* this is supposed to be the getType function (where the user could chose their type)
    var type = ['restaurant' ,  'bar' , 'shopping_mall' , 'museum' , 'amusement_park'];
    var arrayType = type.length
    

    function getType() {
      var select = document.getElementById("selectType");
      var objSelect = select.selectedIndex;
      console.log(objSelect); 
      
      }
      */

  function initialize(lat, long) {
    var pyrmont = new google.maps.LatLng(lat, long);
    var request = {
        location: pyrmont,
        radius: '20',
        type: ['restaurant']
      };

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

        var loc = {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng()
        } 
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

        //shows the list of results
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
      //change the ID
      document.getElementById("searchResults").innerHTML= "Name:" + place.name + "<br />" + "Address:" + place.vicinity + "<br />" + "Rating:" + place.rating;
    });

  }
}




        
    




  

    