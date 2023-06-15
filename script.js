const searchBox = document.querySelector('.searchBox');
const searchButton = document.querySelector('.searchButton');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Function to get recipes
const fetchRecipes = async (query) => {
  recipecontainer.innerHTML = "Fetching Recipes...";
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();

  recipecontainer.innerHTML = "";
  response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
      <img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <p><span>${meal.strArea}</span> Dish</p>
      <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `
    const button = document.createElement('button');
    button.textContent = "View Meal";
    recipeDiv.appendChild(button);

    // Adding event listener to recipe button
    button.addEventListener('click', () => {
      openRecipePopup(meal);
    });

    recipecontainer.appendChild(recipeDiv);
  });
}

const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <p>${meal.strInstructions}</p>
  `;
  recipeDetailsContent.parentElement.style.display = "block";
}

const closeRecipePopup = () => {
  recipeDetailsContent.parentElement.style.display = "none";
}

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipes(searchInput);
});

recipeCloseBtn.addEventListener('click', closeRecipePopup);
