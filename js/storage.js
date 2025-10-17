// Storage functionality
// ********************************

// Create a global 'storage' object attached to the 'window'
// This helps manage favorite recipes using browser localStorage
window.storage = {
  // Get all favorite recipes from localStorage
  getFavorites: function () {
    // Parse the JSON string from localStorage into an array
    // If nothing is stored, return an empty array instead
    return JSON.parse(localStorage.getItem("favorites")) || [];
  },

  // Save the given favorites array to localStorage
  saveFavorites: function (favorites) {
    // Convert the array into a JSON string before storing
    localStorage.setItem("favorites", JSON.stringify(favorites));
  },

  // Add a recipe to favorites if it's not already there
  addFavorite: function (recipe) {
    const favorites = this.getFavorites(); // Get current favorites

    // Check if the recipe is already in the list (by ID)
    if (!favorites.find((f) => f.id === recipe.id)) {
      favorites.push(recipe); // Add it to the list
      this.saveFavorites(favorites); // Save updated list to storage
    }
  },

  // Remove a recipe from favorites by its ID
  removeFavorite: function (id) {
    let favorites = this.getFavorites(); // Get current favorites

    // Filter out the recipe with the matching ID
    favorites = favorites.filter((f) => f.id != id);

    this.saveFavorites(favorites); // Save the updated list
  },
};
