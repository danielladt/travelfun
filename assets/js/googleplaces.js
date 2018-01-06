function activatePlaceSearch () {
  var input = document.getElementById('userInput');
  var autocomplete = new google.maps.places.Autocomplete(input);

  $('#submit-btn').on('click', function () {
    var destination = autocomplete.getPlace();
    var lat = autocomplete.getPlace().geometry.location.lat();
    var lng = autocomplete.getPlace().geometry.location.lng();
    storeLocationDetails(lat, lng, destination);
  });
}

function storeLocationDetails (lat, lng, destination) {
  localStorage.setItem('latitude', lat);
  localStorage.setItem('longitude', lng);
  localStorage.setItem('destination', JSON.stringify(destination));
}