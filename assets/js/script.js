$(document).ready(function () {
  // Global variabels for the current actual hour and the hour being displayed
  var displayedHour = dayjs().format("H");
  var currentHour = dayjs().format("H");

  // Global variables for the start and end times of the work day
  var startTime = 8;
  var endTime = 16;

  // Create the calendar, update the block colors, and load the local storag events
  createCalendar();
  updateBlockColor();
  loadSavedEvents();

  // Create asychronous loop to update the displayed time every second
  setInterval(updateClock, 1000);

  // Event listener for clicking on the save button
  $(".saveBtn").on("click", function () {
    let calendarBlock = $(this).parent().attr("id");

    // If the text area is empty, remove the event from local storage
    // Else if the text area is unchanged, do nothing
    // Otherwise save the event and display a popup to confirm the event was saved
    if ($(this).parent().find("textarea").val() == "") {
      localStorage.removeItem(calendarBlock);
      return;
    } else if ($(this).parent().find("textarea").val() == localStorage.getItem(calendarBlock)) { 
      return;
     } else {
      localStorage.setItem(calendarBlock,n$(this).parent().find("textarea").val());
      window.alert("Event saved!");
    }
  });

  // Displays the current time in the header and checks if the hour has changed
  function updateClock() {
    // Gather current time and display it in the header
    let currentTime = dayjs().format("MMMM D YYYY, h:mm:ss a");
    $("#currentTime").html(currentTime);

    // Gather current hour, for comparison to the displayed hour
    currentHour = dayjs().format("H");

    // If the hour has changed, update the displayed hour and update the block colors
    if (currentHour != displayedHour) {
      displayedHour = currentHour;
      updateBlockColor();
    }
  }

  // Creates the calendar based on the provided start and end times for the work day
  function createCalendar() {
    for (let i = startTime; i <= endTime; i++) {
      let calendar = document.getElementById("calendar");

      let timeBlock = document.createElement("div");
      timeBlock.setAttribute("class", "time-block row ");
      timeBlock.setAttribute("id", "hour-" + i);
      calendar.appendChild(timeBlock);

      let timeText = document.createElement("div");
      timeText.setAttribute("class", "hour col-2 col-md-1 text-center py-3");
      timeText.innerText = dayjs().hour(i).format("hA");
      timeBlock.appendChild(timeText);

      let textArea = document.createElement("textarea");
      textArea.setAttribute("class", "eventText col-8 col-md-10");
      textArea.setAttribute("rows", "3");
      timeBlock.appendChild(textArea);

      let saveButton = document.createElement("button");
      saveButton.setAttribute("class", "saveBtn btn col-2 col-md-1");
      saveButton.setAttribute("aria-label", "save");
      timeBlock.appendChild(saveButton);

      let icon = document.createElement("i");
      icon.setAttribute("class", "fas fa-save");
      icon.setAttribute("aria-hidden", "true");
      saveButton.appendChild(icon);
    }
  }

  // Updates the background color of the time blocks
  function updateBlockColor() {
    $(".time-block").each(function () {
      // Get the hour from the id of the time block
      let calendarBlockHour = parseInt($(this).attr("id").split("-")[1]);

      // Determine if the time block is in the past, present, or future and set the background color accordingly
      if (calendarBlockHour < currentHour) {
        $(this).addClass("past");
        $(this).removeClass("present future");
      } else if (calendarBlockHour > currentHour) {
        $(this).addClass("future");
        $(this).removeClass("past present");
      } else {
        $(this).addClass("present");
        $(this).removeClass("past future");
      }
    });
  }

  // Used at startup to load any saved events from local storage
  function loadSavedEvents() {
    $(".time-block").each(function () {
      let calendarBlock = $(this).attr("id");
      let savedEvent = localStorage.getItem(calendarBlock);
      if (savedEvent) {
        $(this).find("textarea").val(savedEvent);
      }
    });
  }
});
