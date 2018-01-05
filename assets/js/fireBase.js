 // uidObject = user object that gets filled in from various sources
 //   Once filled it's saved to firebase
 //   Later it's retrievable with the uidKey as DB key.
 //    uidKey - firebase supplies
 //    latitude/longitude - google supplies based on user destination
 //    date, interestType - user supplies
 //    options - eventbrite API supplies

 console.log('firebase')

var uidObject = {
  search: { 
    "destination" : "NYC",
    "latitude" : "10",
    "longitude" : "10",
    "date" : "01/03/2018"
  },
  selection: { // interestType will be either
    "interestType" : "activities",
    "options" : ["concert","theatre ","dining"]
  }  
  // favortites:{""}
};

console.log(uidObject.search.latitude);
console.log(uidObject.selection.interestType[0]);
  
// ************************************************

// Firebase Save function()
// uid from eventbrite anonymous user passed in  
// ref(uid) makes uid the root of the saved object in database
// filled uidObject is saved to database
function firebaseSave (uid) {    
  database.ref(uid).set({      
    dataBaseObject: uidObject          
  });     
}
// *************************************************


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
var database = firebase.database();
  
 
// *************************************************************
// Using firebase provided function signInAnonymously() 
// uid is an randomly generated ID for each user, 
// ********* needs fixing as it generates new id each submit button click
// ********* thinking should only be generated once per user
// put in local storage, used as key to database
// ****************************************************************
var uid = "";

firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
// Get randomly generated user ID - (uid)
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) { // User is signed in.
    var isAnonymous = user.isAnonymous;
    uid = user.uid;  
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
});

// Get user's destination info
var interest = "";
 
$("#submitButton").on("click", function() {
  // Don't refresh the page
  event.preventDefault();      

  // What destination did they enter?
  var uDest = $("#userDestination").val().trim();

  firebaseSave(uid);      // should this go in activities/events click?  
});
       
    

// Get user's interest - did they click events or activities?
$("#activities").on("click", function() {        
    interest = "activities";

});
$("#events").on("click", function() {        
    interest = "events";

});
  