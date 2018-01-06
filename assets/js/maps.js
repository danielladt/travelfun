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
var lat = "";
var lon = "";



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
  initialize(40.6700, -73.9400)
  
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

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }

  function callback(results, status) {
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