var input = document.getElementById("input");
var wordDisplay = document.getElementById("word-display");
var timeDisplay = document.getElementById("time-display");
var scoreDisplay = document.getElementById("score-display");
var switchBtn = document.getElementById("switch");
var switchBtnContainer = document.getElementById("switch-container");
var stylesheet = document.getElementById("stylesheet");
var words = [
	"kurzgesagt", "sunflower", "ladybug", "tortoise",
	"cauliflower", "pineapple", "hailstorm", "earthquake",
	"watermelon", "jackfruit", "microsoft", "javascript",
	"aloevera", "thermometer", "chemistry", "electricity",
	"australia", "halloween", "psychology", "development",
	"jellyfish", "astronaut", "technology", "dinosaur",
	"building", "scissor", "armadillo", "avocado",
	"raspberry", "strawberry", "diamond", "cockroach",
	"butterfly", "countryside", "university", "dictionary",
	"chicken", "pyramid", "peacock", "keyboard",
	"turquoise", "ostrich", "penguin", "hyderabad",
	"mongoose", "cupboard", "utensil", "smoothie",
	"hamburger", "spectacle", "rainbow", "helicopter",
	"aeroplane", "calendar", "mountain", "everything",
	"toothpaste", "thermocol", "sandwich", "economics",
	"xylophone", "mustache", "sparrow", "elephant",
	"emerald", "anaconda", "honeycomb", "complex", 
	"icecream", "lamination", "creativity", "hibiscus"
];
var start = false
var activeIndex = 0;
var activeWord;
var time;
var score;
var level;


switchBtnContainer.addEventListener("click", switchNightMode, false);

function switchNightMode(){
	if(switchBtn.style.left === "50%"){
		//switch off now
		stylesheet.setAttribute("href", "daymode.css");
		input.focus();
		switchBtn.style.left = "0%";
	}
	else{
		stylesheet.setAttribute("href", "nightmode.css");
		input.focus();
		switchBtn.style.left = "50%";
	}
}











input.addEventListener("input", handleInput, false);
init();






function handleInput(){
	if(!start){
		start = true;
		startInterval();
	}
	else{
		if(checkCorrect()){
			input.value = "";
			score++;
			scoreDisplay.innerHTML = score;
			updateWord();
		}
		else if(checkGameOver()){
			gameOver();
		}
	}
}
function updateWord(){
	activeIndex = Math.floor(Math.random() * words.length);
	activeWord = words[activeIndex];
	wordDisplay.innerHTML = activeWord;
}
function checkCorrect(){
	if(input.value === activeWord){
		updateTime();
		return true;
	}
	else{
		return false;
	}
}
function updateTime(){
	switch(Number(level)){
		case 1: time = 6;
				break;
		case 2: time = 5;
				break;
		case 3: time = 4;
				break;
		case 4: time = 3;
				break;
		default:time = 5;
				break;
	}
	console.log("time: "+time+", level: "+level);
	timeDisplay.innerHTML = time;
}
function checkGameOver(){
	if(time <= 0){
		return true;
	}
	else{
		return false;
	}
}
function gameOver(){
	start = false;
	alert("game over. Your score is "+score);
	init();
}
function init(){
	level = prompt("Enter your option(1-3): 1. Novice, 2. Ace, 3. Professional, 4. Typing Master");
	updateWord();
	score = 0;
	scoreDisplay.innerHTML = score;
	input.value = "";
	updateTime();
	clearInterval(timeInterval);
}
function startInterval(){
	timeInterval = setInterval(function(){
		if(time > 0 && start === true){
			time--;
			timeDisplay.innerHTML = time;
		}
		else if(time <= 0){
			clearInterval(timeInterval);
			gameOver();
		}
	}, 1000);
}