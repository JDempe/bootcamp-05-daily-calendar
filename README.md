# CBC Week 05 Challenge: Daily Calendar
## Description

This project is the fifth challenge from the coding bootcamp from UC Berkeley.  The challenge was to create a daily planner with the following minimum requirements:

1. The current day should be displayed at the top of the page.
2. There will be a time block for each hour in a typical business day.
3. Each time block is color coded to indicate if it is in the past, present, or future.
4. The time blocks allow for entering events.  Saving the events will store the event in local storage.
  
I used day.js to collect the current local time for this assignment.  jQuery was used for the javascript to simplify syntax.

Behind the scenes, once the page is loaded a interval timer is created to check the time every second.  For the most part, the only thing updated each second is the time at the top of the page, however it checks to see if the current hour is different from the last time it was checked.  If it is, this initiates the change in color indicators.

The save button has an event listener on it that grabs the text from the sibling `<textarea>` and stores it in local storage for the next startup.  It will remove the key-value pair from local storage if the `<textarea>` has been cleared out, to avoid unncessarily using storage memory.

This project really showed how much easier Javascript can be when you take the time to find additional packages to utilize.  Both jQuery and day.js have high quality documentation as well as simple, understandable syntax so that if/when I return to this code a year from now, I can very quickly understand what is going on.

## Mock Up

The mock up below was provided in the bootcamp homework materials.  We were to use the existing HTML/CSS and and only add the Javascript, so the final product looks the same as the mockup, with added functionality in the background.

<p align="center">
  <img src="./assets/images/05-third-party-apis-homework-demo.gif?raw=true" alt="daily calendar mockup screenshot" width=600px height=auto/>
</p>

## Final Product

The final product is deployed at https://jdempe.github.io/bootcamp-05-daily-calendar/.  The existing HTML and CSS that was provided by the bootcamp was reused so it looks generally the same, with the exception of the clock in the header.  The HTML/CSS was refactored to consolidate id's and classes and their respective styles, however.

<p align="center">
  <img src="./assets/images/05-third-party-apis-homework-final.png?raw=true" alt="daily calendar screenshot" width=600px height=auto/>
</p>

## Installation

There is no installation process for this project.

## Usage

- On first startup, the user will be presented with a blank calendar with hour blocks for each hour in a typical workday (8am to 4pm).  The current local time will be displayed at the top of the page.  The hour blocks will be color coded to indicate whether the time block is in the past, present, or future.  Block(s) in the past are greyed out, the current block hour is highlighted red, and block(s) in the future are highlighted greeen.

- The user can click on any of the time blocks to enter an event.  Clicking the save button to the right of the entered text will save the event to local storage and will persist until the user clears the local storage.  An alert will pop up to confirm the event was saved.

- To clear an event, the user can click on the event and delete the text.  The save button will then clear the event from local storage.

## Credits

### Resources
The below resources contributed to the project.

- [Day.js](https://day.js.org/) is the library used to handle the date and time.  It is a lightweight alternative to Moment.js.

- [jQuery](https://jquery.com/) is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.

## License

Refer to the LICENSE in the repository.

## How to Contribute

Contribute at https://github.com/JDempe/bootcamp-05-daily-calendar