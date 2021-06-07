if(document.addEventListener){
	document.addEventListener("DOMContentLoaded", function(){
		load();
	});
} else if(document.attachEvent){
	document.attachEvent("onreadystatechange", function(){
		load();
	});
}

function load(){
	//var videoAmount = 5;
	//var video = document.getElementsByTagName("video")[0];
	//video.src = "./videos/loco"+Math.ceil(Math.random()*videoAmount)+".mp4";
	//video.load();
	//setInterval(loop, 1000);
}
/* Copyright by SubSide & W4rning */
/* You're such a bad boy removing this huh */
var x = 0;
var titleText = [ "L", "LO", "LOC", "LOCO", "LOCOS", "LOCOSQ", "LOCOSQU", "LOCOSQUA", "LOCOSQUAD"];
function loop(){
	document.getElementsByTagName("title")[0].innerHTML = titleText[x++%titleText.length];
}