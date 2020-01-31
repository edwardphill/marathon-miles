// 1. Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDX0WNeOSd3Tx1KboR2QPtUk2_n5lCcNGY",
  authDomain: "marathon-miles.firebaseapp.com",
  databaseURL: "https://marathon-miles.firebaseio.com",
  storageBucket: "marathon-miles.appspot.com"
};

var totalMiles = 0;
var mileCount = miles;

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
  var runTimes = $("#runTime")
    .val()
    .trim();

  // Creates local "temporary" object for holding run data

  var newRunLog = {
    newDate: runDate,
    newMileage: miles,
    newBoroughs: boroughs,
    newRunTime: runTimes
  };

  // Uploads run data to the database
  database.ref().push(newRunLog);

  // Logs everything to console

  console.log(newRunLog.newDate);
  console.log(newRunLog.newMileage);
  console.log(newRunLog.newBoroughs);
  console.log(newRunLog.newRunTime);

  // Clears all of the text-boxes
  $("#runDate").val("");
  $("#miles").val("");
  $("#boroughs").val("");
  $("#runTime").val("");
});

$("#log-a-run-btn").on("click", function() {
  // Storing our giphy API URL for a random cat image
  var queryURL =
    "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=running";

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data from the AJAX request comes back
    .then(function(response) {
      // Saving the image_original_url property
      var imageUrl = response.data.image_original_url;

      // Creating and storing an image tag
      var runningImg = $("<img>");

      // Setting the runningImg src attribute to imageUrl
      runningImg.attr("src", imageUrl);
      runningImg.attr("alt", "runner image");

      // Prepending the runningImg to the images div
      $("#gifInsert").prepend(runningImg);
    });
});

$("#motivated").on("click", function() {
  // Storing our giphy API URL for a random cat image
  var queryURL =
    "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=motivation";

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data from the AJAX request comes back
    .then(function(response) {
      // Saving the image_original_url property
      var imageUrl = response.data.image_original_url;

      // Creating and storing an image tag
      var motivatedImg = $("<img>");

      // Setting the motivatedImg src attribute to imageUrl
      motivatedImg.attr("src", imageUrl);
      motivatedImg.attr("alt", "runner image");

      // Prepending the motivatedImg to the images div
      $("#gif2Insert").prepend(motivatedImg);
    });
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var runDate = childSnapshot.val().newDate;
  var miles = childSnapshot.val().newMileage;
  var boroughs = childSnapshot.val().newBoroughs;
  var runTime = childSnapshot.val().newRunTime;

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
  // Append the new row to the table
  $("#run-table > tbody").append(newRow);
});

// ADD TOTAL MILEAGE

$("#log-a-run-btn").on("click", function() {
  mileCount += dailyMiles;
  $("#totalMiles").html(mileCount);
  console.log(mileCount);
});

$("#runHist-btn").click(function() {
  $("#whyRun").css("display", "none");
  $("#logANewRunTable").css("display", "none");
  $("#milesTrackerTable").css("display", "inline");
});

$("#logRun-btn").click(function() {
  $("#whyRun").css("display", "none");
  $("#logANewRunTable").css("display", "inline");
  $("#milesTrackerTable").css("display", "none");
});

$("#whyImRunning").click(function() {
  $("#whyRun").css("display", "inline");
  $("#logANewRunTable").css("display", "none");
  $("#milesTrackerTable").css("display", "none");
});

// Countdown to date

// Set the date we're counting down to
var countDownDate = new Date("Nov 1, 2020 06:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("raceDate").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("raceDate").innerHTML = "EXPIRED";
  }
}, 1000);
