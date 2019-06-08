function Alert(title="", msg="", btn1="Ok"){
	var dialogOverlay =document.getElementById("dialogOverlay");
	var dialogBox = document.getElementById("dialogBox");
	var dialogHead = document.getElementById("dialogHead");
	var dialogBody = document.getElementById("dialogBody");
	var dialogFooter = document.getElementById("dialogFooter");
	dialogOverlay.style.display = "block";
	dialogHead.innerHTML = title;
	dialogBody.innerHTML = msg;
	dialogFooter.innerHTML = "<button id='okBtn'>" + btn1 + "</button>";
	var okBtn = document.getElementById("okBtn");
	okBtn.onclick = function(){
		dialogOverlay.style.display = "none";
	}
};
function Confirm(title="", msg="", btn1="yes", btn2="no"){
	var dialogOverlay =document.getElementById("dialogOverlay");
	var dialogBox = document.getElementById("dialogBox");
	var dialogHead = document.getElementById("dialogHead");
	var dialogBody = document.getElementById("dialogBody");
	var dialogFooter = document.getElementById("dialogFooter");
	dialogOverlay.style.display = "block";
	dialogHead.innerHTML = title;
	dialogBody.innerHTML = msg;
	dialogFooter.innerHTML = "<button id='btn1'>" + btn1 + "</button>";
	dialogFooter.innerHTML += "<button id='btn2'>" + btn2 + "</button>";
	var btn1 = document.getElementById("btn1");
	var btn2 = document.getElementById("btn2");
	btn1.onclick = function(){
		dialogOverlay.style.display = "none";
		return true;
	}
	btn2.onclick = function(){
		dialogOverlay.style.display = "none";
	}
};
function Prompt(title="", msg="", btn1="Ok", btn2="Cancel"){
	var dialogOverlay =document.getElementById("dialogOverlay");
	var dialogBox = document.getElementById("dialogBox");
	var dialogHead = document.getElementById("dialogHead");
	var dialogBody = document.getElementById("dialogBody");
	var dialogFooter = document.getElementById("dialogFooter");
	dialogOverlay.style.display = "block";
	dialogHead.innerHTML = title;
	dialogBody.innerHTML = msg;
	dialogBody.innerHTML += "<br><input id='text' type='text'>";
	dialogFooter.innerHTML = "<button id='btn1'>" + btn1 + "</button>";
	dialogFooter.innerHTML += "<button id='btn2'>" + btn2 + "</button>";
	var btn1 = document.getElementById("btn1");
	var btn2 = document.getElementById("btn2");
	btn1.onclick = function(){
		var text = document.getElementById("text").value;
		dialogOverlay.style.display = "none";
		return text;
	}
	document.onkeydown = function(e){
		if(e.keyCode == 13){
			var text = document.getElementById("text").value;
			dialogOverlay.style.display = "none";
			return text;
		}
	}
	btn2.onclick = function(){
		dialogOverlay.style.display = "none";
	}
	return text;
};