// Timer Functionality
// ***************************************

let countdown; // Stores the interval ID for the countdown
let timeLeft = 0; // Tracks the remaining time in seconds

// Get references to DOM elements
const timeInput = document.getElementById("timeInput"); // Input field for minutes
const startBtn = document.getElementById("startBtn"); // "Start" button
const resetBtn = document.getElementById("resetBtn"); // "Reset" button
const countdownDisplay = document.getElementById("countdownDisplay"); // Area to show the countdown
const timerBox = document.querySelector(".timer"); // Container for visual effects (e.g. flash)

// Function to format and update the timer display
function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60); // Get whole minutes
  const secs = seconds % 60; // Get remaining seconds

  // Format as MM:SS with leading zeros
  countdownDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}`;
}

// Function to start the countdown timer
function startTimer() {
  const inputMinutes = parseInt(timeInput.value); // Get user input and convert to number

  // Validate input
  if (isNaN(inputMinutes) || inputMinutes <= 0) {
    alert("Please enter a valid number of minutes (greater than 0).");
    return;
  }

  clearInterval(countdown); // Clear any existing timer
  timeLeft = inputMinutes * 60; // Convert minutes to seconds
  updateDisplay(timeLeft); // Show the starting time

  // Start the countdown interval
  countdown = setInterval(() => {
    timeLeft--; // Decrease time

    if (timeLeft <= 0) {
      // Time's up!
      clearInterval(countdown); // Stop the timer
      updateDisplay(0); // Set display to 00:00
      alert("Time's up!"); // Show alert

      // Add red flashing effect to the timer box
      timerBox.classList.add("flash-alert");

      // Remove the flash effect after 3 seconds
      setTimeout(() => {
        timerBox.classList.remove("flash-alert");
      }, 3000);
    } else {
      // If time is still left, update the display
      updateDisplay(timeLeft);
    }
  }, 1000); // Run every 1 second
}

// Function to reset the timer to initial state
function resetTimer() {
  clearInterval(countdown); // Stop the timer
  timeLeft = 0; // Reset time
  updateDisplay(0); // Reset display to 00:00
  timeInput.value = ""; // Clear input field
  timerBox.classList.remove("flash-alert"); // Remove any flashing alert effect
}

// Set up event listeners for the buttons
startBtn.addEventListener("click", startTimer); // Start on click
resetBtn.addEventListener("click", resetTimer); // Reset on click

// Initialize display with 00:00 when page loads
updateDisplay(0);
