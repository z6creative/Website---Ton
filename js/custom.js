(function($){
	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(350).fadeOut('slow');
	});

	$(document).ready(function() {


		/* ---------------------------------------------- /*
		 * Anchor
		/* ---------------------------------------------- */

		$('body').scrollspy({
			target: '.navbar-inverse',
			offset: 50
		})

		$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
		});

		$('a[href*=#]').bind("click", function(e){
			var anchor = $(this);
			if(anchor.context.hash != '#carouselVideos' && anchor.context.hash != ''){
				$('html, body').stop().animate({
					scrollTop: $(anchor.attr('href')).offset().top-20
				}, 1000);
				e.preventDefault();
			}
		});

		/* ---------------------------------------------- /*
		 * Navbar
		/* ---------------------------------------------- */

		var navbar = $('#navbar');
		var navHeight = navbar.height();

		$(window).scroll(function() {
			var navbar2 = $('#navbar');
			var r = $('#release');
			var navHeight2 = r.offset().top-navbar2.height();
			if($(this).scrollTop() >= navHeight2) {
				navbar.addClass('navbar-color');
			}
			else {
				navbar.removeClass('navbar-color');
			}
		});


		if($(window).width() <= 767) {
			navbar.addClass('custom-collapse');
		}

		$(window).resize(function() {
			if($(this).width() <= 767) {
				navbar.addClass('custom-collapse');
			}
			else {
				navbar.removeClass('custom-collapse');
			}
		});
		/* ---------------------------------------------- /*
		 * WOW Animation When You Scroll
		/* ---------------------------------------------- */
		wow = new WOW({
			mobile: false
		});
		wow.init();

		$(".rotate2").textrotator({
			animation: "dissolve",
			separator: "|",
			speed: 2000
		});

		/* ---------------------------------------------- /*
		 * Rotate
		/* ---------------------------------------------- */

		$(".rotate").textrotator({
			animation: "dissolve",
			separator: "|",
			speed: 2000
		});

		/* ---------------------------------------------- /*
		 * O que eu faco
		/* ---------------------------------------------- */
		$(".btn").click(function(e){
			$(".invisivel").slideToggle("fast");
			e.preventDefault();
		});

		/* ---------------------------------------------- /*
		 * Galeira de imagens
		/* ---------------------------------------------- */

		$('#galeria_imagens').magnificPopup({
			delegate: 'a.pop-up',
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				titleSrc: 'title',
				tError: 'A imagem não pode ser carregada.',
			}
		});

		/* ---------------------------------------------- /*
		 * E-mail validation
		/* ---------------------------------------------- */

		function isValidEmailAddress(emailAddress) {
			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			return pattern.test(emailAddress);
		};

		/* ---------------------------------------------- /*
		 * Contact form ajax
		/* ---------------------------------------------- */

		$("#contact-form").submit(function(e) {

			e.preventDefault();

			var c_name = $("#nome").val();
			var c_email = $("#email").val();
			var c_message = $("#mensagem").val();
			var responseMessage = $('.ajax-response');

			if (( c_name== "" || c_email == "" || c_message == "") || (!isValidEmailAddress(c_email) )) {
				responseMessage.fadeIn(500);
				responseMessage.html('<i class="fa fa-warning"></i> Preencha todos os campos corretamente.');
			}

			else {
				$.ajax({
					type: "POST",
					url: "assets/php/contato.php",
					dataType: 'json',
					// headers: {
				 //        'Accept': 'application/json',
				 //        'Content-Type': 'text/plain',
				 //    },
					data: {
						"f_email": c_email,
						"f_nome": c_name,
						"f_mensagem": c_message
					},
					beforeSend: function(result) {
						$('#contact-form button').empty();
						$('#contact-form button').append('<i class="fa fa-cog fa-spin"></i> Aguarde...');
					},
					complete: function(data) {
						if(data.responseText == 'sucesso') {
							responseMessage.html('Mensagem enviada com sucesso :)');
							responseMessage.fadeIn(500);
							//$('#contact-form').fadeOut(500);
							$("#contact-form")[0].reset();
							$('#contact-form button').html('<i class="fa fa-bullhorn icon-before"></i> Enviar');
						} else {
							$('#contact-form button').empty();
							$('#contact-form button').append('<i class="fa fa-retweet"></i> Tente novamente.');
							responseMessage.html('Algo deu errado :(<br>Tente novamente');
							responseMessage.fadeIn(1000);
						}
					}
				});
			}

			return false;

		});

	});

})(jQuery);

/* ---------------------------------------------- /*
 * Scroll para qualquer elemento da pagina
/* ---------------------------------------------- */
function goToByScroll(id, velocidade){
      // Remove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top }, velocidade);
}