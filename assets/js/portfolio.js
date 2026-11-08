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

(function () {
  'use strict';
  const trigger = document.getElementById('about-dialog-trigger');
  const dialog = document.getElementById('about-dialog');
  if (!trigger || !dialog || typeof dialog.showModal !== 'function') return;

  const closeButton = dialog.querySelector('.about-dialog-close');
  const content = dialog.querySelector('.about-dialog-content');
  let returnFocus = null;
  let startedOnBackdrop = false;

  trigger.addEventListener('click', function (event) {
    // Keep the original link available for modified clicks and browsers without dialogs.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (dialog.open) return;
    returnFocus = trigger;
    dialog.showModal();
    document.body.classList.add('about-dialog-open');
    content.scrollTop = 0;
    closeButton.focus({ preventScroll: true });
  });

  closeButton.addEventListener('click', function () { dialog.close(); });

  function outsideDialog(event) {
    if (event.target !== dialog) return false;
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
  }

  dialog.addEventListener('pointerdown', function (event) {
    startedOnBackdrop = outsideDialog(event);
  });
  dialog.addEventListener('click', function (event) {
    if (startedOnBackdrop && outsideDialog(event)) dialog.close();
    startedOnBackdrop = false;
  });

  // Native dialog handles Escape, focus containment, and inert background content.
  dialog.addEventListener('close', function () {
    document.body.classList.remove('about-dialog-open');
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  });
})();
