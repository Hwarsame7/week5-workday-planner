var today = dayjs();
$('#currentDay').text(today.format('MMM D, YYYY'));

// Define global variables
var today = moment();
var timeBlocks = [];

// Function to display current date
function displayCurrentDate() {
  var currentDate = today.format("MMMM D, YYYY");
  // Display currentDate in the HTML element at the top of the calendar
  document.getElementById("current-date").textContent = currentDate;
}

// Function to create time blocks for business hours
function createTimeBlocks() {
  for (var i = 9; i <= 17; i++) {
    var timeBlock = {
      time: i,
      event: "",
    };
    timeBlocks.push(timeBlock);
  }
}

// Function to color code time blocks based on current time
function colorCodeTimeBlocks() {
  timeBlocks.forEach(function (block) {
    var blockElement = document.getElementById("time-block-" + block.time);
    if (block.time < today.hour()) {
      // Past
      blockElement.classList.add("past");
    } else if (block.time === today.hour()) {
      // Present
      blockElement.classList.add("present");
    } else {
      // Future
      blockElement.classList.add("future");
    }
  });
}

// Function to load saved events from local storage
function loadEvents() {
  var savedEvents = JSON.parse(localStorage.getItem("events"));
  if (savedEvents) {
    timeBlocks = savedEvents;
  }
}

// Function to save events to local storage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(timeBlocks));
}

// Function to render time blocks on the page
function renderTimeBlocks() {
  timeBlocks.forEach(function (block) {
    var blockElement = document.getElementById("time-block-" + block.time);
    blockElement.value = block.event;
  });
}

// Event listener for saving events
document.addEventListener("click", function (event) {
  if (event.target.matches(".save-button")) {
    var time = parseInt(event.target.getAttribute("data-time"));
    var eventText = document.getElementById("time-block-" + time).value;

    timeBlocks.forEach(function (block) {
      if (block.time === time) {
        block.event = eventText;
      }
    });

    saveEvents();
  }
});

// Initialize the daily planner
displayCurrentDate();
createTimeBlocks();
colorCodeTimeBlocks();
loadEvents();
renderTimeBlocks();
  