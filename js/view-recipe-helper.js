		
		//extract the recipe id from url string (recipeId=xxx) and retrieve recipe details from API
		//url will look something like this: .../view-recipe.html?recipeId=ZsZFXcMmtvXFQ-8xoiWR6w
		var queryString = window.location.href.split('/').pop();
		var id = queryString.split('=').pop();
		var authToken = '0eb6b64d-4aee-40d9-908d-4846044ee0f0';
		var req = 'https://d8qga9j6ob.execute-api.us-east-1.amazonaws.com/dev/recipe/' + id;
		
		//get recipe details then parse response and build html for page
		fetch(req, {
			method: 'GET',
			headers: {
				'authorizationToken': authToken
			}
		})
		  .then(response => response.json())
		  .then(data => populateRecipeDetails(data));
		
		function populateRecipeDetails(dataJSON){
			
			//add recipe name
			var tag = document.createElement("h1");
			var text = document.createTextNode(dataJSON.recipeName);
			tag.appendChild(text);
			var element = document.getElementById("recipeName");
			element.appendChild(tag);
			
			//add recipe description
			var tag = document.createElement("p");
			var text = document.createTextNode(dataJSON.description);
			tag.appendChild(text);
			var element = document.getElementById("description");
			element.appendChild(tag);
			
			//add recipe category
			var tag = document.createElement("p");
			var text = document.createTextNode(dataJSON.category);
			tag.appendChild(text);
			var element = document.getElementById("category");
			element.appendChild(tag);

			//add recipe ingredients table
			var ingredients = dataJSON.ingredients;
			
			//create new table
			var table = document.createElement("table");
			var tableBody = document.createElement("tbody");
			for (i=0; i<ingredients.length; i++){
				//console.log(ingredients[i]);
				var tableRow = document.createElement("tr");
				var ingredientData = document.createElement("td");
				var ingredientText;
				if (ingredients[i].notes !== ''){
					ingredientText = document.createTextNode(ingredients[i].amount + ' ' + ingredients[i].ingredient + ' (' + ingredients[i].notes + ')');
				}
				else{
					ingredientText = document.createTextNode(ingredients[i].amount + ' ' + ingredients[i].ingredient);
				}
				ingredientData.appendChild(ingredientText);
				tableRow.appendChild(ingredientData);
				tableBody.appendChild(tableRow);
			}
			//add table head and body to new table, then add new table to ingredients
			table.appendChild(tableBody);
			var element = document.getElementById("ingredients");
			element.appendChild(table);				
			
			
			//add recipe directions table
			var directions = dataJSON.directions;
			var table = document.createElement("table");	
			//for each direction, build table body
			var tableBody = document.createElement("tbody");
			for (i=0; i<directions.length; i++){
				//console.log(directions[i]);
				var tableRow = document.createElement("tr");
				var tableData = document.createElement("td");
				var direction = document.createTextNode(i+1+'. '+directions[i]);
				tableData.appendChild(direction);
				tableRow.appendChild(tableData);
				tableBody.appendChild(tableRow);
			}
			//add table body to new table, then add new table to directions 
			table.appendChild(tableBody);
			var element = document.getElementById("directions");
			element.appendChild(table);
		}
		
$(document).ready(function () {
	
		//function to go to update recipe page when edit recipe button is clicked
		//<a href="update-recipe.html?recipeId=4QbeZj-vibNdBi2AUHS6zQ"> <!-- hardcoded now, but will need to be done programmatically-->
	$("#editRecipe").on('click', function() {
		var queryString = window.location.href.split('/').pop();
		var recipeId = queryString.split('=').pop();
		var url = "update-recipe.html?recipeId=" + recipeId;
		window.location.href = url;
	});
});