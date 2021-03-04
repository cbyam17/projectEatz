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
		var deleteButton = document.createElement("input");
		amountNumber.type = "number";
		ingredientText.type = "text";
		notesText.type = "text";
		deleteButton.type = "button";
		amountNumber.className = "form-control-number";
		ingredientText.className = "form-control";
		notesText.className = "form-control";
		deleteButton.className = "delete-button";
		amountNumber.value = ingredients[i].amount;
		ingredientText.value = ingredients[i].ingredient;
		notesText.value = ingredients[i].notes;
		deleteButton.value = "x";
		amountData.appendChild(amountNumber);
		ingredientData.appendChild(ingredientText);
		notesData.appendChild(notesText);
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
	
}

//button functions (add/delete ingredient, add/delete directions)
$(document).ready(function () {
    var counter = 0;

    // function which is called when Div ID = addIngredient is clicked (AKA add Ingredient button)
    $("#addIngredient").on("click", function () {
    	var newRow = $("<tr>");
        var cols = "";

        // forms that will be added
        cols += '<td><input type="number" class="form-control-number" name = "ingredients[][amount]" id="amount"/></td>';
		cols += '<td><input type="text" class="form-control" name = "ingredients[][ingredient]" id="name"/></td>';
        //cols += '<td><input type="text" class="form-control" name = "ingredients[][measure]" id="measure"/></td>';        
		cols += '<td><input type="text" name = "ingredients[][notes]" id="notes" class="form-control"></input></td>';
        cols += '<td><input type="button" class="delete-button" value="x"></td>';
        newRow.append(cols);
        $("#ingredientsTable tbody").append(newRow);
        counter++;
    });
	
	// function which is called when Div ID = addInstruction is clicked (AKA add Instruction button)
    $("#addDirection").on("click", function () {
    	var newRow = $("<tr>");
        var cols = "";

        // forms that will be added
        cols += '<td> <textarea class="form-control" rows="2" cols="61" name="directions[]" id="direction"></textarea></td>';
        cols += '<td><input type="button" class="delete-button" value="x"</td>';
        newRow.append(cols);
        $("#directionsTable tbody").append(newRow);
        counter++;
    });
	
    // function which is called when class = btnDel is called (AKA Remove Ingredient button)
    $("table.ingr-list").on("click",".delete-button",function (event) {
        $(this).closest("tr").remove();       
        counter -= 1;
    });
});