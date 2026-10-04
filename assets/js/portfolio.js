(function ($) {
  'use strict';
  $('#portfolio-flters li').on('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      $(this).trigger('click');
    }
  }).on('click', function () {
    $('#portfolio-flters li').attr('aria-pressed', 'false');
    $(this).attr('aria-pressed', 'true');
  });
})(jQuery);
