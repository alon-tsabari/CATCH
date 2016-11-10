 // DEFINING ELEMENTS;

var body = document.querySelector('body');

 // COUNTING SCORE; 
var mistake = 0;
var count = 0;
var score = document.querySelector('span');
var value = document.querySelector('.value');

 // CONTAINER-DIV;
var container = document.querySelector('.container');
 // BOXES;
var boxesContainer = document.querySelector('.boxes');
var boxes = document.querySelectorAll('.box');

 // CLEAR-BUTTON;
var clearButton = document.querySelector('.clear');

 // CLOCK-ELEMENT
 var clock = document.querySelector('.clock');
 var time = document.querySelector('.time');


 // CREATED-ELEMENTS ************************* CREATED-ELEMENTS ***//;

     // POINTS;
 var points = document.createElement('p');
     points.className = 'points';
     
     // WRAPPER;
 var wrapper = document.createElement('div');
     wrapper.className = 'wrapper';
     
     // USERINTERFACE;
 var userInterface = document.createElement('div');
 	 userInterface.className = 'userInterface';
     
 var h3 = document.createElement('h3');
     h3.innerHTML = 'Please type your name:';
 
 var x = document.createElement('input');
     x.setAttribute("type", "text"); 

 var button = document.createElement('button'); 	 
     button.className = 'button';
     button.disabled = true;
     
     // LOST - MODE;
var lostMode = document.createElement('div');
	lostMode.className = 'lostMode';

var lostTxt = document.createElement('h3');

var lostRematch = document.createElement('button');
	lostRematch.className = 'button';
	lostRematch.innerHTML = 'Rematch';

    // PAUSE - MODE;
var pauseMode =  document.createElement('div');
	pauseMode.className = 'pauseMode';

var pauseTxt = document.createElement('h3');

var keepPlayBtn = document.createElement('button'); 	 
    keepPlayBtn.className = 'button keepPlay';

	// GOING BACK TO MAIN PAGE;
var backToMain = document.createElement('a');
	 backToMain.innerHTML = 'Back to main page';
	 backToMain.className = 'mainPage button';
	 backToMain.setAttribute("href", "main.html");

	 // PAUSE - ICON;
var pause = document.createElement('p');
	pause.innerHTML = '&#10074 &#10074;';
	pause.className = 'pause animated bounceInDown';

	// STRIKES AND STRIKES-HOLDER;
var strikesHolder = document.createElement('div');
	strikesHolder.className = 'strikesHolder';

var strikeSign = document.createElement('span');

 // EMPTY-VARIABLES;
var counter;
var seconds;



   // ************************************---> FUNCTIONS <---****************************************;
 
  // *************************---> CALCULATIONS <---*************************;


var calculate = {
	randomNum: function(start, end) {
		var range = (end - start) + 1;
		var random = Math.floor(Math.random() * range) + start;
		return random;
	},

	changingColor: function() {
	var red = calculate.randomNum(50,256);
	var green = calculate.randomNum(50,256);
	var blue = calculate.randomNum(50,256);
	
	if(count > 10) {
		setTimeout(function() {
			body.style.backgroundColor = 'rgb(256,86,77)';
			clock.style.backgroundColor = 'rgb(256,86,77)';
		}, 500); body.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
				 clock.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
	}
  } 
};

	// *************************---> RESET - OBJECT <---**********************************;


var resetFunctions = {
	clear: function(e) {
		if(e.target.classList.value === 'boxes') {
			return;
		};

			// RESET THE MISTAKES TO ZERO;
		mistake = 0;
		strikeSign.innerHTML = '';
	         // RESET THE SCORE TO ZERO;
		count = 0;
		score.innerHTML = count;

	         // RESET THE SECONDS TO ZERO;
	   	seconds = 0;
		time.innerHTML = seconds + 's';
		clearInterval(counter);	

		     // ATTACH THE CLASS- 'BOX' TO EACH ONE OF THE BOXES;
		mainFunctions.shuffle();
		
		    // FOR 500 MS THE COLOR OF THE BODY'S BACKGROUND BECOME 'TOMATO' COLOR;
		setTimeout(function() {
			body.style.backgroundColor = 'rgb(256,86,77)';
			clock.style.backgroundColor = 'rgb(256,86,77)';
		}, 500), body.style.backgroundColor = 'rgb(206,46,47)';
				 clock.style.backgroundColor = 'rgb(206,46,47)';
	     
	        // FOR 500 MS THE '.VALUE' GET A 'BOUNCE-IN' ANIMATION;
		setTimeout(function() {
			value.className = 'value';
		}, 1000), value.className = 'value animated bounceIn';
	},

	rematch: function() {
		pause.innerHTML = '&#10074 &#10074;';
		pause.className = 'pause animated bounceIn';

		count = 0;
		mistake = 0;
		seconds = 0;
		score.innerHTML = count;
		time.innerHTML = seconds + 's';
		strikeSign.innerHTML = '';

		for(var i = 0; i < boxes.length; i++) {
			if(i === 0) {
				boxes[i].className = 'box winner';
			}else {
				boxes[i].className = 'box';
			}
		}

		clearInterval(counter);
	}
};

	// *************************---> SHOW - HIDE - OBJECT <--- *************************;

	var showHideFunctions =  {
		userInterface: function() {
	    	userInterface.appendChild(h3);
	    	userInterface.appendChild(x);
	    	button.innerHTML = "Let's Play!";
	    	userInterface.appendChild(button);
	    	userInterface.appendChild(backToMain);
	    	wrapper.appendChild(userInterface);
	    	body.appendChild(wrapper);

	    	wrapper.className = 'wrapper animated bounceInRight';
	    },

	    lostMode: function() {
    	    lostTxt.innerHTML = '<p class="sorry">Sorry ' + x.value + ',</p><br> you ran out of strikes,<br> your high-score is: ' + count + 'pts';
		    wrapper.innerHTML = '';

		    lostMode.appendChild(lostTxt);
		    lostMode.appendChild(lostRematch);
		    lostMode.appendChild(backToMain);
		    wrapper.appendChild(lostMode);

		    wrapper.className = 'wrapper animated bounceInDown';
		    disabled();
	    },

	    pauseMode: function() {
			pauseTxt.innerHTML = '<p class="sorry">Hi ' + x.value + ',</p><br> your score is: ' + count + 'pts';
			keepPlayBtn.innerHTML = 'Keep Playing';
			wrapper.innerHTML = '';

			pauseMode.appendChild(pauseTxt);
			pauseMode.appendChild(keepPlayBtn);
			pauseMode.appendChild(lostRematch);
			pauseMode.appendChild(backToMain);
			wrapper.appendChild(pauseMode);

			wrapper.className = 'wrapper animated bounceInDown';
		},

		hide: function() {
			body.appendChild(pause);
			wrapper.className = 'wrapper animated fadeOutUp';
		},

		showPoints: function() {
			points.innerHTML = pointsDirection;
			value.appendChild(points);
	        
		    setTimeout(function() {
		    	points.style.top = '0px';
		    	points.className = 'points';
		    	points.style.opacity = 0;
		    }, 300),points.style.opacity = 1;
		    		points.className = 'points animated fadeOutUp';
			       
			       	  setTimeout(function() {
					  score.className = '';
					  }, 300), score.className = 'animated bounceIn';

			score.innerHTML = count;
		}

};

	// ****************---> LEEVEL - UP - OBJECT  <---****************;

var counting = {
	countingSeconds: function() {
	       if(count > 0) {
	       	if(seconds === 1) {			
				mainFunctions.shuffle();
				counting.secondsLevel();
				time.innerHTML = seconds + 's';
				counting.countLevel();
				
				setTimeout(function() {
				score.className = '';	
				score.style.color = 'black';
				}, 500), score.className = 'animated bounceIn';
						 score.style.color = 'red';
				
				
				score.innerHTML = count;

				lost.loser();
			}else {
				seconds -= 1;
				time.innerHTML = seconds + 's';
			}
	       }
		},

	countLevel: function() {
		   	if(count <= 5) {
				count -= 5;
				pointsDirection = '-5';
				clearInterval(counter);
			}else if(count <= 10) {
				count -= 10;
				pointsDirection = '-10';
				mainFunctions.shuffle();
				clearInterval(counter);
			}else if(count < 50) {
				count -= 10;
				pointsDirection = '-10';
			}else if(count < 100) {
				count -= 15;
				pointsDirection = '-15';
			}else {
				count -= 20;
				pointsDirection = '-20';
			}
			points.innerHTML = pointsDirection;
			points.style.color = 'red';
			 

			setTimeout(function() {
		    	points.style.top = '0px';
		    	points.className = 'points';
		    	points.style.opacity = 0;
		    }, 300),points.style.opacity = 1;
		    		points.className = 'points animated fadeOutUp';
	 
		},

	secondsLevel: function() {
				if(count < 50) {
					seconds = 3;
				}else if(count < 100) {
					seconds = 2;
				}else if(count > 200) {
					seconds = 1;
				}
		}
};


// ****************---> LOST - OBJECT <---****************;

var lost = {
	loser: function() {
		if(mistake === 3) {
			clearInterval(counter);
    	
    	for(var i = 0; i < boxes.length; i++) {
    		if(i === 0) {
    			boxes[i].className = 'box winner';
    		}else {
    			boxes[i].className = 'box';
    	}
    	}   	

    	  // LOST-MODE;
    	showHideFunctions.lostMode();	
	  	
     }
	},

	strikes: function() {
		container.appendChild(strikesHolder);
		setTimeout(function() {
			strikeSign.className = 'strike';
		}, 500), strikeSign.className = 'strike animated bounceIn';

		strikeSign.innerHTML += '&cross;';
		strikesHolder.appendChild(strikeSign); 
	}
};


// ****************---> PLAY-PAUSE-FUNCTIONS <---****************;


var playPause = {
	backToGame: function() {	
		setTimeout(function() {
				pause.className = 'play';
				}, 500), pause.className = 'play animated bounceIn';

				showHideFunctions.hide();	
	},

	playAndPause: function() {
		if(!seconds) {
			seconds = 0;
		}

		if(pause.classList.contains('pause')) {
			pause.innerHTML = '&#9658;'
			setTimeout(function() {
				pause.className = 'play';
			}, 500), pause.className = 'play animated bounceIn';

			clearInterval(counter);
			showHideFunctions.pauseMode();
		}else {
			pause.innerHTML = '&#10074 &#10074;';
			setTimeout(function() {
				pause.className = 'pause';
				}, 500), pause.className = 'pause animated bounceIn';
			
			seconds = 3;
			time.innerHTML = seconds + 's';
			
			counter = setInterval(counting.countingSeconds, 600);	
		}
	}

};


  // ****************---> MAIN - OBJECT <---****************; 

var mainFunctions = {
	shuffle: function() {
			var winner = document.querySelector('.winner');
				winner.classList.remove('winner');
			var i = calculate.randomNum(0,3);
				boxes[i].classList.add('winner');

				if(count <= 5) {
					for(var i = 0; i < boxes.length; i++) {
				    	if(i === 0) {
				    		boxes[i].className = 'box winner';
				    	}else {
				    		boxes[i].className = 'box';
				    	}
				    }
				}
	},

	main: function(e) {
		if(!e.target.classList.contains('box')) {
			return;
		}

		if(e.target.classList.contains('box') && pause.classList.contains('play')) {
			setTimeout(function() {
				pause.className = 'play';
			}, 500), pause.className = 'play animated bounceIn';
			return;
		}

		var box = e.target;
		if(box.classList.contains('winner')) {
			setTimeout(function() {
			score.style.color = 'black';
			},200), score.style.color = 'green';

			count += 5;
			pointsDirection = '+5';
			points.style.color = 'green';
		}else {
			setTimeout(function() {
			score.style.color = 'black';
			},200), score.style.color = 'red';

			count -= 5;
			mistake += 1;
			lost.strikes();
			pointsDirection = '-5';
			points.style.color = 'red';
		}
		if(e.target.className === 'box' && count <= -5) {
			count = 0;
		}

		   // PRINITNG-FUNCTION;
		showHideFunctions.showPoints();

		   // CHECKING IF THE THE USER LOST [STRIKES = 3];
		lost.loser();

		   // MOVING THE 'WINNER' CLASS FROM BOX TO OTHER;
		mainFunctions.shuffle();

		  // TIMING-FUNCTIONS;
		counting.secondsLevel();
		time.innerHTML = seconds + 's';
		clearInterval(counter);
		if(mistake != 3 && count > 0) {
			counter = setInterval(counting.countingSeconds, 600);
		}
		
		calculate.changingColor();
	}

};


// ****************---> EXTERNAL - FUNCTIONS; <---****************;

       // MIN-LENGTH OF USER'S NAME;
	function nameOfUser() {
		if(x.value.length >= 2) {
			button.className = 'button hover';
			button.disabled = false;
		}else {
			button.className = 'button';
			button.disabled = true;
		}
	};

	  // DISABLE THE BUTTONS IN THE LOST-MODE FOR 500MS WHEN IT APPEARS;
	function disabled() {
		setTimeout(function() {
			lostMode.childNodes[1].disabled = false;
			backToMain.style.pointerEvents =  'auto';
		}, 400), lostMode.childNodes[1].disabled = true;
			backToMain.style.pointerEvents =  'none';
	};



 // EXECUTE;
window.onload = showHideFunctions.userInterface();

	// CLEAR EVERYTHING;
clearButton.addEventListener('click', resetFunctions.clear);

	// PLAYING THE GAME;
boxesContainer.addEventListener('click', mainFunctions.main);

	// MAIN-PLAY-MODE BUTTON --> 'LET'S PLAY!';
button.addEventListener('click', showHideFunctions.hide);

	// LOST-MODE BUTTON --> 'REMATCH';
lostRematch.addEventListener('click', showHideFunctions.hide);

	// CLICK ON THE INPUT;
x.addEventListener('click', nameOfUser);
x.addEventListener('keyup', nameOfUser);

	// CHANGING THE CONTENT OF THE PLAY/PAUSE BUTTON;
pause.addEventListener('click', playPause.playAndPause);
	
	// RETURN TO THE GAME-MODE;
keepPlayBtn.addEventListener('click', playPause.backToGame);
	
	// RESET THE SCORE AND COUNTING SECONDS;
lostRematch.addEventListener('click', resetFunctions.rematch);
