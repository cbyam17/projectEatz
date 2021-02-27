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
        cols += '<td><input type="number" class="form-control" name = "ingredients[][amount]" id="amount"/></td>';
        cols += '<td><input type="text" class="form-control" name = "ingredients[][measure]" id="measure"/></td>';        
		cols += '<td><input type="text" class="form-control" name = "ingredients[][notes]" id="notes"/></td>';
        cols += '<td><input type="button" class="btnDel" value="Remove Ingredient"></td>';
        newRow.append(cols);
        $("#ingredientsTable tbody").append(newRow);
        counter++;
    });
	
	// function which is called when Div ID = addInstruction is clicked (AKA add Instruction button)
    $("#addDirection").on("click", function () {
    	var newRow = $("<tr>");
        var cols = "";

        // forms that will be added
        cols += '<td><textarea class="form-control" rows="2" name="directions[]" id="direction"></textarea></td>';
        cols += '<td><input type="button" class="btnDel" value="Remove Direction"></td>';
        newRow.append(cols);
        $("#directionsTable tbody").append(newRow);
        counter++;
    });
	
    // function which is called when class = btnDel is called (AKA Remove Ingredient button)
    $("table.ingr-list").on("click",".btnDel",function (event) {
        $(this).closest("tr").remove();       
        counter -= 1;
    });
	
});

	$("#addRecipeForm").submit(function() {
		
		//serialize form data as formatted JSON object (this doesn't capture the picture)
		var obj = $(this).serializeJSON();
		var jsonString = JSON.stringify(obj);
		
		//additional logic here to get the picture and send it to s3 bucket somewhere
	
		//call api to add recipe
		$.post( "https://d8qga9j6ob.execute-api.us-east-1.amazonaws.com/dev/recipe", jsonString);
		
		//get response from this post, save the recipeId returned, and then add to s3 with the name of that id
		
		//code to be implemented later for uploading the image to AWS s3
		
	});