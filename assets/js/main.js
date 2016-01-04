

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var $window = $(window),
			$body = $('body'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 500);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly();

		// Header.
		// If the header is using "alt" styling and #banner is present, use scrollwatch
		// to revert it back to normal styling once the user scrolls past the banner.
			if ($header.hasClass('alt')
			&&	$banner.length > 0) {

				$window.on('load', function() {

					$banner.scrollwatch({
						delay:		0,
						range:		0.98,
						anchor:		'top',
						on:			function() { $header.addClass('alt reveal'); },
						off:		function() { $header.removeClass('alt'); }
					});

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							$banner.scrollwatchSuspend();
						else
							$banner.scrollwatchResume();

					});

				});

			}

		// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right'
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navPanel')
						.css('transition', 'none');

		// Slider.
			var $sliders = $('.slider');

			if ($sliders.length > 0) {

				$sliders.slidertron({
					mode: 'fadeIn',
					seamlessWrap: true,
					viewerSelector: '.viewer',
					reelSelector: '.viewer .reel',
					slidesSelector: '.viewer .reel .slide',
					advanceDelay: 1500,
					speed: 400,
					fadeInSpeed: 1000,
					autoFit: true,
					autoFitAspectRatio: (840 / 344),
					navPreviousSelector: '.nav-previous',
					navNextSelector: '.nav-next',
					indicatorSelector: '.indicator ul li',
					slideLinkSelector: '.link'
				});

				$window
					.on('resize load', function() {
						$sliders.trigger('slidertron_reFit');
					})
					.trigger('resize');

			}

		// Backstretch
			$('#banner').backstretch([
				"images/banner.jpg",
				"images/banner1.jpg",
				"images/banner2.jpg",
				"images/banner3.jpg",
				"images/banner4.jpg"
				], {duration: 3000});

			$('#adbox').backstretch([
				"images/adbox1.jpg",
				"images/adbox2.jpg",
				"images/adbox3.jpg"
				], {duration: 2500});

		// Read More
	    $('#home_left').readmore({
	      moreLink: '<a href="#">Read More</a>',
	      collapsedHeight: 100
	    });

	    $('#home_right').readmore({
	      moreLink: '<a href="#">Read More</a>',
	      collapsedHeight: 200
	    });

	    $('#about_left_top, #about_left_bottom, #about_right_bottom').readmore({
	      moreLink: '<a href="#">Read More</a>',
	      collapsedHeight: 300
	    });

	    $('#about_right_top').readmore({
	      moreLink: '<a href="#">Read More</a>',
	      collapsedHeight: 400
	    });

	});

})(jQuery);