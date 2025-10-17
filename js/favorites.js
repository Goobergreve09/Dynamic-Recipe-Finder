// Favorite recipe functionality
// *****************************

// Wait for the DOM content to fully load before running any scripts
document.addEventListener("DOMContentLoaded", function () {
  displayFavorites(); // Load and display favorite recipes
});

// Function to display favorite recipes on the page
function displayFavorites() {
  const resultsDiv = document.getElementById("results"); // Get the container where recipes will be shown
  if (!resultsDiv) return console.error("No #results container found"); // If not found, log error and exit

  resultsDiv.innerHTML = ""; // Clear any existing content

  const favorites = window.storage.getFavorites(); // Retrieve favorite recipes from storage

  // If no favorites, show a message and stop
  if (favorites.length === 0) {
    resultsDiv.innerHTML = "<p>No favorite recipes yet.</p>";
    return;
  }

  // Loop through each favorite recipe and create a card for it
  favorites.forEach((recipe) => {
    const col = document.createElement("div"); // Create a column for layout
    col.className = "col-12 col-md-3"; // Responsive column classes

    const card = document.createElement("div"); // Create the card container
    card.className = "card mb-3 h-100 custom-shadow"; // Add Bootstrap and custom classes

    // Set the inner HTML of the card with recipe data
    card.innerHTML = `
      <img src="${recipe.image}" class="card-img-top" alt="${
      recipe.title
    }"> <!-- Recipe image -->
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${recipe.title}</h5> <!-- Recipe title -->
        <div class="d-flex justify-content-between align-items-center mt-auto">
          <!-- Link to view full recipe on Spoonacular -->
          <a href="https://spoonacular.com/recipes/${recipe.title.replace(
            / /g,
            "-"
          )}-${
      recipe.id
    }" target="_blank" class="btn btn-primary">View Recipe</a>
          <!-- Button to remove recipe from favorites -->
          <button class="btn btn-link remove-btn" data-id="${
            recipe.id
          }" title="Remove from favorites">
            🗑️
          </button>
        </div>
      </div>
    `;

    col.appendChild(card); // Add the card to the column
    resultsDiv.appendChild(col); // Add the column to the results container
  });

  // Attach event listeners to all "remove" buttons
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.dataset.id; // Get the ID of the recipe to remove
      const newFavorites = favorites.filter((f) => f.id != id); // Filter out the removed recipe
      window.storage.saveFavorites(newFavorites); // Save the updated favorites list
      displayFavorites(); // Refresh the UI to reflect changes
    });
  });
}
