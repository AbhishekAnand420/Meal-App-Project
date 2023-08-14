const searchBox = document.querySelector(".searchBox");
const searchButton = document.querySelector(".searchButton");
const recipecontainer = document.querySelector(".recipecontainer");
const recipeDetailsContent = document.querySelector(".recipeDetailsContent");
const recipeCloseButton = document.querySelector(".recipeCloseButton");


const fetchfoods = async (query) =>{
	recipecontainer.innerHTML = "<h2>Fetching receipes...</h2>";
	try{

		const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
	const response = await data.json();

	recipecontainer.innerHTML = "";
	response.meals.forEach(meal => {
		const recipeDiv = document.createElement('div');
		recipeDiv.classList.add('recipe');
		recipeDiv.innerHTML = `
			<img src="${meal.strMealThumb}">
			<h3>${meal.strMeal}</h3>
			<p>Country : <span>${meal.strArea}</span></p>
			<p>Type : <span>${meal.strCategory}</span></p>
		`

		const button = document.createElement("button");
		button.textContent = "View Recipe";
		recipeDiv.appendChild(button);

		button.addEventListener('click',()=>{
			openRecipePopup(meal);
		});

		recipecontainer.appendChild(recipeDiv);
	});

	}catch(error){
	
		recipecontainer.innerHTML = "<h2>Error in Fetching receipes...</h2>";
	}

	
}

const fetchIngredients = (meal) =>{
	let ingredientList = "";
	for(let i=1;i<=20;i++){
		const ingredient = meal[`strIngredient${i}`];
		if(ingredient){
			const measure = meal[`strMeasure${i}`];
			ingredientList += `<li>${measure} ${ingredient}</li>`
		}
		else{
			break;
		}
	}
	return ingredientList;
}

const openRecipePopup = (meal) =>{
	recipeDetailsContent.innerHTML = `
		<h2 class="recipeName">${meal.strMeal}</h2>
		<h3> Ingredents:</h3>
		<ul class="ingredientList">${fetchIngredients(meal)}</ul>
		<div class="recipeInstructions">
			<h3>Instructions:</h3>
			<p>${meal.strInstructions}</p>
		</div>
	`
	recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseButton.addEventListener('click',()=>{
	recipeDetailsContent.parentElement.style.display = "none";
});

searchButton.addEventListener("click",(e)=>{
	e.preventDefault();
	const searchInput = searchBox.value.trim();
	fetchfoods(searchInput);
});