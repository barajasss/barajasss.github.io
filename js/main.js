

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
