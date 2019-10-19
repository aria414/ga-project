$(function(){

  var numChar = 0;
  var text;
  var id = 1;      // increment the id of the paragraph to get next line
  var myVar;      // for setting time out
  var isChoice = false; // we don't have choices in the beginning so it is set to false.
  var numNextClicks = 0; // count how many times you click 'next' button.
  
  $("#start").click (startGame); // if you click the start button, game starts.
  $("#nextButton").click(getText);


  function startGame(){
    $("#start").css("display", "none"); //grab the html button and display none for now.

    $(".bgImage img").fadeOut("400", function(){
        $(".bgImage img").attr('src', "images/bg_002.jpg").fadeIn("300");
    });

    $(".textBox").fadeIn(1000);
  }


/* 
- If there are text, clear it.
 - Create the selector by concatinating the id with the words #p.
 - Grab text based on the id of that paragraph. Replace spaces. 
 - For browsers that do not support trim, the replace() works.
 - Display text in fancy typewriter style 
*/
  function getText(){
    clearText();                     
	
    var pID =  "#p" + id;             

    text = $(pID).text().replace("\n", "").replace(/\s{2,}/g, " ").trim();   
    console.log("Paragraph ID: " + pID + " text= " + text); // for debug...

    var str = text.substring(0,3); //check what the first 3 letters of the string is.

    if( str === "bg_" ){
      changeImage(text);    // if the first 3 letters are bg_ , text should be "bg_xxx.jpg" where x is the number of the image.
      text = "";            //clear text so the bg_img part won't show.
    }

    if(str === "chc"){
      displayChoice(text);
    }

   // displayText(); 

	
	myVar = setInterval(displayText, 25);
	numNextClicks ++;
	
	function displayText(){
		if(numChar==text.length) {
			clearInterval(myVar);
			myVar = 0; //zero means interval was cleared successfully.
			console.log("myVar is:" + myVar);
			id++; //move to next paragraph.
		} 
		
		if ( (numNextClicks % 2 == 0) && (myVar != 0) ) {
			$(".textBox p").html(text);
			clearInterval(myVar);
			myVar = 0;
			console.log("interval cleared. myVar is:" + myVar + " and numClicks is: " + numNextClicks);
			id++; //move to next paragraph.
		}
		if ( (numNextClicks % 2 > 0) && (myVar != 0) ){
			console.log("myVar is:" + myVar);
			$(".textBox p").append(text.substring(numChar, numChar+1));
			numChar++;
		}
		
	} //end of displayText()
/*	
	if ( (numNextClicks % 2 == 0) && (myVar != 0) ) {
		$(".textBox p").html(text);
		clearInterval(myVar);
		myVar = 0;
		console.log("interval cleared. myVar is:" + myVar + " and numClicks is: " + numNextClicks);
		
	}
	*/
  }

  
/*********** Function to return each character of the string ************/
/* 
 function character(start, end, text) {
    return text.substring(start, end);
  }
*/

  /*********** Function to display text in type-writer fashion************/
 /*
 function displayText() {

    //Append each character returned from the function above to the <p> inside the text area.
    //Delay that append by 25 each time so text look like its type.
    myVar = setTimeout(displayText, 25);
    $(".textBox p").append(character(numChar, numChar+1, text));
    numChar++;

    //Once counter hits the length of the string, we reach end of sentence.
    //Clear the time out so this function stops looping.
    if(numChar == text.length){
      clearTimeout(myVar);
	  
    }

  }*/
	
  /*********** Function to clear away any text in the text area ************/
  function clearText(){
    numChar = 0;
    $(".textBox p").text("");
    clearTimeout(myVar); //also clear timeout so it doesn't keep running.
  }

  /*********** Function switch backgorund image ************/
  function changeImage(bgImage){
    var image = bgImage;

    //must wait until fadeOut finish then do fadeIn
      $(".bgImage img").fadeOut(200, function(){
          $(".bgImage img").attr('src', "images/" + image).fadeIn(100);
      });

  }

  function displayChoice(choice){
    if(choice === "chc_01"){
      $(".choice").append("<button class='chcButton'>Choice 1</button> <button class='chcButton'>Choice 2</button>" )
    }
  }


}); //end of entire function.