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
var i;
var disc; //a total of eight discs
var discLength = 30;
var moves = 0;
var target;
var offset = 27;
var polePos=0;
var active = false;
var poles=[[], [], []];
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

discs.total = prompt("Enter the number of discs: ");
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
		select(polePos);
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
		select(polePos);
	}
}

function pickUp(){
	if(!active){
		active = true;
		elements = document.getElementsByClassName("disc");
		for(i=0; i<elements.length; i++){
			temp = elements[i].style.left.slice(0, elements[i].style.left.length-2);
			if(temp == pos[polePos][poles[polePos][poles[polePos].length-1]].x){

				temp = Number(elements[i].style.bottom.slice(0, elements[i].style.bottom.length-2));
				temp += offset;
				console.log("elements[i].style.bottom: "+elements[i].style.bottom+"\ntemp: "+temp);
				elements[i].style.bottom = temp + "px";
				break;
			}
		}
	}
}
function putDown(){
	if(active){
		active = false;
		elements = document.getElementsByClassName("disc");
		for(i=0; i<elements.length; i++){
			temp = elements[i].style.left.slice(0, elements[i].style.left.length-2);
			if(temp == pos[polePos][poles[polePos][poles[polePos].length-1]].x){
				if(check()){
					temp = Number(elements[i].style.bottom.slice(0, elements[i].style.bottom.length-2));
					temp -= offset;
					elements[i].style.bottom = temp + "px";
					update();
					if(checkWin()){
						alert("You Won! Number of moves "+moves);
						reset();
					}
				}
				else{
					alert("Larger disc cannot be on top of smaller one");
				}
				break;
			}
		}
	}
}

function select(polePos){
	var elements = document.getElementsByClassName("disc");
	for(i=0; i<elements.length; i++){
		elements[i].style.boxShadow = "none";
	}
	//for(i=0; i<poles[polePos].length; i++){
	for(i=0; i<elements.length; i++){
		temp = elements[i].style.left;
		value = poles[polePos][poles[polePos].length-1];
		if(temp.slice(0, temp.length - 2) == pos[polePos][value].x)
			elements[i].style.boxShadow = "1px 1px 1px 1px white, -1px -1px 1px 1px white";
	}
	//}
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
			elements[i].style.bottom = (Number(pos[polePos2][poles[polePos2].length-1].y) + offset) + "px";
			poles[polePos].pop();
			polePos = polePos2;				
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
	for(i=0; i<discs.total; i++){
		if(poles[i].length == discs.total){
			return 1;
		}
	}
	return 0;
}

function update(){
	moves++;
	document.getElementById("display").innerHTML = "Moves: "+moves;
}

function reset(){
	elements = document.getElementsByClassName("disc");
	for(i=0; i<elements.length; i++){
		elements[i].style.left = pos[0][i].x + "px";
	}
	moves = 0;
	document.getElementById("display").innerHTML = "Moves: "+moves;
}