		
		function getRecipeList(catRecipe) {
		
		var authToken = '0eb6b64d-4aee-40d9-908d-4846044ee0f0';
		var req = 'https://d8qga9j6ob.execute-api.us-east-1.amazonaws.com/dev/recipe?category=' + catRecipe;
		
		// set cursor to waiting
		document.getElementById("recipeBody").style.cursor = "progress"; 
		

		
		//get recipe list then parse response and build html for page
		fetch(req, {
			method: 'GET',
			headers: {
				'authorizationToken': authToken
			}
		})
		  .then((response) => {
			if (response.status >= 200 && response.status <= 299) {
			  return response.json();
			} else {
			  throw Error(response.statusText);
			}
		  })
		  .then(data => populateRecipeDetails(data, catRecipe))
		  .catch((error) => {
			// Handle the error
			console.log(error);
		  });

		  // return cursor to default
		  document.getElementById("recipeBody").style.cursor = "default";
		
		function populateRecipeDetails(dataJSON, cat){

			var recipeTable = document.getElementById("recipeTable");
			var tBody = document.createElement("tbody");

		// remove old table from screen	
			$("tbody").children().remove()

			for (i=0; i<dataJSON.length; i++){
				var tRow = document.createElement("tr");
				var nameData = document.createElement("td");
				var descrData = document.createElement("td");
				var catData = document.createElement("td");

				var nameText = document.createTextNode(dataJSON[i].recipeName);

				//create link to open recipe
				var createA  = document.createElement('a');
				var nameURL = "view-recipe.html?recipeId=" + dataJSON[i].recipeId;
				createA.setAttribute('href', nameURL);
        		createA.appendChild(nameText);
				
				nameData.appendChild(createA);
				descrData.appendChild(document.createTextNode(dataJSON[i].recipeId));
				catData.appendChild(document.createTextNode(cat));

				tRow.appendChild(nameData);
				tRow.appendChild(descrData);
				tRow.appendChild(catData);

				tBody.appendChild(tRow);
			}

			// if there were no recipes then put out error message
			if (dataJSON.length==0) {
				var tRow = document.createElement("tr");				
				var nameData = document.createElement("td");
				nameData.appendChild(document.createTextNode("No Recipes Found"));
				tRow.appendChild(nameData);
				tBody.appendChild(tRow);
				recipeTable.appendChild(tBody);
			} else {
				recipeTable.appendChild(tBody);
			}
			
		}
	}