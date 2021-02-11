/* 
   Javascript file for add-recipe.html
   uses Jquery click commands to call functions and add columns to the table
   Version: 1.0.1
*/

$(document).ready(function () {
    var counter = 0;

    // function which is called when Div ID = addrow is clicked (AKA add Ingredient button)
    $("#addrow").on("click", function () {
    	var newRow = $("<tr>");
        var cols = "";

        // forms that will be added
        cols += '<td><input type="text" class="form-control" name = "ingrList" id="amount"/></td>';
        cols += '<td><input type="text" class="form-control" name = "ingrList" id="measure"/></td>';        
        cols += '<td><input type="text" class="form-control" name = "ingrList" id="ingredient"/></td>';
        cols += '<td><input type="text" class="form-control" name = "ingrList" id="notes"/></td>'

        cols += '<td><input type="button" class="btnDel btn-danger" value="Remove Ingredient" id="removeIngredient"></td>';
        newRow.append(cols);
        $("table tbody").append(newRow);
        counter++;
    });

    // function which is called when class = btnDel is called (AKA Remove Ingredient button)
    $("table.ingr-list").on("click",".btnDel",function (event) {
        $(this).closest("tr").remove();       
        counter -= 1;
    });
});