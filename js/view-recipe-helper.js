		
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
				'Content-Type': 'application/json',
				'authorizationToken': authToken
			}
		})
		  .then(response => response.json())
		  .then(data => populateRecipeDetails(data));
		
		function populateRecipeDetails(dataJSON){
			
			//add recipe name
			var tag = document.createElement("p");
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
			var table = document.createElement("table");
			//build table head
			var tableHead = document.createElement("thead");
			var tableHeadRow = document.createElement("tr");
			var tableHeadIngredient = document.createElement("td");
			var tableHeadAmount = document.createElement("td");
			var tableHeadMeasure = document.createElement("td");
			var tableHeadNotes = document.createElement("td");
			var nameLabel = document.createTextNode("Ingredient");
			var amountLabel = document.createTextNode("Amount");
			var measureLabel = document.createTextNode("Measure");
			var notesLabel = document.createTextNode("Notes");
			tableHeadIngredient.appendChild(nameLabel);
			tableHeadAmount.appendChild(amountLabel);
			tableHeadMeasure.appendChild(measureLabel);
			tableHeadNotes.appendChild(notesLabel);
			tableHeadRow.appendChild(tableHeadIngredient);
			tableHeadRow.appendChild(tableHeadAmount);
			tableHeadRow.appendChild(tableHeadMeasure);
			tableHeadRow.appendChild(tableHeadNotes);
			tableHead.appendChild(tableHeadRow);
			//for each ingredient, build table body
			var tableBody = document.createElement("tbody");
			for (i=0; i<ingredients.length; i++){
				//console.log(ingredients[i]);
				var tableRow = document.createElement("tr");
				var ingredientData = document.createElement("td");
				var amountData = document.createElement("td");
				var measureData = document.createElement("td");
				var notesData = document.createElement("td");
				var ingredientText = document.createTextNode(ingredients[i].name);
				var amountText = document.createTextNode(ingredients[i].amount);
				var measureText = document.createTextNode(ingredients[i].measure);
				var notesText = document.createTextNode(ingredients[i].notes);
				ingredientData.appendChild(ingredientText);
				amountData.appendChild(amountText);
				measureData.appendChild(measureText);
				notesData.appendChild(notesText);
				tableRow.appendChild(ingredientData);
				tableRow.appendChild(amountData);
				tableRow.appendChild(measureData);
				tableRow.appendChild(notesData);
				tableBody.appendChild(tableRow);
			}
			//add table head and body to new table, then add new table to ingredients
			table.appendChild(tableHead);
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