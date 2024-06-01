window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var INTERP_BASE_NEW = "./static/interpolation/interp";
var NUM_OLD_INTERP_FRAMES = 240;
var NUM_NEW_INTERP_FRAMES = 99;  // Example for different frame count

var interp_images = [];
var new_interp_images = [];

function preloadInterpolationImages(base, interp_images, num_frames) {
    if (num_frames == 240)
    {
        for (var i = 0; i < num_frames; i++) {
            var path = base + '/' + String(i).padStart(6, '0') + '.jpg';
            interp_images[i] = new Image();
            interp_images[i].src = path;
          }
    }
    else
    {
        for (var i = 1; i < num_frames + 1; i++) {
            var path = base + '/' + String(i).padStart(6, '0') + '.png';
            interp_images[i] = new Image();
            interp_images[i].src = path;
          }
    }
}

function setInterpolationImage(interp_images, wrapper_id, i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#' + wrapper_id).empty().append(image);
}

$(document).ready(function() {
  // Navbar burger toggle
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Carousel initialization
  var options = {
    slidesToScroll: 1,
    slidesToShow: 3,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
  }

  var carousels = bulmaCarousel.attach('.carousel', options);

  for (var i = 0; i < carousels.length; i++) {
    carousels[i].on('before:show', state => {
      console.log(state);
    });
  }

  var element = document.querySelector('#my-element');
  if (element && element.bulmaCarousel) {
    element.bulmaCarousel.on('before-show', function(state) {
      console.log(state);
    });
  }

  // Preload images
  preloadInterpolationImages(INTERP_BASE, interp_images, NUM_OLD_INTERP_FRAMES);
  preloadInterpolationImages(INTERP_BASE_NEW, new_interp_images, NUM_NEW_INTERP_FRAMES);

  // Old interpolation slider
  $('#interpolation-slider').on('input', function(event) {
    setInterpolationImage(interp_images, 'interpolation-image-wrapper', this.value);
  });
  setInterpolationImage(interp_images, 'interpolation-image-wrapper', 0);
  $('#interpolation-slider').prop('max', NUM_OLD_INTERP_FRAMES - 1);

  // New interpolation slider
  $('#new-interpolation-slider').on('input', function(event) {
    setInterpolationImage(new_interp_images, 'new-interpolation-image-wrapper', this.value);
  });
  setInterpolationImage(new_interp_images, 'new-interpolation-image-wrapper', 0);
  $('#new-interpolation-slider').prop('max', NUM_NEW_INTERP_FRAMES - 1);

  bulmaSlider.attach();
});
