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
    "destination" : "Pluto",    
    "latitude" : "17",  
    "longitude" : "18", 
    "date" : "10/03/18"
  },
  selection: {  
    "interestType" : "",
    "options" : ["concert","theatre ","dining"]
  }  
  // favortites:{""}
};
// console.log(uidObject.search.latitude);
// console.log(uidObject.selection.options[0]);; 

   // ****************************************************** 
   //  localStorage Object modeled after uidObject -
   //  used to collect data from any page
   //  used to populate uidObject before sending to firebase
    
       // Initialize localStorage Object

      localStorage.setItem("destination", uidObject.search.destination);
      // localStorage.setItem("latitude", uidObject.search.latitude);
      // localStorage.setItem("longitude", uidObject.search.destination);
      localStorage.setItem("date", uidObject.search.date);
      localStorage.setItem("interestType", uidObject.selection.interestType);
      localStorage.setItem("options", uidObject.selection.options);
       // Test
      // var test2 = localStorage.getItem("options");
      // console.log("testing");
      // console.log(test2);     
// ************************************************

// Firebase Save function()
// uid from eventbrite anonymous user passed in  
// ref(uid) makes uid the root of the saved object in database
// filled uidObject is saved to database
function firebaseSave (uid) {    
  database.ref(uid).set({ 
  // localStorage.setItem("uid", uid);     // not sure right place
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
 
$("#submit-btn").on("click", function() {
  // Don't refresh the page
  event.preventDefault();      

  // What destination did they enter?
  var uDest = $("#userInput").val().trim();

  firebaseSave(uid);      // should this go in activities/events click?  
});
       
    

// Get user's interest - did they click events or activities?
$("#butt").on("click", function() {        
    interest = "activities";

});
$("#buttEvents").on("click", function() {        
    interest = "events";

});
  