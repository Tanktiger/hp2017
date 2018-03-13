Date.prototype.dayOfYear= function(){
    var j1= new Date(this);
    j1.setMonth(0, 0);
    return Math.round((this-j1)/8.64e7);
};

$(document).ready(function(){

toggle_nav_container();
gotoByScroll();

    //calculate stats
    var date = new Date();
    var totalDays = (date.getFullYear() - 2011) * 365;
    var eatCount = totalDays / 10;
    var coffeeCount = (totalDays * 0.8) / 5;
    var sunCount = ((totalDays - (totalDays * (2/7))) * 24) / 10;

    $('#eatCount').text(Math.floor(eatCount));
    $('#coffeeCount').text(Math.floor(coffeeCount));
    $('#sunHourCount').text(Math.floor(sunCount));


    $('#submitContact').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        $("#statusMessages .statusMsg").empty();
        $('#submitContact').hide();
        var form = $(this).parents('form');
        var name = form.find('input[name="name"]').val();
        if (name == 'Ihr Name') {
            name = '';
        }
        var email = form.find('input[name="email"]').val();
        var text = form.find('textarea[name="message"]').val();
        var phone = form.find('input[name="phone"]').val();
        if (text == 'Ihre Nachricht') {
            text = '';
        }
        var request = $.ajax({
            url: "contact.php",
            type: "POST",
            data: {
                name : name,
                email: email,
                message: text,
                phone: phone
            },
            dataType: "json"
        });
        request.done(function( data ) {
            if (data.success == true || data.success == "true") {
                $( "#contactSuccess" ).show();
                $("#contact").hide();
            } else {
                if (data.mail == false || data.mail == "false") {
                    $( "#statusMessages").append('<p class="statusMsg">Ihre Emailadresse ist nicht korrekt!</p>');
                }
                if (data.name == false || data.name == "false") {
                    $( "#statusMessages").append('<p class="statusMsg">Ihr Name fehlt!</p>');
                }
                if (data.text == false || data.text == "false") {
                    $( "#statusMessages").append('<p class="statusMsg">Ihre Nachricht fehlt!</p>');
                }
            }
            $('#submitContact').show();
        });
        request.fail(function( jqXHR, textStatus ) {
            alert( "Die Anfrage ist fehlgeschlagen: " + textStatus );
            $('#submitContact').show();
        });
    });
});



var toggle_nav_container = function () {



	var 	$toggleButton = $('#toggle_m_nav');
			$navContainer = $('#m_nav_container');
			$menuButton = $('#m_nav_menu')
			$menuButtonBars = $('.m_nav_ham');
			$wrapper = $('#wrapper');

	// toggle the container on click of button (can be remapped to $menuButton)

	$toggleButton.on("click", function(){

		// declare a local variable for the window width
		var $viewportWidth = $(window).width();

		// if statement to determine whether the nav container is already toggled or not

		if($navContainer.is(':hidden'))
		{	
			$wrapper.removeClass('closed_wrapper');
			$wrapper.addClass("open_wrapper");
			$navContainer.slideDown(200).addClass('container_open').css("z-index", "2");
			// $(window).scrollTop(0);
			$menuButtonBars.removeClass('button_closed');
			$menuButtonBars.addClass('button_open');
			$("#m_ham_1").addClass("m_nav_ham_1_open");
			$("#m_ham_2").addClass("m_nav_ham_2_open");
			$("#m_ham_3").addClass("m_nav_ham_3_open");

		}
		else
		{
			$navContainer.css("z-index", "0").removeClass('container_open').slideUp(200)
			$menuButtonBars.removeClass('button_open')
			$menuButtonBars.addClass('button_closed')
			$wrapper.removeClass('open_wrapper')
			$wrapper.addClass("closed_wrapper")
			$("#m_ham_1").removeClass("m_nav_ham_1_open");
			$("#m_ham_2").removeClass("m_nav_ham_2_open");
			$("#m_ham_3").removeClass("m_nav_ham_3_open");

		}
	});



};


// Function that takes the href value of links in the navbar and then scrolls 
//the div on the page whose ID matches said value. This only works if you use 
//a consistent naming scheme for the navbar anchors and div IDs

var gotoByScroll = function (){

	$(".m_nav_item a").on("click", function(e) {

		e.preventDefault();
		// var $divID =$(this).attr("href");
		// var $scrollToDiv = "$(" + "'" + $divID + "'" +")";
		
		$('html,body').animate({
            scrollTop: $($(this).attr("href")).offset().top - 50
        }, "slow");

	});
		



};









