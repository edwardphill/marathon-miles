// 1. Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDX0WNeOSd3Tx1KboR2QPtUk2_n5lCcNGY",
  authDomain: "marathon-miles.firebaseapp.com",
  databaseURL: "https://marathon-miles.firebaseio.com",
  projectId: "marathon-miles",
  storageBucket: "marathon-miles.appspot.com",
  messagingSenderId: "680241808246",
  appId: "1:680241808246:web:4e8c8e7363f0ccf6fa7057"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

// 2. Button for logging a run
$("#log-a-run-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var runDate = $("#runDate")
    .val()
    .trim();
  var miles = $("#miles")
    .val()
    .trim();
  var boroughs = $("#boroughs")
    .val()
    .trim();
  var runTime = $("#runTime")
    .val()
    .trim();

  // Creates local "temporary" object for holding run data

  var newRunLog = {
    newDate: runDate,
    newMileage: miles,
    newBoroughs: boroughs,
    newRunTime: runTime
  };

  // Uploads run data to the database
  database.ref().push(newRunLog);

  // Logs everything to console

  console.log(newRunLog.newDate);
  console.log(newRunLog.newMileage);
  console.log(newRunLog.boroughs);
  console.log(newRunLog.runTime);

  alert("Run log successfully added");

  // Clears all of the text-boxes
  $("#runDate").val("");
  $("#miles").val("");
  $("#boroughs").val("");
  $("#runTime").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var runDate = childSnapshot.val().newName;
  var miles = childSnapshot.val().newDestination;
  var boroughs = childSnapshot.val().newTime;
  var runTime = childSnapshot.val().freq;

  // Log run info
  console.log(runDate);
  console.log(miles);
  console.log(boroughs);
  console.log(runTime);

  var newRow = $("<tr>").append(
    $("<td>").text(runDate),
    $("<td>").text(miles),
    $("<td>").text(boroughs),
    $("<td>").text(runTime)
  );
});
