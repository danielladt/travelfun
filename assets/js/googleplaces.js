function activatePlaceSearch () {
  var input = document.getElementById('userInput');
  var autocomplete = new google.maps.places.Autocomplete(input)

  $('#submit-btn').on('click', function () {
    var address = autocomplete.getPlace();
    console.log(address)
    var lat = autocomplete.getPlace().geometry.location.lat();
    var lng = autocomplete.getPlace().geometry.location.lng();
    storeLocationDetails(lat, lng, address);
  })
}

function storeLocationDetails (lat, lng, address) {
  localStorage.setItem('latitude', lat)
  localStorage.setItem('longitude', lng)
  localStorage.setItem('address', JSON.stringify(address))
}