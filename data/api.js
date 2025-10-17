// Define constants for Spoonacular API
const API_KEY = "e5ceb780c396492e85ee7037d3abeefe"; // Replace with your own key if needed
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

/**
 * Fetch recipes using AJAX (via XMLHttpRequest)
 * @param {string} ingredients - Comma-separated list of ingredients from the user
 * @param {function} callback - Function to handle the results (displayRecipes)
 */
function getRecipes(ingredients, callback) {
  const xhr = new XMLHttpRequest();

  // Construct the URL with encoded ingredients and API key
  const url = `${BASE_URL}?query=${encodeURIComponent(
    ingredients
  )}&number=10&apiKey=${API_KEY}`;

  xhr.open("GET", url, true); // Open an asynchronous GET request

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // Request is complete
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText); // Parse JSON response
        callback(data.results); // Pass results to callback function (usually displayRecipes)
      } else {
        console.error("Failed to fetch recipes"); // Handle error
        callback([]); // Pass an empty array to indicate failure
      }
    }
  };

  xhr.send(); // Send the request
}

/**
 * Display the list of recipes on the page
 * @param {Array} recipes - Array of recipe objects returned by the API
 */
function displayRecipes(recipes) {
  window.currentRecipes = recipes; // Store results globally so we can access them later (e.g., for favorites)

  const resultsDiv = document.getElementById("results"); // Container for displaying recipes
  resultsDiv.innerHTML = ""; // Clear previous results

  // If no recipes found, show message
  if (recipes.length === 0) {
    resultsDiv.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  // Loop through each recipe and create a Bootstrap card
  recipes.forEach((recipe) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-3"; // Responsive column layout

    const card = document.createElement("div");
    card.className = "card mb-3 h-100 custom-shadow"; // Bootstrap card + custom class

    // Set the card content using innerHTML
    card.innerHTML = `
      <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${recipe.title}</h5>
        <div class="d-flex justify-content-between align-items-center mt-auto">
          <a href="https://spoonacular.com/recipes/${recipe.title.replace(
            / /g,
            "-"
          )}-${
      recipe.id
    }" target="_blank" class="btn btn-primary">View Recipe</a>
          <button class="btn btn-link favorite-btn" data-id="${
            recipe.id
          }" title="Add to favorites">
            🤍
          </button>
        </div>
      </div>
    `;

    col.appendChild(card); // Add the card to the column
    resultsDiv.appendChild(col); // Add the column to the results grid
  });
}

/**
 * Setup event delegation for "Add to Favorites" functionality
 * This allows dynamically added buttons to still be detected
 */
function setupFavorites() {
  document.addEventListener("click", function (e) {
    // Check if the clicked element is a "favorite" button
    if (e.target.classList.contains("favorite-btn")) {
      const recipeId = e.target.dataset.id; // Get the recipe ID from the button
      const recipe = window.currentRecipes.find((r) => r.id == recipeId); // Find the full recipe object

      if (!recipe) {
        console.error("Recipe not found in currentRecipes", recipeId);
        return;
      }

      // Add the recipe to local storage using our storage module
      window.storage.addFavorite(recipe);

      // Change the heart icon to filled (visual feedback)
      e.target.textContent = "❤️";

      // Debugging output
      console.log("Added to favorites:", recipe);
      console.log("Current localStorage:", window.storage.getFavorites());
    }
  });
}

// Initialize favorites setup after DOM content is fully loaded
document.addEventListener("DOMContentLoaded", setupFavorites);

/**
 * Setup search form functionality
 * Allows users to search for recipes by entering ingredients
 */
function setupSearch() {
  const searchForm = document.querySelector('form[role="search"]');

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload
    const input = searchForm.querySelector('input[type="search"]'); // Get the input element
    const ingredients = input.value.trim(); // Get trimmed input value

    if (!ingredients) return; // If input is empty, do nothing

    getRecipes(ingredients, displayRecipes); // Fetch and display recipes based on input
  });
}

// Initialize search form functionality after DOM is ready
document.addEventListener("DOMContentLoaded", setupSearch);
