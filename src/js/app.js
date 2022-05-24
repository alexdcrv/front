// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

//import Accordion from './components/accordion';
import { isInteger } from "validate.js";
import initAccordion from "./components/accordion";
import burgerMenu from "./components/burger-menu";
import tabs from "./components/tabs";

(($) => {
  // When DOM is ready
  $(() => {
    tabs.init();
    initAccordion();
    burgerMenu.init();

		setTimeout(() => {
			window.scrollTo({
				top: 0
			});

		}, 500)


		////

    const HEADER = document.querySelector('.js-fixed-header');
    const CLASS_FIXED = 'fixed';

    const heightScroll = 1;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= heightScroll) {
        HEADER.classList.add(CLASS_FIXED);
      } else {
        HEADER.classList.remove(CLASS_FIXED);
      }
    });

    ///slider

    const smallSlider = document.querySelector('.js-accountant-slider');

    if (smallSlider) {
      const accountantInit = new Swiper('.js-accountant-slider', {
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 800,
        centerInsufficientSlides: true,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
      });
    }

    $('a[href^="#"]').click(function () {
      var href = $.attr(this, 'href')

      $('.js-burger-open').removeClass('active')
      $('.js-burger').removeClass('active')
      $('body').removeClass('overflow')

      $('html, body').animate({
          scrollTop: $(href).offset().top,
        },
        500,
      )
      return false
    });

    const loader = document.querySelector('.preloader');

    document.body.onload = function () {
      if (loader) {
        setTimeout(function () {
          let preloader = document.getElementById('preloader');
          if (!preloader.classList.contains('done')) {
            preloader.classList.add('done')
          }
        }, 1000)
      }
    };




    $('.video').parent().click(function () {
      if ($(this).children(".video").get(0).paused) {
        $(this).children(".video").get(0).play();
        $(this).children(".playpause").fadeOut();
      } else {
        $(this).children(".video").get(0).pause();
        $(this).children(".playpause").fadeIn();
      }
    });

  });
})(jQuery);