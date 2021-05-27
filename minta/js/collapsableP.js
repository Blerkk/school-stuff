var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("activeCollapsible");
    var content = this.nextElementSibling;
	
	if (content.style.maxHeight){
		content.style.opacity = "0%";
		content.style.maxHeight = null;
		content.style.margin = "0px";
	} else {
		content.style.opacity = "100%";
		content.style.maxHeight = content.scrollHeight + "px";
		content.style.margin = "25px";
	} 
  });
}