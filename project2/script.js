// Event takes place when the user selects the 'Find Meal & Drink' button
document.getElementById('searchBtn').addEventListener('click', () => {
  const cuisine = document.getElementById('cuisineSelect').value;

  // This makes sure that the user is choosing a cuisine to look at otherwise notifies user to click an option.
  if (!cuisine) {
    alert("Please select a cuisine.");
    return;
  }
  // Once the user clicks the button after selecting their perfered cuisine.
  // They will be given a meal based on the selected cuisine and drink to go with it.
  getMeal(cuisine);
  getRandomDrink();
});

// This is another event I added to help the user clear the results.
// Wouldnt need to reset page just click and then look up another cuisine.
document.getElementById('resetBtn').addEventListener('click', resetContent);

// This is a function I craeted to help get a random meal for the user based on hteir cuision option they selected.
// It fetchs the information from the api and gets a random meal from there for the user.
async function getMeal(cuisine) {
  try {
    // Get a list of meals for the selected cuisine
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`);
    const data = await res.json();
    const meals = data.meals;

    // This is incase there isnt a meal found on the cuisine they selected they will be notifed by an alert.
    if (!meals) {
      alert("No meals found for that cuisine.");
      return;
    }

    // This chooses a random meal from the api.
    const randomMeal = meals[Math.floor(Math.random() * meals.length)];

    // This will fetch the full meal details using the meal's ID
    // Gaters informaiton to help display for the user.
    const mealDetailsRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`);
    const mealDetailsData = await mealDetailsRes.json();

    // Takes the random meal feteched from the API and then displays the meal to the user.
    displayMeal(mealDetailsData.meals[0]);
  } catch (error) {
    console.error("Error fetching meal:", error);
  }
}

// This is helps with the index.html section where it will display the infromation gathered on meal from API on the page.
function displayMeal(meal) {
  document.getElementById('mealTitle').textContent = meal.strMeal;
  document.getElementById('mealImage').src = meal.strMealThumb;
  document.getElementById('mealInstructions').textContent = meal.strInstructions;

  // Show the list of ingredients fetched from the API to the user.
  const mealIngredients = document.getElementById('mealIngredients');
  mealIngredients.innerHTML = '';

  // Created a for loop for ingrident lists checkinng to see if it has 1 - 20 potential ingridents.
  // Also feteches the measurements required for each ingredient.
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    // This if stateemnt would ensure that only valid data is dispalyed.
    // this would also skip any entries that are empty/null.
    if (ingredient && ingredient.trim() !== '') {
      const li = document.createElement('li');
      // helps display the informaiton in the html page
      // for instance - it would be like chicken - 1 lb.
      li.textContent = `${ingredient} - ${measure}`;
      mealIngredients.appendChild(li);
    }
  }
}

// Function that looks at another API which gives a user a random drink to go with their meal.
async function getRandomDrink() {
  try {
    const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await res.json();

    // Displays the random drink found from the API.
    displayDrink(data.drinks[0]);
  } catch (error) {
    console.error("Error fetching drink:", error);
  }
}

// Display drink information found from the API on the webpage.
function displayDrink(drink) {
  document.getElementById('drinkTitle').textContent = drink.strDrink;
  document.getElementById('drinkImage').src = drink.strDrinkThumb;
  document.getElementById('drinkInstructions').textContent = drink.strInstructions;

  // Show the list of drink ingredients
  const drinkIngredients = document.getElementById('drinkIngredients');
  drinkIngredients.innerHTML = '';

  // Loop through up to 15 possible ingredients
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    // Only add ingredients that exist and are not empty
    if (ingredient && ingredient.trim() !== '') {
      const li = document.createElement('li');
      //Same as the meal would be like Blended whiskey - 2oz.
      li.textContent = `${ingredient} - ${measure}`;
      drinkIngredients.appendChild(li);
    }
  }
}

// Clear all content from the page and reset the dropdown
// This is used for the clear results button.
// Allows user to clear all the options clicked and reset page without reloading.
function resetContent() {
  // Reset dropdown selection
  document.getElementById('cuisineSelect').selectedIndex = 0;

  // Clears out the meal contents displayed
  document.getElementById('mealTitle').textContent = '';
  document.getElementById('mealImage').src = '';
  document.getElementById('mealInstructions').textContent = '';
  document.getElementById('mealIngredients').innerHTML = '';

  // Clears out the drink contents displayed
  document.getElementById('drinkTitle').textContent = '';
  document.getElementById('drinkImage').src = '';
  document.getElementById('drinkInstructions').textContent = '';
  document.getElementById('drinkIngredients').innerHTML = '';
}