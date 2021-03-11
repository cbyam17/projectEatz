function showSearchBox() {
	
	//get the nav bar element (<ul>)
	var navBar = document.getElementById("navBar");
	
	//check to see if there's already a search box, and remove it
	var existingSearchBox = document.getElementById("searchBox");
	console.log(existingSearchBox);
	if (existingSearchBox !== null){
		navBar.removeChild(existingSearchBox);
	}
	
	//if there's no search box displayed, add it
	else{
	  var listItem = document.createElement("li");
	  listItem.id = "searchBox";
	  listItem.className = "nav-bar-li";
	  listItem.style.float = "right";
	  var a = document.createElement("a");
	  var searchBox = document.createElement("input");
	  searchBox.type = "text";
	  a.appendChild(searchBox);
	  listItem.appendChild(a);
	  navBar.appendChild(listItem);
	}
}