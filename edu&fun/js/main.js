'use strict';

(function ($) {

    $('#light-bulb2').click(function() {
        if ($('.kapcsolo').hasClass('active')) {
            $('.kapcsolo').removeClass('active');
            $('#light-bulb2').css({'opacity': '0'});
        } else {
            $('.kapcsolo').addClass('active');
            $('#light-bulb2').css({'opacity': '1'});
        }
    });

    $(".plus").click(function(){
        $(this).toggleClass("minus");
        if(this == ".haloszoba")
            $(".haloszoba").href="/haloszobaOff";
        else if(this == ".konyha")
            $(".konyha").href="/konyhaOff";
        else if(this == ".nappali")
            $(".nappali").href="/nappaliOff";
        else if(this == ".kulteri")
            $(".kulteri").href="/kulteriOff";
    })

    $(".minus").click(function(){
        if(this == ".haloszoba")
            $(".haloszoba").href="/haloszobaOn";
        else if(this == ".konyha")
            $(".konyha").href="/konyhaOn";
        else if(this == ".nappali")
            $(".nappali").href="/nappaliOn";
        else if(this == ".kulteri")
            $(".kulteri").href="/kulteriOn";
    })

    $('.door').click( function() {
        $(this).toggleClass('moving');
    });

    setInterval(function() {
		var d = new Date((new Date).getTime());

		var enable24hr = true;

		var time = d.getTime();
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();

		var ampm = enable24hr ? "" : (h < 12 ? " AM" : " PM");

		if (h > 12 && !enable24hr) {
			h = h - 12;
		}
		if (h == 0 && !enable24hr) {
			h = 12;
		}
		if (m < 10) {
			m = "0"+m;
		}
		if (s < 10) {
			s = "0"+s;
		}

		var month = d.getMonth();
		var day = d.getDate();
		var year = d.getFullYear();
		var weekday = d.getDay();

		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

		var output = ""+days[weekday]+", "+months[month] + " "+day+", "+year+"";

		$('#time').html(h+":"+m+":"+s+""+ampm+"<br><small>"+output+"</small>");
	}, 500);

})(jQuery);