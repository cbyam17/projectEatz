	/* 
   Javascript file for add-recipe.html
   uses Jquery click commands to call functions and add columns to the table
   Version: 1.0.1
*/

$(document).ready(function () {

    // function which is called when Div ID = addIngredient is clicked (AKA add Ingredient button)
    $("#addIngredient").on("click", function () {
    	var newRow = $("<tr>");
        var cols = "";

        // forms that will be added
        cols += '<td><input type="number" class="form-control-number" name = "ingredients[][amount]" id="amount"/></td>';
		cols += '<td><input type="text" class="form-control" name = "ingredients[][ingredient]" id="name"/></td>';
        //cols += '<td><input type="text" class="form-control" name = "ingredients[][measure]" id="measure"/></td>';        
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
			//console.log(data);
			//for now, redirect user to view the recipe they just created
			var recipeId = data.recipeId;
			var url = "view-recipe.html?recipeId=" + recipeId;
			window.location.href = url;
		}
				
	});
	
	$('#file-input').change(function() {
		//var i = $(this).prev('label').clone();
		var imgDiv = document.getElementById("image-div");
		var file = $('#file-input')[0].files[0].name;
		var p = document.createElement("p");
		p.id = "filename";
		var fileText = document.createTextNode(file);
		
		//check for existing file already uploaded
		var existingFilename = document.getElementById("filename");
		if (existingFilename !== null){
			imgDiv.removeChild(existingFilename);
		}
		
		//add filename to form
		p.appendChild(fileText);
		imgDiv.appendChild(p);
	});
	
});
