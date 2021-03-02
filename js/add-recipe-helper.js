	/* 
   Javascript file for add-recipe.html
   uses Jquery click commands to call functions and add columns to the table
   Version: 1.0.1
*/

$(document).ready(function () {
    var counter = 0;

    // function which is called when Div ID = addIngredient is clicked (AKA add Ingredient button)
    $("#addIngredient").on("click", function () {
    	var newRow = $("<tr>");
        var cols = "";

        // forms that will be added
		cols += '<td><input type="text" class="form-control" name = "ingredients[][name]" id="name"/></td>';
        cols += '<td><input type="number" class="form-control-number" name = "ingredients[][amount]" id="amount"/></td>';
        cols += '<td><input type="text" class="form-control" name = "ingredients[][measure]" id="measure"/></td>';        
		cols += '<td><textarea class="form-control" rows="2" cols="30" name = "ingredients[][notes]" id="notes"></textarea></td>';
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
        cols += '<td> <textarea class="form-control" rows="2" cols="95" name="directions[]" id="direction"></textarea></td>';
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
	
	$("#submitRecipe").on('click', function() {
		
		//serialize form data as formatted JSON object (this doesn't capture the picture)
		var dataJSON = $('#addRecipeForm').serializeJSON();
		console.log(dataJSON);
		
		var postUrl = 'https://d8qga9j6ob.execute-api.us-east-1.amazonaws.com/dev/recipe';
		var authToken = '0eb6b64d-4aee-40d9-908d-4846044ee0f0';
		
		// Example POST method implementation:
		async function postData(url = '', data = {}) {
		  // Default options are marked with *
		  const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
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

		postData(postUrl, dataJSON)
		  .then(data => {
			uploadPicture(data); // JSON data parsed by `data.json()` call
		  });
		
		//get response from this post, save the recipeId returned, and then add to s3 with the name of that id
		function uploadPicture(data){
			console.log(data);
		}
				
	});
	
});
