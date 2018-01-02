// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAgJhqy5y_2thCWoFREBTvKUBclccZYyJA",
    authDomain: "travelapp-66e07.firebaseapp.com",
    databaseURL: "https://travelapp-66e07.firebaseio.com",
    projectId: "travelapp-66e07",
    storageBucket: "travelapp-66e07.appspot.com",
    messagingSenderId: "779281156252"
  };
  firebase.initializeApp(config);
 
  var dataRef = firebase.database();

  // Get user's destination info
  var interest = "";

   $("#submitButton").on("click", function() {
      // Don't refresh the page
      event.preventDefault();      

      // What destination did they enter?
        var uDest = $("#userDestination").val().trim();
        console.log(uDest);
    });

   // Get user's interest - did they click events or activities?
   $("#activities").on("click", function() {        
        interest = "activities";
        console.log(interest);
    });
   $("#events").on("click", function() {        
        interest = "events";
        console.log(interest);
    });