function activatePlaceSearch () {
  var input = document.getElementById('userInput');
  var autocomplete = new google.maps.places.Autocomplete(input)

  $('#submit-btn').on('click', function () {
    var lat = autocomplete.getPlace().geometry.location.lat();
    var lng = autocomplete.getPlace().geometry.location.lng();
    storeLocationDetails(lat, lng);
  })
}

function storeLocationDetails (lat, lng) {
  localStorage.setItem('latitude', lat)
  localStorage.setItem('longitude', lng)
}