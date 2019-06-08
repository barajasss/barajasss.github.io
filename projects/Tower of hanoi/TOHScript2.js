/*
pole 1 - left: 200px; bottom: 0px;
pole 2 - left: 400px; bottom: 0px;
pole 3 - left: 600px; bottom: 0px;
 
Program works mostly by using the values of poles array
Each disc has a value
The largest disc has a value of 0
while the smallest disc has a value of 7
these values of discs are stored and maintained in poles array

*/
var time={
	min: 0,
	sec: 0,
	milliSec: 0
};
var interval = setInterval(timer, 10);
var timeDisplay = document.getElementById("timeDisplay");

var i;
var disc; //a total of eight discs
var discLength = 30;
var moves = 0;
var target;
var offset = 327;
var polePos=0;
var active = false;
var poles=[[], [], []];
var poleElements = document.getElementsByClassName("pole");
var moved = false;
var poleBgColor = "#545";
var poleUpdateBgColor = "yellow";
var poleShadowActive = "1px 1px 5px 3px orange, -1px -1px 5px 3px orange";
var poleShadowDeactive = "none";
var pickSound = new Audio();
var putSound = new Audio();
pickSound.src = "pickUp.wav";
putSound.src = "putDown.wav";
//horizontal and vertical positions of poles/rods/towers
var hpos=[200, 400, 600];
var vpos = [
	0 * discLength,
	1 * discLength, 
	2 * discLength,
	3 * discLength,
	4 * discLength,
	5 * discLength,
	6 * discLength,
	7 * discLength,
];
var discs={
	total: 0,
	height: 30,
	width: [200, 175, 150, 125, 100, 75, 50, 25],
	colors: ["red", "orange", "yellow", "green", "skyblue", "blue", "olive", "maroon"]
};
var pos = [
	[
		{x: hpos[0] - Math.floor(discs.width[0]/2), y: vpos[0]}, {x: hpos[0] - Math.floor(discs.width[1]/2), y: vpos[1]},
		{x: hpos[0] - Math.floor(discs.width[2]/2), y: vpos[2]}, {x: hpos[0] - Math.floor(discs.width[3]/2), y: vpos[3]},
		{x: hpos[0] - Math.floor(discs.width[4]/2), y: vpos[4]}, {x: hpos[0] - Math.floor(discs.width[5]/2), y: vpos[5]},
		{x: hpos[0] - Math.floor(discs.width[6]/2), y: vpos[6]}, {x: hpos[0] - Math.floor(discs.width[7]/2), y: vpos[7]}
	],
	[
		{x: hpos[1] - Math.floor(discs.width[0]/2), y: vpos[0]}, {x: hpos[1] - Math.floor(discs.width[1]/2), y: vpos[1]},
		{x: hpos[1] - Math.floor(discs.width[2]/2), y: vpos[2]}, {x: hpos[1] - Math.floor(discs.width[3]/2), y: vpos[3]},
		{x: hpos[1] - Math.floor(discs.width[4]/2), y: vpos[4]}, {x: hpos[1] - Math.floor(discs.width[5]/2), y: vpos[5]},
		{x: hpos[1] - Math.floor(discs.width[6]/2), y: vpos[6]}, {x: hpos[1] - Math.floor(discs.width[7]/2), y: vpos[7]}
	],
	[
		{x: hpos[2] - Math.floor(discs.width[0]/2), y: vpos[0]}, {x: hpos[2] - Math.floor(discs.width[1]/2), y: vpos[1]},
		{x: hpos[2] - Math.floor(discs.width[2]/2), y: vpos[2]}, {x: hpos[2] - Math.floor(discs.width[3]/2), y: vpos[3]},
		{x: hpos[2] - Math.floor(discs.width[4]/2), y: vpos[4]}, {x: hpos[2] - Math.floor(discs.width[5]/2), y: vpos[5]},
		{x: hpos[2] - Math.floor(discs.width[6]/2), y: vpos[6]}, {x: hpos[2] - Math.floor(discs.width[7]/2), y: vpos[7]}
	]
];
var container = document.getElementsByClassName("container")[0];

discs.total = prompt("Enter the number of discs(max 7): ");
target = Math.pow(2, discs.total) - 1;
document.getElementById("display2").innerHTML = "Target: "+target;

for(i=0; i<discs.total; i++){
	disc = document.createElement('div');
	disc.setAttribute("class", "disc");
	disc.style.width = discs.width[i] + "px";
	disc.style.left = pos[0][i].x + "px";
	disc.style.bottom = pos[0][i].y + "px";
	poles[0].push(i);
	disc.style.backgroundColor = discs.colors[i];
	container.appendChild(disc);
}


//select the first element by default
var firstElement = document.getElementsByClassName("disc");
firstElement = firstElement[firstElement.length - 1];
firstElement.style.boxShadow = "1px 1px 1px 1px white, -1px -1px 1px 1px white";


//event listeners
document.addEventListener("keydown", function(e){
	if(e.keyCode == 37)
		moveLeft();
	else if(e.keyCode == 39)
		moveRight();
	else if(e.keyCode == 38)
		pickUp();
	else if(e.keyCode == 40)
		putDown();
}, false);

//function definitions

function moveLeft(){


	if(active){
		if(polePos == 0)
			polePos2 = 2;
		else
			polePos2 = polePos - 1;
		move();
	}

	else{
		if(polePos == 0)
			polePos = 2;
		else
			polePos-- ;
		

		while(poles[polePos].length == 0){	
			if(polePos == 0)
				polePos = 2;
			else{
				polePos-- ;
			}
		}
		select();
	}
}

function moveRight(){
	if(active){
		if(polePos == 2)
			polePos2 = 0;
		else
			polePos2 = polePos + 1;
		move();
	}
	else{
		if(polePos == 2)
			polePos = 0;
		else
			polePos++ ;
		
		while(poles[polePos].length == 0){
			if(polePos == 2)
				polePos = 0;
			else
				polePos++ ;	
		}
		select();
	}
}

function pickUp(){
	moved = false;
	if(!active){
		pickSound.play();
		active = true;
		elements = document.getElementsByClassName("disc");
		for(i=0; i<elements.length; i++){
			temp = elements[i].style.left.slice(0, elements[i].style.left.length-2);
			if(temp == pos[polePos][poles[polePos][poles[polePos].length-1]].x){

				temp = Number(elements[i].style.bottom.slice(0, elements[i].style.bottom.length-2));
				temp = offset;
				elements[i].style.bottom = temp + "px";
				poleElements[polePos].style.backgroundColor = poleUpdateBgColor;
				poleElements[polePos].style.boxShadow = poleShadowActive;
				break;
			}
		}
	}
}
function putDown(){
	if(active){
		putSound.play();
		active = false;
		elements = document.getElementsByClassName("disc");
		for(i=0; i<elements.length; i++){
			temp = elements[i].style.left.slice(0, elements[i].style.left.length-2);
			if(temp == pos[polePos][poles[polePos][poles[polePos].length-1]].x){
				if(check()){
					//temp = Number(elements[i].style.bottom.slice(0, elements[i].style.bottom.length-2));
					temp = pos[polePos][poles[polePos].length-1].y;
					elements[i].style.bottom = temp + "px";
					update();
					if(checkWin()){
						setTimeout(function(){ 
							if(moves == target){
								if(time.min > 0)
									Alert("","Excellent number of moves! You Won!!!\
											\nYou took "+time.min+" min and "+time.sec+" sec to complete.\
											\nClick Ok To play again.");
								else
									Alert("", "Excellent number of moves! You Won!!!\
											\nYou took "+time.sec+" seconds to complete.\
											\nClick Ok To play again.");

							}
							else{
								if(time.min > 0)
									Alert("", "Congrats! You Won!\
											\nYou took "+time.min+" min and "+time.sec+" sec to complete.\
											\nClick Ok To play again.");
								else
									Alert("", "Congrats! You Won!\
											\nYou took "+time.sec+" seconds to complete.\
											\nClick Ok To play again.");
							}
						}, 300);
						setTimeout(function(){
							reset();
						}, 400);
					}
				}
				else{
					Alert("Larger disc cannot be on top of smaller one");
				}
				break;
			}
		}
	}
}

function select(){
	var elements = document.getElementsByClassName("disc");
	for(i=0; i<elements.length; i++){
		elements[i].style.boxShadow = "none";
	}
	for(i=0; i<elements.length; i++){
		temp = elements[i].style.left;
		value = poles[polePos][poles[polePos].length-1]; //the top element of a pole
		if(temp.slice(0, temp.length - 2) == pos[polePos][value].x){
			elements[i].style.boxShadow = "1px 1px 1px 1px white, -1px -1px 1px 1px white";
			for(j=0; j<poleElements.length; j++){
				poleElements[j].style.backgroundColor = poleBgColor;
			}
			poleElements[polePos].style.backgroundColor = poleUpdateBgColor;
			break;
		}
	}
}

function move(){
	elements = document.getElementsByClassName("disc");
	for(i=0; i<elements.length; i++){
		temp = elements[i].style.left;
		value = poles[polePos][poles[polePos].length-1];

		if(temp.slice(0, temp.length - 2) == pos[polePos][value].x){
			//push the last element of polePos row then pop it
			poles[polePos2].push(value);
			elements[i].style.left = pos[polePos2][value].x + "px";	
			elements[i].style.bottom = offset + "px";
			poles[polePos].pop();
			if(polePos == polePos2) //erroneous code...
				moved = false;
			else
				moved = true;
			polePos = polePos2;	
			//change pole background colors
			for(i=0; i<poleElements.length; i++){
				poleElements[i].style.backgroundColor = poleBgColor;
				poleElements[i].style.boxShadow = poleShadowDeactive;		
			}
			poleElements[polePos].style.backgroundColor = poleUpdateBgColor;
			poleElements[polePos].style.boxShadow = poleShadowActive;			
			break;
		}
	}
}

function check(){
	discTop = poles[polePos][poles[polePos].length-1];
	discNext = poles[polePos][poles[polePos].length-2]
	if((discTop < discNext) && (poles[polePos].length > 1)){
		active = true;
		return 0;
	}
	return 1;
}

function checkWin(){
	for(i=1; i<discs.total; i++){
		if(poles[i].length == discs.total){
			return 1;
		}
	}
	return 0;
}

function update(){
	if(moved)
		moves++;
	document.getElementById("display").innerHTML = "Moves: "+moves;
	for(i=0; i<poleElements.length; i++){	
		poleElements[i].style.backgroundColor = poleBgColor;
		poleElements[i].style.boxShadow = poleShadowDeactive;
	}
}

function reset(){
	clearInterval(interval);
	time.min=0, time.sec=0, time.milliSec=0;
	interval = setInterval(timer, 10);
	elements = document.getElementsByClassName("disc");
	for(i=0; i<elements.length; i++){
		elements[i].style.left = pos[0][i].x + "px";
	}
	moves = 0;
	polePos = 0;
	poles=[[],[],[]];
	elements = document.getElementsByClassName("disc");
	//delete old discs
	for(i=0; i<discs.total; i++){
		container.innerHTML= '\
		<div id="pole1" class="pole"></div>\
		<div id="pole2" class="pole"></div>\
		<div id="pole3" class="pole"></div>';
	}

	discs.total = prompt("Enter the number of discs: ");
	console.log("discs.total: "+discs.total);
	target = Math.pow(2, discs.total) - 1;
	document.getElementById("display2").innerHTML = "Target: "+target;
	document.getElementById("display").innerHTML = "Moves: "+moves;



	for(i=0; i<discs.total; i++){
		disc = document.createElement('div');
		disc.setAttribute("class", "disc");
		disc.style.width = discs.width[i] + "px";
		disc.style.left = pos[0][i].x + "px";
		disc.style.bottom = pos[0][i].y + "px";
		poles[0].push(i);
		disc.style.backgroundColor = discs.colors[i];
		container.appendChild(disc);
	}
	document.getElementsByClassName("disc")[discs.total-1].style.boxShadow = "1px 1px 1px 1px white, -1px -1px 1px 1px white";
}


function timer(){
	time.milliSec++;
	if(time.milliSec == 99){
		time.sec++;
		time.milliSec = 0;
	}
	if(time.sec == 59){
		time.min++;
		time.sec = 0;
	}
	timeDisplay.innerHTML= time.min+" : "+time.sec+" : "+time.milliSec;
}

//buttons and event handlers

var left = document.getElementById("left");
var right = document.getElementById("right");
var up = document.getElementById("up");
var down = document.getElementById("down");

left.addEventListener("click", function(){
	moveLeft();
}, false);
right.addEventListener("click", function(){
	moveRight();
}, false);
up.addEventListener("click", function(){
	pickUp();
}, false);
down.addEventListener("click", function(){
	putDown();
}, false);