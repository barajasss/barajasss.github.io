
var scrollerBtn = document.getElementById("scroller-btn");

scrollerBtn.onclick = function() {
	// code
	let current = window.scrollY;
	let scrollInterval = setInterval(function(){
		if(window.scrollY > 10){
			window.scroll(0, current);
			current -= 60;
		}
		else{
			clearInterval(scrollInterval);
		}
	}, 10);
}


$(function(){
	$('.carousel').carousel({
		interval: 3800
	})
})

var scrollAnimationElements = document.getElementsByClassName("scroll-animation");


function hasScrolledIntoView(el){
	var elTop = el.offsetTop;
	var elBottom = el.offsetHeight + elTop;
	var winTop = window.scrollY;
	var winBottom = window.innerHeight + winTop;
	return (winTop < elTop && elBottom < winBottom);
}



window.addEventListener("scroll", function(){

	if(window.scrollY > 500){
		scrollerBtn.style.transform = "scale(1)";
	}
	else{
		scrollerBtn.style.transform = "scale(0)";
	}
	for(i=0; i<scrollAnimationElements.length; i++){
		var temp;
		if(hasScrolledIntoView(temp = scrollAnimationElements[i])){
			scrollAnimationElements[i].style.animationDuration = "1.5s";
			if(temp.hasAttribute("data-animation")){
				temp.classList.add("animated", temp.getAttribute("data-animation"));
			}
			else{
				temp.classList.add("animated", "bounceInRight");
			}
			temp.style.visibility = "visible";
		}
	}
	
}, false);

