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
	var recipeName = document.getElementById("recipeName");
	recipeName.value = dataJSON.recipeName;
	
	//add description
	var description = document.getElementById("description");
	description.value = dataJSON.description;
	
	//add category
	var category = document.getElementById("category");
	category.value = dataJSON.category;
	
	//get the existing ingredients table element
	var ingredientsTable = document.getElementById("ingredientsTable");
	
	//build table body with existing ingredients
	var ingredients = dataJSON.ingredients;
	var tBody = document.createElement("tbody");
	for (i=0; i<ingredients.length; i++){
		var tRow = document.createElement("tr");
		var amountData = document.createElement("td");
		var ingredientData = document.createElement("td");
		var notesData = document.createElement("td");
		var deleteData = document.createElement("td");
		var amountNumber = document.createElement("input");
		var ingredientText = document.createElement("input");
		var notesText = document.createElement("input");
		var deleteButton = document.createElement("button");
		var deleteIcon = document.createElement("i");
		amountNumber.type = "number";
		amountNumber.className = "form-control-number";
		amountNumber.name = "ingredients[][amount]";
		amountNumber.value = ingredients[i].amount;
		ingredientText.type = "text";
		ingredientText.className = "form-control";
		ingredientText.name = "ingredients[][ingredient]";
		ingredientText.value = ingredients[i].ingredient;
		notesText.type = "text";
		notesText.className = "form-control";
		notesText.name = "ingredients[][notes]";
		notesText.value = ingredients[i].notes;
		deleteButton.className = "delete-button";
		deleteIcon.className = "fa fa-minus";
		amountData.appendChild(amountNumber);
		ingredientData.appendChild(ingredientText);
		notesData.appendChild(notesText);
		deleteButton.appendChild(deleteIcon);
		deleteData.appendChild(deleteButton);
		tRow.appendChild(amountData);
		tRow.appendChild(ingredientData);
		tRow.appendChild(notesData);
		tRow.appendChild(deleteData);
		tBody.appendChild(tRow);
	}
	
	//add body to ingredients table
	ingredientsTable.appendChild(tBody);
	
	//get the existing directions table element
	var directionsTable = document.getElementById("directionsTable");
	
	//build table body with existing directions
	var directions = dataJSON.directions;
	var tBody = document.createElement("tbody");
	for (i=0; i<directions.length; i++){
		var tRow = document.createElement("tr");
		var stepData = document.createElement("td");
		var deleteData = document.createElement("td");
		var stepText = document.createElement("textarea");
		var deleteButton = document.createElement("button");
		var deleteIcon = document.createElement("i");
		stepText.type = "text";
		stepText.className = "form-control";
		stepText.rows = "2";
		stepText.cols = "61";
		stepText.name = "directions[]";
		stepText.value = directions[i];
		deleteButton.className = "delete-button";
		deleteIcon.className = "fa fa-minus";
		stepData.appendChild(stepText);
		deleteButton.appendChild(deleteIcon);
		deleteData.appendChild(deleteButton);
		tRow.appendChild(stepData);
		tRow.appendChild(deleteData);
		tBody.appendChild(tRow);
	}
	
	//add body to directions table
	directionsTable.appendChild(tBody);
	
}

//button functions (add/delete ingredient, add/delete directions)
$(document).ready(function () {

    // function which is called when Div ID = addIngredient is clicked (AKA add Ingredient button)
    $("#addIngredient").on("click", function () {
    	var newRow = $("<tr>");
        var cols = "";

        // forms that will be added
        cols += '<td><input type="number" class="form-control-number" name = "ingredients[][amount]" id="amount"/></td>';
		cols += '<td><input type="text" class="form-control" name = "ingredients[][ingredient]" id="name"/></td>';      
		cols += '<td><input type="text" name = "ingredients[][notes]" id="notes" class="form-control"></input></td>';
        cols += '<td><button class="delete-button"> <i class="fa fa-minus"></i></button>';
        newRow.append(cols);
        $("#ingredientsTable tbody").append(newRow);
		return false;
    });
	
	// function which is called when Div ID = addInstruction is clicked (AKA add Instruction button)
    $("#addDirection").on("click", function () {
    	var newRow = $("<tr>");
        var cols = "";

        // forms that will be added
        cols += '<td> <textarea class="form-control" rows="2" cols="61" name="directions[]" id="direction"></textarea></td>';
        cols += '<td><button class="delete-button"> <i class="fa fa-minus"></i></button>';
        newRow.append(cols);
        $("#directionsTable tbody").append(newRow);
        return false;
    });
	
    // function which is called when class = btnDel is called (AKA Remove Ingredient button)
    $("table.ingr-list").on("click",".delete-button",function (event) {
        $(this).closest("tr").remove();
		return false;
    });
	
	//function to call api to update recipe
	$("#submitRecipe").on('click', function() {
				
		//serialize form data as formatted JSON object (this doesn't capture the picture)
		var dataJSON = $('#addRecipeForm').serializeJSON();
		//console.log(dataJSON);
		
		//extract the recipe id from url string (recipeId=xxx) and retrieve recipe details from API
		//url will look something like this: .../update-recipe.html?recipeId=ZsZFXcMmtvXFQ-8xoiWR6w
		var queryString = window.location.href.split('/').pop();
		var id = queryString.split('=').pop();
		var patchUrl = 'https://d8qga9j6ob.execute-api.us-east-1.amazonaws.com/dev/recipe/' + id;
		var authToken = '0eb6b64d-4aee-40d9-908d-4846044ee0f0';
		
		// Example PATCH method implementation:
		async function patchData(url = '', data = {}) {
		  // Default options are marked with *
		  const response = await fetch(url, {
			method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
			  'Content-Type': 'application/json',
			  'authorizationToken': authToken
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		  });
		  return response.json(); // parses JSON response into native JavaScript objects
		}

		patchData(patchUrl, dataJSON)
		  .then(data => {
			uploadPicture(data); // JSON data parsed by `data.json()` call
		  });
		
		//get response from this post, save the recipeId returned, and then add to s3 with the name of that id
		function uploadPicture(data){
			//console.log(data);
			var recipeId = data.recipeId;
			var url = "view-recipe.html?recipeId=" + recipeId;
			window.location.href = url;
		}
				
	});	
	
	//cancel update: return to view recipe page
	$("#cancel").on('click', function() {
		var queryString = window.location.href.split('/').pop();
		var recipeId = queryString.split('=').pop();
		var url = "view-recipe.html?recipeId=" + recipeId;
		window.location.href = url;
	});	
	
});