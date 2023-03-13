// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  var displayedHour = dayjs().format("H");
  var currentHour = dayjs().format("H");
  createCalendar();

  updateBlockColor();
  loadSavedEvents();
  setInterval(updateClock, 1000);

  // Event listener for clicking on the save button
  // TODO if blank, delete the item from local storage
  $(".saveBtn").on("click", function () {
    let calendarBlock = $(this).parent().attr("id");
    localStorage.setItem(
      calendarBlock,
      $(this).parent().find("textarea").val()
    );
  });

  function createCalendar() {
    // TODO Add this as a text box on the page to grab from the user?
    let startTime = 8;
    let endTime = 16;

    for (let i = startTime; i <= endTime; i++) {
      let calendar = document.getElementById("calendar");

      let timeBlock = document.createElement("div");
      timeBlock.setAttribute("class", "row time-block");
      timeBlock.setAttribute("id", "hour-" + i);
      calendar.appendChild(timeBlock);

      let timeText = document.createElement("div");
      timeText.setAttribute("class", "col-2 col-md-1 hour text-center py-3");
      timeText.innerText = dayjs().hour(i).format("hA");
      timeBlock.appendChild(timeText);

      let textArea = document.createElement("textarea");
      textArea.setAttribute("class", "col-8 col-md-10 description");
      textArea.setAttribute("rows", "3");
      timeBlock.appendChild(textArea);

      let saveButton = document.createElement("button");
      saveButton.setAttribute("class", "btn saveBtn col-2 col-md-1");
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
    // Make this more efficient by only updating the blocks that need to be updated
    $(".time-block").each(function () {
      let calendarBlockHour = parseInt($(this).attr("id").split("-")[1]);
      if (calendarBlockHour < currentHour) {
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("past");
      } else if (calendarBlockHour > currentHour) {
        $(this).removeClass("present");
        $(this).addClass("future");
        $(this).removeClass("past");
      } else {
        $(this).addClass("present");
        $(this).removeClass("future");
        $(this).removeClass("past");
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

  // Displays the current time in the header
  function updateClock() {
    let currentTime = dayjs().format("MMMM D YYYY, h:mm:ss a");
    $("#currentTime").html(currentTime);

    // TODOD Change this to use the existing current Time hour
    currentHour = dayjs().format("H");

    if (currentHour != displayedHour) {
      displayedHour = currentHour;
      updateBlockColor();
    }
  }
});
