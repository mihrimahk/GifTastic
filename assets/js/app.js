
//array of things 
var somethingArray=["Cows","Cats","Dogs","Shows"];


//dispaying buttons in the array
function renderButtons(){
	//emptying button panel
	console.log(somethingArray);
	$(".btn-div").empty();
	//looping through the array and dynamically creating a button to each element in the array
	for(var i = 0; i < somethingArray.length; i++){
		var button = $("<button>");
		button.addClass("somethingButton");
		button.attr("data-something",somethingArray[i]);
		button.text(somethingArray[i]);

		//add button to HTML
		$(".btn-div").append(button);
	}//end for loop
} //end renderButtons



//event handler for user to add more buttons
$("#add-something").on("click", function(event) {

	event.preventDefault();
	//get input from text box
	var something = $("#search-input").val().trim();
	//adding the text to the array in order to creat the button 
	somethingArray.push(something);
	$("#search-input").val("");

	renderButtons();

}); //end function(event)



//fetching gifs from api
function fetchSomethingGifs() {
  //get element from array when button is clicked 
  var somethingName = $(this).attr("data-something");
	var somethingStr = somethingName.split(" ").join("+");	
	var apiKey = "nFzbPiWfpGxN4XYIBTxwkzdnTfR6LxJ1";
	var listLimit = "10";
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + somethingStr + "&limit=" + listLimit + "&offset=0&rating=G&lang=en";
  // AJAX call giphy api
  $.ajax({
		url:queryURL,
    method:"GET",
  }).done(function(results) {
  	//get results from array
  	var dataArray = results.data;
  	//creat and display div elements for each one of the returned Gifs
  	$(".img-div").empty();
    for (var i = 0; i < dataArray.length; i++) {

    	var newDiv = $("<div>");
      	newDiv.addClass("somethingGif");

      	var newRating = $("<h5>").html("Rating: " + dataArray[i].rating);
     

     	var img = $("<img>");
     	img.attr("src", dataArray[i].images.fixed_height_still.url);
      img.attr("data-still", dataArray[i].images.fixed_height_still.url);
     	img.attr("data-animate", dataArray[i].images.fixed_height.url);
			img.attr("data-state", "still");
			img.attr("height", "200");

     	 newDiv.append(img,newRating);

      // display ne gifs on the top 
      $(".img-div").append(newDiv);
    }//end for loop

  });//end function result

}//end fetchSomethingGifs

//create a function to animate still gifs and stop
function animateGifs() {
  
  var state = $(this).find("img").attr("data-state");

  if (state === "still") 
  {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } 
  else 
  {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }

}//end animatGifs

$(document).ready(function() {
  renderButtons();
});
//event handler to fetch gifs
$(document).on("click", ".somethingButton", fetchSomethingGifs);
//event handler to animate and stop gifs
$(document).on("click", ".somethingGif", animateGifs);

