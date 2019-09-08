var board=document.getElementById("board");
var leftBtn=document.getElementById("left");
var rightBtn=document.getElementById("right");
var upBtn=document.getElementById("up");
var downBtn=document.getElementById("down");
//original position or address of all the locations in the board. It is an array of arrays(a matrix)
var fixedAddress=[
	[{ x:0, y: 0}, { x: 80, y: 0}, { x:160, y: 0}, { x: 240, y: 0}, { x: 320, y: 0}],
	[{ x:0, y: 80}, { x: 80, y: 80}, { x:160, y: 80}, { x: 240, y: 80}, { x: 320, y: 80}],
	[{ x:0, y: 160}, { x: 80, y: 160}, { x:160, y: 160}, { x: 240, y: 160}, { x: 320, y: 160}],
	[{ x:0, y: 240}, { x: 80, y: 240}, { x:160, y: 240}, { x: 240, y: 240}, { x: 320, y: 240}],
	[{ x:0, y: 320}, { x: 80, y: 320}, { x:160, y: 320}, { x: 240, y: 320}, { x: 320, y: 320}]
];
var addressOccupied=[
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
];
//these array will store location/address of the pieces which are present
var locationArray=[];
var currentLocations=[];
var unit=80;
var max=0;
//loop counter variables and commonly used variables
var i, j, k, l, m, x, y, z, temp, ctr, ctr2;

//generate random number of start pieces from 3 to 5
var startPieces=Math.floor(Math.random()*3)+3;
initialize(startPieces);
console.table(addressOccupied);

//event listeners
document.addEventListener("keydown", function(e){
	move(e);
}, false);









//*************  FUNCTION DEFINITIONS *******************//

function initialize(n){
	console.log("initialized");
	board.innerHTML="";
	addressOccupied=[
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0]
	];
	for(i=0; i<n; i++){
		/*function to create an element and update the class name of it. The element is created
		 *at a random location.
		*/
		createRandomPiece('div', 'pieces _2');
	}
	console.log(document.getElementsByClassName("pieces").length);
}

//this is a function to create piece at a random location
function createRandomPiece(element, className){
	//console.log("Inside function");
	var piece=document.createElement(element);
	piece.setAttribute("class", className);
	do{
		var randX=Math.floor(Math.random()*5);
		var randY=Math.floor(Math.random()*5);
	}while(checkPiecePresence(randX, randY));
	var x=fixedAddress[randX][randY].x;
	var y=fixedAddress[randX][randY].y;
	//console.log("X: "+x+" Y: "+y);
	piece.style.left=x+"px";
	piece.style.top=y+"px";
	//add piece value and piece color
	piece.innerHTML=2;
	addressOccupied[randX][randY]=Number(piece.innerHTML);
	updateMax(addressOccupied[randX][randY]);
	board.appendChild(piece);
	//for animation
	setTimeout(function(){piece.style.transform="scale(1)";}, 100);
}

function checkPiecePresence(x, y){
	if(addressOccupied[x][y]!=0)
		return true;
	return false;
}

function selectPiece(pieces, val){
	for(var zz=0; zz<pieces.length; zz++){
		var xx=Number(pieces[zz].style.left.slice(0, pieces[zz].style.left.length-2));
		var yy=Number(pieces[zz].style.top.slice(0, pieces[zz].style.top.length-2));
		if(xx==val.x&&yy==val.y)
				return pieces[zz];
	}
}

function updateMax(val){
	ctr=1;
	if(val>max)
		max=val;
	if(max==2048&&ctr==1){
		alert("Congratulations!!! You have reached 2048. Let's see how far you can go...");
		ctr++;
	}
}

function checkGameOver(){
	ctr2=0;
	for(var i=0; i<addressOccupied.length; i++)
		for(var j=0; j<addressOccupied.length; j++)
			if(addressOccupied[i][j]!=0)
				ctr2++;
	if(ctr2==addressOccupied.length*addressOccupied.length){
		setTimeout(function(){alert("Game Over");}, 100);
		startPieces=Math.floor(Math.random()*3)+3;
		initialize(startPieces);
	}
}
//this function moves the pieces
function move(e){
	if(e.keyCode==37){
		moveLeft();
		checkGameOver();
	}
	else if(e.keyCode==38){
		moveUp();
		checkGameOver();
	}
	else if(e.keyCode==39){
		moveRight();
		checkGameOver();
	}
	else if(e.keyCode==40){
		moveDown();
		checkGameOver();
	}
}
leftBtn.addEventListener("click", function(){
	moveLeft();
	checkGameOver();
}, false);
rightBtn.addEventListener("click", function(){
	moveRight();
	checkGameOver();
}, false);
upBtn.addEventListener("click", function(){
	moveUp();
	checkGameOver();
}, false);
downBtn.addEventListener("click", function(){
	moveDown();
	checkGameOver();
}, false);

function moveLeft(){
	var pieces=document.getElementsByClassName("pieces");
	var piece, piece2, parent, moved=false;
	//this loop runs the number of times there are pieces so as to move all the pieces.
	for(i=0; i<pieces.length; i++){
		//loops to update address occupied
		for(j=0; j<addressOccupied.length; j++){
			label:for(k=0; k<addressOccupied.length; k++){
				if(addressOccupied[j][k]!=0){
					//inner loop to select the particular piece that matches the addressOccupied array's location
					piece=selectPiece(pieces, fixedAddress[j][k]);

					for(l=0; l<addressOccupied.length; l++){
						if(addressOccupied[j][l]==0&&l<=k||(k>0&&addressOccupied[j][k]==addressOccupied[j][k-1])){
							
							if((l-1)>0&&(addressOccupied[j][k]+addressOccupied[j][l-1])==addressOccupied[j][l-2]){
								addressOccupied[j][l-1]=addressOccupied[j][l-1]+addressOccupied[j][k];
								addressOccupied[j][k]=0;
								piece2=selectPiece(pieces, fixedAddress[j][l-1]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.left=fixedAddress[j][l-1].x+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[j][l-1]);
								updateMax(addressOccupied[j][l-1]);
								piece.innerHTML=addressOccupied[j][l-1];
								moved=true;
								continue;
							}
							else if(k>0&&addressOccupied[j][k]==addressOccupied[j][k-1]){
								
								addressOccupied[j][k-1]=addressOccupied[j][k-1]+addressOccupied[j][k];
								addressOccupied[j][k]=0;
								piece2=selectPiece(pieces, fixedAddress[j][k-1]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.left=fixedAddress[j][k-1].x+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[j][k-1]);
								updateMax(addressOccupied[j][k-1]);
								piece.innerHTML=addressOccupied[j][k-1];
								moved=true;

								
							}
							else if(l>0&&addressOccupied[j][k]==addressOccupied[j][l-1]){
								addressOccupied[j][l-1]=addressOccupied[j][l-1]+addressOccupied[j][k];
								addressOccupied[j][k]=0;
								piece2=selectPiece(pieces, fixedAddress[j][l-1]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.left=fixedAddress[j][l-1].x+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[j][l-1]);
								updateMax(addressOccupied[j][l-1]);
								piece.innerHTML=addressOccupied[j][l-1];
								moved=true;
							}
							else{
								temp=addressOccupied[j][k];
								addressOccupied[j][k]=addressOccupied[j][l];
								addressOccupied[j][l]=temp;
								piece.style.left=fixedAddress[j][l].x+"px";
								piece.style.top=fixedAddress[j][l].y+"px";
								moved=true;
							}
							break label;
						}
					}
				}
			}
		}
	}
	if(moved){
		createRandomPiece('div', 'pieces _2');
		console.table(addressOccupied);
		console.log("Pieces "+pieces.length);
		console.log("Max: "+max);
	}
}










function moveUp(){
	var pieces=document.getElementsByClassName("pieces");
	var piece, piece2, parent, moved=false;
	//this loop runs the number of times there are pieces so as to move all the pieces.
	for(i=0; i<pieces.length; i++){
		//loops to update address occupied
		for(j=0; j<addressOccupied.length; j++){
			label:for(k=0; k<addressOccupied.length; k++){
				if(addressOccupied[k][j]!=0){
					//inner loop to select the particular piece that matches the addressOccupied array's location
					piece=selectPiece(pieces, fixedAddress[k][j]);

					for(l=0; l<addressOccupied.length; l++){
						if(addressOccupied[l][j]==0&&l<=k||(k>0&&addressOccupied[k][j]==addressOccupied[k-1][j])){
							
							if((l-1)>0&&(addressOccupied[k][j]+addressOccupied[l-1][j])==addressOccupied[l-2][j]){
								console.log("inside");
								addressOccupied[l-1][j]=addressOccupied[l-1][j]+addressOccupied[k][j];
								addressOccupied[k][j]=0;
								piece2=selectPiece(pieces, fixedAddress[l-1][j]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.top=fixedAddress[l-1][j].y+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[l-1][j]);
								updateMax(addressOccupied[l-1][j]);
								piece.innerHTML=addressOccupied[l-1][j];
								moved=true;
								continue;
							}
							else if(k>0&&addressOccupied[k][j]==addressOccupied[k-1][j]){	
								addressOccupied[k-1][j]=addressOccupied[k-1][j]+addressOccupied[k][j];
								addressOccupied[k][j]=0;
								piece2=selectPiece(pieces, fixedAddress[k-1][j]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.top=fixedAddress[k-1][j].y+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[k-1][j]);
								updateMax(addressOccupied[k-1][j]);
								piece.innerHTML=addressOccupied[k-1][j];
								moved=true;

								
							}
							else if(l>0&&addressOccupied[k][j]==addressOccupied[l-1][j]){
								addressOccupied[l-1][j]=addressOccupied[l-1][j]+addressOccupied[k][j];
								addressOccupied[k][j]=0;
								piece2=selectPiece(pieces, fixedAddress[l-1][j]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.top=fixedAddress[l-1][j].y+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[l-1][j]);
								updateMax(addressOccupied[l-1][j]);
								piece.innerHTML=addressOccupied[l-1][j];
								moved=true;
							}
							else{
								temp=addressOccupied[k][j];
								addressOccupied[k][j]=addressOccupied[l][j];
								addressOccupied[l][j]=temp;
								piece.style.left=fixedAddress[l][j].x+"px";
								piece.style.top=fixedAddress[l][j].y+"px";
								moved=true;
							}
							break label;
						}
					}
				}
			}
		}
	}
	if(moved){
		createRandomPiece('div', 'pieces _2');
		console.table(addressOccupied);
		console.log("Pieces "+pieces.length);
		console.log("Max: "+max);
	}
}















function moveRight(){
	var pieces=document.getElementsByClassName("pieces");
	var piece, piece2, parent, moved=false;
	//this loop runs the number of times there are pieces so as to move all the pieces.
	for(i=0; i<pieces.length; i++){
		//loops to update address occupied
		for(j=0; j<addressOccupied.length; j++){
			label:for(k=addressOccupied.length-1; k>=0; k--){
				if(addressOccupied[j][k]!=0){
					//inner loop to select the particular piece that matches the addressOccupied array's location
					piece=selectPiece(pieces, fixedAddress[j][k]);

					for(l=addressOccupied.length-1; l>=0; l--){
						if(addressOccupied[j][l]==0&&l>=k||(k<addressOccupied.length-1&&addressOccupied[j][k]==addressOccupied[j][k+1])){
							
							if((l+1)<addressOccupied.length-1&&(addressOccupied[j][k]+addressOccupied[j][l+1])==addressOccupied[j][l+2]){
								addressOccupied[j][l+1]=addressOccupied[j][l+1]+addressOccupied[j][k];
								addressOccupied[j][k]=0;
								piece2=selectPiece(pieces, fixedAddress[j][l+1]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.left=fixedAddress[j][l+1].x+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[j][l+1]);
								updateMax(addressOccupied[j][l+1]);
								piece.innerHTML=addressOccupied[j][l+1];
								moved=true;
								continue;
							}
							else if(k<addressOccupied.length-1&&addressOccupied[j][k]==addressOccupied[j][k+1]){
								
								addressOccupied[j][k+1]=addressOccupied[j][k+1]+addressOccupied[j][k];
								addressOccupied[j][k]=0;
								piece2=selectPiece(pieces, fixedAddress[j][k+1]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.left=fixedAddress[j][k+1].x+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[j][k+1]);
								updateMax(addressOccupied[j][k+1]);
								piece.innerHTML=addressOccupied[j][k+1];
								moved=true;

								
							}
							else if(l<addressOccupied.length-1&&addressOccupied[j][k]==addressOccupied[j][l+1]){
								addressOccupied[j][l+1]=addressOccupied[j][l+1]+addressOccupied[j][k];
								addressOccupied[j][k]=0;
								piece2=selectPiece(pieces, fixedAddress[j][l+1]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.left=fixedAddress[j][l+1].x+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[j][l+1]);
								updateMax(addressOccupied[j][l+1]);
								piece.innerHTML=addressOccupied[j][l+1];
								moved=true;
							}
							else{
								temp=addressOccupied[j][k];
								addressOccupied[j][k]=addressOccupied[j][l];
								addressOccupied[j][l]=temp;
								piece.style.left=fixedAddress[j][l].x+"px";
								piece.style.top=fixedAddress[j][l].y+"px";
								moved=true;
							}
							break label;
						}
					}
				}
			}
		}
	}
	if(moved){
		createRandomPiece('div', 'pieces _2');
		console.table(addressOccupied);
		console.log("Pieces "+pieces.length);
		console.log("Max: "+max);
	}
}








function moveDown(){
	var pieces=document.getElementsByClassName("pieces");
	var piece, piece2, parent, moved=false;
	//this loop runs the number of times there are pieces so as to move all the pieces.
	for(i=0; i<pieces.length; i++){
		//loops to update address occupied
		for(j=0; j<addressOccupied.length; j++){
			label:for(k=addressOccupied.length-1; k>=0; k--){
				if(addressOccupied[k][j]!=0){
					//inner loop to select the particular piece that matches the addressOccupied array's location
					piece=selectPiece(pieces, fixedAddress[k][j]);

					for(l=addressOccupied.length-1; l>=0; l--){
						if(addressOccupied[l][j]==0&&l>=k||(k<addressOccupied.length-1&&addressOccupied[k][j]==addressOccupied[k+1][j])){
							
							if((l+1)<addressOccupied.length-1&&(addressOccupied[k][j]+addressOccupied[l+1][j])==addressOccupied[l+2][j]){
								console.log("inside");
								addressOccupied[l+1][j]=addressOccupied[l+1][j]+addressOccupied[k][j];
								addressOccupied[k][j]=0;
								piece2=selectPiece(pieces, fixedAddress[l+1][j]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.top=fixedAddress[l+1][j].y+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[l+1][j]);
								updateMax(addressOccupied[l+1][j]);
								piece.innerHTML=addressOccupied[l+1][j];
								moved=true;
								continue;
							}
							else if(k<addressOccupied.length-1&&addressOccupied[k][j]==addressOccupied[k+1][j]){	
								addressOccupied[k+1][j]=addressOccupied[k+1][j]+addressOccupied[k][j];
								addressOccupied[k][j]=0;
								piece2=selectPiece(pieces, fixedAddress[k+1][j]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.top=fixedAddress[k+1][j].y+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[k+1][j]);
								updateMax(addressOccupied[k+1][j]);
								piece.innerHTML=addressOccupied[k+1][j];
								moved=true;

								
							}
							else if(l<addressOccupied.length-1&&addressOccupied[k][j]==addressOccupied[l+1][j]){
								addressOccupied[l+1][j]=addressOccupied[l+1][j]+addressOccupied[k][j];
								addressOccupied[k][j]=0;
								piece2=selectPiece(pieces, fixedAddress[l+1][j]);
								parent=piece2.parentNode;
								parent.removeChild(piece2);
								piece.style.top=fixedAddress[l+1][j].y+"px";
								piece.setAttribute("class", "pieces _"+addressOccupied[l+1][j]);
								updateMax(addressOccupied[l+1][j]);
								piece.innerHTML=addressOccupied[l+1][j];
								moved=true;
							}
							else{
								temp=addressOccupied[k][j];
								addressOccupied[k][j]=addressOccupied[l][j];
								addressOccupied[l][j]=temp;
								piece.style.left=fixedAddress[l][j].x+"px";
								piece.style.top=fixedAddress[l][j].y+"px";
								moved=true;
							}
							break label;
						}
					}
				}
			}
		}
	}
	if(moved){
		createRandomPiece('div', 'pieces _2');
		console.table(addressOccupied);
		console.log("Pieces "+pieces.length);
		console.log("Max: "+max);
	}
}