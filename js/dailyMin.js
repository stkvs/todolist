// Select the date input field
var dateInput = document.querySelector('.taskDeadline');

// Get the current date
var currentDate = new Date();

// Format the date
var day = String(currentDate.getDate()).padStart(2, '0');
var month = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var year = currentDate.getFullYear();

currentDate = year + '-' + month + '-' + day;

// Set the min date
dateInput.min = currentDate;