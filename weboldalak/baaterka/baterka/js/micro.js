

document.onkeypress = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        return false;
    }
}
document.onmousedown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        return false;
    }
}
document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        return false;
    }
}




///////////////////////////////////
function clickIE() {if (document.all) {return false;}}
function clickNS(e) {if
(document.layers||(document.getElementById&&!document.all)) {
    if (e.which==2||e.which==3) {return false;}}}
if (document.layers)
{document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}
else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}
document.oncontextmenu=new Function("return false")


$(window).on('load', function() {
    $('#status').delay(2500).fadeOut('slow'); // will first fade out the loading animation
    $('#preloader').delay(3000).fadeOut('slow'); // will fade out the white DIV that covers the website.
});

$(window).load(function() {
    UberVizMain.init();
});
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip()
    $(".timesincepc").html(5200 + Math.floor(((new Date().getTime() / 1000) - 1492007794) * 0.08)/1000,2);
    setInterval(function(){
        $(".timesincepc").html(5200 + Math.floor(((new Date().getTime() / 1000) - 1492007794) * 0.08)/1000,2);
    },7500)

    setInterval(function(){
        $(".keyboardhits").html(128654 + Math.floor(((new Date().getTime() / 1000) - 1492007794) * 3));
    },500)

    console.clear();
    console.meme("Not sure if you need", "to be here", "Not Sure Fry");
    setTimeout(function(){
        console.meme("Console is for developers", "not for you", "Chemistry Cat");
        setTimeout(function(){
            console.meme("Really fuck off or", "i will die", "Advice Dog");
            setTimeout(function(){
                console.clear();
            },1900);
        },2000);
    },2000);

    setInterval(function(){
        console.meme("Not sure if you need", "to be here", "Not Sure Fry");
        setTimeout(function(){
            console.meme("Console is for developers", "not for you", "Chemistry Cat");
            setTimeout(function(){
                console.meme("Really fuck off or", "i will die", "Advice Dog");
                setTimeout(function(){
                    console.clear();
                },1900);
            },2000);
        },2000);
    },6000);

    setInterval(function(){
        var offenses = ["SHITBAG","COCKNOSE","JIZZCOCK","SHITHEAD","THUNDERCUNT","CUMDUMPSTER","CUNTPUDDLE","FUCKNUGGET","DICKHEAD","UBERCUNT","MOTHERFUCKER"]
        var rand = Math.floor((Math.random() * (offenses.length-1) + 0));
        $(".changer").fadeOut("fast", function(){
            $(".changer").html(offenses[rand]).fadeIn("fast");
        })
    },1500);
});